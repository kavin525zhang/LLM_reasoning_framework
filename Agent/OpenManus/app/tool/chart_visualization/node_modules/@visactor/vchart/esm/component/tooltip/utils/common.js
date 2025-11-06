var __rest = this && this.__rest || function(s, e) {
    var t = {};
    for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0 && (t[p] = s[p]);
    if (null != s && "function" == typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (p = Object.getOwnPropertySymbols(s); i < p.length; i++) e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]) && (t[p[i]] = s[p[i]]);
    }
    return t;
};

import { isArray, isFunction, isNil, isValid, TimeUtil, isEmpty } from "@visactor/vutils";

import { getTooltipContentValue } from "./get-value";

export const getTooltipActualActiveType = spec => {
    var _a, _b, _c;
    if (!1 === (null == spec ? void 0 : spec.visible)) return [];
    const activeTypeMap = {
        mark: !1 !== (null === (_a = null == spec ? void 0 : spec.mark) || void 0 === _a ? void 0 : _a.visible),
        dimension: !1 !== (null === (_b = null == spec ? void 0 : spec.dimension) || void 0 === _b ? void 0 : _b.visible),
        group: !1 !== (null === (_c = null == spec ? void 0 : spec.group) || void 0 === _c ? void 0 : _c.visible)
    };
    return isValid(null == spec ? void 0 : spec.activeType) && Object.keys(activeTypeMap).forEach((t => {
        var _a;
        activeTypeMap[t] = null === (_a = null == spec ? void 0 : spec.activeType) || void 0 === _a ? void 0 : _a.includes(t);
    })), Object.keys(activeTypeMap).filter((t => activeTypeMap[t]));
};

export const isActiveTypeVisible = (type, spec) => !spec || !1 !== spec.visible && ((!spec[type] || !1 !== spec[type].visible) && !(spec.activeType && !(isArray(spec.activeType) ? spec.activeType.includes(type) : spec.activeType === type)));

export function isEmptyPos(params) {
    return isNil(params.mark) && isNil(params.model) && isNil(params.datum);
}

function addContentLine(result, contentSpec, defaultContent, shapeAttrs, datum, params) {
    const addByDatum = spec => {
        if (spec) {
            const res = {
                datum: datum
            }, finalSpec = isNil(spec.key) && isNil(spec.value) && !isEmpty(spec) ? Object.assign(Object.assign(Object.assign({}, shapeAttrs), defaultContent), spec) : Object.assign(Object.assign({}, shapeAttrs), spec), {key: key, keyFormatter: keyFormatter, keyTimeFormat: keyTimeFormat, keyTimeFormatMode: keyTimeFormatMode, value: value, valueFormatter: valueFormatter, valueTimeFormat: valueTimeFormat, valueTimeFormatMode: valueTimeFormatMode} = finalSpec, others = __rest(finalSpec, [ "key", "keyFormatter", "keyTimeFormat", "keyTimeFormatMode", "value", "valueFormatter", "valueTimeFormat", "valueTimeFormatMode" ]);
            res.key = getTimeString(getTooltipContentValue(key, datum, params, keyFormatter), keyTimeFormat, keyTimeFormatMode), 
            res.value = getTimeString(getTooltipContentValue(value, datum, params, valueFormatter), valueTimeFormat, valueTimeFormatMode), 
            Object.keys(others).forEach((k => {
                res[k] = getTooltipContentValue(finalSpec[k], datum, params);
            })), !1 !== res.visible && (isValid(res.key) || isValid(res.value)) && result.push(res);
        }
    };
    isArray(contentSpec) ? contentSpec.forEach((spec => {
        addByDatum(spec);
    })) : addByDatum(contentSpec);
}

function parseContentFunction(result, contentSpec, defaultContent, shapeAttrs, data, datum, params) {
    if (isFunction(contentSpec)) {
        addContentLine(result, contentSpec(data, params), defaultContent, shapeAttrs, datum, params);
    } else contentSpec && addContentLine(result, contentSpec, defaultContent, shapeAttrs, datum, params);
}

export function parseContent(contentSpec, defaultContent, shapeAttrs, data, datum, params) {
    if (datum && datum.length) {
        const contents = [];
        return datum.forEach((d => {
            isArray(contentSpec) ? contentSpec.forEach((spec => {
                parseContentFunction(contents, spec, defaultContent, shapeAttrs, data, d, params);
            })) : isFunction(contentSpec) ? parseContentFunction(contents, contentSpec, defaultContent, shapeAttrs, data, d, params) : contentSpec && addContentLine(contents, contentSpec, defaultContent, shapeAttrs, d, params);
        })), contents;
    }
    return null;
}

export function combineContents(patternList) {
    if (!patternList || !patternList.length) return null;
    const defaultPatternContent = [];
    return patternList.forEach((({content: content}) => {
        content && content.forEach((c => {
            defaultPatternContent.push(c);
        }));
    })), defaultPatternContent.length ? Object.assign(Object.assign({}, patternList[0]), {
        content: defaultPatternContent
    }) : patternList[0];
}

export const getTimeString = (value, timeFormat, timeFormatMode) => {
    if (!timeFormat && !timeFormatMode) return "object" != typeof value ? null == value ? void 0 : value.toString() : value;
    const timeUtil = TimeUtil.getInstance();
    timeFormat = timeFormat || "%Y%m%d";
    return ("local" === (timeFormatMode = timeFormatMode || "local") ? timeUtil.timeFormat : timeUtil.timeUTCFormat)(timeFormat, value);
};
//# sourceMappingURL=common.js.map
