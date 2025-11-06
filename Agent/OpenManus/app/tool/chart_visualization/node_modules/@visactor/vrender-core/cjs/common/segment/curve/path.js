"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.CurvePath = void 0;

const vutils_1 = require("@visactor/vutils");

class CurvePath {
    constructor() {
        this._curves = [], this.bounds = new vutils_1.AABBBounds;
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

exports.CurvePath = CurvePath;
//# sourceMappingURL=path.js.map
