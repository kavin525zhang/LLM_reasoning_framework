"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.PolarSeries = void 0;

const vutils_1 = require("@visactor/vutils"), vscale_1 = require("@visactor/vscale"), polar_1 = require("../../constant/polar"), base_series_1 = require("../base/base-series"), utils_1 = require("../util/utils"), event_1 = require("../../constant/event");

class PolarSeries extends base_series_1.BaseSeries {
    constructor() {
        super(...arguments), this.coordinate = "polar", this._outerRadius = polar_1.POLAR_DEFAULT_RADIUS, 
        this._innerRadius = 0, this._angleField = [], this._radiusField = [], this._sortDataByAxis = !1;
    }
    get outerRadius() {
        return this._outerRadius;
    }
    get innerRadius() {
        return this._innerRadius;
    }
    getAngleField() {
        return this._angleField;
    }
    setAngleField(f) {
        return this._angleField = (0, vutils_1.isValid)(f) ? (0, vutils_1.array)(f) : [], 
        this._angleField;
    }
    getRadiusField() {
        return this._radiusField;
    }
    setRadiusField(f) {
        return this._radiusField = (0, vutils_1.isValid)(f) ? (0, vutils_1.array)(f) : [], 
        this._radiusField;
    }
    get innerRadiusField() {
        return this._innerRadiusField;
    }
    setInnerRadiusField(f) {
        return this._innerRadiusField = (0, vutils_1.array)(f), this._innerRadiusField;
    }
    get radiusScale() {
        return this._radiusScale;
    }
    setRadiusScale(s) {
        return this._radiusScale = s, s;
    }
    get angleScale() {
        return this._angleScale;
    }
    setAngleScale(s) {
        return this._angleScale = s, s;
    }
    get angleAxisHelper() {
        return this._angleAxisHelper;
    }
    set angleAxisHelper(h) {
        this._angleAxisHelper = h, this.onAngleAxisHelperUpdate();
    }
    get radiusAxisHelper() {
        return this._radiusAxisHelper;
    }
    set radiusAxisHelper(h) {
        this._radiusAxisHelper = h, this.onRadiusAxisHelperUpdate();
    }
    get sortDataByAxis() {
        return this._sortDataByAxis;
    }
    _buildMarkAttributeContext() {
        super._buildMarkAttributeContext(), this._markAttributeContext.valueToPosition = this.valueToPosition.bind(this), 
        this._markAttributeContext.getCenter = () => this.angleAxisHelper.center(), this._markAttributeContext.getLayoutRadius = () => this._computeLayoutRadius();
    }
    valueToPosition(angleValue, radiusValue) {
        if ((0, vutils_1.isNil)(angleValue) || (0, vutils_1.isNil)(radiusValue) || !this.angleAxisHelper || !this.radiusAxisHelper) return {
            x: Number.NaN,
            y: Number.NaN
        };
        const radius = this.radiusAxisHelper.dataToPosition((0, vutils_1.array)(radiusValue));
        if (radius < 0) {
            if ("break" === this._invalidType || "link" === this._invalidType) return {
                x: Number.NaN,
                y: Number.NaN
            };
            if ("zero" === this._invalidType) return this.angleAxisHelper.center();
        }
        const angle = this.angleAxisHelper.dataToPosition((0, vutils_1.array)(angleValue));
        return this.angleAxisHelper.coordToPoint({
            angle: angle,
            radius: radius
        });
    }
    dataToPosition(datum, checkInViewData) {
        return datum && this.angleAxisHelper && this.radiusAxisHelper ? checkInViewData && !this.isDatumInViewData(datum) ? null : this.valueToPosition(this.getDatumPositionValues(datum, this._angleField), this.getDatumPositionValues(datum, this._radiusField)) : null;
    }
    dataToPositionX(datum) {
        var _a;
        return null === (_a = this.dataToPosition(datum)) || void 0 === _a ? void 0 : _a.x;
    }
    dataToPositionY(datum) {
        var _a;
        return null === (_a = this.dataToPosition(datum)) || void 0 === _a ? void 0 : _a.y;
    }
    dataToPositionZ(datum) {
        return 0;
    }
    positionToData(p) {}
    radiusToData(r) {}
    angleToData(a) {}
    getStatisticFields() {
        var _a, _b;
        const fields = [];
        return (null === (_a = this.radiusAxisHelper) || void 0 === _a ? void 0 : _a.getScale) && this._radiusField.forEach((f => {
            const result = {
                key: f,
                operations: []
            };
            (0, vscale_1.isContinuous)(this.radiusAxisHelper.getScale(0).type) ? result.operations = [ "max", "min" ] : result.operations = [ "values" ], 
            fields.push(result);
        })), (null === (_b = this.angleAxisHelper) || void 0 === _b ? void 0 : _b.getScale) && this._angleField.forEach((f => {
            const result = {
                key: f,
                operations: []
            };
            (0, vscale_1.isContinuous)(this.angleAxisHelper.getScale(0).type) ? result.operations = [ "max", "min" ] : result.operations = [ "values" ], 
            fields.push(result);
        })), fields;
    }
    setAttrFromSpec() {
        super.setAttrFromSpec(), (0, vutils_1.isValid)(this._spec.outerRadius) && (this._outerRadius = this._spec.outerRadius), 
        (0, vutils_1.isValid)(this._spec.radius) && (this._outerRadius = this._spec.radius), 
        (0, vutils_1.isValid)(this._spec.innerRadius) && (this._innerRadius = this._spec.innerRadius), 
        (0, vutils_1.isValid)(this._spec.sortDataByAxis) && (this._sortDataByAxis = !0 === this._spec.sortDataByAxis);
    }
    onRadiusAxisHelperUpdate() {
        this.onMarkPositionUpdate();
    }
    onAngleAxisHelperUpdate() {
        this.onMarkPositionUpdate();
    }
    afterInitMark() {
        super.afterInitMark();
    }
    _computeLayoutRadius() {
        const axisHelper = this._angleAxisHelper || this._radiusAxisHelper;
        if (axisHelper) return axisHelper.layoutRadius();
        const {width: width, height: height} = this._region.getLayoutRect();
        return Math.min(width / 2, height / 2);
    }
    initEvent() {
        super.initEvent(), this.sortDataByAxis && this.event.on(event_1.ChartEvent.scaleDomainUpdate, {
            filter: param => {
                var _a;
                return param.model.id === (null === (_a = this._angleAxisHelper) || void 0 === _a ? void 0 : _a.getAxisId());
            }
        }, (() => {
            this._sortDataInAxisDomain();
        }));
    }
    _sortDataInAxisDomain() {
        var _a, _b;
        (null === (_b = null === (_a = this.getViewData()) || void 0 === _a ? void 0 : _a.latestData) || void 0 === _b ? void 0 : _b.length) && (0, 
        utils_1.sortDataInAxisHelper)(this.angleAxisHelper, this._angleField[0], this.getViewData().latestData);
    }
    getInvalidCheckFields() {
        const fields = [];
        return this.angleAxisHelper.isContinuous && this._angleField.forEach((f => {
            fields.push(f);
        })), this.radiusAxisHelper.isContinuous && this._radiusField.forEach((f => {
            fields.push(f);
        })), fields;
    }
}

exports.PolarSeries = PolarSeries;
//# sourceMappingURL=polar.js.map
