"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.fadeOut = exports.fadeIn = void 0;

const fadeIn = (element, options, animationParameters) => {
    var _a, _b, _c, _d;
    const attrs = null !== (_a = element.getFinalAnimationAttributes()) && void 0 !== _a ? _a : {};
    return {
        from: {
            opacity: 0,
            fillOpacity: 0,
            strokeOpacity: 0
        },
        to: {
            opacity: null !== (_b = attrs.opacity) && void 0 !== _b ? _b : 1,
            fillOpacity: null !== (_c = attrs.fillOpacity) && void 0 !== _c ? _c : 1,
            strokeOpacity: null !== (_d = attrs.strokeOpacity) && void 0 !== _d ? _d : 1
        }
    };
};

exports.fadeIn = fadeIn;

const fadeOut = (element, options, animationParameters) => {
    var _a, _b, _c;
    return {
        from: {
            opacity: null !== (_a = element.getGraphicAttribute("opacity", !0)) && void 0 !== _a ? _a : 1,
            fillOpacity: null !== (_b = element.getGraphicAttribute("fillOpacity", !0)) && void 0 !== _b ? _b : 1,
            strokeOpacity: null !== (_c = element.getGraphicAttribute("strokeOpacity", !0)) && void 0 !== _c ? _c : 1
        },
        to: {
            opacity: 0,
            fillOpacity: 0,
            strokeOpacity: 0
        }
    };
};

exports.fadeOut = fadeOut;
//# sourceMappingURL=fade.js.map
