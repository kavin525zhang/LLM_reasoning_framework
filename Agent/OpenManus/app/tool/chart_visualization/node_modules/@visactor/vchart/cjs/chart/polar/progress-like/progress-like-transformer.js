"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ProgressLikeChartSpecTransformer = void 0;

const vutils_1 = require("@visactor/vutils"), polar_transformer_1 = require("../polar-transformer"), util_1 = require("../../../component/axis/util"), vutils_extension_1 = require("@visactor/vutils-extension");

class ProgressLikeChartSpecTransformer extends polar_transformer_1.PolarChartSpecTransformer {
    needAxes() {
        return !1;
    }
    _getDefaultSeriesSpec(spec) {
        const series = super._getDefaultSeriesSpec(spec, [ "startAngle", "endAngle", "centerX", "centerY" ]);
        return series.categoryField = spec.categoryField || spec.radiusField, series.valueField = spec.valueField || spec.angleField, 
        series;
    }
    _transformProgressAxisSpec(spec, angleAxisDefaultSpec, radiusAxisDefaultSpec, angleAxisAppendSpec, radiusAxisAppendSpec) {
        var _a, _b;
        spec.axes || (spec.axes = []);
        let radiusAxis = (null !== (_a = spec.axes) && void 0 !== _a ? _a : []).find((axis => "radius" === axis.orient)), angleAxis = (null !== (_b = spec.axes) && void 0 !== _b ? _b : []).find((axis => "angle" === axis.orient));
        angleAxis || (angleAxis = angleAxisDefaultSpec, spec.axes.push(angleAxis)), radiusAxis || (radiusAxis = radiusAxisDefaultSpec, 
        spec.axes.push(radiusAxis)), (0, vutils_1.isNil)(angleAxis.type) && (angleAxis.type = "linear"), 
        (0, vutils_1.isNil)(radiusAxis.type) && (radiusAxis.type = "band");
        const domain = (0, util_1.getLinearAxisSpecDomain)(angleAxis, {
            min: 0,
            max: 1
        });
        (0, vutils_1.isNil)(angleAxis.min) && (angleAxis.min = domain.min), (0, vutils_1.isNil)(angleAxis.max) && (angleAxis.max = domain.max), 
        angleAxisAppendSpec && Object.assign(angleAxis, (0, vutils_extension_1.mergeSpec)({}, angleAxisAppendSpec, angleAxis)), 
        radiusAxisAppendSpec && Object.assign(radiusAxis, (0, vutils_extension_1.mergeSpec)({}, radiusAxisAppendSpec, radiusAxis));
    }
}

exports.ProgressLikeChartSpecTransformer = ProgressLikeChartSpecTransformer;
//# sourceMappingURL=progress-like-transformer.js.map
