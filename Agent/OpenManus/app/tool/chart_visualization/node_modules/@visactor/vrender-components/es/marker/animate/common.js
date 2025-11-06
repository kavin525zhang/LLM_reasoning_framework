export function graphicFadeIn(graphic, delay, duration, easing) {
    var _a, _b, _c, _d, _e;
    if (!graphic) return;
    null === (_a = null == graphic ? void 0 : graphic.animates) || void 0 === _a || _a.forEach((a => a.stop("end")));
    const fillOpacityConfig = null !== (_c = null === (_b = graphic.attribute) || void 0 === _b ? void 0 : _b.fillOpacity) && void 0 !== _c ? _c : 1, strokeOpacityConfig = null !== (_e = null === (_d = graphic.attribute) || void 0 === _d ? void 0 : _d.strokeOpacity) && void 0 !== _e ? _e : 1;
    graphic.setAttributes({
        fillOpacity: 0,
        strokeOpacity: 0
    }), graphic.animate().wait(delay).to({
        fillOpacity: fillOpacityConfig,
        strokeOpacity: strokeOpacityConfig
    }, duration, easing);
}

export function segmentFadeIn(segment, delay, duration, easing) {
    segment && (graphicFadeIn(segment.startSymbol, delay, duration, easing), segment.lines.forEach((line => graphicFadeIn(line, delay, duration, easing))), 
    graphicFadeIn(segment.line, delay, duration, easing), graphicFadeIn(segment.endSymbol, delay, duration, easing));
}

export function tagFadeIn(tag, delay, duration, easing) {
    tag && (graphicFadeIn(tag.getTextShape(), delay, duration, easing), graphicFadeIn(tag.getBgRect(), delay, duration, easing));
}

export function graphicFadeOut(graphic, delay, duration, easing) {
    var _a, _b, _c, _d;
    graphic && (graphic.setAttributes({
        fillOpacity: null !== (_b = null === (_a = graphic.attribute) || void 0 === _a ? void 0 : _a.fillOpacity) && void 0 !== _b ? _b : 1,
        strokeOpacity: null !== (_d = null === (_c = graphic.attribute) || void 0 === _c ? void 0 : _c.strokeOpacity) && void 0 !== _d ? _d : 1
    }), graphic.animate().wait(delay).to({
        fillOpacity: 0,
        strokeOpacity: 0
    }, duration, easing));
}

export function segmentFadeOut(segment, delay, duration, easing) {
    segment && (graphicFadeOut(segment.startSymbol, delay, duration, easing), segment.lines.forEach((line => graphicFadeOut(line, delay, duration, easing))), 
    graphicFadeOut(segment.line, delay, duration, easing), graphicFadeOut(segment.endSymbol, delay, duration, easing));
}

export function tagFadeOut(tag, delay, duration, easing) {
    tag && (graphicFadeOut(tag.getTextShape(), delay, duration, easing), graphicFadeOut(tag.getBgRect(), delay, duration, easing));
}
//# sourceMappingURL=common.js.map
