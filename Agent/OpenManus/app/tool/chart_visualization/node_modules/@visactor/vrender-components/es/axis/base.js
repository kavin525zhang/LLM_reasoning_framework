import { graphicCreator } from "@visactor/vrender-core";

import { abs, cloneDeep, get, isEmpty, isFunction, merge, pi } from "@visactor/vutils";

import { AbstractComponent } from "../core/base";

import { createTextGraphicByType } from "../util";

import { DEFAULT_STATES } from "../constant";

import { AXIS_ELEMENT_NAME } from "./constant";

import { DEFAULT_AXIS_THEME } from "./config";

import { Tag } from "../tag/tag";

import { getElMap, getVerticalCoord } from "./util";

import { dispatchClickState, dispatchHoverState, dispatchUnHoverState } from "../util/interaction";

export class AxisBase extends AbstractComponent {
    constructor() {
        super(...arguments), this.name = "axis", this.data = [], this.tickLineItems = [], 
        this.subTickLineItems = [], this.axisLabelLayerSize = {}, this.axisLabelsContainer = null, 
        this._onHover = e => {
            this._lastHover = dispatchHoverState(e, this.axisContainer, this._lastHover);
        }, this._onUnHover = e => {
            this._lastHover = dispatchUnHoverState(e, this.axisContainer, this._lastHover);
        }, this._onClick = e => {
            this._lastSelect = dispatchClickState(e, this.axisContainer, this._lastSelect);
        };
    }
    getInnerView() {
        return this._innerView;
    }
    getPrevInnerView() {
        return this._prevInnerView;
    }
    getBoundsWithoutRender(attributes) {
        const currentAttribute = cloneDeep(this.attribute);
        merge(this.attribute, attributes);
        const offscreenGroup = graphicCreator.group({
            x: this.attribute.x,
            y: this.attribute.y
        });
        return this.add(offscreenGroup), this._renderInner(offscreenGroup), this.removeChild(offscreenGroup), 
        this.attribute = currentAttribute, offscreenGroup.AABBBounds;
    }
    render() {
        this._prevInnerView = this._innerView && getElMap(this._innerView), this.removeAllChild(!0), 
        this._innerView = graphicCreator.group({
            x: 0,
            y: 0,
            pickable: !1
        }), this.add(this._innerView), this._renderInner(this._innerView), this._bindEvent();
    }
    _bindEvent() {
        if (this.attribute.disableTriggerEvent) return;
        const {hover: hover, select: select} = this.attribute;
        hover && (this._innerView.addEventListener("pointermove", this._onHover), this._innerView.addEventListener("pointerout", this._onUnHover)), 
        select && this._innerView.addEventListener("pointerdown", this._onClick);
    }
    _renderInner(container) {
        const {title: title, label: label, tick: tick, line: line, items: items} = this.attribute, axisContainer = graphicCreator.group({
            x: 0,
            y: 0,
            zIndex: 1,
            pickable: !1
        });
        if (axisContainer.name = AXIS_ELEMENT_NAME.axisContainer, axisContainer.id = this._getNodeId("container"), 
        axisContainer.setMode(this.mode), this.axisContainer = axisContainer, container.add(axisContainer), 
        line && line.visible && this.renderLine(axisContainer), items && items.length && (this.data = this._transformItems(items[0]), 
        tick && tick.visible && this.renderTicks(axisContainer), label && label.visible)) {
            const labelGroup = graphicCreator.group({
                x: 0,
                y: 0,
                pickable: !1
            });
            labelGroup.name = AXIS_ELEMENT_NAME.labelContainer, labelGroup.id = this._getNodeId("label-container"), 
            this.axisLabelsContainer = labelGroup, axisContainer.add(labelGroup), items.forEach(((axisItems, layer) => {
                const layerLabelGroup = this.renderLabels(labelGroup, axisItems, layer), labels = layerLabelGroup.getChildren();
                this.beforeLabelsOverlap(labels, axisItems, layerLabelGroup, layer, items.length), 
                this.handleLabelsOverlap(labels, axisItems, layerLabelGroup, layer, items.length), 
                this.afterLabelsOverlap(labels, axisItems, layerLabelGroup, layer, items.length);
                let maxTextWidth = 0, maxTextHeight = 0, textAlign = "center", textBaseline = "middle", labelPos = 0;
                labels.forEach(((label, index) => {
                    var _a;
                    const labelStyle = label.attribute, angle = null !== (_a = labelStyle.angle) && void 0 !== _a ? _a : 0, textBounds = label.AABBBounds;
                    let textWidth = textBounds.width(), textHeight = textBounds.height();
                    angle && (textWidth = Math.abs(textWidth * Math.cos(angle)), textHeight = Math.abs(textHeight * Math.sin(angle))), 
                    maxTextWidth = Math.max(maxTextWidth, textWidth), maxTextHeight = Math.max(maxTextHeight, textHeight), 
                    textAlign = labelStyle.textAlign, textBaseline = labelStyle.textBaseline, 0 === index && (labelPos = labelStyle.x);
                })), this.axisLabelLayerSize[layer] = {
                    width: maxTextWidth,
                    height: maxTextHeight,
                    labelPos: labelPos,
                    textAlign: textAlign,
                    textBaseline: textBaseline
                };
            }));
        }
        title && title.visible && this.renderTitle(axisContainer);
    }
    renderTicks(container) {
        const tickLineItems = this.getTickLineItems(), tickLineGroup = graphicCreator.group({
            x: 0,
            y: 0,
            pickable: !1
        });
        tickLineGroup.name = AXIS_ELEMENT_NAME.tickContainer, tickLineGroup.id = this._getNodeId("tick-container"), 
        container.add(tickLineGroup), tickLineItems.forEach(((item, index) => {
            var _a;
            const line = graphicCreator.line(Object.assign({}, this._getTickLineAttribute("tick", item, index, tickLineItems)));
            if (line.name = AXIS_ELEMENT_NAME.tick, line.id = this._getNodeId(item.id), isEmpty(null === (_a = this.attribute.tick) || void 0 === _a ? void 0 : _a.state)) line.states = DEFAULT_STATES; else {
                const data = this.data[index], tickLineState = merge({}, DEFAULT_STATES, this.attribute.tick.state);
                Object.keys(tickLineState).forEach((key => {
                    isFunction(tickLineState[key]) && (tickLineState[key] = tickLineState[key](data.rawValue, index, data, this.data));
                })), line.states = tickLineState;
            }
            tickLineGroup.add(line);
        })), this.tickLineItems = tickLineItems;
        const {subTick: subTick} = this.attribute;
        if (subTick && subTick.visible) {
            const subTickLineItems = this.getSubTickLineItems();
            subTickLineItems.length && subTickLineItems.forEach(((item, index) => {
                const line = graphicCreator.line(Object.assign({}, this._getTickLineAttribute("subTick", item, index, tickLineItems)));
                if (line.name = AXIS_ELEMENT_NAME.subTick, line.id = this._getNodeId(`${index}`), 
                isEmpty(subTick.state)) line.states = DEFAULT_STATES; else {
                    const subTickLineState = merge({}, DEFAULT_STATES, subTick.state);
                    Object.keys(subTickLineState).forEach((key => {
                        isFunction(subTickLineState[key]) && (subTickLineState[key] = subTickLineState[key](item.value, index, item, tickLineItems));
                    })), line.states = subTickLineState;
                }
                tickLineGroup.add(line);
            })), this.subTickLineItems = subTickLineItems;
        }
    }
    renderLabels(container, items, layer) {
        const {dataFilter: dataFilter} = this.attribute.label;
        dataFilter && isFunction(dataFilter) && (items = dataFilter(items, layer));
        const data = this._transformItems(items), labelGroup = graphicCreator.group({
            x: 0,
            y: 0,
            pickable: !1
        });
        return labelGroup.name = `${AXIS_ELEMENT_NAME.labelContainer}-layer-${layer}`, labelGroup.id = this._getNodeId(`label-container-layer-${layer}`), 
        container.add(labelGroup), data.forEach(((item, index) => {
            var _a;
            const labelStyle = this._getLabelAttribute(item, index, data, layer), text = createTextGraphicByType(labelStyle);
            if (text.name = AXIS_ELEMENT_NAME.label, text.id = this._getNodeId(`layer${layer}-label-${item.id}`), 
            isEmpty(null === (_a = this.attribute.label) || void 0 === _a ? void 0 : _a.state)) text.states = DEFAULT_STATES; else {
                const labelState = merge({}, DEFAULT_STATES, this.attribute.label.state);
                Object.keys(labelState).forEach((key => {
                    isFunction(labelState[key]) && (labelState[key] = labelState[key](item, index, data, layer));
                })), text.states = labelState;
            }
            text.data = Object.assign(Object.assign({}, item), {
                index: index,
                layer: layer
            }), labelGroup.add(text);
        })), labelGroup;
    }
    renderTitle(container) {
        const titleAttributes = this.getTitleAttribute(), axisTitle = new Tag(Object.assign({}, titleAttributes));
        axisTitle.name = AXIS_ELEMENT_NAME.title, axisTitle.id = this._getNodeId("title"), 
        container.add(axisTitle);
    }
    getVerticalCoord(point, offset, inside) {
        return getVerticalCoord(point, this.getVerticalVector(offset, inside, point));
    }
    getTickLineItems() {
        const {tick: tick} = this.attribute, data = this.data, tickLineItems = [], {alignWithLabel: alignWithLabel, inside: inside = !1, length: length, dataFilter: dataFilter} = tick;
        let tickSegment = 1;
        return data.length >= 2 && (tickSegment = data[1].value - data[0].value), (dataFilter && isFunction(dataFilter) ? dataFilter(data) : data).forEach((item => {
            let point = item.point, tickValue = item.value;
            if (!alignWithLabel) {
                const value = item.value - tickSegment / 2;
                if (this.isInValidValue(value)) return;
                point = this.getTickCoord(value), tickValue = value;
            }
            const endPoint = this.getVerticalCoord(point, length, inside);
            if ("3d" === this.mode) {
                const vec = this.getVerticalVector(length, inside, point);
                let alpha = 0, beta = 0;
                abs(vec[0]) > abs(vec[1]) ? alpha = pi / 2 * (endPoint.x > point.x ? 1 : -1) : beta = pi / 2 * (endPoint.y > point.y ? -1 : 1), 
                tickLineItems.push({
                    start: point,
                    end: endPoint,
                    value: tickValue,
                    id: `tick-${item.id}`,
                    anchor: [ point.x, point.y ],
                    alpha: alpha,
                    beta: beta
                });
            } else tickLineItems.push({
                start: point,
                end: endPoint,
                value: tickValue,
                id: `tick-${item.id}`
            });
        })), tickLineItems;
    }
    getSubTickLineItems() {
        const {subTick: subTick} = this.attribute, subTickLineItems = [], {count: subCount = 4, inside: inside = !1, length: length = 2} = subTick, tickLineItems = this.tickLineItems, tickLineCount = tickLineItems.length;
        if (tickLineCount >= 2) for (let i = 0; i < tickLineCount - 1; i++) {
            const pre = tickLineItems[i], next = tickLineItems[i + 1];
            for (let j = 0; j < subCount; j++) {
                const percent = (j + 1) / (subCount + 1), value = (1 - percent) * pre.value + percent * next.value, point = this.getTickCoord(value), endPoint = this.getVerticalCoord(point, length, inside);
                subTickLineItems.push({
                    start: point,
                    end: endPoint,
                    value: value,
                    id: `sub-tick-${value}`
                });
            }
        }
        return subTickLineItems;
    }
    _getTickLineAttribute(type, tickItem, index, tickItems) {
        let style = get(this.attribute, `${type}.style`);
        const data = this.data[index];
        style = isFunction(style) ? merge({}, get(DEFAULT_AXIS_THEME, `${type}.style`), "tick" === type ? style(data.rawValue, index, data, this.data) : style(tickItem.value, index, tickItem, tickItems)) : style;
        const {start: start, end: end, anchor: anchor, alpha: alpha, beta: beta} = tickItem;
        return Object.assign({
            points: [ start, end ],
            anchor: anchor,
            alpha: alpha,
            beta: beta
        }, style);
    }
    _getLabelAttribute(tickDatum, index, tickData, layer) {
        var _a, _b;
        const {space: space = 4, inside: inside = !1, formatMethod: formatMethod, type: type = "text", text: text} = this.attribute.label;
        let offset = space, tickLength = 0;
        (null === (_a = this.attribute.tick) || void 0 === _a ? void 0 : _a.visible) && this.attribute.tick.inside === inside && (tickLength = this.attribute.tick.length || 4), 
        (null === (_b = this.attribute.subTick) || void 0 === _b ? void 0 : _b.visible) && this.attribute.subTick.inside === inside && (tickLength = Math.max(tickLength, this.attribute.subTick.length || 2)), 
        offset += tickLength;
        const axisVector = this.getRelativeVector(tickDatum.point);
        layer > 0 && (0 === axisVector[1] ? offset += (this.axisLabelLayerSize[layer - 1].height + get(this.attribute, "label.space", 4)) * layer : offset += (this.axisLabelLayerSize[layer - 1].width + get(this.attribute, "label.space", 4)) * layer);
        const point = this.getVerticalCoord(tickDatum.point, offset, inside), vector = this.getVerticalVector(offset || 1, inside, point), textContent = formatMethod ? formatMethod(`${tickDatum.label}`, tickDatum, index, tickData, layer) : tickDatum.label;
        let {style: textStyle} = this.attribute.label;
        textStyle = isFunction(textStyle) ? merge({}, DEFAULT_AXIS_THEME.label.style, textStyle(tickDatum, index, tickData, layer)) : textStyle;
        const labelAlign = this.getLabelAlign(vector, inside, textStyle.angle);
        return textStyle = merge(labelAlign, textStyle), isFunction(textStyle.text) && (textStyle.text = textStyle.text({
            label: tickDatum.label,
            value: tickDatum.rawValue,
            index: tickDatum.index,
            layer: layer
        })), Object.assign(Object.assign(Object.assign({}, this.getLabelPosition(point, vector, textContent, textStyle)), {
            text: null != text ? text : textContent,
            _originText: tickDatum.label,
            lineHeight: null == textStyle ? void 0 : textStyle.fontSize,
            type: type
        }), textStyle);
    }
    getLabelPosition(point, vector, text, style) {
        return point;
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
    release() {
        super.release(), this._prevInnerView = null, this._innerView = null;
    }
}
//# sourceMappingURL=base.js.map