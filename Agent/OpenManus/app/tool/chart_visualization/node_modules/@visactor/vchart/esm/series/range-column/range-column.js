import { BarSeries } from "../bar/bar";

import { SeriesTypeEnum } from "../interface/type";

import { registerRectMark } from "../../mark/rect";

import { registerTextMark } from "../../mark/text";

import { setRectLabelPos } from "../util/label-mark";

import { animationConfig, shouldMarkDoMorph, userAnimationConfig } from "../../animation/utils";

import { RangeColumnSeriesTooltipHelper } from "./tooltip-helper";

import { registerFadeInOutAnimation } from "../../animation/config";

import { registerRangeColumnAnimation } from "./animation";

import { rangeColumnSeriesMark } from "./constant";

import { Factory } from "../../core/factory";

import { getGroupAnimationParams } from "../util/utils";

import { RangeColumnSeriesSpecTransformer } from "./range-column-transformer";

import { registerCartesianLinearAxis, registerCartesianBandAxis } from "../../component/axis/cartesian";

export const DefaultBandWidth = 6;

export class RangeColumnSeries extends BarSeries {
    constructor() {
        super(...arguments), this.type = SeriesTypeEnum.rangeColumn, this._barMarkType = "rect", 
        this._barName = SeriesTypeEnum.bar, this.transformerConstructor = RangeColumnSeriesSpecTransformer;
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
            morph: shouldMarkDoMorph(this._spec, RangeColumnSeries.mark.bar.name),
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
            setRectLabelPos(this, labelMark, position, offset, (datum => this._barMark.getAttribute("x", datum)), (datum => "vertical" === this._direction ? this._barMark.getAttribute("x", datum) + this._barMark.getAttribute("width", datum) : this._barMark.getAttribute("x1", datum)), (datum => this._barMark.getAttribute("y", datum)), (datum => "vertical" === this._direction ? this._barMark.getAttribute("y1", datum) : this._barMark.getAttribute("y", datum) + this._barMark.getAttribute("height", datum)), (() => this._direction));
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
        const animationParams = getGroupAnimationParams(this), appearPreset = null === (_b = null === (_a = this._spec) || void 0 === _a ? void 0 : _a.animationAppear) || void 0 === _b ? void 0 : _b.preset;
        this._barMark.setAnimationConfig(animationConfig(null === (_c = Factory.getAnimationInKey("rangeColumn")) || void 0 === _c ? void 0 : _c({
            direction: this.direction
        }, appearPreset), userAnimationConfig("bar", this._spec, this._markAttributeContext), animationParams)), 
        this._minLabelMark && this._minLabelMark.setAnimationConfig(animationConfig(null === (_d = Factory.getAnimationInKey("fadeInOut")) || void 0 === _d ? void 0 : _d(), userAnimationConfig("label", this._spec, this._markAttributeContext), animationParams)), 
        this._maxLabelMark && this._maxLabelMark.setAnimationConfig(animationConfig(null === (_e = Factory.getAnimationInKey("fadeInOut")) || void 0 === _e ? void 0 : _e(), userAnimationConfig("label", this._spec, this._markAttributeContext), animationParams));
    }
    initTooltip() {
        this._tooltipHelper = new RangeColumnSeriesTooltipHelper(this), this._barMark && this._tooltipHelper.activeTriggerSet.mark.add(this._barMark), 
        this._minLabelMark && this._tooltipHelper.ignoreTriggerSet.mark.add(this._minLabelMark), 
        this._maxLabelMark && this._tooltipHelper.ignoreTriggerSet.mark.add(this._maxLabelMark), 
        this._labelMark && this._tooltipHelper.ignoreTriggerSet.mark.add(this._labelMark);
    }
}

RangeColumnSeries.type = SeriesTypeEnum.rangeColumn, RangeColumnSeries.mark = rangeColumnSeriesMark, 
RangeColumnSeries.transformerConstructor = RangeColumnSeriesSpecTransformer;

export const registerRangeColumnSeries = () => {
    registerRectMark(), registerTextMark(), registerRangeColumnAnimation(), registerFadeInOutAnimation(), 
    registerCartesianBandAxis(), registerCartesianLinearAxis(), Factory.registerSeries(RangeColumnSeries.type, RangeColumnSeries);
};
//# sourceMappingURL=range-column.js.map
