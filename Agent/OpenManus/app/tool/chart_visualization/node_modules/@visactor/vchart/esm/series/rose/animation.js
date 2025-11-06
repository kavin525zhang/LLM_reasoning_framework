import { Factory } from "../../core/factory";

export const Appear_Grow = params => {
    const from = "angle" === params.growField ? 0 : params.innerRadius;
    return "angle" === params.growField ? {
        type: "angle" === params.growField ? "growAngleIn" : "growRadiusIn"
    } : {
        channel: {
            innerRadius: {
                from: from,
                to: (datum, element) => {
                    var _a;
                    return null === (_a = element.getFinalGraphicAttributes()) || void 0 === _a ? void 0 : _a.innerRadius;
                }
            },
            outerRadius: {
                from: from,
                to: (datum, element) => {
                    var _a;
                    return null === (_a = element.getFinalGraphicAttributes()) || void 0 === _a ? void 0 : _a.outerRadius;
                }
            }
        }
    };
};

export const Appear_FadeIn = {
    type: "fadeIn"
};

export const roseEnter = params => ({
    type: "angle" === params.growField ? "growAngleIn" : "growRadiusIn"
});

export const roseExit = params => ({
    type: "angle" === params.growField ? "growAngleOut" : "growRadiusOut"
});

export const roseDisappear = params => ({
    type: "angle" === params.growField ? "growAngleOut" : "growRadiusOut"
});

export function rosePresetAnimation(params, preset) {
    if (!1 === preset) return {};
    switch (preset) {
      case "fadeIn":
        return Appear_FadeIn;

      case "growAngle":
        return Appear_Grow(Object.assign(Object.assign({}, params), {
            growField: "angle"
        }));

      default:
        return Appear_Grow(Object.assign(Object.assign({}, params), {
            growField: "radius"
        }));
    }
}

export const registerRoseAnimation = () => {
    Factory.registerAnimation("rose", ((params, preset) => ({
        appear: rosePresetAnimation(params, preset),
        enter: roseEnter(params),
        exit: roseExit(params),
        disappear: roseDisappear(params)
    })));
};
//# sourceMappingURL=animation.js.map
