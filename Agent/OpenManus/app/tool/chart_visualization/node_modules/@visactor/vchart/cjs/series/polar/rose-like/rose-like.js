"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.RoseLikeSeries = void 0;

const vutils_1 = require("@visactor/vutils"), data_1 = require("../../../constant/data"), polar_1 = require("../polar");

class RoseLikeSeries extends polar_1.PolarSeries {
    getStackGroupFields() {
        return this._angleField;
    }
    getStackValueField() {
        return (0, vutils_1.array)(this._spec.valueField)[0] || (0, vutils_1.array)(this._spec.radiusField)[0];
    }
    getGroupFields() {
        return this._angleField;
    }
    setAttrFromSpec() {
        super.setAttrFromSpec(), this.setAngleField(this._spec.categoryField || this._spec.angleField), 
        this.setRadiusField(this._spec.valueField || this._spec.radiusField), this._specAngleField = this._angleField.slice(), 
        this._specRadiusField = this._radiusField.slice(), this.setInnerRadiusField(this._spec.valueField || this._spec.radiusField), 
        this.getStack() && this.setValueFieldToStack(), this.getPercent() && this.setValueFieldToPercent();
    }
    setValueFieldToStack() {
        this.setRadiusField(data_1.STACK_FIELD_END), this.setInnerRadiusField(data_1.STACK_FIELD_START);
    }
    setValueFieldToPercent() {
        this.setRadiusField(data_1.STACK_FIELD_END_PERCENT), this.setInnerRadiusField(data_1.STACK_FIELD_START_PERCENT);
    }
    getDimensionField() {
        return this._specAngleField;
    }
    getMeasureField() {
        return this._specRadiusField;
    }
    getDefaultShapeType() {
        return "square";
    }
}

exports.RoseLikeSeries = RoseLikeSeries;
//# sourceMappingURL=rose-like.js.map
