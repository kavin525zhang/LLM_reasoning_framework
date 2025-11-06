import { ComponentTypeEnum } from "../../interface/type";

import { cartesianCoordinateLayout, getMarkAreaProcessInfo, positionLayout, xyLayout } from "../utils";

import { MarkArea as MarkAreaComponent, registerMarkAreaAnimate } from "@visactor/vrender-components";

import { isValid } from "@visactor/vutils";

import { Factory } from "../../../core/factory";

import { BaseMarkArea } from "./base-mark-area";

export class CartesianMarkArea extends BaseMarkArea {
    constructor() {
        super(...arguments), this.type = ComponentTypeEnum.markArea, this.name = ComponentTypeEnum.markArea, 
        this.coordinateType = "cartesian";
    }
    _newMarkAreaComponent(attr) {
        return new MarkAreaComponent(attr);
    }
    _computePointsAttr() {
        var _a;
        const spec = this._spec, data = this._markerData, startRelativeSeries = this._startRelativeSeries, endRelativeSeries = this._endRelativeSeries, relativeSeries = this._relativeSeries, {doXProcess: doXProcess, doYProcess: doYProcess, doXYProcess: doXYProcess, doCoordinatesProcess: doCoordinatesProcess} = getMarkAreaProcessInfo(spec), isPositionLayout = isValid(spec.positions), autoRange = null !== (_a = spec.autoRange) && void 0 !== _a && _a;
        let points = [], lines = [];
        if (doXYProcess) {
            lines = xyLayout(data, startRelativeSeries, endRelativeSeries, relativeSeries, autoRange);
            const [start, end] = lines;
            start && start.length && end && end.length && (points = [ {
                x: start[0].x,
                y: end[0].y
            }, start[0], {
                x: end[0].x,
                y: start[0].y
            }, end[0] ]);
        } else if (doXProcess || doYProcess) {
            lines = xyLayout(data, startRelativeSeries, endRelativeSeries, relativeSeries, autoRange);
            const [start, end] = lines;
            start && start.length && end && end.length && (points = [ ...start, end[1], end[0] ]);
        } else doCoordinatesProcess ? points = cartesianCoordinateLayout(data, relativeSeries, autoRange, spec.coordinatesOffset) : isPositionLayout && (points = positionLayout(spec.positions, relativeSeries, spec.regionRelative));
        return {
            points: points
        };
    }
    _computeOptions() {
        const spec = this._spec, {doXProcess: doXProcess, doYProcess: doYProcess, doXYProcess: doXYProcess, doCoordinatesProcess: doCoordinatesProcess} = getMarkAreaProcessInfo(spec);
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

CartesianMarkArea.type = ComponentTypeEnum.markArea, CartesianMarkArea.coordinateType = "cartesian";

export const registerMarkArea = () => {
    Factory.registerComponent(CartesianMarkArea.type, CartesianMarkArea), registerMarkAreaAnimate();
};
//# sourceMappingURL=cartesian-mark-area.js.map
