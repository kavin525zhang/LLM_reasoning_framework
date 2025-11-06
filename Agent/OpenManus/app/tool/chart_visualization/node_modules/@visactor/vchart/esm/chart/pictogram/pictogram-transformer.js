import { SeriesTypeEnum } from "../../series";

import { BaseChartSpecTransformer } from "../base";

export class PictogramChartSpecTransformer extends BaseChartSpecTransformer {
    _isValidSeries(type) {
        return type === SeriesTypeEnum.pictogram;
    }
    _getDefaultSeriesSpec(spec) {
        return super._getDefaultSeriesSpec(spec, [ "type", "nameField", "valueField", "svg", "pictogram", "defaultFillColor" ]);
    }
    transformSpec(spec) {
        super.transformSpec(spec), spec.region.forEach((r => {
            r.coordinate = "geo";
        })), super.transformSeriesSpec(spec);
    }
}
//# sourceMappingURL=pictogram-transformer.js.map
