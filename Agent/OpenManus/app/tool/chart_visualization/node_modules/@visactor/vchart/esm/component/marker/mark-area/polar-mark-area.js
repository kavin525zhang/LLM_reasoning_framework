import { ComponentTypeEnum } from "../../interface/type";

import { getMarkAreaProcessInfo, polarCoordinateLayout, polarLayout } from "../utils";

import { MarkArcArea as MarkArcAreaComponent, MarkArea as MarkAreaComponent, registerMarkArcAreaAnimate, registerMarkAreaAnimate } from "@visactor/vrender-components";

import { Factory } from "../../../core/factory";

import { BaseMarkArea } from "./base-mark-area";

import { polarToCartesian } from "@visactor/vutils";

export class PolarMarkArea extends BaseMarkArea {
    constructor() {
        super(...arguments), this.type = ComponentTypeEnum.polarMarkArea, this.name = ComponentTypeEnum.polarMarkArea, 
        this.coordinateType = "polar";
    }
    _newMarkAreaComponent(attr) {
        const {doRadiusProcess: doRadiusProcess, doAngleProcess: doAngleProcess, doRadAngProcess: doRadAngProcess} = getMarkAreaProcessInfo(this._spec);
        return doAngleProcess || doRadiusProcess || doRadAngProcess ? new MarkArcAreaComponent(attr) : new MarkAreaComponent(attr);
    }
    _computePointsAttr() {
        var _a;
        const spec = this._spec, data = this._markerData, startRelativeSeries = this._startRelativeSeries, endRelativeSeries = this._endRelativeSeries, relativeSeries = this._relativeSeries, {doAngleProcess: doAngleProcess, doRadiusProcess: doRadiusProcess, doRadAngProcess: doRadAngProcess, doCoordinatesProcess: doCoordinatesProcess} = getMarkAreaProcessInfo(spec), autoRange = null !== (_a = spec.autoRange) && void 0 !== _a && _a;
        let points, pointsAttr = {};
        const center = {
            x: this._relativeSeries.getRegion().getLayoutStartPoint().x + this._relativeSeries.angleAxisHelper.center().x,
            y: this._relativeSeries.getRegion().getLayoutStartPoint().y + this._relativeSeries.angleAxisHelper.center().y
        };
        if (doAngleProcess || doRadiusProcess || doRadAngProcess) {
            const polarLines = polarLayout(data, startRelativeSeries, endRelativeSeries, relativeSeries, autoRange);
            doRadAngProcess ? pointsAttr = {
                innerRadius: polarLines[0][0].radius,
                outerRadius: polarLines[1][0].radius,
                startAngle: polarLines[0][0].angle,
                endAngle: polarLines[1][0].angle,
                center: center
            } : doAngleProcess ? pointsAttr = {
                innerRadius: 0,
                outerRadius: Math.abs(polarLines[0][0].radius),
                startAngle: polarLines[0][1].angle,
                endAngle: polarLines[1][1].angle,
                center: center
            } : doRadiusProcess && (pointsAttr = {
                innerRadius: polarLines[0][0].radius,
                outerRadius: polarLines[1][0].radius,
                startAngle: polarLines[0][0].angle,
                endAngle: polarLines[1][1].angle,
                center: center
            });
        } else doCoordinatesProcess && (points = polarCoordinateLayout(data, relativeSeries, autoRange), 
        pointsAttr = {
            points: points.map((point => polarToCartesian(center, point.radius, point.angle)))
        });
        return pointsAttr;
    }
    _computeOptions() {
        const spec = this._spec, {doAngleProcess: doAngleProcess, doRadiusProcess: doRadiusProcess, doRadAngProcess: doRadAngProcess, doCoordinatesProcess: doCoordinatesProcess} = getMarkAreaProcessInfo(spec);
        let options;
        return doRadAngProcess ? options = [ this._processSpecByDims([ {
            dim: "angle",
            specValue: spec.angle
        }, {
            dim: "radius",
            specValue: spec.radius
        } ]), this._processSpecByDims([ {
            dim: "angle",
            specValue: spec.angle1
        }, {
            dim: "radius",
            specValue: spec.radius1
        } ]) ] : doAngleProcess ? options = [ this._processSpecByDims([ {
            dim: "angle",
            specValue: spec.angle
        }, {
            dim: "radius",
            specValue: spec.radius
        } ]), this._processSpecByDims([ {
            dim: "angle",
            specValue: spec.angle1
        }, {
            dim: "radius",
            specValue: spec.radius
        } ]) ] : doRadiusProcess ? options = [ this._processSpecByDims([ {
            dim: "radius",
            specValue: spec.radius
        } ]), this._processSpecByDims([ {
            dim: "radius",
            specValue: spec.radius1
        } ]) ] : doCoordinatesProcess && (options = this._processSpecCoo(spec)), {
            options: options
        };
    }
}

PolarMarkArea.type = ComponentTypeEnum.polarMarkArea, PolarMarkArea.coordinateType = "polar";

export const registerPolarMarkArea = () => {
    Factory.registerComponent(PolarMarkArea.type, PolarMarkArea), registerMarkArcAreaAnimate(), 
    registerMarkAreaAnimate();
};
//# sourceMappingURL=polar-mark-area.js.map
