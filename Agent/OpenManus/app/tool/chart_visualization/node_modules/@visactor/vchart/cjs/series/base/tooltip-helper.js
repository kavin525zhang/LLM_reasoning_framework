"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.BaseSeriesTooltipHelper = void 0;

const vutils_1 = require("@visactor/vutils"), common_1 = require("../../component/tooltip/utils/common"), get_value_1 = require("../../component/tooltip/utils/get-value"), util_1 = require("../../util");

class BaseSeriesTooltipHelper {
    constructor(series) {
        this.activeTriggerSet = {
            mark: new Set,
            group: new Set
        }, this.ignoreTriggerSet = {
            mark: new Set
        }, this._getSeriesCacheInfo = () => {
            var _a, _b, _c;
            const {series: series} = this, _seriesField = series.getSeriesField();
            return {
                seriesFields: (0, vutils_1.isValid)(_seriesField) ? (0, vutils_1.array)(_seriesField) : null !== (_a = series.getSeriesKeys()) && void 0 !== _a ? _a : [],
                dimensionFields: null !== (_b = series.getDimensionField()) && void 0 !== _b ? _b : [],
                measureFields: null !== (_c = series.getMeasureField()) && void 0 !== _c ? _c : [],
                type: series.type
            };
        }, this._getDimensionData = datum => {
            const {dimensionFields: dimensionFields} = this._seriesCacheInfo;
            return dimensionFields[0] && (null == datum ? void 0 : datum[dimensionFields[0]]);
        }, this._getMeasureData = datum => {
            const {measureFields: measureFields} = this._seriesCacheInfo;
            return measureFields[0] && (null == datum ? void 0 : datum[measureFields[0]]);
        }, this._getSeriesFieldData = datum => {
            const {dimensionFields: dimensionFields, seriesFields: seriesFields} = this._seriesCacheInfo;
            if ((0, vutils_1.isValid)(seriesFields[0]) && (null == datum ? void 0 : datum[seriesFields[0]])) return null == datum ? void 0 : datum[seriesFields[0]];
            const subDimensionField = dimensionFields[dimensionFields.length - 1];
            return dimensionFields.length > 1 && (0 === seriesFields.length || this.series.getSeriesKeys().length), 
            null == datum ? void 0 : datum[subDimensionField];
        }, this._getSeriesStyle = (datum, styleKey, defaultValue) => {
            var _a;
            for (const key of (0, vutils_1.array)(styleKey)) {
                const value = null === (_a = this.series.getSeriesStyle(datum)) || void 0 === _a ? void 0 : _a(key);
                if ((0, vutils_1.isValid)(value)) return value;
            }
            return defaultValue;
        }, this.markTooltipKeyCallback = (datum, params) => this._getSeriesFieldData(datum), 
        this.markTooltipValueCallback = (datum, params) => this._getMeasureData(datum), 
        this.shapeTypeCallback = (datum, params) => {
            var _a;
            return null !== (_a = this._getSeriesStyle(datum, "shape", null)) && void 0 !== _a ? _a : this._getSeriesStyle(datum, "symbolType", this.series.getDefaultShapeType());
        }, this.shapeColorCallback = (datum, params) => this._getSeriesStyle(datum, [ "fill", "stroke" ]), 
        this.shapeStrokeCallback = (datum, params) => this._getSeriesStyle(datum, [ "stroke", "fill" ]), 
        this.dimensionTooltipTitleCallback = (datum, params) => this._getDimensionData(datum), 
        this.groupTooltipTitleCallback = (datum, params) => this._getSeriesFieldData(datum), 
        this.groupTooltipKeyCallback = (datum, params) => {
            const {seriesFields: seriesFields} = this._seriesCacheInfo;
            let dimensionFields = this._seriesCacheInfo.dimensionFields;
            return seriesFields[0] && (dimensionFields = dimensionFields.filter((field => field !== seriesFields[0]))), 
            dimensionFields.map((field => null == datum ? void 0 : datum[field])).join("-");
        }, this.getHasShape = isContent => !!isContent, this.series = series, this.updateTooltipSpec();
    }
    updateTooltipSpec() {
        var _a;
        const seriesTooltipSpec = null === (_a = this.series.getSpec()) || void 0 === _a ? void 0 : _a.tooltip;
        this.spec = seriesTooltipSpec, this._seriesCacheInfo = this._getSeriesCacheInfo();
    }
    getShapeAttrs(activeType, isContent, chartTooltipSpec) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const key = isContent ? "content" : "title", shapeAttrs = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, null === (_a = null == chartTooltipSpec ? void 0 : chartTooltipSpec.style) || void 0 === _a ? void 0 : _a.shape), null == chartTooltipSpec ? void 0 : chartTooltipSpec[activeType]), null === (_b = null == chartTooltipSpec ? void 0 : chartTooltipSpec[activeType]) || void 0 === _b ? void 0 : _b[key]), null === (_c = this.spec) || void 0 === _c ? void 0 : _c[activeType]), null === (_e = null === (_d = this.spec) || void 0 === _d ? void 0 : _d[activeType]) || void 0 === _e ? void 0 : _e[key]);
        return {
            shapeType: null !== (_f = shapeAttrs.shapeType) && void 0 !== _f ? _f : this.shapeTypeCallback,
            shapeFill: null !== (_h = null !== (_g = shapeAttrs.shapeFill) && void 0 !== _g ? _g : shapeAttrs.shapeColor) && void 0 !== _h ? _h : this.shapeColorCallback,
            shapeStroke: null !== (_j = shapeAttrs.shapeStroke) && void 0 !== _j ? _j : this.shapeStrokeCallback,
            shapeHollow: null !== (_k = shapeAttrs.shapeHollow) && void 0 !== _k && _k,
            shapeLineWidth: shapeAttrs.shapeLineWidth,
            shapeSize: null !== (_l = shapeAttrs.shapeSize) && void 0 !== _l ? _l : shapeAttrs.size,
            hasShape: null !== (_m = shapeAttrs.hasShape) && void 0 !== _m ? _m : this.getHasShape(isContent)
        };
    }
    enableByType(activeType) {
        return !0;
    }
    getDefaultContentList(activeType) {
        return [ this.getDefaultContentPattern(activeType) ];
    }
    getContentList(activeType, spec, shapeAttrs, data, datum, params) {
        var _a;
        return (0, common_1.parseContent)(null !== (_a = null == spec ? void 0 : spec.content) && void 0 !== _a ? _a : this.getDefaultContentList(activeType), this.getDefaultContentPattern(activeType), shapeAttrs, data, datum, params);
    }
    getTitleResult(activeType, titleSpec, shapeAttrs, data, params) {
        let titlePattern = (0, vutils_1.isFunction)(titleSpec) ? titleSpec(data, params) : titleSpec;
        if (titlePattern ? (0, util_1.isNil)(titlePattern.value) && (titlePattern = Object.assign(Object.assign({}, this.getDefaultTitlePattern(activeType)), titlePattern)) : titlePattern = this.getDefaultTitlePattern(activeType), 
        titlePattern && !1 !== titlePattern.visible) {
            const datum = (0, get_value_1.getFirstDatumFromTooltipData)(data), res = {
                visible: (0, get_value_1.getTooltipContentValue)(titlePattern.visible, datum, params),
                value: (0, common_1.getTimeString)((0, get_value_1.getTooltipContentValue)(titlePattern.value, datum, params, titlePattern.valueFormatter), titlePattern.valueTimeFormat, titlePattern.valueTimeFormatMode),
                valueStyle: (0, get_value_1.getTooltipContentValue)(titlePattern.valueStyle, datum, params),
                hasShape: titlePattern.hasShape
            };
            return Object.keys(shapeAttrs).forEach((key => {
                res[key] = (0, get_value_1.getTooltipContentValue)(shapeAttrs[key], datum, params);
            })), res;
        }
        return {
            hasShape: !1,
            visible: !1
        };
    }
    getTooltipData(activeType, chartTooltipSpec, data, datum, params) {
        var _a, _b;
        if (!(this.enableByType(activeType) && (0, common_1.isActiveTypeVisible)(activeType, this.spec) && ("dimension" !== activeType || datum && datum.length))) return null;
        const patternSpec = null !== (_b = null === (_a = this.spec) || void 0 === _a ? void 0 : _a[activeType]) && void 0 !== _b ? _b : null == chartTooltipSpec ? void 0 : chartTooltipSpec[activeType], contentShapeAttrs = this.getShapeAttrs(activeType, !0, chartTooltipSpec), titleShapeAttrs = this.getShapeAttrs(activeType, !1, chartTooltipSpec);
        let content;
        if ("dimension" === activeType) {
            content = [];
            this.getContentList(activeType, patternSpec, contentShapeAttrs, data, datum, params).forEach((entry => {
                content.push(entry);
            }));
        } else content = this.getContentList(activeType, patternSpec, contentShapeAttrs, data, datum, params);
        return {
            visible: !0,
            activeType: activeType,
            data: data,
            title: this.getTitleResult(activeType, null == patternSpec ? void 0 : patternSpec.title, titleShapeAttrs, data, params),
            content: content
        };
    }
    getDefaultTitlePattern(activeType) {
        return {
            key: void 0,
            value: "group" === activeType ? this.groupTooltipTitleCallback : this.dimensionTooltipTitleCallback
        };
    }
    getDefaultContentPattern(activeType) {
        return {
            seriesId: this.series.id,
            key: "group" === activeType ? this.groupTooltipKeyCallback : this.markTooltipKeyCallback,
            value: this.markTooltipValueCallback
        };
    }
}

exports.BaseSeriesTooltipHelper = BaseSeriesTooltipHelper;
//# sourceMappingURL=tooltip-helper.js.map
