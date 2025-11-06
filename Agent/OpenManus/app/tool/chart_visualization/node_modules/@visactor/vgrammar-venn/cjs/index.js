"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
    void 0 === k2 && (k2 = k);
    var desc = Object.getOwnPropertyDescriptor(m, k);
    desc && !("get" in desc ? !m.__esModule : desc.writable || desc.configurable) || (desc = {
        enumerable: !0,
        get: function() {
            return m[k];
        }
    }), Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    void 0 === k2 && (k2 = k), o[k2] = m[k];
}), __exportStar = this && this.__exportStar || function(m, exports) {
    for (var p in m) "default" === p || Object.prototype.hasOwnProperty.call(exports, p) || __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerVennTransforms = exports.vennMarkTransform = exports.vennTransform = void 0;

const vgrammar_core_1 = require("@visactor/vgrammar-core"), venn_1 = require("./venn");

__exportStar(require("./interface"), exports), __exportStar(require("./animation"), exports), 
exports.vennTransform = venn_1.transform, exports.vennMarkTransform = venn_1.transformMark;

const registerVennTransforms = () => {
    vgrammar_core_1.Factory.registerTransform("venn", {
        transform: venn_1.transform,
        markPhase: "beforeJoin"
    }, !0), vgrammar_core_1.Factory.registerTransform("vennMark", {
        transform: venn_1.transformMark,
        markPhase: "beforeJoin"
    }, !0);
};

exports.registerVennTransforms = registerVennTransforms;
//# sourceMappingURL=index.js.map