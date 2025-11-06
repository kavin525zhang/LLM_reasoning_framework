"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getSpecInfo = exports.getFormatFunction = exports.getComponentThemeFromOption = void 0;

const vutils_1 = require("@visactor/vutils"), factory_1 = require("../core/factory");

function getComponentThemeFromOption(type, chartTheme) {
    return (0, vutils_1.get)(chartTheme, `component.${type}`);
}

function getFormatFunction(formatMethod, formatter, text, datum) {
    if (formatMethod) return {
        formatFunc: formatMethod,
        args: [ text, datum ]
    };
    const formatterImpl = factory_1.Factory.getFormatter();
    return formatter && formatterImpl ? {
        formatFunc: formatterImpl,
        args: [ text, datum, formatter ]
    } : {};
}

exports.getComponentThemeFromOption = getComponentThemeFromOption, exports.getFormatFunction = getFormatFunction;

const getSpecInfo = (chartSpec, specKey, compType, filter) => {
    if ((0, vutils_1.isNil)(chartSpec[specKey])) return;
    const isArraySpec = (0, vutils_1.isArray)(chartSpec[specKey]), spec = isArraySpec ? chartSpec[specKey] : [ chartSpec[specKey] ], specInfos = [];
    return spec.forEach(((s, i) => {
        !s || filter && !filter(s) || specInfos.push({
            spec: s,
            specPath: isArraySpec ? [ specKey, i ] : [ specKey ],
            specInfoPath: [ "component", specKey, i ],
            type: compType
        });
    })), specInfos;
};

exports.getSpecInfo = getSpecInfo;
//# sourceMappingURL=util.js.map