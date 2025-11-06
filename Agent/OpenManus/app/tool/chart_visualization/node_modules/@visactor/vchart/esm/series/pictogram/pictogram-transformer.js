import { isValid } from "@visactor/vutils";

import { BaseSeriesSpecTransformer } from "../base";

import { svgSourceMap } from "./svg-source";

export class PictogramSeriesSpecTransformer extends BaseSeriesSpecTransformer {
    _getDefaultSpecFromChart(chartSpec) {
        var _a, _b, _c;
        const spec = null !== (_a = super._getDefaultSpecFromChart(chartSpec)) && void 0 !== _a ? _a : {}, svg = chartSpec.svg, elements = null === (_c = null === (_b = svgSourceMap.get(svg)) || void 0 === _b ? void 0 : _b.latestData) || void 0 === _c ? void 0 : _c.elements;
        if (elements && elements.length) {
            elements.map((e => e.name)).filter((n => isValid(n))).forEach((name => {
                chartSpec[name] && (spec[name] = chartSpec[name]);
            }));
        }
        return spec;
    }
}
//# sourceMappingURL=pictogram-transformer.js.map
