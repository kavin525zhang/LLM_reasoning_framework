"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.sankeyLabel = exports.LineLabel = exports.vennLabel = exports.treemapLabel = exports.stackLabel = exports.stackLabelY = exports.stackLabelX = exports.pieLabel = exports.pointLabel = exports.barLabel = exports.lineDataLabel = exports.symbolLabel = exports.textAttribute = exports.defaultLabelConfig = exports.labelRuleMap = void 0;

const interface_1 = require("../../series/interface"), vutils_1 = require("@visactor/vutils"), vrender_core_1 = require("@visactor/vrender-core"), util_1 = require("../util"), core_1 = require("../../core");

function defaultLabelConfig(rule, labelInfo) {
    var _a;
    const {labelSpec: labelSpec} = labelInfo;
    labelSpec.overlap && !(0, vutils_1.isObject)(labelSpec.overlap) && (labelSpec.overlap = {});
    const processor = null !== (_a = exports.labelRuleMap[rule]) && void 0 !== _a ? _a : exports.labelRuleMap.point;
    return labelInfo.series.type === interface_1.SeriesTypeEnum.sankey ? sankeyLabel(labelInfo) : processor(labelInfo);
}

function textAttribute(labelInfo, datum, formatMethod, formatter) {
    var _a;
    const {labelMark: labelMark, series: series} = labelInfo, textAttribute = {
        text: datum[series.getMeasureField()[0]],
        data: datum,
        textType: null !== (_a = labelInfo.labelSpec.textType) && void 0 !== _a ? _a : "text"
    }, attributes = Object.keys(labelMark.stateStyle.normal);
    for (const key of attributes) {
        const attr = labelMark.getAttribute(key, datum);
        textAttribute[key] = attr;
    }
    if (series.type !== interface_1.SeriesTypeEnum.sankey) {
        const {formatFunc: formatFunc, args: args} = (0, util_1.getFormatFunction)(formatMethod, formatter, textAttribute.text, datum);
        formatFunc && (textAttribute._originText = textAttribute.text, textAttribute.text = formatFunc(...args, {
            series: series
        }));
    }
    return textAttribute;
}

function uniformLabelPosition(position) {
    return (0, vutils_1.isFunction)(position) ? datum => position(datum.data) : position;
}

function symbolLabel(labelInfo) {
    var _a, _b, _c;
    const {series: series, labelSpec: labelSpec} = labelInfo, defaultPosition = "horizontal" === series.direction ? "right" : "top", position = null !== (_a = uniformLabelPosition(labelSpec.position)) && void 0 !== _a ? _a : defaultPosition;
    let overlap;
    return overlap = !1 !== labelSpec.overlap && {
        strategy: null !== (_c = null === (_b = labelSpec.overlap) || void 0 === _b ? void 0 : _b.strategy) && void 0 !== _c ? _c : symbolLabelOverlapStrategy(),
        avoidBaseMark: "center" !== position
    }, {
        position: position,
        overlap: overlap
    };
}

function lineDataLabel(labelInfo) {
    const result = symbolLabel(labelInfo);
    return (0, vutils_1.isBoolean)(result.overlap) || (result.overlap.avoidBaseMark = !1), 
    result;
}

function symbolLabelOverlapStrategy() {
    return [ {
        type: "position",
        position: [ "top", "bottom", "right", "left", "top-right", "top-left", "bottom-left", "bottom-right" ]
    } ];
}

function barLabel(labelInfo) {
    var _a, _b, _c, _d, _e, _f;
    const {series: series, labelSpec: labelSpec = {}} = labelInfo, originPosition = null !== (_a = uniformLabelPosition(labelSpec.position)) && void 0 !== _a ? _a : "outside", direction = null !== (_b = series.direction) && void 0 !== _b ? _b : "vertical", isInverse = "horizontal" === series.direction ? null === (_c = series.getXAxisHelper()) || void 0 === _c ? void 0 : _c.isInverse() : null === (_d = series.getYAxisHelper()) || void 0 === _d ? void 0 : _d.isInverse();
    let overlap, position = originPosition;
    position = datum => {
        var _a;
        const {data: data} = datum, labelPosition = null !== (_a = "function" == typeof labelSpec.position ? labelSpec.position(data) : labelSpec.position) && void 0 !== _a ? _a : "outside";
        if ("outside" === labelPosition) {
            const dataField = series.getMeasureField()[0], positionMap = {
                vertical: [ "top", "bottom" ],
                horizontal: [ "right", "left" ]
            }, index = (null == data ? void 0 : data[dataField]) >= 0 && isInverse || (null == data ? void 0 : data[dataField]) < 0 && !isInverse ? 1 : 0;
            return positionMap[direction][index];
        }
        return labelPosition;
    }, overlap = !1 !== labelSpec.overlap && {
        strategy: null !== (_f = null === (_e = labelSpec.overlap) || void 0 === _e ? void 0 : _e.strategy) && void 0 !== _f ? _f : barLabelOverlapStrategy(series)
    };
    let smartInvert = !1;
    return (0, vutils_1.isString)(originPosition) && originPosition.includes("inside") && (smartInvert = !0), 
    {
        position: position,
        overlap: overlap,
        smartInvert: smartInvert
    };
}

