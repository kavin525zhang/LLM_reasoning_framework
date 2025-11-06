import { epsilon } from "@visactor/vutils";

import { genLinearSegments } from "./linear";

import { genCurveSegments, genSegContext } from "./common";

export function point(curveClass, x, y, defined, p) {
    let x1 = curveClass._x1, y1 = curveClass._y1, x2 = curveClass._x2, y2 = curveClass._y2;
    if (curveClass._l01_a > epsilon) {
        const a = 2 * curveClass._l01_2a + 3 * curveClass._l01_a * curveClass._l12_a + curveClass._l12_2a, n = 3 * curveClass._l01_a * (curveClass._l01_a + curveClass._l12_a);
        x1 = (x1 * a - curveClass._x0 * curveClass._l12_2a + curveClass._x2 * curveClass._l01_2a) / n, 
        y1 = (y1 * a - curveClass._y0 * curveClass._l12_2a + curveClass._y2 * curveClass._l01_2a) / n;
    }
    if (curveClass._l23_a > epsilon) {
        const b = 2 * curveClass._l23_2a + 3 * curveClass._l23_a * curveClass._l12_a + curveClass._l12_2a, m = 3 * curveClass._l23_a * (curveClass._l23_a + curveClass._l12_a);
        x2 = (x2 * b + curveClass._x1 * curveClass._l23_2a - x * curveClass._l12_2a) / m, 
        y2 = (y2 * b + curveClass._y1 * curveClass._l23_2a - y * curveClass._l12_2a) / m;
    }
    curveClass.context.bezierCurveTo(x1, y1, x2, y2, curveClass._x2, curveClass._y2, defined, curveClass.lastPoint1);
}

export class CatmullRom {
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
        this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
    }
    lineEnd() {
        switch (this._point) {
          case 2:
            this.context.lineTo(this._x2, this._y2, !1 !== this._lastDefined1 && !1 !== this._lastDefined2, this.lastPoint1);
            break;

          case 3:
            this.point({
                x: this._x2,
                y: this._y2
            });
        }
        (this._line || 0 !== this._line && 1 === this._point) && this.context.closePath(), 
        this._line = 1 - this._line;
    }
    point(p) {
        const {x: x, y: y} = p;
        if (this._point) {
            const x23 = this._x2 - x, y23 = this._y2 - y;
            this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
        }
        switch (this._point) {
          case 0:
            this._point = 1, this._line ? this.context.lineTo(x, y, !1 !== this._lastDefined1 && !1 !== this._lastDefined2) : this.context.moveTo(x, y);
            break;

          case 1:
            this._point = 2;
            break;

          case 2:
            this._point = 3;

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

export function commonGenCatmullRomSegments(type, cons) {
    return function(points, alpha, params = {}) {
        const {direction: direction, startPoint: startPoint} = params;
        if (points.length < 2 - Number(!!startPoint)) return null;
        if (points.length < 3 - Number(!!startPoint)) return genLinearSegments(points, params);
        const segContext = genSegContext(type, direction, points), gatmullRom = new cons(segContext, alpha, startPoint);
        return genCurveSegments(gatmullRom, points, 2), segContext;
    };
}

export const genCatmullRomSegments = commonGenCatmullRomSegments("catmullRom", CatmullRom);
//# sourceMappingURL=catmull-rom.js.map
