import { BaseSeriesTooltipHelper } from "../base/tooltip-helper";

import { isValid } from "@visactor/vutils";

import { BOX_PLOT_OUTLIER_VALUE_FIELD, BOX_PLOT_TOOLTIP_KEYS } from "../../constant/box-plot";

export class BoxPlotSeriesTooltipHelper extends BaseSeriesTooltipHelper {
    constructor() {
        super(...arguments), this.getContentKey = contentType => datum => {
            if (this.isOutlierMark(datum)) {
                if (contentType === BOX_PLOT_TOOLTIP_KEYS.OUTLIER) return this.series.getOutliersField();
                if (contentType === BOX_PLOT_TOOLTIP_KEYS.SERIES_FIELD) {
                    return this.series.getSeriesField();
                }
                return null;
            }
            switch (contentType) {
              case BOX_PLOT_TOOLTIP_KEYS.MIN:
                return this.series.getMinField();

              case BOX_PLOT_TOOLTIP_KEYS.MAX:
                return this.series.getMaxField();

              case BOX_PLOT_TOOLTIP_KEYS.MEDIAN:
                return this.series.getMedianField();

              case BOX_PLOT_TOOLTIP_KEYS.Q1:
                return this.series.getQ1Field();

              case BOX_PLOT_TOOLTIP_KEYS.Q3:
                return this.series.getQ3Field();

              case BOX_PLOT_TOOLTIP_KEYS.SERIES_FIELD:
                return this.series.getSeriesField();
            }
            return null;
        }, this.getContentValue = contentType => datum => {
            if (this.isOutlierMark(datum)) {
                if (contentType === BOX_PLOT_TOOLTIP_KEYS.OUTLIER) return datum[BOX_PLOT_OUTLIER_VALUE_FIELD];
                if (contentType === BOX_PLOT_TOOLTIP_KEYS.SERIES_FIELD) {
                    return datum[this.series.getSeriesField()];
                }
                return null;
            }
            switch (contentType) {
              case BOX_PLOT_TOOLTIP_KEYS.MIN:
                return datum[this.series.getMinField()];

              case BOX_PLOT_TOOLTIP_KEYS.MAX:
                return datum[this.series.getMaxField()];

              case BOX_PLOT_TOOLTIP_KEYS.MEDIAN:
                return datum[this.series.getMedianField()];

              case BOX_PLOT_TOOLTIP_KEYS.Q1:
                return datum[this.series.getQ1Field()];

              case BOX_PLOT_TOOLTIP_KEYS.Q3:
                return datum[this.series.getQ3Field()];

              case BOX_PLOT_TOOLTIP_KEYS.SERIES_FIELD:
                return datum[this.series.getSeriesField()];
            }
            return null;
        }, this.shapeColorCallback = datum => "line" === this.series.getShaftShape() ? this.series.getMarkInName("boxPlot").getAttribute("stroke", datum) : this.series.getMarkInName("boxPlot").getAttribute("fill", datum), 
        this.getOutlierFillColor = datum => {
            var _a;
            const outliersStyle = this.series.getOutliersStyle();
            return null !== (_a = null == outliersStyle ? void 0 : outliersStyle.fill) && void 0 !== _a ? _a : this.series.getMarkInName("outlier").getAttribute("fill", datum);
        }, this.isOutlierMark = datum => isValid(datum[BOX_PLOT_OUTLIER_VALUE_FIELD]);
    }
    getDefaultContentList(activeType) {
        return [ {
            key: this.getContentKey(BOX_PLOT_TOOLTIP_KEYS.OUTLIER),
            value: this.getContentValue(BOX_PLOT_TOOLTIP_KEYS.OUTLIER),
            shapeType: this.shapeTypeCallback,
            shapeColor: this.getOutlierFillColor,
            shapeStroke: this.getOutlierFillColor
        }, {
            key: this.getContentKey(BOX_PLOT_TOOLTIP_KEYS.MAX),
            value: this.getContentValue(BOX_PLOT_TOOLTIP_KEYS.MAX)
        }, {
            key: this.getContentKey(BOX_PLOT_TOOLTIP_KEYS.Q3),
            value: this.getContentValue(BOX_PLOT_TOOLTIP_KEYS.Q3)
        }, {
            key: this.getContentKey(BOX_PLOT_TOOLTIP_KEYS.MEDIAN),
            value: this.getContentValue(BOX_PLOT_TOOLTIP_KEYS.MEDIAN)
        }, {
            key: this.getContentKey(BOX_PLOT_TOOLTIP_KEYS.Q1),
            value: this.getContentValue(BOX_PLOT_TOOLTIP_KEYS.Q1)
        }, {
            key: this.getContentKey(BOX_PLOT_TOOLTIP_KEYS.MIN),
            value: this.getContentValue(BOX_PLOT_TOOLTIP_KEYS.MIN)
        }, {
            key: this.getContentKey(BOX_PLOT_TOOLTIP_KEYS.SERIES_FIELD),
            value: this.getContentValue(BOX_PLOT_TOOLTIP_KEYS.SERIES_FIELD)
        } ];
    }
}
//# sourceMappingURL=tooltip-helper.js.map
