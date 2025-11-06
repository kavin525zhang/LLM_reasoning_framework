"use strict";

function formatGroup(grouping, thousands) {
    return function(value, width) {
        let i = value.length;
        const t = [];
        let j = 0, g = grouping[0], length = 0;
        for (;i > 0 && g > 0 && (length + g + 1 > width && (g = Math.max(1, width - length)), 
        t.push(value.substring(i -= g, i + g)), !((length += g + 1) > width)); ) g = grouping[j = (j + 1) % grouping.length];
        return t.reverse().join(thousands);
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.formatGroup = void 0, exports.formatGroup = formatGroup;
//# sourceMappingURL=formatGroup.js.map
