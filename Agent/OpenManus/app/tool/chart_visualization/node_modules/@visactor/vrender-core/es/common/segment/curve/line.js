import { abs, atan2, PointService } from "@visactor/vutils";

import { Curve } from "./base";

import { CurveTypeEnum, Direction } from "../../enums";

export function divideLinear(curve, t) {
    const {p0: p0, p1: p1} = curve, c1 = PointService.pointAtPP(p0, p1, t);
    return [ new LineCurve(p0, c1), new LineCurve(c1, p1) ];
}

export class LineCurve extends Curve {
    constructor(p0, p1) {
        super(), this.type = CurveTypeEnum.LineCurve, this.p0 = p0, this.p1 = p1;
    }
    getPointAt(t) {
        if (!1 !== this.defined) return PointService.pointAtPP(this.p0, this.p1, t);
        throw new Error("defined为false的点不能getPointAt");
    }
    getAngleAt(t) {
        return null == this.angle && (this.angle = atan2(this.p1.y - this.p0.y, this.p1.x - this.p0.x)), 
        this.angle;
    }
    _validPoint() {
        return Number.isFinite(this.p0.x + this.p0.y + this.p1.x + this.p1.y);
    }
    calcLength() {
        return this._validPoint() ? PointService.distancePP(this.p0, this.p1) : 60;
    }
    calcProjLength(direction) {
        return direction === Direction.ROW ? abs(this.p0.x - this.p1.x) : direction === Direction.COLUMN ? abs(this.p0.y - this.p1.y) : 0;
    }
    draw(path, x, y, sx, sy, percent) {
        if (path.moveTo(this.p0.x * sx + x, this.p0.y * sy + y), percent >= 1) path.lineTo(this.p1.x * sx + x, this.p1.y * sy + y); else if (percent > 0) {
            const p = this.getPointAt(percent);
            path.lineTo(p.x * sx + x, p.y * sy + y);
        }
    }
    includeX(x) {
        return x >= this.p0.x && x <= this.p1.x || x >= this.p1.x && x <= this.p0.x;
    }
    getYAt(x) {
        if (this.includeX(x)) {
            let minP = this.p0, maxP = this.p1;
            this.p0.x > this.p1.x && (minP = this.p1, maxP = this.p0);
            const percent = (x - minP.x) / (maxP.x - minP.x);
            return minP.y + percent * (maxP.y - minP.y);
        }
        return 1 / 0;
    }
}
//# sourceMappingURL=line.js.map
