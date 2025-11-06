import { InteractionStateEnum } from "../graph/enums";

import { BaseInteraction } from "./base";

import { LegendEvent } from "@visactor/vrender-components";

import { isNil } from "@visactor/vutils";

import { generateFilterValue } from "./utils";

export class ElementActiveByLegend extends BaseInteraction {
    constructor(view, options) {
        super(view, options), this.type = ElementActiveByLegend.type, this.handleStart = e => {
            var _a, _b;
            this.start(null === (_b = null === (_a = e.detail) || void 0 === _a ? void 0 : _a.data) || void 0 === _b ? void 0 : _b.id);
        }, this.handleReset = e => {
            this.resetAll();
        }, this.options = Object.assign({}, ElementActiveByLegend.defaultOptions, options), 
        this._marks = view.getMarksBySelector(this.options.selector);
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
    getStartState() {
        return this.options.state;
    }
    start(element) {
        const itemKey = element;
        if (isNil(itemKey)) return;
        const filterValue = generateFilterValue(this.options);
        this._marks.forEach((mark => {
            mark.elements.forEach((el => {
                filterValue(el) === itemKey ? el.addState(this.options.state) : el.removeState(this.options.state);
            }));
        }));
    }
    resetAll() {
        this._marks.forEach((mark => {
            mark.elements.forEach((el => {
                el.removeState(this.options.state);
            }));
        }));
    }
    reset(element) {
        element ? this._marks && this._marks.includes(element.mark) && element.removeState(this.options.state) : this.resetAll();
    }
}

ElementActiveByLegend.type = "element-active-by-legend", ElementActiveByLegend.defaultOptions = {
    state: InteractionStateEnum.active,
    filterType: "groupKey"
};
//# sourceMappingURL=element-active-by-legend.js.map