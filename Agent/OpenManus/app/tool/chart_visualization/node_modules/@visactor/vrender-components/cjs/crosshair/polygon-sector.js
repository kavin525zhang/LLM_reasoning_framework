"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.PolygonSectorCrosshair = void 0;

const vutils_1 = require("@visactor/vutils"), constant_1 = require("../constant"), base_1 = require("./base"), register_1 = require("./register"), axis_1 = require("../axis");

(0, register_1.loadPolygonSectorCrosshairComponent)();

class PolygonSectorCrosshair extends base_1.CrosshairBase {
    constructor(attributes, options) {
        super((null == options ? void 0 : options.skipDefault) ? attributes : (0, vutils_1.merge)({}, PolygonSectorCrosshair.defaultAttributes, attributes));
    }
    renderCrosshair(container) {
        const {center: center, radius: radius, innerRadius: innerRadius = 0, polygonSectorStyle: polygonSectorStyle} = this.attribute, {startAngle: startAngle, endAngle: endAngle} = this.attribute, points = [];
        points.push((0, vutils_1.polarToCartesian)(center, innerRadius, startAngle)), points.push((0, 
        vutils_1.polarToCartesian)(center, radius * Math.cos((endAngle - startAngle) / 2), startAngle)), 
        points.push((0, vutils_1.polarToCartesian)(center, radius, (startAngle + endAngle) / 2)), 
        points.push((0, vutils_1.polarToCartesian)(center, radius * Math.cos((endAngle - startAngle) / 2), endAngle)), 
        points.push((0, vutils_1.polarToCartesian)(center, innerRadius, endAngle));
        return container.createOrUpdateChild("crosshair-polygon-sector", Object.assign({
            path: (0, axis_1.getPolygonPath)(points, !0)
        }, polygonSectorStyle), "path");
    }
    setLocation(point) {
        const {center: center, startAngle: startAngle = constant_1.POLAR_START_ANGLE, endAngle: endAngle = constant_1.POLAR_END_ANGLE} = this.attribute, sectorAngle = endAngle - startAngle, pointAngle = (0, 
        vutils_1.radianToDegree)((0, vutils_1.getAngleByPoint)(center, point));
        this.setAttributes({
            startAngle: pointAngle - sectorAngle / 2,
            endAngle: pointAngle + sectorAngle / 2
        });
    }
}

exports.PolygonSectorCrosshair = PolygonSectorCrosshair, PolygonSectorCrosshair.defaultAttributes = {
    polygonSectorStyle: {
        fill: "#b2bacf",
        opacity: .2
    }
};
//# sourceMappingURL=polygon-sector.js.map