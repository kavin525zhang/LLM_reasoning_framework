import { array, isValid, isNil } from "@visactor/vutils";

import { isContinuous } from "@visactor/vscale";

import { POLAR_DEFAULT_RADIUS } from "../../constant/polar";

import { BaseSeries } from "../base/base-series";

import { sortDataInAxisHelper } from "../util/utils";

import { ChartEvent } from "../../constant/event";

export class PolarSeries extends BaseSeries {
    constructor() {
        super(...arguments), this.coordinate = "polar", this._outerRadius = POLAR_DEFAULT_RADIUS, 
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
        return this._angleField = isValid(f) ? array(f) : [], this._angleField;
    }
    getRadiusField() {
        return this._radiusField;
    }
    setRadiusField(f) {
        return this._radiusField = isValid(f) ? array(f) : [], this._radiusField;
    }
    get innerRadiusField() {
        return this._innerRadiusField;
    }
    setInnerRadiusField(f) {
        return this._innerRadiusField = array(f), this._innerRadiusField;
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
        if (isNil(angleValue) || isNil(radiusValue) || !this.angleAxisHelper || !this.radiusAxisHelper) return {
            x: Number.NaN,
            y: Number.NaN
        };
        const radius = this.radiusAxisHelper.dataToPosition(array(radiusValue));
        if (radius < 0) {
            if ("break" === this._invalidType || "link" === this._invalidType) return {
                x: Number.NaN,
                y: Number.NaN
            };
            if ("zero" === this._invalidType) return this.angleAxisHelper.center();
        }
        const angle = this.angleAxisHelper.dataToPosition(array(angleValue));
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
            isContinuous(this.radiusAxisHelper.getScale(0).type) ? result.operations = [ "max", "min" ] : result.operations = [ "values" ], 
            fields.push(result);
        })), (null === (_b = this.angleAxisHelper) || void 0 === _b ? void 0 : _b.getScale) && this._angleField.forEach((f => {
            const result = {
                key: f,
                operations: []
            };
            isContinuous(this.angleAxisHelper.getScale(0).type) ? result.operations = [ "max", "min" ] : result.operations = [ "values" ], 
            fields.push(result);
        })), fields;
    }
    setAttrFromSpec() {
        super.setAttrFromSpec(), isValid(this._spec.outerRadius) && (this._outerRadius = this._spec.outerRadius), 
        isValid(this._spec.radius) && (this._outerRadius = this._spec.radius), isValid(this._spec.innerRadius) && (this._innerRadius = this._spec.innerRadius), 
        isValid(this._spec.sortDataByAxis) && (this._sortDataByAxis = !0 === this._spec.sortDataByAxis);
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
        super.initEvent(), this.sortDataByAxis && this.event.on(ChartEvent.scaleDomainUpdate, {
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
        (null === (_b = null === (_a = this.getViewData()) || void 0 === _a ? void 0 : _a.latestData) || void 0 === _b ? void 0 : _b.length) && sortDataInAxisHelper(this.angleAxisHelper, this._angleField[0], this.getViewData().latestData);
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
//# sourceMappingURL=polar.js.map
