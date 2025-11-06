import { isValid, radianToDegree } from "@visactor/vutils";

import { BaseChartSpecTransformer } from "../base";

import { POLAR_START_ANGLE } from "../../constant/polar";

export class SunburstChartSpecTransformer extends BaseChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        const startAngle = isValid(spec.startAngle) ? spec.startAngle : POLAR_START_ANGLE, endAngle = isValid(spec.endAngle) ? spec.endAngle : startAngle + radianToDegree(2 * Math.PI), series = super._getDefaultSeriesSpec(spec, [ "categoryField", "valueField", "centerX", "centerY", "offsetX", "offsetY", "innerRadius", "outerRadius", "gap", "labelLayout", "label", "labelAutoVisible", "drill", "drillField" ]);
        return series.startAngle = startAngle, series.endAngle = endAngle, series;
    }
    transformSpec(spec) {
        super.transformSpec(spec), this.transformSeriesSpec(spec);
    }
}
//# sourceMappingURL=sunburst-transformer.js.map
