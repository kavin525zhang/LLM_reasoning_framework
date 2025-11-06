import { isNil } from "@visactor/vutils";

import { ElementHighlight } from "./element-highlight";

export class ElementHighlightByGraphicName extends ElementHighlight {
    constructor(view, options) {
        super(view, options), this.type = ElementHighlightByGraphicName.type, this.handleStart = e => {
            if (e && e.element && this._marks.includes(e.element.mark)) {
                if (this.options.shouldStart ? this.options.shouldStart(e) : this._filterByName(e)) {
                    const itemKey = this._parseTargetKey(e, e.element);
                    this.start(itemKey);
                }
            }
        }, this.handleReset = e => {
            e && e.element && this._marks.includes(e.element.mark) && this.reset();
        }, this.options = Object.assign({}, ElementHighlightByGraphicName.defaultOptions, options), 
        this._marks = view.getMarksBySelector(this.options.selector);
    }
    _filterByName(e) {
        var _a;
        return !!(null === (_a = null == e ? void 0 : e.target) || void 0 === _a ? void 0 : _a.name);
    }
    _parseTargetKey(e, element) {
        return e.target.name;
    }
    start(itemKey) {
        isNil(itemKey) || this._marks.forEach((mark => {
            mark.elements.forEach((el => {
                var _a;
                (null === (_a = el.getGraphicItem()) || void 0 === _a ? void 0 : _a.name) === itemKey ? el.updateStates({
                    [this.options.blurState]: !1,
                    [this.options.highlightState]: !0
                }) : el.updateStates({
                    [this.options.blurState]: !0,
                    [this.options.highlightState]: !1
                });
            }));
        }));
    }
    reset() {
        const states = [ this.options.blurState, this.options.highlightState ];
        this._marks.forEach((mark => {
            mark.elements.forEach((el => {
                el.removeState(states);
            }));
        }));
    }
}

ElementHighlightByGraphicName.type = "element-highlight-by-graphic-name";
//# sourceMappingURL=element-highlight-by-graphic-name.js.map