export * from './interface';
export * from './animation';
export declare const vennTransform: (options: import("./interface").IVennTransformOptions, upstreamData: any[]) => (import("./interface").IVennCircleDatum<any> | import("./interface").IVennOverlapDatum<any>)[];
export declare const vennMarkTransform: (options: import("./interface").IVennTransformMarkOptions, upstreamData: (import("./interface").IVennCircleDatum<any> | import("./interface").IVennOverlapDatum<any>)[]) => (import("./interface").IVennCircleDatum<any> | import("./interface").IVennOverlapDatum<any>)[];
export declare const registerVennTransforms: () => void;
