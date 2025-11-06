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

import { AABBBounds, Matrix, Point } from "@visactor/vutils";

import { inject, injectable, named } from "../common/inversify-lite";

import { foreach } from "../common/sort";

import { ContributionProvider } from "../common/contribution-provider";

import { getTheme } from "../graphic/theme";

import { DefaultAttribute } from "../graphic/config";

import { mat3Tomat4, multiplyMat4Mat4 } from "../common/matrix";

import { mat4Allocate, matrixAllocate } from "../allocator/matrix-allocate";

import { application } from "../application";

import { PickItemInterceptor, PickServiceInterceptor } from "./constants";

let DefaultPickService = class {
    constructor(pickItemInterceptorContributions, pickServiceInterceptorContributions) {
        this.pickItemInterceptorContributions = pickItemInterceptorContributions, this.pickServiceInterceptorContributions = pickServiceInterceptorContributions, 
        this.type = "default", this.global = application.global;
    }
    _init() {
        this.InterceptorContributions = this.pickItemInterceptorContributions.getContributions().sort(((a, b) => a.order - b.order)), 
        this.pickerServiceInterceptorContributions = this.pickServiceInterceptorContributions.getContributions().sort(((a, b) => a.order - b.order));
    }
    pick(graphics, point, params) {
        let result = {
            graphic: null,
            group: null
        };
        params.pickerService = this;
        const w = params.bounds.width(), h = params.bounds.height();
        if (!(new AABBBounds).setValue(0, 0, w, h).containsPoint(point)) return result;
        this.pickContext && (this.pickContext.inuse = !0), params.pickContext = this.pickContext, 
        this.pickContext && this.pickContext.clearMatrix(!0, 1);
        const parentMatrix = new Matrix(1, 0, 0, 1, 0, 0);
        let group;
        for (let i = graphics.length - 1; i >= 0 && (result = graphics[i].isContainer ? this.pickGroup(graphics[i], point, parentMatrix, params) : this.pickItem(graphics[i], point, parentMatrix, params), 
        !result.graphic); i--) group || (group = result.group);
        if (result.graphic || (result.group = group), this.pickContext && (this.pickContext.inuse = !1), 
        this.pickerServiceInterceptorContributions.length) for (let i = 0; i < this.pickerServiceInterceptorContributions.length; i++) {
            const drawContribution = this.pickerServiceInterceptorContributions[i];
            drawContribution.afterPickItem && (result = drawContribution.afterPickItem(result, this, point, params, {
                parentMatrix: parentMatrix
            }));
        }
        return result;
    }
    containsPoint(graphic, point, params) {
        var _a;
        return !!(null === (_a = this.pickItem(graphic, point, null, null != params ? params : {
            pickContext: this.pickContext,
            pickerService: this
        })) || void 0 === _a ? void 0 : _a.graphic);
    }
    pickGroup(group, point, parentMatrix, params) {
        let result = {
            group: null,
            graphic: null
        };
        if (!1 === group.attribute.visibleAll) return result;
        const context = params.pickContext, lastMatrix = context.modelMatrix;
        if (context.camera) {
            const m = group.transMatrix, matrix = mat4Allocate.allocate();
            if (mat3Tomat4(matrix, m), lastMatrix) {
                if (matrix) {
                    const m = mat4Allocate.allocate();
                    context.modelMatrix = multiplyMat4Mat4(m, lastMatrix, matrix), mat4Allocate.free(matrix);
                }
            } else mat3Tomat4(matrix, group.globalTransMatrix), context.modelMatrix = matrix;
        }
        if (this.InterceptorContributions.length) for (let i = 0; i < this.InterceptorContributions.length; i++) {
            const drawContribution = this.InterceptorContributions[i];
            if (drawContribution.beforePickItem) {
                const result = drawContribution.beforePickItem(group, this, point, params, {
                    parentMatrix: parentMatrix
                });
                if (result) return context.modelMatrix !== lastMatrix && mat4Allocate.free(context.modelMatrix), 
                context.modelMatrix = lastMatrix, result;
            }
        }
        const transMatrix = group.transMatrix, currentGroupMatrix = matrixAllocate.allocateByObj(parentMatrix), newPoint = new Point(point.x, point.y);
        currentGroupMatrix.transformPoint(newPoint, newPoint);
        const insideGroup = group.AABBBounds.containsPoint(newPoint);
        if (!insideGroup && !group.stage.camera) return result;
        const pickedItem = this.pickItem(group, newPoint.clone(), parentMatrix, params);
        pickedItem && pickedItem.graphic && (result.graphic = pickedItem.graphic, result.params = pickedItem.params);
        const groupPicked = !1 !== group.attribute.pickable && insideGroup;
        return currentGroupMatrix.multiply(transMatrix.a, transMatrix.b, transMatrix.c, transMatrix.d, transMatrix.e, transMatrix.f), 
        !1 === group.attribute.childrenPickable || pickedItem && pickedItem.graphic || foreach(group, DefaultAttribute.zIndex, (graphic => {
            if (graphic.isContainer) {
                const newPoint = new Point(point.x, point.y), theme = getTheme(group).group, {scrollX: scrollX = theme.scrollX, scrollY: scrollY = theme.scrollY} = group.attribute;
                newPoint.x -= scrollX, newPoint.y -= scrollY, result = this.pickGroup(graphic, newPoint, currentGroupMatrix, params);
            } else {
                const newPoint = new Point(point.x, point.y);
                currentGroupMatrix.transformPoint(newPoint, newPoint);
                const theme = getTheme(group).group, {scrollX: scrollX = theme.scrollX, scrollY: scrollY = theme.scrollY} = group.attribute;
                newPoint.x -= scrollX, newPoint.y -= scrollY;
                const pickedItem = this.pickItem(graphic, newPoint, parentMatrix, params);
                pickedItem && pickedItem.graphic && (result.graphic = pickedItem.graphic, result.params = pickedItem.params);
            }
            return !!result.graphic || !!result.group;
        }), !0, !!context.camera), context.modelMatrix !== lastMatrix && mat4Allocate.free(context.modelMatrix), 
        context.modelMatrix = lastMatrix, result.graphic || result.group || !groupPicked || group.stage.camera || (result.group = group), 
        matrixAllocate.free(currentGroupMatrix), result;
    }
    selectPicker(graphic) {
        const picker = this.pickerMap.get(graphic.numberType);
        return picker || null;
    }
};

DefaultPickService = __decorate([ injectable(), __param(0, inject(ContributionProvider)), __param(0, named(PickItemInterceptor)), __param(1, inject(ContributionProvider)), __param(1, named(PickServiceInterceptor)), __metadata("design:paramtypes", [ Object, Object ]) ], DefaultPickService);

export { DefaultPickService };
//# sourceMappingURL=picker-service.js.map
