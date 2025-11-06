"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerRangeColumnSeries = exports.RangeColumnSeries = exports.DefaultBandWidth = void 0;

const bar_1 = require("../bar/bar"), type_1 = require("../interface/type"), rect_1 = require("../../mark/rect"), text_1 = require("../../mark/text"), label_mark_1 = require("../util/label-mark"), utils_1 = require("../../animation/utils"), tooltip_helper_1 = require("./tooltip-helper"), config_1 = require("../../animation/config"), animation_1 = require("./animation"), constant_1 = require("./constant"), factory_1 = require("../../core/factory"), utils_2 = require("../util/utils"), range_column_transformer_1 = require("./range-column-transformer"), cartesian_1 = require("../../component/axis/cartesian");

exports.DefaultBandWidth = 6;

class RangeColumnSeries extends bar_1.BarSeries {
    constructor() {
        super(...arguments), this.type = type_1.SeriesTypeEnum.rangeColumn, this._barMarkType = "rect", 
        this._barName = type_1.SeriesTypeEnum.bar, this.transformerConstructor = range_column_transformer_1.RangeColumnSeriesSpecTransformer;
    }
    initMark() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        this._initBarBackgroundMark();
        const labelPosition = null === (_a = this._spec.label) || void 0 === _a ? void 0 : _a.position;
        this._barMark = this._createMark(RangeColumnSeries.mark.bar, {
            groupKey: this._seriesField,
            isSeriesMark: !0,
            stateSort: null === (_b = this._spec.bar) || void 0 === _b ? void 0 : _b.stateSort
        }, {
            setCustomizedShape: null === (_c = this._spec.bar) || void 0 === _c ? void 0 : _c.customShape,
            morph: (0, utils_1.shouldMarkDoMorph)(this._spec, RangeColumnSeries.mark.bar.name),
            morphElementKey: this.getDimensionField()[0]
        }), !1 !== (null === (_d = this._spec.label) || void 0 === _d ? void 0 : _d.visible) && "bothEnd" === labelPosition && (!1 !== (null === (_f = null === (_e = this._spec.label) || void 0 === _e ? void 0 : _e.minLabel) || void 0 === _f ? void 0 : _f.visible) && (this._minLabelMark = this._createMark(RangeColumnSeries.mark.minLabel, {
            markSpec: null === (_g = this._spec.label) || void 0 === _g ? void 0 : _g.minLabel
        })), !1 !== (null === (_j = null === (_h = this._spec.label) || void 0 === _h ? void 0 : _h.maxLabel) || void 0 === _j ? void 0 : _j.visible) && (this._maxLabelMark = this._createMark(RangeColumnSeries.mark.maxLabel, {
            markSpec: null === (_k = this._spec.label) || void 0 === _k ? void 0 : _k.maxLabel
        })));
    }
    initMarkStyle() {
        var _a, _b;
        super.initMarkStyle(), this._initLabelMarkPos(this._minLabelMark, null === (_a = this._spec.label) || void 0 === _a ? void 0 : _a.minLabel, 0, "end"), 
        this._initLabelMarkPos(this._maxLabelMark, null === (_b = this._spec.label) || void 0 === _b ? void 0 : _b.maxLabel, 1, "start");
    }
    _initLabelMarkPos(labelMark, labelSpec, fieldIndex, defaultPosition) {
        var _a, _b, _c, _d;
        if (labelMark) {
            this.setMarkStyle(labelMark, {
                fill: null !== (_b = null === (_a = null == labelSpec ? void 0 : labelSpec.style) || void 0 === _a ? void 0 : _a.fill) && void 0 !== _b ? _b : this.getColorAttribute(),
                text: datum => {
                    const val = "horizontal" === this._spec.direction ? datum[this._spec.xField[fieldIndex]] : datum[this._spec.yField[fieldIndex]];
                    return (null == labelSpec ? void 0 : labelSpec.formatMethod) ? labelSpec.formatMethod(val, datum) : val;
                }
            });
            const position = null !== (_c = null == labelSpec ? void 0 : labelSpec.position) && void 0 !== _c ? _c : defaultPosition, offset = null !== (_d = null == labelSpec ? void 0 : labelSpec.offset) && void 0 !== _d ? _d : "vertical" === this._direction ? -20 : -25;
            (0, label_mark_1.setRectLabelPos)(this, labelMark, position, offset, (datum => this._barMark.getAttribute("x", datum)), (datum => "vertical" === this._direction ? this._barMark.getAttribute("x", datum) + this._barMark.getAttribute("width", datum) : this._barMark.getAttribute("x1", datum)), (datum => this._barMark.getAttribute("y", datum)), (datum => "vertical" === this._direction ? this._barMark.getAttribute("y1", datum) : this._barMark.getAttribute("y", datum) + this._barMark.getAttribute("height", datum)), (() => this._direction));
        }
    }
    initLabelMarkStyle(labelMark) {
        labelMark && (this.setMarkStyle(labelMark, {
            text: datum => {
                let min, max;
                return "horizontal" === this._spec.direction ? (min = datum[this._spec.xField[0]], 
                max = datum[this._spec.xField[1]]) : (min = datum[this._spec.yField[0]], max = datum[this._spec.yField[1]]), 
                min + "-" + max;
            },
            z: this._fieldZ ? this.dataToPositionZ.bind(this) : null
        }), this._labelMark = labelMark);
    }
    _dataToPosX(datum) {
        return this._xAxisHelper.dataToPosition(this.getDatumPositionValues(datum, this._spec.xField[0]), {
            bandPosition: this._bandPosition
        });
    }
    _dataToPosX1(datum) {
        return this._xAxisHelper.dataToPosition(this.getDatumPositionValues(datum, this._spec.xField[1]), {
            bandPosition: this._bandPosition
        });
    }
    _dataToPosY(datum) {
        return this._yAxisHelper.dataToPosition(this.getDatumPositionValues(datum, this._spec.yField[0]), {
            bandPosition: this._bandPosition
        });
    }
    _dataToPosY1(datum) {
        return this._yAxisHelper.dataToPosition(this.getDatumPositionValues(datum, this._spec.yField[1]), {
            bandPosition: this._bandPosition
        });
    }
    initAnimation() {
        var _a, _b, _c, _d, _e;
        const animationParams = (0, utils_2.getGroupAnimationParams)(this), appearPreset = null === (_b = null === (_a = this._spec) || void 0 === _a ? void 0 : _a.animationAppear) || void 0 === _b ? void 0 : _b.preset;
        this._barMark.setAnimationConfig((0, utils_1.animationConfig)(null === (_c = factory_1.Factory.getAnimationInKey("rangeColumn")) || void 0 === _c ? void 0 : _c({
            direction: this.direction
        }, appearPreset), (0, utils_1.userAnimationConfig)("bar", this._spec, this._markAttributeContext), animationParams)), 
        this._minLabelMark && this._minLabelMark.setAnimationConfig((0, utils_1.animationConfig)(null === (_d = factory_1.Factory.getAnimationInKey("fadeInOut")) || void 0 === _d ? void 0 : _d(), (0, 
        utils_1.userAnimationConfig)("label", this._spec, this._markAttributeContext), animationParams)), 
        this._maxLabelMark && this._maxLabelMark.setAnimationConfig((0, utils_1.animationConfig)(null === (_e = factory_1.Factory.getAnimationInKey("fadeInOut")) || void 0 === _e ? void 0 : _e(), (0, 
        utils_1.userAnimationConfig)("label", this._spec, this._markAttributeContext), animationParams));
    }
    initTooltip() {
        this._tooltipHelper = new tooltip_helper_1.RangeColumnSeriesTooltipHelper(this), 
        this._barMark && this._tooltipHelper.activeTriggerSet.mark.add(this._barMark), this._minLabelMark && this._tooltipHelper.ignoreTriggerSet.mark.add(this._minLabelMark), 
        this._maxLabelMark && this._tooltipHelper.ignoreTriggerSet.mark.add(this._maxLabelMark), 
        this._labelMark && this._tooltipHelper.ignoreTriggerSet.mark.add(this._labelMark);
    }
}

exports.RangeColumnSeries = RangeColumnSeries, RangeColumnSeries.type = type_1.SeriesTypeEnum.rangeColumn, 
RangeColumnSeries.mark = constant_1.rangeColumnSeriesMark, RangeColumnSeries.transformerConstructor = range_column_transformer_1.RangeColumnSeriesSpecTransformer;

const registerRangeColumnSeries = () => {
    (0, rect_1.registerRectMark)(), (0, text_1.registerTextMark)(), (0, animation_1.registerRangeColumnAnimation)(), 
    (0, config_1.registerFadeInOutAnimation)(), (0, cartesian_1.registerCartesianBandAxis)(), 
    (0, cartesian_1.registerCartesianLinearAxis)(), factory_1.Factory.registerSeries(RangeColumnSeries.type, RangeColumnSeries);
};

exports.registerRangeColumnSeries = registerRangeColumnSeries;
//# sourceMappingURL=range-column.js.map
