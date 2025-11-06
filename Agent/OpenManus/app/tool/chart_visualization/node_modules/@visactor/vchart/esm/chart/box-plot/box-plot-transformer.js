import { CartesianChartSpecTransformer } from "../cartesian";

import { setDefaultCrosshairForCartesianChart } from "../util";

export class BoxPlotChartSpecTransformer extends CartesianChartSpecTransformer {
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
        } ]), setDefaultCrosshairForCartesianChart(spec);
    }
}
//# sourceMappingURL=box-plot-transformer.js.map
