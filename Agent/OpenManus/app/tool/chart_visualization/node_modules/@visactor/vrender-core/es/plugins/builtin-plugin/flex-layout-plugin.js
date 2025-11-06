import { getTheme } from "../../graphic/theme";

import { Generator } from "../../common/generator";

import { AABBBounds } from "@visactor/vutils";

import { application } from "../../application";

import { Factory } from "../../factory";

const _tempBounds = new AABBBounds;

export class FlexLayoutPlugin {
    constructor() {
        this.name = "FlexLayoutPlugin", this.activeEvent = "onRegister", this.id = Generator.GenAutoIncrementId(), 
        this.key = this.name + this.id, this.tempBounds = new AABBBounds;
    }
    pauseLayout(p) {
        this.pause = p;
    }
    tryLayoutChildren(graphic) {
        graphic.firstChild && this.tryLayout(graphic.firstChild);
    }
    tryLayout(graphic, force = !0) {
        if (this.pause) return;
        const p = graphic.parent;
        if (!(force || p && graphic.needUpdateLayout())) return;
        const theme = getTheme(p).group, {display: display = theme.display} = p.attribute;
        if ("flex" !== display) return;
        const {flexDirection: flexDirection = theme.flexDirection, flexWrap: flexWrap = theme.flexWrap, alignItems: alignItems = theme.alignItems, clip: clip = theme.clip} = p.attribute, {alignContent: alignContent = (null != alignItems ? alignItems : theme.alignContent)} = p.attribute;
        let {width: width, height: height, justifyContent: justifyContent = theme.justifyContent} = p.attribute;
        const children = p.getChildren();
        if (null == width || null == height) {
            let childrenWidth = 0, childrenHeight = 0, boundsLegal = 0;
            if (children.forEach((child => {
                const bounds = this.getAABBBounds(child);
                bounds.empty() || ("column" === flexDirection || "column-reverse" === flexDirection ? (childrenHeight += bounds.height(), 
                childrenWidth = Math.max(childrenWidth, bounds.width())) : (childrenWidth += bounds.width(), 
                childrenHeight = Math.max(childrenHeight, bounds.height())), boundsLegal += bounds.x1, 
                boundsLegal += bounds.y1, boundsLegal += bounds.x2, boundsLegal += bounds.y2);
            })), !isFinite(boundsLegal)) return;
            width = childrenWidth, height = childrenHeight;
        }
        null == p.attribute.width ? p.attribute.width = width : width = p.attribute.width, 
        null == p.attribute.height ? p.attribute.height = height : height = p.attribute.height, 
        this.tempBounds.copy(p._AABBBounds);
        const result = {
            main: {
                len: width,
                field: "x"
            },
            cross: {
                len: height,
                field: "y"
            }
        }, main = result.main, cross = result.cross;
        "column" !== flexDirection && "column-reverse" !== flexDirection || (main.len = height, 
        cross.len = width, main.field = "y", cross.field = "x"), "row-reverse" !== flexDirection && "column-reverse" !== flexDirection || ("flex-start" === justifyContent ? justifyContent = "flex-end" : "flex-end" === justifyContent ? justifyContent = "flex-start" : children.reverse());
        let mainLen = 0, crossLen = 0;
        const mianLenArray = [];
        children.forEach((c => {
            const b = this.getAABBBounds(c);
            if (b.empty()) return;
            const ml = "x" === main.field ? b.width() : b.height(), cl = "x" === cross.field ? b.width() : b.height();
            mianLenArray.push({
                mainLen: ml,
                crossLen: cl
            }), mainLen += ml, crossLen = Math.max(crossLen, cl);
        }));
        const mainList = [];
        if (mainLen > main.len && "wrap" === flexWrap) {
            let tempMainL = 0, tempCrossL = 0;
            mianLenArray.forEach((({mainLen: mainLen, crossLen: crossLen}, i) => {
                tempMainL + mainLen > main.len ? 0 === tempMainL ? (mainList.push({
                    idx: i,
                    mainLen: tempMainL + mainLen,
                    crossLen: crossLen
                }), tempMainL = 0, tempCrossL = 0) : (mainList.push({
                    idx: i - 1,
                    mainLen: tempMainL,
                    crossLen: tempCrossL
                }), tempMainL = mainLen, tempCrossL = crossLen) : (tempMainL += mainLen, tempCrossL = Math.max(tempCrossL, crossLen));
            })), mainList.push({
                idx: mianLenArray.length - 1,
                mainLen: tempMainL,
                crossLen: tempCrossL
            });
        } else mainList.push({
            idx: mianLenArray.length - 1,
            mainLen: mainLen,
            crossLen: crossLen
        });
        let lastIdx = 0;
        if (mainList.forEach((s => {
            this.layoutMain(p, children, justifyContent, main, mianLenArray, lastIdx, s), lastIdx = s.idx + 1;
        })), crossLen = mainList.reduce(((a, b) => a + b.crossLen), 0), 1 === mainList.length) {
            const anchorPosMap = {
                "flex-start": 0,
                "flex-end": cross.len,
                center: cross.len / 2
            };
            this.layoutCross(children, alignItems, cross, anchorPosMap, mianLenArray, mainList[0], 0);
        } else if ("flex-start" === alignContent) {
            lastIdx = 0;
            let anchorPos = 0;
            mainList.forEach(((s, i) => {
                const anchorPosMap = {
                    "flex-start": anchorPos,
                    "flex-end": anchorPos + s.crossLen,
                    center: anchorPos + s.crossLen / 2
                };
                this.layoutCross(children, "flex-start", cross, anchorPosMap, mianLenArray, mainList[i], lastIdx), 
                lastIdx = s.idx + 1, anchorPos += s.crossLen;
            }));
        } else if ("center" === alignContent) {
            lastIdx = 0;
            let anchorPos = Math.max(0, (cross.len - crossLen) / 2);
            mainList.forEach(((s, i) => {
                const anchorPosMap = {
                    "flex-start": anchorPos,
                    "flex-end": anchorPos + s.crossLen,
                    center: anchorPos + s.crossLen / 2
                };
                this.layoutCross(children, "center", cross, anchorPosMap, mianLenArray, mainList[i], lastIdx), 
                lastIdx = s.idx + 1, anchorPos += s.crossLen;
            }));
        } else if ("space-around" === alignContent) {
            lastIdx = 0;
            const padding = Math.max(0, (cross.len - crossLen) / mainList.length / 2);
            let anchorPos = padding;
            mainList.forEach(((s, i) => {
                const anchorPosMap = {
                    "flex-start": anchorPos,
                    "flex-end": anchorPos + s.crossLen,
                    center: anchorPos + s.crossLen / 2
                };
                this.layoutCross(children, "flex-start", cross, anchorPosMap, mianLenArray, mainList[i], lastIdx), 
                lastIdx = s.idx + 1, anchorPos += s.crossLen + 2 * padding;
            }));
        } else if ("space-between" === alignContent) {
            lastIdx = 0;
            const padding = Math.max(0, (cross.len - crossLen) / (2 * mainList.length - 2));
            let anchorPos = 0;
            mainList.forEach(((s, i) => {
                const anchorPosMap = {
                    "flex-start": anchorPos,
                    "flex-end": anchorPos + s.crossLen,
                    center: anchorPos + s.crossLen / 2
                };
                this.layoutCross(children, "flex-start", cross, anchorPosMap, mianLenArray, mainList[i], lastIdx), 
                lastIdx = s.idx + 1, anchorPos += s.crossLen + 2 * padding;
            }));
        }
        children.forEach(((child, idx) => {
            child.addUpdateBoundTag(), child.addUpdatePositionTag(), child.clearUpdateLayoutTag();
        })), p.addUpdateLayoutTag();
        const b = this.getAABBBounds(p);
        clip || this.tempBounds.equals(b) || this.tryLayout(p, !1);
    }
    getAABBBounds(graphic) {
        this.skipBoundsTrigger = !0;
        const b = graphic.AABBBounds;
        return this.skipBoundsTrigger = !1, b;
    }
    updateChildPos(posBaseLeftTop, lastP, lastBP) {
        return posBaseLeftTop + (null != lastP ? lastP : 0) - lastBP;
    }
    layoutMain(p, children, justifyContent, main, mianLenArray, lastIdx, currSeg) {
        if ("flex-start" === justifyContent) {
            let pos = 0;
            for (let i = lastIdx; i <= currSeg.idx; i++) {
                const posBaseLeftTop = pos + getPadding(children[i], main.field), b = this.getAABBBounds(children[i]);
                !b.empty() && (children[i].attribute[main.field] = this.updateChildPos(posBaseLeftTop, children[i].attribute[main.field], b[`${main.field}1`])), 
                pos += mianLenArray[i].mainLen;
            }
        } else if ("flex-end" === justifyContent) {
            let pos = main.len;
            for (let i = currSeg.idx; i >= lastIdx; i--) {
                pos -= mianLenArray[i].mainLen;
                const posBaseLeftTop = pos + getPadding(children[i], main.field), b = this.getAABBBounds(children[i]);
                !b.empty() && (children[i].attribute[main.field] = this.updateChildPos(posBaseLeftTop, children[i].attribute[main.field], b[`${main.field}1`]));
            }
        } else if ("space-around" === justifyContent) if (currSeg.mainLen >= main.len) {
            let pos = 0;
            for (let i = lastIdx; i <= currSeg.idx; i++) {
                const posBaseLeftTop = pos + getPadding(children[i], main.field), b = this.getAABBBounds(children[i]);
                !b.empty() && (children[i].attribute[main.field] = this.updateChildPos(posBaseLeftTop, children[i].attribute[main.field], b[`${main.field}1`])), 
                pos += mianLenArray[i].mainLen;
            }
        } else {
            const size = currSeg.idx - lastIdx + 1, padding = (main.len - currSeg.mainLen) / size / 2;
            let pos = padding;
            for (let i = lastIdx; i <= currSeg.idx; i++) {
                const posBaseLeftTop = pos + getPadding(children[i], main.field), b = this.getAABBBounds(children[i]);
                !b.empty() && (children[i].attribute[main.field] = this.updateChildPos(posBaseLeftTop, children[i].attribute[main.field], b[`${main.field}1`])), 
                pos += mianLenArray[i].mainLen + 2 * padding;
            }
        } else if ("space-between" === justifyContent) if (currSeg.mainLen >= main.len) {
            let pos = 0;
            for (let i = lastIdx; i <= currSeg.idx; i++) {
                const posBaseLeftTop = pos + getPadding(children[i], main.field), b = this.getAABBBounds(children[i]);
                !b.empty() && (children[i].attribute[main.field] = this.updateChildPos(posBaseLeftTop, children[i].attribute[main.field], b[`${main.field}1`])), 
                pos += mianLenArray[i].mainLen;
            }
        } else {
            const size = currSeg.idx - lastIdx + 1, padding = (main.len - currSeg.mainLen) / (2 * size - 2);
            let pos = 0;
            for (let i = lastIdx; i <= currSeg.idx; i++) {
                const posBaseLeftTop = pos + getPadding(children[i], main.field), b = this.getAABBBounds(children[i]);
                !b.empty() && (children[i].attribute[main.field] = this.updateChildPos(posBaseLeftTop, children[i].attribute[main.field], b[`${main.field}1`])), 
                pos += mianLenArray[i].mainLen + 2 * padding;
            }
        } else if ("center" === justifyContent) {
            let pos = (main.len - currSeg.mainLen) / 2;
            for (let i = lastIdx; i <= currSeg.idx; i++) {
                const posBaseLeftTop = pos + getPadding(children[i], main.field), b = this.getAABBBounds(children[i]);
                !b.empty() && (children[i].attribute[main.field] = this.updateChildPos(posBaseLeftTop, children[i].attribute[main.field], b[`${main.field}1`])), 
                pos += mianLenArray[i].mainLen;
            }
        }
    }
    layoutCross(children, alignItem, cross, anchorPosMap, lenArray, currSeg, lastIdx) {
        var _a;
        for (let i = lastIdx; i <= currSeg.idx; i++) {
            const child = children[i];
            let {alignSelf: alignSelf} = child.attribute;
            alignSelf && "auto" !== alignSelf || (alignSelf = alignItem);
            const b = this.getAABBBounds(child), anchorPos = null !== (_a = anchorPosMap[alignSelf]) && void 0 !== _a ? _a : anchorPosMap["flex-start"];
            "flex-end" === alignSelf ? !b.empty() && (child.attribute[cross.field] = this.updateChildPos(anchorPos - lenArray[i].crossLen + getPadding(child, cross.field), child.attribute[cross.field], b[`${cross.field}1`])) : "center" === alignSelf ? !b.empty() && (child.attribute[cross.field] = this.updateChildPos(anchorPos - lenArray[i].crossLen / 2 + getPadding(child, cross.field), child.attribute[cross.field], b[`${cross.field}1`])) : !b.empty() && (child.attribute[cross.field] = this.updateChildPos(anchorPos + getPadding(child, cross.field), child.attribute[cross.field], b[`${cross.field}1`]));
        }
    }
    activate(context) {
        this.pluginService = context, application.graphicService.hooks.onAttributeUpdate.tap(this.key, (graphic => {
            graphic.glyphHost && (graphic = graphic.glyphHost), graphic.stage && graphic.stage === this.pluginService.stage && this.tryLayout(graphic, !1);
        })), application.graphicService.hooks.beforeUpdateAABBBounds.tap(this.key, ((graphic, stage, willUpdate, bounds) => {
            graphic.glyphHost && (graphic = graphic.glyphHost), stage && stage === this.pluginService.stage && graphic.isContainer && !this.skipBoundsTrigger && _tempBounds.copy(bounds);
        })), application.graphicService.hooks.afterUpdateAABBBounds.tap(this.key, ((graphic, stage, bounds, params, selfChange) => {
            stage && stage === this.pluginService.stage && graphic.isContainer && !this.skipBoundsTrigger && (_tempBounds.equals(bounds) || this.tryLayout(graphic, !1));
        })), application.graphicService.hooks.onSetStage.tap(this.key, (graphic => {
            graphic.glyphHost && (graphic = graphic.glyphHost), this.tryLayout(graphic, !1);
        }));
    }
    deactivate(context) {
        application.graphicService.hooks.onAttributeUpdate.taps = application.graphicService.hooks.onAttributeUpdate.taps.filter((item => item.name !== this.key)), 
        application.graphicService.hooks.beforeUpdateAABBBounds.taps = application.graphicService.hooks.beforeUpdateAABBBounds.taps.filter((item => item.name !== this.key)), 
        application.graphicService.hooks.afterUpdateAABBBounds.taps = application.graphicService.hooks.afterUpdateAABBBounds.taps.filter((item => item.name !== this.key)), 
        application.graphicService.hooks.onSetStage.taps = application.graphicService.hooks.onSetStage.taps.filter((item => item.name !== this.key));
    }
}

function getPadding(graphic, field) {
    return 0;
}

export const registerFlexLayoutPlugin = () => {
    Factory.registerPlugin("FlexLayoutPlugin", FlexLayoutPlugin);
};
//# sourceMappingURL=flex-layout-plugin.js.map
