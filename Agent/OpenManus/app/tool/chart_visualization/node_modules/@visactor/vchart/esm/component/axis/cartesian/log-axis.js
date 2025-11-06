import { CartesianLinearAxis } from "./linear-axis";

import { ComponentTypeEnum } from "../../interface/type";

import { LinearAxisMixin } from "../mixin/linear-axis-mixin";

import { LogScale } from "@visactor/vscale";

import { mixin } from "@visactor/vutils";

import { Factory } from "../../../core/factory";

import { registerAxis } from "../base-axis";

import { registerLineAxis, registerLineGrid } from "@visactor/vgrammar-core";

import { continuousTicks } from "@visactor/vrender-components";

import { registerDataSetInstanceTransform } from "../../../data/register";

export class CartesianLogAxis extends CartesianLinearAxis {
    constructor() {
        super(...arguments), this.type = ComponentTypeEnum.cartesianLogAxis, this._zero = !1, 
        this._scale = new LogScale;
    }
    initScales() {
        var _a;
        super.initScales(), this._scale.base(null !== (_a = this._spec.base) && void 0 !== _a ? _a : 10), 
        this._scale.clamp(!0, null, !1);
    }
    registerTicksTransform() {
        const name = `${this.type}-ticks`;
        return registerDataSetInstanceTransform(this._option.dataSet, name, continuousTicks), 
        name;
    }
    transformScaleDomain() {}
}

CartesianLogAxis.type = ComponentTypeEnum.cartesianLogAxis, CartesianLogAxis.specKey = "axes", 
mixin(CartesianLogAxis, LinearAxisMixin);

export const registerCartesianLogAxis = () => {
    registerLineAxis(), registerLineGrid(), registerAxis(), Factory.registerComponent(CartesianLogAxis.type, CartesianLogAxis);
};
//# sourceMappingURL=log-axis.js.map
