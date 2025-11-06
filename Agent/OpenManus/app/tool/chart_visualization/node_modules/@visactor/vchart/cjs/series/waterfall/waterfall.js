"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerWaterfallSeries = exports.WaterfallSeries = exports.DefaultBandWidth = void 0;

const vutils_1 = require("@visactor/vutils"), data_1 = require("../../constant/data"), waterfall_1 = require("../../data/transforms/waterfall"), bar_1 = require("../bar/bar"), scale_1 = require("../../util/scale"), animation_1 = require("./animation"), utils_1 = require("../../animation/utils"), type_1 = require("../interface/type"), config_1 = require("../../animation/config"), register_1 = require("../../data/register"), series_data_1 = require("../base/series-data"), initialize_1 = require("../../data/initialize"), rule_1 = require("../../mark/rule"), constant_1 = require("./constant"), group_1 = require("../base/group"), factory_1 = require("../../core/factory"), rect_1 = require("../../mark/rect"), utils_2 = require("../util/utils"), waterfall_transformer_1 = require("./waterfall-transformer"), cartesian_1 = require("../../component/axis/cartesian"), util_1 = require("../../component/label/util"), waterfall_2 = require("../../constant/waterfall"), base_1 = require("../../constant/base"), attribute_1 = require("../../constant/attribute");

exports.DefaultBandWidth = 6;

