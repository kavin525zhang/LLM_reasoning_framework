import { Curve } from "./base";

import { CurveTypeEnum } from "../../enums";

export class MoveCurve extends Curve {
    constructor(p0, p1) {
        super(), this.type = CurveTypeEnum.MoveCurve, this.p0 = p0, this.p1 = p1;
    }
    getAngleAt(t) {
        throw new Error("ArcCurve暂不支持getAngleAt");
    }
    getPointAt(t) {
        throw new Error("MoveCurve暂不支持getPointAt");
    }
    calcLength() {
        throw new Error("MoveCurve暂不支持updateLength");
    }
    calcProjLength(direction) {
        throw new Error("QuadraticBezierCurve暂不支持updateLength");
    }
    draw(path, x, y, sx, sy, percent) {
        path.moveTo(this.p1.x * sx + x, this.p1.y * sy + y);
    }
    includeX(x) {
        return !1;
    }
    getYAt(x) {
        return 1 / 0;
    }
}
//# sourceMappingURL=move.js.map
