"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerLineChart = exports.LineChart = void 0;

const type_1 = require("../../series/interface/type"), line_1 = require("../../series/line/line"), factory_1 = require("../../core/factory"), line_transformer_1 = require("./line-transformer"), base_1 = require("../base"), stack_1 = require("../stack"), vutils_1 = require("@visactor/vutils");

class LineChart extends base_1.BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = line_transformer_1.LineChartSpecTransformer, 
        this.type = "line", this.seriesType = type_1.SeriesTypeEnum.line;
    }
}

exports.LineChart = LineChart, LineChart.type = "line", LineChart.seriesType = type_1.SeriesTypeEnum.line, 
LineChart.transformerConstructor = line_transformer_1.LineChartSpecTransformer, 
(0, vutils_1.mixin)(LineChart, stack_1.StackChartMixin);

const registerLineChart = () => {
    (0, line_1.registerLineSeries)(), factory_1.Factory.registerChart(LineChart.type, LineChart);
};

exports.registerLineChart = registerLineChart;
//# sourceMappingURL=line.js.map
