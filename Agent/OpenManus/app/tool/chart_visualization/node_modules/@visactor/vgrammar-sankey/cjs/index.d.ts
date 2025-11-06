export { SankeyLayout } from './layout';
export declare const sankeyTransform: (options: import("./interface").SankeyOptions & ({
    width: number;
    height: number;
} | {
    x0: number;
    x1: number;
    y0: number;
    y1: number;
}), upstreamData: import("./interface").SankeyData | import("./interface").SankeyData[]) => {
    nodes: import("./interface").SankeyNodeElement[];
    links: import("./interface").SankeyLinkElement[];
    columns: import("./interface").SankeyNodeElement[][];
}[];
export * from './interface';
export * from './format';
export declare const registerSankeyTransforms: () => void;
export declare const registerSankeyHighlight: () => void;
