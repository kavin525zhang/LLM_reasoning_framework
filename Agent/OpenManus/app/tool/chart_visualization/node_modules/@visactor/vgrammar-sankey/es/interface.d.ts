export interface SankeyOptions {
    divideNodeValueToLink?: boolean;
    direction?: 'horizontal' | 'vertical';
    inverse?: boolean;
    crossNodeAlign?: 'start' | 'end' | 'middle' | 'parent';
    nodeAlign?: 'left' | 'right' | 'center' | 'justify' | 'start' | 'end';
    nodeGap?: number | ((node: SankeyNodeElement) => number);
    gapPosition?: 'start' | 'end' | 'middle';
    nodeWidth?: string | number | ((node?: SankeyNodeElement, nodes?: SankeyNodeElement[]) => number);
    equalNodeHeight?: boolean;
    nodeHeight?: number | ((node: SankeyNodeElement) => number);
    linkHeight?: number | ((link: SankeyLinkElement, sourceNode: SankeyNodeElement, sourceNodeHeight: number) => number);
    linkWidth?: number | ((link: SankeyLinkElement, viewBox: {
        x0: number;
        x1: number;
        y0: number;
        y1: number;
        width: number;
        height: number;
    }) => number);
    minStepWidth?: number;
    minNodeHeight?: number;
    maxNodeHeight?: number;
    minLinkHeight?: number;
    maxLinkHeight?: number;
    iterations?: number;
    nodeKey?: string | number | ((datum: SankeyNodeDatum) => string | number);
    linkSortBy?: (a: SankeyLinkElement, b: SankeyLinkElement) => number;
    nodeSortBy?: (a: SankeyNodeElement, b: SankeyNodeElement) => number;
    setNodeLayer?: (datum: SankeyNodeDatum) => number;
    dropIsolatedNode?: boolean;
    linkOverlap?: 'start' | 'center' | 'end';
}
export interface SankeyLinkDatum {
    source: string | number;
    target: string | number;
    value?: number;
}
export interface SankeyNodeDatum {
    value?: number;
}
export interface HierarchyNodeDatum {
    value?: number;
    children?: HierarchyNodeDatum[];
}
export type SankeyData = {
    nodes?: SankeyNodeDatum[];
    links: SankeyLinkDatum[];
} | {
    nodes: HierarchyNodeDatum[];
};
export interface SankeyNodeElement {
    key: string | number;
    index: number;
    depth: number;
    endDepth?: number;
    layer?: number;
    isLastLayer?: boolean;
    value: number;
    datum: SankeyNodeDatum;
    sourceLinks: SankeyLinkElement[];
    targetLinks: SankeyLinkElement[];
    x0?: number;
    y0?: number;
    x1?: number;
    y1?: number;
}
export interface SankeyLinkElement {
    key?: string;
    vertical?: boolean;
    index: number;
    source: string | number;
    target: string | number;
    value: number;
    datum: SankeyLinkDatum | SankeyLinkDatum[];
    thickness?: number;
    sourceRect?: {
        x0: number;
        x1: number;
        y0: number;
        y1: number;
    };
    targetRect?: {
        x0: number;
        x1: number;
        y0: number;
        y1: number;
    };
    parents?: (string | number)[];
    y0?: number;
    y1?: number;
    x0?: number;
    x1?: number;
}
export type SankeyLayoutResult = {
    nodes: SankeyNodeElement[];
    links: SankeyLinkElement[];
    columns: SankeyNodeElement[][];
}[];
