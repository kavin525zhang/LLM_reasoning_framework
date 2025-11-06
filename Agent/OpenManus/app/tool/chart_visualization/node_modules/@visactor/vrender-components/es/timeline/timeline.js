import { isArray, merge } from "@visactor/vutils";

import { AbstractComponent } from "../core/base";

import { loadTimelineComponent } from "./register";

loadTimelineComponent();

export class Timeline extends AbstractComponent {
    constructor(attributes, options) {
        super((null == options ? void 0 : options.skipDefault) ? attributes : merge({}, Timeline.defaultAttributes, attributes)), 
        this.name = "timeline";
    }
    render() {
        const {width: width, lineStyle: lineStyle, activeLineStyle: activeLineStyle, symbolStyle: symbolStyle, activeSymbolStyle: activeSymbolStyle, labelStyle: labelStyle, activeLabelStyle: activeLabelStyle, times: times, pointLayoutMode: pointLayoutMode, labelSpace: labelSpace, clipRange: clipRange, animation: animation} = this.attribute;
        if (!times || !times.length) return;
        const symbolHeight = (isArray(symbolStyle.size) ? symbolStyle.size[1] : symbolStyle.size) || 0, activeSymbolHeight = (isArray(activeSymbolStyle.size) ? activeSymbolStyle.size[1] : activeSymbolStyle.size) || 0, lineSymbolHeight = Math.max(lineStyle.lineWidth || 0, activeLineStyle.lineWidth || 0, symbolHeight, activeSymbolHeight), lineY = lineSymbolHeight / 2, lineAttr = {
            y: lineY,
            points: [ {
                x: 0,
                y: 0
            }, {
                x: width,
                y: 0
            } ]
        };
        this._line = this.createOrUpdateChild("line-axes", Object.assign(Object.assign({}, lineStyle), lineAttr), "line"), 
        this._activeLine = this.createOrUpdateChild("active-line-axes", Object.assign(Object.assign(Object.assign({}, activeLineStyle), lineAttr), {
            clipRange: clipRange
        }), "line");
        const activeWidth = width * clipRange, symbolGroup = this.createOrUpdateChild("symbol-group", {
            y: lineY
        }, "group"), symbolSpace = 1 === times.length ? width : "space-between" === pointLayoutMode ? width / (times.length - 1) : width / times.length, symbolStartX = "space-between" === pointLayoutMode ? 0 : symbolSpace / 2;
        this._timesPercent = times.map(((_, i) => (symbolStartX + symbolSpace * i) / width)), 
        times.forEach(((item, i) => {
            const x = this._timesPercent[i] * width;
            symbolGroup.createOrUpdateChild(item.label, Object.assign(Object.assign({}, symbolStyle), {
                x: x
            }), "symbol");
        })), this._symbolGroup = symbolGroup;
        const labelY = lineSymbolHeight + labelSpace, labelGroup = this.createOrUpdateChild("label-group", {
            y: labelY
        }, "group");
        times.forEach(((item, i) => {
            const x = this._timesPercent[i] * width;
            labelGroup.createOrUpdateChild(item.label, Object.assign(Object.assign({}, labelStyle), {
                x: x,
                text: item.label
            }), "text");
        })), this._labelGroup = labelGroup;
        const setActive = (group, activeStyle) => {
            group.forEachChildren((label => {
                if (label.currentStates) {
                    const currentStates = label.currentStates;
                    label.clearStates(), label.useStates(currentStates, !1);
                }
                label.states = {
                    active: activeStyle
                }, label.attribute.x <= activeWidth && label.useStates([ "active" ], animation);
            }));
        };
        setActive(labelGroup, activeLabelStyle), setActive(symbolGroup, activeSymbolStyle);
    }
    appearAnimate(animateConfig) {
        const {duration: duration = 1e3, easing: easing = "quadOut"} = animateConfig, {activeLabelStyle: activeLabelStyle, activeSymbolStyle: activeSymbolStyle} = this.attribute, percent = duration / 1e3, lineDuration = 500 * percent, activeLineDuration = 200 * percent, perSymbolDuration = 100 * percent, perSymbolNormalDuration = 90 * percent, symbolDelay = 100 * percent, symbolNormalDelay = 600 * percent;
        if (this._line && (this._line.setAttributes({
            clipRange: 0
        }), this._line.animate().to({
            clipRange: 1
        }, lineDuration, easing)), this._activeLine && (this._activeLine.setAttributes({
            opacity: 0
        }), this._activeLine.animate().wait(500).to({
            opacity: 1
        }, activeLineDuration, easing)), this._symbolGroup) {
            const size = this._symbolGroup.count - 1, delay = percent * (1 === size ? 0 : 400 / (size - 1)), delayNormal = percent * (1 === size ? 0 : 240 / (size - 1));
            this._symbolGroup.forEachChildren(((symbol, i) => {
                const originAttrs = {};
                Object.keys(activeSymbolStyle).forEach((k => {
                    originAttrs[k] = symbol.attribute[k];
                })), symbol.setAttributes({
                    opacity: 0
                }), symbol.animate().wait(symbolDelay + delay * i).to({
                    opacity: 1
                }, perSymbolDuration, easing), symbol.animate().wait(symbolNormalDelay + delayNormal * i).to(Object.assign({}, activeSymbolStyle), perSymbolNormalDuration, easing).to(Object.assign({}, originAttrs), perSymbolNormalDuration, easing);
            }));
        }
        if (this._labelGroup) {
            const size = this._labelGroup.count - 1, delay = percent * (1 === size ? 0 : 400 / (size - 1)), delayNormal = percent * (1 === size ? 0 : 240 / (size - 1));
            this._labelGroup.forEachChildren(((label, i) => {
                const originAttrs = {};
                Object.keys(activeLabelStyle).forEach((k => {
                    originAttrs[k] = label.attribute[k];
                })), label.setAttributes({
                    opacity: 0
                }), label.animate().wait(symbolDelay + delay * i).to({
                    opacity: 1
                }, perSymbolDuration, easing), label.animate().wait(symbolNormalDelay + delayNormal * i).to(Object.assign({
                    dy: 10
                }, activeLabelStyle), perSymbolNormalDuration, easing).to(Object.assign({
                    dy: 0
                }, originAttrs), perSymbolNormalDuration, easing);
            }));
        }
    }
    goto(flag, animateConfig) {
        let {clipRange: clipRange} = this.attribute;
        const {animation: animation} = this.attribute;
        if (flag > 0) {
            if (clipRange >= 1) return;
            clipRange < 0 && (clipRange = 0);
        } else {
            if (clipRange <= 0) return;
            clipRange > 1 && (clipRange = 1);
        }
        clipRange !== this.attribute.clipRange && this.setAttributes({
            clipRange: clipRange
        });
        let i = 0;
        for (;i < this._timesPercent.length && !(clipRange < this._timesPercent[i]); i++) ;
        const nextClipRange = flag > 0 ? this._timesPercent[i] || 1 : this._timesPercent[i - 1] || 0;
        if (animation) {
            const {duration: duration = 1e3, easing: easing = "quadOut"} = animateConfig;
            this.animate().to({
                clipRange: nextClipRange
            }, duration, easing);
        } else this.setAttributes({
            clipRange: nextClipRange
        });
    }
    forward(animateConfig) {
        this.goto(1, animateConfig);
    }
    backward(animateConfig) {
        this.goto(-1, animateConfig);
    }
}

Timeline.defaultAttributes = {
    labelSpace: 10,
    pointLayoutMode: "space-around",
    animation: !0,
    symbolStyle: {
        fill: "black",
        size: 12,
        symbolType: "circle"
    },
    activeSymbolStyle: {
        fill: "orange",
        size: 16
    },
    lineStyle: {
        lineDash: [ 2, 2 ],
        lineCap: "butt",
        stroke: "black",
        lineWidth: 2
    },
    activeLineStyle: {
        stroke: "orange",
        lineWidth: 4
    },
    labelStyle: {
        fontSize: 12,
        fill: "black",
        textAlign: "center",
        textBaseline: "top"
    },
    activeLabelStyle: {
        fontSize: 14,
        fill: "orange"
    },
    clipRange: 0
};
//# sourceMappingURL=timeline.js.map
