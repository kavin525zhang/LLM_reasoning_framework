export declare class CanvasWrapDisableWH {
    protected _w: number;
    protected _h: number;
    protected ctx: any;
    nativeCanvas: any;
    id: any;
    readonly dpr: number;
    get width(): number;
    set width(w: number);
    get height(): number;
    set height(h: number);
    get offsetWidth(): number;
    set offsetWidth(w: number);
    get offsetHeight(): number;
    set offsetHeight(h: number);
    constructor(nativeCanvas: any, ctx: any, dpr: number, w: number, h: number, id: any);
    getContext(): any;
    getBoundingClientRect(): {
        width: number;
        height: number;
    };
}
export declare class CanvasWrapEnableWH {
    protected _w: number;
    protected _h: number;
    protected ctx: any;
    nativeCanvas: any;
    id: any;
    readonly dpr: number;
    get width(): number;
    set width(w: number);
    get height(): number;
    set height(h: number);
    get offsetWidth(): number;
    set offsetWidth(w: number);
    get offsetHeight(): number;
    set offsetHeight(h: number);
    constructor(nativeCanvas: any, ctx: any, dpr: number, w: number, h: number, id: any);
    getContext(): any;
    getBoundingClientRect(): {
        width: number;
        height: number;
    };
}
