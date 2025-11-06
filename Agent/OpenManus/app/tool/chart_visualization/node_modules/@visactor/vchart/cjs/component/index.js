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
}), exports.registerTotalLabel = exports.registerLabel = exports.registerIndicator = exports.registerGeoCoordinate = exports.registerDiscreteLegend = exports.registerDataZoom = exports.registerCustomMark = exports.registerContinuousLegend = exports.registerCartesianTimeAxis = exports.registerCartesianSymlogAxis = exports.registerCartesianLogAxis = exports.registerCartesianLinearAxis = exports.registerCartesianCrossHair = exports.registerCartesianBandAxis = exports.registerTooltip = exports.registerTitle = exports.registerScrollBar = exports.registerBrush = exports.TotalLabel = exports.Label = exports.Tooltip = exports.GeoMarkPoint = exports.PolarMarkPoint = exports.PolarMarkArea = exports.PolarMarkLine = exports.CartesianMarkPoint = exports.CartesianMarkArea = exports.CartesianMarkLine = exports.Player = exports.PolarCrossHair = exports.CartesianCrossHair = exports.GeoCoordinate = exports.Title = exports.Indicator = exports.ContinuousLegend = exports.DiscreteLegend = exports.PolarLinearAxis = exports.PolarBandAxis = exports.PolarAxis = exports.CartesianSymlogAxis = exports.CartesianLogAxis = exports.CartesianTimeAxis = exports.CartesianLinearAxis = exports.CartesianBandAxis = exports.CartesianAxis = exports.MapLabelComponent = exports.Brush = exports.CustomMark = exports.DataZoom = exports.ScrollBar = void 0, 
exports.registerPoptip = exports.registerPolarLinearAxis = exports.registerPolarCrossHair = exports.registerPolarBandAxis = exports.registerPlayer = exports.registerGeoMarkPoint = exports.registerPolarMarkPoint = exports.registerPolarMarkArea = exports.registerPolarMarkLine = exports.registerMarkPoint = exports.registerMarkArea = exports.registerMarkLine = exports.registerMapLabel = void 0;

const scroll_bar_1 = require("./data-zoom/scroll-bar/scroll-bar");

Object.defineProperty(exports, "ScrollBar", {
    enumerable: !0,
    get: function() {
        return scroll_bar_1.ScrollBar;
    }
}), Object.defineProperty(exports, "registerScrollBar", {
    enumerable: !0,
    get: function() {
        return scroll_bar_1.registerScrollBar;
    }
});

const data_zoom_1 = require("./data-zoom/data-zoom/data-zoom");

Object.defineProperty(exports, "DataZoom", {
    enumerable: !0,
    get: function() {
        return data_zoom_1.DataZoom;
    }
}), Object.defineProperty(exports, "registerDataZoom", {
    enumerable: !0,
    get: function() {
        return data_zoom_1.registerDataZoom;
    }
});

const custom_mark_1 = require("./custom-mark/custom-mark");

Object.defineProperty(exports, "CustomMark", {
    enumerable: !0,
    get: function() {
        return custom_mark_1.CustomMark;
    }
}), Object.defineProperty(exports, "registerCustomMark", {
    enumerable: !0,
    get: function() {
        return custom_mark_1.registerCustomMark;
    }
});

const brush_1 = require("./brush/brush");

Object.defineProperty(exports, "Brush", {
    enumerable: !0,
    get: function() {
        return brush_1.Brush;
    }
}), Object.defineProperty(exports, "registerBrush", {
    enumerable: !0,
    get: function() {
        return brush_1.registerBrush;
    }
});

const component_1 = require("./map-label/component");

Object.defineProperty(exports, "MapLabelComponent", {
    enumerable: !0,
    get: function() {
        return component_1.MapLabelComponent;
    }
}), Object.defineProperty(exports, "registerMapLabel", {
    enumerable: !0,
    get: function() {
        return component_1.registerMapLabel;
    }
});

const index_1 = require("./axis/cartesian/index");

