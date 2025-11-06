import { registerLineAnimation, registerAreaAnimation, registerScaleInOutAnimation } from "../../animation/config";

const Appear_ClipIn = {
    type: "clipIn"
}, Appear_Grow = params => ({
    type: "horizontal" === params.direction ? "growPointsXIn" : "growPointsYIn",
    options: {
        orient: "horizontal" === params.direction ? "positive" : "negative"
    }
}), Appear_FadeIn = {
    type: "fadeIn"
};

export function areaPresetAnimation(params, preset) {
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

export const registerAreaSeriesAnimation = () => {
    registerAreaAnimation(), registerLineAnimation(), registerScaleInOutAnimation();
};
//# sourceMappingURL=animation.js.map
