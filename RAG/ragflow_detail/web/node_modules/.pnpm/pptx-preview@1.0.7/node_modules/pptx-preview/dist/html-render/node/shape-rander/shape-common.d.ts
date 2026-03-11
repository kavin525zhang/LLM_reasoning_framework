import ShapeNode from "../../../reader/node/ShapeNode";
export interface TextArea {
    left: number;
    top: number;
    right: number;
    bottom: number;
    w: number;
    h: number;
}
export declare function createSvg(): SVGElement;
export declare function createSvgNode(tagName: string): SVGElement;
export declare function getDefaultAdjWidth(shapeNode: ShapeNode): number;
export declare function getAdj(adjName: string, shapeNode: ShapeNode, defaultAdj?: number): any;
export declare function getAdjWidth(adjName: string, shapeNode: ShapeNode, defaultAdjWidth?: number): number;
export declare function getLineAdjWidth(adjName: string, shapeNode: ShapeNode, defaultAdjWidth?: number): number;
