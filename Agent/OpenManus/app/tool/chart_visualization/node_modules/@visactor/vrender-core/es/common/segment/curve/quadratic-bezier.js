import { quadLength, quadPointAt } from "../../bezier-utils";

import { CurveTypeEnum, Direction } from "../../enums";

import { Curve } from "./base";

import { abs, atan2, max, min } from "@visactor/vutils";

import { divideQuad } from "./cubic-bezier";

export class QuadraticBezierCurve extends Curve {
    constructor(p0, p1, p2) {
        super(), this.type = CurveTypeEnum.QuadraticBezierCurve, this.p0 = p0, this.p1 = p1, 
        this.p2 = p2;
    }
    _validPoint() {
        return Number.isFinite(this.p0.x + this.p0.y + this.p1.x + this.p1.y + this.p2.x + this.p2.y);
    }
    getPointAt(t) {
        if (!1 !== this.defined) return quadPointAt(this.p0, this.p1, this.p2, t);
        throw new Error("defined为false的点不能getPointAt");
    }
    calcLength() {
        return this._validPoint() ? quadLength(this.p0, this.p1, this.p2, 0) : 60;
    }
    calcProjLength(direction) {
        return direction === Direction.ROW ? abs(this.p0.x - this.p2.x) : direction === Direction.COLUMN ? abs(this.p0.y - this.p2.y) : 0;
    }
    getAngleAt(t) {
        const minT = max(t - .01, 0), maxT = min(t + .01, 1), minP = this.getPointAt(minT), maxP = this.getPointAt(maxT);
        return atan2(maxP.y - minP.y, maxP.x - minP.x);
    }
    draw(path, x, y, sx, sy, percent) {
        if (path.moveTo(this.p0.x * sx + x, this.p0.y * sy + y), percent >= 1) path.quadraticCurveTo(this.p1.x * sx + x, this.p1.y * sy + y, this.p2.x * sx + x, this.p2.y * sy + y); else if (percent > 0) {
            const [curve1] = divideQuad(this, percent);
            path.quadraticCurveTo(curve1.p1.x * sx + x, curve1.p1.y * sy + y, curve1.p2.x * sx + x, curve1.p2.y * sy + y);
        }
    }
    getYAt(x) {
        throw new Error("QuadraticBezierCurve暂不支持getYAt");
    }
    includeX(x) {
        throw new Error("QuadraticBezierCurve暂不支持includeX");
    }
}
//# sourceMappingURL=quadratic-bezier.js.map
