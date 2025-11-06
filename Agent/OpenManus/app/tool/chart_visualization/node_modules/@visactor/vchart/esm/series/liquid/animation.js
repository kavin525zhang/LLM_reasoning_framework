import { Factory } from "../../core/factory";

const Appear_Wave = {
    duration: 2e3,
    loop: !0,
    channel: {
        wave: {
            from: 0,
            to: 1
        }
    }
}, Appear_Grow = params => ({
    duration: 2e3,
    channel: {
        wave: {
            from: 0,
            to: 1
        },
        height: params.height,
        dy: params.dy
    }
}), Appear_WaveGrow = params => ({
    duration: 2e3,
    channel: {
        wave: {
            from: 0,
            to: 1
        },
        height: params.height,
        dy: params.dy
    }
}), Appear_Group_Grow = params => ({
    duration: 2e3,
    channel: {
        dy: params.dy
    }
}), Appear_Group_WaveGrow = params => ({
    duration: 2e3,
    channel: {
        dy: params.dy
    }
});

export function liquidPresetAnimation(params, preset) {
    switch (preset) {
      case "wave":
      default:
        return Appear_Wave;

      case "grow":
        return Appear_Grow(params);

      case "waveGrow":
        return Appear_WaveGrow(params);
    }
}

export function liquidGroupPresetAnimation(params, preset) {
    switch (preset) {
      case "wave":
      default:
        return Appear_Wave;

      case "grow":
        return Appear_Group_Grow(params);

      case "waveGrow":
        return Appear_Group_WaveGrow(params);
    }
}

export const registerLiquidAnimation = () => {
    Factory.registerAnimation("liquid", ((params, preset) => ({
        appear: liquidPresetAnimation(params, preset),
        enter: liquidPresetAnimation(params, preset),
        exit: liquidPresetAnimation(params, preset)
    }))), Factory.registerAnimation("liquidGroup", ((params, preset) => ({
        appear: liquidGroupPresetAnimation(params, preset),
        enter: liquidGroupPresetAnimation(params, preset),
        exit: liquidGroupPresetAnimation(params, preset)
    })));
};
//# sourceMappingURL=animation.js.map
