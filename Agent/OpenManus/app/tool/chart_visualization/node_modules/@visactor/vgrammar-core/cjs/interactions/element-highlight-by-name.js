"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ElementHighlightByName = void 0;

const enums_1 = require("../graph/enums"), base_1 = require("./base"), vutils_1 = require("@visactor/vutils"), utils_1 = require("./utils");

class ElementHighlightByName extends base_1.BaseInteraction {
    constructor(view, options) {
        super(view, options), this.type = ElementHighlightByName.type, this.handleStart = (e, element) => {
            if (this.options.shouldStart ? this.options.shouldStart(e) : this._filterByName(e)) {
                const itemKey = this._parseTargetKey(e, element);
                this.start(itemKey);
            }
        }, this.handleReset = e => {
            (this.options.shouldReset ? this.options.shouldReset(e) : this._filterByName(e)) && this.resetAll();
        }, this.options = Object.assign({}, ElementHighlightByName.defaultOptions, options), 
        this._marks = view.getMarksBySelector(this.options.selector);
    }
    getStartState() {
        return this.options.highlightState;
    }
    getEvents() {
        return [ {
            type: this.options.trigger,
            handler: this.handleStart
        }, {
            type: this.options.triggerOff,
            handler: this.handleReset
        } ];
    }
    _filterByName(e) {
        var _a;
        const names = (0, vutils_1.array)(this.options.graphicName);
        return (null === (_a = null == e ? void 0 : e.target) || void 0 === _a ? void 0 : _a.name) && names.includes(e.target.name);
    }
    _parseTargetKey(e, element) {
        return this.options.parseData ? this.options.parseData(e) : "text" === e.target.type ? e.target.attribute.text : null;
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
        const states = [ this.options.blurState, this.options.highlightState ];
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

exports.ElementHighlightByName = ElementHighlightByName, ElementHighlightByName.type = "element-highlight-by-name", 
ElementHighlightByName.defaultOptions = {
    trigger: "pointerover",
    triggerOff: "pointerout",
    highlightState: enums_1.InteractionStateEnum.highlight,
    blurState: enums_1.InteractionStateEnum.blur,
    filterType: "groupKey"
};
//# sourceMappingURL=element-highlight-by-name.js.map