export declare function bisect(a: number[], x: number, lo?: number, hi?: number): number;
export declare function findZeroOfFunction(f: (entry: number) => number, a: number, b: number, parameters?: {
    maxIterations?: number;
    tolerance?: number;
}): number;
export declare const binaryFuzzySearch: <T>(arr: T[], compareFn: (value: T) => number) => number;
export declare const binaryFuzzySearchInNumberRange: (x1: number, x2: number, compareFn: (value: number) => number) => number;