function barLabelOverlapStrategy(series) {
    return [ {
        type: "position",
        position: data => {
            var _a, _b;
            const {data: datum} = data, dataField = series.getMeasureField()[0];
            return ("horizontal" === series.direction ? null === (_a = series.getXAxisHelper()) || void 0 === _a ? void 0 : _a.isInverse() : null === (_b = series.getYAxisHelper()) || void 0 === _b ? void 0 : _b.isInverse()) ? (null == datum ? void 0 : datum[dataField]) >= 0 ? "horizontal" === series.direction ? [ "left", "inside-left" ] : [ "bottom", "inside-bottom" ] : "horizontal" === series.direction ? [ "right", "inside-right" ] : [ "top", "inside-top" ] : (null == datum ? void 0 : datum[dataField]) >= 0 ? "horizontal" === series.direction ? [ "right", "inside-right" ] : [ "top", "inside-top" ] : "horizontal" === series.direction ? [ "left", "inside-left" ] : [ "bottom", "inside-bottom" ];
        }
    } ];
}

function pointLabel(labelInfo) {
    const {labelSpec: labelSpec} = labelInfo;
    let overlap;
    return overlap = !1 !== labelSpec.overlap && {
        avoidBaseMark: !1
    }, {
        position: "center",
        overlap: overlap
    };
}

function pieLabel(labelInfo) {
    var _a;
    const {labelSpec: labelSpec} = labelInfo, labelPosition = null !== (_a = uniformLabelPosition(labelSpec.position)) && void 0 !== _a ? _a : "outside", position = labelPosition;
    let smartInvert;
    return smartInvert = labelSpec.smartInvert ? labelSpec.smartInvert : (0, vutils_1.isString)(labelPosition) && labelPosition.includes("inside"), 
    {
        position: position,
        smartInvert: smartInvert
    };
}

function stackLabelX(datum2, series, pos, offset) {
    return "horizontal" === series.direction ? "middle" === pos ? .5 * (series.totalPositionX(datum2, "end") + series.totalPositionY(datum2, "start")) : "max" === pos ? series.totalPositionX(datum2, datum2.end >= datum2.start ? "end" : "start") + offset : "min" === pos ? series.totalPositionX(datum2, datum2.end >= datum2.start ? "start" : "end") - offset : series.totalPositionX(datum2, "end") + (datum2.end >= datum2.start ? offset : -offset) : series.totalPositionX(datum2, "index", .5);
}

function stackLabelY(datum2, series, pos, offset) {
    return "horizontal" === series.direction ? series.totalPositionY(datum2, "index", .5) : "middle" === pos ? .5 * (series.totalPositionY(datum2, "end") + series.totalPositionY(datum2, "start")) : "max" === pos ? series.totalPositionY(datum2, datum2.end >= datum2.start ? "end" : "start") - offset : "min" === pos ? series.totalPositionY(datum2, datum2.end >= datum2.start ? "start" : "end") + offset : series.totalPositionY(datum2, "end") + (datum2.end >= datum2.start ? -offset : offset);
}

