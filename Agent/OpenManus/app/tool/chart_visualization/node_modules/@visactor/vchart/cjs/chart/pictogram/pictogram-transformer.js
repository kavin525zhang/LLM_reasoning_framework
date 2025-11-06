"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.PictogramChartSpecTransformer = void 0;

const series_1 = require("../../series"), base_1 = require("../base");

class PictogramChartSpecTransformer extends base_1.BaseChartSpecTransformer {
    _isValidSeries(type) {
        return type === series_1.SeriesTypeEnum.pictogram;
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

exports.PictogramChartSpecTransformer = PictogramChartSpecTransformer;
//# sourceMappingURL=pictogram-transformer.js.map
