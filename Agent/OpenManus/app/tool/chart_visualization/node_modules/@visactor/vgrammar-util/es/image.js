import { vglobal } from "@visactor/vrender-core";

import { getMaxRadiusAndCenter, getShapeFunction } from "./shapes";

import { isValid, polarToCartesian } from "@visactor/vutils";

export const generateIsEmptyPixel = backgroundColor => {
    if (!backgroundColor || "#fff" === backgroundColor) return (imageData, y, x) => {
        const width = imageData.width;
        return 0 === imageData.data[y * width * 4 + 4 * x + 3] || 255 === imageData.data[y * width * 4 + 4 * x + 0] && 255 === imageData.data[y * width * 4 + 4 * x + 1] && 255 === imageData.data[y * width * 4 + 4 * x + 2];
    };
    const bctx = vglobal.createCanvas({
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

export const generateMaskCanvas = (shape, width, height, cacheCanvas) => {
    const {backgroundColor: backgroundColor = "#fff"} = shape, maskCanvas = cacheCanvas || vglobal.createCanvas({
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

const drawTextMask = (shape, width, height, ctx) => {
    const {fontFamily: fontFamily = "sans-serif", fontWeight: fontWeight = "normal", fontStyle: fontStyle = "normal", fontVariant: fontVariant = "normal", fill: fill, text: text, hollow: hollow} = shape;
    let baseFontSize = 12;
    ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${baseFontSize}px ${fontFamily}`, 
    ctx.textAlign = "center", ctx.textBaseline = "middle", ctx.fillStyle = null != fill ? fill : "black";
    const textMetrics = ctx.measureText(text), scale = "normal" !== fontStyle ? 1.1 : 1, actualWidth = isValid(textMetrics.actualBoundingBoxRight) && isValid(textMetrics.actualBoundingBoxLeft) ? Math.ceil(scale * (Math.abs(textMetrics.actualBoundingBoxRight) + Math.abs(textMetrics.actualBoundingBoxLeft))) : 0, textWidth = Math.max(Math.ceil(textMetrics.width), actualWidth, baseFontSize);
    if (hollow && (ctx.globalCompositeOperation = "xor"), textWidth > width) {
        const scale = Math.min(width / textWidth, height / baseFontSize);
        ctx.fillText(text, width / 2, height / 2), ctx.scale(scale, scale);
    } else baseFontSize = Math.floor(baseFontSize * width / textWidth), baseFontSize = Math.min(baseFontSize, height), 
    ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${baseFontSize}px ${fontFamily}`, 
    ctx.fillText(text, Math.floor(width / 2), Math.floor(height / 2));
};

export const generatePoints = (center, radius, startAngle = 0, count) => {
    const angle = 2 * Math.PI / count;
    return new Array(count).fill(0).map(((entry, index) => polarToCartesian(center, radius, startAngle + index * angle)));
};

export const generateCardioidPoints = (center, radius, startAngle = 0, count) => {
    const angle = 2 * Math.PI / count, func = getShapeFunction("cardioid");
    return new Array(count).fill(0).map(((entry, index) => {
        const theta = startAngle + index * angle, r = radius * func(theta);
        return polarToCartesian(center, r, theta);
    }));
};

export const drawRegularPolygon = (ctx, points) => {
    ctx.beginPath(), points.forEach(((p, index) => {
        0 === index ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
    })), ctx.closePath(), ctx.fill();
};

export const drawCardioid = (ctx, points) => {
    let prev;
    ctx.beginPath(), points.forEach(((p, index) => {
        0 === index ? ctx.moveTo(p.x, p.y) : ctx.bezierCurveTo(p.x, p.y, prev.x, prev.y, p.x, p.y), 
        prev = p;
    })), ctx.closePath(), ctx.fill();
};

const drawGeometricMask = (shape, width, height, ctx) => {
    const {fill: fill, hollow: hollow} = shape, {center: center, maxRadius: maxRadius} = getMaxRadiusAndCenter(shape.shape, [ width, height ]);
    ctx.fillStyle = null != fill ? fill : "black", hollow && (ctx.globalCompositeOperation = "xor");
    const cx = center[0], cy = center[1];
    if ("cardioid" === shape.shape) drawCardioid(ctx, generateCardioidPoints({
        x: cx,
        y: cy
    }, maxRadius, 0, 100)); else if ("circle" === shape.shape) ctx.beginPath(), ctx.arc(cx, cy, maxRadius, 0, 2 * Math.PI, !0), 
    ctx.fill(); else if ("diamond" === shape.shape) drawRegularPolygon(ctx, generatePoints({
        x: cx,
        y: cy
    }, maxRadius, -Math.PI / 2, 4)); else if ("square" === shape.shape) drawRegularPolygon(ctx, generatePoints({
        x: cx,
        y: cy
    }, maxRadius, -Math.PI / 4, 4)); else if ("pentagon" === shape.shape) drawRegularPolygon(ctx, generatePoints({
        x: cx,
        y: cy
    }, maxRadius, Math.PI / 2, 5)); else if ("triangle" === shape.shape || "triangleUpright" === shape.shape) drawRegularPolygon(ctx, generatePoints({
        x: cx,
        y: cy
    }, maxRadius, -Math.PI / 2, 3)); else if ("triangleForward" === shape.shape) drawRegularPolygon(ctx, generatePoints({
        x: cx,
        y: cy
    }, maxRadius, 0, 3)); else if ("star" === shape.shape) {
        const outterPoints = generatePoints({
            x: cx,
            y: cy
        }, maxRadius, -Math.PI / 2, 5), innerPoints = generatePoints({
            x: cx,
            y: cy
        }, maxRadius / (2 * Math.cos(Math.PI / 5)), -Math.PI / 2 + Math.PI / 5, 5), points = [];
        for (let i = 0; i < 5; i++) points.push(outterPoints[i]), points.push(innerPoints[i]);
        drawRegularPolygon(ctx, points);
    } else ctx.fillRect(0, 0, width, height);
};
//# sourceMappingURL=image.js.map