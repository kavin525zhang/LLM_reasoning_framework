"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.PictogramSeriesSpecTransformer = void 0;

const vutils_1 = require("@visactor/vutils"), base_1 = require("../base"), svg_source_1 = require("./svg-source");

class PictogramSeriesSpecTransformer extends base_1.BaseSeriesSpecTransformer {
    _getDefaultSpecFromChart(chartSpec) {
        var _a, _b, _c;
        const spec = null !== (_a = super._getDefaultSpecFromChart(chartSpec)) && void 0 !== _a ? _a : {}, svg = chartSpec.svg, elements = null === (_c = null === (_b = svg_source_1.svgSourceMap.get(svg)) || void 0 === _b ? void 0 : _b.latestData) || void 0 === _c ? void 0 : _c.elements;
        if (elements && elements.length) {
            elements.map((e => e.name)).filter((n => (0, vutils_1.isValid)(n))).forEach((name => {
                chartSpec[name] && (spec[name] = chartSpec[name]);
            }));
        }
        return spec;
    }
}

exports.PictogramSeriesSpecTransformer = PictogramSeriesSpecTransformer;
//# sourceMappingURL=pictogram-transformer.js.map
