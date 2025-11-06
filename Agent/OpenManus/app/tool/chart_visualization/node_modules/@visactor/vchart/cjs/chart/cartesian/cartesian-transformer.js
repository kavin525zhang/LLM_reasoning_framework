"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.CartesianChartSpecTransformer = void 0;

const util_1 = require("../../util"), base_1 = require("../base"), util_2 = require("../util"), vutils_extension_1 = require("@visactor/vutils-extension");

class CartesianChartSpecTransformer extends base_1.BaseChartSpecTransformer {
    needAxes() {
        return !0;
    }
    _isValidSeries(type) {
        return !this.seriesType || type === this.seriesType;
    }
    _getDefaultSeriesSpec(spec, pickKeys) {
        return super._getDefaultSeriesSpec(spec, [ "xField", "yField", "zField", "direction", "stack", "percent", "stackOffsetSilhouette", "totalLabel", "sortDataByAxis" ], pickKeys);
    }
    transformSpec(spec) {
        super.transformSpec(spec), super.transformSeriesSpec(spec), this._transformAxisSpec(spec);
    }
    _setDefaultXAxisSpec(spec) {
        return {
            orient: "bottom"
        };
    }
    _setDefaultYAxisSpec(spec) {
        return {
            orient: "left"
        };
    }
    _setDefaultZAxisSpec(spec) {
        return {
            orient: "z"
        };
    }
    _transformAxisSpec(spec) {
        if (this.needAxes()) {
            spec.axes || (spec.axes = []);
            const haxAxes = {
                x: !1,
                y: !1,
                z: !1
            };
            spec.axes.forEach((axis => {
                const {orient: orient} = axis;
                let defaultSpec = null;
                "top" !== orient && "bottom" !== orient || (haxAxes.x = !0, defaultSpec = this._setDefaultXAxisSpec(spec)), 
                "left" !== orient && "right" !== orient || (haxAxes.y = !0, defaultSpec = this._setDefaultYAxisSpec(spec)), 
                "z" === orient && (haxAxes.z = !0, defaultSpec = this._setDefaultZAxisSpec(spec)), 
                defaultSpec && Object.keys(defaultSpec).forEach((key => {
                    (0, util_1.isNil)(axis[key]) && (axis[key] = defaultSpec[key]);
                })), (0, util_1.get)(axis, "trimPadding") && (0, vutils_extension_1.mergeSpec)(axis, (0, 
                util_2.getTrimPaddingConfig)(this.type, spec));
            })), haxAxes.x || spec.axes.push(this._setDefaultXAxisSpec(spec)), haxAxes.y || spec.axes.push(this._setDefaultYAxisSpec(spec)), 
            spec.zField && !haxAxes.z && spec.axes.push(this._setDefaultZAxisSpec(spec));
        }
    }
}

exports.CartesianChartSpecTransformer = CartesianChartSpecTransformer;
//# sourceMappingURL=cartesian-transformer.js.map