Object.defineProperty(exports, "CartesianAxis", {
    enumerable: !0,
    get: function() {
        return index_1.CartesianAxis;
    }
}), Object.defineProperty(exports, "CartesianLinearAxis", {
    enumerable: !0,
    get: function() {
        return index_1.CartesianLinearAxis;
    }
}), Object.defineProperty(exports, "CartesianBandAxis", {
    enumerable: !0,
    get: function() {
        return index_1.CartesianBandAxis;
    }
}), Object.defineProperty(exports, "CartesianTimeAxis", {
    enumerable: !0,
    get: function() {
        return index_1.CartesianTimeAxis;
    }
}), Object.defineProperty(exports, "CartesianLogAxis", {
    enumerable: !0,
    get: function() {
        return index_1.CartesianLogAxis;
    }
}), Object.defineProperty(exports, "CartesianSymlogAxis", {
    enumerable: !0,
    get: function() {
        return index_1.CartesianSymlogAxis;
    }
}), Object.defineProperty(exports, "registerCartesianBandAxis", {
    enumerable: !0,
    get: function() {
        return index_1.registerCartesianBandAxis;
    }
}), Object.defineProperty(exports, "registerCartesianLinearAxis", {
    enumerable: !0,
    get: function() {
        return index_1.registerCartesianLinearAxis;
    }
}), Object.defineProperty(exports, "registerCartesianLogAxis", {
    enumerable: !0,
    get: function() {
        return index_1.registerCartesianLogAxis;
    }
}), Object.defineProperty(exports, "registerCartesianSymlogAxis", {
    enumerable: !0,
    get: function() {
        return index_1.registerCartesianSymlogAxis;
    }
}), Object.defineProperty(exports, "registerCartesianTimeAxis", {
    enumerable: !0,
    get: function() {
        return index_1.registerCartesianTimeAxis;
    }
});

const polar_1 = require("./axis/polar");

