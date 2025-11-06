import { SeriesTypeEnum } from "../interface/type";

import { BarSeries } from "./bar";

import { registerRect3dMark } from "../../mark/rect-3d";

import { bar3dSeriesMark } from "./constant";

import { Factory } from "../../core/factory";

import { registerBar3dAnimation } from "./animation";

import { registerCartesianLinearAxis, registerCartesianBandAxis } from "../../component/axis/cartesian";

import { Bar3dSeriesSpecTransformer } from "./bar-3d-transformer";

export class Bar3dSeries extends BarSeries {
    constructor() {
        super(...arguments), this.type = SeriesTypeEnum.bar3d, this._barMarkName = "bar3d", 
        this._barMarkType = "rect3d", this.transformerConstructor = Bar3dSeriesSpecTransformer;
    }
}

Bar3dSeries.type = SeriesTypeEnum.bar3d, Bar3dSeries.mark = bar3dSeriesMark, Bar3dSeries.transformerConstructor = Bar3dSeriesSpecTransformer;

export const registerBar3dSeries = () => {
    registerBar3dAnimation(), registerRect3dMark(), registerCartesianBandAxis(), registerCartesianLinearAxis(), 
    Factory.registerSeries(Bar3dSeries.type, Bar3dSeries);
};
//# sourceMappingURL=bar-3d.js.map
