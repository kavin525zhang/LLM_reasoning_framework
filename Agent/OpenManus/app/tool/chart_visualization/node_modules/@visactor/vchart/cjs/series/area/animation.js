"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerAreaSeriesAnimation = exports.areaPresetAnimation = void 0;

const config_1 = require("../../animation/config"), Appear_ClipIn = {
    type: "clipIn"
}, Appear_Grow = params => ({
    type: "horizontal" === params.direction ? "growPointsXIn" : "growPointsYIn",
    options: {
        orient: "horizontal" === params.direction ? "positive" : "negative"
    }
}), Appear_FadeIn = {
    type: "fadeIn"
};

function areaPresetAnimation(params, preset) {
    if (!1 === preset) return {};
    switch (preset) {
      case "grow":
        return Appear_Grow(params);

      case "fadeIn":
        return Appear_FadeIn;

      default:
        return Appear_ClipIn;
    }
}

exports.areaPresetAnimation = areaPresetAnimation;

const registerAreaSeriesAnimation = () => {
    (0, config_1.registerAreaAnimation)(), (0, config_1.registerLineAnimation)(), (0, 
    config_1.registerScaleInOutAnimation)();
};

exports.registerAreaSeriesAnimation = registerAreaSeriesAnimation;
//# sourceMappingURL=animation.js.map
