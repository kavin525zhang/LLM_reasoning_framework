"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.growRadiusOut = exports.growRadiusIn = exports.growAngleOut = exports.growAngleIn = void 0;

const vutils_1 = require("@visactor/vutils"), growAngleInIndividual = (element, options, animationParameters) => {
    const attrs = element.getFinalAnimationAttributes();
    return options && "anticlockwise" === options.orient ? {
        from: {
            startAngle: null == attrs ? void 0 : attrs.endAngle
        },
        to: {
            startAngle: null == attrs ? void 0 : attrs.startAngle
        }
    } : {
        from: {
            endAngle: null == attrs ? void 0 : attrs.startAngle
        },
        to: {
            endAngle: null == attrs ? void 0 : attrs.endAngle
        }
    };
}, growAngleInOverall = (element, options, animationParameters) => {
    const attrs = element.getFinalAnimationAttributes();
    if (options && "anticlockwise" === options.orient) {
        const overallValue = (0, vutils_1.isNumber)(options.overall) ? options.overall : 2 * Math.PI;
        return {
            from: {
                startAngle: overallValue,
                endAngle: overallValue
            },
            to: {
                startAngle: null == attrs ? void 0 : attrs.startAngle,
                endAngle: null == attrs ? void 0 : attrs.endAngle
            }
        };
    }
    const overallValue = (0, vutils_1.isNumber)(null == options ? void 0 : options.overall) ? options.overall : 0;
    return {
        from: {
            startAngle: overallValue,
            endAngle: overallValue
        },
        to: {
            startAngle: null == attrs ? void 0 : attrs.startAngle,
            endAngle: null == attrs ? void 0 : attrs.endAngle
        }
    };
}, growAngleIn = (element, options, animationParameters) => {
    var _a;
    return !1 !== (null !== (_a = null == options ? void 0 : options.overall) && void 0 !== _a && _a) ? growAngleInOverall(element, options) : growAngleInIndividual(element, options);
};

exports.growAngleIn = growAngleIn;

const growAngleOutIndividual = (element, options, animationParameters) => {
    const attrs = element.getFinalAnimationAttributes();
    return options && "anticlockwise" === options.orient ? {
        from: {
            startAngle: element.getGraphicAttribute("startAngle", !0)
        },
        to: {
            startAngle: null == attrs ? void 0 : attrs.endAngle
        }
    } : {
        from: {
            endAngle: element.getGraphicAttribute("endAngle", !0)
        },
        to: {
            endAngle: null == attrs ? void 0 : attrs.startAngle
        }
    };
}, growAngleOutOverall = (element, options, animationParameters) => {
    if (options && "anticlockwise" === options.orient) {
        const overallValue = (0, vutils_1.isNumber)(options.overall) ? options.overall : 2 * Math.PI;
        return {
            from: {
                startAngle: element.getGraphicAttribute("startAngle", !0),
                endAngle: element.getGraphicAttribute("endAngle", !0)
            },
            to: {
                startAngle: overallValue,
                endAngle: overallValue
            }
        };
    }
    const overallValue = (0, vutils_1.isNumber)(null == options ? void 0 : options.overall) ? options.overall : 0;
    return {
        from: {
            startAngle: element.getGraphicAttribute("startAngle", !0),
            endAngle: element.getGraphicAttribute("endAngle", !0)
        },
        to: {
            startAngle: overallValue,
            endAngle: overallValue
        }
    };
}, growAngleOut = (element, options, animationParameters) => {
    var _a;
    return !1 !== (null !== (_a = null == options ? void 0 : options.overall) && void 0 !== _a && _a) ? growAngleOutOverall(element, options) : growAngleOutIndividual(element, options);
};

exports.growAngleOut = growAngleOut;

const growRadiusInIndividual = (element, options, animationParameters) => {
    const attrs = element.getFinalAnimationAttributes();
    return options && "inside" === options.orient ? {
        from: {
            innerRadius: null == attrs ? void 0 : attrs.outerRadius
        },
        to: {
            innerRadius: null == attrs ? void 0 : attrs.innerRadius
        }
    } : {
        from: {
            outerRadius: null == attrs ? void 0 : attrs.innerRadius
        },
        to: {
            outerRadius: null == attrs ? void 0 : attrs.outerRadius
        }
    };
}, growRadiusInOverall = (element, options, animationParameters) => {
    const attrs = element.getFinalAnimationAttributes(), overallValue = (0, vutils_1.isNumber)(null == options ? void 0 : options.overall) ? options.overall : 0;
    return {
        from: {
            innerRadius: overallValue,
            outerRadius: overallValue
        },
        to: {
            innerRadius: null == attrs ? void 0 : attrs.innerRadius,
            outerRadius: null == attrs ? void 0 : attrs.outerRadius
        }
    };
}, growRadiusIn = (element, options, animationParameters) => {
    var _a;
    return !1 !== (null !== (_a = null == options ? void 0 : options.overall) && void 0 !== _a && _a) ? growRadiusInOverall(element, options) : growRadiusInIndividual(element, options);
};

exports.growRadiusIn = growRadiusIn;

const growRadiusOutIndividual = (element, options, animationParameters) => {
    const attrs = element.getFinalAnimationAttributes();
    return options && "inside" === options.orient ? {
        from: {
            innerRadius: element.getGraphicAttribute("innerRadius", !0)
        },
        to: {
            innerRadius: null == attrs ? void 0 : attrs.outerRadius
        }
    } : {
        from: {
            outerRadius: element.getGraphicAttribute("outerRadius", !0)
        },
        to: {
            outerRadius: null == attrs ? void 0 : attrs.innerRadius
        }
    };
}, growRadiusOutOverall = (element, options, animationParameters) => {
    const overallValue = (0, vutils_1.isNumber)(null == options ? void 0 : options.overall) ? options.overall : 0;
    return {
        from: {
            innerRadius: element.getGraphicAttribute("innerRadius", !0),
            outerRadius: element.getGraphicAttribute("outerRadius", !0)
        },
        to: {
            innerRadius: overallValue,
            outerRadius: overallValue
        }
    };
}, growRadiusOut = (element, options, animationParameters) => {
    var _a;
    return !1 !== (null !== (_a = null == options ? void 0 : options.overall) && void 0 !== _a && _a) ? growRadiusOutOverall(element, options) : growRadiusOutIndividual(element, options);
};

exports.growRadiusOut = growRadiusOut;
//# sourceMappingURL=grow-polar.js.map
