import { BaseTooltipProcessor } from "./base";

import { array } from "@visactor/vutils";

export class GroupTooltipProcessor extends BaseTooltipProcessor {
    constructor() {
        super(...arguments), this.activeType = "group";
    }
    showTooltip(info, params, changePositionOnly) {
        const {datum: datum, series: series} = info, tooltipData = [ {
            datum: array(datum),
            series: series
        } ], newParams = Object.assign(Object.assign({}, params), {
            groupDatum: this._getGroupDatum(params),
            changePositionOnly: changePositionOnly,
            tooltip: this.component
        });
        return this._showTooltipByHandler(tooltipData, newParams);
    }
    getMouseEventData(params) {
        var _a, _b;
        let info;
        if ("series" === (null === (_a = params.model) || void 0 === _a ? void 0 : _a.modelType)) {
            const series = params.model, helper = series.tooltipHelper, activeTriggers = null == helper ? void 0 : helper.activeTriggerSet.group;
            if (null == activeTriggers ? void 0 : activeTriggers.has(params.mark)) {
                const patternSpec = this.component.getSpec()[this.activeType];
                ((null == patternSpec ? void 0 : patternSpec.triggerMark) ? array(patternSpec.triggerMark) : []).includes(null === (_b = params.mark) || void 0 === _b ? void 0 : _b.name) && (info = {
                    mark: params.mark,
                    datum: params.datum,
                    series: series
                });
            }
        }
        return {
            tooltipInfo: info,
            ignore: !1
        };
    }
    _getGroupDatum(params) {
        const {model: model, mark: mark, datum: datum} = params, series = model;
        if ([ "line", "area" ].includes(mark.type)) return array(datum);
        const datumList = series.getViewData().latestData, seriesField = series.getSeriesField();
        if (!seriesField) return datumList;
        const seriesFieldValue = array(datum)[0][seriesField];
        return datumList.filter((d => d[seriesField] === seriesFieldValue));
    }
}
//# sourceMappingURL=group-tooltip.js.map
