"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerCartesianSymlogAxis = exports.CartesianSymlogAxis = void 0;

const linear_axis_1 = require("./linear-axis"), type_1 = require("../../interface/type"), linear_axis_mixin_1 = require("../mixin/linear-axis-mixin"), vscale_1 = require("@visactor/vscale"), vutils_1 = require("@visactor/vutils"), factory_1 = require("../../../core/factory"), base_axis_1 = require("../base-axis"), vgrammar_core_1 = require("@visactor/vgrammar-core"), vrender_components_1 = require("@visactor/vrender-components"), register_1 = require("../../../data/register");

class CartesianSymlogAxis extends linear_axis_1.CartesianLinearAxis {
    constructor() {
        super(...arguments), this.type = type_1.ComponentTypeEnum.cartesianSymlogAxis, this._zero = !1, 
        this._scale = new vscale_1.SymlogScale;
    }
    initScales() {
        var _a;
        super.initScales(), this._scale.constant(null !== (_a = this._spec.constant) && void 0 !== _a ? _a : 10);
    }
    registerTicksTransform() {
        const name = `${this.type}-ticks`;
        return (0, register_1.registerDataSetInstanceTransform)(this._option.dataSet, name, vrender_components_1.continuousTicks), 
        name;
    }
    transformScaleDomain() {}
}

exports.CartesianSymlogAxis = CartesianSymlogAxis, CartesianSymlogAxis.type = type_1.ComponentTypeEnum.cartesianSymlogAxis, 
CartesianSymlogAxis.specKey = "axes", (0, vutils_1.mixin)(CartesianSymlogAxis, linear_axis_mixin_1.LinearAxisMixin);

const registerCartesianSymlogAxis = () => {
    (0, vgrammar_core_1.registerLineAxis)(), (0, vgrammar_core_1.registerLineGrid)(), 
    (0, base_axis_1.registerAxis)(), factory_1.Factory.registerComponent(CartesianSymlogAxis.type, CartesianSymlogAxis);
};

exports.registerCartesianSymlogAxis = registerCartesianSymlogAxis;
//# sourceMappingURL=symlog-axis.js.map
