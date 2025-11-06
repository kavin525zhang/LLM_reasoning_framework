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
}), exports.DefaultCanvasAreaRender = void 0;

const vutils_1 = require("@visactor/vutils"), inversify_lite_1 = require("../../../common/inversify-lite"), contribution_provider_1 = require("../../../common/contribution-provider"), segment_1 = require("../../../common/segment"), theme_1 = require("../../../graphic/theme"), constants_1 = require("./contributions/constants"), enums_1 = require("../../../common/enums"), render_area_1 = require("../../../common/render-area"), constants_2 = require("../../../graphic/constants"), render_curve_1 = require("../../../common/render-curve"), base_render_1 = require("./base-render"), area_contribution_render_1 = require("./contributions/area-contribution-render");

let DefaultCanvasAreaRender = class extends base_render_1.BaseRender {
    constructor(areaRenderContribitions) {
        super(), this.areaRenderContribitions = areaRenderContribitions, this.numberType = constants_2.AREA_NUMBER_TYPE, 
        this.builtinContributions = [ area_contribution_render_1.defaultAreaTextureRenderContribution, area_contribution_render_1.defaultAreaBackgroundRenderContribution ], 
        this.init(areaRenderContribitions);
    }
    drawLinearAreaHighPerformance(area, context, fill, stroke, fillOpacity, strokeOpacity, offsetX, offsetY, areaAttribute, drawContext, params, fillCb, strokeCb) {
        var _a, _b, _c;
        const {points: points} = area.attribute;
        if (points.length < 2) return;
        context.beginPath();
        const z = null !== (_a = this.z) && void 0 !== _a ? _a : 0, startP = points[0];
        context.moveTo(startP.x + offsetX, startP.y + offsetY, z);
        for (let i = 1; i < points.length; i++) {
            const p = points[i];
            context.lineTo(p.x + offsetX, p.y + offsetY, z);
        }
        for (let i = points.length - 1; i >= 0; i--) {
            const p = points[i];
            context.lineTo((null !== (_b = p.x1) && void 0 !== _b ? _b : p.x) + offsetX, (null !== (_c = p.y1) && void 0 !== _c ? _c : p.y) + offsetY, z);
        }
        context.closePath(), context.setShadowBlendStyle && context.setShadowBlendStyle(area, area.attribute, areaAttribute), 
        this.beforeRenderStep(area, context, offsetX, offsetY, !!fillOpacity, !1, fill, !1, areaAttribute, drawContext, fillCb, null, {
            attribute: area.attribute
        });
        const {x: originX = 0, x: originY = 0} = area.attribute;
        !1 !== fill && (fillCb ? fillCb(context, area.attribute, areaAttribute) : fillOpacity && (context.setCommonStyle(area, area.attribute, originX - offsetX, originY - offsetY, areaAttribute), 
        context.fill())), this.afterRenderStep(area, context, offsetX, offsetY, !!fillOpacity, !1, fill, !1, areaAttribute, drawContext, fillCb, null, {
            attribute: area.attribute
        }), (() => {
            var _a, _b;
            if (stroke) {
                const {stroke: stroke = areaAttribute && areaAttribute.stroke} = area.attribute;
                if ((0, vutils_1.isArray)(stroke) && (stroke[0] || stroke[2]) && !1 === stroke[1]) if (context.beginPath(), 
                stroke[0]) {
                    context.moveTo(startP.x + offsetX, startP.y + offsetY, z);
                    for (let i = 1; i < points.length; i++) {
                        const p = points[i];
                        context.lineTo(p.x + offsetX, p.y + offsetY, z);
                    }
                } else if (stroke[2]) {
                    const endP = points[points.length - 1];
                    context.moveTo(endP.x + offsetX, endP.y + offsetY, z);
                    for (let i = points.length - 2; i >= 0; i--) {
                        const p = points[i];
                        context.lineTo((null !== (_a = p.x1) && void 0 !== _a ? _a : p.x) + offsetX, (null !== (_b = p.y1) && void 0 !== _b ? _b : p.y) + offsetY, z);
                    }
                }
                strokeCb ? strokeCb(context, area.attribute, areaAttribute) : (context.setStrokeStyle(area, area.attribute, originX - offsetX, originY - offsetY, areaAttribute), 
                context.stroke());
            }
        })();
    }
    drawShape(area, context, x, y, drawContext, params, fillCb, strokeCb) {
        var _a, _b, _c, _d, _e, _f;
        const areaAttribute = (0, theme_1.getTheme)(area, null == params ? void 0 : params.theme).area, {fill: fill = areaAttribute.fill, stroke: stroke = areaAttribute.stroke, fillOpacity: fillOpacity = areaAttribute.fillOpacity, z: z = areaAttribute.z, strokeOpacity: strokeOpacity = areaAttribute.strokeOpacity, curveTension: curveTension = areaAttribute.curveTension, connectedType: connectedType = areaAttribute.connectedType} = area.attribute, data = this.valid(area, areaAttribute, fillCb, strokeCb);
        if (!data) return;
        const {doFill: doFill} = data, doStroke = data.doStroke && data.sVisible, {clipRange: clipRange = areaAttribute.clipRange, closePath: closePath, points: points, segments: segments} = area.attribute;
        let {curveType: curveType = areaAttribute.curveType} = area.attribute;
        function parsePoint(points, connectedType) {
            return "connect" !== connectedType ? points : points.filter((p => !1 !== p.defined));
        }
        if (closePath && "linear" === curveType && (curveType = "linearClosed"), 1 === clipRange && !segments && !points.some((p => !1 === p.defined)) && "linear" === curveType) return this.drawLinearAreaHighPerformance(area, context, !!fill, doStroke, fillOpacity, strokeOpacity, x, y, areaAttribute, drawContext, params, fillCb, strokeCb);
        if (area.shouldUpdateShape()) {
            if (segments && segments.length) {
                let startPoint, lastTopSeg;
                const topCaches = segments.map(((seg, index) => {
                    if (seg.points.length <= 1 && 0 === index) return seg.points[0] && (lastTopSeg = {
                        endX: seg.points[0].x,
                        endY: seg.points[0].y
                    }), null;
                    1 === index ? startPoint = {
                        x: lastTopSeg.endX,
                        y: lastTopSeg.endY
                    } : index > 1 && (startPoint.x = lastTopSeg.endX, startPoint.y = lastTopSeg.endY);
                    const data = (0, segment_1.calcLineCache)(parsePoint(seg.points, connectedType), curveType, {
                        startPoint: startPoint,
                        curveTension: curveTension
                    });
                    return lastTopSeg = data, data;
                })).filter((item => !!item));
                let lastBottomSeg;
                const bottomCaches = [];
                for (let i = segments.length - 1; i >= 0; i--) {
                    const points = segments[i].points, bottomPoints = [];
                    for (let i = points.length - 1; i >= 0; i--) bottomPoints.push({
                        x: null !== (_a = points[i].x1) && void 0 !== _a ? _a : points[i].x,
                        y: null !== (_b = points[i].y1) && void 0 !== _b ? _b : points[i].y
                    });
                    if (0 !== i) {
                        const lastSegmentPoints = segments[i - 1].points, endPoint = lastSegmentPoints[lastSegmentPoints.length - 1];
                        endPoint && bottomPoints.push({
                            x: null !== (_c = endPoint.x1) && void 0 !== _c ? _c : endPoint.x,
                            y: null !== (_d = endPoint.y1) && void 0 !== _d ? _d : endPoint.y
                        });
                    }
                    bottomPoints.length > 1 && (lastBottomSeg = (0, segment_1.calcLineCache)(parsePoint(bottomPoints, connectedType), "stepBefore" === curveType ? "stepAfter" : "stepAfter" === curveType ? "stepBefore" : curveType, {
                        curveTension: curveTension
                    }), bottomCaches.unshift(lastBottomSeg));
                }
                area.cacheArea = bottomCaches.map(((item, index) => ({
                    top: topCaches[index],
                    bottom: item
                })));
            } else {
                if (!points || !points.length) return area.cacheArea = null, void area.clearUpdateShapeTag();
                {
                    const topPoints = parsePoint(points, connectedType), bottomPoints = [];
                    for (let i = topPoints.length - 1; i >= 0; i--) bottomPoints.push({
                        x: null !== (_e = topPoints[i].x1) && void 0 !== _e ? _e : topPoints[i].x,
                        y: null !== (_f = topPoints[i].y1) && void 0 !== _f ? _f : topPoints[i].y
                    });
                    const topCache = (0, segment_1.calcLineCache)(topPoints, curveType, {
                        curveTension: curveTension
                    }), bottomCache = (0, segment_1.calcLineCache)(bottomPoints, "stepBefore" === curveType ? "stepAfter" : "stepAfter" === curveType ? "stepBefore" : curveType, {
                        curveTension: curveTension
                    });
                    area.cacheArea = {
                        top: topCache,
                        bottom: bottomCache
                    };
                }
            }
            area.clearUpdateShapeTag();
        }
        if (Array.isArray(area.cacheArea)) {
            const segments = area.attribute.segments.filter((item => item.points.length));
            if (1 === segments[0].points.length && segments.shift(), 1 === clipRange) {
                let skip = !1;
                area.cacheArea.forEach(((cache, index) => {
                    skip || (skip = this.drawSegmentItem(context, cache, doFill, fillOpacity, doStroke, strokeOpacity, segments[index], [ areaAttribute, area.attribute ], clipRange, x, y, z, area, drawContext, fillCb, strokeCb));
                }));
            } else {
                const totalLength = area.cacheArea.reduce(((l, c) => l + c.top.getLength()), 0), totalDrawLength = clipRange * totalLength;
                let drawedLengthUntilLast = 0, skip = !1;
                area.cacheArea.forEach(((cache, index) => {
                    if (skip) return;
                    const curSegLength = cache.top.getLength(), _cr = (totalDrawLength - drawedLengthUntilLast) / curSegLength;
                    drawedLengthUntilLast += curSegLength, _cr > 0 && (skip = this.drawSegmentItem(context, cache, doFill, fillOpacity, doStroke, strokeOpacity, segments[index], [ areaAttribute, area.attribute ], (0, 
                    vutils_1.min)(_cr, 1), x, y, z, area, drawContext, fillCb, strokeCb));
                }));
            }
        } else this.drawSegmentItem(context, area.cacheArea, doFill, fillOpacity, doStroke, strokeOpacity, area.attribute, areaAttribute, clipRange, x, y, z, area, drawContext, fillCb, strokeCb);
    }
    draw(area, renderService, drawContext, params) {
        const areaAttribute = (0, theme_1.getTheme)(area, null == params ? void 0 : params.theme).area;
        this._draw(area, areaAttribute, !1, drawContext, params);
    }
    drawSegmentItem(context, cache, fill, fillOpacity, stroke, strokeOpacity, attribute, defaultAttribute, clipRange, offsetX, offsetY, offsetZ, area, drawContext, fillCb, strokeCb) {
        return this._drawSegmentItem(context, cache, fill, fillOpacity, stroke, strokeOpacity, attribute, defaultAttribute, clipRange, offsetX, offsetY, offsetZ, area, drawContext, fillCb, strokeCb);
    }
    _drawSegmentItem(context, cache, fill, fillOpacity, stroke, strokeOpacity, attribute, defaultAttribute, clipRange, offsetX, offsetY, offsetZ, area, drawContext, fillCb, strokeCb) {
        if (!(cache && cache.top && cache.bottom && cache.top.curves && cache.top.curves.length && cache.bottom.curves && cache.bottom.curves.length)) return;
        context.beginPath();
        const {points: points, segments: segments} = area.attribute;
        let endP, startP, direction = enums_1.Direction.ROW;
        if (segments) {
            const endSeg = segments[segments.length - 1];
            startP = segments[0].points[0], endP = endSeg.points[endSeg.points.length - 1];
        } else startP = points[0], endP = points[points.length - 1];
        const xTotalLength = (0, vutils_1.abs)(endP.x - startP.x), yTotalLength = (0, vutils_1.abs)(endP.y - startP.y);
        direction = null == endP.x1 ? enums_1.Direction.ROW : null == endP.y1 ? enums_1.Direction.COLUMN : Number.isFinite(xTotalLength + yTotalLength) ? xTotalLength > yTotalLength ? enums_1.Direction.ROW : enums_1.Direction.COLUMN : enums_1.Direction.ROW, 
        (0, render_area_1.drawAreaSegments)(context.camera ? context : context.nativeContext, cache, clipRange, {
            offsetX: offsetX,
            offsetY: offsetY,
            offsetZ: offsetZ,
            direction: direction
        }), this.beforeRenderStep(area, context, offsetX, offsetY, !!fillOpacity, !1, fill, !1, defaultAttribute, drawContext, fillCb, null, {
            attribute: attribute
        }), context.setShadowBlendStyle && context.setShadowBlendStyle(area, attribute, defaultAttribute);
        const {x: originX = 0, x: originY = 0} = attribute;
        return !1 !== fill && (fillCb ? fillCb(context, attribute, defaultAttribute) : fillOpacity && (context.setCommonStyle(area, attribute, originX - offsetX, originY - offsetY, defaultAttribute), 
        context.fill())), this.afterRenderStep(area, context, offsetX, offsetY, !!fillOpacity, !1, fill, !1, defaultAttribute, drawContext, fillCb, null, {
            attribute: attribute
        }), (() => {
            if (!1 !== stroke) if (strokeCb) strokeCb(context, attribute, defaultAttribute); else {
                const {stroke: stroke = defaultAttribute && defaultAttribute[1] && defaultAttribute[1].stroke} = attribute;
                (0, vutils_1.isArray)(stroke) && (stroke[0] || stroke[2]) && !1 === stroke[1] && (context.beginPath(), 
                (0, render_curve_1.drawSegments)(context.camera ? context : context.nativeContext, stroke[0] ? cache.top : cache.bottom, clipRange, direction === enums_1.Direction.ROW ? "x" : "y", {
                    offsetX: offsetX,
                    offsetY: offsetY,
                    offsetZ: offsetZ
                })), context.setStrokeStyle(area, attribute, originX - offsetX, originY - offsetY, defaultAttribute), 
                context.stroke();
            }
        })(), !1;
    }
};

DefaultCanvasAreaRender = __decorate([ (0, inversify_lite_1.injectable)(), __param(0, (0, 
inversify_lite_1.inject)(contribution_provider_1.ContributionProvider)), __param(0, (0, 
inversify_lite_1.named)(constants_1.AreaRenderContribution)), __metadata("design:paramtypes", [ Object ]) ], DefaultCanvasAreaRender), 
exports.DefaultCanvasAreaRender = DefaultCanvasAreaRender;
//# sourceMappingURL=area-render.js.map
