"use strict";

var __rest = this && this.__rest || function(s, e) {
    var t = {};
    for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0 && (t[p] = s[p]);
    if (null != s && "function" == typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (p = Object.getOwnPropertySymbols(s); i < p.length; i++) e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]) && (t[p[i]] = s[p[i]]);
    }
    return t;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.LineAxis = void 0;

const vutils_1 = require("@visactor/vutils"), vrender_core_1 = require("@visactor/vrender-core"), segment_1 = require("../segment"), matrix_1 = require("../util/matrix"), base_1 = require("./base"), config_1 = require("./config"), constant_1 = require("./constant"), util_1 = require("../util"), auto_hide_1 = require("./overlap/auto-hide"), auto_rotate_1 = require("./overlap/auto-rotate"), auto_limit_1 = require("./overlap/auto-limit"), auto_wrap_1 = require("./overlap/auto-wrap"), align_1 = require("../util/align"), line_1 = require("./mixin/line"), register_1 = require("./register"), util_2 = require("./util");

(0, register_1.loadLineAxisComponent)();

class LineAxis extends base_1.AxisBase {
    constructor(attributes, options) {
        super((null == options ? void 0 : options.skipDefault) ? attributes : (0, vutils_1.merge)({}, LineAxis.defaultAttributes, attributes), options);
    }
    _renderInner(container) {
        var _a;
        if (this._breaks = null, this.attribute.breaks && this.attribute.breaks.length) {
            const transformedBreaks = [];
            for (let index = 0; index < this.attribute.breaks.length; index++) {
                const aBreak = this.attribute.breaks[index], {range: range, breakSymbol: breakSymbol, rawRange: rawRange} = aBreak;
                transformedBreaks.push({
                    startPoint: this.getTickCoord(range[0]),
                    endPoint: this.getTickCoord(range[1]),
                    range: range,
                    breakSymbol: breakSymbol,
                    rawRange: rawRange
                });
            }
            this._breaks = transformedBreaks;
        }
        super._renderInner(container), this._breaks && this._breaks.length && this._breaks.forEach(((b, index) => {
            const {startPoint: startPoint, endPoint: endPoint, breakSymbol: breakSymbol, rawRange: rawRange} = b;
            if (!1 !== (null == breakSymbol ? void 0 : breakSymbol.visible)) {
                const axisBreakGroup = vrender_core_1.graphicCreator.group({
                    zIndex: constant_1.TopZIndex
                });
                axisBreakGroup.name = constant_1.AXIS_ELEMENT_NAME.axisBreak, axisBreakGroup.id = this._getNodeId(`${constant_1.AXIS_ELEMENT_NAME.axisBreak}-${index}`), 
                axisBreakGroup.data = rawRange;
                const symbolStyle = (0, util_2.getAxisBreakSymbolAttrs)(breakSymbol), shape1 = vrender_core_1.graphicCreator.symbol(Object.assign({
                    x: startPoint.x,
                    y: startPoint.y
                }, symbolStyle));
                shape1.name = constant_1.AXIS_ELEMENT_NAME.axisBreakSymbol;
                const shape2 = vrender_core_1.graphicCreator.symbol(Object.assign({
                    x: endPoint.x,
                    y: endPoint.y
                }, symbolStyle));
                shape2.name = constant_1.AXIS_ELEMENT_NAME.axisBreakSymbol, axisBreakGroup.add(shape1), 
                axisBreakGroup.add(shape2), container.add(axisBreakGroup);
            }
        }));
        const {panel: panel} = this.attribute;
        if (panel && panel.visible) {
            const axisContainer = this.axisContainer, axisContainerBounds = axisContainer.AABBBounds, bgRect = vrender_core_1.graphicCreator.rect(Object.assign({
                x: axisContainerBounds.x1,
                y: axisContainerBounds.y1,
                width: axisContainerBounds.width(),
                height: axisContainerBounds.height()
            }, panel.style));
            bgRect.name = constant_1.AXIS_ELEMENT_NAME.background, bgRect.id = this._getNodeId("background"), 
            bgRect.states = (0, vutils_1.merge)({}, constant_1.DEFAULT_STATES, null !== (_a = panel.state) && void 0 !== _a ? _a : {}), 
            axisContainer.insertBefore(bgRect, axisContainer.firstChild);
        }
    }
    renderLine(container) {
        const {start: start, end: end, line: line} = this.attribute, _a = line, {startSymbol: startSymbol, endSymbol: endSymbol, style: style, state: state} = _a, restLineAttrs = __rest(_a, [ "startSymbol", "endSymbol", "style", "state" ]), lineAttrs = Object.assign({
            startSymbol: startSymbol,
            endSymbol: endSymbol,
            lineStyle: style
        }, restLineAttrs);
        if (this._breaks && this._breaks.length) {
            const linePoints = [];
            let lastStartPoint = start;
            this._breaks.forEach((b => {
                const {startPoint: startPoint, endPoint: endPoint} = b;
                linePoints.push([ lastStartPoint, startPoint ]), lastStartPoint = endPoint;
            })), linePoints.push([ lastStartPoint, end ]), lineAttrs.points = linePoints, lineAttrs.multiSegment = !0;
        } else lineAttrs.points = [ start, end ];
        (0, vutils_1.isEmpty)(state) || (lineAttrs.state = {
            line: (0, vutils_1.merge)({}, constant_1.DEFAULT_STATES, state),
            symbol: (0, vutils_1.merge)({}, constant_1.DEFAULT_STATES, state)
        });
        const axisLineGroup = new segment_1.Segment(lineAttrs);
        axisLineGroup.name = constant_1.AXIS_ELEMENT_NAME.line, axisLineGroup.id = this._getNodeId("line"), 
        container.add(axisLineGroup);
    }
    getTextAlign(vector) {
        let align = "center";
        return (0, vutils_1.isNumberClose)(vector[0], 0) ? (0, vutils_1.isNumberClose)(vector[1], 0) ? Object.is(vector[1], -0) ? align = "start" : Object.is(vector[0], -0) && (align = "end") : align = "center" : vector[0] > 0 ? align = "start" : vector[0] < 0 && (align = "end"), 
        align;
    }
    getTitleAttribute() {
        var _a, _b, _c;
        const _d = this.attribute.title, {position: position = "middle", space: space = 4, textStyle: textStyle = {}, autoRotate: autoRotate = !0, shape: shape, background: background, state: state = {}, maxWidth: maxWidth} = _d, restAttrs = __rest(_d, [ "position", "space", "textStyle", "autoRotate", "shape", "background", "state", "maxWidth" ]);
        let percent = .5;
        "start" === position ? percent = 0 : "end" === position && (percent = 1);
        const {verticalFactor: verticalFactor = 1} = this.attribute, factor = -1 * verticalFactor, point = this.getTickCoord(percent), axisVector = this.getRelativeVector();
        let labelLength = 0;
        if ((null === (_a = this.attribute.label) || void 0 === _a ? void 0 : _a.visible) && !1 === this.attribute.label.inside) {
            const space = +(0, vutils_1.get)(this.attribute, "label.space", 4);
            labelLength += space;
            const layerCount = Object.keys(this.axisLabelLayerSize).length;
            if (0 === axisVector[1]) {
                const labelBoundsHeight = this.axisLabelsContainer ? this.axisLabelsContainer.AABBBounds.height() : 0;
                isFinite(labelBoundsHeight) ? labelLength += labelBoundsHeight + (layerCount - 1) * space : labelLength = 0;
            } else if (0 === axisVector[0]) if (this.axisLabelsContainer && this.axisLabelsContainer.AABBBounds && !this.axisLabelsContainer.AABBBounds.empty()) {
                const baseX = this.axisLabelLayerSize[0].labelPos, bounds = this.axisLabelsContainer.AABBBounds;
                labelLength += (1 === factor ? bounds.x2 > baseX ? Math.min(bounds.x2 - baseX, bounds.width()) : 0 : bounds.x1 < baseX ? Math.min(baseX - bounds.x1, bounds.width()) : 0) + (layerCount - 1) * space;
            } else labelLength = 0; else Object.keys(this.axisLabelLayerSize).forEach(((layer, index) => {
                labelLength += this.axisLabelLayerSize[layer].width + (index > 0 ? space : 0);
            }));
        }
        let tickLength = 0;
        (null === (_b = this.attribute.tick) || void 0 === _b ? void 0 : _b.visible) && !1 === this.attribute.tick.inside && (tickLength = this.attribute.tick.length || 4), 
        (null === (_c = this.attribute.subTick) || void 0 === _c ? void 0 : _c.visible) && !1 === this.attribute.subTick.inside && (tickLength = Math.max(tickLength, this.attribute.subTick.length || 2));
        const offset = tickLength + labelLength + space, titlePoint = this.getVerticalCoord(point, offset, !1), vector = this.getVerticalVector(offset, !1, {
            x: 0,
            y: 0
        });
        let textAlign, textBaseline, {angle: angle} = restAttrs;
        if (textAlign = "start" === position ? "start" : "end" === position ? "end" : "center", 
        (0, vutils_1.isNil)(angle) && autoRotate) {
            const v1 = [ 1, 0 ];
            angle = (0, matrix_1.angleTo)(axisVector, v1, !0);
            const {verticalFactor: verticalFactor = 1} = this.attribute;
            textBaseline = 1 === -1 * verticalFactor ? "bottom" : "top";
        } else textAlign = this.getTextAlign(vector), textBaseline = this.getTextBaseline(vector, !1);
        let maxTagWidth = maxWidth;
        if ((0, vutils_1.isNil)(maxTagWidth)) {
            const {verticalLimitSize: verticalLimitSize, verticalMinSize: verticalMinSize, orient: orient} = this.attribute, limitSize = Math.min(verticalLimitSize || 1 / 0, verticalMinSize || 1 / 0);
            if ((0, vutils_1.isValidNumber)(limitSize)) {
                if ("bottom" === orient || "top" === orient) if (angle !== Math.PI / 2) {
                    const cosValue = Math.abs(Math.cos(null != angle ? angle : 0));
                    maxTagWidth = cosValue < 1e-6 ? 1 / 0 : this.attribute.end.x / cosValue;
                } else maxTagWidth = limitSize - offset; else if (angle && 0 !== angle) {
                    const sinValue = Math.abs(Math.sin(angle));
                    maxTagWidth = sinValue < 1e-6 ? 1 / 0 : this.attribute.end.y / sinValue;
                } else maxTagWidth = limitSize - offset;
            }
        }
        const attrs = Object.assign(Object.assign(Object.assign({}, titlePoint), restAttrs), {
            maxWidth: maxTagWidth,
            textStyle: Object.assign({
                textAlign: textAlign,
                textBaseline: textBaseline
            }, textStyle),
            state: {
                text: (0, vutils_1.merge)({}, constant_1.DEFAULT_STATES, state.text),
                shape: (0, vutils_1.merge)({}, constant_1.DEFAULT_STATES, state.shape),
                panel: (0, vutils_1.merge)({}, constant_1.DEFAULT_STATES, state.background)
            }
        });
        return attrs.angle = angle, shape && shape.visible && (attrs.shape = Object.assign({
            visible: !0
        }, shape.style), shape.space && (attrs.space = shape.space)), background && background.visible && (attrs.panel = Object.assign({
            visible: !0
        }, background.style)), attrs;
    }
    getTextBaseline(vector, inside) {
        let base = "middle";
        const {verticalFactor: verticalFactor = 1} = this.attribute, factor = (inside ? 1 : -1) * verticalFactor;
        return (0, vutils_1.isNumberClose)(vector[1], 0) ? base = !(0, vutils_1.isNumberClose)(vector[0], 0) || Object.is(vector[0], -0) || Object.is(vector[1], -0) ? "middle" : 1 === factor ? "bottom" : "top" : vector[1] > 0 ? base = "top" : vector[1] < 0 && (base = "bottom"), 
        base;
    }
    getLabelAlign(vector, inside, angle) {
        const orient = this.attribute.orient;
        if ([ "top", "bottom", "right", "left" ].includes(orient) || 0 === vector[0] && 0 === vector[1]) {
            if ("top" === orient || "bottom" === orient) return (0, auto_rotate_1.getXAxisLabelAlign)(inside ? "bottom" === orient ? "top" : "bottom" : orient, angle);
            if ("left" === orient || "right" === orient) return (0, auto_rotate_1.getYAxisLabelAlign)(inside ? "left" === orient ? "right" : "left" : orient, angle);
        }
        return {
            textAlign: this.getTextAlign(vector),
            textBaseline: this.getTextBaseline(vector, inside)
        };
    }
    beforeLabelsOverlap(labelShapes, labelData, labelContainer, layer, layerCount) {
        var _a, _b, _c, _d;
        const {flush: flush = !1} = this.attribute.label || {};
        if (flush && labelShapes.length) {
            const {orient: orient, start: axisStart, end: axisEnd} = this.attribute, isX = "bottom" === orient || "top" === orient, first = labelShapes[0], last = (0, 
            vutils_1.last)(labelShapes), isInverse = isX ? first.attribute.x > last.attribute.x : first.attribute.y < last.attribute.y;
            if (isX) {
                const leftMostLabel = isInverse ? last : first, rightMostLabel = isInverse ? first : last, left = axisStart.x, right = axisEnd.x, leftBound = leftMostLabel.AABBBounds.x1, rightBound = rightMostLabel.AABBBounds.x2;
                if (leftBound < left) {
                    leftMostLabel.attribute.angle ? leftMostLabel.setAttributes({
                        dx: (null !== (_a = leftMostLabel.attribute.dx) && void 0 !== _a ? _a : 0) + left - leftBound
                    }) : leftMostLabel.setAttributes({
                        x: left,
                        textAlign: "left"
                    });
                }
                if (rightBound > right) {
                    rightMostLabel.attribute.angle ? rightMostLabel.setAttributes({
                        dx: (null !== (_b = rightMostLabel.attribute.dx) && void 0 !== _b ? _b : 0) + right - rightBound
                    }) : rightMostLabel.setAttributes({
                        x: right,
                        textAlign: "right"
                    });
                }
            } else {
                const bottomMostLabel = isInverse ? last : first, topMostLabel = isInverse ? first : last, bottomBound = bottomMostLabel.AABBBounds.y2, topBound = topMostLabel.AABBBounds.y1, top = axisStart.y, bottom = axisEnd.y;
                if (topBound < top) {
                    topMostLabel.attribute.angle ? topMostLabel.setAttributes({
                        dy: (null !== (_c = topMostLabel.attribute.dy) && void 0 !== _c ? _c : 0) + top - topBound
                    }) : topMostLabel.setAttributes({
                        y: top,
                        textBaseline: "top"
                    });
                }
                if (bottomBound > bottom) {
                    bottomMostLabel.attribute.angle ? bottomMostLabel.setAttributes({
                        dy: (null !== (_d = bottomMostLabel.attribute.dy) && void 0 !== _d ? _d : 0) + bottom - bottomBound
                    }) : bottomMostLabel.setAttributes({
                        y: bottom,
                        textBaseline: "bottom"
                    });
                }
            }
        }
    }
    handleLabelsOverlap(labelShapes, labelData, labelContainer, layer, layerCount) {
        if ((0, vutils_1.isEmpty)(labelShapes)) return;
        const {verticalLimitSize: verticalLimitSize, label: label, orient: orient} = this.attribute, limitLength = this._getAxisLabelLimitLength(verticalLimitSize, layerCount), {layoutFunc: layoutFunc, autoRotate: autoRotate, autoRotateAngle: autoRotateAngle, autoLimit: autoLimit, limitEllipsis: limitEllipsis, autoHide: autoHide, autoHideMethod: autoHideMethod, autoHideSeparation: autoHideSeparation, lastVisible: lastVisible, firstVisible: firstVisible, autoWrap: autoWrap, overflowLimitLength: overflowLimitLength} = label;
        if ((0, vutils_1.isFunction)(layoutFunc)) layoutFunc(labelShapes, labelData, layer, this); else {
            if (autoRotate) (0, auto_rotate_1.autoRotate)(labelShapes, {
                labelRotateAngle: autoRotateAngle,
                orient: orient
            }); else if (autoWrap) {
                const axisLength = "left" === orient || "right" === orient ? Math.abs(this.attribute.start.y - this.attribute.end.y) : Math.abs(this.attribute.start.x - this.attribute.end.x);
                (0, auto_wrap_1.autoWrap)(labelShapes, {
                    orient: orient,
                    limitLength: limitLength,
                    axisLength: axisLength,
                    ellipsis: limitEllipsis
                });
            }
            if (!autoWrap && autoLimit && (0, vutils_1.isValidNumber)(limitLength) && limitLength > 0) {
                const isVertical = "left" === orient || "right" === orient, axisLength = isVertical ? Math.abs(this.attribute.start.y - this.attribute.end.y) : Math.abs(this.attribute.start.x - this.attribute.end.x), verticalLimitLength = isVertical ? axisLength / labelShapes.length : autoHide || autoRotate ? 1 / 0 : axisLength / labelShapes.length;
                (0, auto_limit_1.autoLimit)(labelShapes, {
                    limitLength: limitLength,
                    verticalLimitLength: verticalLimitLength,
                    ellipsis: limitEllipsis,
                    orient: orient,
                    axisLength: axisLength,
                    overflowLimitLength: overflowLimitLength
                });
            }
            autoHide && (0, auto_hide_1.autoHide)(labelShapes, {
                orient: orient,
                method: autoHideMethod,
                separation: autoHideSeparation,
                lastVisible: lastVisible,
                firstVisible: firstVisible
            });
        }
    }
    afterLabelsOverlap(labelShapes, labelData, labelContainer, layer, layerCount) {
        const {verticalLimitSize: verticalLimitSize, orient: orient} = this.attribute, isHorizontal = "bottom" === orient || "top" === orient, axisLabelContainerBounds = labelContainer.AABBBounds;
        let axisLabelContainerSize = isHorizontal ? axisLabelContainerBounds.height() : axisLabelContainerBounds.width();
        const {verticalMinSize: verticalMinSize} = this.attribute;
        if ((0, vutils_1.isValidNumber)(verticalMinSize) && (!(0, vutils_1.isValidNumber)(verticalLimitSize) || verticalMinSize <= verticalLimitSize)) {
            const minSize = this._getAxisLabelLimitLength(verticalMinSize, layerCount);
            let x, y;
            axisLabelContainerSize = Math.max(axisLabelContainerSize, minSize), "left" === orient ? (x = axisLabelContainerBounds.x2 - axisLabelContainerSize, 
            y = axisLabelContainerBounds.y1) : "right" === orient ? (x = axisLabelContainerBounds.x1, 
            y = axisLabelContainerBounds.y1) : "top" === orient ? (x = axisLabelContainerBounds.x1, 
            y = axisLabelContainerBounds.y2 - axisLabelContainerSize) : "bottom" === orient && (x = axisLabelContainerBounds.x1, 
            y = axisLabelContainerBounds.y1);
            const bgRect = vrender_core_1.graphicCreator.rect({
                x: x,
                y: y,
                width: isHorizontal ? axisLabelContainerBounds.width() : axisLabelContainerSize,
                height: isHorizontal ? axisLabelContainerSize : axisLabelContainerBounds.height(),
                pickable: !1
            });
            bgRect.name = constant_1.AXIS_ELEMENT_NAME.axisLabelBackground, bgRect.id = this._getNodeId("axis-label-background"), 
            labelContainer.insertBefore(bgRect, labelContainer.firstChild);
        }
        if ((0, vutils_1.isValid)(this.attribute.label.containerAlign)) {
            let start;
            "left" === orient ? start = axisLabelContainerBounds.x2 - axisLabelContainerSize : "right" === orient ? start = axisLabelContainerBounds.x1 : "top" === orient ? start = axisLabelContainerBounds.y2 - axisLabelContainerSize : "bottom" === orient && (start = axisLabelContainerBounds.y1), 
            (0, align_1.alignAxisLabels)(labelShapes, start, axisLabelContainerSize, orient, this.attribute.label.containerAlign);
        }
    }
    _getAxisLabelLimitLength(limitSize, layerCount) {
        var _a, _b, _c, _d, _e;
        const {label: label, title: title, line: line, tick: tick} = this.attribute, labelSpace = null !== (_a = label.space) && void 0 !== _a ? _a : 4;
        let limitLength = limitSize, titleHeight = 0, titleSpacing = 0;
        const axisLineWidth = line && line.visible ? null !== (_b = line.style.lineWidth) && void 0 !== _b ? _b : 1 : 0, tickLength = tick && tick.visible ? null !== (_c = tick.length) && void 0 !== _c ? _c : 4 : 0;
        if (title && title.visible && "string" == typeof title.text) {
            titleHeight = (0, util_1.measureTextSize)(title.text, title.textStyle, null === (_e = null === (_d = this.stage) || void 0 === _d ? void 0 : _d.getTheme()) || void 0 === _e ? void 0 : _e.text).height;
            const padding = (0, vutils_1.normalizePadding)(title.padding);
            titleSpacing = title.space + padding[0] + padding[2];
        }
        return limitLength && (limitLength = (limitLength - labelSpace - titleSpacing - titleHeight - axisLineWidth - tickLength) / layerCount), 
        limitLength;
    }
    release() {
        super.release(), this._breaks = null;
    }
}

exports.LineAxis = LineAxis, LineAxis.defaultAttributes = config_1.DEFAULT_AXIS_THEME, 
(0, vutils_1.mixin)(LineAxis, line_1.LineAxisMixin);
//# sourceMappingURL=line.js.map