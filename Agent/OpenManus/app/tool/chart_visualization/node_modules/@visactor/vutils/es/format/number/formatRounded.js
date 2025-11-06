import { formatDecimalParts } from "./formatDecimal";

export function formatRounded(x, p) {
    const d = formatDecimalParts(x, p);
    if (!d) return x + "";
    const coefficient = d[0], exponent = d[1];
    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}
//# sourceMappingURL=formatRounded.js.map
