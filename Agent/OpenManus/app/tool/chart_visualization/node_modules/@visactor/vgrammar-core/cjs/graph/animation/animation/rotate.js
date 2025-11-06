"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.rotateOut = exports.rotateIn = void 0;

const vutils_1 = require("@visactor/vutils"), rotateIn = (element, options, animationParameters) => {
    var _a;
    const attributeAngle = null !== (_a = element.getFinalAnimationAttribute("angle")) && void 0 !== _a ? _a : 0;
    let angle = 0;
    return angle = (0, vutils_1.isNumberClose)(attributeAngle / (2 * Math.PI), 0) ? Math.round(attributeAngle / (2 * Math.PI)) * Math.PI * 2 : (0, 
    vutils_1.isValidNumber)(null == options ? void 0 : options.angle) ? options.angle : "anticlockwise" === (null == options ? void 0 : options.orient) ? Math.ceil(attributeAngle / (2 * Math.PI)) * Math.PI * 2 : Math.floor(attributeAngle / (2 * Math.PI)) * Math.PI * 2, 
    {
        from: {
            angle: angle
        },
        to: {
            angle: attributeAngle
        }
    };
};

exports.rotateIn = rotateIn;

const rotateOut = (element, options, animationParameters) => {
    var _a;
    const finalAngle = null !== (_a = element.getGraphicAttribute("angle", !0)) && void 0 !== _a ? _a : 0;
    let angle = 0;
    return angle = (0, vutils_1.isNumberClose)(finalAngle / (2 * Math.PI), 0) ? Math.round(finalAngle / (2 * Math.PI)) * Math.PI * 2 : (0, 
    vutils_1.isValidNumber)(null == options ? void 0 : options.angle) ? options.angle : "anticlockwise" === (null == options ? void 0 : options.orient) ? Math.ceil(finalAngle / (2 * Math.PI)) * Math.PI * 2 : Math.floor(finalAngle / (2 * Math.PI)) * Math.PI * 2, 
    {
        from: {
            angle: finalAngle
        },
        to: {
            angle: angle
        }
    };
};

exports.rotateOut = rotateOut;
//# sourceMappingURL=rotate.js.map
