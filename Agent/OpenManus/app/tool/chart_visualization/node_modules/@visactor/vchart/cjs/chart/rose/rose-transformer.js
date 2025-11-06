"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.RoseChartSpecTransformer = void 0;

const vutils_1 = require("@visactor/vutils"), polar_1 = require("../../constant/polar"), polar_2 = require("../polar"), vutils_extension_1 = require("@visactor/vutils-extension");

class RoseChartSpecTransformer extends polar_2.RoseLikeChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        var _a, _b, _c;
        const series = super._getDefaultSeriesSpec(spec);
        return series.radius = null !== (_a = spec.radius) && void 0 !== _a ? _a : polar_1.POLAR_DEFAULT_RADIUS, 
        series.outerRadius = null !== (_b = spec.outerRadius) && void 0 !== _b ? _b : polar_1.POLAR_DEFAULT_RADIUS, 
        series.innerRadius = null !== (_c = spec.innerRadius) && void 0 !== _c ? _c : 0, 
        series.stack = spec.stack, series.percent = spec.percent, series;
    }
    transformSpec(spec) {
        var _a;
        super.transformSpec(spec), (null !== (_a = spec.axes) && void 0 !== _a ? _a : []).forEach((axis => {
            [ "domainLine", "grid", "label", "tick" ].forEach((configName => {
                axis[configName] || (axis[configName] = {
                    visible: !1
                });
            })), "angle" === axis.orient && (0, vutils_1.isNil)(axis.bandPosition) && (axis.bandPosition = .5);
        })), spec.crosshair = (0, vutils_1.array)(spec.crosshair || {}).map((crosshairCfg => (0, 
        vutils_extension_1.mergeSpec)({
            categoryField: {
                visible: !0,
                line: {
                    visible: !0,
                    type: "rect"
                }
            }
        }, crosshairCfg)));
    }
}

exports.RoseChartSpecTransformer = RoseChartSpecTransformer;
//# sourceMappingURL=rose-transformer.js.map
