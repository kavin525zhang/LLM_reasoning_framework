"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerPolarMarkLine = exports.PolarMarkLine = void 0;

const type_1 = require("../../interface/type"), utils_1 = require("../utils"), vrender_components_1 = require("@visactor/vrender-components"), factory_1 = require("../../../core/factory"), base_mark_line_1 = require("./base-mark-line"), vutils_1 = require("@visactor/vutils");

class PolarMarkLine extends base_mark_line_1.BaseMarkLine {
    constructor() {
        super(...arguments), this.type = type_1.ComponentTypeEnum.polarMarkLine, this.name = type_1.ComponentTypeEnum.polarMarkLine, 
        this.coordinateType = "polar";
    }
    _newMarkLineComponent(attr) {
        const {doRadiusProcess: doRadiusProcess, doRadAngAng1Process: doRadAngAng1Process} = (0, 
        utils_1.getMarkLineProcessInfo)(this._spec);
        return doRadiusProcess || doRadAngAng1Process ? new vrender_components_1.MarkArcLine(attr) : new vrender_components_1.MarkLine(attr);
    }
    _computePointsAttr() {
        var _a;
        const spec = this._spec, data = this._markerData, startRelativeSeries = this._startRelativeSeries, endRelativeSeries = this._endRelativeSeries, relativeSeries = this._relativeSeries, autoRange = null !== (_a = spec.autoRange) && void 0 !== _a && _a, {doAngleProcess: doAngleProcess, doRadiusProcess: doRadiusProcess, doAngRadRad1Process: doAngRadRad1Process, doRadAngAng1Process: doRadAngAng1Process, doRadAngProcess: doRadAngProcess, doCoordinatesProcess: doCoordinatesProcess} = (0, 
        utils_1.getMarkLineProcessInfo)(spec);
        let points = [], pointsAttr = {};
        const center = {
            x: this._relativeSeries.getRegion().getLayoutStartPoint().x + this._relativeSeries.angleAxisHelper.center().x,
            y: this._relativeSeries.getRegion().getLayoutStartPoint().y + this._relativeSeries.angleAxisHelper.center().y
        };
        if (doAngleProcess || doRadiusProcess || doAngRadRad1Process || doRadAngAng1Process || doRadAngProcess) {
            const polarPoints = (0, utils_1.polarLayout)(data, startRelativeSeries, endRelativeSeries, relativeSeries, autoRange);
            points = 1 === polarPoints.length ? polarPoints[0] : polarPoints.map((point => point[0])), 
            pointsAttr = points[0].radius === points[1].radius ? {
                radius: points[0].radius,
                startAngle: points[0].angle,
                endAngle: points[1].angle,
                center: center
            } : {
                points: points.map((point => (0, vutils_1.polarToCartesian)(center, point.radius, point.angle)))
            };
        } else doCoordinatesProcess && (points = (0, utils_1.polarCoordinateLayout)(data, relativeSeries, autoRange), 
        pointsAttr = {
            points: points.map((point => (0, vutils_1.polarToCartesian)(center, point.radius, point.angle)))
        });
        return pointsAttr;
    }
    _computeOptions() {
        const spec = this._spec, {doAngleProcess: doAngleProcess, doRadiusProcess: doRadiusProcess, doAngRadRad1Process: doAngRadRad1Process, doRadAngAng1Process: doRadAngAng1Process, doRadAngProcess: doRadAngProcess, doCoordinatesProcess: doCoordinatesProcess} = (0, 
        utils_1.getMarkLineProcessInfo)(spec);
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

exports.PolarMarkLine = PolarMarkLine, PolarMarkLine.type = type_1.ComponentTypeEnum.polarMarkLine, 
PolarMarkLine.coordinateType = "polar";

const registerPolarMarkLine = () => {
    factory_1.Factory.registerComponent(PolarMarkLine.type, PolarMarkLine), (0, vrender_components_1.registerMarkArcLineAnimate)(), 
    (0, vrender_components_1.registerMarkLineAnimate)();
};

exports.registerPolarMarkLine = registerPolarMarkLine;
//# sourceMappingURL=polar-mark-line.js.map
