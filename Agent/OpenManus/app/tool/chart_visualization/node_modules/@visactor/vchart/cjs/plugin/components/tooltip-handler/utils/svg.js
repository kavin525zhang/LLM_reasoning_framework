"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getSvgHtml = void 0;

const common_1 = require("./common"), vrender_core_1 = require("@visactor/vrender-core"), vutils_1 = require("@visactor/vutils");

function getSvgHtml(option, gradientId) {
    var _a, _b, _c, _d, _e, _f;
    if (!option || !option.hasShape || !option.shapeType) return "";
    const styleString = 'style="display:inline-block;vertical-align:middle;"', {shapeType: shapeType, shapeFill: shapeFill, shapeStroke: shapeStroke, shapeHollow: shapeHollow = !1} = option, size = null !== (_a = option.shapeSize) && void 0 !== _a ? _a : 8, lineWidth = option.shapeLineWidth ? (0, 
    common_1.escapeHTML)(option.shapeLineWidth) + "px" : "0px";
    let fillString = "currentColor";
    const getStroke = () => shapeStroke ? (0, common_1.escapeHTML)(shapeStroke) : fillString, sizeNumber = size, createSymbol = symbolType => new vrender_core_1.Symbol({
        symbolType: symbolType,
        size: sizeNumber,
        fill: !0
    });
    let symbol = createSymbol(shapeType);
    const parsedPath = symbol.getParsedPath();
    let bounds, path;
    if (!parsedPath.path && parsedPath.pathStr && (symbol = createSymbol(parsedPath.pathStr)), 
    symbol.getParsedPath().path) {
        const pathModel = symbol.getParsedPath().path;
        path = pathModel.toString(), bounds = pathModel.bounds;
    } else parsedPath.isSvg && parsedPath.svgCache && (path = parsedPath.svgCache.map((s => s.path.toString())).join(), 
    bounds = parsedPath.svgCache.reduce(((acc, cur) => acc.union(cur.path.bounds)), new vutils_1.Bounds));
    let viewBox = `${bounds.x1} ${bounds.y1} ${bounds.width()} ${bounds.height()}`;
    if ("0px" !== lineWidth) {
        const [x, y, w, h] = viewBox.split(" ").map((n => Number(n))), lw = Number(lineWidth.slice(0, -2));
        viewBox = `${x - lw / 2} ${y - lw / 2} ${w + lw} ${h + lw}`;
    }
    if (!shapeFill || (0, vutils_1.isString)(shapeFill) || shapeHollow) return fillString = shapeHollow ? "none" : shapeFill ? (0, 
    common_1.escapeHTML)(shapeFill) : "currentColor", `\n    <svg ${styleString} width="${size}" height="${size}" viewBox="${viewBox}">\n      <path\n        d="${path}"\n        style="fill: ${fillString}; stroke: ${getStroke()}; stroke-width: ${lineWidth}"\n      >\n      </path>\n    </svg>`;
    if ((0, vutils_1.isObject)(shapeFill)) {
        fillString = "gradientColor" + (null != gradientId ? gradientId : "");
        let gradient = "";
        const stops = (null !== (_b = shapeFill.stops) && void 0 !== _b ? _b : []).map((s => `<stop offset="${(0, 
        common_1.escapeHTML)(s.offset.toString())}" stop-color="${(0, common_1.escapeHTML)(s.color)}"/>`)).join("");
        return "radial" === shapeFill.gradient ? gradient = `<radialGradient id="${fillString}" cx="50%" cy="50%" r="50%" fx="0%" fy="0%">\n      ${stops}\n      </radialGradient>` : "linear" === shapeFill.gradient && (gradient = `<linearGradient id="${fillString}" x1="${100 * (null !== (_c = shapeFill.x0) && void 0 !== _c ? _c : 0)}%" y1="${100 * (null !== (_d = shapeFill.y0) && void 0 !== _d ? _d : 0)}%" x2="${100 * (null !== (_e = shapeFill.x1) && void 0 !== _e ? _e : 0)}%" y2="${100 * (null !== (_f = shapeFill.y1) && void 0 !== _f ? _f : 0)}%">\n      ${stops}\n      </linearGradient>`), 
        `\n    <svg ${styleString} width="${size}" height="${size}" viewBox="-0.5 -0.5 1 1">\n      ${gradient}\n      <path\n        d="${path}"\n        style="fill: url(#${fillString}); stroke: ${getStroke()}; stroke-width: ${lineWidth}"\n      >\n      </path>\n    </svg>`;
    }
    return "";
}

exports.getSvgHtml = getSvgHtml;
//# sourceMappingURL=svg.js.map
