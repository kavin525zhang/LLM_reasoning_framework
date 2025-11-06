"use strict";

var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerViewMorphAPI = void 0;

const vutils_1 = require("@visactor/vutils"), View_1 = __importDefault(require("./View")), morph_1 = require("../graph/animation/morph");

class ViewMorphMixin {
    morph(normalizedRunningConfig) {
        var _a;
        null === (_a = this._willMorphMarks) || void 0 === _a || _a.forEach((morphMarks => {
            (0, morph_1.morph)(morphMarks.prev, morphMarks.next, normalizedRunningConfig);
        })), this._willMorphMarks = null;
    }
    addMorphMarks(mark) {
        this._willMorphMarks || (this._willMorphMarks = []), this._willMorphMarks.push(mark);
    }
}

const registerViewMorphAPI = () => {
    (0, vutils_1.mixin)(View_1.default, ViewMorphMixin);
};

exports.registerViewMorphAPI = registerViewMorphAPI;
//# sourceMappingURL=view-morph-mixin.js.map
