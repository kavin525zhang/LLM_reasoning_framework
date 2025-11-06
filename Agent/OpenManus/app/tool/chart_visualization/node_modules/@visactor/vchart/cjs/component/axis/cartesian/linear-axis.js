"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerCartesianLinearAxis = exports.CartesianLinearAxis = void 0;

const vscale_1 = require("@visactor/vscale"), axis_1 = require("./axis"), vutils_1 = require("@visactor/vutils"), type_1 = require("../../interface/type"), linear_axis_mixin_1 = require("../mixin/linear-axis-mixin"), factory_1 = require("../../../core/factory"), base_axis_1 = require("../base-axis"), vgrammar_core_1 = require("@visactor/vgrammar-core"), register_1 = require("../../../data/register"), vrender_components_1 = require("@visactor/vrender-components"), util_1 = require("./util"), util_2 = require("../../../util");

class CartesianLinearAxis extends axis_1.CartesianAxis {
    constructor() {
        super(...arguments), this.type = type_1.ComponentTypeEnum.cartesianLinearAxis, this._zero = !0, 
        this._nice = !0, this._extend = {}, this._scale = new vscale_1.LinearScale;
    }
    setAttrFromSpec() {
        var _a, _b;
        super.setAttrFromSpec(), this.setExtraAttrFromSpec();
        const tickTransform = null === (_b = null === (_a = this._tickData) || void 0 === _a ? void 0 : _a[0]) || void 0 === _b ? void 0 : _b.getDataView().transformsArr.find((t => t.type === this.registerTicksTransform()));
        tickTransform && (tickTransform.options = this._tickTransformOption());
    }
    initScales() {
        var _a, _b;
        super.initScales();
        const range = [ 0, 1 ];
        (0, vutils_1.isValid)(null === (_a = this._domain) || void 0 === _a ? void 0 : _a.min) && (range[0] = this._domain.min), 
        (0, vutils_1.isValid)(null === (_b = this._domain) || void 0 === _b ? void 0 : _b.max) && (range[1] = this._domain.max), 
        this._scale.domain(range);
    }
    _tickTransformOption() {
        var _a;
        return Object.assign(Object.assign({}, super._tickTransformOption()), {
            breakData: (null === (_a = this._spec.breaks) || void 0 === _a ? void 0 : _a.length) ? () => this._break : null
        });
    }
    _getUpdateAttribute(ignoreGrid) {
        var _a, _b;
        const attrs = super._getUpdateAttribute(ignoreGrid);
        if (!(0, util_1.isZAxis)(this._orient) && (null === (_b = null === (_a = this._break) || void 0 === _a ? void 0 : _a.breaks) || void 0 === _b ? void 0 : _b.length)) {
            const {width: width, height: height} = this.getLayoutRect(), isX = (0, util_1.isXAxis)(this._orient), axisLength = isX ? width : height;
            attrs.breaks = this._break.breaks.map((obj => {
                const {range: range, breakSymbol: breakSymbol, gap: gap = 6} = obj, ratio = this.valueToPosition((range[0] + range[1]) / 2) / axisLength;
                let gapRatio;
                gapRatio = (0, util_2.isPercent)(gap) ? Number(gap.substring(0, gap.length - 1)) / 100 : gap / axisLength;
                const symbolAngle = (0, vutils_1.isValidNumber)(null == breakSymbol ? void 0 : breakSymbol.angle) ? breakSymbol.angle : isX ? 60 : 15;
                return {
                    range: [ ratio - gapRatio / 2, ratio + gapRatio / 2 ],
                    breakSymbol: Object.assign(Object.assign({
                        visible: !0
                    }, breakSymbol), {
                        angle: symbolAngle * Math.PI / 180
                    }),
                    rawRange: range
                };
            }));
        }
        return attrs;
    }
    getNewScaleRange() {
        var _a, _b;
        let newRange = super.getNewScaleRange();
        return (null === (_a = this._spec.breaks) || void 0 === _a ? void 0 : _a.length) && (null === (_b = this._break) || void 0 === _b ? void 0 : _b.scope) && (newRange = (0, 
        util_2.combineDomains)(this._break.scope).map((val => newRange[0] + ((0, vutils_1.last)(newRange) - newRange[0]) * val))), 
        newRange;
    }
    computeDomain(data) {
        return this.computeLinearDomain(data);
    }
    axisHelper() {
        const helper = super.axisHelper();
        return helper.setExtendDomain = this.setExtendDomain.bind(this), helper.valueToPosition = this.valueToPosition.bind(this), 
        helper;
    }
    registerTicksTransform() {
        const name = `${this.type}-ticks`;
        return (0, register_1.registerDataSetInstanceTransform)(this._option.dataSet, name, vrender_components_1.continuousTicks), 
        name;
    }
}

exports.CartesianLinearAxis = CartesianLinearAxis, CartesianLinearAxis.type = type_1.ComponentTypeEnum.cartesianLinearAxis, 
CartesianLinearAxis.specKey = "axes", (0, vutils_1.mixin)(CartesianLinearAxis, linear_axis_mixin_1.LinearAxisMixin);

const registerCartesianLinearAxis = () => {
    (0, vgrammar_core_1.registerLineAxis)(), (0, vgrammar_core_1.registerLineGrid)(), 
    (0, base_axis_1.registerAxis)(), factory_1.Factory.registerComponent(CartesianLinearAxis.type, CartesianLinearAxis);
};

exports.registerCartesianLinearAxis = registerCartesianLinearAxis;
//# sourceMappingURL=linear-axis.js.map
