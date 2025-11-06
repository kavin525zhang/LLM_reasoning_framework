import { get, isNil } from "../../util";

import { BaseChartSpecTransformer } from "../base";

import { getTrimPaddingConfig } from "../util";

import { mergeSpec } from "@visactor/vutils-extension";

export class CartesianChartSpecTransformer extends BaseChartSpecTransformer {
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
                    isNil(axis[key]) && (axis[key] = defaultSpec[key]);
                })), get(axis, "trimPadding") && mergeSpec(axis, getTrimPaddingConfig(this.type, spec));
            })), haxAxes.x || spec.axes.push(this._setDefaultXAxisSpec(spec)), haxAxes.y || spec.axes.push(this._setDefaultYAxisSpec(spec)), 
            spec.zField && !haxAxes.z && spec.axes.push(this._setDefaultZAxisSpec(spec));
        }
    }
}
//# sourceMappingURL=cartesian-transformer.js.map
