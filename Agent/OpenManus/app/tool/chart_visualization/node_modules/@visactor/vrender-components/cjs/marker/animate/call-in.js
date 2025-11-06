"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.pointCallIn = void 0;

const common_1 = require("./common");

function pointCallIn(itemLine, decorativeLine, item, duration, delay, easing) {
    var _a;
    const startSymbolDuration = .1 * duration, lineDuration = .65 * duration, decorativeDuration = .05 * duration, endSymbolDuration = .1 * duration, labelDuration = .1 * duration;
    (0, common_1.graphicFadeIn)(itemLine.startSymbol, delay, startSymbolDuration, easing), 
    itemLine.lines.forEach((line => line.setAttribute("clipRange", 0))), itemLine.lines.forEach(((l, index) => {
        const stepDuration = lineDuration / itemLine.lines.length;
        l.animate().wait(delay + startSymbolDuration + index * stepDuration).to({
            clipRange: 1
        }, stepDuration, easing);
    })), (0, common_1.graphicFadeIn)(decorativeLine, delay + startSymbolDuration + lineDuration, decorativeDuration, easing), 
    (0, common_1.graphicFadeIn)(itemLine.endSymbol, delay + startSymbolDuration + lineDuration + decorativeDuration, endSymbolDuration, easing), 
    (null === (_a = item.getTextShape) || void 0 === _a ? void 0 : _a.call(item)) ? ((0, 
    common_1.graphicFadeIn)(item.getTextShape(), delay + startSymbolDuration + lineDuration + decorativeDuration + endSymbolDuration, labelDuration, easing), 
    (0, common_1.graphicFadeIn)(item.getBgRect(), delay + startSymbolDuration + lineDuration + endSymbolDuration, labelDuration, easing)) : (0, 
    common_1.graphicFadeIn)(item, delay + startSymbolDuration + lineDuration + endSymbolDuration, labelDuration, easing);
}

exports.pointCallIn = pointCallIn;
//# sourceMappingURL=call-in.js.map
