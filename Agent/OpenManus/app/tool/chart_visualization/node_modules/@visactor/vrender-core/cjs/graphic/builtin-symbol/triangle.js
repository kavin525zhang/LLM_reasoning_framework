"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.TriangleSymbol = void 0;

const triangle_up_1 = require("./triangle-up");

class TriangleSymbol extends triangle_up_1.TriangleUpSymbol {
    constructor() {
        super(...arguments), this.type = "triangle";
    }
}

exports.TriangleSymbol = TriangleSymbol, exports.default = new TriangleSymbol;
//# sourceMappingURL=triangle.js.map
