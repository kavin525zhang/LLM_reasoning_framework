"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerMarkArea = exports.CartesianMarkArea = void 0;

const type_1 = require("../../interface/type"), utils_1 = require("../utils"), vrender_components_1 = require("@visactor/vrender-components"), vutils_1 = require("@visactor/vutils"), factory_1 = require("../../../core/factory"), base_mark_area_1 = require("./base-mark-area");

class CartesianMarkArea extends base_mark_area_1.BaseMarkArea {
    constructor() {
        super(...arguments), this.type = type_1.ComponentTypeEnum.markArea, this.name = type_1.ComponentTypeEnum.markArea, 
        this.coordinateType = "cartesian";
    }
    _newMarkAreaComponent(attr) {
        return new vrender_components_1.MarkArea(attr);
    }
    _computePointsAttr() {
        var _a;
        const spec = this._spec, data = this._markerData, startRelativeSeries = this._startRelativeSeries, endRelativeSeries = this._endRelativeSeries, relativeSeries = this._relativeSeries, {doXProcess: doXProcess, doYProcess: doYProcess, doXYProcess: doXYProcess, doCoordinatesProcess: doCoordinatesProcess} = (0, 
        utils_1.getMarkAreaProcessInfo)(spec), isPositionLayout = (0, vutils_1.isValid)(spec.positions), autoRange = null !== (_a = spec.autoRange) && void 0 !== _a && _a;
        let points = [], lines = [];
        if (doXYProcess) {
            lines = (0, utils_1.xyLayout)(data, startRelativeSeries, endRelativeSeries, relativeSeries, autoRange);
            const [start, end] = lines;
            start && start.length && end && end.length && (points = [ {
                x: start[0].x,
                y: end[0].y
            }, start[0], {
                x: end[0].x,
                y: start[0].y
            }, end[0] ]);
        } else if (doXProcess || doYProcess) {
            lines = (0, utils_1.xyLayout)(data, startRelativeSeries, endRelativeSeries, relativeSeries, autoRange);
            const [start, end] = lines;
            start && start.length && end && end.length && (points = [ ...start, end[1], end[0] ]);
        } else doCoordinatesProcess ? points = (0, utils_1.cartesianCoordinateLayout)(data, relativeSeries, autoRange, spec.coordinatesOffset) : isPositionLayout && (points = (0, 
        utils_1.positionLayout)(spec.positions, relativeSeries, spec.regionRelative));
        return {
            points: points
        };
    }
    _computeOptions() {
        const spec = this._spec, {doXProcess: doXProcess, doYProcess: doYProcess, doXYProcess: doXYProcess, doCoordinatesProcess: doCoordinatesProcess} = (0, 
        utils_1.getMarkAreaProcessInfo)(spec);
        let options;
        return doXYProcess ? options = [ this._processSpecByDims([ {
            dim: "x",
            specValue: spec.x
        }, {
            dim: "y",
            specValue: spec.y
        } ]), this._processSpecByDims([ {
            dim: "x",
            specValue: spec.x1
        }, {
            dim: "y",
            specValue: spec.y1
        } ]) ] : doXProcess ? options = [ this._processSpecByDims([ {
            dim: "x",
            specValue: spec.x
        } ]), this._processSpecByDims([ {
            dim: "x",
            specValue: spec.x1
        } ]) ] : doYProcess ? options = [ this._processSpecByDims([ {
            dim: "y",
            specValue: spec.y
        } ]), this._processSpecByDims([ {
            dim: "y",
            specValue: spec.y1
        } ]) ] : doCoordinatesProcess && (options = this._processSpecCoo(spec)), {
            options: options
        };
    }
}

exports.CartesianMarkArea = CartesianMarkArea, CartesianMarkArea.type = type_1.ComponentTypeEnum.markArea, 
CartesianMarkArea.coordinateType = "cartesian";

const registerMarkArea = () => {
    factory_1.Factory.registerComponent(CartesianMarkArea.type, CartesianMarkArea), 
    (0, vrender_components_1.registerMarkAreaAnimate)();
};

exports.registerMarkArea = registerMarkArea;
//# sourceMappingURL=cartesian-mark-area.js.map
