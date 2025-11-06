import { BaseSymbol } from "./base";

export function trianglRightOffset(ctx, r, x, y, offset = 0) {
    return ctx.moveTo(x - r - offset, r + y + 2 * offset), ctx.lineTo(r + x + 2 * offset, y), 
    ctx.lineTo(x - r - offset, y - r - 2 * offset), ctx.closePath(), !0;
}

export class TriangleRightSymbol extends BaseSymbol {
    constructor() {
        super(...arguments), this.type = "triangleRight", this.pathStr = "M-0.5,0.5 L0.5,0 L-0.5,-0.5 Z";
    }
    draw(ctx, size, x, y) {
        return trianglRightOffset(ctx, this.parseSize(size) / 2, x, y);
    }
    drawOffset(ctx, size, x, y, offset) {
        return trianglRightOffset(ctx, this.parseSize(size) / 2, x, y, offset);
    }
}

export default new TriangleRightSymbol;
//# sourceMappingURL=triangle-right.js.map
