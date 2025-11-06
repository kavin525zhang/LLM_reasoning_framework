import { isArray, isValid } from "@visactor/vutils";

import { mergeSpec } from "@visactor/vutils-extension";

import { BaseSeriesSpecTransformer } from "../base";

export class PieSeriesSpecTransformer extends BaseSeriesSpecTransformer {
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "pie");
    }
    _mergeThemeToSpec(spec, chartSpec) {
        const theme = this._theme;
        let newSpec = spec;
        if (this._shouldMergeThemeToSpec()) {
            const specFromChart = this._getDefaultSpecFromChart(chartSpec);
            newSpec = mergeSpec({}, this._theme, specFromChart, spec);
            const getMergedLabelSpec = (position, label) => mergeSpec({}, "inside" === position || "inside-center" === position ? this._theme.innerLabel : this._theme.outerLabel, label);
            isArray(newSpec.label) ? newSpec.label = newSpec.label.map((label => getMergedLabelSpec(label.position, label))) : newSpec.label = getMergedLabelSpec(newSpec.label.position, newSpec.label);
        }
        return {
            spec: newSpec,
            theme: theme
        };
    }
    _getDefaultSpecFromChart(chartSpec) {
        var _a;
        const spec = null !== (_a = super._getDefaultSpecFromChart(chartSpec)) && void 0 !== _a ? _a : {}, {centerX: centerX, centerY: centerY} = chartSpec;
        return isValid(centerX) && (spec.centerX = centerX), isValid(centerY) && (spec.centerY = centerY), 
        Object.keys(spec).length > 0 ? spec : void 0;
    }
}
//# sourceMappingURL=pie-transformer.js.map
