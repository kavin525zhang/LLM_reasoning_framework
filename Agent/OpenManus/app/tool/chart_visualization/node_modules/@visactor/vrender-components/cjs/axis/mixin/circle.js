"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.CircleAxisMixin = void 0;

const vutils_1 = require("@visactor/vutils"), constant_1 = require("../../constant"), util_1 = require("../util");

class CircleAxisMixin {
    isInValidValue(value) {
        const {startAngle: startAngle = constant_1.POLAR_START_ANGLE, endAngle: endAngle = constant_1.POLAR_END_ANGLE} = this.attribute;
        return Math.abs(endAngle - startAngle) % (2 * Math.PI) == 0 ? value > 1 : value < 0 || value > 1;
    }
    getTickCoord(tickValue) {
        const {startAngle: startAngle = constant_1.POLAR_START_ANGLE, endAngle: endAngle = constant_1.POLAR_END_ANGLE, center: center, radius: radius, inside: inside = !1, innerRadius: innerRadius = 0} = this.attribute, angle = startAngle + (endAngle - startAngle) * tickValue;
        return (0, vutils_1.polarToCartesian)(center, inside && innerRadius > 0 ? innerRadius : radius, angle);
    }
    getVerticalVector(offset, inside = !1, point) {
        return (0, util_1.getCircleVerticalVector)(offset, point, this.attribute.center, inside, this.attribute.inside);
    }
    getRelativeVector(point) {
        const {center: center} = this.attribute;
        return [ point.y - center.y, -1 * (point.x - center.x) ];
    }
}

exports.CircleAxisMixin = CircleAxisMixin;
//# sourceMappingURL=circle.js.map
