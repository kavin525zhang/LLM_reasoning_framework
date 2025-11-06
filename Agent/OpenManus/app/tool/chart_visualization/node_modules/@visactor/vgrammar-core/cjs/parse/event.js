"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.parseEventSelector = exports.parseHandler = exports.generateFilterByMark = void 0;

const vutils_1 = require("@visactor/vutils"), graphic_1 = require("../graph/util/graphic"), constants_1 = require("../view/constants"), generateFilterByMark = evtSpec => (0, 
vutils_1.isNil)(evtSpec.markId) ? (0, vutils_1.isNil)(evtSpec.markName) ? (0, vutils_1.isNil)(evtSpec.markType) ? () => !0 : el => el && el.mark.markType === evtSpec.markType : el => el && el.mark.name() === evtSpec.markName : el => el && el.mark.id() === evtSpec.markId;

exports.generateFilterByMark = generateFilterByMark;

const parseHandler = (callback, config) => config && config.debounce ? (0, vutils_1.debounce)(callback, config.debounce) : config && config.throttle ? (0, 
vutils_1.throttle)(callback, config.throttle) : callback;

exports.parseHandler = parseHandler;

const JOIN_SYMBOL = ":", parseEventSelector = (selector, source = constants_1.EVENT_SOURCE_VIEW) => {
    const spec = {}, splitArr = selector.split(":");
    if (2 === splitArr.length) {
        const [space, eventType] = splitArr;
        space[0] === constants_1.ID_PREFIX ? (spec.markId = space.slice(1), spec.source = source) : space[0] === constants_1.NAME_PREFIX ? (spec.markName = space.slice(1), 
        spec.source = source) : (0, graphic_1.isMarkType)(space) ? (spec.markType = space, 
        spec.source = source) : space === constants_1.EVENT_SOURCE_WINDOW ? spec.source = constants_1.EVENT_SOURCE_WINDOW : spec.source = source, 
        spec.type = eventType;
    } else 1 === splitArr.length && (spec.type = selector, spec.source = source);
    return spec;
};

exports.parseEventSelector = parseEventSelector;
//# sourceMappingURL=event.js.map
