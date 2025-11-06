import { LinearScale } from "@visactor/vscale";

import { ComponentTypeEnum } from "../../interface/type";

import { PolarAxis } from "./axis";

import { LinearAxisMixin } from "../mixin/linear-axis-mixin";

import { mixin } from "@visactor/vutils";

import { Factory } from "../../../core/factory";

import { registerAxis } from "../base-axis";

import { registerLineAxis, registerLineGrid, registerCircleAxis, registerCircleGrid } from "@visactor/vgrammar-core";

import { continuousTicks } from "@visactor/vrender-components";

import { registerDataSetInstanceTransform } from "../../../data/register";

export class PolarLinearAxis extends PolarAxis {
    constructor() {
        super(...arguments), this.type = ComponentTypeEnum.polarLinearAxis, this._zero = !0, 
        this._nice = !0, this._extend = {}, this._scale = new LinearScale;
    }
    setAttrFromSpec() {
        super.setAttrFromSpec(), this.setExtraAttrFromSpec();
    }
    initScales() {
        super.initScales(), this.setScaleNice();
    }
    computeDomain(data) {
        return this.computeLinearDomain(data);
    }
    axisHelper() {
        const helper = super.axisHelper();
        return helper.setExtendDomain = this.setExtendDomain.bind(this), helper;
    }
    registerTicksTransform() {
        const name = `${this.type}-ticks`;
        return registerDataSetInstanceTransform(this._option.dataSet, name, continuousTicks), 
        name;
    }
}

PolarLinearAxis.type = ComponentTypeEnum.polarLinearAxis, PolarLinearAxis.specKey = "axes", 
mixin(PolarLinearAxis, LinearAxisMixin);

export const registerPolarLinearAxis = () => {
    registerLineAxis(), registerLineGrid(), registerCircleAxis(), registerCircleGrid(), 
    registerAxis(), Factory.registerComponent(PolarLinearAxis.type, PolarLinearAxis);
};
//# sourceMappingURL=linear-axis.js.map
