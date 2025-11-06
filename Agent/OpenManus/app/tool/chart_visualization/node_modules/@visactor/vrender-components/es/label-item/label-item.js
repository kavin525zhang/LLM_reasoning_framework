import { InputText } from "@visactor/vrender-core";

import { AbstractComponent } from "../core/base";

import { merge } from "@visactor/vutils";

export class StoryLabelItem extends AbstractComponent {
    constructor(attributes, options) {
        super((null == options ? void 0 : options.skipDefault) ? attributes : merge({}, StoryLabelItem.defaultAttributes, attributes));
    }
    render() {
        const {contentOffsetX: contentOffsetX, contentOffsetY: contentOffsetY, lineStyle: lineStyle, symbolStartStyle: symbolStartStyle, symbolEndStyle: symbolEndStyle, symbolStartOuterStyle: symbolStartOuterStyle, titleTop: titleTopText, titleBottom: titleBottomText, titleTopStyle: titleTopStyle, titleBottomStyle: titleBottomStyle, titleSpace: titleSpace, titleTopPanelStyle: titleTopPanelStyle, titleBottomPanelStyle: titleBottomPanelStyle, theme: theme} = this.attribute, group = this.createOrUpdateChild("label-item-container", {
            x: 0,
            y: 0,
            zIndex: 1
        }, "group"), symbolStart = group.createOrUpdateChild("label-item-symbol-start", Object.assign({
            x: 0,
            y: 0
        }, symbolStartStyle), "symbol"), symbolEnd = group.createOrUpdateChild("label-item-symbol-end", Object.assign({
            x: contentOffsetX,
            y: contentOffsetY
        }, symbolEndStyle), "symbol"), symbolStartOut = group.createOrUpdateChild("label-item-symbol-start-out", Object.assign({
            x: 0,
            y: 0
        }, symbolStartOuterStyle), "symbol"), spaceW = titleSpace[0], spaceH = titleSpace[1], titleTopGroup = group.createOrUpdateChild("label-item-title-top-group", {
            x: contentOffsetX,
            y: contentOffsetY,
            clip: !0
        }, "group"), titleTop = titleTopGroup.createOrUpdateChild("label-item-title-top", Object.assign(Object.assign({
            x: spaceW,
            y: -spaceH,
            text: titleTopText
        }, titleTopStyle), {
            textBaseline: "bottom",
            textAlign: "left",
            zIndex: 10
        }), "text"), titleTopBounds = titleTop.AABBBounds;
        contentOffsetX > 0 && titleTopGroup.setAttributes({
            x: contentOffsetX - titleTopBounds.width() - 2 * spaceW
        }), titleTopGroup.setAttributes({
            width: titleTopBounds.width() + 2 * spaceW,
            height: -titleTopBounds.height() - 2 * spaceH
        });
        const titleTopPanel = titleTopGroup.createOrUpdateChild("label-item-title-top-panel", Object.assign(Object.assign({}, titleTopPanelStyle), {
            x: titleTopPanelStyle.padding.left,
            y: (titleTopGroup.attribute.height > 0 ? 0 : titleTopGroup.attribute.height) + titleTopPanelStyle.padding.top,
            width: titleTopGroup.attribute.width - titleTopPanelStyle.padding.left - titleTopPanelStyle.padding.right,
            height: (titleTopGroup.attribute.height > 0 ? 1 : -1) * titleTopGroup.attribute.height - titleTopPanelStyle.padding.bottom - titleTopPanelStyle.padding.top,
            scaleCenter: [ titleTopGroup.attribute.width / 2, titleTopGroup.attribute.height / 2 ]
        }), "rect");
        this._titleTopPanel = titleTopPanel;
        const titleBottomGroup = group.createOrUpdateChild("label-item-title-bottom-group", {
            x: contentOffsetX,
            y: contentOffsetY,
            clip: !0
        }, "group"), titleBottom = titleBottomGroup.createOrUpdateChild("label-item-title-bottom", Object.assign(Object.assign({
            x: spaceW,
            y: spaceH,
            text: titleBottomText
        }, titleBottomStyle), {
            textBaseline: "top",
            textAlign: "left",
            zIndex: 10
        }), "text"), titleBottomBounds = titleBottom.AABBBounds;
        contentOffsetX > 0 && titleBottomGroup.setAttributes({
            x: contentOffsetX - titleBottomBounds.width() - 2 * spaceW
        }), titleBottomGroup.setAttributes({
            width: titleBottomBounds.width() + 2 * spaceW,
            height: titleTopBounds.height() + 2 * spaceH
        });
        const titleBottomPanel = titleBottomGroup.createOrUpdateChild("label-item-title-bottom-panel", Object.assign(Object.assign({}, titleBottomPanelStyle), {
            x: titleBottomPanelStyle.padding.left,
            y: (titleBottomGroup.attribute.height > 0 ? 0 : titleBottomGroup.attribute.height) + titleBottomPanelStyle.padding.top,
            width: titleBottomGroup.attribute.width - titleBottomPanelStyle.padding.left - titleBottomPanelStyle.padding.right,
            height: (titleBottomGroup.attribute.height > 0 ? 1 : -1) * titleBottomGroup.attribute.height - titleBottomPanelStyle.padding.bottom - titleBottomPanelStyle.padding.top,
            scaleCenter: [ titleBottomGroup.attribute.width / 2, titleBottomGroup.attribute.height / 2 ]
        }), "rect");
        this._titleBottomPanel = titleBottomPanel;
        const maxTextWidth = Math.max(titleTop.AABBBounds.width(), titleBottom.AABBBounds.width()) + 2 * spaceW, points = [ {
            x: 0,
            y: 0
        }, contentOffsetX > 0 ? {
            x: contentOffsetX - maxTextWidth,
            y: contentOffsetY
        } : {
            x: contentOffsetX + maxTextWidth,
            y: contentOffsetY
        }, {
            x: contentOffsetX,
            y: contentOffsetY
        } ];
        if ("simple" === theme) {
            points.pop();
            const p = points[1];
            symbolEnd.setAttributes(p);
        }
        const line = group.createOrUpdateChild("label-item-line", Object.assign(Object.assign({
            x: 0,
            y: 0
        }, lineStyle), {
            points: points
        }), "line");
        this._symbolEnd = symbolEnd, this._symbolStart = symbolStart, this._symbolStartOuter = symbolStartOut, 
        this._titleTop = titleTop, this._titleBottom = titleBottom, this._line = line;
    }
    appearAnimate(animateConfig) {
        const {duration: duration = 1e3, easing: easing = "quadOut", symbolStartOuterType: symbolStartOuterType = "scale", titleType: titleType = "typewriter", titlePanelType: titlePanelType = "scale"} = animateConfig, symbolTime = duration / 10;
        let symbolStartOuterFrom, symbolStartOuterTo;
        if (this._symbolStart.setAttributes({
            scaleX: 0,
            scaleY: 0
        }), this._symbolStart.animate().to({
            scaleX: 1,
            scaleY: 1
        }, 5 * symbolTime, easing), "scale" === symbolStartOuterType ? (symbolStartOuterFrom = {
            scaleX: 0,
            scaleY: 0
        }, symbolStartOuterTo = {
            scaleX: 1,
            scaleY: 1
        }) : (symbolStartOuterFrom = {
            clipRange: 0
        }, symbolStartOuterTo = {
            clipRange: 1
        }), this._symbolStartOuter.setAttributes(symbolStartOuterFrom), this._symbolStartOuter.animate().to(symbolStartOuterTo, 5 * symbolTime, easing), 
        this._symbolEnd.setAttributes({
            scaleX: 0,
            scaleY: 0
        }), this._symbolEnd.animate().wait(8 * symbolTime).to({
            scaleX: 1,
            scaleY: 1
        }, 2 * symbolTime, easing), this._line.setAttributes({
            clipRange: 0
        }), this._line.animate().to({
            clipRange: 1
        }, 9 * symbolTime, easing), "typewriter" === titleType) {
            const titleTopText = this._titleTop.attribute.text;
            this._titleTop.setAttributes({
                text: ""
            }), this._titleTop.animate().wait(5 * symbolTime).play(new InputText({
                text: ""
            }, {
                text: titleTopText
            }, 4 * symbolTime, "linear"));
            const titleBottomText = this._titleBottom.attribute.text;
            this._titleBottom.setAttributes({
                text: ""
            }), this._titleBottom.animate().wait(5 * symbolTime).play(new InputText({
                text: ""
            }, {
                text: titleBottomText
            }, 4 * symbolTime, "linear"));
        } else this._titleTop.setAttributes({
            dy: this._titleTop.AABBBounds.height() + 10
        }), this._titleTop.animate().wait(5 * symbolTime).to({
            dy: 0
        }, 4 * symbolTime, "linear"), this._titleBottom.setAttributes({
            dy: -(10 + this._titleBottom.AABBBounds.height())
        }), this._titleBottom.animate().wait(5 * symbolTime).to({
            dy: 0
        }, 4 * symbolTime, "linear");
        "scale" === titlePanelType ? [ this._titleTopPanel, this._titleBottomPanel ].forEach((panel => {
            const scaleX = panel.attribute.scaleX;
            panel.setAttributes({
                scaleX: 0
            }), panel.animate().to({
                scaleX: scaleX
            }, duration, "circInOut");
        })) : "stroke" === titlePanelType && [ this._titleTopPanel, this._titleBottomPanel ].forEach((panel => {
            const b = panel.AABBBounds, totalLen = 2 * (b.width() + b.height());
            panel.setAttributes({
                lineDash: [ 0, 10 * totalLen ]
            }), panel.animate().to({
                lineDash: [ totalLen, 10 * totalLen ]
            }, duration, "quadOut");
        }));
    }
    disappearAnimate(animateConfig) {
        if ("scale" === animateConfig.mode) {
            const {duration: duration = 1e3, easing: easing = "quadOut"} = animateConfig;
            this.animate().to({
                scaleX: 0,
                scaleY: 0
            }, duration, easing);
        } else {
            const {duration: duration = 1e3, easing: easing = "quadOut"} = animateConfig;
            this._line.animate().to({
                clipRange: 0
            }, duration, easing), this._symbolStart.animate().wait(duration / 2).to({
                scaleX: 0,
                scaleY: 0
            }, duration / 2, easing), this._symbolEnd.animate().to({
                scaleX: 0,
                scaleY: 0
            }, duration, easing), this._titleTop.animate().to({
                dy: this._titleTop.AABBBounds.height() + 10
            }, duration / 2, easing), this._titleBottom.animate().to({
                dy: -(10 + this._titleBottom.AABBBounds.height())
            }, duration / 2, easing), this._symbolStartOuter.animate().wait(duration / 2).to({
                clipRange: 0
            }, duration / 2, easing), this._titleTopPanel.animate().to({
                scaleX: 0
            }, duration, "circInOut"), this._titleBottomPanel.animate().to({
                scaleX: 0
            }, duration, "circInOut");
        }
    }
}

StoryLabelItem.defaultAttributes = {
    contentOffsetX: 100,
    contentOffsetY: -60,
    titleTopStyle: {
        fontSize: 12,
        fill: "white"
    },
    titleBottomStyle: {
        fontSize: 12,
        fill: "white"
    },
    lineStyle: {
        stroke: "white",
        lineWidth: 1
    },
    symbolStartStyle: {
        symbolType: "circle",
        size: 3,
        fill: "white"
    },
    symbolEndStyle: {
        symbolType: "circle",
        size: 3,
        fill: "white"
    },
    symbolStartOuterStyle: {
        symbolType: "M0.5,0A0.5,0.5,0,1,1,-0.5,0A0.5,0.5,0,1,1,0.5,0",
        size: 8,
        stroke: "white"
    },
    titleSpace: [ 2, 2 ],
    titleTopPanelStyle: {
        visible: !1,
        padding: {
            left: 0,
            right: 0,
            bottom: 2,
            top: 2
        },
        cornerRadius: 3
    },
    titleBottomPanelStyle: {
        visible: !1,
        padding: {
            left: 0,
            right: 0,
            bottom: 2,
            top: 2
        },
        cornerRadius: 3
    },
    theme: "default"
};
//# sourceMappingURL=label-item.js.map
