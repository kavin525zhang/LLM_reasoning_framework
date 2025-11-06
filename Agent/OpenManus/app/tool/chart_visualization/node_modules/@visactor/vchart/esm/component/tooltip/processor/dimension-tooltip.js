import { BaseTooltipProcessor } from "./base";

import { isValid } from "@visactor/vutils";

import { getCartesianDimensionInfo } from "../../../event/events/dimension/util/cartesian";

import { getPolarDimensionInfo } from "../../../event/events/dimension/util/polar";

import { isDiscrete } from "@visactor/vscale";

export class DimensionTooltipProcessor extends BaseTooltipProcessor {
    constructor() {
        super(...arguments), this.activeType = "dimension";
    }
    showTooltip(info, params, changePositionOnly) {
        const newParams = Object.assign(Object.assign({}, params), {
            dimensionInfo: this._preprocessDimensionInfo(info),
            changePositionOnly: changePositionOnly,
            tooltip: this.component
        });
        return this._showTooltipByHandler(info, newParams);
    }
    _getDimensionInfo(params) {
        var _a, _b;
        let targetDimensionInfo;
        const chart = this.component.getChart(), layer = chart.getCompiler().getStage().getLayer(void 0), point = {
            x: params.event.viewX,
            y: params.event.viewY
        };
        if (layer.globalTransMatrix.transformPoint({
            x: params.event.viewX,
            y: params.event.viewY
        }, point), targetDimensionInfo = [ ...null !== (_a = getCartesianDimensionInfo(chart, point, !0)) && void 0 !== _a ? _a : [], ...null !== (_b = getPolarDimensionInfo(chart, point)) && void 0 !== _b ? _b : [] ], 
        0 === targetDimensionInfo.length) targetDimensionInfo = void 0; else if (targetDimensionInfo.length > 1) {
            const dimensionAxisInfo = targetDimensionInfo.filter((info => {
                var _a;
                const axis = info.axis;
                if (axis.getSpec().hasDimensionTooltip) return !0;
                if (!isDiscrete(axis.getScale().type)) return !1;
                let firstSeries;
                for (const region of null !== (_a = null == axis ? void 0 : axis.getRegions()) && void 0 !== _a ? _a : []) {
                    for (const series of region.getSeries()) if ("cartesian" === series.coordinate) {
                        firstSeries = series;
                        break;
                    }
                    if (isValid(firstSeries)) break;
                }
                return isValid(firstSeries) && firstSeries.getDimensionField()[0] === firstSeries.fieldY[0] ? "left" === axis.getOrient() || "right" === axis.getOrient() : "bottom" === axis.getOrient() || "top" === axis.getOrient();
            }));
            if (targetDimensionInfo = dimensionAxisInfo.length ? dimensionAxisInfo : targetDimensionInfo.slice(0, 1), 
            targetDimensionInfo.length > 1) {
                const dimensionDataKeySet = new Set;
                targetDimensionInfo.forEach((info => {
                    info.data = info.data.filter((({key: key}) => !dimensionDataKeySet.has(key) && (dimensionDataKeySet.add(key), 
                    !0)));
                }));
            }
        }
        return targetDimensionInfo;
    }
    getMouseEventData(params) {
        return {
            tooltipInfo: this._getDimensionInfo(params),
            ignore: !1
        };
    }
}
//# sourceMappingURL=dimension-tooltip.js.map
