"use strict";

var __rest = this && this.__rest || function(s, e) {
    var t = {};
    for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0 && (t[p] = s[p]);
    if (null != s && "function" == typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (p = Object.getOwnPropertySymbols(s); i < p.length; i++) e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]) && (t[p[i]] = s[p[i]]);
    }
    return t;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.markerAggregation = exports.markerMedian = exports.markerStandardDeviation = exports.markerVariance = exports.markerAverage = exports.markerSum = exports.markerMax = exports.markerMin = void 0;

const vutils_1 = require("@visactor/vutils"), math_1 = require("../../util/math"), utils_1 = require("../../component/marker/utils"), markerMin = (_data, opt) => {
    const data = _data[0].latestData;
    return (0, math_1.min)(data, opt.field);
};

exports.markerMin = markerMin;

const markerMax = (_data, opt) => {
    const data = _data[0].latestData;
    return (0, math_1.max)(data, opt.field);
};

function markerSum(_data, opt) {
    const data = _data[0].latestData;
    return (0, math_1.sum)(data, opt.field);
}

function markerAverage(_data, opt) {
    const data = _data[0].latestData;
    return (0, math_1.average)(data, opt.field);
}

function markerVariance(_data, opt) {
    const data = _data[0].latestData;
    return (0, math_1.variance)(data, opt.field);
}

function markerStandardDeviation(_data, opt) {
    const data = _data[0].latestData;
    return (0, math_1.standardDeviation)(data, opt.field);
}

function markerMedian(_data, opt) {
    const data = _data[0].latestData;
    return (0, math_1.median)(data, opt.field);
}

