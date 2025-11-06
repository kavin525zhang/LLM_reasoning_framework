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
}), exports.getPolarDimensionInfo = exports.getCartesianDimensionInfo = void 0, 
__exportStar(require("./event"), exports), __exportStar(require("./events"), exports);

var util_1 = require("./events/dimension/util");

Object.defineProperty(exports, "getCartesianDimensionInfo", {
    enumerable: !0,
    get: function() {
        return util_1.getCartesianDimensionInfo;
    }
}), Object.defineProperty(exports, "getPolarDimensionInfo", {
    enumerable: !0,
    get: function() {
        return util_1.getPolarDimensionInfo;
    }
});
//# sourceMappingURL=index.js.map
