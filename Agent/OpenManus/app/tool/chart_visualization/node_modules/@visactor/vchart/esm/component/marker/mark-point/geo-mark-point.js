import { ComponentTypeEnum } from "../../interface/type";

import { geoLayout } from "../utils";

import { registerMarkPointAnimate } from "@visactor/vrender-components";

import { Factory } from "../../../core/factory";

import { BaseMarkPoint } from "./base-mark-point";

export class GeoMarkPoint extends BaseMarkPoint {
    constructor() {
        super(...arguments), this.type = ComponentTypeEnum.geoMarkPoint, this.name = ComponentTypeEnum.geoMarkPoint, 
        this.coordinateType = "geo";
    }
    _computePointsAttr() {
        const data = this._markerData, relativeSeries = this._relativeSeries;
        return {
            point: geoLayout(data, relativeSeries)[0][0]
        };
    }
    _computeOptions() {
        const spec = this._spec;
        return {
            options: [ this._processSpecByDims([ {
                dim: "areaName",
                specValue: spec.areaName
            } ]) ]
        };
    }
}

GeoMarkPoint.type = ComponentTypeEnum.geoMarkPoint, GeoMarkPoint.coordinateType = "geo";

export const registerGeoMarkPoint = () => {
    Factory.registerComponent(GeoMarkPoint.type, GeoMarkPoint), registerMarkPointAnimate();
};
//# sourceMappingURL=geo-mark-point.js.map
