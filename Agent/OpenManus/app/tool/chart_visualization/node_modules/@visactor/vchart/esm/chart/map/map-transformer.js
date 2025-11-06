import { SeriesTypeEnum } from "../../series";

import { BaseChartSpecTransformer } from "../base";

export class MapChartSpecTransformer extends BaseChartSpecTransformer {
    _isValidSeries(type) {
        return type === SeriesTypeEnum.map;
    }
    _getDefaultSeriesSpec(spec) {
        return super._getDefaultSeriesSpec(spec, [ "type", "nameField", "valueField", "map", "nameProperty", "centroidProperty", "nameMap", "area", "defaultFillColor", "showDefaultName" ]);
    }
    transformSpec(spec) {
        super.transformSpec(spec), spec.region.forEach((r => {
            r.coordinate = "geo";
        })), super.transformSeriesSpec(spec);
    }
}
//# sourceMappingURL=map-transformer.js.map
