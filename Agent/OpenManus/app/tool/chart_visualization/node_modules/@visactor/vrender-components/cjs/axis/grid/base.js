"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.BaseGrid = void 0;

const vutils_1 = require("@visactor/vutils"), vrender_core_1 = require("@visactor/vrender-core"), base_1 = require("../../core/base"), constant_1 = require("../constant"), util_1 = require("../util");

function getArcPath(center, points, reverse, closed) {
    let path = "";
    if (!center || 0 === points.length) return path;
    const firstPoint = points[0], radius = vutils_1.PointService.distancePP(center, firstPoint), sweepFlag = reverse ? 0 : 1;
    return closed ? path += `M${center.x},${center.y - radius}A${radius},${radius},0,0,${sweepFlag},${center.x},${center.y + radius}A${radius},${radius},0,0,${sweepFlag},${center.x},${center.y - radius}Z` : points.forEach(((point, index) => {
        0 === index ? path = `M${point.x},${point.y}` : path += `A${radius},${radius},0,0,${sweepFlag},${point.x},${point.y}`;
    })), path;
}

function getRegionPath(from, to, attribute) {
    const {type: type, closed: closed} = attribute, reversePoints = to.slice(0).reverse();
    let regionPath = "", nextPath = "";
    if ("line" === type && attribute.smoothLink && attribute.center) {
        const fromStart = from[0], toEnd = reversePoints[0], center = attribute.center;
        regionPath = (0, util_1.getPolygonPath)(from, !!closed), nextPath = (0, util_1.getPolygonPath)(reversePoints, !!closed);
        const toEndRadius = vutils_1.PointService.distancePP(toEnd, center), fromStartRadius = vutils_1.PointService.distancePP(fromStart, center);
        regionPath += `A${toEndRadius},${toEndRadius},0,0,1,${toEnd.x},${toEnd.y}L${toEnd.x},${toEnd.y}`, 
        nextPath += `A${fromStartRadius},${fromStartRadius},0,0,0,${fromStart.x},${fromStart.y}`;
    } else if ("circle" === type) {
        const {center: center} = attribute;
        regionPath = getArcPath(center, from, !1, !!closed), nextPath = getArcPath(center, reversePoints, !0, !!closed);
    } else "line" !== type && "polygon" !== type || (regionPath = (0, util_1.getPolygonPath)(from, !!closed), 
    nextPath = (0, util_1.getPolygonPath)(reversePoints, !!closed));
    return closed ? regionPath += nextPath : (nextPath = "L" + nextPath.substring(1), 
    regionPath += nextPath, regionPath += "Z"), regionPath;
}

