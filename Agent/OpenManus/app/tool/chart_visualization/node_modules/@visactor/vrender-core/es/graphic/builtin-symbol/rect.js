import { isNumber } from "@visactor/vutils";

import { BaseSymbol } from "./base";

export function rectSizeArray(ctx, size, x, y) {
    return ctx.rect(x - size[0] / 2, y - size[1] / 2, size[0], size[1]), !1;
}

export function rectSize(ctx, size, x, y) {
    const w = size, h = size / 2;
    return ctx.rect(x - w / 2, y - h / 2, w, h), !1;
}

export class RectSymbol extends BaseSymbol {
    constructor() {
        super(...arguments), this.type = "rect", this.pathStr = "M -0.5,0.25 L 0.5,0.25 L 0.5,-0.25,L -0.5,-0.25 Z";
    }
    draw(ctx, size, x, y) {
        return isNumber(size) ? rectSize(ctx, size, x, y) : rectSizeArray(ctx, size, x, y);
    }
    drawWithClipRange(ctx, size, x, y, clipRange, z, cb) {
        isNumber(size) && (size = [ size, size / 2 ]);
        const drawLength = 2 * (size[0] + size[1]) * clipRange, points = [ {
            x: x + size[0] / 2,
            y: y - size[1] / 2
        }, {
            x: x + size[0] / 2,
            y: y + size[1] / 2
        }, {
            x: x - size[0] / 2,
            y: y + size[1] / 2
        }, {
            x: x - size[0] / 2,
            y: y - size[1] / 2
        } ];
        let currLength = 0, lastP = points[3];
        ctx.moveTo(lastP.x, lastP.y);
        for (let i = 0; i < points.length; i++) {
            const p = points[i], len = Math.sqrt((p.x - lastP.x) * (p.x - lastP.x) + (p.y - lastP.y) * (p.y - lastP.y));
            if (currLength + len > drawLength) {
                const dx = (p.x - lastP.x) * (drawLength - currLength) / len, dy = (p.y - lastP.y) * (drawLength - currLength) / len;
                ctx.lineTo(lastP.x + dx, lastP.y + dy);
                break;
            }
            ctx.lineTo(p.x, p.y), lastP = p, currLength += len;
        }
        return !1;
    }
    drawOffset(ctx, size, x, y, offset) {
        return isNumber(size) ? rectSize(ctx, size + 2 * offset, x, y) : rectSizeArray(ctx, [ size[0] + 2 * offset, size[1] + 2 * offset ], x, y);
    }
}

export default new RectSymbol;
//# sourceMappingURL=rect.js.map
