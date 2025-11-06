"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerLabelMark = exports.LabelMark = void 0;

const vgrammar_core_1 = require("@visactor/vgrammar-core"), factory_1 = require("./../core/factory"), text_1 = require("./text");

class LabelMark extends text_1.TextMark {
    constructor() {
        super(...arguments), this.skipEncode = !1;
    }
    getRule() {
        return this._rule;
    }
    setRule(rule) {
        this._rule = rule;
    }
    getTarget() {
        return this._target;
    }
    setTarget(target) {
        this._target = target, this._rule || this.setRule(target.type);
    }
    getComponent() {
        return this._component;
    }
    setComponent(component) {
        this._component = component;
    }
}

exports.LabelMark = LabelMark, LabelMark.type = "text", LabelMark.constructorType = "label";

const registerLabelMark = () => {
    factory_1.Factory.registerMark(LabelMark.constructorType, LabelMark), (0, vgrammar_core_1.registerTextGraphic)();
};

exports.registerLabelMark = registerLabelMark;
//# sourceMappingURL=label.js.map
