"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.isSpecValueWithScale = exports.isValueInScaleDomain = exports.valueInScaleRange = exports.createScaleWithSpec = exports.createScale = void 0;

const vutils_1 = require("@visactor/vutils"), vscale_1 = require("@visactor/vscale"), color_ordinal_scale_1 = require("../scale/color-ordinal-scale"), defaultScaleMap = {
    linear: vscale_1.LinearScale,
    band: vscale_1.BandScale,
    point: vscale_1.PointScale,
    ordinal: vscale_1.OrdinalScale,
    threshold: vscale_1.ThresholdScale,
    colorOrdinal: color_ordinal_scale_1.ColorOrdinalScale
};

function createScale(type) {
    const scaleConstructor = defaultScaleMap[type];
    return scaleConstructor ? new scaleConstructor : null;
}

function createScaleWithSpec(spec, context) {
    if ("scale" in spec && spec.scale) return (0, vutils_1.isString)(spec.scale) && (null == context ? void 0 : context.globalScale) ? context.globalScale.registerMarkAttributeScale(spec, context.seriesId) : spec.scale;
    const scale = createScale(spec.type);
    return scale && initScaleWithSpec(scale, spec), scale;
}

function initScaleWithSpec(scale, spec) {
    scale && spec && (spec.domain && scale.domain(spec.domain), spec.range && scale.range(spec.range), 
    spec.specified && scale.specified && scale.specified(spec.specified), spec.clamp && scale.clamp && scale.clamp(spec.clamp));
}

function valueInScaleRange(v, s, useWholeRange) {
    if (!s) return v;
    const scaleRange = s.range(), range = useWholeRange && s._calculateWholeRange ? s._calculateWholeRange(scaleRange) : s.range(), min = Math.min(range[0], range[range.length - 1]), max = Math.max(range[0], range[range.length - 1]);
    return Math.min(Math.max(min, v), max);
}

function isValueInScaleDomain(v, s, useWholeRange) {
    if (!s) return !0;
    const scaleRange = s.range(), domain = (useWholeRange && s._calculateWholeRange ? s._calculateWholeRange(scaleRange) : s.range()).map((v => s.invert(v))), min = Math.min(domain[0], domain[domain.length - 1]), max = Math.max(domain[0], domain[domain.length - 1]);
    return Array.isArray(v) ? v.every((v => v >= min && v <= max)) : v >= min && v <= max;
}

function isSpecValueWithScale(specValue) {
    return (0, vutils_1.isValid)(null == specValue ? void 0 : specValue.field) && (0, 
    vutils_1.isValid)(null == specValue ? void 0 : specValue.scale);
}

exports.createScale = createScale, exports.createScaleWithSpec = createScaleWithSpec, 
exports.valueInScaleRange = valueInScaleRange, exports.isValueInScaleDomain = isValueInScaleDomain, 
exports.isSpecValueWithScale = isSpecValueWithScale;
//# sourceMappingURL=scale.js.map
