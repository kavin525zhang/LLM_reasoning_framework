"use strict";

var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.createLottie = exports.Lottie = void 0;

const constants_1 = require("./constants"), vrender_core_1 = require("@visactor/vrender-core"), lottie_web_1 = __importDefault(require("lottie-web"));

class Lottie extends vrender_core_1.Rect {
    constructor(params) {
        super(params), this.type = "lottie", this.renderNextFrame = () => {
            this.stage.renderNextFrame();
        }, this.numberType = constants_1.LOTTIE_NUMBER_TYPE, this.initLottieWeb(this.attribute.data);
    }
    setAttributes(params, forceUpdateTag, context) {
        return params.data && this.initLottieWeb(params.data), super.setAttributes(params, forceUpdateTag, context);
    }
    setAttribute(key, value, forceUpdateTag, context) {
        return "data" === key && this.initLottieWeb(value), super.setAttribute(key, value, forceUpdateTag, context);
    }
    getGraphicTheme() {
        return (0, vrender_core_1.getTheme)(this).rect;
    }
    initLottieWeb(data) {
        if ("browser" !== vrender_core_1.vglobal.env) return;
        this.lottieInstance && this.releaseLottieInstance();
        const theme = this.getGraphicTheme(), {width: width = theme.width, height: height = theme.height} = this.attribute, canvas = vrender_core_1.vglobal.createCanvas({
            width: width,
            height: height,
            dpr: vrender_core_1.vglobal.devicePixelRatio
        }), params = {
            rendererSettings: {
                context: canvas.getContext("2d")
            },
            animType: "canvas",
            loop: !0
        };
        "string" == typeof data ? params.path = data : params.animationData = data, this.lottieInstance = lottie_web_1.default.loadAnimation(params), 
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

function createLottie(attributes) {
    return new Lottie(attributes);
}

exports.Lottie = Lottie, Lottie.NOWORK_ANIMATE_ATTR = vrender_core_1.NOWORK_ANIMATE_ATTR, 
exports.createLottie = createLottie;
//# sourceMappingURL=Lottie.js.map