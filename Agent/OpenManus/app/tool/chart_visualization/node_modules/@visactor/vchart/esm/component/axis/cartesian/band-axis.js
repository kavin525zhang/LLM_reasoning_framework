import { BandScale, scaleWholeRangeSize } from "@visactor/vscale";

import { CartesianAxis } from "./axis";

import { ComponentTypeEnum } from "../../interface";

import { isNil, isString, isValid, mixin } from "@visactor/vutils";

import { BandAxisMixin } from "../mixin/band-axis-mixin";

import { Factory } from "../../../core/factory";

import { registerAxis } from "../base-axis";

import { registerLineAxis, registerLineGrid } from "@visactor/vgrammar-core";

import { linearDiscreteTicks } from "@visactor/vrender-components";

import { registerDataSetInstanceTransform } from "../../../data/register";

export class CartesianBandAxis extends CartesianAxis {
    constructor() {
        super(...arguments), this.type = ComponentTypeEnum.cartesianBandAxis, this._scale = new BandScale;
    }
    computeDomain(data) {
        return this.computeBandDomain(data);
    }
    updateScaleRange() {
        const isChanged = super.updateScaleRange();
        return this.updateGroupScaleRange(), isChanged;
    }
    initScales() {
        super.initScales(), this.calcScales(this._defaultBandInnerPadding, this._defaultBandOuterPadding);
    }
    axisHelper() {
        const getScale = (depth = 0) => this._scales[depth];
        return {
            isContinuous: !1,
            dataToPosition: this.dataToPosition.bind(this),
            getScale: getScale,
            getBandwidth: (depth = 0) => getScale(depth).bandwidth(),
            getAxisType: () => this.type,
            getAxisId: () => this.id,
            isInverse: () => this._inverse,
            getSpec: () => this._spec
        };
    }
    registerTicksTransform() {
        const name = `${this.type}-ticks`;
        return registerDataSetInstanceTransform(this._option.dataSet, name, linearDiscreteTicks), 
        name;
    }
    transformScaleDomain() {
        this.updateFixedWholeLength();
    }
    updateFixedWholeLength() {
        if (this._scale) {
            const {bandSize: bandSize, maxBandSize: maxBandSize, minBandSize: minBandSize} = this._getOuterBandSizeFromSpec();
            if (bandSize && this._scale.bandwidth(bandSize), maxBandSize && this._scale.maxBandwidth(maxBandSize), 
            minBandSize && this._scale.minBandwidth(minBandSize), this._scale.isBandwidthFixed() && this._spec.autoRegionSize && (bandSize || maxBandSize)) {
                const rangeSize = scaleWholeRangeSize(this._scale.domain().length, null != bandSize ? bandSize : maxBandSize, this._scale.paddingInner(), this._scale.paddingOuter());
                [ "bottom", "top" ].includes(this._orient) ? this._regions.forEach((region => region.setMaxWidth(rangeSize))) : [ "left", "right" ].includes(this._orient) && this._regions.forEach((region => region.setMaxHeight(rangeSize)));
            }
        }
    }
    _getOuterBandSizeFromSpec() {
        var _a;
        let {bandSize: bandSize, maxBandSize: maxBandSize, minBandSize: minBandSize, bandSizeLevel: bandSizeLevel = 0} = this._spec;
        const {gap: gap, extend: extend = 0} = null !== (_a = this._spec.bandSizeExtend) && void 0 !== _a ? _a : {};
        bandSizeLevel = Math.min(bandSizeLevel, this._scales.length - 1);
        for (let i = bandSizeLevel; i > 0; i--) {
            const scale = this._scales[i], domain = scale.domain(), paddingInner = scale.paddingInner(), paddingOuter = scale.paddingOuter(), getOuterBandSize = b => {
                const extendValue = i === bandSizeLevel ? extend : 0;
                if (isNil(gap) || i < bandSizeLevel) return scaleWholeRangeSize(domain.length, b, paddingInner, paddingOuter) + extendValue;
                return (b + (isString(gap) ? b * (Number(gap.substring(0, gap.length - 1)) / 100) : gap)) * domain.length / (this._scales[i - 1].paddingInner() + 1) + extendValue;
            };
            isValid(bandSize) && (bandSize = getOuterBandSize(bandSize)), isValid(maxBandSize) && (maxBandSize = getOuterBandSize(maxBandSize)), 
            isValid(minBandSize) && (minBandSize = getOuterBandSize(minBandSize));
        }
        return {
            bandSize: bandSize,
            maxBandSize: maxBandSize,
            minBandSize: minBandSize
        };
    }
}

CartesianBandAxis.type = ComponentTypeEnum.cartesianBandAxis, CartesianBandAxis.specKey = "axes", 
mixin(CartesianBandAxis, BandAxisMixin);

export const registerCartesianBandAxis = () => {
    registerLineAxis(), registerLineGrid(), registerAxis(), Factory.registerComponent(CartesianBandAxis.type, CartesianBandAxis);
};
//# sourceMappingURL=band-axis.js.map
