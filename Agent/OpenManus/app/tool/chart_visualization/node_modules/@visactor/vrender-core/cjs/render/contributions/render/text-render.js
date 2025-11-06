"use strict";

var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
    var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}, __metadata = this && this.__metadata || function(k, v) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(k, v);
}, __param = this && this.__param || function(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.DefaultCanvasTextRender = void 0;

const inversify_lite_1 = require("../../../common/inversify-lite"), theme_1 = require("../../../graphic/theme"), constants_1 = require("../../../graphic/constants"), text_1 = require("../../../common/text"), base_render_1 = require("./base-render"), contribution_provider_1 = require("../../../common/contribution-provider"), constants_2 = require("./contributions/constants"), matrix_allocate_1 = require("../../../allocator/matrix-allocate"), vutils_1 = require("@visactor/vutils"), utils_1 = require("../../../common/utils"), text_contribution_render_1 = require("./contributions/text-contribution-render");

let DefaultCanvasTextRender = class extends base_render_1.BaseRender {
    constructor(textRenderContribitions) {
        super(), this.textRenderContribitions = textRenderContribitions, this.numberType = constants_1.TEXT_NUMBER_TYPE, 
        this.builtinContributions = [ text_contribution_render_1.defaultTextBackgroundRenderContribution ], 
        this.init(textRenderContribitions);
    }
    drawShape(text, context, x, y, drawContext, params, fillCb, strokeCb) {
        var _a, _b, _c;
        const textAttribute = (0, theme_1.getTheme)(text, null == params ? void 0 : params.theme).text, {text: str, underline: underline = textAttribute.underline, lineThrough: lineThrough = textAttribute.lineThrough, keepDirIn3d: keepDirIn3d = textAttribute.keepDirIn3d, direction: direction = textAttribute.direction, fontSize: fontSize = textAttribute.fontSize, verticalMode: verticalMode = textAttribute.verticalMode, x: originX = textAttribute.x, y: originY = textAttribute.y} = text.attribute, lineHeight = null !== (_a = (0, 
        utils_1.calculateLineHeight)(text.attribute.lineHeight, fontSize)) && void 0 !== _a ? _a : fontSize, data = this.valid(text, textAttribute, fillCb, strokeCb);
        if (!data) return;
        const {fVisible: fVisible, sVisible: sVisible, doFill: doFill, doStroke: doStroke} = data, transform3dMatrixToContextMatrix = !keepDirIn3d, z = this.z || 0;
        context.beginPath(), context.setShadowBlendStyle && context.setShadowBlendStyle(text, text.attribute, textAttribute), 
        this.beforeRenderStep(text, context, x, y, doFill, doStroke, fVisible, sVisible, textAttribute, drawContext, fillCb, strokeCb), 
        transform3dMatrixToContextMatrix && this.transformUseContext2d(text, textAttribute, z, context);
        const drawText = (t, offsetX, offsetY, direction) => {
            let _x = x + offsetX;
            const _y = y + offsetY;
            if (direction) {
                context.highPerformanceSave(), _x += fontSize;
                const matrix = matrix_allocate_1.matrixAllocate.allocate(1, 0, 0, 1, 0, 0);
                matrix.rotateByCenter(Math.PI / 2, _x, _y), context.transformFromMatrix(matrix, !0), 
                matrix_allocate_1.matrixAllocate.free(matrix);
            }
            doStroke && (strokeCb ? strokeCb(context, text.attribute, textAttribute) : sVisible && (context.setStrokeStyle(text, text.attribute, originX - x, originY - y, textAttribute), 
            context.strokeText(t, _x, _y, z))), doFill && (fillCb ? fillCb(context, text.attribute, textAttribute) : fVisible && (context.setCommonStyle(text, text.attribute, originX - x, originY - y, textAttribute), 
            context.fillText(t, _x, _y, z))), direction && (context.highPerformanceRestore(), 
            context.setTransformForCurrent());
        };
        if (context.setTextStyleWithoutAlignBaseline(text.attribute, textAttribute, z), 
        "horizontal" === direction) {
            const {multilineLayout: multilineLayout} = text;
            if (!multilineLayout) return void context.highPerformanceRestore();
            const {xOffset: xOffset, yOffset: yOffset} = multilineLayout.bbox;
            doStroke && (strokeCb ? strokeCb(context, text.attribute, textAttribute) : sVisible && (context.setStrokeStyle(text, text.attribute, originX - x, originY - y, textAttribute), 
            multilineLayout.lines.forEach((line => {
                context.strokeText(line.str, (line.leftOffset || 0) + xOffset + x, (line.topOffset || 0) + yOffset + y, z);
            })))), doFill && (fillCb ? fillCb(context, text.attribute, textAttribute) : fVisible && (context.setCommonStyle(text, text.attribute, originX - x, originY - y, textAttribute), 
            multilineLayout.lines.forEach((line => {
                context.fillText(line.str, (line.leftOffset || 0) + xOffset + x, (line.topOffset || 0) + yOffset + y, z), 
                this.drawUnderLine(underline, lineThrough, text, (line.leftOffset || 0) + xOffset + x, (line.topOffset || 0) + yOffset + y, line.descent, (line.descent - line.ascent) / 2, z, textAttribute, context, {
                    width: line.width
                });
            }))));
        } else {
            let {textAlign: textAlign = textAttribute.textAlign, textBaseline: textBaseline = textAttribute.textBaseline} = text.attribute;
            if (!verticalMode) {
                const t = textAlign;
                textAlign = null !== (_b = text.getBaselineMapAlign()[textBaseline]) && void 0 !== _b ? _b : "left", 
                textBaseline = null !== (_c = text.getAlignMapBaseline()[t]) && void 0 !== _c ? _c : "top";
            }
            text.tryUpdateAABBBounds();
            const cache = text.cache, {verticalList: verticalList} = cache;
            context.textAlign = "left", context.textBaseline = "top";
            const totalHeight = lineHeight * verticalList.length;
            let totalW = 0;
            verticalList.forEach((verticalData => {
                const _w = verticalData.reduce(((a, b) => a + (b.width || 0)), 0);
                totalW = (0, vutils_1.max)(_w, totalW);
            }));
            let offsetY = 0, offsetX = 0;
            "bottom" === textBaseline ? offsetX = -totalHeight : "middle" === textBaseline && (offsetX = -totalHeight / 2), 
            "center" === textAlign ? offsetY -= totalW / 2 : "right" === textAlign && (offsetY -= totalW), 
            verticalList.forEach(((verticalData, i) => {
                const currentW = verticalData.reduce(((a, b) => a + (b.width || 0)), 0), dw = totalW - currentW;
                let currentOffsetY = offsetY;
                "center" === textAlign ? currentOffsetY += dw / 2 : "right" === textAlign && (currentOffsetY += dw), 
                verticalData.forEach((item => {
                    const {text: text, width: width, direction: direction} = item;
                    drawText(text, totalHeight - (i + 1) * lineHeight + offsetX, currentOffsetY, direction), 
                    currentOffsetY += width;
                }));
            }));
        }
        transform3dMatrixToContextMatrix && this.restoreTransformUseContext2d(text, textAttribute, z, context), 
        this.afterRenderStep(text, context, x, y, doFill, doStroke, fVisible, sVisible, textAttribute, drawContext, fillCb, strokeCb);
    }
    draw(text, renderService, drawContext, params) {
        const textAttribute = (0, theme_1.getTheme)(text, null == params ? void 0 : params.theme).text, {keepDirIn3d: keepDirIn3d = textAttribute.keepDirIn3d} = text.attribute, computed3dMatrix = !keepDirIn3d;
        this._draw(text, textAttribute, computed3dMatrix, drawContext, params);
    }
    drawUnderLine(underline, lineThrough, text, anchorX, anchorY, offsetUnderLineY, offsetThroughLineY, z, textAttribute, context, multiOption) {
        if (lineThrough + underline <= 0) return;
        const {textAlign: textAlign = textAttribute.textAlign, fill: fill = textAttribute.fill, opacity: opacity = textAttribute.opacity, underlineOffset: underlineOffset = textAttribute.underlineOffset, underlineDash: underlineDash = textAttribute.underlineDash, fillOpacity: fillOpacity = textAttribute.fillOpacity} = text.attribute, isMulti = !(0, 
        vutils_1.isNil)(multiOption), w = isMulti ? multiOption.width : text.clipedWidth, offsetX = isMulti ? 0 : (0, 
        text_1.textDrawOffsetX)(textAlign, w), attribute = {
            lineWidth: 0,
            stroke: fill,
            opacity: opacity,
            strokeOpacity: fillOpacity
        };
        if (underline) {
            attribute.lineWidth = underline, context.setStrokeStyle(text, attribute, anchorX, anchorY, textAttribute), 
            underlineDash && context.setLineDash(underlineDash), context.beginPath();
            const dy = anchorY + offsetUnderLineY + underlineOffset;
            context.moveTo(anchorX + offsetX, dy, z), context.lineTo(anchorX + offsetX + w, dy, z), 
            context.stroke();
        }
        if (lineThrough) {
            attribute.lineWidth = lineThrough, context.setStrokeStyle(text, attribute, anchorX, anchorY, textAttribute), 
            context.beginPath();
            const dy = anchorY + offsetThroughLineY;
            context.moveTo(anchorX + offsetX, dy, z), context.lineTo(anchorX + offsetX + w, dy, z), 
            context.stroke();
        }
    }
};

DefaultCanvasTextRender = __decorate([ (0, inversify_lite_1.injectable)(), __param(0, (0, 
inversify_lite_1.inject)(contribution_provider_1.ContributionProvider)), __param(0, (0, 
inversify_lite_1.named)(constants_2.TextRenderContribution)), __metadata("design:paramtypes", [ Object ]) ], DefaultCanvasTextRender), 
exports.DefaultCanvasTextRender = DefaultCanvasTextRender;
//# sourceMappingURL=text-render.js.map
