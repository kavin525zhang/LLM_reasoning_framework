"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.MapChartSpecTransformer = void 0;

const series_1 = require("../../series"), base_1 = require("../base");

class MapChartSpecTransformer extends base_1.BaseChartSpecTransformer {
    _isValidSeries(type) {
        return type === series_1.SeriesTypeEnum.map;
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

exports.MapChartSpecTransformer = MapChartSpecTransformer;
//# sourceMappingURL=map-transformer.js.map
