"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ElementHighlightByLegend = void 0;

const enums_1 = require("../graph/enums"), base_1 = require("./base"), vrender_components_1 = require("@visactor/vrender-components"), vutils_1 = require("@visactor/vutils"), utils_1 = require("./utils");

class ElementHighlightByLegend extends base_1.BaseInteraction {
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
            type: vrender_components_1.LegendEvent.legendItemHover,
            handler: this.handleStart
        }, {
            type: vrender_components_1.LegendEvent.legendItemUnHover,
            handler: this.handleReset
        } ];
    }
    start(itemKey) {
        if ((0, vutils_1.isNil)(itemKey)) return;
        const filterValue = (0, utils_1.generateFilterValue)(this.options);
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

exports.ElementHighlightByLegend = ElementHighlightByLegend, ElementHighlightByLegend.type = "element-highlight-by-legend", 
ElementHighlightByLegend.defaultOptions = {
    highlightState: enums_1.InteractionStateEnum.highlight,
    blurState: enums_1.InteractionStateEnum.blur,
    filterType: "groupKey"
};
//# sourceMappingURL=element-highlight-by-legend.js.map