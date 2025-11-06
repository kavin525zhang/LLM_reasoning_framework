import { defaultBaseBackgroundRenderContribution } from "./base-contribution-render";

import { BaseRenderContributionTime } from "../../../../common/enums";

import { DefaultRectRenderContribution } from "./rect-contribution-render";

export class DefaultImageRenderContribution extends DefaultRectRenderContribution {
    constructor() {
        super(...arguments), this.time = BaseRenderContributionTime.afterFillStroke, this.useStyle = !0, 
        this.order = 0;
    }
    drawShape(image, context, x, y, doFill, doStroke, fVisible, sVisible, rectAttribute, drawContext, fillCb, strokeCb) {
        return super.drawShape(image, context, x, y, doFill, doStroke, fVisible, sVisible, rectAttribute, drawContext, fillCb, strokeCb);
    }
}

export const defaultImageRenderContribution = new DefaultImageRenderContribution;

export const defaultImageBackgroundRenderContribution = defaultBaseBackgroundRenderContribution;
//# sourceMappingURL=image-contribution-render.js.map
