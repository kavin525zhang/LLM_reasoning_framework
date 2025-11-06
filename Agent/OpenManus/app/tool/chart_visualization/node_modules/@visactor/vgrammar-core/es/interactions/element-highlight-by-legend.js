import { InteractionStateEnum } from "../graph/enums";

import { BaseInteraction } from "./base";

import { LegendEvent } from "@visactor/vrender-components";

import { isNil } from "@visactor/vutils";

import { generateFilterValue } from "./utils";

export class ElementHighlightByLegend extends BaseInteraction {
    constructor(view, options) {
        super(view, options), this.type = ElementHighlightByLegend.type, this.handleStart = (e, element) => {
            var _a, _b;
            this.start(null === (_b = null === (_a = e.detail) || void 0 === _a ? void 0 : _a.data) || void 0 === _b ? void 0 : _b.id);
        }, this.handleReset = e => {
            this.resetAll();
        }, this.options = Object.assign({}, ElementHighlightByLegend.defaultOptions, options), 
        this._marks = view.getMarksBySelector(this.options.selector);
    }
    getStartState() {
        return this.options.highlightState;
    }
    getEvents() {
        return [ {
            type: LegendEvent.legendItemHover,
            handler: this.handleStart
        }, {
            type: LegendEvent.legendItemUnHover,
            handler: this.handleReset
        } ];
    }
    start(itemKey) {
        if (isNil(itemKey)) return;
        const filterValue = generateFilterValue(this.options);
        this._marks.forEach((mark => {
            mark.elements.forEach((el => {
                filterValue(el) === itemKey ? el.updateStates({
                    [this.options.blurState]: !1,
                    [this.options.highlightState]: !0
                }) : el.updateStates({
                    [this.options.blurState]: !0,
                    [this.options.highlightState]: !1
                });
            }));
        }));
    }
    resetAll() {
        const states = [ this.options.highlightState, this.options.blurState ];
        this._marks.forEach((mark => {
            mark.elements.forEach((el => {
                el.removeState(states);
            }));
        }));
    }
    reset(element) {
        element ? this._marks && this._marks.includes(element.mark) && element.removeState([ this.options.highlightState, this.options.blurState ]) : this.resetAll();
    }
}

ElementHighlightByLegend.type = "element-highlight-by-legend", ElementHighlightByLegend.defaultOptions = {
    highlightState: InteractionStateEnum.highlight,
    blurState: InteractionStateEnum.blur,
    filterType: "groupKey"
};
//# sourceMappingURL=element-highlight-by-legend.js.map