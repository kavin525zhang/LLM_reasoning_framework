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
}), exports.DefaultGraphicService = exports.shouldUseMat4 = exports.getModelMatrix = exports.getExtraModelMatrix = void 0;

const inversify_lite_1 = require("../../common/inversify-lite"), vutils_1 = require("@visactor/vutils"), tapable_1 = require("../../tapable"), text_1 = require("../../common/text"), tools_1 = require("../tools"), matrix_allocate_1 = require("../../allocator/matrix-allocate"), bounds_context_1 = require("../../common/bounds-context"), render_command_list_1 = require("../../common/render-command-list"), constants_1 = require("../constants"), matrix_1 = require("../../common/matrix"), application_1 = require("../../application");

function getExtraModelMatrix(dx, dy, graphic) {
    const {alpha: alpha, beta: beta} = graphic.attribute;
    if (!alpha && !beta) return null;
    const {anchor3d: anchor3d = graphic.attribute.anchor} = graphic.attribute, _anchor = [ 0, 0 ];
    if (anchor3d) {
        if ("string" == typeof anchor3d[0]) {
            const ratio = parseFloat(anchor3d[0]) / 100, bounds = graphic.AABBBounds;
            _anchor[0] = bounds.x1 + (bounds.x2 - bounds.x1) * ratio;
        } else _anchor[0] = anchor3d[0];
        if ("string" == typeof anchor3d[1]) {
            const ratio = parseFloat(anchor3d[1]) / 100, bounds = graphic.AABBBounds;
            _anchor[1] = bounds.x1 + (bounds.x2 - bounds.x1) * ratio;
        } else _anchor[1] = anchor3d[1];
    }
    if ("text" === graphic.type) {
        const {textAlign: textAlign} = graphic.attribute;
        _anchor[0] += (0, text_1.textDrawOffsetX)(textAlign, graphic.clipedWidth);
    }
    _anchor[0] += dx, _anchor[1] += dy;
    const modelMatrix = matrix_allocate_1.mat4Allocate.allocate();
    return (0, matrix_1.translate)(modelMatrix, modelMatrix, [ _anchor[0], _anchor[1], 0 ]), 
    beta && (0, matrix_1.rotateX)(modelMatrix, modelMatrix, beta), alpha && (0, matrix_1.rotateY)(modelMatrix, modelMatrix, alpha), 
    (0, matrix_1.translate)(modelMatrix, modelMatrix, [ -_anchor[0], -_anchor[1], 0 ]), 
    modelMatrix;
}

function getModelMatrix(out, graphic, theme) {
    var _a;
    const {x: x = theme.x, y: y = theme.y, z: z = theme.z, dx: dx = theme.dx, dy: dy = theme.dy, dz: dz = theme.dz, scaleX: scaleX = theme.scaleX, scaleY: scaleY = theme.scaleY, scaleZ: scaleZ = theme.scaleZ, alpha: alpha = theme.alpha, beta: beta = theme.beta, angle: angle = theme.angle, anchor3d: anchor3d = graphic.attribute.anchor, anchor: anchor} = graphic.attribute, _anchor = [ 0, 0, 0 ];
    if (anchor3d) {
        if ("string" == typeof anchor3d[0]) {
            const ratio = parseFloat(anchor3d[0]) / 100, bounds = graphic.AABBBounds;
            _anchor[0] = bounds.x1 + (bounds.x2 - bounds.x1) * ratio;
        } else _anchor[0] = anchor3d[0];
        if ("string" == typeof anchor3d[1]) {
            const ratio = parseFloat(anchor3d[1]) / 100, bounds = graphic.AABBBounds;
            _anchor[1] = bounds.x1 + (bounds.x2 - bounds.x1) * ratio;
        } else _anchor[1] = anchor3d[1];
        _anchor[2] = null !== (_a = anchor3d[2]) && void 0 !== _a ? _a : 0;
    }
    if ((0, matrix_1.identityMat4)(out), (0, matrix_1.translate)(out, out, [ x + dx, y + dy, z + dz ]), 
    (0, matrix_1.translate)(out, out, [ _anchor[0], _anchor[1], _anchor[2] ]), (0, matrix_1.rotateX)(out, out, beta), 
    (0, matrix_1.rotateY)(out, out, alpha), (0, matrix_1.translate)(out, out, [ -_anchor[0], -_anchor[1], _anchor[2] ]), 
    (0, matrix_1.scaleMat4)(out, out, [ scaleX, scaleY, scaleZ ]), angle) {
        const m = matrix_allocate_1.mat4Allocate.allocate(), _anchor = [ 0, 0 ];
        if (anchor) {
            if ("string" == typeof anchor3d[0]) {
                const ratio = parseFloat(anchor3d[0]) / 100, bounds = graphic.AABBBounds;
                _anchor[0] = bounds.x1 + (bounds.x2 - bounds.x1) * ratio;
            } else _anchor[0] = anchor3d[0];
            if ("string" == typeof anchor3d[1]) {
                const ratio = parseFloat(anchor3d[1]) / 100, bounds = graphic.AABBBounds;
                _anchor[1] = bounds.x1 + (bounds.x2 - bounds.x1) * ratio;
            } else _anchor[1] = anchor3d[1];
        }
        (0, matrix_1.translate)(m, m, [ _anchor[0], _anchor[1], 0 ]), (0, matrix_1.rotateZ)(m, m, angle), 
        (0, matrix_1.translate)(m, m, [ -_anchor[0], -_anchor[1], 0 ]), (0, matrix_1.multiplyMat4Mat4)(out, out, m);
    }
}

