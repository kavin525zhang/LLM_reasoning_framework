import { isNil, precisionSub } from "@visactor/vutils";

import { STACK_FIELD_END, STACK_FIELD_START } from "../../constant/data";

import { waterfall, waterfallFillTotal } from "../../data/transforms/waterfall";

import { BarSeries } from "../bar/bar";

import { isValueInScaleDomain, valueInScaleRange } from "../../util/scale";

import { registerWaterfallAnimation } from "./animation";

import { animationConfig, userAnimationConfig } from "../../animation/utils";

import { SeriesTypeEnum } from "../interface/type";

import { registerFadeInOutAnimation } from "../../animation/config";

import { registerDataSetInstanceTransform } from "../../data/register";

import { SeriesData } from "../base/series-data";

import { dataViewFromDataView } from "../../data/initialize";

import { registerRuleMark } from "../../mark/rule";

import { waterfallSeriesMark } from "./constant";

import { Group } from "../base/group";

import { Factory } from "../../core/factory";

import { registerRectMark } from "../../mark/rect";

import { getGroupAnimationParams } from "../util/utils";

import { WaterfallSeriesSpecTransformer } from "./waterfall-transformer";

import { registerCartesianLinearAxis, registerCartesianBandAxis } from "../../component/axis/cartesian";

import { stackLabel } from "../../component/label/util";

import { WaterfallDefaultSeriesField } from "../../constant/waterfall";

import { PREFIX } from "../../constant/base";

import { AttributeLevel } from "../../constant/attribute";

export const DefaultBandWidth = 6;

