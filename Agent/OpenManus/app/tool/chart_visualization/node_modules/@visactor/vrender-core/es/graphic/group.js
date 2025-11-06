import { Point } from "@visactor/vutils";

import { application } from "../application";

import { Graphic, NOWORK_ANIMATE_ATTR } from "./graphic";

import { getTheme, Theme } from "./theme";

import { UpdateTag, IContainPointMode } from "../common/enums";

import { GROUP_NUMBER_TYPE } from "./constants";

import { DefaultTransform } from "./config";

export var GroupUpdateAABBBoundsMode;

!function(GroupUpdateAABBBoundsMode) {
    GroupUpdateAABBBoundsMode[GroupUpdateAABBBoundsMode.LESS_GROUP = 0] = "LESS_GROUP", 
    GroupUpdateAABBBoundsMode[GroupUpdateAABBBoundsMode.MORE_GROUP = 1] = "MORE_GROUP";
}(GroupUpdateAABBBoundsMode || (GroupUpdateAABBBoundsMode = {}));

export class Group extends Graphic {
    constructor(params) {
        super(params), this.type = "group", this.parent = null, this.isContainer = !0, this.numberType = GROUP_NUMBER_TYPE, 
        this._childUpdateTag = UpdateTag.UPDATE_BOUNDS;
    }
    setMode(mode) {
        "3d" === mode ? this.set3dMode() : this.set2dMode();
    }
    set3dMode() {
        this.in3dMode = !0;
    }
    set2dMode() {
        this.in3dMode = !1;
    }
    setTheme(t) {
        return this.theme || (this.theme = new Theme), this.theme.setTheme(t, this);
    }
    createTheme() {
        this.theme || (this.theme = new Theme);
    }
    visibleAll(visible) {
        this.setAttribute("visible", visible), this.forEachChildren((item => {
            item.isContainer && item.visibleAll ? item.visibleAll(visible) : item.setAttribute("visible", visible);
        }));
    }
    hideAll() {
        this.visibleAll(!1);
    }
    showAll() {
        this.visibleAll(!0);
    }
    containsPoint(x, y, mode) {
        if (mode === IContainPointMode.GLOBAL) {
            const point = new Point(x, y);
            return this.parent && this.parent.globalTransMatrix.transformPoint(point, point), 
            this.AABBBounds.contains(point.x, point.y);
        }
        return this.AABBBounds.contains(x, y);
    }
    shouldUpdateAABBBounds() {
        return !!super.shouldUpdateAABBBounds() || !!(this._childUpdateTag & UpdateTag.UPDATE_BOUNDS);
    }
    tryUpdateAABBBounds() {
        if (!this.shouldUpdateAABBBounds()) return this._AABBBounds;
        application.graphicService.beforeUpdateAABBBounds(this, this.stage, !0, this._AABBBounds);
        const selfChange = this.shouldSelfChangeUpdateAABBBounds(), bounds = this.doUpdateAABBBounds();
        return this.addUpdateLayoutTag(), application.graphicService.afterUpdateAABBBounds(this, this.stage, this._AABBBounds, this, selfChange), 
        "empty" === this.attribute.boundsMode && bounds.clear(), bounds;
    }
    doUpdateLocalMatrix() {
        const {x: x = DefaultTransform.x, y: y = DefaultTransform.y, dx: dx = DefaultTransform.dx, dy: dy = DefaultTransform.dy, scaleX: scaleX = DefaultTransform.scaleX, scaleY: scaleY = DefaultTransform.scaleY, angle: angle = DefaultTransform.angle, postMatrix: postMatrix} = this.attribute;
        if (0 !== x || 0 !== y || 0 !== dx || 0 !== dy || 1 !== scaleX || 1 !== scaleY || 0 !== angle || postMatrix) return super.doUpdateLocalMatrix();
        this._transMatrix.reset();
    }
    getGraphicTheme() {
        return getTheme(this).group;
    }
    updateAABBBounds(attribute, groupTheme, aabbBounds) {
        const originalAABBBounds = aabbBounds;
        aabbBounds = aabbBounds.clone();
        const {width: width, height: height, path: path, clip: clip = groupTheme.clip} = attribute;
        if (path && path.length ? path.forEach((g => {
            aabbBounds.union(g.AABBBounds);
        })) : null != width && null != height && aabbBounds.set(0, 0, Math.max(0, width), Math.max(0, height)), 
        !clip) {
            this.forEachChildren((node => {
                aabbBounds.union(node.AABBBounds);
            }));
            const {scrollX: scrollX = 0, scrollY: scrollY = 0} = attribute;
            aabbBounds.translate(scrollX, scrollY);
        }
        return application.graphicService.updateTempAABBBounds(aabbBounds), application.graphicService.transformAABBBounds(attribute, aabbBounds, groupTheme, !1, this), 
        originalAABBBounds.copy(aabbBounds), originalAABBBounds;
    }
    doUpdateAABBBounds() {
        this.updateAABBBoundsStamp++;
        const bounds = super.doUpdateAABBBounds();
        return this.parent && this.parent.addChildUpdateBoundTag(), this._emitCustomEvent("AAABBBoundsChange"), 
        bounds;
    }
    clearUpdateBoundTag() {
        this._updateTag &= UpdateTag.CLEAR_BOUNDS, this._childUpdateTag &= UpdateTag.CLEAR_BOUNDS;
    }
    addUpdateBoundTag() {
        this._updateTag |= UpdateTag.UPDATE_BOUNDS, this.parent && this.parent.addChildUpdateBoundTag();
    }
    addChildUpdateBoundTag() {
        this._childUpdateTag & UpdateTag.UPDATE_BOUNDS || (this._childUpdateTag |= UpdateTag.UPDATE_BOUNDS, 
        this.parent && this.parent.addChildUpdateBoundTag());
    }
    getTheme() {
        return this.theme.getTheme(this);
    }
    incrementalAppendChild(node) {
        const data = super.appendChild(node);
        return this.stage && data && (data.stage = this.stage, data.layer = this.layer), 
        this.addUpdateBoundTag(), application.graphicService.onAddIncremental(node, this, this.stage), 
        data;
    }
    incrementalClearChild() {
        super.removeAllChild(), this.addUpdateBoundTag(), application.graphicService.onClearIncremental(this, this.stage);
    }
    _updateChildToStage(child) {
        return this.stage && child && child.setStage(this.stage, this.layer), this.addUpdateBoundTag(), 
        child;
    }
    appendChild(node, addStage = !0) {
        const data = super.appendChild(node);
        return addStage && this.stage && data && data.setStage(this.stage, this.layer), 
        this.addUpdateBoundTag(), data;
    }
    insertBefore(newNode, referenceNode) {
        return this._updateChildToStage(super.insertBefore(newNode, referenceNode));
    }
    insertAfter(newNode, referenceNode) {
        return this._updateChildToStage(super.insertAfter(newNode, referenceNode));
    }
    insertInto(newNode, idx) {
        return this._updateChildToStage(super.insertInto(newNode, idx));
    }
    removeChild(child) {
        const data = super.removeChild(child);
        return child.stage = null, application.graphicService.onRemove(child), this.addUpdateBoundTag(), 
        data;
    }
    removeAllChild(deep = !1) {
        this.forEachChildren((child => {
            application.graphicService.onRemove(child), deep && child.isContainer && child.removeAllChild(deep);
        })), super.removeAllChild(), this.addUpdateBoundTag();
    }
    setStage(stage, layer) {
        this.stage !== stage && (this.stage = stage, this.layer = layer, this.setStageToShadowRoot(stage, layer), 
        this._onSetStage && this._onSetStage(this, stage, layer), application.graphicService.onSetStage(this, stage), 
        this.forEachChildren((item => {
            item.setStage(stage, this.layer);
        })));
    }
    addUpdatePositionTag() {
        super.addUpdatePositionTag(), this.forEachChildren((g => {
            g.isContainer && g.addUpdateGlobalPositionTag();
        }));
    }
    addUpdateGlobalPositionTag() {
        super.addUpdateGlobalPositionTag(), this.forEachChildren((g => {
            g.isContainer && g.addUpdateGlobalPositionTag();
        }));
    }
    tryUpdateGlobalTransMatrix(clearTag = !0) {
        if (this.shouldUpdateGlobalMatrix()) {
            if (this._globalTransMatrix) {
                if (this.parent) {
                    const m = this.parent.globalTransMatrix;
                    this._globalTransMatrix.setValue(m.a, m.b, m.c, m.d, m.e, m.f);
                }
            } else this._globalTransMatrix = this.parent ? this.parent.globalTransMatrix.clone() : this.transMatrix.clone();
            this.doUpdateGlobalMatrix(), clearTag && this.clearUpdateGlobalPositionTag();
        }
        return this._globalTransMatrix;
    }
    shouldUpdateGlobalMatrix() {
        return !!(this._updateTag & UpdateTag.UPDATE_GLOBAL_MATRIX);
    }
    _getChildByName(name, deep) {
        return this.find((node => node.name === name), deep);
    }
    createOrUpdateChild(graphicName, attributes, graphicType) {
        let graphic = this._getChildByName(graphicName);
        return graphic ? graphic.setAttributes(attributes) : (graphic = application.graphicService.creator[graphicType](attributes), 
        graphic.name = graphicName, this.add(graphic)), graphic;
    }
    clone() {
        return new Group(Object.assign({}, this.attribute));
    }
    getNoWorkAnimateAttr() {
        return Group.NOWORK_ANIMATE_ATTR;
    }
    release(all) {
        all && this.forEachChildren((g => {
            g.release(all);
        })), super.release();
    }
}

Group.NOWORK_ANIMATE_ATTR = NOWORK_ANIMATE_ATTR;

export function createGroup(attributes) {
    return new Group(attributes);
}
//# sourceMappingURL=group.js.map
