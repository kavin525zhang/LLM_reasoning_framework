import { merge, getAngleByPoint, radianToDegree, polarToCartesian } from "@visactor/vutils";

import { POLAR_END_ANGLE, POLAR_START_ANGLE } from "../constant";

import { CrosshairBase } from "./base";

import { loadPolygonSectorCrosshairComponent } from "./register";

import { getPolygonPath } from "../axis";

loadPolygonSectorCrosshairComponent();

export class PolygonSectorCrosshair extends CrosshairBase {
    constructor(attributes, options) {
        super((null == options ? void 0 : options.skipDefault) ? attributes : merge({}, PolygonSectorCrosshair.defaultAttributes, attributes));
    }
    renderCrosshair(container) {
        const {center: center, radius: radius, innerRadius: innerRadius = 0, polygonSectorStyle: polygonSectorStyle} = this.attribute, {startAngle: startAngle, endAngle: endAngle} = this.attribute, points = [];
        points.push(polarToCartesian(center, innerRadius, startAngle)), points.push(polarToCartesian(center, radius * Math.cos((endAngle - startAngle) / 2), startAngle)), 
        points.push(polarToCartesian(center, radius, (startAngle + endAngle) / 2)), points.push(polarToCartesian(center, radius * Math.cos((endAngle - startAngle) / 2), endAngle)), 
        points.push(polarToCartesian(center, innerRadius, endAngle));
        return container.createOrUpdateChild("crosshair-polygon-sector", Object.assign({
            path: getPolygonPath(points, !0)
        }, polygonSectorStyle), "path");
    }
    setLocation(point) {
        const {center: center, startAngle: startAngle = POLAR_START_ANGLE, endAngle: endAngle = POLAR_END_ANGLE} = this.attribute, sectorAngle = endAngle - startAngle, pointAngle = radianToDegree(getAngleByPoint(center, point));
        this.setAttributes({
            startAngle: pointAngle - sectorAngle / 2,
            endAngle: pointAngle + sectorAngle / 2
        });
    }
}

PolygonSectorCrosshair.defaultAttributes = {
    polygonSectorStyle: {
        fill: "#b2bacf",
        opacity: .2
    }
};
//# sourceMappingURL=polygon-sector.js.map