function shouldUseMat4(graphic) {
    const {alpha: alpha, beta: beta} = graphic.attribute;
    return alpha || beta;
}

exports.getExtraModelMatrix = getExtraModelMatrix, exports.getModelMatrix = getModelMatrix, 
exports.shouldUseMat4 = shouldUseMat4;

let DefaultGraphicService = class {
    constructor(creator) {
        this.creator = creator, this.hooks = {
            onAttributeUpdate: new tapable_1.SyncHook([ "graphic" ]),
            onSetStage: new tapable_1.SyncHook([ "graphic", "stage" ]),
            onRemove: new tapable_1.SyncHook([ "graphic" ]),
            onRelease: new tapable_1.SyncHook([ "graphic" ]),
            onAddIncremental: new tapable_1.SyncHook([ "graphic", "group", "stage" ]),
            onClearIncremental: new tapable_1.SyncHook([ "graphic", "group", "stage" ]),
            beforeUpdateAABBBounds: new tapable_1.SyncHook([ "graphic", "stage", "willUpdate", "aabbBounds" ]),
            afterUpdateAABBBounds: new tapable_1.SyncHook([ "graphic", "stage", "aabbBounds", "globalAABBBounds", "selfChange" ]),
            clearAABBBounds: new tapable_1.SyncHook([ "graphic", "stage", "aabbBounds" ])
        }, this.tempAABBBounds1 = new vutils_1.AABBBounds, this.tempAABBBounds2 = new vutils_1.AABBBounds;
    }
    onAttributeUpdate(graphic) {
        this.hooks.onAttributeUpdate.taps.length && this.hooks.onAttributeUpdate.call(graphic);
    }
    onSetStage(graphic, stage) {
        this.hooks.onSetStage.taps.length && this.hooks.onSetStage.call(graphic, stage);
    }
    onRemove(graphic) {
        this.hooks.onRemove.taps.length && this.hooks.onRemove.call(graphic);
    }
    onRelease(graphic) {
        this.hooks.onRelease.taps.length && this.hooks.onRelease.call(graphic);
    }
    onAddIncremental(graphic, group, stage) {
        this.hooks.onAddIncremental.taps.length && this.hooks.onAddIncremental.call(graphic, group, stage);
    }
    onClearIncremental(group, stage) {
        this.hooks.onClearIncremental.taps.length && this.hooks.onClearIncremental.call(group, stage);
    }
    beforeUpdateAABBBounds(graphic, stage, willUpdate, bounds) {
        this.hooks.beforeUpdateAABBBounds.taps.length && this.hooks.beforeUpdateAABBBounds.call(graphic, stage, willUpdate, bounds);
    }
    afterUpdateAABBBounds(graphic, stage, bounds, params, selfChange) {
        this.hooks.afterUpdateAABBBounds.taps.length && this.hooks.afterUpdateAABBBounds.call(graphic, stage, bounds, params, selfChange);
    }
    clearAABBBounds(graphic, stage, b) {
        this.hooks.clearAABBBounds.taps.length && this.hooks.clearAABBBounds.call(graphic, stage, b);
    }
    updatePathProxyAABBBounds(aabbBounds, graphic) {
        const path = "function" == typeof graphic.pathProxy ? graphic.pathProxy(graphic.attribute) : graphic.pathProxy;
        if (!path) return !1;
        const boundsContext = new bounds_context_1.BoundsContext(aabbBounds);
        return (0, render_command_list_1.renderCommandList)(path.commandList, boundsContext, 0, 0), 
        !0;
    }
    updateHTMLTextAABBBounds(attribute, textTheme, aabbBounds, graphic) {
        const {textAlign: textAlign, textBaseline: textBaseline} = attribute;
        if (null != attribute.forceBoundsHeight) {
            const h = (0, vutils_1.isNumber)(attribute.forceBoundsHeight) ? attribute.forceBoundsHeight : attribute.forceBoundsHeight(), dy = (0, 
            text_1.textLayoutOffsetY)(textBaseline, h, h);
            aabbBounds.set(aabbBounds.x1, dy, aabbBounds.x2, dy + h);
        }
        if (null != attribute.forceBoundsWidth) {
            const w = (0, vutils_1.isNumber)(attribute.forceBoundsWidth) ? attribute.forceBoundsWidth : attribute.forceBoundsWidth(), dx = (0, 
            text_1.textDrawOffsetX)(textAlign, w);
            aabbBounds.set(dx, aabbBounds.y1, dx + w, aabbBounds.y2);
        }
    }
    combindShadowAABBBounds(bounds, graphic) {
        if (graphic && graphic.shadowRoot) {
            const b = graphic.shadowRoot.AABBBounds;
            bounds.union(b);
        }
    }
    transformAABBBounds(attribute, aabbBounds, theme, miter, graphic) {
        if (!aabbBounds.empty()) {
            const {scaleX: scaleX = theme.scaleX, scaleY: scaleY = theme.scaleY, stroke: stroke = theme.stroke, shadowBlur: shadowBlur = theme.shadowBlur, lineWidth: lineWidth = theme.lineWidth, pickStrokeBuffer: pickStrokeBuffer = theme.pickStrokeBuffer, strokeBoundsBuffer: strokeBoundsBuffer = theme.strokeBoundsBuffer} = attribute, tb1 = this.tempAABBBounds1, tb2 = this.tempAABBBounds2;
            if (stroke && lineWidth) {
                const scaledHalfLineWidth = (lineWidth + pickStrokeBuffer) / Math.abs(scaleX + scaleY);
                (0, tools_1.boundStroke)(tb1, scaledHalfLineWidth, miter, strokeBoundsBuffer), aabbBounds.union(tb1), 
                tb1.setValue(tb2.x1, tb2.y1, tb2.x2, tb2.y2);
            }
            if (shadowBlur) {
                const {shadowOffsetX: shadowOffsetX = theme.shadowOffsetX, shadowOffsetY: shadowOffsetY = theme.shadowOffsetY} = attribute, shadowBlurWidth = shadowBlur / Math.abs(scaleX + scaleY) * 2;
                (0, tools_1.boundStroke)(tb1, shadowBlurWidth, !1, strokeBoundsBuffer + 1), tb1.translate(shadowOffsetX, shadowOffsetY), 
                aabbBounds.union(tb1);
            }
        }
        if (this.combindShadowAABBBounds(aabbBounds, graphic), aabbBounds.empty()) return;
        let updateMatrix = !0;
        const m = graphic.transMatrix;
        graphic && graphic.isContainer && (updateMatrix = !(1 === m.a && 0 === m.b && 0 === m.c && 1 === m.d && 0 === m.e && 0 === m.f)), 
        updateMatrix && (0, vutils_1.transformBoundsWithMatrix)(aabbBounds, aabbBounds, m);
    }
    validCheck(attribute, theme, aabbBounds, graphic) {
        if (!graphic) return !0;
        if (null != attribute.forceBoundsHeight || null != attribute.forceBoundsWidth) return !0;
        if (graphic.shadowRoot || graphic.isContainer) return !0;
        const {visible: visible = theme.visible} = attribute;
        return !(!graphic.valid || !visible) || (aabbBounds.empty() || (graphic.parent && aabbBounds.transformWithMatrix(graphic.parent.globalTransMatrix), 
        application_1.application.graphicService.clearAABBBounds(graphic, graphic.stage, aabbBounds), 
        aabbBounds.clear()), !1);
    }
    updateTempAABBBounds(aabbBounds) {
        const tb1 = this.tempAABBBounds1, tb2 = this.tempAABBBounds2;
        return tb1.setValue(aabbBounds.x1, aabbBounds.y1, aabbBounds.x2, aabbBounds.y2), 
        tb2.setValue(aabbBounds.x1, aabbBounds.y1, aabbBounds.x2, aabbBounds.y2), {
            tb1: tb1,
            tb2: tb2
        };
    }
};

DefaultGraphicService = __decorate([ (0, inversify_lite_1.injectable)(), __param(0, (0, 
inversify_lite_1.inject)(constants_1.GraphicCreator)), __metadata("design:paramtypes", [ Object ]) ], DefaultGraphicService), 
exports.DefaultGraphicService = DefaultGraphicService;
//# sourceMappingURL=graphic-service.js.map