export class WaterfallSeries extends BarSeries {
    constructor() {
        super(...arguments), this.type = SeriesTypeEnum.waterfall, this.transformerConstructor = WaterfallSeriesSpecTransformer, 
        this._leaderLineMark = null, this._stackLabelMark = null, this._labelMark = null;
    }
    getTotalData() {
        var _a;
        return null === (_a = this._totalData) || void 0 === _a ? void 0 : _a.getLatestData();
    }
    initGroups() {
        const groupFields = this.getGroupFields();
        groupFields && groupFields.length && (this._groups = new Group(groupFields), this._data && this._groups.initData(this._data.getDataView(), this._dataSet));
    }
    setAttrFromSpec() {
        super.setAttrFromSpec(), this.setValueFieldToStack(), this._fieldX = [ this._fieldX[0] ], 
        this._fieldY = [ this._fieldY[0] ], isNil(this._seriesField) && (this._seriesField = WaterfallDefaultSeriesField);
    }
    getSeriesKeys() {
        return this._seriesField === WaterfallDefaultSeriesField ? [ this._theme.seriesFieldName.increase, this._theme.seriesFieldName.decrease, this._theme.seriesFieldName.total ] : super.getSeriesKeys();
    }
    initData() {
        var _a;
        super.initData(), registerDataSetInstanceTransform(this._dataSet, "waterfallFillTotal", waterfallFillTotal), 
        registerDataSetInstanceTransform(this._dataSet, "waterfall", waterfall), (isNil(this._spec.total) || "end" === this._spec.total.type) && (null === (_a = this._rawData) || void 0 === _a || _a.transform({
            type: "waterfallFillTotal",
            options: {
                indexField: this.getGroupFields()[0],
                valueField: this.getStackValueField(),
                seriesField: this.getSeriesField(),
                seriesFieldName: this._theme.seriesFieldName,
                total: this._spec.total,
                stackInverse: this.getRegion().getStackInverse()
            }
        }, !1));
        const totalData = dataViewFromDataView(this.getViewData(), this._dataSet, {
            name: `${PREFIX}_series_${this.id}_totalData`
        });
        this.getViewData().target.removeListener("change", totalData.reRunAllTransform), 
        this._totalData = new SeriesData(this._option, totalData), totalData.transform({
            type: "waterfall",
            options: {
                indexField: this.getGroupFields()[0],
                valueField: this.getStackValueField(),
                seriesField: this.getSeriesField(),
                seriesFieldName: this._theme.seriesFieldName,
                startAs: STACK_FIELD_START,
                endAs: STACK_FIELD_END,
                total: this._spec.total,
                groupData: () => this.getGroups().groupData,
                stackInverse: this.getRegion().getStackInverse()
            }
        }, !1);
    }
    compileData() {
        var _a;
        super.compileData(), null === (_a = this._totalData) || void 0 === _a || _a.compile();
    }
    initAnimation() {
        var _a, _b, _c, _e;
        const waterfallAnimationParams = {
            yField: "horizontal" === this.direction ? this._fieldY[0] : this.getStackValueField(),
            xField: "horizontal" === this.direction ? this.getStackValueField() : this._fieldX[0],
            direction: this.direction,
            growFrom: () => {
                var _a, _b;
                return "horizontal" === this.direction ? null === (_a = this._xAxisHelper) || void 0 === _a ? void 0 : _a.getScale(0).scale(0) : null === (_b = this._yAxisHelper) || void 0 === _b ? void 0 : _b.getScale(0).scale(0);
            }
        }, appearPreset = null === (_b = null === (_a = this._spec) || void 0 === _a ? void 0 : _a.animationAppear) || void 0 === _b ? void 0 : _b.preset, animationParams = getGroupAnimationParams(this);
        this._barMark.setAnimationConfig(animationConfig(null === (_c = Factory.getAnimationInKey("waterfall")) || void 0 === _c ? void 0 : _c(waterfallAnimationParams, appearPreset), userAnimationConfig("bar", this._spec, this._markAttributeContext), animationParams)), 
        this._leaderLineMark && this._leaderLineMark.setAnimationConfig(animationConfig(null === (_e = Factory.getAnimationInKey("fadeInOut")) || void 0 === _e ? void 0 : _e(), userAnimationConfig("leaderLine", this._spec, this._markAttributeContext)));
    }
    viewDataUpdate(d) {
        this._totalData.getDataView().reRunAllTransform(), this._totalData.updateData(), 
        super.viewDataUpdate(d);
    }
    addViewDataFilter(_option) {}
    reFilterViewData() {}
    onEvaluateEnd(ctx) {
        super.onEvaluateEnd(ctx), this._totalData.updateData();
    }
    initMark() {
        var _a, _b;
        super.initMark();
        const leaderLine = this._createMark(WaterfallSeries.mark.leaderLine, {
            key: "index",
            stateSort: null === (_a = this._spec.leaderLine) || void 0 === _a ? void 0 : _a.stateSort
        }, {
            setCustomizedShape: null === (_b = this._spec.leaderLine) || void 0 === _b ? void 0 : _b.customShape
        });
        leaderLine && (this._leaderLineMark = leaderLine, leaderLine.setDataView(this._totalData.getDataView(), this._totalData.getProductId()));
    }
    initLabelMarkStyle(labelMark) {
        var _a;
        if (labelMark) return !this._labelMark && (null === (_a = this._spec.label) || void 0 === _a ? void 0 : _a.visible) ? (super.initLabelMarkStyle(labelMark), 
        void (this._labelMark = labelMark)) : void 0;
    }
    initStackLabelMarkStyle(labelMark) {
        labelMark && (this._stackLabelMark = labelMark, labelMark.skipEncode = !0, labelMark.setRule("stackLabel"), 
        labelMark.setDataView(this._totalData.getDataView(), this._totalData.getProductId()), 
        this.setMarkStyle(labelMark, {
            text: datum => {
                var _a;
                return "absolute" === (null === (_a = this._spec.stackLabel) || void 0 === _a ? void 0 : _a.valueType) ? datum.end : precisionSub(datum.end, datum.start);
            }
        }));
    }
    initTotalLabelMarkStyle(labelMark) {
        this.setMarkStyle(labelMark, {
            text: datum => {
                var _a;
                return "end" in datum ? "absolute" === (null === (_a = this._spec.totalLabel) || void 0 === _a ? void 0 : _a.valueType) ? datum.end : precisionSub(datum.end, datum.start) : "horizontal" === this.direction ? datum[this._fieldX[0]] : datum[this._fieldY[0]];
            }
        });
    }
    getTotalLabelComponentStyle(info) {
        return stackLabel(Object.assign(Object.assign({}, info), {
            series: this,
            labelSpec: this._spec.totalLabel
        }), (d => {
            const index = "vertical" === this.direction ? d[this._fieldX[0]] : d[this._fieldY[0]];
            return this._totalData.getLatestData().find((_d => _d.index === index));
        }));
    }
    totalPositionX(datum, field, pos = .5) {
        const {dataToPosition: dataToPosition, getBandwidth: getBandwidth} = this._xAxisHelper;
        return "horizontal" === this._direction ? valueInScaleRange(dataToPosition([ datum[field] ], {
            bandPosition: this._bandPosition
        })) : dataToPosition([ datum[field] ], {
            bandPosition: this._bandPosition
        }) + .5 * getBandwidth(0) - this._barMark.getAttribute("width", datum) * (.5 - pos);
    }
    totalPositionY(datum, field, pos = .5) {
        const {dataToPosition: dataToPosition, getBandwidth: getBandwidth} = this._yAxisHelper;
        return "horizontal" === this._direction ? dataToPosition([ datum[field] ], {
            bandPosition: this._bandPosition
        }) + .5 * getBandwidth(0) - this._barMark.getAttribute("height", datum) * (.5 - pos) : valueInScaleRange(dataToPosition([ datum[field] ], {
            bandPosition: this._bandPosition
        }));
    }
    initMarkStyle() {
        super.initMarkStyle(), this._leaderLineMark && ("horizontal" === this._direction ? this.setMarkStyle(this._leaderLineMark, {
            visible: datum => this.isVisibleLeaderLine(datum),
            x: datum => this.totalPositionX(datum, "lastEnd", 0),
            x1: datum => this.totalPositionX(datum, datum.isTotal ? "end" : "start", 0),
            y: datum => datum.lastIndex ? this.totalPositionY(datum, "lastIndex", 1) : 0,
            y1: datum => this.totalPositionY(datum, "index", 0)
        }, "normal", AttributeLevel.Series) : this.setMarkStyle(this._leaderLineMark, {
            visible: datum => this.isVisibleLeaderLine(datum),
            x: datum => datum.lastIndex ? this.totalPositionX(datum, "lastIndex", 1) : 0,
            x1: datum => this.totalPositionX(datum, "index", 0),
            y: datum => this.totalPositionY(datum, "lastEnd", 0),
            y1: datum => this.totalPositionY(datum, datum.isTotal ? "end" : "start", 0)
        }, "normal", AttributeLevel.Series));
    }
    isVisibleLeaderLine(datum) {
        return !isNil(datum.lastIndex) && isValueInScaleDomain([ datum.lastEnd, datum[datum.isTotal ? "end" : "start"] ], "horizontal" === this.direction ? this._xAxisHelper.getScale(0) : this._yAxisHelper.getScale(0));
    }
}

WaterfallSeries.type = SeriesTypeEnum.waterfall, WaterfallSeries.mark = waterfallSeriesMark, 
WaterfallSeries.transformerConstructor = WaterfallSeriesSpecTransformer;

export const registerWaterfallSeries = () => {
    registerRuleMark(), registerRectMark(), registerWaterfallAnimation(), registerFadeInOutAnimation(), 
    registerCartesianBandAxis(), registerCartesianLinearAxis(), Factory.registerSeries(WaterfallSeries.type, WaterfallSeries);
};
//# sourceMappingURL=waterfall.js.map
