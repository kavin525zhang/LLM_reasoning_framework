"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ElementActive = void 0;

const enums_1 = require("../graph/enums"), base_1 = require("./base");

class ElementActive extends base_1.BaseInteraction {
    constructor(view, options) {
        super(view, options), this.type = ElementActive.type, this.handleStart = e => {
            this.start(e.element);
        }, this.handleReset = e => {
            this.reset(e.element);
        }, this.options = Object.assign({}, ElementActive.defaultOptions, options), this._marks = view.getMarksBySelector(this.options.selector);
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
    getStartState() {
        return this.options.state;
    }
    start(element) {
        element && this._marks && this._marks.includes(element.mark) && (element.addState(this.options.state), 
        this._prevActiveElement = element);
    }
    reset(element) {
        const el = null != element ? element : this._prevActiveElement;
        el && this._marks && this._marks.includes(el.mark) && el.removeState(this.options.state);
    }
}

exports.ElementActive = ElementActive, ElementActive.type = "element-active", ElementActive.defaultOptions = {
    state: enums_1.InteractionStateEnum.active,
    trigger: "pointerover",
    triggerOff: "pointerout"
};
//# sourceMappingURL=element-active.js.map