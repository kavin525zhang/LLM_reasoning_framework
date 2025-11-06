"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.GroupFadeOut = exports.GroupFadeIn = void 0;

const animate_1 = require("./animate");

class GroupFadeIn extends animate_1.ACustomAnimate {
    getEndProps() {
        return {};
    }
    onBind() {
        this.target.setTheme({
            common: {
                opacity: 0
            }
        });
    }
    onEnd() {
        this.target.setTheme({
            common: {
                opacity: 1
            }
        });
    }
    onUpdate(end, ratio, out) {
        this.target.setTheme({
            common: {
                opacity: ratio
            }
        });
    }
}

exports.GroupFadeIn = GroupFadeIn;

class GroupFadeOut extends animate_1.ACustomAnimate {
    getEndProps() {
        return {};
    }
    onBind() {
        this.target.setTheme({
            common: {
                opacity: 1
            }
        });
    }
    onEnd() {
        this.target.setTheme({
            common: {
                opacity: 0
            }
        });
    }
    onUpdate(end, ratio, out) {
        this.target.setTheme({
            common: {
                opacity: 1 - ratio
            }
        });
    }
}

exports.GroupFadeOut = GroupFadeOut;
//# sourceMappingURL=group-fade.js.map