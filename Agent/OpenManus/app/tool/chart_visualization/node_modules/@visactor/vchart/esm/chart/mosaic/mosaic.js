import { SeriesTypeEnum } from "../../series/interface/type";

import { Factory } from "../../core/factory";

import { MosaicChartSpecTransformer } from "./mosaic-transformer";

import { BaseChart } from "../base";

import { registerMosaicSeries } from "../../series/mosaic/mosaic";

import { Stack } from "../stack";

import { stackMosaic, stackMosaicTotal } from "../../util/data";

import { stackSplit } from "../../data/transforms/stack-split";

import { registerDataSetInstanceTransform } from "../../data/register";

export class MosaicChart extends BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = MosaicChartSpecTransformer, this.type = "mosaic", 
        this.seriesType = SeriesTypeEnum.mosaic, this.handleAfterStackRegion = (region, stackValueGroup) => {
            region.getSeries().forEach((s => {
                const stackData = s.getStackData(), stackValue = s.getStackValue(), stackValueField = s.getStackValueField();
                stackData && stackValueField && (stackMosaicTotal(stackValueGroup[stackValue], stackValueField), 
                stackMosaic(s, stackValueGroup[stackValue]));
            }));
        };
    }
    _beforeInit() {
        this._dataSet && registerDataSetInstanceTransform(this._dataSet, "stackSplit", stackSplit);
    }
    _initStack() {
        this._stack = new Stack(this, {
            afterStackRegion: this.handleAfterStackRegion
        }), this._stack.init();
    }
}

MosaicChart.type = "mosaic", MosaicChart.seriesType = SeriesTypeEnum.mosaic, MosaicChart.transformerConstructor = MosaicChartSpecTransformer;

export const registerMosaicChart = () => {
    registerMosaicSeries(), Factory.registerChart(MosaicChart.type, MosaicChart);
};
//# sourceMappingURL=mosaic.js.map
