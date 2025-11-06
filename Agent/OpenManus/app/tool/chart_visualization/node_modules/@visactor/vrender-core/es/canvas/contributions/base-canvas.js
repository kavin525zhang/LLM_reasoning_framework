const DefaultConfig = {
    WIDTH: 500,
    HEIGHT: 500,
    DPR: 1
};

export class BaseCanvas {
    get displayWidth() {
        return this._pixelWidth / this._dpr;
    }
    get displayHeight() {
        return this._pixelHeight / this._dpr;
    }
    get id() {
        return this._id;
    }
    get x() {
        return this._x;
    }
    set x(_x) {
        this._x = _x;
    }
    get y() {
        return this._y;
    }
    set y(_y) {
        this._y = _y;
    }
    get nativeCanvas() {
        return this._nativeCanvas;
    }
    set nativeCanvas(nativeCanvas) {
        this._nativeCanvas = nativeCanvas;
    }
    get width() {
        return this._pixelWidth;
    }
    set width(width) {
        this._pixelWidth = width, this._displayWidth = width / (this._dpr || 1);
    }
    get height() {
        return this._pixelHeight;
    }
    set height(height) {
        this._pixelHeight = height, this._displayHeight = height / (this._dpr || 1);
    }
    getContext(str) {
        return this._context;
    }
    get visiable() {
        return this._visiable;
    }
    set visiable(visiable) {
        this._visiable = visiable, visiable ? this.show() : this.hide();
    }
    get dpr() {
        return this._dpr;
    }
    set dpr(dpr) {
        this._dpr = dpr, this.resize(this._displayWidth, this._displayHeight);
    }
    constructor(params) {
        var _a;
        const {nativeCanvas: nativeCanvas, width: width = DefaultConfig.WIDTH, height: height = DefaultConfig.HEIGHT, dpr: dpr = DefaultConfig.DPR, x: x, y: y, id: id, canvasControled: canvasControled = !0} = params;
        this._x = null != x ? x : 0, this._y = null != y ? y : 0, this._pixelWidth = width * dpr, 
        this._pixelHeight = height * dpr, this._visiable = !1 !== params.visiable, this.controled = canvasControled, 
        this._displayWidth = width, this._displayHeight = height, this._dpr = dpr, this._nativeCanvas = nativeCanvas, 
        this._id = null !== (_a = nativeCanvas.id) && void 0 !== _a ? _a : id, id && (nativeCanvas.id = id), 
        this.init(params);
    }
    getNativeCanvas() {
        return this._nativeCanvas;
    }
    hide() {}
    show() {}
    applyPosition() {}
    resetStyle(params) {}
    resize(width, height) {}
    toDataURL(mimeType, quality) {
        return "";
    }
    readPixels(x, y, w, h) {
        return this._context.getImageData(x, y, w, h);
    }
    convertToBlob(options) {
        throw new Error("暂未实现");
    }
    transferToImageBitmap() {
        throw new Error("暂未实现");
    }
    release(...params) {
        this.controled && this._nativeCanvas.parentElement && this._nativeCanvas.parentElement.removeChild(this._nativeCanvas);
    }
}

BaseCanvas.env = "browser";
//# sourceMappingURL=base-canvas.js.map
