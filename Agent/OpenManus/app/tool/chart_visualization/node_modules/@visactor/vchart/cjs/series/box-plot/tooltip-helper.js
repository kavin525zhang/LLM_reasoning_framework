"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.BoxPlotSeriesTooltipHelper = void 0;

const tooltip_helper_1 = require("../base/tooltip-helper"), vutils_1 = require("@visactor/vutils"), box_plot_1 = require("../../constant/box-plot");

class BoxPlotSeriesTooltipHelper extends tooltip_helper_1.BaseSeriesTooltipHelper {
    constructor() {
        super(...arguments), this.getContentKey = contentType => datum => {
            if (this.isOutlierMark(datum)) {
                if (contentType === box_plot_1.BOX_PLOT_TOOLTIP_KEYS.OUTLIER) return this.series.getOutliersField();
                if (contentType === box_plot_1.BOX_PLOT_TOOLTIP_KEYS.SERIES_FIELD) {
                    return this.series.getSeriesField();
                }
                return null;
            }
            switch (contentType) {
              case box_plot_1.BOX_PLOT_TOOLTIP_KEYS.MIN:
                return this.series.getMinField();

              case box_plot_1.BOX_PLOT_TOOLTIP_KEYS.MAX:
                return this.series.getMaxField();

              case box_plot_1.BOX_PLOT_TOOLTIP_KEYS.MEDIAN:
                return this.series.getMedianField();

              case box_plot_1.BOX_PLOT_TOOLTIP_KEYS.Q1:
                return this.series.getQ1Field();

              case box_plot_1.BOX_PLOT_TOOLTIP_KEYS.Q3:
                return this.series.getQ3Field();

              case box_plot_1.BOX_PLOT_TOOLTIP_KEYS.SERIES_FIELD:
                return this.series.getSeriesField();
            }
            return null;
        }, this.getContentValue = contentType => datum => {
            if (this.isOutlierMark(datum)) {
                if (contentType === box_plot_1.BOX_PLOT_TOOLTIP_KEYS.OUTLIER) return datum[box_plot_1.BOX_PLOT_OUTLIER_VALUE_FIELD];
                if (contentType === box_plot_1.BOX_PLOT_TOOLTIP_KEYS.SERIES_FIELD) {
                    return datum[this.series.getSeriesField()];
                }
                return null;
            }
            switch (contentType) {
              case box_plot_1.BOX_PLOT_TOOLTIP_KEYS.MIN:
                return datum[this.series.getMinField()];

              case box_plot_1.BOX_PLOT_TOOLTIP_KEYS.MAX:
                return datum[this.series.getMaxField()];

              case box_plot_1.BOX_PLOT_TOOLTIP_KEYS.MEDIAN:
                return datum[this.series.getMedianField()];

              case box_plot_1.BOX_PLOT_TOOLTIP_KEYS.Q1:
                return datum[this.series.getQ1Field()];

              case box_plot_1.BOX_PLOT_TOOLTIP_KEYS.Q3:
                return datum[this.series.getQ3Field()];

              case box_plot_1.BOX_PLOT_TOOLTIP_KEYS.SERIES_FIELD:
                return datum[this.series.getSeriesField()];
            }
            return null;
        }, this.shapeColorCallback = datum => "line" === this.series.getShaftShape() ? this.series.getMarkInName("boxPlot").getAttribute("stroke", datum) : this.series.getMarkInName("boxPlot").getAttribute("fill", datum), 
        this.getOutlierFillColor = datum => {
            var _a;
            const outliersStyle = this.series.getOutliersStyle();
            return null !== (_a = null == outliersStyle ? void 0 : outliersStyle.fill) && void 0 !== _a ? _a : this.series.getMarkInName("outlier").getAttribute("fill", datum);
        }, this.isOutlierMark = datum => (0, vutils_1.isValid)(datum[box_plot_1.BOX_PLOT_OUTLIER_VALUE_FIELD]);
    }
    getDefaultContentList(activeType) {
        return [ {
            key: this.getContentKey(box_plot_1.BOX_PLOT_TOOLTIP_KEYS.OUTLIER),
            value: this.getContentValue(box_plot_1.BOX_PLOT_TOOLTIP_KEYS.OUTLIER),
            shapeType: this.shapeTypeCallback,
            shapeColor: this.getOutlierFillColor,
            shapeStroke: this.getOutlierFillColor
        }, {
            key: this.getContentKey(box_plot_1.BOX_PLOT_TOOLTIP_KEYS.MAX),
            value: this.getContentValue(box_plot_1.BOX_PLOT_TOOLTIP_KEYS.MAX)
        }, {
            key: this.getContentKey(box_plot_1.BOX_PLOT_TOOLTIP_KEYS.Q3),
            value: this.getContentValue(box_plot_1.BOX_PLOT_TOOLTIP_KEYS.Q3)
        }, {
            key: this.getContentKey(box_plot_1.BOX_PLOT_TOOLTIP_KEYS.MEDIAN),
            value: this.getContentValue(box_plot_1.BOX_PLOT_TOOLTIP_KEYS.MEDIAN)
        }, {
            key: this.getContentKey(box_plot_1.BOX_PLOT_TOOLTIP_KEYS.Q1),
            value: this.getContentValue(box_plot_1.BOX_PLOT_TOOLTIP_KEYS.Q1)
        }, {
            key: this.getContentKey(box_plot_1.BOX_PLOT_TOOLTIP_KEYS.MIN),
            value: this.getContentValue(box_plot_1.BOX_PLOT_TOOLTIP_KEYS.MIN)
        }, {
            key: this.getContentKey(box_plot_1.BOX_PLOT_TOOLTIP_KEYS.SERIES_FIELD),
            value: this.getContentValue(box_plot_1.BOX_PLOT_TOOLTIP_KEYS.SERIES_FIELD)
        } ];
    }
}

exports.BoxPlotSeriesTooltipHelper = BoxPlotSeriesTooltipHelper;
//# sourceMappingURL=tooltip-helper.js.map
