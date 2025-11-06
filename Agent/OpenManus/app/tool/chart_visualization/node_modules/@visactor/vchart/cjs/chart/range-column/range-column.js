"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerRangeColumnChart = exports.RangeColumnChart = void 0;

const type_1 = require("../../series/interface/type"), factory_1 = require("../../core/factory"), range_column_1 = require("../../series/range-column/range-column"), range_column_transformer_1 = require("./range-column-transformer"), base_1 = require("../base");

class RangeColumnChart extends base_1.BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = range_column_transformer_1.RangeColumnChartSpecTransformer, 
        this.type = "rangeColumn", this.seriesType = type_1.SeriesTypeEnum.rangeColumn;
    }
}

exports.RangeColumnChart = RangeColumnChart, RangeColumnChart.type = "rangeColumn", 
RangeColumnChart.seriesType = type_1.SeriesTypeEnum.rangeColumn, RangeColumnChart.transformerConstructor = range_column_transformer_1.RangeColumnChartSpecTransformer;

const registerRangeColumnChart = () => {
    (0, range_column_1.registerRangeColumnSeries)(), factory_1.Factory.registerChart(RangeColumnChart.type, RangeColumnChart);
};

exports.registerRangeColumnChart = registerRangeColumnChart;
//# sourceMappingURL=range-column.js.map
