"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.defaultImageBackgroundRenderContribution = exports.defaultImageRenderContribution = exports.DefaultImageRenderContribution = void 0;

const base_contribution_render_1 = require("./base-contribution-render"), enums_1 = require("../../../../common/enums"), rect_contribution_render_1 = require("./rect-contribution-render");

class DefaultImageRenderContribution extends rect_contribution_render_1.DefaultRectRenderContribution {
    constructor() {
        super(...arguments), this.time = enums_1.BaseRenderContributionTime.afterFillStroke, 
        this.useStyle = !0, this.order = 0;
    }
    drawShape(image, context, x, y, doFill, doStroke, fVisible, sVisible, rectAttribute, drawContext, fillCb, strokeCb) {
        return super.drawShape(image, context, x, y, doFill, doStroke, fVisible, sVisible, rectAttribute, drawContext, fillCb, strokeCb);
    }
}

exports.DefaultImageRenderContribution = DefaultImageRenderContribution, exports.defaultImageRenderContribution = new DefaultImageRenderContribution, 
exports.defaultImageBackgroundRenderContribution = base_contribution_render_1.defaultBaseBackgroundRenderContribution;
//# sourceMappingURL=image-contribution-render.js.map
