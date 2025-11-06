"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerVennAnimation = exports.vennOverlapPresetAnimation = exports.vennCirclePresetAnimation = void 0;

const factory_1 = require("../../core/factory"), vgrammar_venn_1 = require("@visactor/vgrammar-venn"), vennCirclePresetAnimation = preset => {
    switch (preset) {
      case "fadeIn":
      default:
        return {
            type: "fadeIn"
        };

      case "growIn":
        return {
            type: "growRadiusIn"
        };

      case "scaleIn":
        return {
            type: "scaleIn"
        };
    }
};

exports.vennCirclePresetAnimation = vennCirclePresetAnimation;

const vennOverlapPresetAnimation = preset => {
    switch (preset) {
      case "fadeIn":
      default:
        return {
            type: "fadeIn"
        };

      case "scaleIn":
        return {
            type: "scaleIn"
        };
    }
};

exports.vennOverlapPresetAnimation = vennOverlapPresetAnimation;

const registerVennAnimation = () => {
    factory_1.Factory.registerAnimation("vennCircle", ((params, preset) => ({
        appear: (0, exports.vennCirclePresetAnimation)(preset),
        enter: {
            type: "growRadiusIn"
        },
        exit: {
            type: "growRadiusOut"
        },
        disappear: {
            type: "growRadiusOut"
        }
    }))), factory_1.Factory.registerAnimation("vennOverlap", ((params, preset) => ({
        appear: (0, exports.vennOverlapPresetAnimation)(preset),
        update: {
            custom: vgrammar_venn_1.VennOverlapAnimation
        },
        enter: {
            type: "fadeIn"
        },
        exit: {
            type: "fadeOut"
        },
        disappear: {
            type: "fadeOut"
        }
    })));
};

exports.registerVennAnimation = registerVennAnimation;
//# sourceMappingURL=animation.js.map
