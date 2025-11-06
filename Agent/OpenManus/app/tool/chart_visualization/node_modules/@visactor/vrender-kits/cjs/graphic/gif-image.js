"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.createGifImage = exports.GifImage = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), vutils_1 = require("@visactor/vutils"), gifuct_js_1 = require("gifuct-js"), constants_1 = require("./constants");

class GifImage extends vrender_core_1.Image {
    constructor(params) {
        super(params), this.type = "gif-image", this.numberType = constants_1.GIFIMAGE_NUMBER_TYPE, 
        this.loadGif();
    }
    loadGif() {
        if ((0, vutils_1.isString)(this.attribute.gifImage)) vrender_core_1.ResourceLoader.GetFile(this.attribute.gifImage, "arrayBuffer").then((res => {
            const gif = (0, gifuct_js_1.parseGIF)(res), frames = (0, gifuct_js_1.decompressFrames)(gif, !0);
            this.renderGIF(frames);
        })).catch((e => {
            console.error("Gif load error: ", e);
        })); else if (this.attribute.gifImage instanceof ArrayBuffer) {
            const gif = (0, gifuct_js_1.parseGIF)(this.attribute.gifImage), frames = (0, gifuct_js_1.decompressFrames)(gif, !0);
            this.renderGIF(frames);
        }
    }
    renderGIF(frames) {
        this.loadedFrames = frames, this.frameIndex = 0, this.tempCanvas || (this.tempCanvas = vrender_core_1.application.global.createCanvas({}), 
        this.tempCtx = this.tempCanvas.getContext("2d")), this.gifCanvas || (this.gifCanvas = vrender_core_1.application.global.createCanvas({}), 
        this.gifCtx = this.gifCanvas.getContext("2d")), this.gifCanvas.width = frames[0].dims.width, 
        this.gifCanvas.height = frames[0].dims.height, this.playing = !0, this.lastTime = (new Date).getTime();
        const animation = this.animate();
        this.attribute.timeline && animation.setTimeline(this.attribute.timeline), animation.to({}, 1e3, "linear").loop(1 / 0);
    }
    renderFrame(context, x, y) {
        const frame = this.loadedFrames[this.frameIndex || 0];
        2 === frame.disposalType && this.gifCtx.clearRect(0, 0, this.gifCanvas.width, this.gifCanvas.height), 
        this.drawPatch(frame), this.manipulate(context, x, y);
        const diff = (new Date).getTime() - this.lastTime;
        frame.delay < diff && (this.frameIndex++, this.lastTime = (new Date).getTime()), 
        this.frameIndex >= this.loadedFrames.length && (this.frameIndex = 0);
    }
    drawPatch(frame) {
        const dims = frame.dims;
        this.frameImageData && dims.width === this.frameImageData.width && dims.height === this.frameImageData.height || (this.tempCanvas.width = dims.width, 
        this.tempCanvas.height = dims.height, this.frameImageData = this.tempCtx.createImageData(dims.width, dims.height)), 
        this.frameImageData.data.set(frame.patch), this.tempCtx.putImageData(this.frameImageData, 0, 0), 
        this.gifCtx.drawImage(this.tempCanvas, dims.left, dims.top);
    }
    manipulate(context, x, y) {
        context.drawImage(this.gifCanvas, 0, 0, this.gifCanvas.width, this.gifCanvas.height, x, y, this.attribute.width, this.attribute.height);
    }
    setAttribute(key, value, forceUpdateTag, context) {
        super.setAttribute(key, value, forceUpdateTag, context), "gifImage" === key && this.loadGif();
    }
    setAttributes(params, forceUpdateTag, context) {
        super.setAttributes(params, forceUpdateTag, context), params.gifImage && this.loadGif();
    }
}

function createGifImage(attributes) {
    return new GifImage(attributes);
}

exports.GifImage = GifImage, exports.createGifImage = createGifImage;
//# sourceMappingURL=gif-image.js.map