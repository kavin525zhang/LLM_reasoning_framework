import { BandScale } from "@visactor/vscale";

import { ComponentTypeEnum } from "../../interface/type";

import { PolarAxis } from "./axis";

import { mixin } from "@visactor/vutils";

import { BandAxisMixin } from "../mixin/band-axis-mixin";

import { Factory } from "../../../core/factory";

import { registerAxis } from "../base-axis";

import { registerLineAxis, registerLineGrid, registerCircleAxis, registerCircleGrid } from "@visactor/vgrammar-core";

import { registerDataSetInstanceTransform } from "../../../data/register";

import { polarAngleAxisDiscreteTicks } from "@visactor/vrender-components";

export class PolarBandAxis extends PolarAxis {
    constructor() {
        super(...arguments), this.type = ComponentTypeEnum.polarBandAxis, this._scale = new BandScale;
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
        return registerDataSetInstanceTransform(this._option.dataSet, name, polarAngleAxisDiscreteTicks), 
        name;
    }
    transformScaleDomain() {}
}

PolarBandAxis.type = ComponentTypeEnum.polarBandAxis, PolarBandAxis.specKey = "axes", 
mixin(PolarBandAxis, BandAxisMixin);

export const registerPolarBandAxis = () => {
    registerLineAxis(), registerLineGrid(), registerCircleAxis(), registerCircleGrid(), 
    registerAxis(), Factory.registerComponent(PolarBandAxis.type, PolarBandAxis);
};
//# sourceMappingURL=band-axis.js.map
