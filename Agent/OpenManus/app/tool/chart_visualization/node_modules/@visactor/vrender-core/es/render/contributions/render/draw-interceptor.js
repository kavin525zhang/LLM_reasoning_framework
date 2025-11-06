var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
    var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}, __metadata = this && this.__metadata || function(k, v) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(k, v);
};

import { injectable } from "../../../common/inversify-lite";

import { AABBBounds } from "@visactor/vutils";

import { mat3Tomat4, multiplyMat4Mat4 } from "../../../common/matrix";

import { graphicCreator } from "../../../graphic/graphic-creator";

import { mat4Allocate, matrixAllocate } from "../../../allocator/matrix-allocate";

import { draw3dItem } from "../../../common/3d-interceptor";

export const DrawItemInterceptor = Symbol.for("DrawItemInterceptor");

const tempDirtyBounds = new AABBBounds, tempBackupDirtyBounds = new AABBBounds;

export class ShadowRootDrawItemInterceptorContribution {
    constructor() {
        this.order = 1;
    }
    afterDrawItem(graphic, renderService, drawContext, drawContribution, params) {
        return null == graphic.attribute.shadowRootIdx && graphic.shadowRoot && graphic.shadowRoot.attribute.shadowRootIdx < 0 || (graphic.attribute.shadowRootIdx > 0 || !graphic.attribute.shadowRootIdx || graphic.shadowRoot && graphic.shadowRoot.attribute.shadowRootIdx > 0) && this.drawItem(graphic, renderService, drawContext, drawContribution, params), 
        !1;
    }
    beforeDrawItem(graphic, renderService, drawContext, drawContribution, params) {
        return null == graphic.attribute.shadowRootIdx && graphic.shadowRoot && graphic.shadowRoot.attribute.shadowRootIdx > 0 || (graphic.attribute.shadowRootIdx < 0 || graphic.shadowRoot && graphic.shadowRoot.attribute.shadowRootIdx < 0) && this.drawItem(graphic, renderService, drawContext, drawContribution, params), 
        !1;
    }
    drawItem(graphic, renderService, drawContext, drawContribution, params) {
        if (!graphic.shadowRoot) return !1;
        const {context: context} = drawContext;
        if (context.highPerformanceSave(), context.transformFromMatrix(graphic.transMatrix, !0), 
        drawContribution.dirtyBounds && drawContribution.backupDirtyBounds) {
            tempDirtyBounds.copy(drawContribution.dirtyBounds), tempBackupDirtyBounds.copy(drawContribution.backupDirtyBounds);
            const m = graphic.globalTransMatrix.getInverse();
            drawContribution.dirtyBounds.copy(drawContribution.backupDirtyBounds).transformWithMatrix(m), 
            drawContribution.backupDirtyBounds.copy(drawContribution.dirtyBounds);
        }
        return drawContribution.renderGroup(graphic.shadowRoot, drawContext, matrixAllocate.allocate(1, 0, 0, 1, 0, 0)), 
        context.highPerformanceRestore(), drawContribution.dirtyBounds && drawContribution.backupDirtyBounds && (drawContribution.dirtyBounds.copy(tempDirtyBounds), 
        drawContribution.backupDirtyBounds.copy(tempBackupDirtyBounds)), !0;
    }
}

export class DebugDrawItemInterceptorContribution {
    constructor() {
        this.order = 1;
    }
    afterDrawItem(graphic, renderService, drawContext, drawContribution, params) {
        return graphic.attribute._debug_bounds && this.drawItem(graphic, renderService, drawContext, drawContribution, params), 
        !1;
    }
    drawItem(graphic, renderService, drawContext, drawContribution, params) {
        if (!graphic.attribute._debug_bounds) return !1;
        const {context: context} = drawContext;
        context.highPerformanceSave(), graphic.parent && context.setTransformFromMatrix(graphic.parent.globalTransMatrix, !0), 
        graphic.glyphHost && graphic.glyphHost.parent && context.setTransformFromMatrix(graphic.glyphHost.parent.globalTransMatrix, !0);
        const b = graphic.AABBBounds;
        return !0 !== graphic.attribute._debug_bounds && graphic.attribute._debug_bounds(context, graphic), 
        context.strokeRect(b.x1, b.y1, b.width(), b.height()), context.highPerformanceRestore(), 
        !0;
    }
}

let CommonDrawItemInterceptorContribution = class {
    constructor() {
        this.order = 1, this.interceptors = [ new ShadowRootDrawItemInterceptorContribution, new Canvas3DDrawItemInterceptor, new InteractiveDrawItemInterceptorContribution, new DebugDrawItemInterceptorContribution ];
    }
    afterDrawItem(graphic, renderService, drawContext, drawContribution, params) {
        for (let i = 0; i < this.interceptors.length; i++) if (this.interceptors[i].afterDrawItem && this.interceptors[i].afterDrawItem(graphic, renderService, drawContext, drawContribution, params)) return !0;
        return !1;
    }
    beforeDrawItem(graphic, renderService, drawContext, drawContribution, params) {
        if ((!graphic.in3dMode || drawContext.in3dInterceptor) && !graphic.shadowRoot && !(graphic.baseGraphic || graphic.attribute.globalZIndex || graphic.interactiveGraphic)) return !1;
        for (let i = 0; i < this.interceptors.length; i++) if (this.interceptors[i].beforeDrawItem && this.interceptors[i].beforeDrawItem(graphic, renderService, drawContext, drawContribution, params)) return !0;
        return !1;
    }
};

