"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.StarSymbol = exports.star = void 0;

const vutils_1 = require("@visactor/vutils"), base_1 = require("./base"), kr = Math.sin(Math.PI / 10) / Math.sin(7 * Math.PI / 10), kx = Math.sin(vutils_1.tau / 10) * kr, ky = -Math.cos(vutils_1.tau / 10) * kr;

function star(ctx, r, transX, transY) {
    const x = kx * r, y = ky * r;
    ctx.moveTo(transX, -r + transY), ctx.lineTo(x + transX, y + transY);
    for (let i = 1; i < 5; ++i) {
        const a = vutils_1.tau * i / 5, c = Math.cos(a), s = Math.sin(a);
        ctx.lineTo(s * r + transX, -c * r + transY), ctx.lineTo(c * x - s * y + transX, s * x + c * y + transY);
    }
    return ctx.closePath(), !0;
}

exports.star = star;

class StarSymbol extends base_1.BaseSymbol {
    constructor() {
        super(...arguments), this.type = "star", this.pathStr = "M0 -1L0.22451398828979266 -0.3090169943749474L0.9510565162951535 -0.30901699437494745L0.3632712640026804 0.1180339887498948L0.5877852522924732 0.8090169943749473L8.326672684688674e-17 0.3819660112501051L-0.587785252292473 0.8090169943749476L-0.3632712640026804 0.11803398874989487L-0.9510565162951536 -0.30901699437494723L-0.22451398828979274 -0.30901699437494734Z";
    }
    draw(ctx, size, transX, transY) {
        return star(ctx, this.parseSize(size) / 2, transX, transY);
    }
    drawOffset(ctx, size, transX, transY, offset) {
        return star(ctx, this.parseSize(size) / 2 + offset, transX, transY);
    }
}

exports.StarSymbol = StarSymbol, exports.default = new StarSymbol;
//# sourceMappingURL=star.js.map
