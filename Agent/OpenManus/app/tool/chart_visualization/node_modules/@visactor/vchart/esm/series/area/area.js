import { isArray } from "@visactor/vutils";

import { LineLikeSeriesMixin } from "../mixin/line-mixin";

import { CartesianSeries } from "../cartesian/cartesian";

import { AttributeLevel } from "../../constant/attribute";

import { valueInScaleRange } from "../../util/scale";

import { SeriesTypeEnum } from "../interface/type";

import { mixin } from "@visactor/vutils";

import { animationConfig, userAnimationConfig } from "../../animation/utils";

import { DEFAULT_SMOOTH_INTERPOLATE } from "../../typings/interpolate";

import { registerLineMark } from "../../mark/line";

import { registerAreaMark } from "../../mark/area";

import { registerSymbolMark } from "../../mark/symbol";

import { AreaSeriesTooltipHelper } from "./tooltip-helpter";

import { areaSeriesMark } from "./constant";

import { Factory } from "../../core/factory";

import { registerAreaSeriesAnimation } from "./animation";

import { registerSampleTransform, registerMarkOverlapTransform } from "@visactor/vgrammar-core";

import { AreaSeriesSpecTransformer } from "./area-transformer";

import { getGroupAnimationParams } from "../util/utils";

import { registerCartesianLinearAxis, registerCartesianBandAxis } from "../../component/axis/cartesian";

import { STACK_FIELD_END } from "../../constant/data";

