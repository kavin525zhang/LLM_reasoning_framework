"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.RadarChartSpecTransformer = void 0;

const util_1 = require("../../util"), polar_1 = require("../polar"), vutils_extension_1 = require("@visactor/vutils-extension");

class RadarChartSpecTransformer extends polar_1.RoseLikeChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        var _a;
        const series = super._getDefaultSeriesSpec(spec);
        return series.line = spec.line, series.point = spec.point, series.stack = spec.stack, 
        series.percent = spec.percent, series.area = (0, vutils_extension_1.mergeSpec)({
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
        })), spec.crosshair = (0, util_1.array)(spec.crosshair || {}).map((crosshairCfg => (0, 
        vutils_extension_1.mergeSpec)({
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

exports.RadarChartSpecTransformer = RadarChartSpecTransformer;
//# sourceMappingURL=radar-transformer.js.map