class BaseGrid extends base_1.AbstractComponent {
    constructor() {
        super(...arguments), this.name = "axis-grid", this.data = [];
    }
    getInnerView() {
        return this._innerView;
    }
    getPrevInnerView() {
        return this._prevInnerView;
    }
    render() {
        this._prevInnerView = this._innerView && (0, util_1.getElMap)(this._innerView), 
        this.removeAllChild(!0), this._innerView = vrender_core_1.graphicCreator.group({
            x: 0,
            y: 0,
            pickable: !1
        }), this.add(this._innerView);
        const {items: items, visible: visible} = this.attribute;
        items && items.length && !1 !== visible && (this.data = this._transformItems(items), 
        this._renderGrid(this._innerView));
    }
    getVerticalCoord(point, offset, inside) {
        return (0, util_1.getVerticalCoord)(point, this.getVerticalVector(offset, inside, point));
    }
    _transformItems(items) {
        const data = [];
        return items.forEach((item => {
            var _a;
            data.push(Object.assign(Object.assign({}, item), {
                point: this.getTickCoord(item.value),
                id: null !== (_a = item.id) && void 0 !== _a ? _a : item.label
            }));
        })), data;
    }
    _renderGrid(container) {
        const {visible: visible} = this.attribute.subGrid || {};
        visible && this._renderGridByType(!0, container), this._renderGridByType(!1, container);
    }
    _renderGridByType(isSubGrid, container) {
        const gridAttrs = (0, vutils_1.merge)({}, this.attribute, this.getGridAttribute(isSubGrid)), {type: type, items: items, style: style, closed: closed, alternateColor: alternateColor, depth: depth = 0} = gridAttrs, name = isSubGrid ? `${constant_1.AXIS_ELEMENT_NAME.grid}-sub` : `${constant_1.AXIS_ELEMENT_NAME.grid}`;
        if (items.forEach(((item, index) => {
            const {id: id, points: points} = item;
            let path = "";
            if ("line" === type || "polygon" === type) path = (0, util_1.getPolygonPath)(points, !!closed); else if ("circle" === type) {
                const {center: center} = this.attribute;
                path = getArcPath(center, points, !1, !!closed);
            }
            const shape = vrender_core_1.graphicCreator.path(Object.assign({
                path: path,
                z: depth
            }, (0, vutils_1.isFunction)(style) ? (0, vutils_1.merge)({}, this.skipDefault ? null : BaseGrid.defaultAttributes.style, style(item, index)) : style));
            shape.name = `${name}-line`, shape.id = this._getNodeId(`${name}-path-${id}`), container.add(shape);
        })), depth && "line" === type && items.forEach(((item, index) => {
            const {id: id, points: points} = item, nextPoints = [];
            nextPoints.push(points[0]);
            const dir_x = points[1].x - points[0].x, dir_y = points[1].y - points[0].y, dirLen = Math.sqrt(dir_x * dir_x + dir_y * dir_y), ratio = depth / dirLen;
            nextPoints.push({
                x: points[0].x + dir_x * ratio,
                y: points[0].y + dir_y * ratio
            });
            const path = (0, util_1.getPolygonPath)(nextPoints, !!closed), deltaX = (0, vutils_1.abs)(nextPoints[0].x - nextPoints[1].x), deltaY = (0, 
            vutils_1.abs)(nextPoints[0].y - nextPoints[1].y), shape = vrender_core_1.graphicCreator.path(Object.assign({
                path: path,
                z: 0,
                alpha: deltaX > deltaY ? (points[1].x - points[0].x > 0 ? -1 : 1) * vutils_1.pi / 2 : 0,
                beta: deltaX < deltaY ? -vutils_1.pi / 2 : 0,
                anchor3d: deltaX > deltaY ? [ nextPoints[0].x, 0 ] : [ 0, nextPoints[0].y ]
            }, (0, vutils_1.isFunction)(style) ? (0, vutils_1.merge)({}, this.skipDefault ? null : BaseGrid.defaultAttributes.style, style(item, index)) : style));
            shape.name = `${name}-line`, shape.id = this._getNodeId(`${name}-path-${id}`), container.add(shape);
        })), items.length > 1 && alternateColor) {
            const colors = (0, vutils_1.isArray)(alternateColor) ? alternateColor : [ alternateColor, "transparent" ], getColor = index => colors[index % colors.length], originalItems = this.attribute.items, firstItem = originalItems[0], lastItem = originalItems[originalItems.length - 1], noZero = !(0, 
            vutils_1.isNumberClose)(firstItem.value, 0) && !(0, vutils_1.isNumberClose)(lastItem.value, 0), noOne = !(0, 
            vutils_1.isNumberClose)(firstItem.value, 1) && !(0, vutils_1.isNumberClose)(lastItem.value, 1), allPoints = [], isDesc = firstItem.value > lastItem.value;
            (isDesc && noOne || !isDesc && noZero) && allPoints.push(this.getGridPointsByValue(isDesc ? 1 : 0)), 
            items.forEach((item => {
                allPoints.push(item.points);
            })), (isDesc && noZero || !isDesc && noOne) && allPoints.push(this.getGridPointsByValue(isDesc ? 0 : 1));
            for (let index = 0; index < allPoints.length - 1; index++) {
                const path = getRegionPath(allPoints[index], allPoints[index + 1], gridAttrs), shape = vrender_core_1.graphicCreator.path({
                    path: path,
                    fill: getColor(index)
                });
                shape.name = `${name}-region`, shape.id = this._getNodeId(`${name}-region-${index}`), 
                container.add(shape);
            }
        }
    }
    _getNodeId(id) {
        return `${this.id}-${id}`;
    }
    _parseTickSegment() {
        let tickSegment = 1;
        return this.data.length >= 2 && (tickSegment = this.data[1].value - this.data[0].value), 
        tickSegment;
    }
    _getPointsOfSubGrid(tickSegment, alignWithLabel) {
        const tickLineCount = this.data.length, points = [];
        return tickLineCount >= 2 && this.data.forEach((item => {
            let tickValue = item.value;
            if (!alignWithLabel) {
                const value = item.value - tickSegment / 2;
                if (this.isInValidValue(value)) return;
                tickValue = value;
            }
            points.push({
                value: tickValue
            });
        })), points;
    }
    release() {
        super.release(), this._prevInnerView = null, this._innerView = null;
    }
}

exports.BaseGrid = BaseGrid, BaseGrid.defaultAttributes = {
    style: {
        lineWidth: 1,
        stroke: "#999",
        strokeOpacity: 1,
        lineDash: [ 4, 4 ]
    },
    subGrid: {
        visible: !1,
        style: {
            lineWidth: 1,
            stroke: "#999",
            strokeOpacity: 1,
            lineDash: [ 4, 4 ]
        }
    }
};
//# sourceMappingURL=base.js.map
