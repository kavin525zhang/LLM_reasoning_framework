"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.drawCardioid = exports.drawRegularPolygon = exports.generateCardioidPoints = exports.generatePoints = exports.generateMaskCanvas = exports.generateIsEmptyPixel = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), shapes_1 = require("./shapes"), vutils_1 = require("@visactor/vutils"), generateIsEmptyPixel = backgroundColor => {
    if (!backgroundColor || "#fff" === backgroundColor) return (imageData, y, x) => {
        const width = imageData.width;
        return 0 === imageData.data[y * width * 4 + 4 * x + 3] || 255 === imageData.data[y * width * 4 + 4 * x + 0] && 255 === imageData.data[y * width * 4 + 4 * x + 1] && 255 === imageData.data[y * width * 4 + 4 * x + 2];
    };
    const bctx = vrender_core_1.vglobal.createCanvas({
        width: 1,
        height: 1
    }).getContext("2d", {
        willReadFrequently: !0
    });
    bctx.fillStyle = backgroundColor, bctx.fillRect(0, 0, 1, 1);
    const bgPixel = bctx.getImageData(0, 0, 1, 1).data;
    return (imageData, y, x) => {
        const width = imageData.width;
        return [ 0, 1, 2, 3 ].every((i => imageData.data[4 * (y * width + x) + i] === bgPixel[i]));
    };
};

exports.generateIsEmptyPixel = generateIsEmptyPixel;

const generateMaskCanvas = (shape, width, height, cacheCanvas) => {
    const {backgroundColor: backgroundColor = "#fff"} = shape, maskCanvas = cacheCanvas || vrender_core_1.vglobal.createCanvas({
        width: width,
        height: height,
        dpr: 1
    }), tempContext = maskCanvas.getContext("2d", {
        willReadFrequently: !0
    });
    if (cacheCanvas) {
        const prevWidth = cacheCanvas.width, prevHeight = cacheCanvas.height;
        tempContext.clearRect(0, 0, prevWidth, prevHeight), cacheCanvas.style.width = `${width}px`, 
        cacheCanvas.style.height = `${height}px`, cacheCanvas.width = width, cacheCanvas.height = height;
    }
    return tempContext.fillStyle = backgroundColor, tempContext.fillRect(0, 0, maskCanvas.width, maskCanvas.height), 
    "text" === shape.type ? drawTextMask(shape, maskCanvas.width, maskCanvas.height, tempContext) : "geometric" === shape.type && drawGeometricMask(shape, maskCanvas.width, maskCanvas.height, tempContext), 
    maskCanvas;
};

exports.generateMaskCanvas = generateMaskCanvas;

const drawTextMask = (shape, width, height, ctx) => {
    const {fontFamily: fontFamily = "sans-serif", fontWeight: fontWeight = "normal", fontStyle: fontStyle = "normal", fontVariant: fontVariant = "normal", fill: fill, text: text, hollow: hollow} = shape;
    let baseFontSize = 12;
    ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${baseFontSize}px ${fontFamily}`, 
    ctx.textAlign = "center", ctx.textBaseline = "middle", ctx.fillStyle = null != fill ? fill : "black";
    const textMetrics = ctx.measureText(text), scale = "normal" !== fontStyle ? 1.1 : 1, actualWidth = (0, 
    vutils_1.isValid)(textMetrics.actualBoundingBoxRight) && (0, vutils_1.isValid)(textMetrics.actualBoundingBoxLeft) ? Math.ceil(scale * (Math.abs(textMetrics.actualBoundingBoxRight) + Math.abs(textMetrics.actualBoundingBoxLeft))) : 0, textWidth = Math.max(Math.ceil(textMetrics.width), actualWidth, baseFontSize);
    if (hollow && (ctx.globalCompositeOperation = "xor"), textWidth > width) {
        const scale = Math.min(width / textWidth, height / baseFontSize);
        ctx.fillText(text, width / 2, height / 2), ctx.scale(scale, scale);
    } else baseFontSize = Math.floor(baseFontSize * width / textWidth), baseFontSize = Math.min(baseFontSize, height), 
    ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${baseFontSize}px ${fontFamily}`, 
    ctx.fillText(text, Math.floor(width / 2), Math.floor(height / 2));
}, generatePoints = (center, radius, startAngle = 0, count) => {
    const angle = 2 * Math.PI / count;
    return new Array(count).fill(0).map(((entry, index) => (0, vutils_1.polarToCartesian)(center, radius, startAngle + index * angle)));
};

