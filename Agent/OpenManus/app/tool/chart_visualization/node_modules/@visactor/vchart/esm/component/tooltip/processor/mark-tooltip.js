import { BaseTooltipProcessor } from "./base";

import { IContainPointMode } from "@visactor/vrender-core";

export class MarkTooltipProcessor extends BaseTooltipProcessor {
    constructor() {
        super(...arguments), this.activeType = "mark";
    }
    showTooltip(info, params, changePositionOnly) {
        var _a, _b, _c;
        const {datum: datum, series: series} = info, tooltipSpec = this.component.getSpec(), tooltipData = [ {
            datum: [ datum ],
            series: series
        } ], helper = series.tooltipHelper, seriesSpec = null === (_a = series.getSpec()) || void 0 === _a ? void 0 : _a.tooltip, seriesCheckOverlap = null === (_b = null == seriesSpec ? void 0 : seriesSpec.mark) || void 0 === _b ? void 0 : _b.checkOverlap;
        let checkOverlap = !1;
        if (!0 === seriesCheckOverlap || !0 === (null === (_c = tooltipSpec.mark) || void 0 === _c ? void 0 : _c.checkOverlap) && !1 !== seriesCheckOverlap) {
            const activeTriggers = null == helper ? void 0 : helper.activeTriggerSet.mark;
            if (activeTriggers) {
                checkOverlap = !0;
                const layer = this.component.getChart().getCompiler().getStage().getLayer(void 0), point = {
                    x: params.event.viewX,
                    y: params.event.viewY
                };
                layer.globalTransMatrix.transformPoint({
                    x: params.event.viewX,
                    y: params.event.viewY
                }, point), activeTriggers.forEach((mark => {
                    mark.getProductElements().forEach((el => {
                        const graphic = el.getGraphicItem();
                        el !== params.item && graphic && graphic.containsPoint(point.x, point.y, IContainPointMode.GLOBAL, graphic.stage.getPickerService()) && tooltipData[0].datum.push(el.getDatum());
                    }));
                }));
            }
        }
        const newParams = Object.assign(Object.assign({}, params), {
            model: series,
            changePositionOnly: changePositionOnly,
            tooltip: this.component
        });
        if (changePositionOnly && checkOverlap) {
            const cacheData = this._cacheActiveSpec && this._cacheActiveSpec.data;
            cacheData && cacheData[0].series === tooltipData[0].series && cacheData[0].datum.length === tooltipData[0].datum.length && !cacheData[0].datum.some(((d, index) => d !== tooltipData[0].datum[index])) || (newParams.changePositionOnly = !1);
        }
        return this._showTooltipByHandler(tooltipData, newParams);
    }
    getMouseEventData(params) {
        var _a;
        let info, ignore;
        const modelType = null === (_a = params.model) || void 0 === _a ? void 0 : _a.modelType;
        if ("series" === modelType) {
            const series = params.model, helper = series.tooltipHelper, activeTriggers = null == helper ? void 0 : helper.activeTriggerSet.mark, ignoreTriggers = null == helper ? void 0 : helper.ignoreTriggerSet.mark;
            (null == activeTriggers ? void 0 : activeTriggers.has(params.mark)) ? info = {
                mark: params.mark,
                datum: params.datum,
                series: series
            } : (null == ignoreTriggers ? void 0 : ignoreTriggers.has(params.mark)) && (ignore = !0);
        } else if ("component" === modelType) {
            const model = params.model, node = params.node;
            if ("label" === model.name && node) {
                const labelInfo = model.getLabelInfoByTextGraphic(node), {baseMark: baseMark, series: series, labelMark: labelMark} = null != labelInfo ? labelInfo : {}, helper = series.tooltipHelper, activeTriggers = null == helper ? void 0 : helper.activeTriggerSet.mark, ignoreTriggers = null == helper ? void 0 : helper.ignoreTriggerSet.mark;
                (null == activeTriggers ? void 0 : activeTriggers.has(labelMark)) ? info = {
                    mark: baseMark,
                    datum: node.attribute.data,
                    series: series
                } : (null == ignoreTriggers ? void 0 : ignoreTriggers.has(labelMark)) && (ignore = !0);
            }
        }
        return {
            tooltipInfo: info,
            ignore: ignore
        };
    }
}
//# sourceMappingURL=mark-tooltip.js.map
