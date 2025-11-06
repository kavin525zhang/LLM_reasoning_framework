"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.BaseHistogramChart = void 0;

const vutils_1 = require("@visactor/vutils"), base_1 = require("../../base"), stack_1 = require("../../stack"), histogram_base_transformer_1 = require("./histogram-base-transformer");

class BaseHistogramChart extends base_1.BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = histogram_base_transformer_1.BaseHistogramChartSpecTransformer;
    }
}

exports.BaseHistogramChart = BaseHistogramChart, BaseHistogramChart.transformerConstructor = histogram_base_transformer_1.BaseHistogramChartSpecTransformer, 
(0, vutils_1.mixin)(BaseHistogramChart, stack_1.StackChartMixin);
//# sourceMappingURL=base.js.map