function stackLabel(labelInfo, datumTransform, attributeTransform) {
    const series = labelInfo.series, labelSpec = labelInfo.labelSpec || {}, totalData = series.getTotalData();
    return {
        customLayoutFunc: labels => labels.map((label => {
            const pos = labelSpec.position || "withChange", offset = labelSpec.offset || 0, datum = datumTransform ? datumTransform(label.data) : label.data, attribute = textAttribute(labelInfo, datum, labelSpec.formatMethod);
            return attribute.x = stackLabelX(datum, series, pos, offset), attribute.y = stackLabelY(datum, series, pos, offset), 
            "horizontal" === series.direction ? attribute.textAlign = "middle" === pos ? "center" : "withChange" === pos && datum.end - datum.start >= 0 || "max" === pos ? "left" : "right" : attribute.textBaseline = "middle" === pos ? pos : "withChange" === pos && datum.end - datum.start >= 0 || "max" === pos ? "bottom" : "top", 
            null == attributeTransform || attributeTransform(label, datum, attribute), (0, vrender_core_1.createText)(Object.assign(Object.assign({}, attribute), {
                id: label.id
            }));
        })),
        dataFilter: labels => {
            const result = [];
            return totalData.forEach((total => {
                const label = labels.find((labelItem => {
                    var _a;
                    return total.index === (null === (_a = labelItem.data) || void 0 === _a ? void 0 : _a[series.getDimensionField()[0]]);
                }));
                label && (label.data = total, result.push(label));
            })), result;
        },
        overlap: {
            strategy: []
        }
    };
}

function treemapLabel(labelInfo) {
    return {
        customLayoutFunc: (labels, text) => text,
        overlap: !1
    };
}

function vennLabel(labelInfo) {
    return {
        customLayoutFunc: (labels, text) => text,
        smartInvert: !0
    };
}

function LineLabel(labelInfo) {
    var _a, _b, _c, _d;
    const {labelSpec: labelSpec, series: series} = labelInfo, seriesData = null === (_c = null === (_b = null === (_a = series.getViewDataStatistics) || void 0 === _a ? void 0 : _a.call(series).latestData) || void 0 === _b ? void 0 : _b[series.getSeriesField()]) || void 0 === _c ? void 0 : _c.values, data = seriesData ? seriesData.map(((d, index) => ({
        [series.getSeriesField()]: d,
        index: index
    }))) : [ {
        index: 0,
        [core_1.DEFAULT_DATA_SERIES_FIELD]: series.getSeriesKeys()[0]
    } ];
    return {
        position: null !== (_d = labelSpec.position) && void 0 !== _d ? _d : "end",
        data: data
    };
}

function sankeyLabel(labelInfo) {
    var _a, _b, _c;
    const {series: series, labelSpec: labelSpec = {}} = labelInfo, originPosition = null !== (_a = uniformLabelPosition(labelSpec.position)) && void 0 !== _a ? _a : "outside", direction = series.direction;
    let overlap, position = originPosition;
    return (0, vutils_1.isString)(originPosition) && ("vertical" === direction ? position = "inside-start" === originPosition ? datum => "inside-left" : "inside-middle" === originPosition ? datum => "center" : "inside-end" === originPosition ? datum => "inside-right" : datum => "bottom" : "inside-start" === originPosition ? position = datum => "inside-left" : "inside-middle" === originPosition ? position = datum => "center" : "inside-end" === originPosition ? position = datum => "inside-right" : "outside" === originPosition && (position = datum => "right")), 
    overlap = !1 !== labelSpec.overlap && ((!(0, vutils_1.isString)(originPosition) || !originPosition.includes("inside")) && {
        strategy: null !== (_c = null === (_b = labelSpec.overlap) || void 0 === _b ? void 0 : _b.strategy) && void 0 !== _c ? _c : sankeyLabelOverlapStrategy(series)
    }), {
        position: position,
        overlap: overlap,
        smartInvert: !1,
        offset: 0,
        syncState: !0
    };
}

function sankeyLabelOverlapStrategy(series) {
    return [ {
        type: "position",
        position: data => "horizontal" === series.direction ? [ "right", "left" ] : [ "bottom", "top" ]
    } ];
}

exports.labelRuleMap = {
    rect: barLabel,
    symbol: symbolLabel,
    arc: pieLabel,
    point: pointLabel,
    "line-data": lineDataLabel,
    stackLabel: stackLabel,
    line: LineLabel,
    area: LineLabel,
    rect3d: barLabel,
    arc3d: pieLabel,
    treemap: treemapLabel,
    venn: vennLabel
}, exports.defaultLabelConfig = defaultLabelConfig, exports.textAttribute = textAttribute, 
exports.symbolLabel = symbolLabel, exports.lineDataLabel = lineDataLabel, exports.barLabel = barLabel, 
exports.pointLabel = pointLabel, exports.pieLabel = pieLabel, exports.stackLabelX = stackLabelX, 
exports.stackLabelY = stackLabelY, exports.stackLabel = stackLabel, exports.treemapLabel = treemapLabel, 
exports.vennLabel = vennLabel, exports.LineLabel = LineLabel, exports.sankeyLabel = sankeyLabel;
//# sourceMappingURL=util.js.map
