"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerCircularProgressChart = exports.CircularProgressChart = void 0;

const type_1 = require("../../../series/interface/type"), circular_1 = require("../../../series/progress/circular"), factory_1 = require("../../../core/factory"), circular_progress_transformer_1 = require("./circular-progress-transformer"), base_1 = require("../../base"), stack_1 = require("../../stack"), vutils_1 = require("@visactor/vutils");

class CircularProgressChart extends base_1.BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = circular_progress_transformer_1.CircularProgressChartSpecTransformer, 
        this.type = "circularProgress", this.seriesType = type_1.SeriesTypeEnum.circularProgress;
    }
}

exports.CircularProgressChart = CircularProgressChart, CircularProgressChart.type = "circularProgress", 
CircularProgressChart.seriesType = type_1.SeriesTypeEnum.circularProgress, CircularProgressChart.transformerConstructor = circular_progress_transformer_1.CircularProgressChartSpecTransformer, 
(0, vutils_1.mixin)(CircularProgressChart, stack_1.StackChartMixin);

const registerCircularProgressChart = () => {
    (0, circular_1.registerCircularProgressSeries)(), factory_1.Factory.registerChart(CircularProgressChart.type, CircularProgressChart);
};

exports.registerCircularProgressChart = registerCircularProgressChart;
//# sourceMappingURL=circular.js.map
