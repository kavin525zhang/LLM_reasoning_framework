"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.BaseWordCloudChartSpecTransformer = void 0;

const base_1 = require("../../base");

class BaseWordCloudChartSpecTransformer extends base_1.BaseChartSpecTransformer {
    transformSpec(spec) {
        super.transformSpec(spec), this.transformSeriesSpec(spec);
    }
    _getDefaultSeriesSpec(spec) {
        return super._getDefaultSeriesSpec(spec, [ "nameField", "valueField", "fontFamilyField", "fontWeightField", "fontStyleField", "colorHexField", "colorMode", "colorList", "rotateAngles", "fontWeightRange", "fontSizeRange", "maskShape", "keepAspect", "random", "wordCloudConfig", "wordCloudShapeConfig", "word", "fillingWord", "wordMask" ]);
    }
}

exports.BaseWordCloudChartSpecTransformer = BaseWordCloudChartSpecTransformer;
//# sourceMappingURL=word-cloud-base-transformer.js.map
