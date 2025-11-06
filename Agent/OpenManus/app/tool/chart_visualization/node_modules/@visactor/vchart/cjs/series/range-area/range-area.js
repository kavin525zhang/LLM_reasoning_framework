"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerRangeAreaSeries = exports.RangeAreaSeries = void 0;

const area_1 = require("../area/area"), type_1 = require("../interface/type"), area_2 = require("../../mark/area"), attribute_1 = require("../../constant/attribute"), tooltip_helper_1 = require("./tooltip-helper"), constant_1 = require("./constant"), factory_1 = require("../../core/factory"), cartesian_1 = require("../../component/axis/cartesian");

class RangeAreaSeries extends area_1.AreaSeries {
    constructor() {
        super(...arguments), this.type = type_1.SeriesTypeEnum.rangeArea;
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
        }, "normal", attribute_1.AttributeLevel.Series) : this.setMarkStyle(this._areaMark, {
            y1: datum => {
                if (!this._yAxisHelper) return Number.NaN;
                const {dataToPosition: dataToPosition} = this._yAxisHelper;
                return dataToPosition(this.getDatumPositionValues(datum, this._spec.yField[1]), {
                    bandPosition: this._bandPosition
                });
            }
        }, "normal", attribute_1.AttributeLevel.Series), this.setMarkStyle(areaMark, {
            stroke: !1
        }, "normal", attribute_1.AttributeLevel.Series));
    }
    initTooltip() {
        this._tooltipHelper = new tooltip_helper_1.RangeAreaSeriesTooltipHelper(this);
    }
    _isFieldAllValid() {
        const viewStatistics = this.getViewDataStatistics(), fields = this.fieldY;
        return !!(viewStatistics && viewStatistics.latestData && fields.length) && fields.every((field => viewStatistics.latestData[field] && viewStatistics.latestData[field].allValid));
    }
}

exports.RangeAreaSeries = RangeAreaSeries, RangeAreaSeries.type = type_1.SeriesTypeEnum.rangeArea, 
RangeAreaSeries.mark = constant_1.rangeAreaSeriesMark;

const registerRangeAreaSeries = () => {
    (0, area_2.registerAreaMark)(), (0, cartesian_1.registerCartesianBandAxis)(), (0, 
    cartesian_1.registerCartesianLinearAxis)(), factory_1.Factory.registerSeries(RangeAreaSeries.type, RangeAreaSeries);
};

exports.registerRangeAreaSeries = registerRangeAreaSeries;
//# sourceMappingURL=range-area.js.map
