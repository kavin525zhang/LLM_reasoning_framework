const Appear_ClipIn = params => ({
    type: "clipIn",
    options: {
        clipDimension: "horizontal" === params.direction ? "y" : "x"
    }
}), Appear_FadeIn = {
    type: "fadeIn"
}, Appear_Grow = params => ({
    type: "horizontal" === params.direction ? "growPointsXIn" : "growPointsYIn",
    options: {
        orient: "horizontal" === params.direction ? "positive" : "negative"
    }
});

export function linePresetAnimation(params, preset) {
    switch (preset) {
      case "grow":
        return Appear_Grow(params);

      case "fadeIn":
        return Appear_FadeIn;

      default:
        return Appear_ClipIn(params);
    }
}
//# sourceMappingURL=animation.js.map
