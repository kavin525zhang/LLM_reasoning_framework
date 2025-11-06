"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.transform = void 0;

const vutils_1 = require("@visactor/vutils"), vgrammar_util_1 = require("@visactor/vgrammar-util"), util_1 = require("./util"), layout_1 = require("./layout"), transform = (options, upstreamData, parameters, view) => {
    if (!options.size || (0, vutils_1.isNil)(options.size[0]) || (0, vutils_1.isNil)(options.size[1]) || options.size[0] <= 0 || options.size[1] <= 0) {
        return vutils_1.Logger.getInstance().info("Wordcloud size dimensions must be greater than 0"), 
        [];
    }
    if (options.size = [ Math.ceil(options.size[0]), Math.ceil(options.size[1]) ], options.shape || (0, 
    vgrammar_util_1.error)("WordcloudShape shape must be specified."), options.text || (0, 
    vgrammar_util_1.error)("WordcloudShape text must be specified."), (null == view ? void 0 : view.emit) && view.emit(util_1.WORDCLOUD_SHAPE_HOOK_EVENT.BEFORE_WORDCLOUD_SHAPE_LAYOUT), 
    !upstreamData || 0 === upstreamData.length) return [];
    const layout = new layout_1.Layout(options, view);
    return layout.layout(upstreamData), layout.unfinished() ? {
        progressive: layout
    } : layout.output();
};

exports.transform = transform;
//# sourceMappingURL=wordcloud-shape.js.map