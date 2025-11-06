import { get, isArray, isNil } from "@visactor/vutils";

import { Factory } from "../core/factory";

export function getComponentThemeFromOption(type, chartTheme) {
    return get(chartTheme, `component.${type}`);
}

export function getFormatFunction(formatMethod, formatter, text, datum) {
    if (formatMethod) return {
        formatFunc: formatMethod,
        args: [ text, datum ]
    };
    const formatterImpl = Factory.getFormatter();
    return formatter && formatterImpl ? {
        formatFunc: formatterImpl,
        args: [ text, datum, formatter ]
    } : {};
}

export const getSpecInfo = (chartSpec, specKey, compType, filter) => {
    if (isNil(chartSpec[specKey])) return;
    const isArraySpec = isArray(chartSpec[specKey]), spec = isArraySpec ? chartSpec[specKey] : [ chartSpec[specKey] ], specInfos = [];
    return spec.forEach(((s, i) => {
        !s || filter && !filter(s) || specInfos.push({
            spec: s,
            specPath: isArraySpec ? [ specKey, i ] : [ specKey ],
            specInfoPath: [ "component", specKey, i ],
            type: compType
        });
    })), specInfos;
};
//# sourceMappingURL=util.js.map