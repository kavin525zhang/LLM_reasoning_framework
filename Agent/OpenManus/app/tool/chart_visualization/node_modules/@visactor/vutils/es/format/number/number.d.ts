import { formatDecimal } from './formatDecimal';
import { formatPrefixAuto } from './formatPrefixAuto';
import { formatRounded } from './formatRounded';
export interface FormatLocale {
    thousands: string;
    grouping: number[];
    currency: [string, string];
    numerals?: string[] | undefined;
    percent?: string | undefined;
    minus?: string | undefined;
    nan?: string | undefined;
    decimal?: string;
}
export declare class NumberUtil {
    private locale;
    private group;
    private currencyPrefix;
    private currencySuffix;
    private decimal;
    private numerals;
    private percent;
    private minus;
    private nan;
    private static instance;
    static getInstance(): NumberUtil;
    private newFormat;
    private _formatPrefix;
    formatter: (specifier: string) => {
        (value: number): any;
        toString(): string;
    };
    format: (specifier: string, value: number) => any;
    formatPrefix: (specifier: string, value: number) => (value: number) => string;
}
export declare const formatTypes: {
    '%': (x: number, p: number) => string;
    b: (x: number) => string;
    c: (x: number) => string;
    d: typeof formatDecimal;
    f: (x: number, p: number) => string;
    e: (x: number, p: number) => string;
    g: (x: number, p: number) => string;
    o: (x: number) => string;
    p: (x: number, p: number) => string;
    r: typeof formatRounded;
    s: typeof formatPrefixAuto;
    X: (x: number) => string;
    x: (x: number) => string;
    t: (x: number, p: number) => string;
    z: (x: number, p: number) => string;
};
export declare function exponent(x: number): number;
export declare function formatNumerals(numerals: string[]): (value: string) => string;
