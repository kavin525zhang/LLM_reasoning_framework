"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ElementHighlightByKey = void 0;

const vutils_1 = require("@visactor/vutils"), base_1 = require("./base"), enums_1 = require("../graph/enums");

class ElementHighlightByKey extends base_1.BaseInteraction {
    constructor(view, options) {
        super(view, options), this.type = ElementHighlightByKey.type, this.handleStart = e => {
            this.start(e.element);
        }, this.handleReset = e => {
            e.element && this._marks && this._marks.includes(e.element.mark) && this.resetAll();
        }, this.options = Object.assign({}, ElementHighlightByKey.defaultOptions, options), 
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
    resetAll() {
        const states = [ this.options.highlightState, this.options.blurState ];
        this._marks.forEach((mark => {
            mark.elements.forEach((el => {
                el.removeState(states);
            }));
        }));
    }
    start(element) {
        if (element && this._marks && this._marks.includes(element.mark)) {
            const highlightKey = element.key;
            if ((0, vutils_1.isNil)(highlightKey)) return;
            this._marks.forEach((mark => {
                mark.elements.forEach((el => {
                    el.key === highlightKey ? el.updateStates({
                        [this.options.blurState]: !1,
                        [this.options.highlightState]: !0
                    }) : el.updateStates({
                        [this.options.blurState]: !0,
                        [this.options.highlightState]: !1
                    });
                }));
            }));
        }
    }
    reset(element) {
        element ? this._marks && this._marks.includes(element.mark) && element.removeState([ this.options.highlightState, this.options.blurState ]) : this.resetAll();
    }
}

exports.ElementHighlightByKey = ElementHighlightByKey, ElementHighlightByKey.type = "element-highlight-by-key", 
ElementHighlightByKey.defaultOptions = {
    highlightState: enums_1.InteractionStateEnum.highlight,
    blurState: enums_1.InteractionStateEnum.blur,
    trigger: "pointerover",
    triggerOff: "pointerout"
};
//# sourceMappingURL=element-highlight-by-key.js.map