import { graphicCreator } from "@visactor/vrender-core";

import { isValidNumber, merge } from "@visactor/vutils";

import { ArcSegment, Segment } from "../segment";

import { Tag } from "../tag";

import { Marker } from "./base";

import { DEFAULT_MARK_POINT_TEXT_STYLE_MAP, DEFAULT_MARK_POINT_THEME, FUZZY_EQUAL_DELTA } from "./config";

import { IMarkPointItemPosition } from "./type";

import { loadMarkPointComponent } from "./register";

import { computeOffsetForlimit } from "../util/limit-shape";

import { DEFAULT_STATES } from "../constant";

import { DefaultExitMarkerAnimation, DefaultUpdateMarkPointAnimation, markPointAnimate } from "./animate/animate";

import { deltaXYToAngle, fuzzyEqualNumber, getTextAlignAttrOfVerticalDir, isPostiveXAxis, removeRepeatPoint } from "../util";

loadMarkPointComponent();

export function registerMarkPointAnimate() {
    MarkPoint._animate = markPointAnimate;
}

export class MarkPoint extends Marker {
    markerAnimate(state) {
        MarkPoint._animate && this._animationConfig && MarkPoint._animate([ this._line, this._decorativeLine ], this._item, this._animationConfig, state);
    }
    constructor(attributes, options) {
        super((null == options ? void 0 : options.skipDefault) ? attributes : merge({}, MarkPoint.defaultAttributes, attributes)), 
        this.name = "markPoint", this.defaultUpdateAnimation = DefaultUpdateMarkPointAnimation, 
        this.defaultExitAnimation = DefaultExitMarkerAnimation, this._isArcLine = !1, this._isStraightLine = !1;
    }
    setLabelPos() {}
    getTextAlignAttr(autoRotate, offsetX, offsetY, lineEndAngle, itemPosition) {
        return fuzzyEqualNumber(Math.abs(lineEndAngle), Math.PI / 2, FUZZY_EQUAL_DELTA) || fuzzyEqualNumber(Math.abs(lineEndAngle), 3 * Math.PI / 2, FUZZY_EQUAL_DELTA) ? getTextAlignAttrOfVerticalDir(autoRotate, lineEndAngle, itemPosition) : isPostiveXAxis(lineEndAngle) ? DEFAULT_MARK_POINT_TEXT_STYLE_MAP.postiveXAxis[itemPosition] : DEFAULT_MARK_POINT_TEXT_STYLE_MAP.negativeXAxis[itemPosition];
    }
    setItemAttributes(item, itemContent, newPosition, newItemPosition, itemType) {
        var _a, _b;
        if (!item) return;
        const {autoRotate: autoRotate = !0, refX: refX = 0, refY: refY = 0, refAngle: refAngle = 0, textStyle: textStyle = {}, richTextStyle: richTextStyle = {}, imageStyle: imageStyle = {}, position: positionType = IMarkPointItemPosition.middle} = itemContent, {state: state} = this.attribute, lineEndAngle = (null === (_a = this._line) || void 0 === _a ? void 0 : _a.getEndAngle()) || 0, itemRefOffsetX = refX * Math.cos(lineEndAngle) + refY * Math.cos(lineEndAngle - Math.PI / 2), itemRefOffsetY = refX * Math.sin(lineEndAngle) + refY * Math.sin(lineEndAngle - Math.PI / 2);
        if ("text" === itemType) {
            const offsetX = newItemPosition.x - newPosition.x, offsetY = newItemPosition.y - newPosition.y;
            item.setAttributes(Object.assign(Object.assign({}, textStyle), {
                textStyle: Object.assign(Object.assign({}, this.getTextAlignAttr(autoRotate, offsetX, offsetY, lineEndAngle, null !== (_b = itemContent.position) && void 0 !== _b ? _b : "end")), textStyle.textStyle),
                state: {
                    panel: merge({}, DEFAULT_STATES, null == state ? void 0 : state.textBackground),
                    text: merge({}, DEFAULT_STATES, null == state ? void 0 : state.text)
                }
            }));
        } else "richText" === itemType ? (item.setAttributes({
            dx: this.getItemDx(item, positionType, richTextStyle) + (richTextStyle.dx || 0),
            dy: this.getItemDy(item, positionType, richTextStyle) + (richTextStyle.dy || 0)
        }), item.states = merge({}, DEFAULT_STATES, null == state ? void 0 : state.richText)) : "image" === itemType && (item.setAttributes({
            dx: this.getItemDx(item, positionType, imageStyle) + (imageStyle.dx || 0),
            dy: this.getItemDy(item, positionType, imageStyle) + (imageStyle.dy || 0)
        }), item.states = merge({}, DEFAULT_STATES, null == state ? void 0 : state.image));
        const itemAngle = isPostiveXAxis(lineEndAngle) ? lineEndAngle : lineEndAngle - Math.PI;
        item.setAttributes({
            x: newItemPosition.x + (itemRefOffsetX || 0),
            y: newItemPosition.y + (itemRefOffsetY || 0),
            angle: autoRotate && itemAngle + refAngle
        });
    }
    getItemDx(item, position, style) {
        var _a, _b;
        const width = null !== (_b = null === (_a = null == item ? void 0 : item.AABBBounds) || void 0 === _a ? void 0 : _a.width()) && void 0 !== _b ? _b : (null == style ? void 0 : style.width) || 0;
        return position.includes("inside") ? -width : 0;
    }
    getItemDy(item, position, style) {
        var _a, _b;
        const height = null !== (_b = null === (_a = null == item ? void 0 : item.AABBBounds) || void 0 === _a ? void 0 : _a.height()) && void 0 !== _b ? _b : (null == style ? void 0 : style.height) || 0;
        return position.includes("top") || position.includes("Top") ? -height : position.includes("middle") || position.includes("Middle") ? -height / 2 : 0;
    }
    initItem(itemContent, newPosition, newItemPosition) {
        const {state: state} = this.attribute, {type: type = "text", symbolStyle: symbolStyle, richTextStyle: richTextStyle, imageStyle: imageStyle, renderCustomCallback: renderCustomCallback} = itemContent;
        let item;
        return "symbol" === type ? (item = graphicCreator.symbol(Object.assign(Object.assign({}, newItemPosition), symbolStyle)), 
        item.states = merge({}, DEFAULT_STATES, null == state ? void 0 : state.symbol)) : "text" === type ? item = new Tag(Object.assign(Object.assign({}, newItemPosition), {
            state: {
                panel: merge({}, DEFAULT_STATES, null == state ? void 0 : state.textBackground),
                text: merge({}, DEFAULT_STATES, null == state ? void 0 : state.text)
            }
        })) : "richText" === type ? (item = graphicCreator.richtext(Object.assign(Object.assign({}, newItemPosition), richTextStyle)), 
        item.states = merge({}, DEFAULT_STATES, null == state ? void 0 : state.richText)) : "image" === type ? (item = graphicCreator.image(Object.assign(Object.assign({}, newItemPosition), imageStyle)), 
        item.states = merge({}, DEFAULT_STATES, null == state ? void 0 : state.image)) : "custom" === type && renderCustomCallback && (item = renderCustomCallback(), 
        item.states = merge({}, DEFAULT_STATES, null == state ? void 0 : state.customMark)), 
        item.name = `mark-point-${type}`, this.setItemAttributes(item, itemContent, newPosition, newItemPosition, type), 
        item;
    }
    getItemLineAttr(itemLine, newPosition, newItemPosition) {
        let points = [], center = {
            x: 0,
            y: 0
        }, radius = 0, startAngle = 0, endAngle = 0;
        const {type: type = "type-s", arcRatio: arcRatio = .8} = itemLine, itemOffsetX = newItemPosition.x - newPosition.x, itemOffsetY = newItemPosition.y - newPosition.y;
        if (this._isStraightLine = fuzzyEqualNumber(itemOffsetX, 0, FUZZY_EQUAL_DELTA) || fuzzyEqualNumber(itemOffsetY, 0, FUZZY_EQUAL_DELTA), 
        this._isArcLine) {
            const {x: x1, y: y1} = this.attribute.position, {x: x2, y: y2} = newItemPosition, x0 = (x1 + x2) / 2, y0 = (y1 + y2) / 2, k = y1 === y2 ? 0 : -(x1 - x2) / (y1 - y2), centerX = x0 + arcRatio * (y2 > y1 ? -1 : 1) * x0, centerY = (x => k * (x - x0) + y0)(centerX);
            startAngle = deltaXYToAngle(y1 - centerY, x1 - centerX), endAngle = deltaXYToAngle(y2 - centerY, x2 - centerX), 
            center = {
                x: centerX,
                y: centerY
            };
            const R = Math.sqrt((centerX - x1) * (centerX - x1) + (centerY - y1) * (centerY - y1)), r = this.attribute.targetSymbol.style.size / 2;
            startAngle += 2 * Math.acos(Math.sqrt(1 - r * r / (4 * R * R))), arcRatio > 0 ? endAngle < startAngle && (endAngle += 2 * Math.PI) : startAngle < endAngle && (startAngle += 2 * Math.PI), 
            radius = Math.sqrt((centerX - x1) * (centerX - x1) + (centerY - y1) * (centerY - y1));
        } else points = "type-do" !== type || this._isStraightLine ? "type-po" !== type || this._isStraightLine ? "type-op" !== type || this._isStraightLine ? [ newPosition, newItemPosition ] : [ newPosition, {
            x: newPosition.x,
            y: newItemPosition.y
        }, newItemPosition ] : [ newPosition, {
            x: newItemPosition.x,
            y: newPosition.y
        }, newItemPosition ] : [ newPosition, {
            x: (newPosition.x + newItemPosition.x) / 2,
            y: newItemPosition.y
        }, newItemPosition ];
        return points = removeRepeatPoint(points), {
            points: points,
            center: center,
            radius: radius,
            startAngle: startAngle,
            endAngle: endAngle
        };
    }
    reDrawLine(itemLine, pointsAttr) {
        this._line.release();
        const {startSymbol: startSymbol, endSymbol: endSymbol, lineStyle: lineStyle, type: type = "type-s"} = itemLine, {state: state} = this.attribute, lineConstructor = this._isArcLine ? ArcSegment : Segment;
        this._container.removeChild(this._line), this._line = new lineConstructor(Object.assign(Object.assign({}, pointsAttr), {
            pickable: !1,
            startSymbol: startSymbol,
            endSymbol: endSymbol,
            lineStyle: lineStyle,
            visible: itemLine.visible,
            state: {
                line: merge({}, DEFAULT_STATES, null == state ? void 0 : state.line),
                startSymbol: merge({}, DEFAULT_STATES, null == state ? void 0 : state.lineStartSymbol),
                endSymbol: merge({}, DEFAULT_STATES, null == state ? void 0 : state.lineEndSymbol)
            }
        })), this._container.add(this._line);
    }
    setItemLineAttr(itemLine, newPosition, newItemPosition) {
        if (this._line) {
            const {startSymbol: startSymbol, endSymbol: endSymbol, lineStyle: lineStyle, type: type = "type-s"} = itemLine, {state: state} = this.attribute, pointsAttr = this.getItemLineAttr(itemLine, newPosition, newItemPosition);
            this._isArcLine && "arc-segment" === this._line.key || !this._isArcLine && "segment" === this._line.key ? this._line.setAttributes(Object.assign(Object.assign({}, pointsAttr), {
                startSymbol: startSymbol,
                endSymbol: endSymbol,
                lineStyle: lineStyle,
                visible: itemLine.visible,
                state: {
                    line: merge({}, DEFAULT_STATES, null == state ? void 0 : state.line),
                    startSymbol: merge({}, DEFAULT_STATES, null == state ? void 0 : state.lineStartSymbol),
                    endSymbol: merge({}, DEFAULT_STATES, null == state ? void 0 : state.lineEndSymbol)
                }
            })) : this.reDrawLine(itemLine, pointsAttr);
        }
    }
    getDecorativeLineAttr(itemLine) {
        var _a;
        const decorativeLength = (null === (_a = null == itemLine ? void 0 : itemLine.decorativeLine) || void 0 === _a ? void 0 : _a.length) || 10, itemAngle = this._line.getEndAngle() || 0;
        return {
            startPointOffsetX: decorativeLength / 2 * Math.cos(itemAngle - Math.PI / 2),
            startPointOffsetY: decorativeLength / 2 * Math.sin(itemAngle - Math.PI / 2),
            endPointOffsetX: -decorativeLength / 2 * Math.cos(itemAngle - Math.PI / 2),
            endPointOffsetY: -decorativeLength / 2 * Math.sin(itemAngle - Math.PI / 2)
        };
    }
    setDecorativeLineAttr(itemLine, newItemPosition, visible) {
        var _a;
        if (this._decorativeLine) {
            const {lineStyle: lineStyle} = itemLine, {startPointOffsetX: startPointOffsetX, startPointOffsetY: startPointOffsetY, endPointOffsetX: endPointOffsetX, endPointOffsetY: endPointOffsetY} = this.getDecorativeLineAttr(itemLine);
            this._decorativeLine.setAttributes(Object.assign(Object.assign({
                points: [ {
                    x: newItemPosition.x + startPointOffsetX,
                    y: newItemPosition.y + startPointOffsetY
                }, {
                    x: newItemPosition.x + endPointOffsetX,
                    y: newItemPosition.y + endPointOffsetY
                } ]
            }, lineStyle), {
                visible: visible
            })), this._decorativeLine.states = merge({}, DEFAULT_STATES, null === (_a = this.attribute.state) || void 0 === _a ? void 0 : _a.line);
        }
    }
    setTargetItemAttributes(targetItem, position) {
        var _a, _b;
        this._targetItem && (this._targetItem.setAttributes(Object.assign({
            x: position.x,
            y: position.y,
            visible: null !== (_a = targetItem.visible) && void 0 !== _a && _a,
            size: targetItem.size
        }, targetItem.style)), this._targetItem.states = merge({}, DEFAULT_STATES, null === (_b = this.attribute.state) || void 0 === _b ? void 0 : _b.targetItem));
    }
    setAllOfItemsAttr(newPosition, newItemPosition) {
        var _a;
        const {position: position, itemLine: itemLine = {}, itemContent: itemContent = {}, limitRect: limitRect, targetSymbol: targetSymbol} = this.attribute, {type: type = "text", confine: confine} = itemContent;
        if (limitRect && confine) {
            const {x: x, y: y, width: width, height: height} = limitRect, {dx: dx, dy: dy} = computeOffsetForlimit(this._item, {
                x1: x,
                y1: y,
                x2: x + width,
                y2: y + height
            });
            newItemPosition.x = newItemPosition.x + dx, newItemPosition.y = newItemPosition.y + dy;
        }
        this.setTargetItemAttributes(targetSymbol, position), this.setItemLineAttr(itemLine, newPosition, newItemPosition), 
        this.setItemAttributes(this._item, itemContent, newPosition, newItemPosition, type), 
        this.setDecorativeLineAttr(itemLine, newItemPosition, null === (_a = itemLine.decorativeLine) || void 0 === _a ? void 0 : _a.visible);
    }
    computeNewPositionAfterTargetItem(position) {
        var _a, _b;
        const {itemContent: itemContent = {}, targetSymbol: targetSymbol, itemLine: itemLine} = this.attribute, {offsetX: itemContentOffsetX = 0, offsetY: itemContentOffsetY = 0} = itemContent, {offset: targetSymbolOffset = 0, style: targetSymbolStyle, visible: targetItemvisible = !1, size: targetSymbolSize} = targetSymbol, targetSize = targetItemvisible ? null !== (_b = null !== (_a = targetSymbolStyle.size) && void 0 !== _a ? _a : targetSymbolSize) && void 0 !== _b ? _b : 20 : 0;
        let targetOffsetAngle;
        targetOffsetAngle = "type-do" === itemLine.type ? deltaXYToAngle(itemContentOffsetY, itemContentOffsetX / 2) : "type-po" === itemLine.type ? deltaXYToAngle(0, itemContentOffsetX) : "type-op" === itemLine.type ? deltaXYToAngle(itemContentOffsetY, 0) : deltaXYToAngle(itemContentOffsetY, itemContentOffsetX);
        return {
            newPosition: {
                x: position.x + (targetSize / 2 + targetSymbolOffset) * Math.cos(targetOffsetAngle),
                y: position.y + (targetSize / 2 + targetSymbolOffset) * Math.sin(targetOffsetAngle)
            },
            newItemPosition: {
                x: position.x + (targetSize / 2 + targetSymbolOffset) * Math.cos(targetOffsetAngle) + itemContentOffsetX,
                y: position.y + (targetSize / 2 + targetSymbolOffset) * Math.sin(targetOffsetAngle) + itemContentOffsetY
            }
        };
    }
    initMarker(container) {
        const {position: position, itemContent: itemContent = {}, itemLine: itemLine} = this.attribute, {type: itemLineType = "type-s", arcRatio: arcRatio = .8} = itemLine, {offsetX: offsetX = 0, offsetY: offsetY = 0} = itemContent;
        this._isStraightLine = fuzzyEqualNumber(offsetX, 0, FUZZY_EQUAL_DELTA) || fuzzyEqualNumber(offsetY, 0, FUZZY_EQUAL_DELTA), 
        this._isArcLine = "type-arc" === itemLineType && 0 !== arcRatio && !this._isStraightLine;
        const {newPosition: newPosition, newItemPosition: newItemPosition} = this.computeNewPositionAfterTargetItem(position), line = new (this._isArcLine ? ArcSegment : Segment)({
            points: [],
            pickable: !1,
            center: {
                x: 0,
                y: 0
            },
            radius: 0,
            startAngle: 0,
            endAngle: 0
        });
        line.name = "mark-point-line", this._line = line, container.add(line);
        const decorativeLine = graphicCreator.line({
            points: []
        });
        decorativeLine.name = "mark-point-decorativeLine", this._decorativeLine = decorativeLine, 
        container.add(decorativeLine);
        const targetItem = graphicCreator.symbol({});
        targetItem.name = "mark-point-targetItem", this._targetItem = targetItem, container.add(this._targetItem);
        const item = this.initItem(itemContent, newPosition, newItemPosition);
        this._item = item, container.add(item), this.setAllOfItemsAttr(newPosition, newItemPosition);
    }
    updateMarker() {
        const {position: position, itemContent: itemContent = {}, itemLine: itemLine} = this.attribute, {type: type = "text"} = itemContent, {type: itemLineType = "type-s", arcRatio: arcRatio = .8} = itemLine, {offsetX: offsetX = 0, offsetY: offsetY = 0} = itemContent;
        this._isStraightLine = fuzzyEqualNumber(offsetX, 0, FUZZY_EQUAL_DELTA) || fuzzyEqualNumber(offsetY, 0, FUZZY_EQUAL_DELTA);
        const isArcLine = "type-arc" === itemLineType && 0 !== arcRatio && !this._isStraightLine, {newPosition: newPosition, newItemPosition: newItemPosition} = this.computeNewPositionAfterTargetItem(position);
        isArcLine !== this._isArcLine ? (this._isArcLine = isArcLine, this.reDrawLine(itemLine, {
            points: [ {
                x: 0,
                y: 0
            } ],
            pickable: !1,
            center: {
                x: 0,
                y: 0
            },
            radius: 0,
            startAngle: 0,
            endAngle: 0
        })) : this._isArcLine = isArcLine, this.setItemAttributes(this._item, itemContent, newPosition, newItemPosition, type), 
        this.setAllOfItemsAttr(newPosition, newItemPosition);
    }
    isValidPoints() {
        const {position: position} = this.attribute;
        return !(!isValidNumber(position.x) || !isValidNumber(position.y));
    }
}

MarkPoint.defaultAttributes = DEFAULT_MARK_POINT_THEME;
//# sourceMappingURL=point.js.map
