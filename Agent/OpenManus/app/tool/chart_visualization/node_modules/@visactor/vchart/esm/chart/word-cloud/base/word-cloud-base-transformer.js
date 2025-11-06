import { BaseChartSpecTransformer } from "../../base";

export class BaseWordCloudChartSpecTransformer extends BaseChartSpecTransformer {
    transformSpec(spec) {
        super.transformSpec(spec), this.transformSeriesSpec(spec);
    }
    _getDefaultSeriesSpec(spec) {
        return super._getDefaultSeriesSpec(spec, [ "nameField", "valueField", "fontFamilyField", "fontWeightField", "fontStyleField", "colorHexField", "colorMode", "colorList", "rotateAngles", "fontWeightRange", "fontSizeRange", "maskShape", "keepAspect", "random", "wordCloudConfig", "wordCloudShapeConfig", "word", "fillingWord", "wordMask" ]);
    }
}
//# sourceMappingURL=word-cloud-base-transformer.js.map
