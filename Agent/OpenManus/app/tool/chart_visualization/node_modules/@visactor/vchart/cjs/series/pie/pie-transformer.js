"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.PieSeriesSpecTransformer = void 0;

const vutils_1 = require("@visactor/vutils"), vutils_extension_1 = require("@visactor/vutils-extension"), base_1 = require("../base");

class PieSeriesSpecTransformer extends base_1.BaseSeriesSpecTransformer {
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "pie");
    }
    _mergeThemeToSpec(spec, chartSpec) {
        const theme = this._theme;
        let newSpec = spec;
        if (this._shouldMergeThemeToSpec()) {
            const specFromChart = this._getDefaultSpecFromChart(chartSpec);
            newSpec = (0, vutils_extension_1.mergeSpec)({}, this._theme, specFromChart, spec);
            const getMergedLabelSpec = (position, label) => "inside" === position || "inside-center" === position ? (0, 
            vutils_extension_1.mergeSpec)({}, this._theme.innerLabel, label) : (0, vutils_extension_1.mergeSpec)({}, this._theme.outerLabel, label);
            (0, vutils_1.isArray)(newSpec.label) ? newSpec.label = newSpec.label.map((label => getMergedLabelSpec(label.position, label))) : newSpec.label = getMergedLabelSpec(newSpec.label.position, newSpec.label);
        }
        return {
            spec: newSpec,
            theme: theme
        };
    }
    _getDefaultSpecFromChart(chartSpec) {
        var _a;
        const spec = null !== (_a = super._getDefaultSpecFromChart(chartSpec)) && void 0 !== _a ? _a : {}, {centerX: centerX, centerY: centerY} = chartSpec;
        return (0, vutils_1.isValid)(centerX) && (spec.centerX = centerX), (0, vutils_1.isValid)(centerY) && (spec.centerY = centerY), 
        Object.keys(spec).length > 0 ? spec : void 0;
    }
}

exports.PieSeriesSpecTransformer = PieSeriesSpecTransformer;
//# sourceMappingURL=pie-transformer.js.map
