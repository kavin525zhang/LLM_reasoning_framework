import { polarToCartesian } from "@visactor/vutils";

import { POLAR_START_ANGLE, POLAR_END_ANGLE } from "../../constant";

import { getCircleVerticalVector } from "../util";

export class CircleAxisMixin {
    isInValidValue(value) {
        const {startAngle: startAngle = POLAR_START_ANGLE, endAngle: endAngle = POLAR_END_ANGLE} = this.attribute;
        return Math.abs(endAngle - startAngle) % (2 * Math.PI) == 0 ? value > 1 : value < 0 || value > 1;
    }
    getTickCoord(tickValue) {
        const {startAngle: startAngle = POLAR_START_ANGLE, endAngle: endAngle = POLAR_END_ANGLE, center: center, radius: radius, inside: inside = !1, innerRadius: innerRadius = 0} = this.attribute;
        return polarToCartesian(center, inside && innerRadius > 0 ? innerRadius : radius, startAngle + (endAngle - startAngle) * tickValue);
    }
    getVerticalVector(offset, inside = !1, point) {
        return getCircleVerticalVector(offset, point, this.attribute.center, inside, this.attribute.inside);
    }
    getRelativeVector(point) {
        const {center: center} = this.attribute;
        return [ point.y - center.y, -1 * (point.x - center.x) ];
    }
}
//# sourceMappingURL=circle.js.map
