"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerCartesianBandAxis = exports.CartesianBandAxis = void 0;

const vscale_1 = require("@visactor/vscale"), axis_1 = require("./axis"), interface_1 = require("../../interface"), vutils_1 = require("@visactor/vutils"), band_axis_mixin_1 = require("../mixin/band-axis-mixin"), factory_1 = require("../../../core/factory"), base_axis_1 = require("../base-axis"), vgrammar_core_1 = require("@visactor/vgrammar-core"), vrender_components_1 = require("@visactor/vrender-components"), register_1 = require("../../../data/register");

class CartesianBandAxis extends axis_1.CartesianAxis {
    constructor() {
        super(...arguments), this.type = interface_1.ComponentTypeEnum.cartesianBandAxis, 
        this._scale = new vscale_1.BandScale;
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
        return (0, register_1.registerDataSetInstanceTransform)(this._option.dataSet, name, vrender_components_1.linearDiscreteTicks), 
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
                const rangeSize = (0, vscale_1.scaleWholeRangeSize)(this._scale.domain().length, null != bandSize ? bandSize : maxBandSize, this._scale.paddingInner(), this._scale.paddingOuter());
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
                if ((0, vutils_1.isNil)(gap) || i < bandSizeLevel) return (0, vscale_1.scaleWholeRangeSize)(domain.length, b, paddingInner, paddingOuter) + extendValue;
                return (b + ((0, vutils_1.isString)(gap) ? b * (Number(gap.substring(0, gap.length - 1)) / 100) : gap)) * domain.length / (this._scales[i - 1].paddingInner() + 1) + extendValue;
            };
            (0, vutils_1.isValid)(bandSize) && (bandSize = getOuterBandSize(bandSize)), (0, 
            vutils_1.isValid)(maxBandSize) && (maxBandSize = getOuterBandSize(maxBandSize)), 
            (0, vutils_1.isValid)(minBandSize) && (minBandSize = getOuterBandSize(minBandSize));
        }
        return {
            bandSize: bandSize,
            maxBandSize: maxBandSize,
            minBandSize: minBandSize
        };
    }
}

exports.CartesianBandAxis = CartesianBandAxis, CartesianBandAxis.type = interface_1.ComponentTypeEnum.cartesianBandAxis, 
CartesianBandAxis.specKey = "axes", (0, vutils_1.mixin)(CartesianBandAxis, band_axis_mixin_1.BandAxisMixin);

const registerCartesianBandAxis = () => {
    (0, vgrammar_core_1.registerLineAxis)(), (0, vgrammar_core_1.registerLineGrid)(), 
    (0, base_axis_1.registerAxis)(), factory_1.Factory.registerComponent(CartesianBandAxis.type, CartesianBandAxis);
};

exports.registerCartesianBandAxis = registerCartesianBandAxis;
//# sourceMappingURL=band-axis.js.map
