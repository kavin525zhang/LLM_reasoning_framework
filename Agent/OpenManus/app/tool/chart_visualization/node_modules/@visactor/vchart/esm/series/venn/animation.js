import { Factory } from "../../core/factory";

import { VennOverlapAnimation } from "@visactor/vgrammar-venn";

export const vennCirclePresetAnimation = preset => {
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

export const vennOverlapPresetAnimation = preset => {
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

export const registerVennAnimation = () => {
    Factory.registerAnimation("vennCircle", ((params, preset) => ({
        appear: vennCirclePresetAnimation(preset),
        enter: {
            type: "growRadiusIn"
        },
        exit: {
            type: "growRadiusOut"
        },
        disappear: {
            type: "growRadiusOut"
        }
    }))), Factory.registerAnimation("vennOverlap", ((params, preset) => ({
        appear: vennOverlapPresetAnimation(preset),
        update: {
            custom: VennOverlapAnimation
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
//# sourceMappingURL=animation.js.map
