import { CartesianChartSpecTransformer } from "../cartesian";

export class ScatterChartSpecTransformer extends CartesianChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        return super._getDefaultSeriesSpec(spec, [ "point", "size", "shape", "shapeField", "sizeField" ]);
    }
}
//# sourceMappingURL=scatter-transformer.js.map
