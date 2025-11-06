"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
    void 0 === k2 && (k2 = k);
    var desc = Object.getOwnPropertyDescriptor(m, k);
    desc && !("get" in desc ? !m.__esModule : desc.writable || desc.configurable) || (desc = {
        enumerable: !0,
        get: function() {
            return m[k];
        }
    }), Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    void 0 === k2 && (k2 = k), o[k2] = m[k];
}), __exportStar = this && this.__exportStar || function(m, exports) {
    for (var p in m) "default" === p || Object.prototype.hasOwnProperty.call(exports, p) || __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerElementHighlight = exports.registerGridLayout = exports.registerPoptip = exports.registerMapLabel = exports.registerCustomMark = exports.registerBrush = exports.registerTotalLabel = exports.registerPlayer = exports.registerTitle = exports.registerGeoMarkPoint = exports.registerPolarMarkPoint = exports.registerPolarMarkArea = exports.registerPolarMarkLine = exports.registerMarkPoint = exports.registerMarkArea = exports.registerMarkLine = exports.registerGeoCoordinate = exports.registerIndicator = exports.registerScrollBar = exports.registerDataZoom = exports.registerPolarCrossHair = exports.registerContinuousLegend = exports.registerPolarLinearAxis = exports.registerPolarBandAxis = exports.registerCartesianSymlogAxis = exports.registerCartesianLogAxis = exports.registerCartesianTimeAxis = exports.registerCorrelationChart = exports.registerHeatmapChart = exports.registerSankeyChart = exports.registerTreemapChart = exports.registerCirclePackingChart = exports.registerSunburstChart = exports.registerRangeAreaChart = exports.registerRangeColumnChart = exports.registerLinearProgressChart = exports.registerCircularProgressChart = exports.registerBoxplotChart = exports.registerWaterfallChart = exports.registerFunnelChart = exports.registerWordCloudChart = exports.registerGaugeChart = exports.registerMapChart = exports.registerHistogramChart = exports.registerRadarChart = exports.registerRoseChart = exports.registerScatterChart = exports.registerAnimate = exports.DefaultTicker = exports.VChart = void 0, 
exports.registerElementSelect = void 0;

const core_1 = require("./core");

Object.defineProperty(exports, "VChart", {
    enumerable: !0,
    get: function() {
        return core_1.VChart;
    }
});

const env_1 = require("./env"), line_1 = require("./chart/line"), area_1 = require("./chart/area"), bar_1 = require("./chart/bar"), scatter_1 = require("./chart/scatter");

Object.defineProperty(exports, "registerScatterChart", {
    enumerable: !0,
    get: function() {
        return scatter_1.registerScatterChart;
    }
});

const map_1 = require("./chart/map");

Object.defineProperty(exports, "registerMapChart", {
    enumerable: !0,
    get: function() {
        return map_1.registerMapChart;
    }
});

const pie_1 = require("./chart/pie"), rose_1 = require("./chart/rose");

Object.defineProperty(exports, "registerRoseChart", {
    enumerable: !0,
    get: function() {
        return rose_1.registerRoseChart;
    }
});

const radar_1 = require("./chart/radar");

Object.defineProperty(exports, "registerRadarChart", {
    enumerable: !0,
    get: function() {
        return radar_1.registerRadarChart;
    }
});

const common_1 = require("./chart/common"), histogram_1 = require("./chart/histogram");

Object.defineProperty(exports, "registerHistogramChart", {
    enumerable: !0,
    get: function() {
        return histogram_1.registerHistogramChart;
    }
});

const circular_1 = require("./chart/progress/circular");

Object.defineProperty(exports, "registerCircularProgressChart", {
    enumerable: !0,
    get: function() {
        return circular_1.registerCircularProgressChart;
    }
});

const gauge_1 = require("./chart/gauge");

Object.defineProperty(exports, "registerGaugeChart", {
    enumerable: !0,
    get: function() {
        return gauge_1.registerGaugeChart;
    }
});

const word_cloud_1 = require("./chart/word-cloud");

Object.defineProperty(exports, "registerWordCloudChart", {
    enumerable: !0,
    get: function() {
        return word_cloud_1.registerWordCloudChart;
    }
});

const funnel_1 = require("./chart/funnel");

Object.defineProperty(exports, "registerFunnelChart", {
    enumerable: !0,
    get: function() {
        return funnel_1.registerFunnelChart;
    }
});

const linear_1 = require("./chart/progress/linear");

Object.defineProperty(exports, "registerLinearProgressChart", {
    enumerable: !0,
    get: function() {
        return linear_1.registerLinearProgressChart;
    }
});

const range_column_1 = require("./chart/range-column");

Object.defineProperty(exports, "registerRangeColumnChart", {
    enumerable: !0,
    get: function() {
        return range_column_1.registerRangeColumnChart;
    }
});

const sunburst_1 = require("./chart/sunburst");

Object.defineProperty(exports, "registerSunburstChart", {
    enumerable: !0,
    get: function() {
        return sunburst_1.registerSunburstChart;
    }
});

const circle_packing_1 = require("./chart/circle-packing");

Object.defineProperty(exports, "registerCirclePackingChart", {
    enumerable: !0,
    get: function() {
        return circle_packing_1.registerCirclePackingChart;
    }
});

const treemap_1 = require("./chart/treemap");

Object.defineProperty(exports, "registerTreemapChart", {
    enumerable: !0,
    get: function() {
        return treemap_1.registerTreemapChart;
    }
});

const waterfall_1 = require("./chart/waterfall");

Object.defineProperty(exports, "registerWaterfallChart", {
    enumerable: !0,
    get: function() {
        return waterfall_1.registerWaterfallChart;
    }
});

const box_plot_1 = require("./chart/box-plot");

Object.defineProperty(exports, "registerBoxplotChart", {
    enumerable: !0,
    get: function() {
        return box_plot_1.registerBoxplotChart;
    }
});

const sankey_1 = require("./chart/sankey");

Object.defineProperty(exports, "registerSankeyChart", {
    enumerable: !0,
    get: function() {
        return sankey_1.registerSankeyChart;
    }
});

const range_area_1 = require("./chart/range-area");

Object.defineProperty(exports, "registerRangeAreaChart", {
    enumerable: !0,
    get: function() {
        return range_area_1.registerRangeAreaChart;
    }
});

const heatmap_1 = require("./chart/heatmap");

Object.defineProperty(exports, "registerHeatmapChart", {
    enumerable: !0,
    get: function() {
        return heatmap_1.registerHeatmapChart;
    }
});

const correlation_1 = require("./chart/correlation");

Object.defineProperty(exports, "registerCorrelationChart", {
    enumerable: !0,
    get: function() {
        return correlation_1.registerCorrelationChart;
    }
});

const cartesian_1 = require("./component/axis/cartesian");

Object.defineProperty(exports, "registerCartesianLogAxis", {
    enumerable: !0,
    get: function() {
        return cartesian_1.registerCartesianLogAxis;
    }
}), Object.defineProperty(exports, "registerCartesianSymlogAxis", {
    enumerable: !0,
    get: function() {
        return cartesian_1.registerCartesianSymlogAxis;
    }
}), Object.defineProperty(exports, "registerCartesianTimeAxis", {
    enumerable: !0,
    get: function() {
        return cartesian_1.registerCartesianTimeAxis;
    }
});

const polar_1 = require("./component/axis/polar");

Object.defineProperty(exports, "registerPolarBandAxis", {
    enumerable: !0,
    get: function() {
        return polar_1.registerPolarBandAxis;
    }
}), Object.defineProperty(exports, "registerPolarLinearAxis", {
    enumerable: !0,
    get: function() {
        return polar_1.registerPolarLinearAxis;
    }
});

const legend_1 = require("./component/legend");

Object.defineProperty(exports, "registerContinuousLegend", {
    enumerable: !0,
    get: function() {
        return legend_1.registerContinuousLegend;
    }
});

const tooltip_1 = require("./component/tooltip"), crosshair_1 = require("./component/crosshair");

Object.defineProperty(exports, "registerPolarCrossHair", {
    enumerable: !0,
    get: function() {
        return crosshair_1.registerPolarCrossHair;
    }
});

const data_zoom_1 = require("./component/data-zoom");

Object.defineProperty(exports, "registerDataZoom", {
    enumerable: !0,
    get: function() {
        return data_zoom_1.registerDataZoom;
    }
}), Object.defineProperty(exports, "registerScrollBar", {
    enumerable: !0,
    get: function() {
        return data_zoom_1.registerScrollBar;
    }
});

const indicator_1 = require("./component/indicator");

Object.defineProperty(exports, "registerIndicator", {
    enumerable: !0,
    get: function() {
        return indicator_1.registerIndicator;
    }
});

const geo_1 = require("./component/geo");

Object.defineProperty(exports, "registerGeoCoordinate", {
    enumerable: !0,
    get: function() {
        return geo_1.registerGeoCoordinate;
    }
});

const mark_line_1 = require("./component/marker/mark-line");

Object.defineProperty(exports, "registerMarkLine", {
    enumerable: !0,
    get: function() {
        return mark_line_1.registerMarkLine;
    }
}), Object.defineProperty(exports, "registerPolarMarkLine", {
    enumerable: !0,
    get: function() {
        return mark_line_1.registerPolarMarkLine;
    }
});

const title_1 = require("./component/title");

Object.defineProperty(exports, "registerTitle", {
    enumerable: !0,
    get: function() {
        return title_1.registerTitle;
    }
});

const mark_area_1 = require("./component/marker/mark-area");

Object.defineProperty(exports, "registerMarkArea", {
    enumerable: !0,
    get: function() {
        return mark_area_1.registerMarkArea;
    }
}), Object.defineProperty(exports, "registerPolarMarkArea", {
    enumerable: !0,
    get: function() {
        return mark_area_1.registerPolarMarkArea;
    }
});

const player_1 = require("./component/player");

Object.defineProperty(exports, "registerPlayer", {
    enumerable: !0,
    get: function() {
        return player_1.registerPlayer;
    }
});

const label_1 = require("./component/label"), total_label_1 = require("./component/label/total-label");

Object.defineProperty(exports, "registerTotalLabel", {
    enumerable: !0,
    get: function() {
        return total_label_1.registerTotalLabel;
    }
});

const mark_point_1 = require("./component/marker/mark-point");

Object.defineProperty(exports, "registerMarkPoint", {
    enumerable: !0,
    get: function() {
        return mark_point_1.registerMarkPoint;
    }
}), Object.defineProperty(exports, "registerPolarMarkPoint", {
    enumerable: !0,
    get: function() {
        return mark_point_1.registerPolarMarkPoint;
    }
}), Object.defineProperty(exports, "registerGeoMarkPoint", {
    enumerable: !0,
    get: function() {
        return mark_point_1.registerGeoMarkPoint;
    }
});

const brush_1 = require("./component/brush");

Object.defineProperty(exports, "registerBrush", {
    enumerable: !0,
    get: function() {
        return brush_1.registerBrush;
    }
});

const custom_mark_1 = require("./component/custom-mark");

Object.defineProperty(exports, "registerCustomMark", {
    enumerable: !0,
    get: function() {
        return custom_mark_1.registerCustomMark;
    }
});

const map_label_1 = require("./component/map-label");

Object.defineProperty(exports, "registerMapLabel", {
    enumerable: !0,
    get: function() {
        return map_label_1.registerMapLabel;
    }
});

const grid_layout_1 = require("./layout/grid-layout/grid-layout");

Object.defineProperty(exports, "registerGridLayout", {
    enumerable: !0,
    get: function() {
        return grid_layout_1.registerGridLayout;
    }
});

const poptip_1 = require("./component/poptip");

Object.defineProperty(exports, "registerPoptip", {
    enumerable: !0,
    get: function() {
        return poptip_1.registerPoptip;
    }
});

const tooltip_handler_1 = require("./plugin/components/tooltip-handler"), vgrammar_core_1 = require("@visactor/vgrammar-core");

Object.defineProperty(exports, "registerElementHighlight", {
    enumerable: !0,
    get: function() {
        return vgrammar_core_1.registerElementHighlight;
    }
}), Object.defineProperty(exports, "registerElementSelect", {
    enumerable: !0,
    get: function() {
        return vgrammar_core_1.registerElementSelect;
    }
});

const vrender_core_1 = require("@visactor/vrender-core");

Object.defineProperty(exports, "DefaultTicker", {
    enumerable: !0,
    get: function() {
        return vrender_core_1.DefaultTicker;
    }
});

const other_1 = require("./plugin/other");

Object.defineProperty(exports, "registerAnimate", {
    enumerable: !0,
    get: function() {
        return other_1.registerAnimate;
    }
}), core_1.VChart.useRegisters([ line_1.registerLineChart, area_1.registerAreaChart, bar_1.registerBarChart, pie_1.registerPieChart, common_1.registerCommonChart, cartesian_1.registerCartesianLinearAxis, cartesian_1.registerCartesianBandAxis, legend_1.registerDiscreteLegend, tooltip_1.registerTooltip, crosshair_1.registerCartesianCrossHair, label_1.registerLabel, tooltip_handler_1.registerCanvasTooltipHandler ]), 
core_1.VChart.useRegisters([ env_1.registerHarmonyEnv ]), exports.default = core_1.VChart, 
__exportStar(require("./core"), exports), __exportStar(require("./plugin/chart"), exports), 
__exportStar(require("./plugin/components/tooltip-handler"), exports), __exportStar(require("./plugin/components/axis-sync"), exports);
//# sourceMappingURL=index-harmony-simple.js.map