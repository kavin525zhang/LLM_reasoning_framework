export type ArcAnchorType = 'inner-start' | 'inner-end' | 'inner-middle' | 'outer-start' | 'outer-end' | 'outer-middle' | 'center';
export type IArcLikeAttr = {
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
};
export declare const calculateAnchorOfArc: (arcAttr: IArcLikeAttr, anchorType: ArcAnchorType) => {
    angle: number;
    radius: number;
};
