import { getModelMatrix, shouldUseMat4 } from "../../../graphic/graphic-service/graphic-service";

import { mat4Allocate } from "../../../allocator/matrix-allocate";

import { fillVisible, runFill, runStroke, strokeVisible } from "./utils";

import { BaseRenderContributionTime } from "../../../common/enums";

import { multiplyMat4Mat4 } from "../../../common/matrix";

import { getTheme } from "../../../graphic";

import { renderCommandList } from "../../../common/render-command-list";

import { defaultBaseClipRenderAfterContribution, defaultBaseClipRenderBeforeContribution } from "./contributions";

const result = {
    x: 0,
    y: 0,
    z: 0,
    lastModelMatrix: null
};

export class BaseRender {
    init(contributions) {
        contributions && (this._renderContribitions = contributions.getContributions()), 
        this._renderContribitions || (this._renderContribitions = []), this.builtinContributions || (this.builtinContributions = []), 
        this.builtinContributions.push(defaultBaseClipRenderBeforeContribution), this.builtinContributions.push(defaultBaseClipRenderAfterContribution), 
        this.builtinContributions.forEach((item => this._renderContribitions.push(item))), 
        this._renderContribitions.length && (this._renderContribitions.sort(((a, b) => b.order - a.order)), 
        this._beforeRenderContribitions = this._renderContribitions.filter((c => c.time === BaseRenderContributionTime.beforeFillStroke)), 
        this._afterRenderContribitions = this._renderContribitions.filter((c => c.time === BaseRenderContributionTime.afterFillStroke)));
    }
    beforeRenderStep(graphic, context, x, y, doFill, doStroke, fVisible, sVisible, graphicAttribute, drawContext, fillCb, strokeCb, params) {
        this._beforeRenderContribitions && this._beforeRenderContribitions.forEach((c => {
            if (c.supportedAppName && graphic.stage && graphic.stage.params && graphic.stage.params.context && graphic.stage.params.context.appName) {
                if (!(Array.isArray(c.supportedAppName) ? c.supportedAppName : [ c.supportedAppName ]).includes(graphic.stage.params.context.appName)) return;
            }
            c.drawShape(graphic, context, x, y, doFill, doStroke, fVisible, sVisible, graphicAttribute, drawContext, fillCb, strokeCb, params);
        }));
    }
    afterRenderStep(graphic, context, x, y, doFill, doStroke, fVisible, sVisible, graphicAttribute, drawContext, fillCb, strokeCb, params) {
        this._afterRenderContribitions && this._afterRenderContribitions.forEach((c => {
            if (c.supportedAppName && graphic.stage && graphic.stage.params && graphic.stage.params.context && graphic.stage.params.context.appName) {
                if (!(Array.isArray(c.supportedAppName) ? c.supportedAppName : [ c.supportedAppName ]).includes(graphic.stage.params.context.appName)) return;
            }
            c.drawShape(graphic, context, x, y, doFill, doStroke, fVisible, sVisible, graphicAttribute, drawContext, fillCb, strokeCb, params);
        }));
    }
    drawPathProxy(graphic, context, x, y, drawContext, params, fillCb, strokeCb) {
        if (!graphic.pathProxy) return !1;
        const themeAttributes = getTheme(graphic, null == params ? void 0 : params.theme)[graphic.type.replace("3d", "")], {fill: fill = themeAttributes.fill, stroke: stroke = themeAttributes.stroke, opacity: opacity = themeAttributes.opacity, fillOpacity: fillOpacity = themeAttributes.fillOpacity, lineWidth: lineWidth = themeAttributes.lineWidth, strokeOpacity: strokeOpacity = themeAttributes.strokeOpacity, visible: visible = themeAttributes.visible, x: originX = themeAttributes.x, y: originY = themeAttributes.y} = graphic.attribute, fVisible = fillVisible(opacity, fillOpacity, fill), sVisible = strokeVisible(opacity, strokeOpacity), doFill = runFill(fill), doStroke = runStroke(stroke, lineWidth);
        if (!visible) return !0;
        if (!doFill && !doStroke) return !0;
        if (!(fVisible || sVisible || fillCb || strokeCb)) return !0;
        context.beginPath();
        const path = "function" == typeof graphic.pathProxy ? graphic.pathProxy(graphic.attribute) : graphic.pathProxy;
        return renderCommandList(path.commandList, context, x, y), context.setShadowBlendStyle && context.setShadowBlendStyle(graphic, graphic.attribute, themeAttributes), 
        this.beforeRenderStep(graphic, context, x, y, doFill, doStroke, fVisible, sVisible, themeAttributes, drawContext, fillCb, strokeCb), 
        doStroke && (strokeCb ? strokeCb(context, graphic.attribute, themeAttributes) : sVisible && (context.setStrokeStyle(graphic, graphic.attribute, x - originX, y - originY, themeAttributes), 
        context.stroke())), doFill && (fillCb ? fillCb(context, graphic.attribute, themeAttributes) : fVisible && (context.setCommonStyle(graphic, graphic.attribute, x - originX, y - originY, themeAttributes), 
        context.fill())), this.afterRenderStep(graphic, context, x, y, doFill, doStroke, fVisible, sVisible, themeAttributes, drawContext, fillCb, strokeCb), 
        !0;
    }
    valid(graphic, defaultAttribute, fillCb, strokeCb) {
        const {fill: fill = defaultAttribute.fill, background: background, stroke: stroke = defaultAttribute.stroke, opacity: opacity = defaultAttribute.opacity, fillOpacity: fillOpacity = defaultAttribute.fillOpacity, lineWidth: lineWidth = defaultAttribute.lineWidth, strokeOpacity: strokeOpacity = defaultAttribute.strokeOpacity, visible: visible = defaultAttribute.visible} = graphic.attribute, fVisible = fillVisible(opacity, fillOpacity, fill), sVisible = strokeVisible(opacity, strokeOpacity), doFill = runFill(fill, background), doStroke = runStroke(stroke, lineWidth);
        return !(!graphic.valid || !visible) && (!(!doFill && !doStroke) && (!!(fVisible || sVisible || fillCb || strokeCb || background) && {
            fVisible: fVisible,
            sVisible: sVisible,
            doFill: doFill,
            doStroke: doStroke
        }));
    }
    transform(graphic, graphicAttribute, context, use3dMatrixIn3dMode = !1) {
        const {x: x = graphicAttribute.x, y: y = graphicAttribute.y, z: z = graphicAttribute.z, scaleX: scaleX = graphicAttribute.scaleX, scaleY: scaleY = graphicAttribute.scaleY, angle: angle = graphicAttribute.angle, postMatrix: postMatrix} = graphic.attribute, lastModelMatrix = context.modelMatrix, camera = context.camera;
        result.x = x, result.y = y, result.z = z, result.lastModelMatrix = lastModelMatrix;
        const shouldTransform3d = camera && (use3dMatrixIn3dMode || shouldUseMat4(graphic)), onlyTranslate = shouldTransform3d ? graphic.transMatrix.onlyTranslate() && !postMatrix : 1 === scaleX && 1 === scaleY && 0 === angle && !postMatrix;
        if (shouldTransform3d) {
            const nextModelMatrix = mat4Allocate.allocate(), modelMatrix = mat4Allocate.allocate();
            getModelMatrix(modelMatrix, graphic, graphicAttribute), multiplyMat4Mat4(nextModelMatrix, lastModelMatrix || nextModelMatrix, modelMatrix), 
            result.x = 0, result.y = 0, result.z = 0, context.modelMatrix = nextModelMatrix, 
            context.setTransform(1, 0, 0, 1, 0, 0, !0), mat4Allocate.free(modelMatrix);
        }
        if (onlyTranslate && !lastModelMatrix) {
            const point = graphic.getOffsetXY(graphicAttribute);
            result.x += point.x, result.y += point.y, result.z = z, context.setTransformForCurrent();
        } else if (shouldTransform3d) result.x = 0, result.y = 0, result.z = 0, context.setTransform(1, 0, 0, 1, 0, 0, !0); else if (camera && context.project) {
            const point = graphic.getOffsetXY(graphicAttribute);
            result.x += point.x, result.y += point.y, this.transformWithoutTranslate(context, result.x, result.y, result.z, scaleX, scaleY, angle);
        } else context.transformFromMatrix(graphic.transMatrix, !0), result.x = 0, result.y = 0, 
        result.z = 0;
        return result;
    }
    transformUseContext2d(graphic, graphicAttribute, z, context) {
        const camera = context.camera;
        if (this.camera = camera, camera) {
            const bounds = graphic.AABBBounds, width = bounds.x2 - bounds.x1, height = bounds.y2 - bounds.y1, p1 = context.project(0, 0, z), p2 = context.project(width, 0, z), p3 = context.project(width, height, z), _p1 = {
                x: 0,
                y: 0
            }, _p2 = {
                x: width,
                y: 0
            }, _p3 = {
                x: width,
                y: height
            };
            context.camera = null;
            const denom = 1 / (_p1.x * (_p3.y - _p2.y) - _p2.x * _p3.y + _p3.x * _p2.y + (_p2.x - _p3.x) * _p1.y), m11 = -(_p1.y * (p3.x - p2.x) - _p2.y * p3.x + _p3.y * p2.x + (_p2.y - _p3.y) * p1.x) * denom, m12 = (_p2.y * p3.y + _p1.y * (p2.y - p3.y) - _p3.y * p2.y + (_p3.y - _p2.y) * p1.y) * denom, m21 = (_p1.x * (p3.x - p2.x) - _p2.x * p3.x + _p3.x * p2.x + (_p2.x - _p3.x) * p1.x) * denom, m22 = -(_p2.x * p3.y + _p1.x * (p2.y - p3.y) - _p3.x * p2.y + (_p3.x - _p2.x) * p1.y) * denom, dx = (_p1.x * (_p3.y * p2.x - _p2.y * p3.x) + _p1.y * (_p2.x * p3.x - _p3.x * p2.x) + (_p3.x * _p2.y - _p2.x * _p3.y) * p1.x) * denom, dy = (_p1.x * (_p3.y * p2.y - _p2.y * p3.y) + _p1.y * (_p2.x * p3.y - _p3.x * p2.y) + (_p3.x * _p2.y - _p2.x * _p3.y) * p1.y) * denom;
            context.setTransform(m11, m12, m21, m22, dx, dy, !0);
        }
    }
    restoreTransformUseContext2d(graphic, graphicAttribute, z, context) {
        this.camera && (context.camera = this.camera);
    }
    transformWithoutTranslate(context, x, y, z, scaleX, scaleY, angle) {
        const p = context.project(x, y, z);
        context.translate(p.x, p.y, !1), context.scale(scaleX, scaleY, !1), context.rotate(angle, !1), 
        context.translate(-p.x, -p.y, !1), context.setTransformForCurrent();
    }
    _draw(graphic, defaultAttr, computed3dMatrix, drawContext, params) {
        const {context: context} = drawContext;
        if (!context) return;
        const {renderable: renderable} = graphic.attribute;
        if (!1 === renderable) return;
        context.highPerformanceSave();
        const data = this.transform(graphic, defaultAttr, context, computed3dMatrix), {x: x, y: y, z: z, lastModelMatrix: lastModelMatrix} = data;
        this.z = z, this.drawPathProxy(graphic, context, x, y, drawContext, params) || (this.drawShape(graphic, context, x, y, drawContext, params), 
        this.z = 0, context.modelMatrix !== lastModelMatrix && mat4Allocate.free(context.modelMatrix), 
        context.modelMatrix = lastModelMatrix), context.highPerformanceRestore();
    }
}
//# sourceMappingURL=base-render.js.map
