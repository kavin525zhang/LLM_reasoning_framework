"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ElementSelect = void 0;

const vutils_1 = require("@visactor/vutils"), enums_1 = require("../graph/enums"), utils_1 = require("./utils"), base_1 = require("./base");

class ElementSelect extends base_1.BaseInteraction {
    constructor(view, options) {
        super(view, options), this.type = ElementSelect.type, this._resetType = [], this.resetAll = () => {
            const {state: state, reverseState: reverseState} = this.options;
            this._statedElements && this._statedElements.length && (this.clearAllStates(state, reverseState), 
            this.dispatchEvent("reset", {
                elements: this._statedElements,
                options: this.options
            }), this._statedElements = []);
        }, this.handleStart = e => {
            this.start(e.element);
        }, this.handleReset = e => {
            if (!this._statedElements || !this._statedElements.length) return;
            const element = e.element, hasActiveElement = element && this._marks && this._marks.includes(element.mark);
            (this._resetType.includes("view") && !hasActiveElement || this._resetType.includes("self") && hasActiveElement) && this.resetAll();
        }, this.options = Object.assign({}, ElementSelect.defaultOptions, options), this._marks = view.getMarksBySelector(this.options.selector), 
        this._stateMarks = (0, utils_1.groupMarksByState)(this._marks, [ this.options.state, this.options.reverseState ]);
    }
    getStartState() {
        return this.options.state;
    }
    getEvents() {
        const triggerOff = this.options.triggerOff, trigger = this.options.trigger, events = [ {
            type: trigger,
            handler: this.handleStart
        } ], {eventNames: eventNames, resetType: resetType} = (0, utils_1.parseTriggerOffOfSelect)(triggerOff);
        return eventNames.forEach((evt => {
            evt && ((0, vutils_1.isArray)(trigger) ? !trigger.includes(evt) : evt !== trigger) && events.push({
                type: evt,
                handler: this.handleReset
            });
        })), this._resetType = resetType, events;
    }
    start(element) {
        const {state: state, reverseState: reverseState, isMultiple: isMultiple} = this.options;
        if (element && this._marks && this._marks.includes(element.mark)) if (element.hasState(state)) {
            if (this._resetType.includes("self")) {
                const newStatedElements = this._statedElements && this._statedElements.filter((el => el !== element));
                newStatedElements && newStatedElements.length ? this._statedElements = this.updateStates(newStatedElements, this._statedElements, state, reverseState) : this.resetAll();
            }
        } else this._timer && clearTimeout(this._timer), element.addState(state), this._statedElements = this.updateStates(isMultiple && this._statedElements ? [ ...this._statedElements, element ] : [ element ], this._statedElements, state, reverseState), 
        this.dispatchEvent("start", {
            elements: this._statedElements,
            options: this.options
        }), this._resetType.includes("timeout") && (this._timer = setTimeout((() => {
            this.resetAll();
        }), this.options.triggerOff)); else this._resetType.includes("view") && this._statedElements && this._statedElements.length && this.resetAll();
    }
    reset(element) {
        element ? this._marks && this._marks.includes(element.mark) && element.removeState([ this.options.state, this.options.reverseState ]) : this.resetAll();
    }
}

exports.ElementSelect = ElementSelect, ElementSelect.type = "element-select", ElementSelect.defaultOptions = {
    state: enums_1.InteractionStateEnum.selected,
    trigger: "click"
};