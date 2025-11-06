import { error } from "../../../util/debug";

import { getPolarDimensionInfo } from "./util/polar";

import { getCartesianDimensionInfo, getDimensionInfoByValue } from "./util/cartesian";

import { isDiscrete } from "@visactor/vscale";

import { isXAxis } from "../../../component/axis/cartesian/util";

export class DimensionEvent {
    constructor(eventDispatcher, mode) {
        this._eventDispatcher = eventDispatcher, this._mode = mode;
    }
    get chart() {
        var _a, _b;
        return this._chart || (this._chart = null === (_b = (_a = this._eventDispatcher.globalInstance).getChart) || void 0 === _b ? void 0 : _b.call(_a)), 
        this._chart;
    }
    register(eType, handler) {
        var _a, _b;
        (null !== (_b = null === (_a = this.chart) || void 0 === _a ? void 0 : _a.getOption().onError) && void 0 !== _b ? _b : error)("Method not implemented.");
    }
    unregister() {
        var _a, _b;
        (null !== (_b = null === (_a = this.chart) || void 0 === _a ? void 0 : _a.getOption().onError) && void 0 !== _b ? _b : error)("Method not implemented.");
    }
    getTargetDimensionInfo(x, y) {
        var _a, _b;
        const cartesianInfo = null !== (_a = getCartesianDimensionInfo(this.chart, {
            x: x,
            y: y
        })) && void 0 !== _a ? _a : [], polarInfo = null !== (_b = getPolarDimensionInfo(this.chart, {
            x: x,
            y: y
        })) && void 0 !== _b ? _b : [], result = [].concat(cartesianInfo, polarInfo);
        return 0 === result.length ? null : result;
    }
    dispatch(v, opt) {
        var _a;
        const axes = null === (_a = this.chart) || void 0 === _a ? void 0 : _a.getAllComponents().filter((c => "axes" === c.specKey && (!(null == opt ? void 0 : opt.filter) || opt.filter(c)))), discreteAxes = axes.filter((axis => {
            const scale = axis.getScale();
            return isDiscrete(scale.type);
        })), dimAxes = discreteAxes.length ? discreteAxes : axes.filter((axis => {
            const orient = axis.getOrient();
            return isXAxis(orient) || "angle" === orient;
        })), dimensionInfo = [];
        return dimAxes.forEach((a => {
            const info = getDimensionInfoByValue(a, v);
            info && dimensionInfo.push(info);
        })), this._callback.call(null, {
            action: "enter",
            dimensionInfo: dimensionInfo
        }), dimensionInfo;
    }
}
//# sourceMappingURL=base.js.map
