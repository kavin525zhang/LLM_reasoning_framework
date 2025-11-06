"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.BoxPlotChartSpecTransformer = void 0;

const cartesian_1 = require("../cartesian"), util_1 = require("../util");

class BoxPlotChartSpecTransformer extends cartesian_1.CartesianChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        var _a;
        const dataFields = [ spec.maxField, spec.medianField, spec.q1Field, spec.q3Field, spec.minField, spec.outliersField ], seriesSpec = super._getDefaultSeriesSpec(spec, [ "boxPlot", "minField", "maxField", "q1Field", "medianField", "q3Field", "outliersField", "outliersStyle" ]);
        return seriesSpec.direction = null !== (_a = spec.direction) && void 0 !== _a ? _a : "vertical", 
        seriesSpec["horizontal" === seriesSpec.direction ? "xField" : "yField"] = dataFields, 
        seriesSpec;
    }
    transformSpec(spec) {
        super.transformSpec(spec), spec.axes || (spec.axes = [ {
            orient: "bottom"
        }, {
            orient: "left"
        } ]), (0, util_1.setDefaultCrosshairForCartesianChart)(spec);
    }
}

exports.BoxPlotChartSpecTransformer = BoxPlotChartSpecTransformer;
//# sourceMappingURL=box-plot-transformer.js.map
