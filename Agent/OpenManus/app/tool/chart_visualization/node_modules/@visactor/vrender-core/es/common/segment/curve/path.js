import { AABBBounds } from "@visactor/vutils";

export class CurvePath {
    constructor() {
        this._curves = [], this.bounds = new AABBBounds;
    }
    get curves() {
        return this._curves;
    }
    getCurveLengths() {
        return this._curves.map((curve => curve.getLength()));
    }
    getPointAt(t) {
        return {
            x: 0,
            y: 0
        };
    }
    getLength() {
        return 0;
    }
    getBounds() {
        return this.bounds;
    }
}
//# sourceMappingURL=path.js.map
