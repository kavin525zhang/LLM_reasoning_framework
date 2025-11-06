"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.transformLegendTitleAttributes = void 0;

const vutils_1 = require("@visactor/vutils"), vutils_extension_1 = require("@visactor/vutils-extension"), style_1 = require("../../util/style");

function transformLegendTitleAttributes(title) {
    var _a, _b;
    const transformedTitle = Object.assign({}, title);
    return (0, vutils_1.isEmpty)(title.style) || (transformedTitle.textStyle = (0, style_1.transformToGraphic)(title.style)), 
    (0, vutils_1.isEmpty)(title.textStyle) || (0, vutils_extension_1.mergeSpec)(transformedTitle.textStyle, (0, 
    style_1.transformToGraphic)(title.textStyle)), (null === (_a = title.shape) || void 0 === _a ? void 0 : _a.style) && (0, 
    style_1.transformToGraphic)(transformedTitle.shape.style), (null === (_b = title.background) || void 0 === _b ? void 0 : _b.style) && (0, 
    style_1.transformToGraphic)(transformedTitle.background.style), transformedTitle;
}

exports.transformLegendTitleAttributes = transformLegendTitleAttributes;
//# sourceMappingURL=util.js.map
