"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.measureText = exports.initTextMeasure = void 0;

const vrender_components_1 = require("@visactor/vrender-components"), token_1 = require("../theme/token"), initTextMeasure = (textSpec, option, useNaiveCanvas) => (0, 
vrender_components_1.initTextMeasure)(textSpec, option, useNaiveCanvas, {
    fontFamily: token_1.token.fontFamily,
    fontSize: token_1.token.fontSize
});

exports.initTextMeasure = initTextMeasure;

const measureText = (text, textSpec, option, useNaiveCanvas) => (0, exports.initTextMeasure)(textSpec, option, useNaiveCanvas).measure(text);

exports.measureText = measureText;
//# sourceMappingURL=text.js.map
