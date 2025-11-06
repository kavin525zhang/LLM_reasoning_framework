"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerBar3dAnimation = exports.registerBarAnimation = exports.barPresetAnimation = exports.barGrowOut = exports.barGrowIn = void 0;

const factory_1 = require("../../core/factory");

function barGrowOption(barParams, isOverall = !0) {
    return (datum, element, params) => {
        const field = "vertical" === barParams.direction ? barParams.yField : barParams.xField, data = null == datum ? void 0 : datum[field];
        return "vertical" === barParams.direction ? {
            overall: isOverall ? barParams.growFrom() : isOverall,
            orient: data > 0 ? "negative" : "positive"
        } : {
            overall: !!isOverall && barParams.growFrom(),
            orient: data > 0 ? "positive" : "negative"
        };
    };
}

const barGrowIn = (params, isOverall = !0) => ({
    type: "horizontal" === params.direction ? "growWidthIn" : "growHeightIn",
    options: barGrowOption(params, isOverall)
});

exports.barGrowIn = barGrowIn;

const barGrowOut = (params, isOverall = !0) => ({
    type: "horizontal" === params.direction ? "growWidthOut" : "growHeightOut",
    options: barGrowOption(params, isOverall)
});

exports.barGrowOut = barGrowOut;

const Appear_FadeIn = {
    type: "fadeIn"
}, Appear_ScaleIn = {
    type: "growCenterIn"
};

function barPresetAnimation(params, preset) {
    if (!1 === preset) return {};
    switch (preset) {
      case "fadeIn":
        return Appear_FadeIn;

      case "scaleIn":
        return Appear_ScaleIn;

      default:
        return (0, exports.barGrowIn)(params);
    }
}

exports.barPresetAnimation = barPresetAnimation;

const registerBarAnimation = () => {
    factory_1.Factory.registerAnimation("bar", ((params, preset) => ({
        appear: barPresetAnimation(params, preset),
        enter: (0, exports.barGrowIn)(params, !1),
        exit: (0, exports.barGrowOut)(params, !1),
        disappear: (0, exports.barGrowOut)(params)
    })));
};

exports.registerBarAnimation = registerBarAnimation;

const registerBar3dAnimation = () => {
    factory_1.Factory.registerAnimation("bar3d", ((params, preset) => ({
        appear: barPresetAnimation(params, preset),
        enter: (0, exports.barGrowIn)(params, !1),
        exit: (0, exports.barGrowOut)(params, !1),
        disappear: (0, exports.barGrowOut)(params)
    })));
};

exports.registerBar3dAnimation = registerBar3dAnimation;
//# sourceMappingURL=animation.js.map
