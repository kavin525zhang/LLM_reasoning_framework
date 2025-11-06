"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.DimensionTooltipProcessor = void 0;

const base_1 = require("./base"), vutils_1 = require("@visactor/vutils"), cartesian_1 = require("../../../event/events/dimension/util/cartesian"), polar_1 = require("../../../event/events/dimension/util/polar"), vscale_1 = require("@visactor/vscale");

class DimensionTooltipProcessor extends base_1.BaseTooltipProcessor {
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
        }, point), targetDimensionInfo = [ ...null !== (_a = (0, cartesian_1.getCartesianDimensionInfo)(chart, point, !0)) && void 0 !== _a ? _a : [], ...null !== (_b = (0, 
        polar_1.getPolarDimensionInfo)(chart, point)) && void 0 !== _b ? _b : [] ], 0 === targetDimensionInfo.length) targetDimensionInfo = void 0; else if (targetDimensionInfo.length > 1) {
            const dimensionAxisInfo = targetDimensionInfo.filter((info => {
                var _a;
                const axis = info.axis;
                if (axis.getSpec().hasDimensionTooltip) return !0;
                if (!(0, vscale_1.isDiscrete)(axis.getScale().type)) return !1;
                let firstSeries;
                for (const region of null !== (_a = null == axis ? void 0 : axis.getRegions()) && void 0 !== _a ? _a : []) {
                    for (const series of region.getSeries()) if ("cartesian" === series.coordinate) {
                        firstSeries = series;
                        break;
                    }
                    if ((0, vutils_1.isValid)(firstSeries)) break;
                }
                return (0, vutils_1.isValid)(firstSeries) && firstSeries.getDimensionField()[0] === firstSeries.fieldY[0] ? "left" === axis.getOrient() || "right" === axis.getOrient() : "bottom" === axis.getOrient() || "top" === axis.getOrient();
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

exports.DimensionTooltipProcessor = DimensionTooltipProcessor;
//# sourceMappingURL=dimension-tooltip.js.map
