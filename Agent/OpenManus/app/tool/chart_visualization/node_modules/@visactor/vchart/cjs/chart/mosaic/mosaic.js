"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerMosaicChart = exports.MosaicChart = void 0;

const type_1 = require("../../series/interface/type"), factory_1 = require("../../core/factory"), mosaic_transformer_1 = require("./mosaic-transformer"), base_1 = require("../base"), mosaic_1 = require("../../series/mosaic/mosaic"), stack_1 = require("../stack"), data_1 = require("../../util/data"), stack_split_1 = require("../../data/transforms/stack-split"), register_1 = require("../../data/register");

class MosaicChart extends base_1.BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = mosaic_transformer_1.MosaicChartSpecTransformer, 
        this.type = "mosaic", this.seriesType = type_1.SeriesTypeEnum.mosaic, this.handleAfterStackRegion = (region, stackValueGroup) => {
            region.getSeries().forEach((s => {
                const stackData = s.getStackData(), stackValue = s.getStackValue(), stackValueField = s.getStackValueField();
                stackData && stackValueField && ((0, data_1.stackMosaicTotal)(stackValueGroup[stackValue], stackValueField), 
                (0, data_1.stackMosaic)(s, stackValueGroup[stackValue]));
            }));
        };
    }
    _beforeInit() {
        this._dataSet && (0, register_1.registerDataSetInstanceTransform)(this._dataSet, "stackSplit", stack_split_1.stackSplit);
    }
    _initStack() {
        this._stack = new stack_1.Stack(this, {
            afterStackRegion: this.handleAfterStackRegion
        }), this._stack.init();
    }
}

exports.MosaicChart = MosaicChart, MosaicChart.type = "mosaic", MosaicChart.seriesType = type_1.SeriesTypeEnum.mosaic, 
MosaicChart.transformerConstructor = mosaic_transformer_1.MosaicChartSpecTransformer;

const registerMosaicChart = () => {
    (0, mosaic_1.registerMosaicSeries)(), factory_1.Factory.registerChart(MosaicChart.type, MosaicChart);
};

exports.registerMosaicChart = registerMosaicChart;
//# sourceMappingURL=mosaic.js.map
