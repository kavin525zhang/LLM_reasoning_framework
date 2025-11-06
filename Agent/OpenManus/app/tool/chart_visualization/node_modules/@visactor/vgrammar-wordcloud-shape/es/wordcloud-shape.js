import { Logger, isNil } from "@visactor/vutils";

import { error } from "@visactor/vgrammar-util";

import { WORDCLOUD_SHAPE_HOOK_EVENT } from "./util";

import { Layout } from "./layout";

export const transform = (options, upstreamData, parameters, view) => {
    if (!options.size || isNil(options.size[0]) || isNil(options.size[1]) || options.size[0] <= 0 || options.size[1] <= 0) {
        return Logger.getInstance().info("Wordcloud size dimensions must be greater than 0"), 
        [];
    }
    if (options.size = [ Math.ceil(options.size[0]), Math.ceil(options.size[1]) ], options.shape || error("WordcloudShape shape must be specified."), 
    options.text || error("WordcloudShape text must be specified."), (null == view ? void 0 : view.emit) && view.emit(WORDCLOUD_SHAPE_HOOK_EVENT.BEFORE_WORDCLOUD_SHAPE_LAYOUT), 
    !upstreamData || 0 === upstreamData.length) return [];
    const layout = new Layout(options, view);
    return layout.layout(upstreamData), layout.unfinished() ? {
        progressive: layout
    } : layout.output();
};
//# sourceMappingURL=wordcloud-shape.js.map