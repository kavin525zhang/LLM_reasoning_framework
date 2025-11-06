import { formatDecimal, formatDecimalParts } from "./formatDecimal";

import { formatGroup } from "./formatGroup";

import { formatPrefixAuto, prefixExponent } from "./formatPrefixAuto";

import { formatRounded } from "./formatRounded";

import { formatTrim } from "./formatTrim";

import { formatSpecifier } from "./specifier";

const prefixes = [ "y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y" ];

export class NumberUtil {
    constructor() {
        this.locale = {
            thousands: ",",
            grouping: [ 3 ],
            currency: [ "$", "" ]
        }, this.group = void 0 === this.locale.grouping || void 0 === this.locale.thousands ? group => group : formatGroup([ ...this.locale.grouping ].map(Number), `${this.locale.thousands}`), 
        this.currencyPrefix = void 0 === this.locale.currency ? "" : this.locale.currency[0] + "", 
        this.currencySuffix = void 0 === this.locale.currency ? "" : this.locale.currency[1] + "", 
        this.decimal = void 0 === this.locale.decimal ? "." : this.locale.decimal + "", 
        this.numerals = void 0 === this.locale.numerals ? numerals => numerals : formatNumerals([ ...this.locale.numerals ].map(String)), 
        this.percent = void 0 === this.locale.percent ? "%" : this.locale.percent + "", 
        this.minus = void 0 === this.locale.minus ? "−" : this.locale.minus + "", this.nan = void 0 === this.locale.nan ? "NaN" : this.locale.nan + "", 
        this.formatter = specifier => this.newFormat(specifier), this.format = (specifier, value) => this.formatter(specifier)(value), 
        this.formatPrefix = (specifier, value) => this._formatPrefix(specifier, value);
    }
    static getInstance() {
        return NumberUtil.instance || (NumberUtil.instance = new NumberUtil), NumberUtil.instance;
    }
    newFormat(specifier) {
        const specifierIns = formatSpecifier(specifier);
        let fill = specifierIns.fill, align = specifierIns.align;
        const sign = specifierIns.sign, symbol = specifierIns.symbol;
        let zero = specifierIns.zero;
        const width = specifierIns.width;
        let comma = specifierIns.comma, precision = specifierIns.precision, trim = specifierIns.trim, type = specifierIns.type;
        "n" === type ? (comma = !0, type = "g") : formatTypes[type] || (void 0 === precision && (precision = 12), 
        trim = !0, type = "g"), (zero || "0" === fill && "=" === align) && (zero = !0, fill = "0", 
        align = "=");
        const prefix = "$" === symbol ? this.currencyPrefix : "#" === symbol && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "", suffix = "$" === symbol ? this.currencySuffix : /[%p]/.test(type) ? this.percent : "", formatType = formatTypes[type], maybeSuffix = /[defgprstz%]/.test(type);
        precision = void 0 === precision ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
        const {nan: nan, minus: minus, decimal: decimal, group: group, numerals: numerals} = this;
        function format(value) {
            let i, n, c, valuePrefix = prefix, valueSuffix = suffix, _value = value;
            if ("c" === type) valueSuffix = formatType(_value) + valueSuffix, _value = ""; else {
                _value = +_value;
                let valueNegative = _value < 0 || 1 / _value < 0;
                if (_value = isNaN(_value) ? nan : formatType(Math.abs(_value), precision), trim && (_value = formatTrim(_value)), 
                valueNegative && 0 == +_value && "+" !== sign && (valueNegative = !1), valuePrefix = (valueNegative ? "(" === sign ? sign : minus : "-" === sign || "(" === sign ? "" : sign) + valuePrefix, 
                valueSuffix = ("s" === type ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && "(" === sign ? ")" : ""), 
                maybeSuffix) for (i = -1, n = _value.length; ++i < n; ) if (c = _value.charCodeAt(i), 
                48 > c || c > 57) {
                    valueSuffix = (46 === c ? decimal + _value.slice(i + 1) : _value.slice(i)) + valueSuffix, 
                    _value = _value.slice(0, i);
                    break;
                }
            }
            comma && !zero && (_value = group(_value, 1 / 0));
            let length = valuePrefix.length + _value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
            switch (comma && zero && (_value = group(padding + _value, padding.length ? width - valueSuffix.length : 1 / 0), 
            padding = ""), align) {
              case "<":
                _value = valuePrefix + _value + valueSuffix + padding;
                break;

              case "=":
                _value = valuePrefix + padding + _value + valueSuffix;
                break;

              case "^":
                _value = padding.slice(0, length = padding.length >> 1) + valuePrefix + _value + valueSuffix + padding.slice(length);
                break;

              default:
                _value = padding + valuePrefix + _value + valueSuffix;
            }
            return numerals(_value);
        }
        return format.toString = function() {
            return specifier + "";
        }, format;
    }
    _formatPrefix(specifier, value) {
        const _specifier = formatSpecifier(specifier);
        _specifier.type = "f";
        const f = this.newFormat(_specifier.toString()), e = 3 * Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))), k = Math.pow(10, -e), prefix = prefixes[8 + e / 3];
        return function(value) {
            return f(k * value) + prefix;
        };
    }
}

export const formatTypes = {
    "%": (x, p) => (100 * x).toFixed(p),
    b: x => Math.round(x).toString(2),
    c: x => x + "",
    d: formatDecimal,
    f: (x, p) => x.toFixed(p),
    e: (x, p) => x.toExponential(p),
    g: (x, p) => x.toPrecision(p),
    o: x => Math.round(x).toString(8),
    p: (x, p) => formatRounded(100 * x, p),
    r: formatRounded,
    s: formatPrefixAuto,
    X: x => Math.round(x).toString(16).toUpperCase(),
    x: x => Math.round(x).toString(16),
    t: (x, p) => Number.isInteger(x) ? x.toFixed(2) : Math.floor(x * Math.pow(10, p)) / Math.pow(10, p) + "",
    z: (x, p) => x % 1 == 0 ? x + "" : x.toFixed(p)
};

export function exponent(x) {
    const _x = formatDecimalParts(Math.abs(x));
    return _x ? _x[1] : NaN;
}

export function formatNumerals(numerals) {
    return function(value) {
        return value.replace(/[0-9]/g, (i => numerals[+i]));
    };
}
//# sourceMappingURL=number.js.map
