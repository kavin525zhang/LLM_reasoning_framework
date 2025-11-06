import { LOTTIE_NUMBER_TYPE } from "./constants";

import { getTheme, NOWORK_ANIMATE_ATTR, Rect, vglobal } from "@visactor/vrender-core";

import bodymovin from "lottie-web";

export class Lottie extends Rect {
    constructor(params) {
        super(params), this.type = "lottie", this.renderNextFrame = () => {
            this.stage.renderNextFrame();
        }, this.numberType = LOTTIE_NUMBER_TYPE, this.initLottieWeb(this.attribute.data);
    }
    setAttributes(params, forceUpdateTag, context) {
        return params.data && this.initLottieWeb(params.data), super.setAttributes(params, forceUpdateTag, context);
    }
    setAttribute(key, value, forceUpdateTag, context) {
        return "data" === key && this.initLottieWeb(value), super.setAttribute(key, value, forceUpdateTag, context);
    }
    getGraphicTheme() {
        return getTheme(this).rect;
    }
    initLottieWeb(data) {
        if ("browser" !== vglobal.env) return;
        this.lottieInstance && this.releaseLottieInstance();
        const theme = this.getGraphicTheme(), {width: width = theme.width, height: height = theme.height} = this.attribute, canvas = vglobal.createCanvas({
            width: width,
            height: height,
            dpr: vglobal.devicePixelRatio
        }), params = {
            rendererSettings: {
                context: canvas.getContext("2d")
            },
            animType: "canvas",
            loop: !0
        };
        "string" == typeof data ? params.path = data : params.animationData = data, this.lottieInstance = bodymovin.loadAnimation(params), 
        this.canvas = canvas, this.lottieInstance.addEventListener("drawnFrame", this.renderNextFrame);
    }
    release() {
        super.release(), this.releaseLottieInstance();
    }
    releaseLottieInstance() {
        this.lottieInstance.removeEventListener("drawnFrame", this.renderNextFrame), this.lottieInstance.destroy(), 
        this.lottieInstance = null;
    }
}

Lottie.NOWORK_ANIMATE_ATTR = NOWORK_ANIMATE_ATTR;

export function createLottie(attributes) {
    return new Lottie(attributes);
}
//# sourceMappingURL=Lottie.js.map