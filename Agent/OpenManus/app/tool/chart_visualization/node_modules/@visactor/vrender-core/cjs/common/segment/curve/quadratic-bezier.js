"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.QuadraticBezierCurve = void 0;

const bezier_utils_1 = require("../../bezier-utils"), enums_1 = require("../../enums"), base_1 = require("./base"), vutils_1 = require("@visactor/vutils"), cubic_bezier_1 = require("./cubic-bezier");

class QuadraticBezierCurve extends base_1.Curve {
    constructor(p0, p1, p2) {
        super(), this.type = enums_1.CurveTypeEnum.QuadraticBezierCurve, this.p0 = p0, this.p1 = p1, 
        this.p2 = p2;
    }
    _validPoint() {
        return Number.isFinite(this.p0.x + this.p0.y + this.p1.x + this.p1.y + this.p2.x + this.p2.y);
    }
    getPointAt(t) {
        if (!1 !== this.defined) return (0, bezier_utils_1.quadPointAt)(this.p0, this.p1, this.p2, t);
        throw new Error("defined为false的点不能getPointAt");
    }
    calcLength() {
        return this._validPoint() ? (0, bezier_utils_1.quadLength)(this.p0, this.p1, this.p2, 0) : 60;
    }
    calcProjLength(direction) {
        return direction === enums_1.Direction.ROW ? (0, vutils_1.abs)(this.p0.x - this.p2.x) : direction === enums_1.Direction.COLUMN ? (0, 
        vutils_1.abs)(this.p0.y - this.p2.y) : 0;
    }
    getAngleAt(t) {
        const minT = (0, vutils_1.max)(t - .01, 0), maxT = (0, vutils_1.min)(t + .01, 1), minP = this.getPointAt(minT), maxP = this.getPointAt(maxT);
        return (0, vutils_1.atan2)(maxP.y - minP.y, maxP.x - minP.x);
    }
    draw(path, x, y, sx, sy, percent) {
        if (path.moveTo(this.p0.x * sx + x, this.p0.y * sy + y), percent >= 1) path.quadraticCurveTo(this.p1.x * sx + x, this.p1.y * sy + y, this.p2.x * sx + x, this.p2.y * sy + y); else if (percent > 0) {
            const [curve1] = (0, cubic_bezier_1.divideQuad)(this, percent);
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

exports.QuadraticBezierCurve = QuadraticBezierCurve;
//# sourceMappingURL=quadratic-bezier.js.map
