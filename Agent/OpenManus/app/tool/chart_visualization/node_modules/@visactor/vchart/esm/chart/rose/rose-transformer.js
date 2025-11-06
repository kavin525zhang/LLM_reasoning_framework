import { array, isNil } from "@visactor/vutils";

import { POLAR_DEFAULT_RADIUS } from "../../constant/polar";

import { RoseLikeChartSpecTransformer } from "../polar";

import { mergeSpec } from "@visactor/vutils-extension";

export class RoseChartSpecTransformer extends RoseLikeChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        var _a, _b, _c;
        const series = super._getDefaultSeriesSpec(spec);
        return series.radius = null !== (_a = spec.radius) && void 0 !== _a ? _a : POLAR_DEFAULT_RADIUS, 
        series.outerRadius = null !== (_b = spec.outerRadius) && void 0 !== _b ? _b : POLAR_DEFAULT_RADIUS, 
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
            })), "angle" === axis.orient && isNil(axis.bandPosition) && (axis.bandPosition = .5);
        })), spec.crosshair = array(spec.crosshair || {}).map((crosshairCfg => mergeSpec({
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
//# sourceMappingURL=rose-transformer.js.map
