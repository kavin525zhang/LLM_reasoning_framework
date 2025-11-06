"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerPolarLinearAxis = exports.PolarLinearAxis = void 0;

const vscale_1 = require("@visactor/vscale"), type_1 = require("../../interface/type"), axis_1 = require("./axis"), linear_axis_mixin_1 = require("../mixin/linear-axis-mixin"), vutils_1 = require("@visactor/vutils"), factory_1 = require("../../../core/factory"), base_axis_1 = require("../base-axis"), vgrammar_core_1 = require("@visactor/vgrammar-core"), vrender_components_1 = require("@visactor/vrender-components"), register_1 = require("../../../data/register");

class PolarLinearAxis extends axis_1.PolarAxis {
    constructor() {
        super(...arguments), this.type = type_1.ComponentTypeEnum.polarLinearAxis, this._zero = !0, 
        this._nice = !0, this._extend = {}, this._scale = new vscale_1.LinearScale;
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
        return (0, register_1.registerDataSetInstanceTransform)(this._option.dataSet, name, vrender_components_1.continuousTicks), 
        name;
    }
}

exports.PolarLinearAxis = PolarLinearAxis, PolarLinearAxis.type = type_1.ComponentTypeEnum.polarLinearAxis, 
PolarLinearAxis.specKey = "axes", (0, vutils_1.mixin)(PolarLinearAxis, linear_axis_mixin_1.LinearAxisMixin);

const registerPolarLinearAxis = () => {
    (0, vgrammar_core_1.registerLineAxis)(), (0, vgrammar_core_1.registerLineGrid)(), 
    (0, vgrammar_core_1.registerCircleAxis)(), (0, vgrammar_core_1.registerCircleGrid)(), 
    (0, base_axis_1.registerAxis)(), factory_1.Factory.registerComponent(PolarLinearAxis.type, PolarLinearAxis);
};

exports.registerPolarLinearAxis = registerPolarLinearAxis;
//# sourceMappingURL=linear-axis.js.map
