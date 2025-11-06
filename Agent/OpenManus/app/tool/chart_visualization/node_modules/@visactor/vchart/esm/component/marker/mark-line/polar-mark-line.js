import { ComponentTypeEnum } from "../../interface/type";

import { polarLayout, getMarkLineProcessInfo, polarCoordinateLayout } from "../utils";

import { MarkArcLine as MarkArcLineComponent, MarkLine as MarkLineComponent, registerMarkArcLineAnimate, registerMarkLineAnimate } from "@visactor/vrender-components";

import { Factory } from "../../../core/factory";

import { BaseMarkLine } from "./base-mark-line";

import { polarToCartesian } from "@visactor/vutils";

export class PolarMarkLine extends BaseMarkLine {
    constructor() {
        super(...arguments), this.type = ComponentTypeEnum.polarMarkLine, this.name = ComponentTypeEnum.polarMarkLine, 
        this.coordinateType = "polar";
    }
    _newMarkLineComponent(attr) {
        const {doRadiusProcess: doRadiusProcess, doRadAngAng1Process: doRadAngAng1Process} = getMarkLineProcessInfo(this._spec);
        return doRadiusProcess || doRadAngAng1Process ? new MarkArcLineComponent(attr) : new MarkLineComponent(attr);
    }
    _computePointsAttr() {
        var _a;
        const spec = this._spec, data = this._markerData, startRelativeSeries = this._startRelativeSeries, endRelativeSeries = this._endRelativeSeries, relativeSeries = this._relativeSeries, autoRange = null !== (_a = spec.autoRange) && void 0 !== _a && _a, {doAngleProcess: doAngleProcess, doRadiusProcess: doRadiusProcess, doAngRadRad1Process: doAngRadRad1Process, doRadAngAng1Process: doRadAngAng1Process, doRadAngProcess: doRadAngProcess, doCoordinatesProcess: doCoordinatesProcess} = getMarkLineProcessInfo(spec);
        let points = [], pointsAttr = {};
        const center = {
            x: this._relativeSeries.getRegion().getLayoutStartPoint().x + this._relativeSeries.angleAxisHelper.center().x,
            y: this._relativeSeries.getRegion().getLayoutStartPoint().y + this._relativeSeries.angleAxisHelper.center().y
        };
        if (doAngleProcess || doRadiusProcess || doAngRadRad1Process || doRadAngAng1Process || doRadAngProcess) {
            const polarPoints = polarLayout(data, startRelativeSeries, endRelativeSeries, relativeSeries, autoRange);
            points = 1 === polarPoints.length ? polarPoints[0] : polarPoints.map((point => point[0])), 
            pointsAttr = points[0].radius === points[1].radius ? {
                radius: points[0].radius,
                startAngle: points[0].angle,
                endAngle: points[1].angle,
                center: center
            } : {
                points: points.map((point => polarToCartesian(center, point.radius, point.angle)))
            };
        } else doCoordinatesProcess && (points = polarCoordinateLayout(data, relativeSeries, autoRange), 
        pointsAttr = {
            points: points.map((point => polarToCartesian(center, point.radius, point.angle)))
        });
        return pointsAttr;
    }
    _computeOptions() {
        const spec = this._spec, {doAngleProcess: doAngleProcess, doRadiusProcess: doRadiusProcess, doAngRadRad1Process: doAngRadRad1Process, doRadAngAng1Process: doRadAngAng1Process, doRadAngProcess: doRadAngProcess, doCoordinatesProcess: doCoordinatesProcess} = getMarkLineProcessInfo(spec);
        let options;
        const processData = this._getRelativeDataView();
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
        } ]) ] : doRadiusProcess ? options = [ this._processSpecByDims([ {
            dim: "radius",
            specValue: spec.radius
        } ]) ] : doAngRadRad1Process ? options = [ this._processSpecByDims([ {
            dim: "angle",
            specValue: spec.angle
        }, {
            dim: "radius",
            specValue: spec.radius
        } ]), this._processSpecByDims([ {
            dim: "angle",
            specValue: spec.angle
        }, {
            dim: "radius",
            specValue: spec.radius1
        } ]) ] : doRadAngAng1Process ? options = [ this._processSpecByDims([ {
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
        } ]) ] : doCoordinatesProcess && (options = this._processSpecCoo(spec)), {
            options: options,
            needAggr: !0,
            needRegr: !1,
            processData: processData
        };
    }
}

PolarMarkLine.type = ComponentTypeEnum.polarMarkLine, PolarMarkLine.coordinateType = "polar";

export const registerPolarMarkLine = () => {
    Factory.registerComponent(PolarMarkLine.type, PolarMarkLine), registerMarkArcLineAnimate(), 
    registerMarkLineAnimate();
};
//# sourceMappingURL=polar-mark-line.js.map
