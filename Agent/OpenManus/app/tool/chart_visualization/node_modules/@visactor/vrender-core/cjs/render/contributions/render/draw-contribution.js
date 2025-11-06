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
}), exports.DefaultDrawContribution = void 0;

const inversify_lite_1 = require("../../../common/inversify-lite"), sort_1 = require("../../../common/sort"), contribution_provider_1 = require("../../../common/contribution-provider"), config_1 = require("../../../graphic/config"), vutils_1 = require("@visactor/vutils"), container_1 = require("../../../container"), symbol_1 = require("./symbol"), draw_interceptor_1 = require("./draw-interceptor"), canvas_utils_1 = require("../../../common/canvas-utils"), bounds_allocate_1 = require("../../../allocator/bounds-allocate"), matrix_allocate_1 = require("../../../allocator/matrix-allocate"), application_1 = require("../../../application");

let DefaultDrawContribution = class {
    constructor(contributions, drawItemInterceptorContributions) {
        this.contributions = contributions, this.drawItemInterceptorContributions = drawItemInterceptorContributions, 
        this.currentRenderMap = new Map, this.defaultRenderMap = new Map, this.styleRenderMap = new Map, 
        this.dirtyBounds = new vutils_1.Bounds, this.backupDirtyBounds = new vutils_1.Bounds, 
        this.global = application_1.application.global, this.layerService = application_1.application.layerService, 
        (0, vutils_1.isArray)(this.contributions) || (this.contributions = [ this.contributions ]), 
        this.init();
    }
    init() {
        this.contributions.forEach((item => {
            if (item.style) {
                const map = this.styleRenderMap.get(item.style) || new Map;
                map.set(item.numberType, item), this.styleRenderMap.set(item.style, map);
            } else this.defaultRenderMap.set(item.numberType, item);
        })), this.InterceptorContributions = this.drawItemInterceptorContributions.getContributions().sort(((a, b) => a.order - b.order));
    }
    prepareForDraw(renderService, drawContext) {
        drawContext.updateBounds ? this.useDirtyBounds = !0 : this.useDirtyBounds = !drawContext.stage.params.optimize.disableCheckGraphicWidthOutRange;
    }
    draw(renderService, drawContext) {
        this.prepareForDraw(renderService, drawContext), drawContext.drawContribution = this, 
        this.currentRenderMap = this.styleRenderMap.get(drawContext.renderStyle) || this.defaultRenderMap, 
        this.currentRenderService = renderService;
        const {context: context, stage: stage, viewBox: viewBox, transMatrix: transMatrix} = drawContext;
        if (!context) return;
        const dirtyBounds = this.dirtyBounds.setValue(0, 0, viewBox.width(), viewBox.height());
        if (stage.dirtyBounds && !stage.dirtyBounds.empty()) {
            const b = (0, vutils_1.getRectIntersect)(dirtyBounds, stage.dirtyBounds, !1);
            dirtyBounds.x1 = Math.floor(b.x1), dirtyBounds.y1 = Math.floor(b.y1), dirtyBounds.x2 = Math.ceil(b.x2), 
            dirtyBounds.y2 = Math.ceil(b.y2);
        }
        const d = context.dpr % 1;
        (d || .5 !== d) && (dirtyBounds.x1 = Math.floor(dirtyBounds.x1 * context.dpr) / context.dpr, 
        dirtyBounds.y1 = Math.floor(dirtyBounds.y1 * context.dpr) / context.dpr, dirtyBounds.x2 = Math.ceil(dirtyBounds.x2 * context.dpr) / context.dpr, 
        dirtyBounds.y2 = Math.ceil(dirtyBounds.y2 * context.dpr) / context.dpr), this.backupDirtyBounds.copy(dirtyBounds), 
        context.inuse = !0, context.setClearMatrix(transMatrix.a, transMatrix.b, transMatrix.c, transMatrix.d, transMatrix.e, transMatrix.f), 
        context.clearMatrix(), context.setTransformForCurrent(!0), context.translate(viewBox.x1, viewBox.y1, !0), 
        context.beginPath(), context.rect(dirtyBounds.x1, dirtyBounds.y1, dirtyBounds.width(), dirtyBounds.height()), 
        context.clip(), stage.camera && (this.dirtyBounds.setValue(-1 / 0, -1 / 0, 1 / 0, 1 / 0), 
        this.backupDirtyBounds.setValue(-1 / 0, -1 / 0, 1 / 0, 1 / 0)), this.clearScreen(renderService, context, drawContext), 
        context.save(), renderService.renderTreeRoots.sort(((a, b) => {
            var _a, _b;
            return (null !== (_a = a.attribute.zIndex) && void 0 !== _a ? _a : config_1.DefaultAttribute.zIndex) - (null !== (_b = b.attribute.zIndex) && void 0 !== _b ? _b : config_1.DefaultAttribute.zIndex);
        })).forEach((group => {
            group.isContainer ? this.renderGroup(group, drawContext, matrix_allocate_1.matrixAllocate.allocate(1, 0, 0, 1, 0, 0)) : this.renderItem(group, drawContext);
        })), context.restore(), context.setClearMatrix(1, 0, 0, 1, 0, 0), context.inuse = !1, 
        context.draw();
    }
    doRegister() {
        throw new Error("暂不支持");
    }
    _findNextGraphic(group) {
        let parent = group.parent, id = group._uid;
        for (;parent; ) {
            const g = (0, sort_1.findNextGraphic)(parent, id, config_1.DefaultAttribute.zIndex);
            if (g) return g;
            id = parent._uid, parent = parent.parent;
        }
        return null;
    }
    renderGroup(group, drawContext, parentMatrix, skipSort) {
        if (drawContext.break || !1 === group.attribute.visibleAll) return;
        if (group.incremental && (null == drawContext.startAtId || drawContext.startAtId === group._uid)) return drawContext.break = !0, 
        void this._increaseRender(group, drawContext);
        if (this.useDirtyBounds && !(0, vutils_1.isRectIntersect)(group.AABBBounds, this.dirtyBounds, !1) && "empty" !== group.attribute.boundsMode) return;
        let tempBounds, nextM = parentMatrix;
        if (this.useDirtyBounds) {
            tempBounds = bounds_allocate_1.boundsAllocate.allocateByObj(this.dirtyBounds);
            const gm = group.transMatrix;
            nextM = matrix_allocate_1.matrixAllocate.allocateByObj(parentMatrix).multiply(gm.a, gm.b, gm.c, gm.d, gm.e, gm.f), 
            this.dirtyBounds.copy(this.backupDirtyBounds).transformWithMatrix(nextM.getInverse());
        }
        this.renderItem(group, drawContext, {
            drawingCb: () => {
                var _a;
                skipSort ? group.forEachChildren((item => {
                    drawContext.break || (item.isContainer ? this.renderGroup(item, drawContext, nextM) : this.renderItem(item, drawContext));
                })) : (0, sort_1.foreach)(group, config_1.DefaultAttribute.zIndex, (item => {
                    drawContext.break || (item.isContainer ? this.renderGroup(item, drawContext, nextM) : this.renderItem(item, drawContext));
                }), !1, !!(null === (_a = drawContext.context) || void 0 === _a ? void 0 : _a.camera));
            }
        }), this.useDirtyBounds && (this.dirtyBounds.copy(tempBounds), bounds_allocate_1.boundsAllocate.free(tempBounds), 
        matrix_allocate_1.matrixAllocate.free(nextM));
    }
    _increaseRender(group, drawContext) {
        const {layer: layer, stage: stage} = drawContext, {subLayers: subLayers} = layer;
        let incrementalLayer = subLayers.get(group._uid);
        incrementalLayer || (incrementalLayer = {
            layer: this.layerService.createLayer(stage),
            zIndex: subLayers.size,
            group: group
        }, subLayers.set(group._uid, incrementalLayer));
        const incrementalContext = incrementalLayer.layer.getNativeHandler().getContext(), idc = incrementalLayer.drawContribution || container_1.container.get(symbol_1.IncrementalDrawContribution);
        idc.dirtyBounds.setValue(-1 / 0, -1 / 0, 1 / 0, 1 / 0), idc.backupDirtyBounds.setValue(-1 / 0, -1 / 0, 1 / 0, 1 / 0), 
        idc.draw(this.currentRenderService, Object.assign(Object.assign({}, drawContext), {
            drawContribution: idc,
            clear: "transparent",
            layer: incrementalLayer.layer,
            context: incrementalContext,
            startAtId: group._uid,
            break: !1
        })), incrementalLayer.drawContribution = idc;
        const nextGraphic = this._findNextGraphic(group);
        if (nextGraphic) if (nextGraphic.isContainer && nextGraphic.incremental) this._increaseRender(nextGraphic, drawContext); else {
            let afterLayer = subLayers.get(nextGraphic._uid);
            afterLayer || (afterLayer = {
                layer: this.layerService.createLayer(stage),
                zIndex: subLayers.size
            }, subLayers.set(nextGraphic._uid, afterLayer));
            const afterContext = afterLayer.layer.getNativeHandler().getContext();
            this.draw(this.currentRenderService, Object.assign(Object.assign({}, drawContext), {
                drawContribution: idc,
                clear: "transparent",
                layer: afterLayer.layer,
                context: afterContext,
                startAtId: nextGraphic._uid,
                break: !1
            }));
        }
    }
    getRenderContribution(graphic) {
        let renderer;
        return renderer || (renderer = this.selectRenderByNumberType(graphic.numberType, graphic)), 
        renderer || (renderer = this.selectRenderByType(graphic.type)), renderer;
    }
    renderItem(graphic, drawContext, params) {
        if (this.InterceptorContributions.length) for (let i = 0; i < this.InterceptorContributions.length; i++) {
            const drawContribution = this.InterceptorContributions[i];
            if (drawContribution.beforeDrawItem && drawContribution.beforeDrawItem(graphic, this.currentRenderService, drawContext, this, params)) return;
        }
        const renderer = this.getRenderContribution(graphic);
        if (!renderer) return;
        let tempBounds, retrans = this.scrollMatrix && (0 !== this.scrollMatrix.e || 0 !== this.scrollMatrix.f);
        if (graphic.parent) {
            const {scrollX: scrollX = 0, scrollY: scrollY = 0} = graphic.parent.attribute;
            (scrollX || scrollY) && (retrans = !0, this.scrollMatrix || (this.scrollMatrix = matrix_allocate_1.matrixAllocate.allocate(1, 0, 0, 1, 0, 0)), 
            this.scrollMatrix.translate(-scrollX, -scrollY));
        }
        if (retrans && (tempBounds = this.dirtyBounds.clone().transformWithMatrix(this.scrollMatrix)), 
        this.useDirtyBounds && !graphic.isContainer && "empty" !== graphic.attribute.boundsMode && !(0, 
        vutils_1.isRectIntersect)(graphic.AABBBounds, null != tempBounds ? tempBounds : this.dirtyBounds, !1)) {
            if (retrans && graphic.parent) {
                const {scrollX: scrollX = 0, scrollY: scrollY = 0} = graphic.parent.attribute;
                this.scrollMatrix && this.scrollMatrix.translate(scrollX, scrollY);
            }
            return;
        }
        const skipDraw = null != drawContext.startAtId && graphic._uid !== drawContext.startAtId;
        if (graphic._uid === drawContext.startAtId && (drawContext.startAtId = null), params && (params.skipDraw = skipDraw), 
        skipDraw ? graphic.isContainer && renderer.draw(graphic, this.currentRenderService, drawContext, params) : renderer.draw(graphic, this.currentRenderService, drawContext, params), 
        retrans && graphic.parent) {
            const {scrollX: scrollX = 0, scrollY: scrollY = 0} = graphic.parent.attribute;
            this.scrollMatrix && this.scrollMatrix.translate(scrollX, scrollY);
        }
        if (this.InterceptorContributions.length) for (let i = 0; i < this.InterceptorContributions.length; i++) {
            const drawContribution = this.InterceptorContributions[i];
            if (drawContribution.afterDrawItem && drawContribution.afterDrawItem(graphic, this.currentRenderService, drawContext, this)) return;
        }
    }
    selectRenderByType(type) {
        return vutils_1.Logger.getInstance().warn("未知错误，不应该走到这里"), null;
    }
    selectRenderByNumberType(type, graphic) {
        let data;
        if (graphic.attribute.renderStyle) {
            const currentRenderMap = this.styleRenderMap.get(graphic.attribute.renderStyle);
            data = currentRenderMap && currentRenderMap.get(type);
        }
        return data || this.currentRenderMap.get(type) || this.defaultRenderMap.get(type);
    }
    clearScreen(renderService, context, drawContext) {
        var _a, _b;
        const {clear: clear, viewBox: viewBox} = drawContext, width = viewBox.width(), height = viewBox.height();
        if (clear) {
            context.clearRect(0, 0, width, height);
            const stage = null === (_a = renderService.drawParams) || void 0 === _a ? void 0 : _a.stage;
            if (stage && (context.globalAlpha = null !== (_b = stage.attribute.opacity) && void 0 !== _b ? _b : 1), 
            stage && stage.backgroundImg && stage.resources) {
                const res = stage.resources.get(clear);
                res && "success" === res.state && res.data && context.drawImage(res.data, 0, 0, width, height);
            } else context.fillStyle = (0, canvas_utils_1.createColor)(context, clear, {
                AABBBounds: {
                    x1: 0,
                    y1: 0,
                    x2: 0 + width,
                    y2: 0 + height
                }
            }, 0, 0), context.fillRect(0, 0, width, height);
        }
    }
    afterDraw(renderService, drawParams) {}
};

DefaultDrawContribution = __decorate([ (0, inversify_lite_1.injectable)(), __param(0, (0, 
inversify_lite_1.multiInject)(symbol_1.GraphicRender)), __param(1, (0, inversify_lite_1.inject)(contribution_provider_1.ContributionProvider)), __param(1, (0, 
inversify_lite_1.named)(draw_interceptor_1.DrawItemInterceptor)), __metadata("design:paramtypes", [ Array, Object ]) ], DefaultDrawContribution), 
exports.DefaultDrawContribution = DefaultDrawContribution;
//# sourceMappingURL=draw-contribution.js.map
