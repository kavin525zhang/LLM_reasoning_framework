import { BaseSymbol } from "./base";

export function trianglDownOffset(ctx, r, x, y, offset = 0) {
    return ctx.moveTo(x - r - 2 * offset, y - r - offset), ctx.lineTo(x + r + 2 * offset, y - r - offset), 
    ctx.lineTo(x, y + r + 2 * offset), ctx.closePath(), !0;
}

export class TriangleDownSymbol extends BaseSymbol {
    constructor() {
        super(...arguments), this.type = "triangleDown", this.pathStr = "M-0.5,-0.5 L0.5,-0.5 L0,0.5 Z";
    }
    draw(ctx, size, x, y) {
        return trianglDownOffset(ctx, this.parseSize(size) / 2, x, y);
    }
    drawOffset(ctx, size, x, y, offset) {
        return trianglDownOffset(ctx, this.parseSize(size) / 2, x, y, offset);
    }
}

export default new TriangleDownSymbol;
//# sourceMappingURL=triangle-down.js.map
