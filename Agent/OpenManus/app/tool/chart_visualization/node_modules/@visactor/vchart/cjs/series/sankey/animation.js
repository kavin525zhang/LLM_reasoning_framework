"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerSankeyAnimation = exports.sankeyLinkPresetAnimation = exports.sankeyNodePresetAnimation = exports.sankeyGrowOut = exports.sankeyGrowIn = void 0;

const factory_1 = require("../../core/factory"), config_1 = require("../../animation/config"), sankeyGrowIn = (params, isOverall = !0) => ({
    type: "horizontal" === params.direction ? "growWidthIn" : "growHeightIn",
    options: {
        overall: isOverall ? params.growFrom() : isOverall,
        orient: "positive"
    }
});

exports.sankeyGrowIn = sankeyGrowIn;

const sankeyGrowOut = (params, isOverall = !0) => ({
    type: "horizontal" === params.direction ? "growWidthOut" : "growHeightOut",
    options: {
        overall: isOverall ? params.growFrom() : isOverall,
        orient: "positive"
    }
});

exports.sankeyGrowOut = sankeyGrowOut;

const sankeyNodePresetAnimation = (params, preset) => "fadeIn" === preset ? {
    type: "fadeIn"
} : (0, exports.sankeyGrowIn)(params);

exports.sankeyNodePresetAnimation = sankeyNodePresetAnimation;

const sankeyLinkPresetAnimation = preset => "fadeIn" === preset ? {
    type: "fadeIn"
} : {
    type: "linkPathGrowIn"
};

exports.sankeyLinkPresetAnimation = sankeyLinkPresetAnimation;

const registerSankeyAnimation = () => {
    factory_1.Factory.registerAnimation("sankeyNode", ((params, preset) => Object.assign({
        appear: (0, exports.sankeyNodePresetAnimation)(params, preset)
    }, config_1.FadeInOutAnimation))), factory_1.Factory.registerAnimation("sankeyLinkPath", ((params, preset) => ({
        appear: (0, exports.sankeyLinkPresetAnimation)(preset),
        enter: {
            type: "linkPathGrowIn"
        },
        exit: {
            type: "linkPathGrowOut"
        },
        disappear: {
            type: "linkPathGrowOut"
        }
    })));
};

exports.registerSankeyAnimation = registerSankeyAnimation;
//# sourceMappingURL=animation.js.map
