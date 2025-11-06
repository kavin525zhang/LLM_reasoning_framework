"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.generatorPathEasingFunc = void 0;

const custom_path2d_1 = require("../common/custom-path2d"), segment_1 = require("../common/segment");

function generatorPathEasingFunc(path) {
    const customPath = new custom_path2d_1.CustomPath2D;
    return customPath.setCtx(new segment_1.CurveContext(customPath)), customPath.fromString(path, 0, 0, 1, 1), 
    x => customPath.getYAt(x);
}

exports.generatorPathEasingFunc = generatorPathEasingFunc;
//# sourceMappingURL=easing-func.js.map