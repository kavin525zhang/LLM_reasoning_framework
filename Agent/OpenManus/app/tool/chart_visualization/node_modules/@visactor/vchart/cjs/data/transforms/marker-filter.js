"use strict";

function markerFilter(data, options) {
    if (options && options.getRelativeSeries) {
        const series = options.getRelativeSeries();
        if (series) {
            const viewData = series.getViewData();
            return viewData && viewData.latestData && viewData.latestData.length ? data : [];
        }
    }
    return data;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.markerFilter = void 0, exports.markerFilter = markerFilter;
//# sourceMappingURL=marker-filter.js.map
