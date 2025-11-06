import { IncreaseCount } from "@visactor/vrender-core";

import { array, isArray, isEmpty, isValidNumber } from "@visactor/vutils";

const fadeIn = (textAttribute = {}) => {
    var _a, _b, _c;
    return {
        from: {
            opacity: 0,
            fillOpacity: 0,
            strokeOpacity: 0
        },
        to: {
            opacity: null !== (_a = textAttribute.opacity) && void 0 !== _a ? _a : 1,
            fillOpacity: null !== (_b = textAttribute.fillOpacity) && void 0 !== _b ? _b : 1,
            strokeOpacity: null !== (_c = textAttribute.strokeOpacity) && void 0 !== _c ? _c : 1
        }
    };
}, fadeOut = (textAttribute = {}) => {
    var _a, _b, _c;
    return {
        from: {
            opacity: null !== (_a = textAttribute.opacity) && void 0 !== _a ? _a : 1,
            fillOpacity: null !== (_b = textAttribute.fillOpacity) && void 0 !== _b ? _b : 1,
            strokeOpacity: null !== (_c = textAttribute.strokeOpacity) && void 0 !== _c ? _c : 1
        },
        to: {
            opacity: 0,
            fillOpacity: 0,
            strokeOpacity: 0
        }
    };
}, animationEffects = {
    fadeIn: fadeIn,
    fadeOut: fadeOut
};

export function getAnimationAttributes(textAttribute, type) {
    var _a, _b;
    return null !== (_b = null === (_a = animationEffects[type]) || void 0 === _a ? void 0 : _a.call(animationEffects, textAttribute)) && void 0 !== _b ? _b : {
        from: {},
        to: {}
    };
}

export function updateAnimation(prev, next, animationConfig) {
    const changeAttributes = (prev, next) => {
        const changed = {};
        for (const key in next.attribute) prev.attribute[key] !== next.attribute[key] && (changed[key] = next.attribute[key]);
        return changed;
    };
    if (!isArray(animationConfig)) {
        const {duration: duration, easing: easing, increaseEffect: increaseEffect = !0} = animationConfig;
        return prev.animate().to(changeAttributes(prev, next), duration, easing), void (increaseEffect && "text" === prev.type && "text" === next.type && playIncreaseCount(prev, next, duration, easing));
    }
    animationConfig.forEach((cfg => {
        const {duration: duration, easing: easing, increaseEffect: increaseEffect = !0, channel: channel} = cfg, {to: to} = update(prev, next, channel, cfg.options);
        isEmpty(to) || prev.animate().to(changeAttributes(prev, next), duration, easing), 
        increaseEffect && "text" === prev.type && "text" === next.type && playIncreaseCount(prev, next, duration, easing);
    }));
}

export const update = (prev, next, channel, options) => {
    const from = Object.assign({}, prev.attribute), to = Object.assign({}, next.attribute);
    return array(null == options ? void 0 : options.excludeChannels).forEach((key => {
        delete to[key];
    })), Object.keys(to).forEach((key => {
        channel && !channel.includes(key) && delete to[key];
    })), {
        from: from,
        to: to
    };
};

export function playIncreaseCount(prev, next, duration, easing) {
    prev.attribute.text !== next.attribute.text && isValidNumber(Number(prev.attribute.text) * Number(next.attribute.text)) && prev.animate().play(new IncreaseCount({
        text: prev.attribute.text
    }, {
        text: next.attribute.text
    }, duration, easing));
}

export const DefaultLabelAnimation = {
    mode: "same-time",
    duration: 300,
    easing: "linear"
};
//# sourceMappingURL=animate.js.map
