"use strict";

var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerViewAnimateAPI = void 0;

const vutils_1 = require("@visactor/vutils"), View_1 = __importDefault(require("./View")), animate_1 = require("./animate");

class ViewAnimateMixin {
    initAnimate(view) {
        return this.animate = new animate_1.ViewAnimate(view), this.animate;
    }
}

const registerViewAnimateAPI = () => {
    (0, vutils_1.mixin)(View_1.default, ViewAnimateMixin);
};

exports.registerViewAnimateAPI = registerViewAnimateAPI;
//# sourceMappingURL=view-animate-mixin.js.map