class WaterfallSeries extends bar_1.BarSeries {
    constructor() {
        super(...arguments), this.type = type_1.SeriesTypeEnum.waterfall, this.transformerConstructor = waterfall_transformer_1.WaterfallSeriesSpecTransformer, 
        this._leaderLineMark = null, this._stackLabelMark = null, this._labelMark = null;
    }
    getTotalData() {
        var _a;
        return null === (_a = this._totalData) || void 0 === _a ? void 0 : _a.getLatestData();
    }
    initGroups() {
        const groupFields = this.getGroupFields();
        groupFields && groupFields.length && (this._groups = new group_1.Group(groupFields), 
        this._data && this._groups.initData(this._data.getDataView(), this._dataSet));
    }
    setAttrFromSpec() {
        super.setAttrFromSpec(), this.setValueFieldToStack(), this._fieldX = [ this._fieldX[0] ], 
        this._fieldY = [ this._fieldY[0] ], (0, vutils_1.isNil)(this._seriesField) && (this._seriesField = waterfall_2.WaterfallDefaultSeriesField);
    }
    getSeriesKeys() {
        return this._seriesField === waterfall_2.WaterfallDefaultSeriesField ? [ this._theme.seriesFieldName.increase, this._theme.seriesFieldName.decrease, this._theme.seriesFieldName.total ] : super.getSeriesKeys();
    }
    initData() {
        var _a;
        super.initData(), (0, register_1.registerDataSetInstanceTransform)(this._dataSet, "waterfallFillTotal", waterfall_1.waterfallFillTotal), 
        (0, register_1.registerDataSetInstanceTransform)(this._dataSet, "waterfall", waterfall_1.waterfall), 
        ((0, vutils_1.isNil)(this._spec.total) || "end" === this._spec.total.type) && (null === (_a = this._rawData) || void 0 === _a || _a.transform({
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
        const totalData = (0, initialize_1.dataViewFromDataView)(this.getViewData(), this._dataSet, {
            name: `${base_1.PREFIX}_series_${this.id}_totalData`
        });
        this.getViewData().target.removeListener("change", totalData.reRunAllTransform), 
        this._totalData = new series_data_1.SeriesData(this._option, totalData), totalData.transform({
            type: "waterfall",
            options: {
                indexField: this.getGroupFields()[0],
                valueField: this.getStackValueField(),
                seriesField: this.getSeriesField(),
                seriesFieldName: this._theme.seriesFieldName,
                startAs: data_1.STACK_FIELD_START,
                endAs: data_1.STACK_FIELD_END,
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
        }, appearPreset = null === (_b = null === (_a = this._spec) || void 0 === _a ? void 0 : _a.animationAppear) || void 0 === _b ? void 0 : _b.preset, animationParams = (0, 
        utils_2.getGroupAnimationParams)(this);
        this._barMark.setAnimationConfig((0, utils_1.animationConfig)(null === (_c = factory_1.Factory.getAnimationInKey("waterfall")) || void 0 === _c ? void 0 : _c(waterfallAnimationParams, appearPreset), (0, 
        utils_1.userAnimationConfig)("bar", this._spec, this._markAttributeContext), animationParams)), 
        this._leaderLineMark && this._leaderLineMark.setAnimationConfig((0, utils_1.animationConfig)(null === (_e = factory_1.Factory.getAnimationInKey("fadeInOut")) || void 0 === _e ? void 0 : _e(), (0, 
        utils_1.userAnimationConfig)("leaderLine", this._spec, this._markAttributeContext)));
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
                return "absolute" === (null === (_a = this._spec.stackLabel) || void 0 === _a ? void 0 : _a.valueType) ? datum.end : (0, 
                vutils_1.precisionSub)(datum.end, datum.start);
            }
        }));
    }
    initTotalLabelMarkStyle(labelMark) {
        this.setMarkStyle(labelMark, {
            text: datum => {
                var _a;
                return "end" in datum ? "absolute" === (null === (_a = this._spec.totalLabel) || void 0 === _a ? void 0 : _a.valueType) ? datum.end : (0, 
                vutils_1.precisionSub)(datum.end, datum.start) : "horizontal" === this.direction ? datum[this._fieldX[0]] : datum[this._fieldY[0]];
            }
        });
    }
    getTotalLabelComponentStyle(info) {
        return (0, util_1.stackLabel)(Object.assign(Object.assign({}, info), {
            series: this,
            labelSpec: this._spec.totalLabel
        }), (d => {
            const index = "vertical" === this.direction ? d[this._fieldX[0]] : d[this._fieldY[0]];
            return this._totalData.getLatestData().find((_d => _d.index === index));
        }));
    }
    totalPositionX(datum, field, pos = .5) {
        const {dataToPosition: dataToPosition, getBandwidth: getBandwidth} = this._xAxisHelper;
        return "horizontal" === this._direction ? (0, scale_1.valueInScaleRange)(dataToPosition([ datum[field] ], {
            bandPosition: this._bandPosition
        })) : dataToPosition([ datum[field] ], {
            bandPosition: this._bandPosition
        }) + .5 * getBandwidth(0) - this._barMark.getAttribute("width", datum) * (.5 - pos);
    }
    totalPositionY(datum, field, pos = .5) {
        const {dataToPosition: dataToPosition, getBandwidth: getBandwidth} = this._yAxisHelper;
        return "horizontal" === this._direction ? dataToPosition([ datum[field] ], {
            bandPosition: this._bandPosition
        }) + .5 * getBandwidth(0) - this._barMark.getAttribute("height", datum) * (.5 - pos) : (0, 
        scale_1.valueInScaleRange)(dataToPosition([ datum[field] ], {
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
        }, "normal", attribute_1.AttributeLevel.Series) : this.setMarkStyle(this._leaderLineMark, {
            visible: datum => this.isVisibleLeaderLine(datum),
            x: datum => datum.lastIndex ? this.totalPositionX(datum, "lastIndex", 1) : 0,
            x1: datum => this.totalPositionX(datum, "index", 0),
            y: datum => this.totalPositionY(datum, "lastEnd", 0),
            y1: datum => this.totalPositionY(datum, datum.isTotal ? "end" : "start", 0)
        }, "normal", attribute_1.AttributeLevel.Series));
    }
    isVisibleLeaderLine(datum) {
        return !(0, vutils_1.isNil)(datum.lastIndex) && (0, scale_1.isValueInScaleDomain)([ datum.lastEnd, datum[datum.isTotal ? "end" : "start"] ], "horizontal" === this.direction ? this._xAxisHelper.getScale(0) : this._yAxisHelper.getScale(0));
    }
}

exports.WaterfallSeries = WaterfallSeries, WaterfallSeries.type = type_1.SeriesTypeEnum.waterfall, 
WaterfallSeries.mark = constant_1.waterfallSeriesMark, WaterfallSeries.transformerConstructor = waterfall_transformer_1.WaterfallSeriesSpecTransformer;

const registerWaterfallSeries = () => {
    (0, rule_1.registerRuleMark)(), (0, rect_1.registerRectMark)(), (0, animation_1.registerWaterfallAnimation)(), 
    (0, config_1.registerFadeInOutAnimation)(), (0, cartesian_1.registerCartesianBandAxis)(), 
    (0, cartesian_1.registerCartesianLinearAxis)(), factory_1.Factory.registerSeries(WaterfallSeries.type, WaterfallSeries);
};

exports.registerWaterfallSeries = registerWaterfallSeries;
//# sourceMappingURL=waterfall.js.map