Object.defineProperty(exports, "PolarAxis", {
    enumerable: !0,
    get: function() {
        return polar_1.PolarAxis;
    }
}), Object.defineProperty(exports, "PolarBandAxis", {
    enumerable: !0,
    get: function() {
        return polar_1.PolarBandAxis;
    }
}), Object.defineProperty(exports, "PolarLinearAxis", {
    enumerable: !0,
    get: function() {
        return polar_1.PolarLinearAxis;
    }
}), Object.defineProperty(exports, "registerPolarBandAxis", {
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

const discrete_1 = require("./legend/discrete");

Object.defineProperty(exports, "DiscreteLegend", {
    enumerable: !0,
    get: function() {
        return discrete_1.DiscreteLegend;
    }
}), Object.defineProperty(exports, "registerDiscreteLegend", {
    enumerable: !0,
    get: function() {
        return discrete_1.registerDiscreteLegend;
    }
});

const continuous_1 = require("./legend/continuous");

Object.defineProperty(exports, "ContinuousLegend", {
    enumerable: !0,
    get: function() {
        return continuous_1.ContinuousLegend;
    }
}), Object.defineProperty(exports, "registerContinuousLegend", {
    enumerable: !0,
    get: function() {
        return continuous_1.registerContinuousLegend;
    }
});

const indicator_1 = require("./indicator");

Object.defineProperty(exports, "Indicator", {
    enumerable: !0,
    get: function() {
        return indicator_1.Indicator;
    }
}), Object.defineProperty(exports, "registerIndicator", {
    enumerable: !0,
    get: function() {
        return indicator_1.registerIndicator;
    }
});

const title_1 = require("./title");

Object.defineProperty(exports, "Title", {
    enumerable: !0,
    get: function() {
        return title_1.Title;
    }
}), Object.defineProperty(exports, "registerTitle", {
    enumerable: !0,
    get: function() {
        return title_1.registerTitle;
    }
});

const geo_1 = require("./geo");

Object.defineProperty(exports, "GeoCoordinate", {
    enumerable: !0,
    get: function() {
        return geo_1.GeoCoordinate;
    }
}), Object.defineProperty(exports, "registerGeoCoordinate", {
    enumerable: !0,
    get: function() {
        return geo_1.registerGeoCoordinate;
    }
});

const crosshair_1 = require("./crosshair");

Object.defineProperty(exports, "CartesianCrossHair", {
    enumerable: !0,
    get: function() {
        return crosshair_1.CartesianCrossHair;
    }
}), Object.defineProperty(exports, "PolarCrossHair", {
    enumerable: !0,
    get: function() {
        return crosshair_1.PolarCrossHair;
    }
}), Object.defineProperty(exports, "registerCartesianCrossHair", {
    enumerable: !0,
    get: function() {
        return crosshair_1.registerCartesianCrossHair;
    }
}), Object.defineProperty(exports, "registerPolarCrossHair", {
    enumerable: !0,
    get: function() {
        return crosshair_1.registerPolarCrossHair;
    }
});

const player_1 = require("./player");

Object.defineProperty(exports, "Player", {
    enumerable: !0,
    get: function() {
        return player_1.Player;
    }
}), Object.defineProperty(exports, "registerPlayer", {
    enumerable: !0,
    get: function() {
        return player_1.registerPlayer;
    }
});

const mark_line_1 = require("./marker/mark-line");

Object.defineProperty(exports, "CartesianMarkLine", {
    enumerable: !0,
    get: function() {
        return mark_line_1.CartesianMarkLine;
    }
}), Object.defineProperty(exports, "PolarMarkLine", {
    enumerable: !0,
    get: function() {
        return mark_line_1.PolarMarkLine;
    }
}), Object.defineProperty(exports, "registerMarkLine", {
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

const mark_area_1 = require("./marker/mark-area");

Object.defineProperty(exports, "CartesianMarkArea", {
    enumerable: !0,
    get: function() {
        return mark_area_1.CartesianMarkArea;
    }
}), Object.defineProperty(exports, "PolarMarkArea", {
    enumerable: !0,
    get: function() {
        return mark_area_1.PolarMarkArea;
    }
}), Object.defineProperty(exports, "registerMarkArea", {
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

const mark_point_1 = require("./marker/mark-point");

Object.defineProperty(exports, "CartesianMarkPoint", {
    enumerable: !0,
    get: function() {
        return mark_point_1.CartesianMarkPoint;
    }
}), Object.defineProperty(exports, "PolarMarkPoint", {
    enumerable: !0,
    get: function() {
        return mark_point_1.PolarMarkPoint;
    }
}), Object.defineProperty(exports, "GeoMarkPoint", {
    enumerable: !0,
    get: function() {
        return mark_point_1.GeoMarkPoint;
    }
}), Object.defineProperty(exports, "registerMarkPoint", {
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

const tooltip_1 = require("./tooltip");

Object.defineProperty(exports, "Tooltip", {
    enumerable: !0,
    get: function() {
        return tooltip_1.Tooltip;
    }
}), Object.defineProperty(exports, "registerTooltip", {
    enumerable: !0,
    get: function() {
        return tooltip_1.registerTooltip;
    }
});

const label_1 = require("./label");

Object.defineProperty(exports, "Label", {
    enumerable: !0,
    get: function() {
        return label_1.Label;
    }
}), Object.defineProperty(exports, "registerLabel", {
    enumerable: !0,
    get: function() {
        return label_1.registerLabel;
    }
});

const total_label_1 = require("./label/total-label");

Object.defineProperty(exports, "TotalLabel", {
    enumerable: !0,
    get: function() {
        return total_label_1.TotalLabel;
    }
}), Object.defineProperty(exports, "registerTotalLabel", {
    enumerable: !0,
    get: function() {
        return total_label_1.registerTotalLabel;
    }
});

const index_2 = require("./poptip/index");

Object.defineProperty(exports, "registerPoptip", {
    enumerable: !0,
    get: function() {
        return index_2.registerPoptip;
    }
}), __exportStar(require("./tooltip/interface"), exports);
//# sourceMappingURL=index.js.map