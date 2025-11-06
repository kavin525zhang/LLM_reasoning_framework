"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.update = void 0;

const vutils_1 = require("@visactor/vutils"), BUILT_IN_EXCLUDE_CHANNELS = {
    symbol: [ "_mo_hide_", "visible" ]
}, update = (element, options, animationParameters) => {
    const from = Object.assign({}, element.getPrevGraphicAttributes()), to = Object.assign({}, element.getNextGraphicAttributes());
    let excludeChannels;
    options && (0, vutils_1.array)(options.excludeChannels).forEach((key => {
        delete from[key], delete to[key];
    })), element.mark && element.mark.markType && (excludeChannels = BUILT_IN_EXCLUDE_CHANNELS[element.mark.markType]) && excludeChannels.forEach((key => {
        delete from[key], delete to[key];
    })), Object.keys(to).forEach((key => {
        (0, vutils_1.isEqual)(from[key], to[key]) && (delete from[key], delete to[key]);
    }));
    const final = element.getFinalGraphicAttributes();
    return Object.keys(from).forEach((key => {
        (0, vutils_1.isNil)(to[key]) && ((0, vutils_1.isNil)(final[key]) || (0, vutils_1.isEqual)(from[key], final[key]) ? delete from[key] : to[key] = final[key]);
    })), {
        from: from,
        to: to
    };
};

exports.update = update;
//# sourceMappingURL=update.js.map
