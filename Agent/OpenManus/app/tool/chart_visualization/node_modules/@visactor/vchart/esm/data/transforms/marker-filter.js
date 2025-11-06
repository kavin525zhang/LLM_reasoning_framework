export function markerFilter(data, options) {
    if (options && options.getRelativeSeries) {
        const series = options.getRelativeSeries();
        if (series) {
            const viewData = series.getViewData();
            return viewData && viewData.latestData && viewData.latestData.length ? data : [];
        }
    }
    return data;
}
//# sourceMappingURL=marker-filter.js.map
