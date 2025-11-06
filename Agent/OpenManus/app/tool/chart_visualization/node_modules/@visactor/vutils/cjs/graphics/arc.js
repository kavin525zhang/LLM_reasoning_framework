"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.calculateAnchorOfArc = void 0;

const calculateAnchorOfArc = (arcAttr, anchorType) => {
    const {startAngle: startAngle, endAngle: endAngle, innerRadius: innerRadius, outerRadius: outerRadius} = arcAttr;
    let angle = (startAngle + endAngle) / 2, radius = (innerRadius + outerRadius) / 2;
    switch (anchorType) {
      case "inner-start":
        angle = startAngle, radius = innerRadius;
        break;

      case "outer-start":
        angle = startAngle, radius = outerRadius;
        break;

      case "inner-end":
        angle = endAngle, radius = innerRadius;
        break;

      case "outer-end":
        angle = endAngle, radius = outerRadius;
        break;

      case "inner-middle":
        radius = innerRadius;
        break;

      case "outer-middle":
        radius = outerRadius;
    }
    return {
        angle: angle,
        radius: radius
    };
};

exports.calculateAnchorOfArc = calculateAnchorOfArc;
//# sourceMappingURL=arc.js.map
