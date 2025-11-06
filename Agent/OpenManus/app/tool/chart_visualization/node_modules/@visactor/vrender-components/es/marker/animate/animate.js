import { commonLineClipIn } from "./clip-in";

import { areaFadeIn, commonLineFadeIn, arcAreaFadeIn, pointFadeIn } from "./fade-in";

import { areaFadeOut, commonLineFadeOut, arcAreaFadeOut, pointFadeOut } from "./fade-out";

import { pointCallIn } from "./call-in";

export function markCommonLineAnimate(line, label, animationconfig, state) {
    const {enter: enter, update: update, exit: exit} = animationconfig;
    if ("enter" === state) {
        const {type: type, duration: duration, delay: delay, easing: easing} = enter;
        "clipIn" === type ? commonLineClipIn(line, label, duration, delay, easing) : "fadeIn" === type && commonLineFadeIn(line, label, duration, delay, easing);
    } else if ("update" === state) {
        const {type: type, duration: duration, delay: delay, easing: easing} = update;
        "clipIn" === type ? commonLineClipIn(line, label, duration, delay, easing) : "fadeIn" === type && commonLineFadeIn(line, label, duration, delay, easing);
    } else if ("exit" === state) {
        const {duration: duration, delay: delay, easing: easing} = exit;
        commonLineFadeOut(line, label, duration, delay, easing);
    }
}

export function markAreaAnimate(area, label, animationconfig, state) {
    const {enter: enter, update: update, exit: exit} = animationconfig;
    if ("enter" === state) {
        const {type: type, duration: duration, delay: delay, easing: easing} = enter;
        "fadeIn" === type && areaFadeIn(area, label, duration, delay, easing);
    } else if ("update" === state) {
        const {type: type, duration: duration, delay: delay, easing: easing} = update;
        "fadeIn" === type && areaFadeIn(area, label, duration, delay, easing);
    } else if ("exit" === state) {
        const {duration: duration, delay: delay, easing: easing} = exit;
        areaFadeOut(area, label, duration, delay, easing);
    }
}

export function markArcAreaAnimate(area, label, animationconfig, state) {
    const {enter: enter, update: update, exit: exit} = animationconfig;
    if ("enter" === state) {
        const {type: type, duration: duration, delay: delay, easing: easing} = enter;
        "fadeIn" === type && arcAreaFadeIn(area, label, duration, delay, easing);
    } else if ("update" === state) {
        const {type: type, duration: duration, delay: delay, easing: easing} = update;
        "fadeIn" === type && arcAreaFadeIn(area, label, duration, delay, easing);
    } else if ("exit" === state) {
        const {duration: duration, delay: delay, easing: easing} = exit;
        arcAreaFadeOut(area, label, duration, delay, easing);
    }
}

export function markPointAnimate(lines, item, animationconfig, state) {
    const [itemLine, decorativeLine] = lines, {enter: enter, update: update, exit: exit} = animationconfig;
    if ("enter" === state) {
        const {type: type, duration: duration, delay: delay, easing: easing} = enter;
        "fadeIn" === type ? pointFadeIn(itemLine, decorativeLine, item, duration, delay, easing) : "callIn" === type && pointCallIn(itemLine, decorativeLine, item, duration, delay, easing);
    } else if ("update" === state) {
        const {type: type, duration: duration, delay: delay, easing: easing} = update;
        "fadeIn" === type ? pointFadeIn(itemLine, decorativeLine, item, duration, delay, easing) : "callIn" === type && pointCallIn(itemLine, decorativeLine, item, duration, delay, easing);
    } else if ("exit" === state) {
        const {duration: duration, delay: delay, easing: easing} = exit;
        pointFadeOut(itemLine, decorativeLine, item, duration, delay, easing);
    }
}

export const DefaultUpdateMarkLineAnimation = {
    type: "clipIn",
    duration: 500,
    easing: "linear",
    delay: 0
};

export const DefaultUpdateMarkAreaAnimation = {
    type: "fadeIn",
    duration: 500,
    easing: "linear",
    delay: 0
};

export const DefaultUpdateMarkPointAnimation = {
    type: "callIn",
    duration: 500,
    easing: "linear",
    delay: 0
};

export const DefaultExitMarkerAnimation = {
    type: "fadeOut",
    duration: 500,
    easing: "linear",
    delay: 0
};
//# sourceMappingURL=animate.js.map
