"use strict";

function formatTrim(s) {
    const n = s.length;
    let i1, i0 = -1;
    out: for (let i = 1; i < n; ++i) switch (s[i]) {
      case ".":
        i0 = i1 = i;
        break;

      case "0":
        0 === i0 && (i0 = i), i1 = i;
        break;

      default:
        if (!+s[i]) break out;
        i0 > 0 && (i0 = 0);
    }
    return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.formatTrim = void 0, exports.formatTrim = formatTrim;
//# sourceMappingURL=formatTrim.js.map
