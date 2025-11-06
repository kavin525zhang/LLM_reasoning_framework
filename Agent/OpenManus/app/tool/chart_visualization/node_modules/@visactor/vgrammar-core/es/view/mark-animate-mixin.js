import { mixin } from "@visactor/vutils";

import { Animate } from "../graph/animation/animate";

import { Mark } from "./mark";

class MarkAnimateMixin {
    constructor() {
        this.animate = new Animate(this, {});
    }
    initAnimate(spec) {
        this.animate || (this.animate = new Animate(this, spec.animation), this.needAnimate() && this.animate.updateState(spec.animationState));
    }
    reuseAnimate(mark) {
        this.animate = mark.animate, this.animate.mark = this;
    }
    updateAnimate(spec) {
        this.animate.updateConfig(spec.animation), this.animate.updateState(spec.animationState);
    }
}

export const registerMarkAnimateAPI = () => {
    mixin(Mark, MarkAnimateMixin);
};
//# sourceMappingURL=mark-animate-mixin.js.map
