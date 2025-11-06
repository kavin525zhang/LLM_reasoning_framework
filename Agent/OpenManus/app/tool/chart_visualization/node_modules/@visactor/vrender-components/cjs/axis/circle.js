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
}), exports.CircleAxis = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), vutils_1 = require("@visactor/vutils"), constant_1 = require("../constant"), base_1 = require("./base"), config_1 = require("./config"), constant_2 = require("./constant"), circle_1 = require("./mixin/circle"), util_1 = require("./util"), register_1 = require("./register"), auto_hide_1 = require("./overlap/auto-hide"), circle_auto_limit_1 = require("./overlap/circle-auto-limit");

(0, register_1.loadCircleAxisComponent)();

class CircleAxis extends base_1.AxisBase {
    constructor(attributes, options) {
        super((null == options ? void 0 : options.skipDefault) ? attributes : (0, vutils_1.merge)({}, CircleAxis.defaultAttributes, attributes));
    }
    renderLine(container) {
        const {startAngle: startAngle = constant_1.POLAR_START_ANGLE, endAngle: endAngle = constant_1.POLAR_END_ANGLE, radius: radius, center: center, innerRadius: innerRadius = 0, line: line = {}, inside: inside = !1, sides: sides} = this.attribute;
        let lineGraphic, arcRadius = radius, arcInnerRadius = innerRadius;
        if (inside && innerRadius > 0 && (arcRadius = innerRadius, arcInnerRadius = 0), 
        (0, vutils_1.isValidNumber)(sides) && sides >= 3) {
            const gridPoints = (0, util_1.getCirclePoints)(center, sides, arcRadius, startAngle, endAngle);
            lineGraphic = vrender_core_1.graphicCreator.path(Object.assign(Object.assign({}, line.style), {
                path: (0, util_1.getPolygonPath)(gridPoints, !0)
            }));
        } else {
            const arcAttrs = Object.assign(Object.assign(Object.assign({}, center), {
                startAngle: startAngle,
                endAngle: endAngle,
                radius: arcRadius,
                innerRadius: arcInnerRadius
            }), line.style);
            lineGraphic = vrender_core_1.graphicCreator.circle(arcAttrs);
        }
        lineGraphic.name = constant_2.AXIS_ELEMENT_NAME.line, lineGraphic.id = this._getNodeId("line"), 
        (0, vutils_1.isEmpty)(line.state) || (lineGraphic.states = (0, vutils_1.merge)({}, constant_2.DEFAULT_STATES, line.state)), 
        container.add(lineGraphic);
    }
    getTitleAttribute() {
        var _a, _b, _c;
        const {center: center, radius: radius, innerRadius: innerRadius = 0} = this.attribute, _d = this.attribute.title, {space: space = 4, textStyle: textStyle = {}, shape: shape, background: background, state: state = {}} = _d, restAttrs = __rest(_d, [ "space", "textStyle", "shape", "background", "state" ]);
        let titlePoint = center, labelHeight = 0;
        (null === (_a = this.attribute.label) || void 0 === _a ? void 0 : _a.visible) && !1 === this.attribute.label.inside && (labelHeight = (0, 
        vutils_1.get)(this.attribute.label, "style.fontSize", 12) + (0, vutils_1.get)(this.attribute.label, "space", 4));
        let tickLength = 0;
        (null === (_b = this.attribute.tick) || void 0 === _b ? void 0 : _b.visible) && !1 === this.attribute.tick.inside && (tickLength = this.attribute.tick.length || 4), 
        (null === (_c = this.attribute.subTick) || void 0 === _c ? void 0 : _c.visible) && !1 === this.attribute.subTick.inside && (tickLength = Math.max(tickLength, this.attribute.subTick.length || 2));
        const offset = radius + tickLength + labelHeight + space;
        let textBaseline = "middle", {position: position} = this.attribute.title;
        (0, vutils_1.isNil)(position) && (position = 0 === innerRadius ? "end" : "middle"), 
        "start" === position ? (textBaseline = "bottom", titlePoint = {
            x: center.x,
            y: center.y - offset
        }) : "end" === position && (textBaseline = "top", titlePoint = {
            x: center.x,
            y: center.y + offset
        });
        const attrs = Object.assign(Object.assign(Object.assign({}, titlePoint), restAttrs), {
            textStyle: Object.assign({
                textBaseline: textBaseline,
                textAlign: "center"
            }, textStyle),
            state: {
                text: (0, vutils_1.merge)({}, constant_2.DEFAULT_STATES, state.text),
                shape: (0, vutils_1.merge)({}, constant_2.DEFAULT_STATES, state.shape),
                panel: (0, vutils_1.merge)({}, constant_2.DEFAULT_STATES, state.background)
            }
        }), {angle: angle} = restAttrs;
        return attrs.angle = angle, shape && shape.visible && (attrs.shape = Object.assign({
            visible: !0
        }, shape.style), shape.space && (attrs.space = shape.space)), background && background.visible && (attrs.panel = Object.assign({
            visible: !0
        }, background.style)), attrs;
    }
    getSubTickLineItems() {
        var _a, _b;
        const {subTick: subTick} = this.attribute, subTickLineItems = [], {count: subCount = 4, inside: inside = !1, length: length = 2} = subTick, tickLineItems = this.tickLineItems, tickLineCount = tickLineItems.length;
        if (tickLineCount >= 2) {
            const tickSegment = this.data[1].value - this.data[0].value, isAlignWithLable = null === (_b = null === (_a = this.attribute) || void 0 === _a ? void 0 : _a.tick) || void 0 === _b ? void 0 : _b.alignWithLabel;
            for (let i = 0; i < tickLineCount; i++) {
                const pre = tickLineItems[i], next = tickLineItems[i + 1];
                for (let j = 0; j < subCount; j++) {
                    const percent = (j + 1) / (subCount + 1), value = (1 - percent) * pre.value + percent * (next ? next.value : isAlignWithLable ? 1 : pre.value + tickSegment), point = this.getTickCoord(value), endPoint = this.getVerticalCoord(point, length, inside);
                    subTickLineItems.push({
                        start: point,
                        end: endPoint,
                        value: value
                    });
                }
            }
        }
        return subTickLineItems;
    }
    beforeLabelsOverlap(labelShapes, labelData, labelContainer, layer, layerCount) {}
    handleLabelsOverlap(labelShapes, labelData, labelContainer, layer, layerCount) {
        if ((0, vutils_1.isEmpty)(labelShapes)) return;
        const {inside: inside, radius: radius, center: center, size: size, label: label, orient: orient} = this.attribute, bounds = size ? {
            x1: 0,
            y1: 0,
            x2: size.width,
            y2: size.height
        } : {
            x1: center.x - radius,
            y1: center.y - radius,
            x2: center.x + radius,
            y2: center.y + radius
        }, {layoutFunc: layoutFunc, autoLimit: autoLimit, limitEllipsis: limitEllipsis, autoHide: autoHide, autoHideMethod: autoHideMethod, autoHideSeparation: autoHideSeparation, autoWrap: autoWrap} = label;
        (0, vutils_1.isFunction)(layoutFunc) ? layoutFunc(labelShapes, labelData, layer, this) : ((autoLimit || autoWrap) && (0, 
        circle_auto_limit_1.circleAutoLimit)(labelShapes, {
            inside: inside,
            autoWrap: autoWrap,
            bounds: bounds,
            ellipsis: limitEllipsis,
            center: center
        }), autoHide && (0, auto_hide_1.autoHide)(labelShapes, {
            orient: orient,
            method: autoHideMethod,
            separation: autoHideSeparation
        }));
    }
    afterLabelsOverlap(labelShapes, labelData, labelContainer, layer, layerCount) {}
    getTextBaseline(vector) {
        return Math.abs(vector[1] / vector[0]) < .3 ? "middle" : vector[1] < 0 ? "bottom" : vector[1] > 0 ? "top" : "middle";
    }
    getLabelAlign(vector, inside, angle) {
        return (0, vutils_1.isNumberClose)(vector[0], 0) ? {
            textAlign: "center",
            textBaseline: vector[1] > 0 ? "top" : "bottom"
        } : vector[0] < 0 ? {
            textAlign: "right",
            textBaseline: this.getTextBaseline(vector)
        } : vector[0] > 0 ? {
            textAlign: "left",
            textBaseline: this.getTextBaseline(vector)
        } : {
            textAlign: "center",
            textBaseline: "middle"
        };
    }
    getLabelPosition(point, vector, text, style) {
        return point;
    }
}

exports.CircleAxis = CircleAxis, CircleAxis.defaultAttributes = config_1.DEFAULT_AXIS_THEME, 
(0, vutils_1.mixin)(CircleAxis, circle_1.CircleAxisMixin);
//# sourceMappingURL=circle.js.map