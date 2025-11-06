"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerLinearProgressChart = exports.LinearProgressChart = void 0;

const type_1 = require("../../../series/interface/type"), linear_1 = require("../../../series/progress/linear"), factory_1 = require("../../../core/factory"), linear_progress_transformer_1 = require("./linear-progress-transformer"), base_1 = require("../../base"), stack_1 = require("../../stack"), vutils_1 = require("@visactor/vutils");

class LinearProgressChart extends base_1.BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = linear_progress_transformer_1.LinearProgressChartSpecTransformer, 
        this.type = "linearProgress", this.seriesType = type_1.SeriesTypeEnum.linearProgress;
    }
}

exports.LinearProgressChart = LinearProgressChart, LinearProgressChart.type = "linearProgress", 
LinearProgressChart.seriesType = type_1.SeriesTypeEnum.linearProgress, LinearProgressChart.transformerConstructor = linear_progress_transformer_1.LinearProgressChartSpecTransformer, 
(0, vutils_1.mixin)(LinearProgressChart, stack_1.StackChartMixin);

const registerLinearProgressChart = () => {
    (0, linear_1.registerLinearProgressSeries)(), factory_1.Factory.registerChart(LinearProgressChart.type, LinearProgressChart);
};

exports.registerLinearProgressChart = registerLinearProgressChart;
//# sourceMappingURL=linear.js.map
