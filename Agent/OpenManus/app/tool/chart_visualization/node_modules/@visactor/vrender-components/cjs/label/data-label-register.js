"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getLabelComponent = exports.registerLabelComponent = void 0;

const labelComponentMap = {}, registerLabelComponent = (type, LabelClass) => {
    labelComponentMap[type] = LabelClass;
};

exports.registerLabelComponent = registerLabelComponent;

const getLabelComponent = type => labelComponentMap[type];

exports.getLabelComponent = getLabelComponent;
//# sourceMappingURL=data-label-register.js.map