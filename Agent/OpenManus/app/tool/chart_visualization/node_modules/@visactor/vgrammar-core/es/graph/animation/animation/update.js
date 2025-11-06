import { array, isNil, isEqual } from "@visactor/vutils";

const BUILT_IN_EXCLUDE_CHANNELS = {
    symbol: [ "_mo_hide_", "visible" ]
};

export const update = (element, options, animationParameters) => {
    const from = Object.assign({}, element.getPrevGraphicAttributes()), to = Object.assign({}, element.getNextGraphicAttributes());
    let excludeChannels;
    options && array(options.excludeChannels).forEach((key => {
        delete from[key], delete to[key];
    })), element.mark && element.mark.markType && (excludeChannels = BUILT_IN_EXCLUDE_CHANNELS[element.mark.markType]) && excludeChannels.forEach((key => {
        delete from[key], delete to[key];
    })), Object.keys(to).forEach((key => {
        isEqual(from[key], to[key]) && (delete from[key], delete to[key]);
    }));
    const final = element.getFinalGraphicAttributes();
    return Object.keys(from).forEach((key => {
        isNil(to[key]) && (isNil(final[key]) || isEqual(from[key], final[key]) ? delete from[key] : to[key] = final[key]);
    })), {
        from: from,
        to: to
    };
};
//# sourceMappingURL=update.js.map
