import { isArray, isNumber, isValid } from "@visactor/vutils";

import { Factory } from "../../core";

import { ComponentTypeEnum } from "../../component/interface";

import { setProperty } from "@visactor/vutils-extension";

import { getRelatedRegionInfo, getRelatedSeriesInfo } from "./util";

import { array } from "../../util";

import { getSpecInfo } from "../../component/util";

export class BaseChartSpecTransformer {
    constructor(option) {
        this._option = option, this.type = option.type, this.seriesType = option.seriesType;
    }
    initChartSpec(chartSpec) {
        return this.transformSpec(chartSpec), this.transformModelSpec(chartSpec);
    }
    transformSpec(chartSpec) {
        chartSpec.region && 0 !== chartSpec.region.length || (chartSpec.region = [ {} ]), 
        void 0 === chartSpec.tooltip && (chartSpec.tooltip = {}), isValid(chartSpec.stackInverse) && chartSpec.region.forEach((r => {
            !isValid(r.stackInverse) && (r.stackInverse = chartSpec.stackInverse);
        })), isValid(chartSpec.stackSort) && chartSpec.region.forEach((r => {
            !isValid(r.stackSort) && (r.stackSort = chartSpec.stackSort);
        }));
    }
    generateTransform(chartSpec, isRuntime) {
        return (constructor, specInfo, chartSpecInfo) => {
            const {spec: spec, specPath: specPath, specInfoPath: specInfoPath, type: type} = specInfo, transformer = new constructor.transformerConstructor(Object.assign(Object.assign({}, this._option), {
                type: type
            })), transformResult = transformer.transformSpec(spec, chartSpec, chartSpecInfo), chartSpecInfoValue = Object.assign(Object.assign({}, specInfo), transformResult);
            isRuntime ? chartSpecInfoValue.theme = transformer.getTheme(spec, chartSpec) : setProperty(chartSpec, specPath, transformResult.spec), 
            setProperty(chartSpecInfo, null != specInfoPath ? specInfoPath : specPath, chartSpecInfoValue);
        };
    }
    transformModelSpec(chartSpec) {
        return this.createSpecInfo(chartSpec, this.generateTransform(chartSpec, !1));
    }
    createSpecInfo(chartSpec, transform) {
        var _a, _b;
        transform || (transform = this.generateTransform(chartSpec, !0));
        const currentChartSpecInfo = {};
        return this.forEachRegionInSpec(chartSpec, transform, currentChartSpecInfo), this.forEachSeriesInSpec(chartSpec, transform, currentChartSpecInfo), 
        null === (_a = currentChartSpecInfo.series) || void 0 === _a || _a.forEach(((seriesSpecInfo, i) => {
            var _a, _b;
            const region = (null !== (_b = null !== (_a = getRelatedRegionInfo(seriesSpecInfo, currentChartSpecInfo)) && void 0 !== _a ? _a : currentChartSpecInfo.region) && void 0 !== _b ? _b : [])[0];
            region && (region.seriesIndexes || (region.seriesIndexes = []), region.seriesIndexes.push(i), 
            seriesSpecInfo.regionIndexes = region.regionIndexes.slice());
        })), this.forEachComponentInSpec(chartSpec, transform, currentChartSpecInfo), Object.values(null !== (_b = currentChartSpecInfo.component) && void 0 !== _b ? _b : {}).forEach((specInfoList => specInfoList.forEach(((componentSpecInfo, i) => {
            var _a, _b, _c;
            if (componentSpecInfo) {
                if (!componentSpecInfo.regionIndexes) {
                    const relatedRegion = null !== (_b = null !== (_a = getRelatedRegionInfo(componentSpecInfo, currentChartSpecInfo)) && void 0 !== _a ? _a : currentChartSpecInfo.region) && void 0 !== _b ? _b : [];
                    componentSpecInfo.regionIndexes = relatedRegion.map((region => region.regionIndexes[0]));
                }
                if (!componentSpecInfo.seriesIndexes) {
                    const seriesInfo = getRelatedSeriesInfo(componentSpecInfo, currentChartSpecInfo);
                    if (seriesInfo) componentSpecInfo.seriesIndexes = seriesInfo.map((({seriesIndexes: seriesIndexes}) => seriesIndexes[0])); else {
                        const seriesIndexSet = new Set;
                        (null !== (_c = componentSpecInfo.regionIndexes) && void 0 !== _c ? _c : []).forEach((regionIndex => {
                            var _a, _b;
                            const region = null === (_a = currentChartSpecInfo.region) || void 0 === _a ? void 0 : _a[regionIndex];
                            null === (_b = null == region ? void 0 : region.seriesIndexes) || void 0 === _b || _b.forEach((seriesIndex => seriesIndexSet.add(seriesIndex)));
                        })), componentSpecInfo.seriesIndexes = Array.from(seriesIndexSet);
                    }
                }
            }
        })))), currentChartSpecInfo;
    }
    _isValidSeries(seriesType) {
        return !0;
    }
    _getDefaultSeriesSpec(chartSpec, pickKeys, pickKeys2) {
        var _a, _b, _c, _d;
        const series = {
            dataKey: chartSpec.dataKey,
            hover: chartSpec.hover,
            select: chartSpec.select,
            label: chartSpec.label,
            seriesStyle: chartSpec.seriesStyle,
            animation: null !== (_a = chartSpec.animation) && void 0 !== _a ? _a : this._option.animation,
            animationThreshold: null !== (_b = chartSpec.animationThreshold) && void 0 !== _b ? _b : null === (_d = (_c = this._option).getTheme) || void 0 === _d ? void 0 : _d.call(_c).animationThreshold,
            animationAppear: chartSpec.animationAppear,
            animationDisappear: chartSpec.animationDisappear,
            animationEnter: chartSpec.animationEnter,
            animationUpdate: chartSpec.animationUpdate,
            animationExit: chartSpec.animationExit,
            animationNormal: chartSpec.animationNormal,
            animationState: chartSpec.animationState,
            extensionMark: chartSpec.extensionMark,
            large: chartSpec.large,
            largeThreshold: chartSpec.largeThreshold,
            progressiveStep: chartSpec.progressiveStep,
            progressiveThreshold: chartSpec.progressiveThreshold,
            background: chartSpec.seriesBackground,
            invalidType: chartSpec.invalidType,
            seriesField: chartSpec.seriesField,
            morph: chartSpec.morph,
            interactions: chartSpec.interactions
        }, seriesType = this.seriesType;
        return seriesType && (series.type = seriesType, series[seriesType] = chartSpec[seriesType]), 
        pickKeys && pickKeys.length && pickKeys.forEach((k => {
            series[k] = chartSpec[k];
        })), pickKeys2 && pickKeys2.length && pickKeys2.forEach((k => {
            series[k] = chartSpec[k];
        })), series;
    }
    forEachRegionInSpec(chartSpec, callbackfn, chartSpecInfo) {
        var _a;
        return (null !== (_a = chartSpec.region) && void 0 !== _a ? _a : []).map(((spec, index) => callbackfn(Factory.getRegionInType("region"), {
            spec: spec,
            specPath: [ "region", index ],
            type: "region",
            regionIndexes: [ index ]
        }, chartSpecInfo)));
    }
    forEachSeriesInSpec(chartSpec, callbackfn, chartSpecInfo) {
        var _a;
        return (null !== (_a = chartSpec.series) && void 0 !== _a ? _a : []).map(((spec, index) => callbackfn(Factory.getSeriesInType(spec.type), {
            spec: spec,
            specPath: [ "series", index ],
            type: spec.type,
            seriesIndexes: [ index ]
        }, chartSpecInfo)));
    }
    forEachComponentInSpec(chartSpec, callbackfn, chartSpecInfo) {
        var _a, _b, _c;
        const results = [], components = Factory.getComponents();
        let cartesianAxis, polarAxis, geoCoordinate, tooltip;
        const otherComponents = [];
        for (let index = 0; index < components.length; index++) {
            const {cmp: cmp, alwaysCheck: alwaysCheck} = components[index];
            cmp.type.startsWith(ComponentTypeEnum.cartesianAxis) ? cartesianAxis = cmp : cmp.type.startsWith(ComponentTypeEnum.polarAxis) ? polarAxis = cmp : cmp.type === ComponentTypeEnum.geoCoordinate ? geoCoordinate = cmp : (alwaysCheck || chartSpec[null !== (_a = cmp.specKey) && void 0 !== _a ? _a : cmp.type]) && (cmp.type === ComponentTypeEnum.tooltip ? tooltip = cmp : otherComponents.push(cmp));
        }
        let hasInitAxis = !1;
        if (cartesianAxis) {
            const infoList = cartesianAxis.getSpecInfo(chartSpec, chartSpecInfo);
            (null == infoList ? void 0 : infoList.length) > 0 && (hasInitAxis = !0, infoList.forEach((info => {
                const cmp = Factory.getComponentInKey(info.type);
                results.push(callbackfn(cmp, info, chartSpecInfo));
            })));
        }
        if (polarAxis && !hasInitAxis) {
            const infoList = polarAxis.getSpecInfo(chartSpec, chartSpecInfo);
            (null == infoList ? void 0 : infoList.length) > 0 && (hasInitAxis = !0, infoList.forEach((info => {
                const cmp = Factory.getComponentInKey(info.type);
                results.push(callbackfn(cmp, info, chartSpecInfo));
            })));
        }
        return geoCoordinate && !hasInitAxis && (null === (_b = geoCoordinate.getSpecInfo(chartSpec, chartSpecInfo)) || void 0 === _b || _b.forEach((info => {
            results.push(callbackfn(geoCoordinate, info, chartSpecInfo));
        }))), otherComponents.forEach((C => {
            var _a;
            null === (_a = C.getSpecInfo ? C.getSpecInfo(chartSpec, chartSpecInfo) : getSpecInfo(chartSpec, C.specKey, C.type)) || void 0 === _a || _a.forEach((info => {
                results.push(callbackfn(C, info, chartSpecInfo));
            }));
        })), tooltip && (null === (_c = getSpecInfo(chartSpec, tooltip.specKey, tooltip.type)) || void 0 === _c || _c.forEach((info => {
            results.push(callbackfn(tooltip, info, chartSpecInfo));
        }))), results;
    }
    transformSeriesSpec(spec) {
        const defaultSeriesSpec = this._getDefaultSeriesSpec(spec);
        spec.series && 0 !== spec.series.length ? spec.series.forEach((s => {
            this._isValidSeries(s.type) && Object.keys(defaultSeriesSpec).forEach((k => {
                k in s || (s[k] = defaultSeriesSpec[k]);
            }));
        })) : spec.series = [ defaultSeriesSpec ];
    }
    _findBandAxisBySeries(seriesSpec, seriesIndex, axesSpec) {
        const matchOrient = "horizontal" === (null == seriesSpec ? void 0 : seriesSpec.direction) ? [ "left", "right" ] : [ "top", "bottom" ];
        return axesSpec.find((axis => {
            if (!matchOrient.includes(axis.orient)) return !1;
            if (isValid(axis.seriesId)) {
                if (array(axis.seriesId).includes(null == seriesSpec ? void 0 : seriesSpec.id)) return !0;
            } else if (isValid(axis.seriesIndex)) {
                if (array(axis.seriesIndex).includes(seriesIndex)) return !0;
            } else if ("band" === axis.type) return !0;
            return !0;
        }));
    }
    _applyAxisBandSize(axis, extend, barWidthSpec) {
        const {barMaxWidth: barMaxWidth, barMinWidth: barMinWidth, barWidth: barWidth, barGapInGroup: barGapInGroup} = barWidthSpec;
        let hasBarWidth = !1;
        isNumber(barMinWidth) ? (axis.minBandSize = barMinWidth, hasBarWidth = !0) : isNumber(barWidth) ? (axis.minBandSize = barWidth, 
        hasBarWidth = !0) : isNumber(barMaxWidth) && (axis.minBandSize = barMaxWidth, hasBarWidth = !0), 
        hasBarWidth && (axis.bandSizeLevel = Number.MAX_VALUE, axis.bandSizeExtend = {
            extend: extend,
            gap: isArray(barGapInGroup) ? barGapInGroup[barGapInGroup.length - 1] : barGapInGroup
        });
    }
}
//# sourceMappingURL=base-chart-transformer.js.map
