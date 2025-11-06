"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerGeoMarkPoint = exports.GeoMarkPoint = void 0;

const type_1 = require("../../interface/type"), utils_1 = require("../utils"), vrender_components_1 = require("@visactor/vrender-components"), factory_1 = require("../../../core/factory"), base_mark_point_1 = require("./base-mark-point");

class GeoMarkPoint extends base_mark_point_1.BaseMarkPoint {
    constructor() {
        super(...arguments), this.type = type_1.ComponentTypeEnum.geoMarkPoint, this.name = type_1.ComponentTypeEnum.geoMarkPoint, 
        this.coordinateType = "geo";
    }
    _computePointsAttr() {
        const data = this._markerData, relativeSeries = this._relativeSeries;
        return {
            point: (0, utils_1.geoLayout)(data, relativeSeries)[0][0]
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

exports.GeoMarkPoint = GeoMarkPoint, GeoMarkPoint.type = type_1.ComponentTypeEnum.geoMarkPoint, 
GeoMarkPoint.coordinateType = "geo";

const registerGeoMarkPoint = () => {
    factory_1.Factory.registerComponent(GeoMarkPoint.type, GeoMarkPoint), (0, vrender_components_1.registerMarkPointAnimate)();
};

exports.registerGeoMarkPoint = registerGeoMarkPoint;
//# sourceMappingURL=geo-mark-point.js.map
