"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerMarkAnimateAPI = void 0;

const vutils_1 = require("@visactor/vutils"), animate_1 = require("../graph/animation/animate"), mark_1 = require("./mark");

class MarkAnimateMixin {
    constructor() {
        this.animate = new animate_1.Animate(this, {});
    }
    initAnimate(spec) {
        this.animate || (this.animate = new animate_1.Animate(this, spec.animation), this.needAnimate() && this.animate.updateState(spec.animationState));
    }
    reuseAnimate(mark) {
        this.animate = mark.animate, this.animate.mark = this;
    }
    updateAnimate(spec) {
        this.animate.updateConfig(spec.animation), this.animate.updateState(spec.animationState);
    }
}

const registerMarkAnimateAPI = () => {
    (0, vutils_1.mixin)(mark_1.Mark, MarkAnimateMixin);
};

exports.registerMarkAnimateAPI = registerMarkAnimateAPI;
//# sourceMappingURL=mark-animate-mixin.js.map
