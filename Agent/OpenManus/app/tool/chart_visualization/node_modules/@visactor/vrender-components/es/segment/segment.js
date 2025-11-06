import { array, flattenArray, isArray, isEmpty, isValidNumber, merge } from "@visactor/vutils";

import { graphicCreator } from "@visactor/vrender-core";

import { AbstractComponent } from "../core/base";

import { loadSegmentComponent } from "./register";

import { normalizeAngle } from "@visactor/vutils";

loadSegmentComponent();

export class Segment extends AbstractComponent {
    getStartAngle() {
        return normalizeAngle(this._startAngle);
    }
    getEndAngle() {
        return normalizeAngle(this._endAngle);
    }
    getMainSegmentPoints() {
        return this._mainSegmentPoints;
    }
    constructor(attributes, options) {
        super((null == options ? void 0 : options.skipDefault) ? attributes : merge({}, Segment.defaultAttributes, attributes)), 
        this.name = "segment", this.key = "segment", this.lines = [];
    }
    render() {
        this.removeAllChild(!0), this._reset();
        const {startSymbol: startSymbol, endSymbol: endSymbol, lineStyle: lineStyle, state: state, visible: visible = !0, multiSegment: multiSegment, mainSegmentIndex: mainSegmentIndex} = this.attribute;
        if (!visible) return;
        this._computeLineAngle();
        const points = this._getMainSegmentPoints(), startSymbolShape = this._renderSymbol(startSymbol, points, "start"), endSymbolShape = this._renderSymbol(endSymbol, points, "end");
        if (this.startSymbol = startSymbolShape, this.endSymbol = endSymbolShape, multiSegment) {
            const points = [ ...this.attribute.points ];
            if (isValidNumber(mainSegmentIndex)) points[mainSegmentIndex] = this._clipPoints(points[mainSegmentIndex]); else {
                const clipPoints = this._clipPoints(flattenArray(points));
                points[0][0] = clipPoints[0], points[points.length - 1][points[points.length - 1].length - 1] = clipPoints[clipPoints.length - 1];
            }
            points.forEach(((point, index) => {
                var _a, _b;
                const line = graphicCreator.line(Object.assign(Object.assign({
                    points: point
                }, isArray(lineStyle) ? null !== (_a = lineStyle[index]) && void 0 !== _a ? _a : lineStyle[lineStyle.length - 1] : lineStyle), {
                    fill: !1
                }));
                line.name = `${this.name}-line`, line.id = this._getNodeId("line" + index), isEmpty(null == state ? void 0 : state.line) || (line.states = isArray(state.line) ? null !== (_b = state.line[index]) && void 0 !== _b ? _b : state.line[state.line.length - 1] : state.line), 
                this.add(line), this.lines.push(line);
            }));
        } else {
            let lineCreator = graphicCreator.line;
            array(lineStyle)[0].cornerRadius && (lineCreator = graphicCreator.polygon);
            const line = lineCreator(Object.assign(Object.assign({
                points: this._clipPoints(this.attribute.points)
            }, array(lineStyle)[0]), {
                fill: !1,
                closePath: !1
            }));
            line.name = `${this.name}-line`, line.id = this._getNodeId("line"), isEmpty(null == state ? void 0 : state.line) || (line.states = [].concat(state.line)[0]), 
            this.add(line), this.lines.push(line);
        }
    }
    _computeStartRotate(angle) {
        return angle + Math.PI / 2;
    }
    _computeEndRotate(angle) {
        return angle + Math.PI / 2;
    }
    _renderSymbol(attribute, points, dim) {
        if (!points.length) return;
        const {autoRotate: autoRotate = !0} = attribute;
        let symbol;
        if (attribute && attribute.visible) {
            const startAngle = this.getStartAngle(), endAngle = this.getEndAngle(), {state: state} = this.attribute, start = points[0], end = points[points.length - 1], {refX: refX = 0, refY: refY = 0, refAngle: refAngle = 0, style: style, symbolType: symbolType, size: size = 12} = attribute;
            let position, rotate;
            "start" === dim ? (position = {
                x: start.x + (isValidNumber(startAngle) ? refX * Math.cos(startAngle) + refY * Math.cos(startAngle - Math.PI / 2) : 0),
                y: start.y + (isValidNumber(startAngle) ? refX * Math.sin(startAngle) + refY * Math.sin(startAngle - Math.PI / 2) : 0)
            }, rotate = this._computeStartRotate(this._startAngle)) : (position = {
                x: end.x + (isValidNumber(endAngle) ? refX * Math.cos(endAngle) + refY * Math.cos(endAngle - Math.PI / 2) : 0),
                y: end.y + (isValidNumber(endAngle) ? refX * Math.sin(endAngle) + refY * Math.sin(endAngle - Math.PI / 2) : 0)
            }, rotate = this._computeEndRotate(this._endAngle)), symbol = graphicCreator.symbol(Object.assign(Object.assign(Object.assign({}, position), {
                symbolType: symbolType,
                size: size,
                angle: autoRotate ? rotate + refAngle : 0,
                strokeBoundsBuffer: 0
            }), style)), symbol.name = `${this.name}-${dim}-symbol`, symbol.id = this._getNodeId(`${dim}-symbol`), 
            isEmpty(null == state ? void 0 : state.symbol) || (symbol.states = state.symbol), 
            "start" === dim ? isEmpty(null == state ? void 0 : state.startSymbol) || (symbol.states = state.startSymbol) : isEmpty(null == state ? void 0 : state.endSymbol) || (symbol.states = state.endSymbol), 
            this.add(symbol);
        }
        return symbol;
    }
    _getMainSegmentPoints() {
        if (this._mainSegmentPoints) return this._mainSegmentPoints;
        const {points: originPoints, multiSegment: multiSegment, mainSegmentIndex: mainSegmentIndex} = this.attribute;
        let points;
        return points = multiSegment ? isValidNumber(mainSegmentIndex) ? originPoints[mainSegmentIndex] : flattenArray(originPoints) : originPoints, 
        this._mainSegmentPoints = points, points;
    }
    _clipPoints(points) {
        const {startSymbol: startSymbol = {}, endSymbol: endSymbol = {}} = this.attribute;
        let pointsAfterClip = points;
        if (startSymbol.visible) {
            const startSize = startSymbol.clip ? startSymbol.size || 10 : 0;
            pointsAfterClip = [ {
                x: points[0].x - startSize / 2 * (Math.cos(this._startAngle) || 0),
                y: points[0].y - startSize / 2 * (Math.sin(this._startAngle) || 0)
            }, ...pointsAfterClip.slice(1) ];
        }
        if (endSymbol.visible) {
            const endSize = endSymbol.clip ? endSymbol.size || 10 : 0, pointsEnd = {
                x: points[points.length - 1].x - endSize / 2 * (Math.cos(this._endAngle) || 0),
                y: points[points.length - 1].y - endSize / 2 * (Math.sin(this._endAngle) || 0)
            };
            pointsAfterClip = [ ...pointsAfterClip.slice(0, pointsAfterClip.length - 1), pointsEnd ];
        }
        return pointsAfterClip;
    }
    _computeLineAngle() {
        const points = this._getMainSegmentPoints();
        if (points.length <= 1) return;
        const start = points[0], startInside = points[1], endInside = points[points.length - 2], end = points[points.length - 1], startVector = [ start.x - startInside.x, start.y - startInside.y ], startAngle = Math.atan2(startVector[1], startVector[0]), endVector = [ end.x - endInside.x, end.y - endInside.y ], endAngle = Math.atan2(endVector[1], endVector[0]);
        this._startAngle = startAngle, this._endAngle = endAngle;
    }
    _reset() {
        this.startSymbol = null, this.endSymbol = null, this._startAngle = null, this._endAngle = null, 
        this._mainSegmentPoints = null;
    }
}

Segment.defaultAttributes = {
    visible: !0,
    lineStyle: {
        lineWidth: 1,
        stroke: "#000"
    },
    startSymbol: {
        visible: !1,
        autoRotate: !0,
        symbolType: "triangle",
        size: 12,
        refX: 0,
        refY: 0,
        refAngle: 0,
        style: {
            fill: "#000",
            zIndex: 1
        }
    },
    endSymbol: {
        visible: !1,
        autoRotate: !0,
        symbolType: "triangle",
        size: 12,
        refX: 0,
        refY: 0,
        refAngle: 0,
        style: {
            fill: "#000",
            zIndex: 1
        }
    }
};
//# sourceMappingURL=segment.js.map
