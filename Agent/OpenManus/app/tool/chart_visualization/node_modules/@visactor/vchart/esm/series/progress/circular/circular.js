import { isValidNumber } from "@visactor/vutils";

import { SeriesTypeEnum } from "../../interface/type";

import { animationConfig, shouldMarkDoMorph, userAnimationConfig } from "../../../animation/utils";

import { ProgressLikeSeries } from "../../polar/progress-like/progress-like";

import { registerArcMark } from "../../../mark/arc";

import { circularProgressSeriesMark } from "./constant";

import { STACK_FIELD_END, STACK_FIELD_START } from "../../../constant/data";

import { AttributeLevel } from "../../../constant/attribute";

import { Factory } from "../../../core/factory";

import { registerProgressLikeAnimation } from "../../polar/progress-like";

import { registerFadeInOutAnimation } from "../../../animation/config";

import { CircularProgressSeriesSpecTransformer } from "./circular-transformer";

import { registerPolarLinearAxis, registerPolarBandAxis } from "../../../component/axis/polar";

export class CircularProgressSeries extends ProgressLikeSeries {
    constructor() {
        super(...arguments), this.type = SeriesTypeEnum.circularProgress, this.transformerConstructor = CircularProgressSeriesSpecTransformer, 
        this._progressMark = null, this._trackMark = null, this._getRadiusValueStart = datum => {
            if (this.getGroupFields().length > 1) {
                const value = this.radiusAxisHelper.dataToPosition(this.getDatumPositionValues(datum, this.getGroupFields()));
                if (isValidNumber(value)) return value;
            }
            return this.radiusAxisHelper.dataToPosition([ datum[this._radiusField[0]] ]);
        }, this._getRadiusValueEnd = datum => {
            var _a, _b;
            if (this.getGroupFields().length > 1) {
                const value = this.radiusAxisHelper.dataToPosition(this.getDatumPositionValues(datum, this.getGroupFields())) + (null === (_b = (_a = this.radiusAxisHelper).getBandwidth) || void 0 === _b ? void 0 : _b.call(_a, this._groups ? this._groups.fields.length - 1 : 0));
                if (isValidNumber(value)) return value;
            }
            return this.radiusAxisHelper.dataToPosition([ datum[this._radiusField[0]] ]) + this.radiusAxisHelper.getScale(0).step();
        };
    }
    getStackGroupFields() {
        return this.getGroupFields();
    }
    getGroupFields() {
        return this._radiusField;
    }
    initMark() {
        super.initMark(), this._initTrackMark(), this._initProgressMark();
    }
    initMarkStyle() {
        super.initMarkStyle(), this._initTrackMarkStyle(), this._initProgressMarkStyle();
    }
    _initProgressMark() {
        var _a, _b;
        return this._progressMark = this._createMark(CircularProgressSeries.mark.progress, {
            parent: this._arcGroupMark,
            isSeriesMark: !0,
            stateSort: null === (_a = this._spec.progress) || void 0 === _a ? void 0 : _a.stateSort
        }, {
            morph: shouldMarkDoMorph(this._spec, "progress"),
            setCustomizedShape: null === (_b = this._spec.progress) || void 0 === _b ? void 0 : _b.customShape
        }), this._progressMark;
    }
    _initProgressMarkStyle() {
        var _a;
        const progressMark = this._progressMark;
        progressMark && this.setMarkStyle(progressMark, {
            x: () => this.angleAxisHelper.center().x,
            y: () => this.angleAxisHelper.center().y,
            startAngle: this._getAngleValueStart,
            endAngle: this._getAngleValueEnd,
            innerRadius: this._getRadiusValueStart,
            outerRadius: this._getRadiusValueEnd,
            cap: null !== (_a = this._spec.roundCap) && void 0 !== _a && _a,
            boundsMode: "imprecise",
            cornerRadius: this._spec.cornerRadius,
            fill: this.getColorAttribute(),
            zIndex: 200,
            forceShowCap: !0
        }, "normal", AttributeLevel.Series);
    }
    initInteraction() {
        const marks = [];
        this._trackMark && marks.push(this._trackMark), this._progressMark && marks.push(this._progressMark), 
        this._parseInteractionConfig(marks);
    }
    initTooltip() {
        super.initTooltip(), this._progressMark && this._tooltipHelper.activeTriggerSet.mark.add(this._progressMark);
    }
    _initTrackMark() {
        var _a, _b;
        return this._trackMark = this._createMark(CircularProgressSeries.mark.track, {
            parent: this._arcGroupMark,
            stateSort: null === (_a = this._spec.track) || void 0 === _a ? void 0 : _a.stateSort
        }, {
            setCustomizedShape: null === (_b = this._spec.track) || void 0 === _b ? void 0 : _b.customShape
        }), this._trackMark.setMarkConfig({
            morph: !1,
            morphKey: null,
            morphElementKey: null
        }), this._trackMark;
    }
    _initTrackMarkStyle() {
        const trackMark = this._trackMark;
        trackMark && this.setMarkStyle(trackMark, {
            visible: datum => {
                const range = this.angleAxisHelper.getScale(0).range(), min = Math.min(range[0], range[range.length - 1]), startValue = this._getAngleValueStartWithoutMask(datum);
                return Math.abs(startValue - min) <= 1e-14;
            },
            x: () => this.angleAxisHelper.center().x,
            y: () => this.angleAxisHelper.center().y,
            startAngle: () => {
                const fieldName = this.getStack() ? STACK_FIELD_START : this._angleField[0], domain = this.angleAxisHelper.getScale(0).domain();
                return this._getAngleValueStart({
                    [fieldName]: domain[0]
                });
            },
            endAngle: () => {
                const fieldName = this.getStack() ? STACK_FIELD_END : this._angleField[0], domain = this.angleAxisHelper.getScale(0).domain();
                return this._getAngleValueEnd({
                    [fieldName]: domain[domain.length - 1]
                });
            },
            innerRadius: this._getRadiusValueStart,
            outerRadius: this._getRadiusValueEnd,
            cornerRadius: this._spec.cornerRadius,
            fill: this.getColorAttribute(),
            zIndex: 100
        }, "normal", AttributeLevel.Series);
    }
    initAnimation() {
        var _a, _b, _c, _d;
        const appearPreset = null === (_b = null === (_a = this._spec) || void 0 === _a ? void 0 : _a.animationAppear) || void 0 === _b ? void 0 : _b.preset;
        this._progressMark.setAnimationConfig(animationConfig(null === (_c = Factory.getAnimationInKey("circularProgress")) || void 0 === _c ? void 0 : _c({
            startAngle: this._startAngle
        }, appearPreset), userAnimationConfig("progress", this._spec, this._markAttributeContext))), 
        this._trackMark.setAnimationConfig(animationConfig(null === (_d = Factory.getAnimationInKey("fadeInOut")) || void 0 === _d ? void 0 : _d(), userAnimationConfig("track", this._spec, this._markAttributeContext)));
    }
    getActiveMarks() {
        return [ this._progressMark ];
    }
}

CircularProgressSeries.type = SeriesTypeEnum.circularProgress, CircularProgressSeries.mark = circularProgressSeriesMark, 
CircularProgressSeries.transformerConstructor = CircularProgressSeriesSpecTransformer;

export const registerCircularProgressSeries = () => {
    Factory.registerSeries(CircularProgressSeries.type, CircularProgressSeries), registerArcMark(), 
    registerProgressLikeAnimation(), registerFadeInOutAnimation(), registerPolarBandAxis(), 
    registerPolarLinearAxis();
};
//# sourceMappingURL=circular.js.map
