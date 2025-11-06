"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerLinearProgressAnimation = exports.linearProgressPresetAnimation = exports.Appear_FadeIn = exports.linearProgressDisappear = void 0;

const factory_1 = require("../../../core/factory");

function LinearProgressGrowOption(params) {
    return () => "vertical" === params.direction ? {
        orient: "negative"
    } : {
        orient: "positive"
    };
}

const Appear_Grow = params => ({
    type: "horizontal" === params.direction ? "growWidthIn" : "growHeightIn",
    options: LinearProgressGrowOption(params)
}), linearProgressDisappear = params => ({
    type: "horizontal" === params.direction ? "growWidthOut" : "growHeightOut",
    options: LinearProgressGrowOption(params)
});

function linearProgressPresetAnimation(params, preset) {
    return !1 === preset ? {} : "fadeIn" === preset ? exports.Appear_FadeIn : Appear_Grow(params);
}

exports.linearProgressDisappear = linearProgressDisappear, exports.Appear_FadeIn = {
    type: "fadeIn"
}, exports.linearProgressPresetAnimation = linearProgressPresetAnimation;

const registerLinearProgressAnimation = () => {
    factory_1.Factory.registerAnimation("linearProgress", ((params, preset) => ({
        appear: linearProgressPresetAnimation(params, preset),
        enter: {
            type: "grow"
        },
        disappear: (0, exports.linearProgressDisappear)(params)
    })));
};

exports.registerLinearProgressAnimation = registerLinearProgressAnimation;
//# sourceMappingURL=animation.js.map
