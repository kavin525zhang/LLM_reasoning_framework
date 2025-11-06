export class CanvasWrapDisableWH {
    get width() {
        return this._w * this.dpr;
    }
    set width(w) {}
    get height() {
        return this._h * this.dpr;
    }
    set height(h) {}
    get offsetWidth() {
        return this._w;
    }
    set offsetWidth(w) {}
    get offsetHeight() {
        return this._h;
    }
    set offsetHeight(h) {}
    constructor(nativeCanvas, ctx, dpr, w, h, id) {
        this.nativeCanvas = nativeCanvas, this.ctx = ctx, this._w = w, this._h = h, this.id = id, 
        nativeCanvas.id = id, this.dpr = dpr;
    }
    getContext() {
        return this.ctx;
    }
    getBoundingClientRect() {
        return {
            width: this._w,
            height: this._h
        };
    }
}

export class CanvasWrapEnableWH {
    get width() {
        return this._w * this.dpr;
    }
    set width(w) {
        this._w = w / this.dpr, this.nativeCanvas.width = w;
    }
    get height() {
        return this._h * this.dpr;
    }
    set height(h) {
        this._h = h / this.dpr, this.nativeCanvas.height = h;
    }
    get offsetWidth() {
        return this._w;
    }
    set offsetWidth(w) {
        this._w = w, this.nativeCanvas.width = w * this.dpr;
    }
    get offsetHeight() {
        return this._h;
    }
    set offsetHeight(h) {
        this._h = h, this.nativeCanvas.height = h * this.dpr;
    }
    constructor(nativeCanvas, ctx, dpr, w, h, id) {
        this.nativeCanvas = nativeCanvas, this.ctx = ctx, this._w = w, this._h = h, this.id = id, 
        nativeCanvas.id = id, this.dpr = dpr;
    }
    getContext() {
        return this.ctx;
    }
    getBoundingClientRect() {
        return {
            width: this._w,
            height: this._h
        };
    }
}
//# sourceMappingURL=canvas-wrap.js.map