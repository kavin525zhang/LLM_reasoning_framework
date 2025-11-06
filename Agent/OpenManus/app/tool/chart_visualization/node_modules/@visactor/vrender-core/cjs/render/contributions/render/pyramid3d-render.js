"use strict";

var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
    var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.DefaultCanvasPyramid3dRender = void 0;

const inversify_lite_1 = require("../../../common/inversify-lite"), theme_1 = require("../../../graphic/theme"), constants_1 = require("../../../graphic/constants"), base_3d_render_1 = require("./base-3d-render");

let DefaultCanvasPyramid3dRender = class extends base_3d_render_1.Base3dRender {
    constructor() {
        super(...arguments), this.type = "pyramid3d", this.numberType = constants_1.PYRAMID3D_NUMBER_TYPE;
    }
    drawShape(pyramid3d, context, x, y, drawContext, params, fillCb, strokeCb) {
        var _a;
        const pyramidAttribute = (0, theme_1.getTheme)(pyramid3d, null == params ? void 0 : params.theme).polygon, {fill: fill = pyramidAttribute.fill, stroke: stroke = pyramidAttribute.stroke, face: face = [ !0, !0, !0, !0, !0, !0 ]} = pyramid3d.attribute, z = null !== (_a = this.z) && void 0 !== _a ? _a : 0;
        if (!this.valid(pyramid3d, pyramidAttribute, fillCb, strokeCb)) return;
        const {light: light} = drawContext.stage || {}, face3d = pyramid3d.findFace();
        if (!1 !== fill) {
            context.setCommonStyle(pyramid3d, pyramid3d.attribute, x, y, pyramidAttribute);
            let fc = fill;
            "string" != typeof fc && (fc = "black"), this.fill(x, y, z, face3d, face, fc, context, light, pyramid3d, pyramidAttribute, fillCb);
        }
        !1 !== stroke && (context.setStrokeStyle(pyramid3d, pyramid3d.attribute, x, y, pyramidAttribute), 
        this.stroke(x, y, z, face3d, context));
    }
    draw(pyramid3d, renderService, drawContext) {
        const pyramid3dAttribute = (0, theme_1.getTheme)(pyramid3d).polygon;
        this._draw(pyramid3d, pyramid3dAttribute, !1, drawContext);
    }
};

DefaultCanvasPyramid3dRender = __decorate([ (0, inversify_lite_1.injectable)() ], DefaultCanvasPyramid3dRender), 
exports.DefaultCanvasPyramid3dRender = DefaultCanvasPyramid3dRender;
//# sourceMappingURL=pyramid3d-render.js.map
