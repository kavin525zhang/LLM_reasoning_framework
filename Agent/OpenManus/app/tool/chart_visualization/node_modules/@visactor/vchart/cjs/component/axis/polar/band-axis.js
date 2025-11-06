"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerPolarBandAxis = exports.PolarBandAxis = void 0;

const vscale_1 = require("@visactor/vscale"), type_1 = require("../../interface/type"), axis_1 = require("./axis"), vutils_1 = require("@visactor/vutils"), band_axis_mixin_1 = require("../mixin/band-axis-mixin"), factory_1 = require("../../../core/factory"), base_axis_1 = require("../base-axis"), vgrammar_core_1 = require("@visactor/vgrammar-core"), register_1 = require("../../../data/register"), vrender_components_1 = require("@visactor/vrender-components");

class PolarBandAxis extends axis_1.PolarAxis {
    constructor() {
        super(...arguments), this.type = type_1.ComponentTypeEnum.polarBandAxis, this._scale = new vscale_1.BandScale;
    }
    computeDomain(data) {
        return this.computeBandDomain(data);
    }
    updateScaleRange() {
        const isChanged = super.updateScaleRange();
        return this.updateGroupScaleRange(), isChanged;
    }
    axisHelper() {
        const helper = super.axisHelper();
        return Object.assign(Object.assign({}, helper), {
            getBandwidth: depth => helper.getScale(depth).bandwidth()
        });
    }
    initScales() {
        super.initScales(), this.calcScales(this._defaultBandInnerPadding, this._defaultBandOuterPadding);
    }
    registerTicksTransform() {
        const name = `${this.type}-ticks`;
        return (0, register_1.registerDataSetInstanceTransform)(this._option.dataSet, name, vrender_components_1.polarAngleAxisDiscreteTicks), 
        name;
    }
    transformScaleDomain() {}
}

exports.PolarBandAxis = PolarBandAxis, PolarBandAxis.type = type_1.ComponentTypeEnum.polarBandAxis, 
PolarBandAxis.specKey = "axes", (0, vutils_1.mixin)(PolarBandAxis, band_axis_mixin_1.BandAxisMixin);

const registerPolarBandAxis = () => {
    (0, vgrammar_core_1.registerLineAxis)(), (0, vgrammar_core_1.registerLineGrid)(), 
    (0, vgrammar_core_1.registerCircleAxis)(), (0, vgrammar_core_1.registerCircleGrid)(), 
    (0, base_axis_1.registerAxis)(), factory_1.Factory.registerComponent(PolarBandAxis.type, PolarBandAxis);
};

exports.registerPolarBandAxis = registerPolarBandAxis;
//# sourceMappingURL=band-axis.js.map
