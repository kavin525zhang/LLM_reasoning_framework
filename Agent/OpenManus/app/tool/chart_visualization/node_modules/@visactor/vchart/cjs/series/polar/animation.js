"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.PolarTagPointsUpdate = exports.PolarPointUpdate = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), vutils_1 = require("@visactor/vutils"), util_1 = require("../../util");

class PolarPointUpdate extends vrender_core_1.ACustomAnimate {
    constructor(from, to, duration, easing, params) {
        super(from, to, duration, easing, params), this._center = to.center, this._prevCenter = from.center, 
        this._center && this._prevCenter || (this.valid = !1);
    }
    getEndProps() {
        return !1 === this.valid ? {} : (0, vutils_1.polarToCartesian)(this._center, this._toRadius, this._toAngle);
    }
    onBind() {
        const {angle: fromAngle, radius: fromRadius} = (0, vutils_1.cartesianToPolar)(this.from, this._prevCenter), {angle: toAngle, radius: toRadius} = (0, 
        vutils_1.cartesianToPolar)(this.to, this._center);
        (0, vutils_1.isValidNumber)(toAngle * toRadius) || (this.valid = !1), this._fromAngle = (0, 
        vutils_1.isValidNumber)(fromAngle) ? fromAngle : toAngle, this._fromRadius = (0, 
        vutils_1.isValidNumber)(fromRadius) ? fromRadius : toRadius, this._toAngle = toAngle, 
        this._toRadius = toRadius, (0, util_1.isClose)(this._fromAngle, this._toAngle) && (0, 
        util_1.isClose)(this._fromRadius, this._toRadius) && (this.valid = !1);
    }
    onUpdate(end, ratio, out) {
        if (!1 === this.valid) return out.x = this.to.x, void (out.y = this.to.y);
        if (end) {
            const {x: x, y: y} = this.getEndProps();
            out.x = x, out.y = y, out.center = this._center;
        } else {
            const {x: x, y: y} = (0, vutils_1.polarToCartesian)({
                x: this._prevCenter.x + (this._center.x - this._prevCenter.x) * ratio,
                y: this._prevCenter.y + (this._center.y - this._prevCenter.y) * ratio
            }, this._fromRadius + (this._toRadius - this._fromRadius) * ratio, this._fromAngle + (this._toAngle - this._fromAngle) * ratio);
            out.x = x, out.y = y;
        }
    }
}

exports.PolarPointUpdate = PolarPointUpdate;

class PolarTagPointsUpdate extends vrender_core_1.TagPointsUpdate {
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
        if (!(0, util_1.isValidPoint)(pointA) && !(0, util_1.isValidPoint)(pointB)) return pointB;
        const polarPointA = (0, vutils_1.cartesianToPolar)(pointA, this._prevCenter), polarPointB = (0, 
        vutils_1.cartesianToPolar)(pointB, this._center);
        let angleA = (0, util_1.normalizeAngle)(polarPointA.angle), angleB = (0, util_1.normalizeAngle)(polarPointB.angle);
        !(0, vutils_1.isValidNumber)(angleA) && (0, vutils_1.isValidNumber)(angleB) && (angleA = angleB), 
        (0, vutils_1.isValidNumber)(angleA) && !(0, vutils_1.isValidNumber)(angleB) && (angleB = angleA);
        const angle = angleA + (angleB - angleA) * ratio, radius = polarPointA.radius + (polarPointB.radius - polarPointA.radius) * ratio;
        return (0, vutils_1.polarToCartesian)({
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
        }, ratio), point = new vutils_1.Point(x, y, x1, y1);
        return point.defined = pointB.defined, point;
    }
}

exports.PolarTagPointsUpdate = PolarTagPointsUpdate;
//# sourceMappingURL=animation.js.map
