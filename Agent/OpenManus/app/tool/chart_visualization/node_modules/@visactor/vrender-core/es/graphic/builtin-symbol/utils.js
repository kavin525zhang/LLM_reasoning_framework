import { isArray, AABBBounds, isNumber } from "@visactor/vutils";

import { renderCommandList } from "../../common/render-command-list";

const tempBounds = new AABBBounds;

export class CustomSymbolClass {
    constructor(type, path, isSvg = !1) {
        this.pathStr = "", this.type = type, isArray(path) ? this.svgCache = path : this.path = path, 
        this.isSvg = isSvg;
    }
    drawOffset(ctx, size, x, y, offset, z, cb) {
        return size = this.parseSize(size), this.isSvg ? !!this.svgCache && (this.svgCache.forEach((item => {
            ctx.beginPath(), renderCommandList(item.path.commandList, ctx, x, y, size, size), 
            cb && cb(item.path, item.attribute);
        })), !1) : (renderCommandList(this.path.commandList, ctx, x, y, size + offset, size + offset), 
        !1);
    }
    draw(ctx, size, x, y, z, cb) {
        return size = this.parseSize(size), this.drawOffset(ctx, size, x, y, 0, z, cb);
    }
    parseSize(size) {
        return isNumber(size) ? size : Math.min(size[0], size[1]);
    }
    drawWithClipRange(ctx, size, x, y, clipRange, z, cb) {
        return size = this.parseSize(size), this.isSvg ? !!this.svgCache && (this.svgCache.forEach((item => {
            item.path.drawWithClipRange(ctx, size, x, y, clipRange), cb && cb(item.path, item.attribute);
        })), !1) : (this.path.drawWithClipRange(ctx, size, x, y, clipRange), !1);
    }
    bounds(size, bounds) {
        if (size = this.parseSize(size), this.isSvg) {
            if (!this.svgCache) return;
            return bounds.clear(), void this.svgCache.forEach((({path: path}) => {
                tempBounds.x1 = path.bounds.x1 * size, tempBounds.y1 = path.bounds.y1 * size, tempBounds.x2 = path.bounds.x2 * size, 
                tempBounds.y2 = path.bounds.y2 * size, bounds.union(tempBounds);
            }));
        }
        this.path.bounds && (bounds.x1 = this.path.bounds.x1 * size, bounds.y1 = this.path.bounds.y1 * size, 
        bounds.x2 = this.path.bounds.x2 * size, bounds.y2 = this.path.bounds.y2 * size);
    }
}
//# sourceMappingURL=utils.js.map
