"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.WyeSymbol = exports.wye = void 0;

const vutils_1 = require("@visactor/vutils"), base_1 = require("./base"), c = -.5, s = (0, 
vutils_1.sqrt)(3) / 2, k = 1 / (0, vutils_1.sqrt)(12), a = 3 * (k / 2 + 1);

function wye(ctx, r, transX, transY) {
    const x0 = r / 2, y0 = r * k, x1 = x0, y1 = r * k + r, x2 = -x1, y2 = y1;
    return ctx.moveTo(x0 + transX, y0 + transY), ctx.lineTo(x1 + transX, y1 + transY), 
    ctx.lineTo(x2 + transX, y2 + transY), ctx.lineTo(c * x0 - s * y0 + transX, s * x0 + c * y0 + transY), 
    ctx.lineTo(c * x1 - s * y1 + transX, s * x1 + c * y1 + transY), ctx.lineTo(c * x2 - s * y2 + transX, s * x2 + c * y2 + transY), 
    ctx.lineTo(c * x0 + s * y0 + transX, c * y0 - s * x0 + transY), ctx.lineTo(c * x1 + s * y1 + transX, c * y1 - s * x1 + transY), 
    ctx.lineTo(c * x2 + s * y2 + transX, c * y2 - s * x2 + transY), ctx.closePath(), 
    !1;
}

exports.wye = wye;

class WyeSymbol extends base_1.BaseSymbol {
    constructor() {
        super(...arguments), this.type = "wye", this.pathStr = "M0.25 0.14433756729740646L0.25 0.6443375672974064L-0.25 0.6443375672974064L-0.25 0.14433756729740643L-0.6830127018922193 -0.10566243270259357L-0.4330127018922193 -0.5386751345948129L0 -0.28867513459481287L0.4330127018922193 -0.5386751345948129L0.6830127018922193 -0.10566243270259357Z";
    }
    draw(ctx, size, transX, transY) {
        return wye(ctx, this.parseSize(size) / 2, transX, transY);
    }
    drawOffset(ctx, size, transX, transY, offset) {
        return wye(ctx, this.parseSize(size) / 2 + offset, transX, transY);
    }
}

exports.WyeSymbol = WyeSymbol, exports.default = new WyeSymbol;
//# sourceMappingURL=wye.js.map
