import { BaseSymbol } from "./base";

export function trianglUpOffset(ctx, r, x, y, offset = 0) {
    return ctx.moveTo(x + r + 2 * offset, r + y + offset), ctx.lineTo(x - r - 2 * offset, r + y + offset), 
    ctx.lineTo(x, y - r - 2 * offset), ctx.closePath(), !0;
}

export class TriangleUpSymbol extends BaseSymbol {
    constructor() {
        super(...arguments), this.type = "triangleUp", this.pathStr = "M0.5,0.5 L-0.5,0.5 L0,-0.5 Z";
    }
    draw(ctx, size, x, y) {
        return trianglUpOffset(ctx, this.parseSize(size) / 2, x, y);
    }
    drawOffset(ctx, size, x, y, offset) {
        return trianglUpOffset(ctx, this.parseSize(size) / 2, x, y, offset);
    }
}

export default new TriangleUpSymbol;
//# sourceMappingURL=triangle-up.js.map
