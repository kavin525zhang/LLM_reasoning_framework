import { array } from "../../util";

import { RoseLikeChartSpecTransformer } from "../polar";

import { mergeSpec } from "@visactor/vutils-extension";

export class RadarChartSpecTransformer extends RoseLikeChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        var _a;
        const series = super._getDefaultSeriesSpec(spec);
        return series.line = spec.line, series.point = spec.point, series.stack = spec.stack, 
        series.percent = spec.percent, series.area = mergeSpec({
            visible: !1
        }, spec.area), series.seriesMark = null !== (_a = spec.seriesMark) && void 0 !== _a ? _a : "area", 
        series.activePoint = spec.activePoint, series.pointDis = spec.pointDis, series.pointDisMul = spec.pointDisMul, 
        series.markOverlap = spec.markOverlap, series;
    }
    transformSpec(spec) {
        var _a;
        super.transformSpec(spec), (null !== (_a = spec.axes) && void 0 !== _a ? _a : []).forEach((axis => {
            "radius" === axis.orient && ([ "domainLine", "label", "tick" ].forEach((configName => {
                axis[configName] || (axis[configName] = {
                    visible: !1
                });
            })), axis.grid || (axis.grid = {
                visible: !0
            }));
        })), spec.crosshair = array(spec.crosshair || {}).map((crosshairCfg => mergeSpec({
            categoryField: {
                visible: !0,
                line: {
                    visible: !0,
                    type: "line"
                }
            }
        }, crosshairCfg)));
    }
}
//# sourceMappingURL=radar-transformer.js.map
