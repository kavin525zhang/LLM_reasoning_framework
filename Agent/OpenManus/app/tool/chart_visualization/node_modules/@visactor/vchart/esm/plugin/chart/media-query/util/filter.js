import { array, isFunction, isNil } from "@visactor/vutils";

import { Factory } from "../../../../core/factory";

import { SeriesTypeEnum } from "../../../../series/interface";

import { ComponentTypeEnum } from "../../../../component/interface";

import { includeSpec } from "@visactor/vutils-extension";

export const executeMediaQueryActionFilter = (filterType = "chart", filter, action, query, chartSpec, chartSpecInfo) => {
    const result = executeMediaQueryActionFilterType(filterType, chartSpec, chartSpecInfo);
    return Object.assign(Object.assign({}, result), {
        modelInfo: result.modelInfo.filter((info => !!isNil(filter) || array(filter).some((f => isFunction(f) ? f(info, action, query) : includeSpec(info.spec, f)))))
    });
};

export const executeMediaQueryActionFilterType = (filterType = "chart", chartSpec, chartSpecInfo) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const result = {
        modelInfo: []
    };
    if ("chart" === filterType) result.isChart = !0, result.modelInfo.push({
        spec: chartSpec,
        type: "chart"
    }); else if ("region" === filterType) result.modelType = "region", result.specKey = "region", 
    null === (_a = chartSpec.region) || void 0 === _a || _a.forEach(((regionSpec, i) => {
        result.modelInfo.push({
            spec: regionSpec,
            specPath: [ "region", i ],
            type: "region"
        });
    })); else if ("series" === filterType) result.modelType = "series", result.specKey = "series", 
    null === (_b = chartSpec.series) || void 0 === _b || _b.forEach(((seriesSpec, i) => {
        result.modelInfo.push({
            spec: seriesSpec,
            specPath: [ "series", i ],
            type: seriesSpec.type
        });
    })); else if (Object.values(SeriesTypeEnum).includes(filterType)) result.modelType = "series", 
    result.specKey = "series", result.type = filterType, null === (_c = chartSpec.series) || void 0 === _c || _c.forEach(((seriesSpec, i) => {
        seriesSpec.type === filterType && result.modelInfo.push({
            spec: seriesSpec,
            specPath: [ "series", i ],
            type: filterType
        });
    })); else if (Object.values(ComponentTypeEnum).includes(filterType)) {
        result.modelType = "component", result.type = filterType, result.specKey = null === (_d = Factory.getComponentInKey(filterType)) || void 0 === _d ? void 0 : _d.specKey;
        const {specKey: specKey} = result, infoList = array(null !== (_f = null === (_e = chartSpecInfo.component) || void 0 === _e ? void 0 : _e[specKey]) && void 0 !== _f ? _f : []);
        null === (_h = array(null !== (_g = chartSpec[specKey]) && void 0 !== _g ? _g : [])) || void 0 === _h || _h.forEach(((componentSpec, i) => {
            const specInfo = infoList[i];
            specInfo && specInfo.type === filterType ? result.modelInfo.push(Object.assign(Object.assign({}, specInfo), {
                spec: componentSpec
            })) : componentSpec && !1 === componentSpec.visible && result.modelInfo.push({
                type: filterType,
                spec: componentSpec
            });
        }));
    } else {
        const componentTypes = Factory.getComponents().filter((({cmp: cmp}) => cmp.specKey === filterType)).map((({cmp: cmp}) => cmp.type));
        if (componentTypes.length > 0) {
            result.modelType = "component";
            const specKey = filterType;
            result.specKey = specKey;
            const infoList = array(null !== (_k = null === (_j = chartSpecInfo.component) || void 0 === _j ? void 0 : _j[specKey]) && void 0 !== _k ? _k : []);
            array(null !== (_l = chartSpec[specKey]) && void 0 !== _l ? _l : []).forEach(((componentSpec, i) => {
                const specInfo = infoList[i];
                specInfo && componentTypes.includes(specInfo.type) && result.modelInfo.push(Object.assign(Object.assign({}, specInfo), {
                    spec: componentSpec
                }));
            }));
        }
    }
    return result;
};
//# sourceMappingURL=filter.js.map
