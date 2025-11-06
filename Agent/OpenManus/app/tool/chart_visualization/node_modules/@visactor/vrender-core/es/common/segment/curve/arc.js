import { CurveTypeEnum } from "../../enums";

import { Curve } from "./base";

export class ArcCurve extends Curve {
    constructor(p0, p1, radius) {
        super(), this.type = CurveTypeEnum.ArcCurve, this.p0 = p0, this.p1 = p1, this.radius = radius;
    }
    getPointAt(t) {
        throw new Error("ArcCurve暂不支持getPointAt");
    }
    calcLength() {
        throw new Error("ArcCurve暂不支持updateLength");
    }
    calcProjLength(direction) {
        throw new Error("QuadraticBezierCurve暂不支持updateLength");
    }
    getAngleAt(t) {
        throw new Error("ArcCurve暂不支持getAngleAt");
    }
    draw(path, percent) {
        throw new Error("暂不支持");
    }
    getYAt(x) {
        throw new Error("ArcCurve暂不支持getYAt");
    }
    includeX(x) {
        throw new Error("ArcCurve暂不支持includeX");
    }
}
//# sourceMappingURL=arc.js.map
