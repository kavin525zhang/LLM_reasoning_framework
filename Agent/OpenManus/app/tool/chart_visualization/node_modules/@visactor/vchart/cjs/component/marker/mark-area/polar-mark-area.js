"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerPolarMarkArea = exports.PolarMarkArea = void 0;

const type_1 = require("../../interface/type"), utils_1 = require("../utils"), vrender_components_1 = require("@visactor/vrender-components"), factory_1 = require("../../../core/factory"), base_mark_area_1 = require("./base-mark-area"), vutils_1 = require("@visactor/vutils");

class PolarMarkArea extends base_mark_area_1.BaseMarkArea {
    constructor() {
        super(...arguments), this.type = type_1.ComponentTypeEnum.polarMarkArea, this.name = type_1.ComponentTypeEnum.polarMarkArea, 
        this.coordinateType = "polar";
    }
    _newMarkAreaComponent(attr) {
        const {doRadiusProcess: doRadiusProcess, doAngleProcess: doAngleProcess, doRadAngProcess: doRadAngProcess} = (0, 
        utils_1.getMarkAreaProcessInfo)(this._spec);
        return doAngleProcess || doRadiusProcess || doRadAngProcess ? new vrender_components_1.MarkArcArea(attr) : new vrender_components_1.MarkArea(attr);
    }
    _computePointsAttr() {
        var _a;
        const spec = this._spec, data = this._markerData, startRelativeSeries = this._startRelativeSeries, endRelativeSeries = this._endRelativeSeries, relativeSeries = this._relativeSeries, {doAngleProcess: doAngleProcess, doRadiusProcess: doRadiusProcess, doRadAngProcess: doRadAngProcess, doCoordinatesProcess: doCoordinatesProcess} = (0, 
        utils_1.getMarkAreaProcessInfo)(spec), autoRange = null !== (_a = spec.autoRange) && void 0 !== _a && _a;
        let points, pointsAttr = {};
        const center = {
            x: this._relativeSeries.getRegion().getLayoutStartPoint().x + this._relativeSeries.angleAxisHelper.center().x,
            y: this._relativeSeries.getRegion().getLayoutStartPoint().y + this._relativeSeries.angleAxisHelper.center().y
        };
        if (doAngleProcess || doRadiusProcess || doRadAngProcess) {
            const polarLines = (0, utils_1.polarLayout)(data, startRelativeSeries, endRelativeSeries, relativeSeries, autoRange);
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
        } else doCoordinatesProcess && (points = (0, utils_1.polarCoordinateLayout)(data, relativeSeries, autoRange), 
        pointsAttr = {
            points: points.map((point => (0, vutils_1.polarToCartesian)(center, point.radius, point.angle)))
        });
        return pointsAttr;
    }
    _computeOptions() {
        const spec = this._spec, {doAngleProcess: doAngleProcess, doRadiusProcess: doRadiusProcess, doRadAngProcess: doRadAngProcess, doCoordinatesProcess: doCoordinatesProcess} = (0, 
        utils_1.getMarkAreaProcessInfo)(spec);
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

exports.PolarMarkArea = PolarMarkArea, PolarMarkArea.type = type_1.ComponentTypeEnum.polarMarkArea, 
PolarMarkArea.coordinateType = "polar";

const registerPolarMarkArea = () => {
    factory_1.Factory.registerComponent(PolarMarkArea.type, PolarMarkArea), (0, vrender_components_1.registerMarkArcAreaAnimate)(), 
    (0, vrender_components_1.registerMarkAreaAnimate)();
};

exports.registerPolarMarkArea = registerPolarMarkArea;
//# sourceMappingURL=polar-mark-area.js.map