CommonDrawItemInterceptorContribution = __decorate([ injectable(), __metadata("design:paramtypes", []) ], CommonDrawItemInterceptorContribution);

export { CommonDrawItemInterceptorContribution };

export class InteractiveDrawItemInterceptorContribution {
    constructor() {
        this.order = 1;
    }
    beforeDrawItem(graphic, renderService, drawContext, drawContribution, params) {
        return !this.processing && (graphic.baseGraphic ? this.beforeDrawInteractive(graphic, renderService, drawContext, drawContribution, params) : this.beforeSetInteractive(graphic, renderService, drawContext, drawContribution, params));
    }
    beforeSetInteractive(graphic, renderService, drawContext, drawContribution, params) {
        let interactiveGraphic = graphic.interactiveGraphic;
        if (graphic.attribute.globalZIndex) {
            interactiveGraphic || (interactiveGraphic = graphic.clone(), graphic.interactiveGraphic = interactiveGraphic, 
            interactiveGraphic.baseGraphic = graphic), interactiveGraphic.setAttributes({
                globalZIndex: 0,
                zIndex: graphic.attribute.globalZIndex
            }, !1, {
                skipUpdateCallback: !0
            }), drawContext.stage.tryInitInteractiveLayer();
            const interactiveLayer = drawContext.stage.getLayer("_builtin_interactive");
            if (interactiveLayer) {
                this.getShadowRoot(interactiveLayer).add(interactiveGraphic);
            }
            return !0;
        }
        if (interactiveGraphic) {
            drawContext.stage.tryInitInteractiveLayer();
            const interactiveLayer = drawContext.stage.getLayer("_builtin_interactive");
            if (interactiveLayer) {
                this.getShadowRoot(interactiveLayer).removeChild(interactiveGraphic);
            }
            graphic.interactiveGraphic = null, interactiveGraphic.baseGraphic = null;
        }
        return !1;
    }
    beforeDrawInteractive(graphic, renderService, drawContext, drawContribution, params) {
        const baseGraphic = graphic.baseGraphic;
        let intree = !!baseGraphic.stage, _g = baseGraphic.parent;
        for (;intree && _g && _g.stage !== _g; ) intree = !!_g.stage, _g = _g.parent;
        if (!intree) {
            const interactiveLayer = drawContext.stage.getLayer("_builtin_interactive");
            if (interactiveLayer) {
                this.getShadowRoot(interactiveLayer).removeChild(graphic);
            }
            return !0;
        }
        if (baseGraphic) {
            this.processing = !0;
            const {context: context} = drawContext;
            return context.highPerformanceSave(), context.setTransformFromMatrix(baseGraphic.parent.globalTransMatrix, !0), 
            baseGraphic.isContainer ? drawContribution.renderGroup(baseGraphic, drawContext, baseGraphic.parent.globalTransMatrix) : drawContribution.renderItem(baseGraphic, drawContext), 
            context.highPerformanceRestore(), this.processing = !1, !0;
        }
        return !1;
    }
    getShadowRoot(interactiveLayer) {
        var _a;
        let group = interactiveLayer.getElementById("_interactive_group");
        return group || (group = graphicCreator.CreateGraphic("group", {}), group.id = "_interactive_group", 
        interactiveLayer.add(group)), null !== (_a = group.shadowRoot) && void 0 !== _a ? _a : group.attachShadow();
    }
}

export class Canvas3DDrawItemInterceptor {
    constructor() {
        this.order = 1;
    }
    beforeDrawItem(graphic, renderService, drawContext, drawContribution, params) {
        if (!graphic.in3dMode || drawContext.in3dInterceptor) return !1;
        drawContext.in3dInterceptor = !0;
        const {context: context, stage: stage} = renderService.drawParams;
        context.canvas;
        context.save(), this.initCanvasCtx(context), context.camera = stage.camera;
        const m = context.currentMatrix;
        m.a /= context.dpr, m.b /= context.dpr, m.c /= context.dpr, m.d /= context.dpr, 
        m.e /= context.dpr, m.f /= context.dpr;
        const matrix = mat4Allocate.allocate();
        mat3Tomat4(matrix, m);
        const lastModelMatrix = context.modelMatrix;
        if (lastModelMatrix) {
            if (matrix) {
                const m = mat4Allocate.allocate();
                context.modelMatrix = multiplyMat4Mat4(m, lastModelMatrix, matrix);
            }
        } else context.modelMatrix = matrix;
        return context.setTransform(1, 0, 0, 1, 0, 0, !0), graphic.isContainer ? draw3dItem(context, graphic, ((isPie, is3d) => drawContribution.renderGroup(graphic, drawContext, graphic.parent.globalTransMatrix, !isPie && is3d)), drawContext) : drawContribution.renderItem(graphic, drawContext), 
        context.camera = null, context.restore(), context.modelMatrix !== lastModelMatrix && mat4Allocate.free(context.modelMatrix), 
        context.modelMatrix = lastModelMatrix, drawContext.in3dInterceptor = !1, !0;
    }
    initCanvasCtx(context) {
        context.setTransformForCurrent();
    }
}
//# sourceMappingURL=draw-interceptor.js.map
