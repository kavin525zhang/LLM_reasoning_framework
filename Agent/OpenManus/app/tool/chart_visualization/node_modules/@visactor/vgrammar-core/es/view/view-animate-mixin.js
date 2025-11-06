import { mixin } from "@visactor/vutils";

import View from "./View";

import { ViewAnimate } from "./animate";

class ViewAnimateMixin {
    initAnimate(view) {
        return this.animate = new ViewAnimate(view), this.animate;
    }
}

export const registerViewAnimateAPI = () => {
    mixin(View, ViewAnimateMixin);
};
//# sourceMappingURL=view-animate-mixin.js.map
