export interface IFormatSpecifier {
    fill?: string | undefined;
    align?: string | undefined;
    sign?: string | undefined;
    symbol?: string | undefined;
    zero?: string | undefined;
    width?: string | undefined;
    comma?: string | undefined;
    precision?: string | undefined;
    trim?: string | undefined;
    type?: string | undefined;
}
export declare class FormatSpecifier {
    fill: string;
    align: string;
    sign: string;
    symbol: string;
    zero: boolean;
    width: number;
    comma: boolean;
    precision: number;
    trim: boolean;
    type: string;
    constructor(specifier?: IFormatSpecifier);
    toString(): string;
}
export declare const numberSpecifierReg: RegExp;
export declare function formatSpecifier(specifier: string): FormatSpecifier;
