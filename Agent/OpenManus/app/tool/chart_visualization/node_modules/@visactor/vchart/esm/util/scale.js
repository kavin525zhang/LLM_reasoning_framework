import { isString, isValid } from "@visactor/vutils";

import { BandScale, LinearScale, OrdinalScale, PointScale, ThresholdScale } from "@visactor/vscale";

import { ColorOrdinalScale } from "../scale/color-ordinal-scale";

const defaultScaleMap = {
    linear: LinearScale,
    band: BandScale,
    point: PointScale,
    ordinal: OrdinalScale,
    threshold: ThresholdScale,
    colorOrdinal: ColorOrdinalScale
};

export function createScale(type) {
    const scaleConstructor = defaultScaleMap[type];
    return scaleConstructor ? new scaleConstructor : null;
}

export function createScaleWithSpec(spec, context) {
    if ("scale" in spec && spec.scale) return isString(spec.scale) && (null == context ? void 0 : context.globalScale) ? context.globalScale.registerMarkAttributeScale(spec, context.seriesId) : spec.scale;
    const scale = createScale(spec.type);
    return scale && initScaleWithSpec(scale, spec), scale;
}

function initScaleWithSpec(scale, spec) {
    scale && spec && (spec.domain && scale.domain(spec.domain), spec.range && scale.range(spec.range), 
    spec.specified && scale.specified && scale.specified(spec.specified), spec.clamp && scale.clamp && scale.clamp(spec.clamp));
}

export function valueInScaleRange(v, s, useWholeRange) {
    if (!s) return v;
    const scaleRange = s.range(), range = useWholeRange && s._calculateWholeRange ? s._calculateWholeRange(scaleRange) : s.range(), min = Math.min(range[0], range[range.length - 1]), max = Math.max(range[0], range[range.length - 1]);
    return Math.min(Math.max(min, v), max);
}

export function isValueInScaleDomain(v, s, useWholeRange) {
    if (!s) return !0;
    const scaleRange = s.range(), domain = (useWholeRange && s._calculateWholeRange ? s._calculateWholeRange(scaleRange) : s.range()).map((v => s.invert(v))), min = Math.min(domain[0], domain[domain.length - 1]), max = Math.max(domain[0], domain[domain.length - 1]);
    return Array.isArray(v) ? v.every((v => v >= min && v <= max)) : v >= min && v <= max;
}

export function isSpecValueWithScale(specValue) {
    return isValid(null == specValue ? void 0 : specValue.field) && isValid(null == specValue ? void 0 : specValue.scale);
}
//# sourceMappingURL=scale.js.map
