"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.TriangleLeftSymbol = exports.trianglLeftOffset = void 0;

const base_1 = require("./base");

function trianglLeftOffset(ctx, r, x, y, offset) {
    return ctx.moveTo(-r + x - 2 * offset, y), ctx.lineTo(r + x + offset, r + y + 2 * offset), 
    ctx.lineTo(r + x + offset, y - r - 2 * offset), ctx.closePath(), !0;
}

exports.trianglLeftOffset = trianglLeftOffset;

class TriangleLeftSymbol extends base_1.BaseSymbol {
    constructor() {
        super(...arguments), this.type = "triangleLeft", this.pathStr = "M-0.5,0 L0.5,0.5 L0.5,-0.5 Z";
    }
    draw(ctx, size, x, y) {
        return trianglLeftOffset(ctx, this.parseSize(size) / 2, x, y, 0);
    }
    drawOffset(ctx, size, x, y, offset) {
        return trianglLeftOffset(ctx, this.parseSize(size) / 2, x, y, offset);
    }
}

exports.TriangleLeftSymbol = TriangleLeftSymbol, exports.default = new TriangleLeftSymbol;
//# sourceMappingURL=triangle-left.js.map
