import { AreaSeries } from "../area/area";

import { SeriesTypeEnum } from "../interface/type";

import { registerAreaMark } from "../../mark/area";

import { AttributeLevel } from "../../constant/attribute";

import { RangeAreaSeriesTooltipHelper } from "./tooltip-helper";

import { rangeAreaSeriesMark } from "./constant";

import { Factory } from "../../core/factory";

import { registerCartesianLinearAxis, registerCartesianBandAxis } from "../../component/axis/cartesian";

export class RangeAreaSeries extends AreaSeries {
    constructor() {
        super(...arguments), this.type = SeriesTypeEnum.rangeArea;
    }
    initMark() {
        var _a;
        const {customShape: customShape, stateSort: stateSort} = null !== (_a = this._spec.area) && void 0 !== _a ? _a : {};
        this._areaMark = this._createMark(RangeAreaSeries.mark.area, {
            groupKey: this._seriesField,
            isSeriesMark: !0,
            stateSort: stateSort
        }, {
            setCustomizedShape: customShape,
            morphElementKey: this.getDimensionField()[0]
        });
    }
    initMarkStyle() {
        this.initAreaMarkStyle();
    }
    initAreaMarkStyle() {
        const areaMark = this._areaMark;
        areaMark && (super.initAreaMarkStyle(), "horizontal" === this._direction ? this.setMarkStyle(this._areaMark, {
            x1: datum => {
                if (!this._xAxisHelper) return Number.NaN;
                const {dataToPosition: dataToPosition} = this._xAxisHelper;
                return dataToPosition(this.getDatumPositionValues(datum, this._spec.xField[1]), {
                    bandPosition: this._bandPosition
                });
            }
        }, "normal", AttributeLevel.Series) : this.setMarkStyle(this._areaMark, {
            y1: datum => {
                if (!this._yAxisHelper) return Number.NaN;
                const {dataToPosition: dataToPosition} = this._yAxisHelper;
                return dataToPosition(this.getDatumPositionValues(datum, this._spec.yField[1]), {
                    bandPosition: this._bandPosition
                });
            }
        }, "normal", AttributeLevel.Series), this.setMarkStyle(areaMark, {
            stroke: !1
        }, "normal", AttributeLevel.Series));
    }
    initTooltip() {
        this._tooltipHelper = new RangeAreaSeriesTooltipHelper(this);
    }
    _isFieldAllValid() {
        const viewStatistics = this.getViewDataStatistics(), fields = this.fieldY;
        return !!(viewStatistics && viewStatistics.latestData && fields.length) && fields.every((field => viewStatistics.latestData[field] && viewStatistics.latestData[field].allValid));
    }
}

RangeAreaSeries.type = SeriesTypeEnum.rangeArea, RangeAreaSeries.mark = rangeAreaSeriesMark;

export const registerRangeAreaSeries = () => {
    registerAreaMark(), registerCartesianBandAxis(), registerCartesianLinearAxis(), 
    Factory.registerSeries(RangeAreaSeries.type, RangeAreaSeries);
};
//# sourceMappingURL=range-area.js.map
