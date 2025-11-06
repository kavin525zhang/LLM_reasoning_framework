import { ACustomAnimate, TagPointsUpdate } from "@visactor/vrender-core";

import { Point, isValidNumber, polarToCartesian, cartesianToPolar } from "@visactor/vutils";

import { isClose, isValidPoint, normalizeAngle } from "../../util";

export class PolarPointUpdate extends ACustomAnimate {
    constructor(from, to, duration, easing, params) {
        super(from, to, duration, easing, params), this._center = to.center, this._prevCenter = from.center, 
        this._center && this._prevCenter || (this.valid = !1);
    }
    getEndProps() {
        return !1 === this.valid ? {} : polarToCartesian(this._center, this._toRadius, this._toAngle);
    }
    onBind() {
        const {angle: fromAngle, radius: fromRadius} = cartesianToPolar(this.from, this._prevCenter), {angle: toAngle, radius: toRadius} = cartesianToPolar(this.to, this._center);
        isValidNumber(toAngle * toRadius) || (this.valid = !1), this._fromAngle = isValidNumber(fromAngle) ? fromAngle : toAngle, 
        this._fromRadius = isValidNumber(fromRadius) ? fromRadius : toRadius, this._toAngle = toAngle, 
        this._toRadius = toRadius, isClose(this._fromAngle, this._toAngle) && isClose(this._fromRadius, this._toRadius) && (this.valid = !1);
    }
    onUpdate(end, ratio, out) {
        if (!1 === this.valid) return out.x = this.to.x, void (out.y = this.to.y);
        if (end) {
            const {x: x, y: y} = this.getEndProps();
            out.x = x, out.y = y, out.center = this._center;
        } else {
            const {x: x, y: y} = polarToCartesian({
                x: this._prevCenter.x + (this._center.x - this._prevCenter.x) * ratio,
                y: this._prevCenter.y + (this._center.y - this._prevCenter.y) * ratio
            }, this._fromRadius + (this._toRadius - this._fromRadius) * ratio, this._fromAngle + (this._toAngle - this._fromAngle) * ratio);
            out.x = x, out.y = y;
        }
    }
}

export class PolarTagPointsUpdate extends TagPointsUpdate {
    constructor(from, to, duration, easing, params) {
        super(from, to, duration, easing, params), this._center = to.center, this._prevCenter = from.center;
    }
    onUpdate(end, ratio, out) {
        this.points = this.points.map(((point, index) => {
            const newPoint = this.polarPointInterpolation(this.interpolatePoints[index][0], this.interpolatePoints[index][1], ratio);
            return end && (out.center = this._center), newPoint.context = point.context, newPoint;
        })), out.points = this.points;
    }
    _interpolationSinglePoint(pointA, pointB, ratio) {
        if (!isValidPoint(pointA) && !isValidPoint(pointB)) return pointB;
        const polarPointA = cartesianToPolar(pointA, this._prevCenter), polarPointB = cartesianToPolar(pointB, this._center);
        let angleA = normalizeAngle(polarPointA.angle), angleB = normalizeAngle(polarPointB.angle);
        !isValidNumber(angleA) && isValidNumber(angleB) && (angleA = angleB), isValidNumber(angleA) && !isValidNumber(angleB) && (angleB = angleA);
        const angle = angleA + (angleB - angleA) * ratio, radius = polarPointA.radius + (polarPointB.radius - polarPointA.radius) * ratio;
        return polarToCartesian({
            x: this._prevCenter.x + (this._center.x - this._prevCenter.x) * ratio,
            y: this._prevCenter.y + (this._center.y - this._prevCenter.y) * ratio
        }, radius, angle);
    }
    polarPointInterpolation(pointA, pointB, ratio) {
        const {x: x, y: y} = this._interpolationSinglePoint(pointA, pointB, ratio), {x: x1, y: y1} = this._interpolationSinglePoint({
            x: pointA.x1,
            y: pointA.y1
        }, {
            x: pointB.x1,
            y: pointB.y1
        }, ratio), point = new Point(x, y, x1, y1);
        return point.defined = pointB.defined, point;
    }
}
//# sourceMappingURL=animation.js.map
