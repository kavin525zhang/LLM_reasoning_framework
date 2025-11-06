"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.BrushHighlight = void 0;

const enums_1 = require("../graph/enums"), brush_base_1 = require("./brush-base"), vrender_components_1 = require("@visactor/vrender-components");

class BrushHighlight extends brush_base_1.BrushBase {
    constructor(view, option) {
        super(view, Object.assign({}, BrushHighlight.defaultOptions, option)), this.type = BrushHighlight.type, 
        this.handleBrushUpdate = event => {
            const elements = [];
            if (event.type === vrender_components_1.IOperateType.brushClear) {
                const states = [ this.options.blurState, this.options.highlightState ];
                this._marks.forEach((mark => {
                    mark.elements.forEach((el => {
                        el.removeState(states);
                    }));
                }));
            } else this._marks.forEach((mark => {
                mark.elements.forEach((el => {
                    this.isBrushContainGraphicItem(event.detail.operateMask, el.getGraphicItem()) ? (elements.push(el), 
                    el.updateStates({
                        [this.options.blurState]: !1,
                        [this.options.highlightState]: !0
                    })) : el.updateStates({
                        [this.options.blurState]: !0,
                        [this.options.highlightState]: !1
                    });
                }));
            }));
            this._dispatchEvent(event, elements);
        };
    }
    getStartState() {
        return this.options.highlightState;
    }
}

exports.BrushHighlight = BrushHighlight, BrushHighlight.type = "brush-highlight", 
BrushHighlight.defaultOptions = {
    highlightState: enums_1.InteractionStateEnum.highlight,
    blurState: enums_1.InteractionStateEnum.blur
};
//# sourceMappingURL=brush-highlight.js.map