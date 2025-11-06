var __rest = this && this.__rest || function(s, e) {
    var t = {};
    for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0 && (t[p] = s[p]);
    if (null != s && "function" == typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (p = Object.getOwnPropertySymbols(s); i < p.length; i++) e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]) && (t[p[i]] = s[p[i]]);
    }
    return t;
};

import { array, isArray, isFunction, isPlainObject, isString, isValid } from "@visactor/vutils";

import { variance, average, min, max, sum, standardDeviation, median } from "../../util/math";

import { isAggrSpec } from "../../component/marker/utils";

export const markerMin = (_data, opt) => {
    const data = _data[0].latestData;
    return min(data, opt.field);
};

export const markerMax = (_data, opt) => {
    const data = _data[0].latestData;
    return max(data, opt.field);
};

export function markerSum(_data, opt) {
    const data = _data[0].latestData;
    return sum(data, opt.field);
}

export function markerAverage(_data, opt) {
    const data = _data[0].latestData;
    return average(data, opt.field);
}

export function markerVariance(_data, opt) {
    const data = _data[0].latestData;
    return variance(data, opt.field);
}

export function markerStandardDeviation(_data, opt) {
    const data = _data[0].latestData;
    return standardDeviation(data, opt.field);
}

export function markerMedian(_data, opt) {
    const data = _data[0].latestData;
    return median(data, opt.field);
}

export function markerAggregation(_data, options) {
    let markerSource;
    if (options.coordinates) {
        const _a = options, {coordinates: coordinatesInOptions, coordinateType: coordinateType, getSeriesByIdOrIndex: getSeriesByIdOrIndex} = _a, rest = __rest(_a, [ "coordinates", "coordinateType", "getSeriesByIdOrIndex" ]);
        let coordinates, option;
        if (isFunction(coordinatesInOptions)) {
            const relativeSeries = options.getRelativeSeries();
            coordinates = coordinatesInOptions(relativeSeries.getData().getLatestData(), relativeSeries);
        } else coordinates = coordinatesInOptions;
        coordinates = array(coordinates), markerSource = coordinates.map((coordinate => {
            const refRelativeSeries = getSeriesByIdOrIndex(coordinate.refRelativeSeriesId, coordinate.refRelativeSeriesIndex);
            if ("cartesian" === coordinateType) {
                const {xField: xField, yField: yField} = refRelativeSeries.getSpec(), {xFieldDim: xFieldDim, xFieldIndex: xFieldIndex, yFieldDim: yFieldDim, yFieldIndex: yFieldIndex} = coordinate;
                let bindXField = xField;
                isValid(xFieldIndex) && (bindXField = array(xField)[xFieldIndex]), xFieldDim && array(xField).includes(xFieldDim) && (bindXField = xFieldDim);
                let bindYField = yField;
                isValid(yFieldIndex) && (bindYField = array(yField)[yFieldIndex]), yFieldDim && array(yField).includes(yFieldDim) && (bindYField = yFieldDim), 
                option = Object.assign({
                    x: void 0,
                    y: void 0
                }, rest), isString(coordinate[bindXField]) && isAggrSpec(coordinate[bindXField]) ? option.x = {
                    field: bindXField,
                    aggrType: coordinate[bindXField]
                } : option.x = array(bindXField).map((field => coordinate[field])), isString(coordinate[bindYField]) && isAggrSpec(coordinate[bindYField]) ? option.y = {
                    field: bindYField,
                    aggrType: coordinate[bindYField]
                } : option.y = array(bindYField).map((field => coordinate[field]));
            } else if ("polar" === coordinateType) {
                const {valueField: radiusField, categoryField: angleField} = refRelativeSeries.getSpec(), {angleFieldDim: angleFieldDim, angleFieldIndex: angleFieldIndex} = coordinate;
                let bindAngleField = angleField;
                isValid(angleFieldIndex) && (bindAngleField = array(angleField)[angleFieldIndex]), 
                angleFieldDim && array(angleField).includes(angleFieldDim) && (bindAngleField = angleFieldDim);
                const bindRadiusField = radiusField;
                option = Object.assign({
                    angle: void 0,
                    radius: void 0
                }, rest), isString(coordinate[bindAngleField]) && isAggrSpec(coordinate[bindAngleField]) ? option.angle = {
                    field: bindAngleField,
                    aggrType: coordinate[bindAngleField]
                } : option.angle = array(bindAngleField).map((field => coordinate[field])), isString(coordinate[bindRadiusField]) && isAggrSpec(coordinate[bindRadiusField]) ? option.radius = {
                    field: bindRadiusField,
                    aggrType: coordinate[bindRadiusField]
                } : option.radius = array(bindRadiusField).map((field => coordinate[field]));
            }
            return option.getRefRelativeSeries = () => refRelativeSeries, option;
        }));
    } else markerSource = options;
    const results = [];
    return markerSource.forEach((option => {
        const result = {
            x: null,
            y: null,
            angle: null,
            radius: null,
            areaName: null
        };
        if (isValid(option.x)) {
            const x = option.x;
            isArray(x) ? result.x = x.map((item => getFinalValue(item, _data, option))) : result.x = getFinalValue(x, _data, option);
        }
        if (isValid(option.y)) {
            const y = option.y;
            isArray(y) ? result.y = y.map((item => getFinalValue(item, _data, option))) : result.y = getFinalValue(y, _data, option);
        }
        if (isValid(option.angle)) {
            const angle = option.angle;
            isArray(angle) ? result.angle = angle.map((item => getFinalValue(item, _data, option))) : result.angle = getFinalValue(angle, _data, option);
        }
        if (isValid(option.radius)) {
            const radius = option.radius;
            isArray(radius) ? result.radius = radius.map((item => getFinalValue(item, _data, option))) : result.radius = getFinalValue(radius, _data, option);
        }
        if (isValid(option.areaName)) {
            const name = option.areaName;
            result.areaName = getFinalValue(name, _data, option);
        }
        option.getRefRelativeSeries && (result.getRefRelativeSeries = option.getRefRelativeSeries), 
        results.push(result);
    })), results;
}

const aggrMap = {
    min: markerMin,
    max: markerMax,
    sum: markerSum,
    average: markerAverage,
    variance: markerVariance,
    standardDeviation: markerStandardDeviation,
    median: markerMedian
};

function getFinalValue(source, _data, option) {
    const relativeSeries = option.getRelativeSeries(), startSeries = option.getStartRelativeSeries(), endSeries = option.getEndRelativeSeries(), relativeSeriesData = relativeSeries.getData().getLatestData(), startRelativeSeriesData = startSeries.getData().getLatestData(), endRelativeSeriesData = endSeries.getData().getLatestData();
    if (isFunction(source)) return source(relativeSeriesData, startRelativeSeriesData, endRelativeSeriesData, relativeSeries, startSeries, endSeries);
    if (isPlainObject(source)) {
        const {aggrType: aggrType, field: field} = source;
        return aggrMap[aggrType](_data, {
            field: field
        });
    }
    return source;
}
//# sourceMappingURL=aggregation.js.map
