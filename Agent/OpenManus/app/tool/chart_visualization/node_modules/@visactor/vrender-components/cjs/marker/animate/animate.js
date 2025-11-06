"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.DefaultExitMarkerAnimation = exports.DefaultUpdateMarkPointAnimation = exports.DefaultUpdateMarkAreaAnimation = exports.DefaultUpdateMarkLineAnimation = exports.markPointAnimate = exports.markArcAreaAnimate = exports.markAreaAnimate = exports.markCommonLineAnimate = void 0;

const clip_in_1 = require("./clip-in"), fade_in_1 = require("./fade-in"), fade_out_1 = require("./fade-out"), call_in_1 = require("./call-in");

function markCommonLineAnimate(line, label, animationconfig, state) {
    const {enter: enter, update: update, exit: exit} = animationconfig;
    if ("enter" === state) {
        const {type: type, duration: duration, delay: delay, easing: easing} = enter;
        "clipIn" === type ? (0, clip_in_1.commonLineClipIn)(line, label, duration, delay, easing) : "fadeIn" === type && (0, 
        fade_in_1.commonLineFadeIn)(line, label, duration, delay, easing);
    } else if ("update" === state) {
        const {type: type, duration: duration, delay: delay, easing: easing} = update;
        "clipIn" === type ? (0, clip_in_1.commonLineClipIn)(line, label, duration, delay, easing) : "fadeIn" === type && (0, 
        fade_in_1.commonLineFadeIn)(line, label, duration, delay, easing);
    } else if ("exit" === state) {
        const {duration: duration, delay: delay, easing: easing} = exit;
        (0, fade_out_1.commonLineFadeOut)(line, label, duration, delay, easing);
    }
}

function markAreaAnimate(area, label, animationconfig, state) {
    const {enter: enter, update: update, exit: exit} = animationconfig;
    if ("enter" === state) {
        const {type: type, duration: duration, delay: delay, easing: easing} = enter;
        "fadeIn" === type && (0, fade_in_1.areaFadeIn)(area, label, duration, delay, easing);
    } else if ("update" === state) {
        const {type: type, duration: duration, delay: delay, easing: easing} = update;
        "fadeIn" === type && (0, fade_in_1.areaFadeIn)(area, label, duration, delay, easing);
    } else if ("exit" === state) {
        const {duration: duration, delay: delay, easing: easing} = exit;
        (0, fade_out_1.areaFadeOut)(area, label, duration, delay, easing);
    }
}

function markArcAreaAnimate(area, label, animationconfig, state) {
    const {enter: enter, update: update, exit: exit} = animationconfig;
    if ("enter" === state) {
        const {type: type, duration: duration, delay: delay, easing: easing} = enter;
        "fadeIn" === type && (0, fade_in_1.arcAreaFadeIn)(area, label, duration, delay, easing);
    } else if ("update" === state) {
        const {type: type, duration: duration, delay: delay, easing: easing} = update;
        "fadeIn" === type && (0, fade_in_1.arcAreaFadeIn)(area, label, duration, delay, easing);
    } else if ("exit" === state) {
        const {duration: duration, delay: delay, easing: easing} = exit;
        (0, fade_out_1.arcAreaFadeOut)(area, label, duration, delay, easing);
    }
}

function markPointAnimate(lines, item, animationconfig, state) {
    const [itemLine, decorativeLine] = lines, {enter: enter, update: update, exit: exit} = animationconfig;
    if ("enter" === state) {
        const {type: type, duration: duration, delay: delay, easing: easing} = enter;
        "fadeIn" === type ? (0, fade_in_1.pointFadeIn)(itemLine, decorativeLine, item, duration, delay, easing) : "callIn" === type && (0, 
        call_in_1.pointCallIn)(itemLine, decorativeLine, item, duration, delay, easing);
    } else if ("update" === state) {
        const {type: type, duration: duration, delay: delay, easing: easing} = update;
        "fadeIn" === type ? (0, fade_in_1.pointFadeIn)(itemLine, decorativeLine, item, duration, delay, easing) : "callIn" === type && (0, 
        call_in_1.pointCallIn)(itemLine, decorativeLine, item, duration, delay, easing);
    } else if ("exit" === state) {
        const {duration: duration, delay: delay, easing: easing} = exit;
        (0, fade_out_1.pointFadeOut)(itemLine, decorativeLine, item, duration, delay, easing);
    }
}

exports.markCommonLineAnimate = markCommonLineAnimate, exports.markAreaAnimate = markAreaAnimate, 
exports.markArcAreaAnimate = markArcAreaAnimate, exports.markPointAnimate = markPointAnimate, 
exports.DefaultUpdateMarkLineAnimation = {
    type: "clipIn",
    duration: 500,
    easing: "linear",
    delay: 0
}, exports.DefaultUpdateMarkAreaAnimation = {
    type: "fadeIn",
    duration: 500,
    easing: "linear",
    delay: 0
}, exports.DefaultUpdateMarkPointAnimation = {
    type: "callIn",
    duration: 500,
    easing: "linear",
    delay: 0
}, exports.DefaultExitMarkerAnimation = {
    type: "fadeOut",
    duration: 500,
    easing: "linear",
    delay: 0
};
//# sourceMappingURL=animate.js.map
