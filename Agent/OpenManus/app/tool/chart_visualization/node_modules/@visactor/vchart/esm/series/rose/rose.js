import { valueInScaleRange } from "../../util/scale";

import { animationConfig, shouldMarkDoMorph, userAnimationConfig } from "../../animation/utils";

import { SeriesTypeEnum } from "../interface/type";

import { registerRoseAnimation } from "./animation";

import { RoseLikeSeries } from "../polar/rose-like";

import { registerArcMark } from "../../mark/arc";

import { roseSeriesMark } from "./constant";

import { Factory } from "../../core/factory";

import { RoseSeriesSpecTransformer } from "./rose-transformer";

import { registerPolarBandAxis, registerPolarLinearAxis } from "../../component/axis/polar";

export const DefaultBandWidth = .5;

export class RoseSeries extends RoseLikeSeries {
    constructor() {
        super(...arguments), this.type = SeriesTypeEnum.rose, this.transformerConstructor = RoseSeriesSpecTransformer, 
        this._roseMark = null, this._labelMark = null;
    }
    initMark() {
        this.initRoseMark();
    }
    initMarkStyle() {
        this.initRoseMarkStyle();
    }
    _buildMarkAttributeContext() {
        super._buildMarkAttributeContext(), this._markAttributeContext.getCenter = () => ({
            x: () => this.angleAxisHelper.center().x,
            y: () => this.angleAxisHelper.center().y
        }), this._markAttributeContext.startAngleScale = datum => this.startAngleScale(datum), 
        this._markAttributeContext.endAngleScale = datum => this.endAngleScale(datum);
    }
    initRoseMark() {
        var _a, _b;
        this._roseMark = this._createMark(RoseSeries.mark.rose, {
            groupKey: this._seriesField,
            isSeriesMark: !0,
            stateSort: null === (_a = this._spec.rose) || void 0 === _a ? void 0 : _a.stateSort
        }, {
            setCustomizedShape: null === (_b = this._spec.rose) || void 0 === _b ? void 0 : _b.customShape,
            morph: shouldMarkDoMorph(this._spec, RoseSeries.mark.rose.name),
            morphElementKey: this.getDimensionField()[0]
        });
    }
    getRoseAngle() {
        var _a, _b, _c;
        return null !== (_c = null === (_b = (_a = this.angleAxisHelper).getBandwidth) || void 0 === _b ? void 0 : _b.call(_a, this._groups ? this._groups.fields.length - 1 : 0)) && void 0 !== _c ? _c : .5;
    }
    startAngleScale(datum) {
        return this.angleAxisHelper.dataToPosition(this.getDatumPositionValues(datum, this.getGroupFields())) - .5 * this.angleAxisHelper.getBandwidth(this.getGroupFields().length - 1);
    }
    endAngleScale(datum) {
        return this.angleAxisHelper.dataToPosition(this.getDatumPositionValues(datum, this.getGroupFields())) + this.getRoseAngle() - .5 * this.angleAxisHelper.getBandwidth(this.getGroupFields().length - 1);
    }
    initRoseMarkStyle() {
        const roseMark = this._roseMark;
        roseMark && this.setMarkStyle(roseMark, {
            x: () => this.angleAxisHelper.center().x,
            y: () => this.angleAxisHelper.center().y,
            startAngle: datum => this.startAngleScale(datum),
            endAngle: datum => this.endAngleScale(datum),
            fill: this.getColorAttribute(),
            outerRadius: datum => valueInScaleRange(this.radiusAxisHelper.dataToPosition([ datum[this._radiusField[0]] ]), this.radiusAxisHelper.getScale(0)),
            innerRadius: datum => {
                var _a;
                if (!this.getStack()) return 0;
                const stackStart = valueInScaleRange(this.radiusAxisHelper.dataToPosition([ datum[this._innerRadiusField[0]] ]), this.radiusAxisHelper.getScale(0));
                return stackStart <= Number.MIN_VALUE ? this._computeLayoutRadius() * (null !== (_a = this._spec.innerRadius) && void 0 !== _a ? _a : 0) : stackStart;
            }
        });
    }
    initTooltip() {
        super.initTooltip(), this._roseMark && this._tooltipHelper.activeTriggerSet.mark.add(this._roseMark);
    }
    initLabelMarkStyle(textMark) {
        textMark && this.setMarkStyle(textMark, {
            text: datum => datum[this.getDimensionField()[0]],
            fill: this.getColorAttribute(),
            z: 0
        });
    }
    initAnimation() {
        var _a, _b, _c;
        const appearPreset = null === (_b = null === (_a = this._spec) || void 0 === _a ? void 0 : _a.animationAppear) || void 0 === _b ? void 0 : _b.preset;
        if (this._roseMark) {
            const animationParams = {
                innerRadius: () => {
                    var _a;
                    return this._computeLayoutRadius() * (null !== (_a = this._spec.innerRadius) && void 0 !== _a ? _a : 0);
                }
            };
            this._roseMark.setAnimationConfig(animationConfig(null === (_c = Factory.getAnimationInKey("rose")) || void 0 === _c ? void 0 : _c(animationParams, appearPreset), userAnimationConfig("rose", this._spec, this._markAttributeContext)));
        }
    }
    getDefaultShapeType() {
        return "circle";
    }
    getActiveMarks() {
        return [ this._roseMark ];
    }
}

RoseSeries.type = SeriesTypeEnum.rose, RoseSeries.mark = roseSeriesMark, RoseSeries.transformerConstructor = RoseSeriesSpecTransformer;

export const registerRoseSeries = () => {
    Factory.registerSeries(RoseSeries.type, RoseSeries), registerArcMark(), registerRoseAnimation(), 
    registerPolarBandAxis(), registerPolarLinearAxis();
};
//# sourceMappingURL=rose.js.map
