import { LineLikeSeriesMixin } from "../mixin/line-mixin";

import { POLAR_START_RADIAN } from "../../constant/polar";

import { AttributeLevel } from "../../constant/attribute";

import { ChartEvent } from "../../constant/event";

import { DEFAULT_LINEAR_INTERPOLATE } from "../../typings/interpolate";

import { SeriesTypeEnum } from "../interface/type";

import { degreeToRadian, isArray, mixin, isValid } from "@visactor/vutils";

import { animationConfig, userAnimationConfig } from "../../animation/utils";

import { registerRadarAnimation } from "./animation";

import { RoseLikeSeries } from "../polar/rose-like";

import { registerAreaMark } from "../../mark/area";

import { registerLineMark } from "../../mark/line";

import { registerSymbolMark } from "../../mark/symbol";

import { radarSeriesMark } from "./constant";

import { Factory } from "../../core/factory";

import { LineLikeSeriesSpecTransformer } from "../mixin/line-mixin-transformer";

import { registerPolarBandAxis, registerPolarLinearAxis } from "../../component/axis/polar";

export class RadarSeries extends RoseLikeSeries {
    constructor() {
        super(...arguments), this.type = SeriesTypeEnum.radar, this.transformerConstructor = LineLikeSeriesSpecTransformer, 
        this._sortDataByAxis = !1;
    }
    initGroups() {}
    compile() {
        super.compile(), this.addOverlapCompile();
    }
    initMark() {
        var _a, _b, _c, _d;
        const progressive = {
            progressiveStep: this._spec.progressiveStep,
            progressiveThreshold: this._spec.progressiveThreshold,
            large: this._spec.large,
            largeThreshold: this._spec.largeThreshold
        }, isAreaVisible = !1 !== (null === (_a = this._spec.area) || void 0 === _a ? void 0 : _a.visible) && !1 !== (null === (_c = null === (_b = this._spec.area) || void 0 === _b ? void 0 : _b.style) || void 0 === _c ? void 0 : _c.visible), seriesMark = null !== (_d = this._spec.seriesMark) && void 0 !== _d ? _d : "area";
        this.initAreaMark(progressive, isAreaVisible && "area" === seriesMark), this.initLineMark(progressive, "line" === seriesMark || "area" === seriesMark && !isAreaVisible), 
        this.initSymbolMark(progressive, "point" === seriesMark);
    }
    initMarkStyle() {
        this.initAreaMarkStyle(), this.initLineMarkStyle(), this.initSymbolMarkStyle(), 
        [ this._lineMark, this._symbolMark, this._areaMark ].forEach((mark => {
            mark && this.setMarkStyle(mark, {
                center: () => {
                    var _a;
                    return null === (_a = this.angleAxisHelper) || void 0 === _a ? void 0 : _a.center();
                }
            });
        }));
    }
    initAreaMark(progressive, isSeriesMark) {
        var _a, _b;
        this._areaMark = this._createMark(RadarSeries.mark.area, {
            groupKey: this._seriesField,
            isSeriesMark: isSeriesMark,
            stateSort: null === (_a = this._spec.area) || void 0 === _a ? void 0 : _a.stateSort
        }, Object.assign(Object.assign({}, progressive), {
            setCustomizedShape: null === (_b = this._spec.area) || void 0 === _b ? void 0 : _b.customShape
        }));
    }
    initAreaMarkStyle() {
        const areaMark = this._areaMark;
        areaMark && (this.setMarkStyle(areaMark, {
            x: this.dataToPositionX.bind(this),
            y: this.dataToPositionY.bind(this),
            x1: datum => datum && this.angleAxisHelper && this.radiusAxisHelper ? this.valueToPosition(this.getDatumPositionValues(datum, this._angleField), this.getStack() ? this.getDatumPositionValues(datum, this._innerRadiusField) : this.radiusScale.domain()[0]).x : Number.NaN,
            y1: datum => {
                if (!datum || !this.angleAxisHelper || !this.radiusAxisHelper) return Number.NaN;
                return this.valueToPosition(this.getDatumPositionValues(datum, this._angleField), this.getStack() ? this.getDatumPositionValues(datum, this._innerRadiusField) : this.radiusScale.domain()[0]).y;
            },
            fill: this.getColorAttribute(),
            curveType: DEFAULT_LINEAR_INTERPOLATE,
            closePath: !0
        }, "normal", AttributeLevel.Series), "zero" !== this._invalidType && this.setMarkStyle(areaMark, {
            defined: this._getInvalidDefined.bind(this),
            connectedType: this._getInvalidConnectType()
        }, "normal", AttributeLevel.Series), this.event.on(ChartEvent.viewDataStatisticsUpdate, {
            filter: param => param.model === this
        }, (() => {
            this.encodeDefined(areaMark, "defined");
        })));
    }
    initTooltip() {
        super.initTooltip();
        const {group: group, mark: mark} = this._tooltipHelper.activeTriggerSet;
        this._lineMark && group.add(this._lineMark), this._areaMark && group.add(this._areaMark), 
        this._symbolMark && (mark.add(this._symbolMark), group.add(this._symbolMark));
    }
    initAnimation() {
        var _a, _b, _c, _d;
        const animationParams = {
            center: () => {
                var _a;
                return null === (_a = this.angleAxisHelper) || void 0 === _a ? void 0 : _a.center();
            },
            radius: () => {
                const rect = this.getLayoutRect();
                return Math.min(rect.width, rect.height);
            },
            startAngle: isValid(this._spec.startAngle) ? degreeToRadian(this._spec.startAngle) : POLAR_START_RADIAN
        }, appearPreset = null !== (_c = null === (_b = null === (_a = this._spec) || void 0 === _a ? void 0 : _a.animationAppear) || void 0 === _b ? void 0 : _b.preset) && void 0 !== _c ? _c : "clipIn";
        "clipIn" === appearPreset && this._rootMark && this._rootMark.setAnimationConfig(animationConfig(null === (_d = Factory.getAnimationInKey("radarGroup")) || void 0 === _d ? void 0 : _d(animationParams, appearPreset), userAnimationConfig("group", this._spec, this._markAttributeContext)));
        [ [ this._areaMark, "radar" ], [ this._lineMark, "radar" ], [ this._symbolMark, "radarSymbol" ] ].forEach((([mark, animation]) => {
            if (isValid(mark)) {
                const getAnimation = Factory.getAnimationInKey(animation);
                mark.setAnimationConfig(animationConfig(null == getAnimation ? void 0 : getAnimation(animationParams, appearPreset), userAnimationConfig(mark.name, this._spec, this._markAttributeContext)));
            }
        }));
    }
    getDefaultShapeType() {
        return "square";
    }
    getActiveMarks() {
        return [ this._areaMark, this._symbolMark, this._lineMark ];
    }
    getSeriesStyle(datum) {
        return attribute => {
            var _a, _b, _c, _d;
            let result = null !== (_b = null === (_a = this._seriesMark) || void 0 === _a ? void 0 : _a.getAttribute(attribute, datum)) && void 0 !== _b ? _b : void 0;
            return "fill" !== attribute || result || (attribute = "stroke", result = null !== (_d = null === (_c = this._seriesMark) || void 0 === _c ? void 0 : _c.getAttribute(attribute, datum)) && void 0 !== _d ? _d : void 0), 
            "stroke" === attribute && isArray(result) ? result[0] : result;
        };
    }
}

RadarSeries.type = SeriesTypeEnum.radar, RadarSeries.mark = radarSeriesMark, RadarSeries.transformerConstructor = LineLikeSeriesSpecTransformer, 
mixin(RadarSeries, LineLikeSeriesMixin);

export const registerRadarSeries = () => {
    Factory.registerSeries(RadarSeries.type, RadarSeries), registerAreaMark(), registerLineMark(), 
    registerSymbolMark(), registerRadarAnimation(), registerPolarBandAxis(), registerPolarLinearAxis();
};
//# sourceMappingURL=radar.js.map
