"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerPolarMarkPoint = exports.PolarMarkPoint = void 0;

const type_1 = require("../../interface/type"), utils_1 = require("../utils"), vrender_components_1 = require("@visactor/vrender-components"), factory_1 = require("../../../core/factory"), base_mark_point_1 = require("./base-mark-point"), vutils_1 = require("@visactor/vutils");

class PolarMarkPoint extends base_mark_point_1.BaseMarkPoint {
    constructor() {
        super(...arguments), this.type = type_1.ComponentTypeEnum.polarMarkPoint, this.name = type_1.ComponentTypeEnum.polarMarkPoint, 
        this.coordinateType = "polar";
    }
    _computePointsAttr() {
        var _a, _b;
        const data = this._markerData, relativeSeries = this._relativeSeries, autoRange = null !== (_b = null === (_a = this._spec) || void 0 === _a ? void 0 : _a.autoRange) && void 0 !== _b && _b, polarPoint = (0, 
        utils_1.polarLayout)(data, relativeSeries, relativeSeries, relativeSeries, autoRange)[0][0], center = {
            x: this._relativeSeries.getRegion().getLayoutStartPoint().x + this._relativeSeries.angleAxisHelper.center().x,
            y: this._relativeSeries.getRegion().getLayoutStartPoint().y + this._relativeSeries.angleAxisHelper.center().y
        };
        return {
            point: (0, vutils_1.polarToCartesian)(center, polarPoint.radius, polarPoint.angle)
        };
    }
    _computeOptions() {
        const spec = this._spec;
        return {
            options: [ this._processSpecByDims([ {
                dim: "radius",
                specValue: spec.radius
            }, {
                dim: "angle",
                specValue: spec.angle
            } ]) ]
        };
    }
}

exports.PolarMarkPoint = PolarMarkPoint, PolarMarkPoint.type = type_1.ComponentTypeEnum.polarMarkPoint, 
PolarMarkPoint.coordinateType = "polar";

const registerPolarMarkPoint = () => {
    factory_1.Factory.registerComponent(PolarMarkPoint.type, PolarMarkPoint), (0, vrender_components_1.registerMarkPointAnimate)();
};

exports.registerPolarMarkPoint = registerPolarMarkPoint;
//# sourceMappingURL=polar-mark-point.js.map
