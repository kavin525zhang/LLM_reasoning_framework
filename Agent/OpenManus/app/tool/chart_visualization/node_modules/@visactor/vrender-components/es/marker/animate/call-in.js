import { graphicFadeIn } from "./common";

export function pointCallIn(itemLine, decorativeLine, item, duration, delay, easing) {
    var _a;
    const startSymbolDuration = .1 * duration, lineDuration = .65 * duration, decorativeDuration = .05 * duration, endSymbolDuration = .1 * duration, labelDuration = .1 * duration;
    graphicFadeIn(itemLine.startSymbol, delay, startSymbolDuration, easing), itemLine.lines.forEach((line => line.setAttribute("clipRange", 0))), 
    itemLine.lines.forEach(((l, index) => {
        const stepDuration = lineDuration / itemLine.lines.length;
        l.animate().wait(delay + startSymbolDuration + index * stepDuration).to({
            clipRange: 1
        }, stepDuration, easing);
    })), graphicFadeIn(decorativeLine, delay + startSymbolDuration + lineDuration, decorativeDuration, easing), 
    graphicFadeIn(itemLine.endSymbol, delay + startSymbolDuration + lineDuration + decorativeDuration, endSymbolDuration, easing), 
    (null === (_a = item.getTextShape) || void 0 === _a ? void 0 : _a.call(item)) ? (graphicFadeIn(item.getTextShape(), delay + startSymbolDuration + lineDuration + decorativeDuration + endSymbolDuration, labelDuration, easing), 
    graphicFadeIn(item.getBgRect(), delay + startSymbolDuration + lineDuration + endSymbolDuration, labelDuration, easing)) : graphicFadeIn(item, delay + startSymbolDuration + lineDuration + endSymbolDuration, labelDuration, easing);
}
//# sourceMappingURL=call-in.js.map
