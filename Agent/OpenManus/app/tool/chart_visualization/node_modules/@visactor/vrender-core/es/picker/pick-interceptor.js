var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
    var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

import { Point } from "@visactor/vutils";

import { injectable } from "../common/inversify-lite";

import { matrixAllocate } from "../allocator/matrix-allocate";

import { draw3dItem } from "../common/3d-interceptor";

import { getTheme } from "../graphic";

let ShadowPickServiceInterceptorContribution = class {
    constructor() {
        this.order = 1;
    }
    afterPickItem(result, pickerService, point, pickParams, params) {
        if (result.graphic) {
            let g = result.graphic;
            for (;g.parent; ) g = g.parent;
            g.shadowHost && (result.params = {
                shadowTarget: result.graphic
            }, result.graphic = g.shadowHost);
        }
        return result;
    }
};

ShadowPickServiceInterceptorContribution = __decorate([ injectable() ], ShadowPickServiceInterceptorContribution);

export { ShadowPickServiceInterceptorContribution };

let ShadowRootPickItemInterceptorContribution = class {
    constructor() {
        this.order = 1;
    }
    afterPickItem(graphic, pickerService, point, pickParams, params) {
        return graphic.attribute.shadowRootIdx > 0 || !graphic.attribute.shadowRootIdx ? this._pickItem(graphic, pickerService, point, pickParams, params) : null;
    }
    beforePickItem(graphic, pickerService, point, pickParams, params) {
        return graphic.attribute.shadowRootIdx < 0 ? this._pickItem(graphic, pickerService, point, pickParams, params) : null;
    }
    _pickItem(graphic, pickerService, point, pickParams, params) {
        var _a;
        if (!graphic.shadowRoot) return null;
        const {parentMatrix: parentMatrix} = params || {};
        if (!parentMatrix) return null;
        const context = pickerService.pickContext;
        context.highPerformanceSave();
        const theme = null === (_a = getTheme(graphic)) || void 0 === _a ? void 0 : _a[graphic.type], {shadowPickMode: shadowPickMode = (null == theme ? void 0 : theme.shadowPickMode)} = graphic.attribute, g = graphic.shadowRoot, currentGroupMatrix = matrixAllocate.allocateByObj(parentMatrix), newPoint = new Point(currentGroupMatrix.a * point.x + currentGroupMatrix.c * point.y + currentGroupMatrix.e, currentGroupMatrix.b * point.x + currentGroupMatrix.d * point.y + currentGroupMatrix.f), result = pickerService.pickGroup(g, newPoint, currentGroupMatrix, pickParams);
        return context.highPerformanceRestore(), !result.graphic && result.group && "full" === shadowPickMode && (result.graphic = result.group), 
        result;
    }
};

ShadowRootPickItemInterceptorContribution = __decorate([ injectable() ], ShadowRootPickItemInterceptorContribution);

export { ShadowRootPickItemInterceptorContribution };

let InteractivePickItemInterceptorContribution = class {
    constructor() {
        this.order = 1;
    }
    beforePickItem(graphic, pickerService, point, pickParams, params) {
        const originGraphic = graphic.baseGraphic;
        if (originGraphic && originGraphic.parent) {
            const newPoint = new Point(point.x, point.y), context = pickerService.pickContext;
            context.highPerformanceSave();
            const parentMatrix = originGraphic.parent.globalTransMatrix;
            parentMatrix.transformPoint(newPoint, newPoint);
            const result = originGraphic.isContainer ? pickerService.pickGroup(originGraphic, newPoint.clone(), parentMatrix, pickParams) : pickerService.pickItem(originGraphic, newPoint.clone(), parentMatrix, pickParams);
            return context.highPerformanceRestore(), result;
        }
        return null;
    }
};

InteractivePickItemInterceptorContribution = __decorate([ injectable() ], InteractivePickItemInterceptorContribution);

export { InteractivePickItemInterceptorContribution };

let Canvas3DPickItemInterceptor = class {
    constructor() {
        this.order = 1;
    }
    beforePickItem(graphic, pickerService, point, pickParams, params) {
        if (!graphic.in3dMode || pickParams.in3dInterceptor) return null;
        const context = pickerService.pickContext, stage = graphic.stage;
        if (!context || !stage) return null;
        if (pickParams.in3dInterceptor = !0, context.save(), this.initCanvasCtx(context), 
        context.camera = stage.camera, graphic.isContainer) {
            const result = draw3dItem(context, graphic, (() => pickerService.pickGroup(graphic, point, params.parentMatrix, pickParams)), pickParams);
            return context.camera = null, pickParams.in3dInterceptor = !1, context.restore(), 
            result;
        }
        return context.restore(), null;
    }
    initCanvasCtx(context) {
        context.setTransformForCurrent();
    }
};

Canvas3DPickItemInterceptor = __decorate([ injectable() ], Canvas3DPickItemInterceptor);

export { Canvas3DPickItemInterceptor };
//# sourceMappingURL=pick-interceptor.js.map
