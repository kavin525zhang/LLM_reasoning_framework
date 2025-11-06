import { ComponentTypeEnum } from "../../interface/type";

import { polarLayout } from "../utils";

import { registerMarkPointAnimate } from "@visactor/vrender-components";

import { Factory } from "../../../core/factory";

import { BaseMarkPoint } from "./base-mark-point";

import { polarToCartesian } from "@visactor/vutils";

export class PolarMarkPoint extends BaseMarkPoint {
    constructor() {
        super(...arguments), this.type = ComponentTypeEnum.polarMarkPoint, this.name = ComponentTypeEnum.polarMarkPoint, 
        this.coordinateType = "polar";
    }
    _computePointsAttr() {
        var _a, _b;
        const data = this._markerData, relativeSeries = this._relativeSeries, autoRange = null !== (_b = null === (_a = this._spec) || void 0 === _a ? void 0 : _a.autoRange) && void 0 !== _b && _b, polarPoint = polarLayout(data, relativeSeries, relativeSeries, relativeSeries, autoRange)[0][0], center = {
            x: this._relativeSeries.getRegion().getLayoutStartPoint().x + this._relativeSeries.angleAxisHelper.center().x,
            y: this._relativeSeries.getRegion().getLayoutStartPoint().y + this._relativeSeries.angleAxisHelper.center().y
        };
        return {
            point: polarToCartesian(center, polarPoint.radius, polarPoint.angle)
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

PolarMarkPoint.type = ComponentTypeEnum.polarMarkPoint, PolarMarkPoint.coordinateType = "polar";

export const registerPolarMarkPoint = () => {
    Factory.registerComponent(PolarMarkPoint.type, PolarMarkPoint), registerMarkPointAnimate();
};
//# sourceMappingURL=polar-mark-point.js.map
