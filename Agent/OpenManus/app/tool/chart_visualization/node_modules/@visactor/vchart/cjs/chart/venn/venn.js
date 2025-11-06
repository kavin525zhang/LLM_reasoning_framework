"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerVennChart = exports.VennChart = void 0;

const type_1 = require("../../series/interface/type"), base_chart_1 = require("../base/base-chart"), venn_1 = require("../../series/venn/venn"), factory_1 = require("../../core/factory"), venn_transformer_1 = require("./venn-transformer");

class VennChart extends base_chart_1.BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = venn_transformer_1.VennChartSpecTransformer, 
        this.type = "venn", this.seriesType = type_1.SeriesTypeEnum.venn;
    }
}

exports.VennChart = VennChart, VennChart.type = "venn", VennChart.seriesType = type_1.SeriesTypeEnum.venn, 
VennChart.transformerConstructor = venn_transformer_1.VennChartSpecTransformer;

const registerVennChart = () => {
    (0, venn_1.registerVennSeries)(), factory_1.Factory.registerChart(VennChart.type, VennChart);
};

exports.registerVennChart = registerVennChart;
//# sourceMappingURL=venn.js.map
