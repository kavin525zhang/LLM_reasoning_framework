import { ARC_MIDDLE_ANGLE } from "../../../constant/polar";

import { isValidNumber, polarToCartesian } from "@visactor/vutils";

export function centerOffsetConfig(mark, originalConfig) {
    var _a, _b, _c, _d;
    const offset = null !== (_b = null === (_a = originalConfig.options) || void 0 === _a ? void 0 : _a.distance) && void 0 !== _b ? _b : 10, duration = isValidNumber(originalConfig.duration) ? originalConfig.duration / 2 : 1e3, easing = null !== (_c = originalConfig.options.easing) && void 0 !== _c ? _c : "cubicOut";
    return {
        oneByOne: originalConfig.oneByOne,
        loop: null !== (_d = originalConfig.loop) && void 0 !== _d && _d,
        timeSlices: [ {
            duration: duration,
            effects: {
                easing: easing,
                channel: {
                    x: {
                        from: datum => mark.getAttribute("x", datum),
                        to: datum => mark.getAttribute("x", datum) + polarToCartesian({
                            x: 0,
                            y: 0
                        }, offset, datum[ARC_MIDDLE_ANGLE]).x
                    },
                    y: {
                        from: datum => mark.getAttribute("y", datum),
                        to: datum => mark.getAttribute("y", datum) + polarToCartesian({
                            x: 0,
                            y: 0
                        }, offset, datum[ARC_MIDDLE_ANGLE]).y
                    }
                }
            }
        }, {
            duration: duration,
            effects: {
                easing: easing,
                channel: {
                    x: {
                        to: datum => mark.getAttribute("x", datum),
                        from: datum => mark.getAttribute("x", datum) + polarToCartesian({
                            x: 0,
                            y: 0
                        }, offset, datum[ARC_MIDDLE_ANGLE]).x
                    },
                    y: {
                        to: datum => mark.getAttribute("y", datum),
                        from: datum => mark.getAttribute("y", datum) + polarToCartesian({
                            x: 0,
                            y: 0
                        }, offset, datum[ARC_MIDDLE_ANGLE]).y
                    }
                }
            }
        } ]
    };
}
//# sourceMappingURL=centerOffset.js.map
