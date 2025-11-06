import { LinearScale } from "@visactor/vscale";

import { CartesianAxis } from "./axis";

import { isValid, isValidNumber, last, mixin } from "@visactor/vutils";

import { ComponentTypeEnum } from "../../interface/type";

import { LinearAxisMixin } from "../mixin/linear-axis-mixin";

import { Factory } from "../../../core/factory";

import { registerAxis } from "../base-axis";

import { registerLineAxis, registerLineGrid } from "@visactor/vgrammar-core";

import { registerDataSetInstanceTransform } from "../../../data/register";

import { continuousTicks } from "@visactor/vrender-components";

import { isXAxis, isZAxis } from "./util";

import { combineDomains, isPercent } from "../../../util";

export class CartesianLinearAxis extends CartesianAxis {
    constructor() {
        super(...arguments), this.type = ComponentTypeEnum.cartesianLinearAxis, this._zero = !0, 
        this._nice = !0, this._extend = {}, this._scale = new LinearScale;
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
        isValid(null === (_a = this._domain) || void 0 === _a ? void 0 : _a.min) && (range[0] = this._domain.min), 
        isValid(null === (_b = this._domain) || void 0 === _b ? void 0 : _b.max) && (range[1] = this._domain.max), 
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
        if (!isZAxis(this._orient) && (null === (_b = null === (_a = this._break) || void 0 === _a ? void 0 : _a.breaks) || void 0 === _b ? void 0 : _b.length)) {
            const {width: width, height: height} = this.getLayoutRect(), isX = isXAxis(this._orient), axisLength = isX ? width : height;
            attrs.breaks = this._break.breaks.map((obj => {
                const {range: range, breakSymbol: breakSymbol, gap: gap = 6} = obj, ratio = this.valueToPosition((range[0] + range[1]) / 2) / axisLength;
                let gapRatio;
                gapRatio = isPercent(gap) ? Number(gap.substring(0, gap.length - 1)) / 100 : gap / axisLength;
                const symbolAngle = isValidNumber(null == breakSymbol ? void 0 : breakSymbol.angle) ? breakSymbol.angle : isX ? 60 : 15;
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
        return (null === (_a = this._spec.breaks) || void 0 === _a ? void 0 : _a.length) && (null === (_b = this._break) || void 0 === _b ? void 0 : _b.scope) && (newRange = combineDomains(this._break.scope).map((val => newRange[0] + (last(newRange) - newRange[0]) * val))), 
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
        return registerDataSetInstanceTransform(this._option.dataSet, name, continuousTicks), 
        name;
    }
}

CartesianLinearAxis.type = ComponentTypeEnum.cartesianLinearAxis, CartesianLinearAxis.specKey = "axes", 
mixin(CartesianLinearAxis, LinearAxisMixin);

export const registerCartesianLinearAxis = () => {
    registerLineAxis(), registerLineGrid(), registerAxis(), Factory.registerComponent(CartesianLinearAxis.type, CartesianLinearAxis);
};
//# sourceMappingURL=linear-axis.js.map
