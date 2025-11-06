import { InteractionStateEnum } from "../graph/enums";

import { BrushBase } from "./brush-base";

import { IOperateType } from "@visactor/vrender-components";

export class BrushHighlight extends BrushBase {
    constructor(view, option) {
        super(view, Object.assign({}, BrushHighlight.defaultOptions, option)), this.type = BrushHighlight.type, 
        this.handleBrushUpdate = event => {
            const elements = [];
            if (event.type === IOperateType.brushClear) {
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

BrushHighlight.type = "brush-highlight", BrushHighlight.defaultOptions = {
    highlightState: InteractionStateEnum.highlight,
    blurState: InteractionStateEnum.blur
};
//# sourceMappingURL=brush-highlight.js.map