export class AreaSeries extends CartesianSeries {
    constructor() {
        super(...arguments), this.type = SeriesTypeEnum.area, this.transformerConstructor = AreaSeriesSpecTransformer, 
        this._sortDataByAxis = !1;
    }
    initMark() {
        var _a;
        const progressive = {
            progressiveStep: this._spec.progressiveStep,
            progressiveThreshold: this._spec.progressiveThreshold,
            large: this._spec.large,
            largeThreshold: this._spec.largeThreshold
        }, areaSpec = this._spec.area || {}, seriesMark = null !== (_a = this._spec.seriesMark) && void 0 !== _a ? _a : "area", isAreaMarkVisible = this._isAreaVisible() || this._isLineVisible();
        this._areaMark = this._createMark(AreaSeries.mark.area, {
            groupKey: this._seriesField,
            isSeriesMark: isAreaMarkVisible && "point" !== seriesMark,
            stateSort: areaSpec.stateSort
        }, Object.assign(Object.assign({}, progressive), {
            morphElementKey: this.getDimensionField()[0],
            setCustomizedShape: areaSpec.customShape
        })), this.initSymbolMark(progressive, "point" === seriesMark);
    }
    initMarkStyle() {
        this.initAreaMarkStyle(), this.initSymbolMarkStyle();
    }
    initAreaMarkStyle() {
        var _a, _b, _c, _d, _e;
        const userCurveType = null !== (_c = null === (_b = null === (_a = this.getSpec().area) || void 0 === _a ? void 0 : _a.style) || void 0 === _b ? void 0 : _b.curveType) && void 0 !== _c ? _c : null === (_e = null === (_d = this.getSpec().line) || void 0 === _d ? void 0 : _d.style) || void 0 === _e ? void 0 : _e.curveType, curveType = userCurveType === DEFAULT_SMOOTH_INTERPOLATE ? "horizontal" === this._direction ? "monotoneY" : "monotoneX" : userCurveType, areaMark = this._areaMark;
        if (areaMark) {
            const isAreaVisible = this._isAreaVisible(), isLineVisible = this._isLineVisible();
            isAreaVisible || isLineVisible ? areaMark.setVisible(!0) : areaMark.setVisible(!1), 
            "horizontal" === this._direction ? this.setMarkStyle(this._areaMark, {
                x: this.dataToPositionX.bind(this),
                x1: datum => {
                    var _a, _b;
                    return valueInScaleRange(this.dataToPositionX1(datum), null === (_b = null === (_a = this._xAxisHelper) || void 0 === _a ? void 0 : _a.getScale) || void 0 === _b ? void 0 : _b.call(_a, 0));
                },
                y: this.dataToPositionY.bind(this),
                y1: this.dataToPositionY.bind(this),
                z: this._fieldZ ? this.dataToPositionZ.bind(this) : null,
                orient: this._direction
            }, "normal", AttributeLevel.Series) : this.setMarkStyle(this._areaMark, {
                x: this.dataToPositionX.bind(this),
                x1: this.dataToPositionX.bind(this),
                y1: datum => {
                    var _a, _b;
                    return valueInScaleRange(this.dataToPositionY1(datum), null === (_b = null === (_a = this._yAxisHelper) || void 0 === _a ? void 0 : _a.getScale) || void 0 === _b ? void 0 : _b.call(_a, 0));
                },
                y: this.dataToPositionY.bind(this),
                z: this._fieldZ ? this.dataToPositionZ.bind(this) : null
            }, "normal", AttributeLevel.Series), this.setMarkStyle(areaMark, {
                fill: !!isAreaVisible && this.getColorAttribute(),
                stroke: !!isLineVisible && this.getColorAttribute()
            }, "normal", AttributeLevel.Series), "zero" !== this._invalidType && this.setMarkStyle(areaMark, {
                defined: this._getInvalidDefined.bind(this),
                connectedType: this._getInvalidConnectType()
            }, "normal", AttributeLevel.Series), this.getStack() && this.setMarkStyle(areaMark, {
                zIndex: datum => -datum[STACK_FIELD_END]
            }, "normal", AttributeLevel.Series), this.setMarkStyle(areaMark, {
                curveType: curveType
            }, "normal", AttributeLevel.Built_In), Object.keys(areaMark.stateStyle).forEach((state => {
                areaMark.stateStyle[state].stroke && areaMark.setPostProcess("stroke", (result => [ result, !1, !1, !1 ]), state);
            }));
        }
    }
    initAnimation() {
        var _a, _b, _c, _d;
        const areaAnimationParams = {
            direction: this.direction
        }, appearPreset = null === (_a = this._spec.animationAppear) || void 0 === _a ? void 0 : _a.preset;
        if (this._lineMark && this._lineMark.setAnimationConfig(animationConfig(null === (_b = Factory.getAnimationInKey("line")) || void 0 === _b ? void 0 : _b(areaAnimationParams, appearPreset), userAnimationConfig("line", this._spec, this._markAttributeContext))), 
        this._areaMark && this._areaMark.setAnimationConfig(animationConfig(null === (_c = Factory.getAnimationInKey("area")) || void 0 === _c ? void 0 : _c(areaAnimationParams, appearPreset), userAnimationConfig("area", this._spec, this._markAttributeContext))), 
        this._symbolMark) {
            const animationParams = getGroupAnimationParams(this);
            this._symbolMark.setAnimationConfig(animationConfig(null === (_d = Factory.getAnimationInKey("scaleInOut")) || void 0 === _d ? void 0 : _d(), userAnimationConfig("point", this._spec, this._markAttributeContext), animationParams));
        }
    }
    _isAreaVisible() {
        var _a;
        const areaSpec = this._spec.area || {};
        return !1 !== areaSpec.visible && !1 !== (null === (_a = areaSpec.style) || void 0 === _a ? void 0 : _a.visible);
    }
    _isLineVisible() {
        var _a;
        const lineSpec = this._spec.line || {};
        return !1 !== lineSpec.visible && !1 !== (null === (_a = lineSpec.style) || void 0 === _a ? void 0 : _a.visible);
    }
    initTooltip() {
        this._tooltipHelper = new AreaSeriesTooltipHelper(this);
        const {group: group, mark: mark} = this._tooltipHelper.activeTriggerSet;
        this._areaMark && group.add(this._areaMark), this._lineMark && group.add(this._lineMark), 
        this._symbolMark && (mark.add(this._symbolMark), group.add(this._symbolMark));
    }
    viewDataStatisticsUpdate(d) {
        super.viewDataStatisticsUpdate(d), this.encodeDefined(this._areaMark, "defined");
    }
    compile() {
        super.compile(), this.addSamplingCompile(), this.addOverlapCompile();
    }
    getDefaultShapeType() {
        return "square";
    }
    getActiveMarks() {
        return [ this._areaMark, this._symbolMark, this._lineMark ];
    }
    onLayoutEnd(ctx) {
        super.onLayoutEnd(ctx), this.reCompileSampling();
    }
    getSeriesStyle(datum) {
        return attribute => {
            var _a, _b, _c, _d, _e;
            const seriesMarkType = null !== (_a = this._spec.seriesMark) && void 0 !== _a ? _a : "area";
            let result = null !== (_c = null === (_b = this._seriesMark) || void 0 === _b ? void 0 : _b.getAttribute(attribute, datum)) && void 0 !== _c ? _c : void 0;
            return "fill" !== attribute || result && "line" !== seriesMarkType || (attribute = "stroke", 
            result = null !== (_e = null === (_d = this._seriesMark) || void 0 === _d ? void 0 : _d.getAttribute(attribute, datum)) && void 0 !== _e ? _e : void 0), 
            "stroke" === attribute && isArray(result) ? result[0] : result;
        };
    }
}

AreaSeries.type = SeriesTypeEnum.area, AreaSeries.mark = areaSeriesMark, AreaSeries.transformerConstructor = AreaSeriesSpecTransformer, 
mixin(AreaSeries, LineLikeSeriesMixin);

export const registerAreaSeries = () => {
    registerSampleTransform(), registerMarkOverlapTransform(), registerLineMark(), registerAreaMark(), 
    registerSymbolMark(), registerAreaSeriesAnimation(), registerCartesianBandAxis(), 
    registerCartesianLinearAxis(), Factory.registerSeries(AreaSeries.type, AreaSeries);
};
//# sourceMappingURL=area.js.map