function markerAggregation(_data, options) {
    let markerSource;
    if (options.coordinates) {
        const _a = options, {coordinates: coordinatesInOptions, coordinateType: coordinateType, getSeriesByIdOrIndex: getSeriesByIdOrIndex} = _a, rest = __rest(_a, [ "coordinates", "coordinateType", "getSeriesByIdOrIndex" ]);
        let coordinates, option;
        if ((0, vutils_1.isFunction)(coordinatesInOptions)) {
            const relativeSeries = options.getRelativeSeries();
            coordinates = coordinatesInOptions(relativeSeries.getData().getLatestData(), relativeSeries);
        } else coordinates = coordinatesInOptions;
        coordinates = (0, vutils_1.array)(coordinates), markerSource = coordinates.map((coordinate => {
            const refRelativeSeries = getSeriesByIdOrIndex(coordinate.refRelativeSeriesId, coordinate.refRelativeSeriesIndex);
            if ("cartesian" === coordinateType) {
                const {xField: xField, yField: yField} = refRelativeSeries.getSpec(), {xFieldDim: xFieldDim, xFieldIndex: xFieldIndex, yFieldDim: yFieldDim, yFieldIndex: yFieldIndex} = coordinate;
                let bindXField = xField;
                (0, vutils_1.isValid)(xFieldIndex) && (bindXField = (0, vutils_1.array)(xField)[xFieldIndex]), 
                xFieldDim && (0, vutils_1.array)(xField).includes(xFieldDim) && (bindXField = xFieldDim);
                let bindYField = yField;
                (0, vutils_1.isValid)(yFieldIndex) && (bindYField = (0, vutils_1.array)(yField)[yFieldIndex]), 
                yFieldDim && (0, vutils_1.array)(yField).includes(yFieldDim) && (bindYField = yFieldDim), 
                option = Object.assign({
                    x: void 0,
                    y: void 0
                }, rest), (0, vutils_1.isString)(coordinate[bindXField]) && (0, utils_1.isAggrSpec)(coordinate[bindXField]) ? option.x = {
                    field: bindXField,
                    aggrType: coordinate[bindXField]
                } : option.x = (0, vutils_1.array)(bindXField).map((field => coordinate[field])), 
                (0, vutils_1.isString)(coordinate[bindYField]) && (0, utils_1.isAggrSpec)(coordinate[bindYField]) ? option.y = {
                    field: bindYField,
                    aggrType: coordinate[bindYField]
                } : option.y = (0, vutils_1.array)(bindYField).map((field => coordinate[field]));
            } else if ("polar" === coordinateType) {
                const {valueField: radiusField, categoryField: angleField} = refRelativeSeries.getSpec(), {angleFieldDim: angleFieldDim, angleFieldIndex: angleFieldIndex} = coordinate;
                let bindAngleField = angleField;
                (0, vutils_1.isValid)(angleFieldIndex) && (bindAngleField = (0, vutils_1.array)(angleField)[angleFieldIndex]), 
                angleFieldDim && (0, vutils_1.array)(angleField).includes(angleFieldDim) && (bindAngleField = angleFieldDim);
                const bindRadiusField = radiusField;
                option = Object.assign({
                    angle: void 0,
                    radius: void 0
                }, rest), (0, vutils_1.isString)(coordinate[bindAngleField]) && (0, utils_1.isAggrSpec)(coordinate[bindAngleField]) ? option.angle = {
                    field: bindAngleField,
                    aggrType: coordinate[bindAngleField]
                } : option.angle = (0, vutils_1.array)(bindAngleField).map((field => coordinate[field])), 
                (0, vutils_1.isString)(coordinate[bindRadiusField]) && (0, utils_1.isAggrSpec)(coordinate[bindRadiusField]) ? option.radius = {
                    field: bindRadiusField,
                    aggrType: coordinate[bindRadiusField]
                } : option.radius = (0, vutils_1.array)(bindRadiusField).map((field => coordinate[field]));
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
        if ((0, vutils_1.isValid)(option.x)) {
            const x = option.x;
            (0, vutils_1.isArray)(x) ? result.x = x.map((item => getFinalValue(item, _data, option))) : result.x = getFinalValue(x, _data, option);
        }
        if ((0, vutils_1.isValid)(option.y)) {
            const y = option.y;
            (0, vutils_1.isArray)(y) ? result.y = y.map((item => getFinalValue(item, _data, option))) : result.y = getFinalValue(y, _data, option);
        }
        if ((0, vutils_1.isValid)(option.angle)) {
            const angle = option.angle;
            (0, vutils_1.isArray)(angle) ? result.angle = angle.map((item => getFinalValue(item, _data, option))) : result.angle = getFinalValue(angle, _data, option);
        }
        if ((0, vutils_1.isValid)(option.radius)) {
            const radius = option.radius;
            (0, vutils_1.isArray)(radius) ? result.radius = radius.map((item => getFinalValue(item, _data, option))) : result.radius = getFinalValue(radius, _data, option);
        }
        if ((0, vutils_1.isValid)(option.areaName)) {
            const name = option.areaName;
            result.areaName = getFinalValue(name, _data, option);
        }
        option.getRefRelativeSeries && (result.getRefRelativeSeries = option.getRefRelativeSeries), 
        results.push(result);
    })), results;
}

exports.markerMax = markerMax, exports.markerSum = markerSum, exports.markerAverage = markerAverage, 
exports.markerVariance = markerVariance, exports.markerStandardDeviation = markerStandardDeviation, 
exports.markerMedian = markerMedian, exports.markerAggregation = markerAggregation;

const aggrMap = {
    min: exports.markerMin,
    max: exports.markerMax,
    sum: markerSum,
    average: markerAverage,
    variance: markerVariance,
    standardDeviation: markerStandardDeviation,
    median: markerMedian
};

function getFinalValue(source, _data, option) {
    const relativeSeries = option.getRelativeSeries(), startSeries = option.getStartRelativeSeries(), endSeries = option.getEndRelativeSeries(), relativeSeriesData = relativeSeries.getData().getLatestData(), startRelativeSeriesData = startSeries.getData().getLatestData(), endRelativeSeriesData = endSeries.getData().getLatestData();
    if ((0, vutils_1.isFunction)(source)) return source(relativeSeriesData, startRelativeSeriesData, endRelativeSeriesData, relativeSeries, startSeries, endSeries);
    if ((0, vutils_1.isPlainObject)(source)) {
        const {aggrType: aggrType, field: field} = source;
        return aggrMap[aggrType](_data, {
            field: field
        });
    }
    return source;
}
//# sourceMappingURL=aggregation.js.map
