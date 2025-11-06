import { abs, atan2, max, min, PointService } from "@visactor/vutils";

import { Curve } from "./base";

import { CurveTypeEnum, Direction } from "../../enums";

import { cubicLength, cubicPointAt, quadPointAt } from "../../bezier-utils";

import { QuadraticBezierCurve } from "./quadratic-bezier";

export function divideCubic(curve, t) {
    const {p0: p0, p1: p1, p2: p2, p3: p3} = curve, pt = cubicPointAt(p0, p1, p2, p3, t), c1 = PointService.pointAtPP(p0, p1, t), c2 = PointService.pointAtPP(p1, p2, t), c3 = PointService.pointAtPP(p2, p3, t), c12 = PointService.pointAtPP(c1, c2, t), c23 = PointService.pointAtPP(c2, c3, t);
    return [ new CubicBezierCurve(p0, c1, c12, pt), new CubicBezierCurve(pt, c23, c3, p3) ];
}

export function divideQuad(curve, t) {
    const {p0: p0, p1: p1, p2: p2} = curve, pt = quadPointAt(p0, p1, p2, t), c1 = PointService.pointAtPP(p0, p1, t), c2 = PointService.pointAtPP(p1, p2, t);
    return [ new QuadraticBezierCurve(p0, c1, pt), new QuadraticBezierCurve(pt, c2, p2) ];
}

export class CubicBezierCurve extends Curve {
    constructor(p0, p1, p2, p3) {
        super(), this.type = CurveTypeEnum.CubicBezierCurve, this.p0 = p0, this.p1 = p1, 
        this.p2 = p2, this.p3 = p3;
    }
    _validPoint() {
        return Number.isFinite(this.p0.x + this.p0.y + this.p1.x + this.p1.y + this.p2.x + this.p2.y + this.p3.x + this.p3.y);
    }
    getPointAt(t) {
        if (!1 !== this.defined) return cubicPointAt(this.p0, this.p1, this.p2, this.p3, t);
        throw new Error("defined为false的点不能getPointAt");
    }
    calcLength() {
        return this._validPoint() ? cubicLength(this.p0, this.p1, this.p2, this.p3, 0) : 60;
    }
    calcProjLength(direction) {
        return direction === Direction.ROW ? abs(this.p0.x - this.p3.x) : direction === Direction.COLUMN ? abs(this.p0.y - this.p3.y) : 0;
    }
    getAngleAt(t) {
        const minT = max(t - .01, 0), maxT = min(t + .01, 1), minP = this.getPointAt(minT), maxP = this.getPointAt(maxT);
        return atan2(maxP.y - minP.y, maxP.x - minP.x);
    }
    draw(path, x, y, sx, sy, percent) {
        if (path.moveTo(this.p0.x * sx + x, this.p0.y * sy + y), percent >= 1) path.bezierCurveTo(this.p1.x * sx + x, this.p1.y * sy + y, this.p2.x * sx + x, this.p2.y * sy + y, this.p3.x * sx + x, this.p3.y * sy + y); else if (percent > 0) {
            const [curve1] = divideCubic(this, percent);
            path.bezierCurveTo(curve1.p1.x * sx + x, curve1.p1.y * sy + y, curve1.p2.x * sx + x, curve1.p2.y * sy + y, curve1.p3.x * sx + x, curve1.p3.y * sy + y);
        }
    }
    includeX(x) {
        const minX = min(this.p0.x, this.p1.x, this.p2.x, this.p3.x), maxX = max(this.p0.x, this.p1.x, this.p2.x, this.p3.x);
        return x >= minX && x <= maxX;
    }
    getYAt(x) {
        const minX = min(this.p0.x, this.p1.x, this.p2.x, this.p3.x), t = (x - minX) / (max(this.p0.x, this.p1.x, this.p2.x, this.p3.x) - minX);
        return this.getPointAt(t).y;
    }
}
//# sourceMappingURL=cubic-bezier.js.map
