"use strict";

var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
    var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.DefaultCanvasRect3dRender = void 0;

const inversify_lite_1 = require("../../../common/inversify-lite"), theme_1 = require("../../../graphic/theme"), utils_1 = require("./utils"), constants_1 = require("../../../graphic/constants"), base_3d_render_1 = require("./base-3d-render");

let DefaultCanvasRect3dRender = class extends base_3d_render_1.Base3dRender {
    constructor() {
        super(...arguments), this.type = "rect3d", this.numberType = constants_1.RECT3D_NUMBER_TYPE;
    }
    drawShape(rect, context, x, y, drawContext, params, fillCb, strokeCb) {
        var _a;
        const rectAttribute = (0, theme_1.getTheme)(rect, null == params ? void 0 : params.theme).rect, {fill: fill = rectAttribute.fill, stroke: stroke = rectAttribute.stroke, x1: x1, y1: y1, x: originX, y: originY, opacity: opacity = rectAttribute.opacity, fillOpacity: fillOpacity = rectAttribute.fillOpacity, lineWidth: lineWidth = rectAttribute.lineWidth, strokeOpacity: strokeOpacity = rectAttribute.strokeOpacity, visible: visible = rectAttribute.visible} = rect.attribute;
        let {width: width, height: height} = rect.attribute;
        width = (null != width ? width : x1 - originX) || 0, height = (null != height ? height : y1 - originY) || 0;
        const z = null !== (_a = this.z) && void 0 !== _a ? _a : 0, fVisible = (0, utils_1.rectFillVisible)(opacity, fillOpacity, width, height, fill), sVisible = (0, 
        utils_1.rectStrokeVisible)(opacity, strokeOpacity, width, height), doFill = (0, 
        utils_1.runFill)(fill), doStroke = (0, utils_1.runStroke)(stroke, lineWidth);
        if (!rect.valid || !visible) return;
        if (!doFill && !doStroke) return;
        if (!(fVisible || sVisible || fillCb || strokeCb)) return;
        const {light: light} = drawContext.stage || {}, face3d = rect.findFace();
        if (!1 !== fill) {
            context.setCommonStyle(rect, rect.attribute, x, y, rectAttribute);
            let fc = fill;
            "string" != typeof fc && (fc = "black"), this.fill(x, y, z, face3d, null, fc, context, light, null, null, fillCb);
        }
        !1 !== stroke && (context.setStrokeStyle(rect, rect.attribute, x, y, rectAttribute), 
        this.stroke(x, y, z, face3d, context));
    }
    draw(rect, renderService, drawContext) {
        const rectAttribute = (0, theme_1.getTheme)(rect).rect;
        this._draw(rect, rectAttribute, !1, drawContext);
    }
};

DefaultCanvasRect3dRender = __decorate([ (0, inversify_lite_1.injectable)() ], DefaultCanvasRect3dRender), 
exports.DefaultCanvasRect3dRender = DefaultCanvasRect3dRender;
//# sourceMappingURL=rect3d-render.js.map
