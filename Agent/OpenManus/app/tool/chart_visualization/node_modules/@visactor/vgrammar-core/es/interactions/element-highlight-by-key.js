import { isNil } from "@visactor/vutils";

import { BaseInteraction } from "./base";

import { InteractionStateEnum } from "../graph/enums";

export class ElementHighlightByKey extends BaseInteraction {
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
            if (isNil(highlightKey)) return;
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

ElementHighlightByKey.type = "element-highlight-by-key", ElementHighlightByKey.defaultOptions = {
    highlightState: InteractionStateEnum.highlight,
    blurState: InteractionStateEnum.blur,
    trigger: "pointerover",
    triggerOff: "pointerout"
};
//# sourceMappingURL=element-highlight-by-key.js.map