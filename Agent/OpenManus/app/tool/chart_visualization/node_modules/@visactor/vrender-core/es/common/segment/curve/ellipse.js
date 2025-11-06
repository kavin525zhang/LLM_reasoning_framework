import { Curve } from "./base";

import { CurveTypeEnum } from "../../enums";

export class EllipseCurve extends Curve {
    constructor(p0, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise) {
        super(), this.type = CurveTypeEnum.EllipseCurve, this.p0 = p0, this.radiusX = radiusX, 
        this.radiusY = radiusY, this.rotation = rotation, this.startAngle = startAngle, 
        this.endAngle = endAngle, this.anticlockwise = anticlockwise;
    }
    getPointAt(t) {
        throw new Error("EllipseCurve暂不支持getPointAt");
    }
    getAngleAt(t) {
        throw new Error("ArcCurve暂不支持getAngleAt");
    }
    calcLength() {
        throw new Error("EllipseCurve暂不支持updateLength");
    }
    calcProjLength(direction) {
        throw new Error("QuadraticBezierCurve暂不支持updateLength");
    }
    draw(path, percent) {
        throw new Error("暂不支持");
    }
    getYAt(x) {
        throw new Error("QuadraticBezierCurve暂不支持getYAt");
    }
    includeX(x) {
        throw new Error("QuadraticBezierCurve暂不支持includeX");
    }
}
//# sourceMappingURL=ellipse.js.map