exports.generatePoints = generatePoints;

const generateCardioidPoints = (center, radius, startAngle = 0, count) => {
    const angle = 2 * Math.PI / count, func = (0, shapes_1.getShapeFunction)("cardioid");
    return new Array(count).fill(0).map(((entry, index) => {
        const theta = startAngle + index * angle, r = radius * func(theta);
        return (0, vutils_1.polarToCartesian)(center, r, theta);
    }));
};

exports.generateCardioidPoints = generateCardioidPoints;

const drawRegularPolygon = (ctx, points) => {
    ctx.beginPath(), points.forEach(((p, index) => {
        0 === index ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
    })), ctx.closePath(), ctx.fill();
};

exports.drawRegularPolygon = drawRegularPolygon;

const drawCardioid = (ctx, points) => {
    let prev;
    ctx.beginPath(), points.forEach(((p, index) => {
        0 === index ? ctx.moveTo(p.x, p.y) : ctx.bezierCurveTo(p.x, p.y, prev.x, prev.y, p.x, p.y), 
        prev = p;
    })), ctx.closePath(), ctx.fill();
};

exports.drawCardioid = drawCardioid;

const drawGeometricMask = (shape, width, height, ctx) => {
    const {fill: fill, hollow: hollow} = shape, {center: center, maxRadius: maxRadius} = (0, 
    shapes_1.getMaxRadiusAndCenter)(shape.shape, [ width, height ]);
    ctx.fillStyle = null != fill ? fill : "black", hollow && (ctx.globalCompositeOperation = "xor");
    const cx = center[0], cy = center[1];
    if ("cardioid" === shape.shape) (0, exports.drawCardioid)(ctx, (0, exports.generateCardioidPoints)({
        x: cx,
        y: cy
    }, maxRadius, 0, 100)); else if ("circle" === shape.shape) ctx.beginPath(), ctx.arc(cx, cy, maxRadius, 0, 2 * Math.PI, !0), 
    ctx.fill(); else if ("diamond" === shape.shape) (0, exports.drawRegularPolygon)(ctx, (0, 
    exports.generatePoints)({
        x: cx,
        y: cy
    }, maxRadius, -Math.PI / 2, 4)); else if ("square" === shape.shape) (0, exports.drawRegularPolygon)(ctx, (0, 
    exports.generatePoints)({
        x: cx,
        y: cy
    }, maxRadius, -Math.PI / 4, 4)); else if ("pentagon" === shape.shape) (0, exports.drawRegularPolygon)(ctx, (0, 
    exports.generatePoints)({
        x: cx,
        y: cy
    }, maxRadius, Math.PI / 2, 5)); else if ("triangle" === shape.shape || "triangleUpright" === shape.shape) (0, 
    exports.drawRegularPolygon)(ctx, (0, exports.generatePoints)({
        x: cx,
        y: cy
    }, maxRadius, -Math.PI / 2, 3)); else if ("triangleForward" === shape.shape) (0, 
    exports.drawRegularPolygon)(ctx, (0, exports.generatePoints)({
        x: cx,
        y: cy
    }, maxRadius, 0, 3)); else if ("star" === shape.shape) {
        const outterPoints = (0, exports.generatePoints)({
            x: cx,
            y: cy
        }, maxRadius, -Math.PI / 2, 5), innerPoints = (0, exports.generatePoints)({
            x: cx,
            y: cy
        }, maxRadius / (2 * Math.cos(Math.PI / 5)), -Math.PI / 2 + Math.PI / 5, 5), points = [];
        for (let i = 0; i < 5; i++) points.push(outterPoints[i]), points.push(innerPoints[i]);
        (0, exports.drawRegularPolygon)(ctx, points);
    } else ctx.fillRect(0, 0, width, height);
};
//# sourceMappingURL=image.js.map