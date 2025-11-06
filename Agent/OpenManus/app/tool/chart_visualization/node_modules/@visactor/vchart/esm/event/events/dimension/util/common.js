import { isNil, array, isValid, isValidNumber } from "@visactor/vutils";

import { isDiscrete } from "@visactor/vscale";

const isInBound = (pos, min, max) => pos.x >= min.x && pos.x <= max.x && pos.y >= min.y && pos.y <= max.y;

export const isInRegionBound = (chart, axis, pos) => {
    const regionList = chart.getRegionsInIds(array(axis.layout.layoutBindRegionID));
    return null == regionList ? void 0 : regionList.some((region => {
        const rect = region.getLayoutRect(), startPoint = region.getLayoutStartPoint();
        return isInBound(pos, {
            x: startPoint.x,
            y: startPoint.y
        }, {
            x: rect.width + startPoint.x,
            y: rect.height + startPoint.y
        });
    }));
};

export const isSameDimensionInfo = (a, b) => {
    var _a, _b;
    return a === b || !isNil(a) && !isNil(b) && (a.value === b.value && (null === (_a = a.axis) || void 0 === _a ? void 0 : _a.id) === (null === (_b = b.axis) || void 0 === _b ? void 0 : _b.id));
};

const resolveTooltipFilterRange = (spec, scale) => {
    const range = spec.tooltipFilterRange, rangeValue = "function" == typeof range ? range({
        scale: scale
    }) : range;
    return isValidNumber(rangeValue) ? [ -rangeValue, rangeValue ] : rangeValue;
};

export const getDimensionData = (value, axis, coordinate, getDimensionField) => {
    var _a;
    const scale = axis.getScale(), isDiscreteAxis = isDiscrete(scale.type), data = [], seriesList = axis.getOption().getChart().getSeriesInIndex(axis.getSpecInfo().seriesIndexes);
    for (const series of seriesList) if (series.coordinate === coordinate) {
        const dimensionField = array(getDimensionField(series)), viewData = null === (_a = series.getViewData()) || void 0 === _a ? void 0 : _a.latestData;
        if (dimensionField && viewData) if (isDiscreteAxis) {
            const datums = [], datumIdList = [];
            viewData.forEach(((datum, i) => {
                var _a;
                (null === (_a = datum[dimensionField[0]]) || void 0 === _a ? void 0 : _a.toString()) === (null == value ? void 0 : value.toString()) && (datums.push(datum), 
                datumIdList.push(i));
            })), data.push({
                series: series,
                datum: datums,
                key: getDimensionDataKey(series, datumIdList)
            });
        } else if (isValid(dimensionField[1])) {
            const datums = [], datumIdList = [];
            viewData.forEach(((datum, i) => {
                var _a;
                ((null === (_a = datum[dimensionField[0]]) || void 0 === _a ? void 0 : _a.toString()) === (null == value ? void 0 : value.toString()) || isValid(datum[dimensionField[0]]) && isValid(datum[dimensionField[1]]) && value >= datum[dimensionField[0]] && value < datum[dimensionField[1]]) && (datums.push(datum), 
                datumIdList.push(i));
            })), data.push({
                series: series,
                datum: datums,
                key: getDimensionDataKey(series, datumIdList)
            });
        } else {
            const spec = axis.getSpec(), rangeArr = resolveTooltipFilterRange(spec, scale);
            let datums = [], datumIdList = [];
            if (rangeArr) viewData.forEach(((datum, i) => {
                if (isValid(datum[dimensionField[0]])) {
                    const delta = datum[dimensionField[0]] - value;
                    delta >= rangeArr[0] && delta <= rangeArr[1] && (datums.push(datum), datumIdList.push(i));
                }
            })); else {
                let minDelta = 1 / 0, deltaSign = 0;
                viewData.forEach(((datum, i) => {
                    if (isValid(datum[dimensionField[0]])) {
                        const delta = Math.abs(datum[dimensionField[0]] - value), sign = Math.sign(datum[dimensionField[0]] - value);
                        delta < minDelta ? (minDelta = delta, datums = [ datum ], datumIdList = [ i ], deltaSign = sign) : delta === minDelta && sign === deltaSign && (datums.push(datum), 
                        datumIdList.push(i));
                    }
                }));
            }
            data.push({
                series: series,
                datum: datums,
                key: getDimensionDataKey(series, datumIdList)
            });
        }
    }
    return data;
};

const getDimensionDataKey = (series, datumIdList) => `${series.id}_${datumIdList.join("_")}`;

export const getAxis = (chart, filter, pos) => {
    const axesComponents = chart.getAllComponents().filter((c => "axes" === c.specKey && filter(c) && isInRegionBound(chart, c, pos)));
    return axesComponents.length ? axesComponents : null;
};
//# sourceMappingURL=common.js.map
