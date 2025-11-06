import { mixin } from "@visactor/vutils";

import View from "./View";

import { morph } from "../graph/animation/morph";

class ViewMorphMixin {
    morph(normalizedRunningConfig) {
        var _a;
        null === (_a = this._willMorphMarks) || void 0 === _a || _a.forEach((morphMarks => {
            morph(morphMarks.prev, morphMarks.next, normalizedRunningConfig);
        })), this._willMorphMarks = null;
    }
    addMorphMarks(mark) {
        this._willMorphMarks || (this._willMorphMarks = []), this._willMorphMarks.push(mark);
    }
}

export const registerViewMorphAPI = () => {
    mixin(View, ViewMorphMixin);
};
//# sourceMappingURL=view-morph-mixin.js.map
