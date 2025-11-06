import { isNil } from "@visactor/vutils";

import { PolarChartSpecTransformer } from "../polar-transformer";

import { getLinearAxisSpecDomain } from "../../../component/axis/util";

import { mergeSpec } from "@visactor/vutils-extension";

export class ProgressLikeChartSpecTransformer extends PolarChartSpecTransformer {
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
        spec.axes.push(radiusAxis)), isNil(angleAxis.type) && (angleAxis.type = "linear"), 
        isNil(radiusAxis.type) && (radiusAxis.type = "band");
        const domain = getLinearAxisSpecDomain(angleAxis, {
            min: 0,
            max: 1
        });
        isNil(angleAxis.min) && (angleAxis.min = domain.min), isNil(angleAxis.max) && (angleAxis.max = domain.max), 
        angleAxisAppendSpec && Object.assign(angleAxis, mergeSpec({}, angleAxisAppendSpec, angleAxis)), 
        radiusAxisAppendSpec && Object.assign(radiusAxis, mergeSpec({}, radiusAxisAppendSpec, radiusAxis));
    }
}
//# sourceMappingURL=progress-like-transformer.js.map
