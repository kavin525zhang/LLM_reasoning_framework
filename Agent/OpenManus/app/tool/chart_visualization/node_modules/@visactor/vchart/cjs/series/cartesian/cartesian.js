"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.CartesianSeries = void 0;

const base_series_1 = require("../base/base-series"), data_1 = require("../../constant/data"), vutils_1 = require("@visactor/vutils"), vscale_1 = require("@visactor/vscale"), utils_1 = require("../util/utils"), type_1 = require("../../component/interface/type"), event_1 = require("../../constant/event"), base_1 = require("../../constant/base");

class CartesianSeries extends base_series_1.BaseSeries {
    constructor() {
        super(...arguments), this.coordinate = "cartesian", this._bandPosition = .5, this._scaleConfig = {
            bandPosition: this._bandPosition
        }, this._direction = "vertical", this._sortDataByAxis = !1, this._getPositionXEncoder = () => {
            var _a;
            return null === (_a = this._positionXEncoder) || void 0 === _a ? void 0 : _a.bind(this);
        }, this._setPositionXEncoder = encoder => {
            this._positionXEncoder = encoder.bind(this);
        }, this._getPositionYEncoder = () => {
            var _a;
            return null === (_a = this._positionYEncoder) || void 0 === _a ? void 0 : _a.bind(this);
        }, this._setPositionYEncoder = encoder => {
            this._positionYEncoder = encoder.bind(this);
        };
    }
    _buildScaleConfig() {
        this._scaleConfig = {
            bandPosition: this._bandPosition
        };
    }
    get fieldX() {
        return this._fieldX;
    }
    setFieldX(f) {
        this._fieldX = (0, vutils_1.array)(f);
    }
    get fieldY() {
        return this._fieldY;
    }
    setFieldY(f) {
        this._fieldY = (0, vutils_1.array)(f);
    }
    get fieldZ() {
        return this._fieldZ;
    }
    setFieldZ(f) {
        this._fieldZ = f && (0, vutils_1.array)(f);
    }
    get fieldX2() {
        return this._fieldX2;
    }
    setFieldX2(f) {
        this._fieldX2 = f;
    }
    get fieldY2() {
        return this._fieldY2;
    }
    setFieldY2(f) {
        this._fieldY2 = f;
    }
    get direction() {
        return this._direction;
    }
    get scaleX() {
        return this._scaleX;
    }
    setScaleX(s) {
        this._scaleX = s;
    }
    get scaleY() {
        return this._scaleY;
    }
    setScaleY(s) {
        this._scaleY = s;
    }
    get scaleZ() {
        return this._scaleZ;
    }
    setScaleZ(s) {
        this._scaleZ = s;
    }
    getXAxisHelper() {
        return this._xAxisHelper;
    }
    setXAxisHelper(h) {
        this._xAxisHelper = h, this.onXAxisHelperUpdate();
    }
    getYAxisHelper() {
        return this._yAxisHelper;
    }
    setYAxisHelper(h) {
        this._yAxisHelper = h, this.onYAxisHelperUpdate();
    }
    getZAxisHelper() {
        return this._zAxisHelper;
    }
    setZAxisHelper(h) {
        this._zAxisHelper = h, this.onYAxisHelperUpdate();
    }
    get sortDataByAxis() {
        return this._sortDataByAxis;
    }
    getStatisticFields() {
        const fields = [];
        return [ {
            axisHelper: this.getXAxisHelper(),
            fields: this._fieldX2 ? [ ...this._fieldX, this._fieldX2 ] : this._fieldX
        }, {
            axisHelper: this.getYAxisHelper(),
            fields: this._fieldY2 ? [ ...this._fieldY, this._fieldY2 ] : this._fieldY
        }, {
            axisHelper: this.getZAxisHelper(),
            fields: this._fieldZ
        } ].forEach((axisOption => {
            axisOption.axisHelper && axisOption.axisHelper.getScale && axisOption.fields && axisOption.fields.forEach((f => {
                const result = {
                    key: f,
                    operations: []
                }, scale = axisOption.axisHelper.getScale(0);
                (0, vscale_1.isContinuous)(scale.type) ? (result.operations = [ "max", "min" ], 
                "log" === scale.type && (result.filter = fv => fv > 0)) : result.operations = [ "values" ], 
                fields.push(result);
            }));
        })), this.getStack() && fields.push({
            key: this.getStackValueField(),
            operations: [ "allValid" ]
        }), fields;
    }
    getGroupFields() {
        return "vertical" === this.direction ? this._fieldX : this._fieldY;
    }
    getStackGroupFields() {
        return this.getGroupFields();
    }
    getStackValue() {
        var _a, _b;
        const axisId = null === (_a = "horizontal" === this.direction ? this.getXAxisHelper() : this.getYAxisHelper()) || void 0 === _a ? void 0 : _a.getAxisId();
        return null !== (_b = this._spec.stackValue) && void 0 !== _b ? _b : `${base_1.PREFIX}_series_${this.type}_${axisId}`;
    }
    getStackValueField() {
        return "horizontal" === this.direction ? (0, vutils_1.array)(this._spec.xField)[0] : (0, 
        vutils_1.array)(this._spec.yField)[0];
    }
    setValueFieldToStack() {
        "horizontal" === this.direction ? (this.setFieldX(data_1.STACK_FIELD_END), this.setFieldX2(data_1.STACK_FIELD_START)) : (this.setFieldY(data_1.STACK_FIELD_END), 
        this.setFieldY2(data_1.STACK_FIELD_START));
    }
    setValueFieldToPercent() {
        "horizontal" === this.direction ? (this.setFieldX(data_1.STACK_FIELD_END_PERCENT), 
        this.setFieldX2(data_1.STACK_FIELD_START_PERCENT)) : (this.setFieldY(data_1.STACK_FIELD_END_PERCENT), 
        this.setFieldY2(data_1.STACK_FIELD_START_PERCENT));
    }
    setValueFieldToStackOffsetSilhouette() {
        "horizontal" === this.direction ? (this.setFieldX(data_1.STACK_FIELD_END_OffsetSilhouette), 
        this.setFieldX2(data_1.STACK_FIELD_START_OffsetSilhouette)) : (this.setFieldY(data_1.STACK_FIELD_END_OffsetSilhouette), 
        this.setFieldY2(data_1.STACK_FIELD_START_OffsetSilhouette));
    }
    onXAxisHelperUpdate() {
        this.onMarkPositionUpdate();
    }
    onYAxisHelperUpdate() {
        this.onMarkPositionUpdate();
    }
    onZAxisHelperUpdate() {
        this.onMarkPositionUpdate();
    }
    setAttrFromSpec() {
        var _a, _b;
        super.setAttrFromSpec(), this.setFieldX(this._spec.xField), this.setFieldY(this._spec.yField), 
        this.setFieldZ(this._spec.zField), this._specXField = (0, vutils_1.array)(this._spec.xField), 
        this._specYField = (0, vutils_1.array)(this._spec.yField), (0, vutils_1.isValid)(this._spec.direction) && (this._direction = this._spec.direction), 
        this.setFieldX2(null === (_a = this._spec) || void 0 === _a ? void 0 : _a.x2Field), 
        this.setFieldY2(null === (_b = this._spec) || void 0 === _b ? void 0 : _b.y2Field), 
        this.getStack() && this.setValueFieldToStack(), this.getPercent() && this.setValueFieldToPercent(), 
        this.getStackOffsetSilhouette() && this.setValueFieldToStackOffsetSilhouette(), 
        (0, vutils_1.isValid)(this._spec.sortDataByAxis) && (this._sortDataByAxis = !0 === this._spec.sortDataByAxis);
    }
    dataToPosition(datum, checkInViewData) {
        return datum ? checkInViewData && !this.isDatumInViewData(datum) ? null : {
            x: this.dataToPositionX(datum),
            y: this.dataToPositionY(datum)
        } : null;
    }
    _buildMarkAttributeContext() {
        super._buildMarkAttributeContext(), this._markAttributeContext.valueToX = this.valueToPositionX.bind(this), 
        this._markAttributeContext.valueToY = this.valueToPositionY.bind(this), this._markAttributeContext.xBandwidth = (depth = 0) => {
            var _a, _b, _c;
            return null !== (_c = null === (_b = (_a = this.getXAxisHelper()).getBandwidth) || void 0 === _b ? void 0 : _b.call(_a, depth)) && void 0 !== _c ? _c : 0;
        }, this._markAttributeContext.yBandwidth = (depth = 0) => {
            var _a, _b, _c;
            return null !== (_c = null === (_b = (_a = this.getYAxisHelper()).getBandwidth) || void 0 === _b ? void 0 : _b.call(_a, depth)) && void 0 !== _c ? _c : 0;
        }, this._markAttributeContext.valueToPosition = this.valueToPosition.bind(this);
    }
    valueToPosition(xValue, yValue) {
        return {
            x: this.valueToPositionX(xValue),
            y: this.valueToPositionY(yValue)
        };
    }
    _axisPosition(helper, value, datum) {
        return this._scaleConfig.datum = datum, helper.isContinuous ? helper.valueToPosition(value, this._scaleConfig) : helper.dataToPosition((0, 
        vutils_1.array)(value), this._scaleConfig);
    }
    valueToPositionX(value, datum) {
        return this._axisPosition(this._xAxisHelper, value, datum);
    }
    valueToPositionY(value, datum) {
        return this._axisPosition(this._yAxisHelper, value, datum);
    }
    _dataToPosition(datum, axisHelper, field, scaleDepth, getEncoder, setEncoder) {
        const encoder = getEncoder();
        if (encoder) return encoder(datum);
        if (!axisHelper) return setEncoder((datum => Number.NaN)), Number.NaN;
        const fields = (axisHelper.getFields ? axisHelper.getFields() : field).slice(0, scaleDepth);
        return fields && 0 !== fields.length ? (axisHelper.isContinuous ? setEncoder((datum => (this._scaleConfig.datum = datum, 
        axisHelper.valueToPosition(this.getDatumPositionValue(datum, fields[0]), this._scaleConfig)))) : setEncoder((datum => (this._scaleConfig.datum = datum, 
        axisHelper.dataToPosition((0, vutils_1.array)(this.getDatumPositionValues(datum, fields)), this._scaleConfig)))), 
        getEncoder()(datum)) : (setEncoder((datum => null)), null);
    }
    dataToPositionX(datum) {
        return this._dataToPosition(datum, this._xAxisHelper, this.fieldX, void 0, this._getPositionXEncoder, this._setPositionXEncoder);
    }
    dataToPositionY(datum) {
        return this._dataToPosition(datum, this._yAxisHelper, this.fieldY, void 0, this._getPositionYEncoder, this._setPositionYEncoder);
    }
    dataToPositionZ(datum) {
        if (!this._zAxisHelper) return Number.NaN;
        const {dataToPosition: dataToPosition} = this._zAxisHelper;
        return dataToPosition(this.getDatumPositionValues(datum, this._fieldZ), {
            bandPosition: this._bandPosition
        });
    }
    dataToPositionX1(datum) {
        return this._xAxisHelper ? this._fieldX2 && this._fieldX2 in datum ? this.valueToPositionX(this.getDatumPositionValues(datum, this._fieldX2)) : this.valueToPositionX(0) : Number.NaN;
    }
    dataToPositionY1(datum) {
        return this._yAxisHelper ? this._fieldY2 && this._fieldY2 in datum ? this.valueToPositionY(this.getDatumPositionValues(datum, this._fieldY2)) : this.valueToPositionY(0) : Number.NaN;
    }
    positionToData(p) {
        return p ? {
            x: this.positionToDataX(p.x),
            y: this.positionToDataY(p.y)
        } : null;
    }
    positionToDataX(xPos) {
        return this._scaleX ? this._scaleX.invert(xPos) : null;
    }
    positionToDataY(yPos) {
        return this._scaleY ? this._scaleY.invert(yPos) : null;
    }
    getRegionRectLeft() {
        if (!this._xAxisHelper) return Number.NaN;
        const {getScale: getScale} = this._xAxisHelper;
        return getScale(0).range()[0];
    }
    getRegionRectRight() {
        if (!this._xAxisHelper) return Number.NaN;
        const {getScale: getScale} = this._xAxisHelper;
        return getScale(0).range()[1];
    }
    afterInitMark() {
        super.afterInitMark(), this.setFieldX(this._fieldX), this.setFieldY(this._fieldY), 
        this._buildScaleConfig();
    }
    getDimensionField() {
        return "horizontal" === this._direction ? this._specYField : this._specXField;
    }
    getDimensionContinuousField() {
        return "horizontal" === this._direction ? [ this.fieldY[0], this.fieldY2 ] : [ this.fieldX[0], this.fieldX2 ];
    }
    getMeasureField() {
        return "horizontal" === this._direction ? this._specXField : this._specYField;
    }
    initEvent() {
        super.initEvent(), this.sortDataByAxis && this.event.on(event_1.ChartEvent.scaleDomainUpdate, {
            filter: param => {
                var _a;
                return param.model.id === (null === (_a = "horizontal" === this._direction ? this._yAxisHelper : this._xAxisHelper) || void 0 === _a ? void 0 : _a.getAxisId());
            }
        }, (() => {
            this._sortDataInAxisDomain();
        }));
    }
    _sortDataInAxisDomain() {
        var _a, _b, _c;
        (null === (_b = null === (_a = this.getViewData()) || void 0 === _a ? void 0 : _a.latestData) || void 0 === _b ? void 0 : _b.length) && ((0, 
        utils_1.sortDataInAxisHelper)("horizontal" === this._direction ? this._yAxisHelper : this._xAxisHelper, "horizontal" === this._direction ? this._fieldY[0] : this._fieldX[0], this.getViewData().latestData), 
        null === (_c = this._data) || void 0 === _c || _c.updateData(!0));
    }
    getInvalidCheckFields() {
        const fields = [];
        if (this._xAxisHelper && this._xAxisHelper.isContinuous && this._xAxisHelper.getAxisType() !== type_1.ComponentTypeEnum.geoCoordinate) {
            (this._xAxisHelper.getFields ? this._xAxisHelper.getFields() : this._specXField).forEach((f => {
                fields.push(f);
            }));
        }
        if (this._yAxisHelper && this._yAxisHelper.isContinuous && this._yAxisHelper.getAxisType() !== type_1.ComponentTypeEnum.geoCoordinate) {
            (this._yAxisHelper.getFields ? this._yAxisHelper.getFields() : this._specYField).forEach((f => {
                fields.push(f);
            }));
        }
        return fields;
    }
    reInit(spec) {
        this._positionXEncoder && (this._positionXEncoder = null), this._positionYEncoder && (this._positionYEncoder = null), 
        super.reInit(spec);
    }
}

exports.CartesianSeries = CartesianSeries;
//# sourceMappingURL=cartesian.js.map
