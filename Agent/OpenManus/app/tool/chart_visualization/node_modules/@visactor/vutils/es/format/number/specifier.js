import { Logger } from "../../logger";

export class FormatSpecifier {
    constructor(specifier = {}) {
        this.fill = void 0 === specifier.fill ? " " : specifier.fill + "", this.align = void 0 === specifier.align ? ">" : specifier.align + "", 
        this.sign = void 0 === specifier.sign ? "-" : specifier.sign + "", this.symbol = void 0 === specifier.symbol ? "" : specifier.symbol + "", 
        this.zero = !!specifier.zero, this.width = void 0 === specifier.width ? void 0 : +specifier.width, 
        this.comma = !!specifier.comma, this.precision = void 0 === specifier.precision ? void 0 : +specifier.precision, 
        this.trim = !!specifier.trim, this.type = void 0 === specifier.type ? "" : specifier.type + "";
    }
    toString() {
        return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (void 0 === this.width ? "" : Math.max(1, 0 | this.width)) + (this.comma ? "," : "") + (void 0 === this.precision ? "" : "." + Math.max(0, 0 | this.precision)) + (this.trim ? "~" : "") + this.type;
    }
}

export const numberSpecifierReg = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

export function formatSpecifier(specifier) {
    let match;
    if (match = numberSpecifierReg.exec(specifier)) return new FormatSpecifier({
        fill: match[1],
        align: match[2],
        sign: match[3],
        symbol: match[4],
        zero: match[5],
        width: match[6],
        comma: match[7],
        precision: match[8] && match[8].slice(1),
        trim: match[9],
        type: match[10]
    });
    Logger.getInstance().error("invalid format: " + specifier);
}
//# sourceMappingURL=specifier.js.map
