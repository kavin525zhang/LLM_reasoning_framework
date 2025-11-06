import { commonGenCatmullRomSegments, point } from "./catmull-rom";

export class CatmullRomClosed {
    constructor(context, alpha = .5, startPoint) {
        this.context = context, this.startPoint = startPoint, this._alpha = alpha;
    }
    areaStart() {
        this._line = 0;
    }
    areaEnd() {
        this._line = NaN;
    }
    lineStart() {
        this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, 
        this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
    }
    lineEnd() {
        switch (this._point) {
          case 1:
            this.context.moveTo(this._x3, this._y3, this.lastPoint1), this.context.closePath();
            break;

          case 2:
            this.context.lineTo(this._x3, this._y3, !1 !== this._lastDefined1 && !1 !== this._lastDefined2, this.lastPoint1), 
            this.context.closePath();
            break;

          case 3:
            this.point({
                x: this._x3,
                y: this._y3
            }), this.point({
                x: this._x4,
                y: this._y4
            }), this.point({
                x: this._x5,
                y: this._y5
            });
        }
    }
    point(p) {
        const {x: x, y: y} = p;
        if (this._point) {
            const x23 = this._x2 - x, y23 = this._y2 - y;
            this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
        }
        switch (this._point) {
          case 0:
            this._point = 1, this._x3 = x, this._y3 = y;
            break;

          case 1:
            this._point = 2, this.context.moveTo(this._x4 = x, this._y4 = y, p);
            break;

          case 2:
            this._point = 3, this._x5 = x, this._y5 = y;
            break;

          default:
            point(this, x, y, !1 !== this._lastDefined1 && !1 !== this._lastDefined2, p);
        }
        this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, 
        this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = x, 
        this._y0 = this._y1, this._y1 = this._y2, this._y2 = y, this._lastDefined1 = this._lastDefined2, 
        this._lastDefined2 = p.defined, this.lastPoint0 = this.lastPoint1, this.lastPoint1 = p;
    }
    tryUpdateLength() {
        return this.context.tryUpdateLength();
    }
}

export const genCatmullRomClosedSegments = commonGenCatmullRomSegments("catmullRomClosed", CatmullRomClosed);
//# sourceMappingURL=catmull-rom-close.js.map
