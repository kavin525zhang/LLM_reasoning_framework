var __rest = this && this.__rest || function(s, e) {
    var t = {};
    for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0 && (t[p] = s[p]);
    if (null != s && "function" == typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (p = Object.getOwnPropertySymbols(s); i < p.length; i++) e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]) && (t[p[i]] = s[p[i]]);
    }
    return t;
};

import { merge, isEmpty, normalizePadding, get, isValid, isNil, isFunction, isArray, minInArray, throttle, isNumberClose, clamp, isObject } from "@visactor/vutils";

import { graphicCreator } from "@visactor/vrender-core";

import { LegendBase } from "../base";

import { Pager } from "../../pager";

import { DEFAULT_TITLE_SPACE, DEFAULT_ITEM_SPACE_COL, DEFAULT_ITEM_SPACE_ROW, DEFAULT_SHAPE_SPACE, DEFAULT_SHAPE_SIZE, DEFAULT_LABEL_SPACE, DEFAULT_PAGER_SPACE, LegendStateValue, DEFAULT_VALUE_SPACE, LegendEvent, LEGEND_ELEMENT_NAME } from "../constant";

import { loadDiscreteLegendComponent } from "../register";

import { createTextGraphicByType } from "../../util";

import { ScrollBar } from "../../scrollbar";

const DEFAULT_STATES = {
    [LegendStateValue.focus]: {},
    [LegendStateValue.selected]: {},
    [LegendStateValue.selectedHover]: {},
    [LegendStateValue.unSelected]: {},
    [LegendStateValue.unSelectedHover]: {}
};

loadDiscreteLegendComponent();

export class DiscreteLegend extends LegendBase {
    constructor(attributes, options) {
        super((null == options ? void 0 : options.skipDefault) ? attributes : merge({}, DiscreteLegend.defaultAttributes, attributes)), 
        this.name = "discreteLegend", this._itemsContainer = null, this._itemHeightByUser = void 0, 
        this._itemHeight = 0, this._itemMaxWidth = 0, this._contentMaxHeight = 0, this._onHover = e => {
            const target = e.target;
            if (target && target.name && target.name.startsWith(LEGEND_ELEMENT_NAME.item)) {
                const legendItem = target.delegate;
                if (this._lastActiveItem) {
                    if (this._lastActiveItem.id === legendItem.id) return;
                    this._unHover(this._lastActiveItem, e);
                }
                this._hover(legendItem, e);
            } else this._lastActiveItem && (this._unHover(this._lastActiveItem, e), this._lastActiveItem = null);
        }, this._onUnHover = e => {
            this._lastActiveItem && (this._unHover(this._lastActiveItem, e), this._lastActiveItem = null);
        }, this._onClick = e => {
            var _a, _b, _c, _d;
            const target = e.target;
            if (target && target.name && target.name.startsWith(LEGEND_ELEMENT_NAME.item)) {
                const legendItem = target.delegate, {selectMode: selectMode = "multiple"} = this.attribute;
                if (target.name === LEGEND_ELEMENT_NAME.focus || "focus" === selectMode) {
                    const isFocusSelected = legendItem.hasState(LegendStateValue.focus);
                    legendItem.toggleState(LegendStateValue.focus), isFocusSelected ? null === (_a = this._itemsContainer) || void 0 === _a || _a.getChildren().forEach((item => {
                        this._removeLegendItemState(item, [ LegendStateValue.unSelected, LegendStateValue.unSelectedHover, LegendStateValue.focus ], e), 
                        this._setLegendItemState(item, LegendStateValue.selected, e);
                    })) : (this._setLegendItemState(legendItem, LegendStateValue.selected, e), this._removeLegendItemState(legendItem, [ LegendStateValue.unSelected, LegendStateValue.unSelectedHover ], e), 
                    null === (_b = this._itemsContainer) || void 0 === _b || _b.getChildren().forEach((item => {
                        legendItem !== item && (this._removeLegendItemState(item, [ LegendStateValue.selected, LegendStateValue.selectedHover, LegendStateValue.focus ], e), 
                        this._setLegendItemState(item, LegendStateValue.unSelected, e));
                    })));
                } else {
                    null === (_c = this._itemsContainer) || void 0 === _c || _c.getChildren().forEach((item => {
                        item.removeState(LegendStateValue.focus);
                    }));
                    const {allowAllCanceled: allowAllCanceled = !0} = this.attribute, isSelected = legendItem.hasState(LegendStateValue.selected), currentSelectedItems = this._getSelectedLegends();
                    if ("multiple" === selectMode) {
                        if (!1 === allowAllCanceled && isSelected && 1 === currentSelectedItems.length) return void this._dispatchLegendEvent(LegendEvent.legendItemClick, legendItem, e);
                        isSelected ? (this._removeLegendItemState(legendItem, [ LegendStateValue.selected, LegendStateValue.selectedHover ], e), 
                        this._setLegendItemState(legendItem, LegendStateValue.unSelected, e)) : (this._setLegendItemState(legendItem, LegendStateValue.selected, e), 
                        this._removeLegendItemState(legendItem, [ LegendStateValue.unSelected, LegendStateValue.unSelectedHover ], e));
                    } else this._setLegendItemState(legendItem, LegendStateValue.selected, e), this._removeLegendItemState(legendItem, [ LegendStateValue.unSelected, LegendStateValue.unSelectedHover ], e), 
                    null === (_d = this._itemsContainer) || void 0 === _d || _d.getChildren().forEach((item => {
                        legendItem !== item && (this._removeLegendItemState(item, [ LegendStateValue.selected, LegendStateValue.selectedHover ], e), 
                        this._setLegendItemState(item, LegendStateValue.unSelected, e));
                    }));
                }
                this._dispatchLegendEvent(LegendEvent.legendItemClick, legendItem, e);
            }
        };
    }
    render() {
        super.render(), this._lastActiveItem = null;
    }
    setSelected(selectedData) {
        var _a;
        (null === (_a = this._itemsContainer) || void 0 === _a ? void 0 : _a.getChildren()).forEach((item => {
            const itemData = item.data;
            selectedData.includes(itemData.label) ? (this._setLegendItemState(item, LegendStateValue.selected), 
            this._removeLegendItemState(item, [ LegendStateValue.unSelected, LegendStateValue.unSelectedHover ])) : (this._removeLegendItemState(item, [ LegendStateValue.selected, LegendStateValue.selectedHover ]), 
            this._setLegendItemState(item, LegendStateValue.unSelected));
        }));
    }
    _renderItems() {
        const {item: itemAttrs = {}, maxCol: maxCol = 1, maxRow: maxRow = 2, maxWidth: maxWidth, defaultSelected: defaultSelected, lazyload: lazyload, autoPage: autoPage} = this.attribute, {spaceCol: spaceCol = DEFAULT_ITEM_SPACE_COL, spaceRow: spaceRow = DEFAULT_ITEM_SPACE_ROW, verticalAlign: verticalAlign = "middle"} = itemAttrs, itemsContainer = this._itemsContainer, {items: legendItems, isHorizontal: isHorizontal, startIndex: startIndex, isScrollbar: isScrollbar} = this._itemContext, maxPages = isScrollbar ? 1 : isHorizontal ? maxRow : maxCol, maxHeight = this._contentMaxHeight;
        let item, {doWrap: doWrap, maxWidthInCol: maxWidthInCol, startX: startX, startY: startY, pages: pages} = this._itemContext, lastItemWidth = 0, lastLineHeight = 0;
        const lastLineItemGroup = [];
        for (let index = startIndex, len = legendItems.length; index < len && !(lazyload && pages > this._itemContext.currentPage * maxPages); index++) {
            lazyload && (this._itemContext.startIndex = index + 1), item = legendItems[index], 
            item.id || (item.id = item.label), item.index = index;
            let isSelected = !0;
            isArray(defaultSelected) && (isSelected = defaultSelected.includes(item.label));
            const itemGroup = this._renderEachItem(item, isSelected, index, legendItems), itemWidth = itemGroup.attribute.width, itemHeight = itemGroup.attribute.height;
            this._itemHeight = Math.max(this._itemHeight, itemHeight), maxWidthInCol = Math.max(itemWidth, maxWidthInCol), 
            this._itemMaxWidth = Math.max(itemWidth, this._itemMaxWidth), isHorizontal ? (isValid(maxWidth) && (isScrollbar && autoPage ? (pages = Math.ceil((startX + itemWidth) / maxWidth), 
            doWrap = pages > 1) : startX + itemWidth > maxWidth && (doWrap = !0, startX > 0 && ("middle" !== verticalAlign && "bottom" !== verticalAlign || lastLineItemGroup.forEach((i => {
                i.setAttributes({
                    y: i.attribute.y + (lastLineHeight - i.attribute.height) / ("middle" === verticalAlign ? 2 : 1)
                });
            })), pages += 1, startX = 0, startY += lastLineHeight + spaceRow, lastLineHeight = 0, 
            lastLineItemGroup.length = 0))), 0 === startX && 0 === startY || itemGroup.setAttributes({
                x: startX,
                y: startY
            }), startX += spaceCol + itemWidth, lastLineHeight = Math.max(lastLineHeight, itemHeight), 
            lastLineItemGroup.push(itemGroup)) : (isValid(maxHeight) && (isScrollbar && autoPage ? (pages = Math.ceil((startY + itemHeight) / maxHeight), 
            doWrap = pages > 1) : maxHeight <= itemHeight ? (pages += 1, doWrap = !0, startY = 0, 
            index > 0 && (startX += lastItemWidth + spaceCol)) : maxHeight < startY + itemHeight && (pages += 1, 
            doWrap = !0, startY = 0, startX += maxWidthInCol + spaceCol, maxWidthInCol = 0)), 
            0 === startX && 0 === startY || itemGroup.setAttributes({
                x: startX,
                y: startY
            }), startY += spaceRow + itemHeight), itemsContainer.add(itemGroup), lastItemWidth = itemWidth;
        }
        return !isHorizontal || "middle" !== verticalAlign && "bottom" !== verticalAlign || lastLineItemGroup.forEach((i => {
            i.setAttributes({
                y: i.attribute.y + (lastLineHeight - i.attribute.height) / ("middle" === verticalAlign ? 2 : 1)
            });
        })), this._itemContext.doWrap = doWrap, this._itemContext.startX = startX, this._itemContext.startY = startY, 
        this._itemContext.maxWidthInCol = maxWidthInCol, this._itemContext.pages = pages, 
        this._itemContext.maxPages = maxPages, isScrollbar && (this._itemContext.totalPage = pages), 
        lazyload || (this._itemContext.startIndex = legendItems.length), this._itemContext;
    }
    _renderContent() {
        const {item: item = {}, items: items, reversed: reversed, maxWidth: maxWidth, maxHeight: maxHeight} = this.attribute;
        if (!1 === item.visible || isEmpty(items)) return;
        let legendItems = items;
        reversed && (legendItems = null == items ? void 0 : items.reverse()), this._contentMaxHeight = Math.max(0, maxHeight - this._parsedPadding[0] - this._parsedPadding[2]);
        const itemsContainer = graphicCreator.group({
            x: 0,
            y: 0
        });
        this._itemsContainer = itemsContainer;
        const {layout: layout, autoPage: autoPage} = this.attribute, isHorizontal = "horizontal" === layout, {maxWidth: maxItemWidth, width: itemWidth, height: itemHeight} = item, widthsOptions = [];
        isValid(maxItemWidth) && widthsOptions.push(maxItemWidth), isValid(itemWidth) && widthsOptions.push(itemWidth), 
        widthsOptions.length && (isValid(maxWidth) && widthsOptions.push(maxWidth), this._itemWidthByUser = minInArray(widthsOptions)), 
        isValid(itemHeight) && (this._itemHeightByUser = itemHeight);
        const pager = this.attribute.pager;
        this._itemContext = {
            currentPage: pager && pager.defaultCurrent || 1,
            doWrap: !1,
            maxWidthInCol: 0,
            maxPages: 1,
            pages: 1,
            startX: 0,
            startY: 0,
            startIndex: 0,
            items: legendItems,
            isHorizontal: isHorizontal,
            totalPage: 1 / 0,
            isScrollbar: pager && "scrollbar" === pager.type,
            clipContainer: void 0
        }, this._itemContext = this._renderItems();
        let pagerRendered = !1;
        this._itemContext.doWrap && autoPage && this._itemContext.pages > this._itemContext.maxPages && (pagerRendered = this._renderPagerComponent()), 
        pagerRendered || (itemsContainer.setAttribute("y", this._title ? this._title.AABBBounds.height() + get(this.attribute, "title.space", 8) : 0), 
        this._innerView.add(itemsContainer));
    }
    _bindEvents() {
        if (this.attribute.disableTriggerEvent) return;
        if (!this._itemsContainer) return;
        const {hover: hover = !0, select: select = !0} = this.attribute;
        if (hover) {
            let trigger = "pointermove", triggerOff = "pointerleave";
            isObject(hover) && (hover.trigger && (trigger = hover.trigger), hover.triggerOff && (triggerOff = hover.triggerOff)), 
            this._itemsContainer.addEventListener(trigger, this._onHover), this._itemsContainer.addEventListener(triggerOff, this._onUnHover);
        }
        if (select) {
            let trigger = "pointerdown";
            isObject(select) && select.trigger && (trigger = select.trigger), this._itemsContainer.addEventListener(trigger, this._onClick);
        }
    }
    _autoEllipsis(autoEllipsisStrategy, layoutWidth, labelShape, valueShape) {
        var _a, _b;
        const {label: labelAttr, value: valueAttr} = this.attribute.item, valueBounds = valueShape.AABBBounds, labelBounds = labelShape.AABBBounds, valueWidth = valueBounds.width(), labelWidth = labelBounds.width();
        let useWidthRatio = !1;
        "labelFirst" === autoEllipsisStrategy ? labelWidth > layoutWidth ? useWidthRatio = !0 : valueShape.setAttribute("maxLineWidth", layoutWidth - labelWidth) : "valueFirst" === autoEllipsisStrategy ? valueWidth > layoutWidth ? useWidthRatio = !0 : labelShape.setAttribute("maxLineWidth", layoutWidth - valueWidth) : valueWidth + labelWidth > layoutWidth && (useWidthRatio = !0), 
        useWidthRatio && (valueShape.setAttribute("maxLineWidth", Math.max(layoutWidth * (null !== (_a = labelAttr.widthRatio) && void 0 !== _a ? _a : .5), layoutWidth - labelWidth)), 
        labelShape.setAttribute("maxLineWidth", Math.max(layoutWidth * (null !== (_b = valueAttr.widthRatio) && void 0 !== _b ? _b : .5), layoutWidth - valueWidth)));
    }
    _renderEachItem(item, isSelected, index, items) {
        var _a, _b;
        const {id: id, label: label, value: value, shape: shape} = item, {padding: padding = 0, focus: focus, focusIconStyle: focusIconStyle, align: align, autoEllipsisStrategy: autoEllipsisStrategy} = this.attribute.item, {shape: shapeAttr, label: labelAttr, value: valueAttr, background: background} = this.attribute.item, shapeStyle = this._handleStyle(shapeAttr, item, isSelected, index, items), labelStyle = this._handleStyle(labelAttr, item, isSelected, index, items), valueStyle = this._handleStyle(valueAttr, item, isSelected, index, items), backgroundStyle = this._handleStyle(background, item, isSelected, index, items), parsedPadding = normalizePadding(padding);
        let itemGroup;
        !1 === background.visible ? (itemGroup = graphicCreator.group({
            x: 0,
            y: 0,
            cursor: null === (_a = backgroundStyle.style) || void 0 === _a ? void 0 : _a.cursor
        }), this._appendDataToShape(itemGroup, LEGEND_ELEMENT_NAME.item, item, itemGroup)) : (itemGroup = graphicCreator.group(Object.assign({
            x: 0,
            y: 0
        }, backgroundStyle.style)), this._appendDataToShape(itemGroup, LEGEND_ELEMENT_NAME.item, item, itemGroup, backgroundStyle.state)), 
        itemGroup.id = `${null != id ? id : label}-${index}`, itemGroup.addState(isSelected ? LegendStateValue.selected : LegendStateValue.unSelected);
        const innerGroup = graphicCreator.group({
            x: 0,
            y: 0,
            pickable: !1
        });
        itemGroup.add(innerGroup);
        let focusShape, focusStartX = 0, shapeSize = 0, shapeSpace = 0;
        if (shapeAttr && !1 !== shapeAttr.visible) {
            const s = get(shapeStyle, "style.size", DEFAULT_SHAPE_SIZE);
            shapeSize = isArray(s) ? s[0] || 0 : s, shapeSpace = get(shapeAttr, "space", DEFAULT_SHAPE_SPACE);
            const itemShape = graphicCreator.symbol(Object.assign(Object.assign({
                x: 0,
                y: 0,
                symbolType: "circle",
                strokeBoundsBuffer: 0
            }, shape), shapeStyle.style));
            Object.keys(shapeStyle.state || {}).forEach((key => {
                const color = shapeStyle.state[key].fill || shapeStyle.state[key].stroke;
                shape.fill && isNil(shapeStyle.state[key].fill) && color && (shapeStyle.state[key].fill = color), 
                shape.stroke && isNil(shapeStyle.state[key].stroke) && color && (shapeStyle.state[key].stroke = color);
            })), this._appendDataToShape(itemShape, LEGEND_ELEMENT_NAME.itemShape, item, itemGroup, shapeStyle.state), 
            itemShape.addState(isSelected ? LegendStateValue.selected : LegendStateValue.unSelected), 
            innerGroup.add(itemShape);
        }
        let focusSpace = 0;
        if (focus) {
            const focusSize = get(focusIconStyle, "size", DEFAULT_SHAPE_SIZE);
            focusShape = graphicCreator.symbol(Object.assign(Object.assign({
                x: 0,
                y: -focusSize / 2 - 1,
                strokeBoundsBuffer: 0,
                boundsPadding: parsedPadding
            }, focusIconStyle), {
                visible: !0,
                pickMode: "imprecise"
            })), this._appendDataToShape(focusShape, LEGEND_ELEMENT_NAME.focus, item, itemGroup), 
            focusSpace = focusSize;
        }
        const text = labelAttr.formatMethod ? labelAttr.formatMethod(label, item, index) : label, labelAttributes = Object.assign(Object.assign({
            x: shapeSize / 2 + shapeSpace,
            y: 0,
            textAlign: "start",
            textBaseline: "middle",
            lineHeight: null === (_b = labelStyle.style) || void 0 === _b ? void 0 : _b.fontSize
        }, labelStyle.style), {
            text: text,
            _originText: labelAttr.formatMethod ? label : void 0
        }), labelShape = createTextGraphicByType(labelAttributes);
        this._appendDataToShape(labelShape, LEGEND_ELEMENT_NAME.itemLabel, item, itemGroup, labelStyle.state), 
        labelShape.addState(isSelected ? LegendStateValue.selected : LegendStateValue.unSelected), 
        innerGroup.add(labelShape);
        const labelSpace = get(labelAttr, "space", DEFAULT_LABEL_SPACE);
        if (isValid(value)) {
            const valueSpace = get(valueAttr, "space", focus ? DEFAULT_VALUE_SPACE : 0), valueText = valueAttr.formatMethod ? valueAttr.formatMethod(value, item, index) : value, valueAttributes = Object.assign(Object.assign({
                x: 0,
                y: 0,
                textAlign: "start",
                textBaseline: "middle",
                lineHeight: valueStyle.style.fontSize
            }, valueStyle.style), {
                text: valueText,
                _originText: valueAttr.formatMethod ? value : void 0
            }), valueShape = createTextGraphicByType(valueAttributes);
            if (this._appendDataToShape(valueShape, LEGEND_ELEMENT_NAME.itemValue, item, itemGroup, valueStyle.state), 
            valueShape.addState(isSelected ? LegendStateValue.selected : LegendStateValue.unSelected), 
            this._itemWidthByUser) {
                const layoutWidth = this._itemWidthByUser - parsedPadding[1] - parsedPadding[3] - shapeSize - shapeSpace - labelSpace - focusSpace - valueSpace;
                this._autoEllipsis(autoEllipsisStrategy, layoutWidth, labelShape, valueShape), valueAttr.alignRight ? valueShape.setAttributes({
                    textAlign: "right",
                    x: this._itemWidthByUser - shapeSize / 2 - parsedPadding[1] - parsedPadding[3] - focusSpace - valueSpace
                }) : valueShape.setAttribute("x", labelSpace + (labelShape.AABBBounds.empty() ? 0 : labelShape.AABBBounds.x2));
            } else valueShape.setAttribute("x", labelSpace + (labelShape.AABBBounds.empty() ? 0 : labelShape.AABBBounds.x2));
            focusStartX = valueSpace + (valueShape.AABBBounds.empty() ? 0 : valueShape.AABBBounds.x2), 
            innerGroup.add(valueShape);
        } else this._itemWidthByUser ? (labelShape.setAttribute("maxLineWidth", this._itemWidthByUser - parsedPadding[1] - parsedPadding[3] - shapeSize - shapeSpace - focusSpace), 
        focusStartX = labelSpace + (labelShape.AABBBounds.empty() ? 0 : labelShape.AABBBounds.x2)) : focusStartX = labelSpace + (labelShape.AABBBounds.empty() ? 0 : labelShape.AABBBounds.x2);
        focusShape && (focusShape.setAttribute("x", focusStartX), innerGroup.add(focusShape));
        const innerGroupBounds = innerGroup.AABBBounds, innerGroupWidth = innerGroupBounds.width();
        if ("right" === align) {
            const x2 = innerGroupBounds.x2, x1 = innerGroupBounds.x1;
            innerGroup.forEachChildren(((child, index) => {
                "symbol" !== child.type && "right" !== child.attribute.textAlign || child === focusShape ? child.setAttribute("x", x1 + x2 - child.attribute.x - child.AABBBounds.width()) : "symbol" !== child.type ? child.setAttributes({
                    x: x1 + x2 - child.attribute.x,
                    textAlign: "left"
                }) : child.setAttribute("x", x1 + x2 - child.attribute.x);
            }));
        }
        const innerGroupHeight = innerGroupBounds.height(), itemGroupWidth = isValid(this.attribute.item.width) ? this.attribute.item.width : innerGroupWidth + parsedPadding[1] + parsedPadding[3], itemGroupHeight = this._itemHeightByUser || innerGroupHeight + parsedPadding[0] + parsedPadding[2];
        return itemGroup.attribute.width = itemGroupWidth, itemGroup.attribute.height = itemGroupHeight, 
        focusShape && focusShape.setAttribute("visible", !1), innerGroup.translateTo(-innerGroupBounds.x1 + parsedPadding[3], -innerGroupBounds.y1 + parsedPadding[0]), 
        itemGroup;
    }
    _createPager(compStyle) {
        var _a, _b;
        const {disableTriggerEvent: disableTriggerEvent, maxRow: maxRow} = this.attribute, estimateTotal = num => num <= 99 ? 99 : num <= 999 ? 999 : 9999;
        return this._itemContext.isHorizontal ? new Pager(Object.assign(Object.assign({
            layout: 1 === maxRow ? "horizontal" : "vertical",
            total: estimateTotal(this._itemContext.pages)
        }, merge({
            handler: {
                preShape: "triangleUp",
                nextShape: "triangleDown"
            }
        }, compStyle)), {
            defaultCurrent: null === (_a = this.attribute.pager) || void 0 === _a ? void 0 : _a.defaultCurrent,
            disableTriggerEvent: disableTriggerEvent
        })) : new Pager(Object.assign({
            layout: "horizontal",
            total: estimateTotal(this._itemContext.pages),
            disableTriggerEvent: disableTriggerEvent,
            defaultCurrent: null === (_b = this.attribute.pager) || void 0 === _b ? void 0 : _b.defaultCurrent
        }, compStyle));
    }
    _createScrollbar(compStyle, compSize) {
        const {disableTriggerEvent: disableTriggerEvent} = this.attribute;
        return this._itemContext.isHorizontal ? new ScrollBar(Object.assign(Object.assign({
            direction: "horizontal",
            disableTriggerEvent: disableTriggerEvent,
            range: [ 0, .5 ],
            height: !1 === compStyle.visible ? 0 : 12
        }, compStyle), {
            width: compSize
        })) : new ScrollBar(Object.assign(Object.assign({
            direction: "vertical",
            width: !1 === compStyle.visible ? 0 : 12,
            range: [ 0, .5 ]
        }, compStyle), {
            height: compSize,
            disableTriggerEvent: disableTriggerEvent
        }));
    }
    _updatePositionOfPager(renderStartY, compWidth, compHeight) {
        const {pager: pager} = this.attribute, {totalPage: totalPage, isHorizontal: isHorizontal} = this._itemContext, position = pager && pager.position || "middle";
        if (this._pagerComponent.setTotal(totalPage), isHorizontal) {
            let y;
            y = "start" === position ? renderStartY : "end" === position ? renderStartY + compHeight - this._pagerComponent.AABBBounds.height() / 2 : renderStartY + compHeight / 2 - this._pagerComponent.AABBBounds.height() / 2, 
            this._pagerComponent.setAttributes({
                x: compWidth - this._pagerComponent.AABBBounds.width(),
                y: y
            });
        } else {
            let x;
            x = "start" === position ? 0 : "end" === position ? compWidth - this._pagerComponent.AABBBounds.width() : (compWidth - this._pagerComponent.AABBBounds.width()) / 2, 
            this._pagerComponent.setAttributes({
                x: x,
                y: compHeight - this._pagerComponent.AABBBounds.height()
            });
        }
    }
    _computeScrollbarDelta() {
        const {isHorizontal: isHorizontal, clipContainer: clipContainer} = this._itemContext, itemContainerBounds = this._itemsContainer.AABBBounds, clipContainerBounds = clipContainer.AABBBounds;
        let delta, innerViewSize;
        return isHorizontal ? (innerViewSize = clipContainerBounds.width(), delta = innerViewSize / itemContainerBounds.width()) : (innerViewSize = clipContainerBounds.height(), 
        delta = innerViewSize / itemContainerBounds.height()), delta;
    }
    _updatePositionOfScrollbar(contentWidth, contentHeight, renderStartY) {
        const {isHorizontal: isHorizontal, currentPage: currentPage, totalPage: totalPage} = this._itemContext, start = (currentPage - 1) / totalPage;
        this._pagerComponent.setScrollRange([ start, start + this._computeScrollbarDelta() ]), 
        isHorizontal ? this._pagerComponent.setAttributes({
            x: 0,
            y: renderStartY + contentHeight
        }) : this._pagerComponent.setAttributes({
            x: contentWidth,
            y: renderStartY
        });
    }
    _bindEventsOfPager(pageSize, channel) {
        const pager = this.attribute.pager || {}, {animation: animation = !0, animationDuration: animationDuration = 450, animationEasing: animationEasing = "quadIn"} = pager, pageParser = this._itemContext.isScrollbar ? e => {
            const {value: value} = e.detail;
            let newPage;
            return newPage = 0 === value[0] ? 1 : 1 === value[1] ? this._itemContext.totalPage : value[0] * this._itemContext.totalPage + 1, 
            newPage;
        } : e => e.detail.current, onScroll = e => {
            const scrollComponent = this._pagerComponent, preScrollRange = scrollComponent.getScrollRange(), {direction: direction} = scrollComponent.attribute, {width: width, height: height} = scrollComponent.getSliderRenderBounds(), currentScrollValue = "vertical" === direction ? e.deltaY / height : e.deltaX / width;
            scrollComponent.setScrollRange([ preScrollRange[0] + currentScrollValue, preScrollRange[1] + currentScrollValue ], !0), 
            this.updateScrollMask();
        }, onPaging = e => {
            const newPage = pageParser(e);
            if (newPage !== this._itemContext.currentPage) {
                if (this._itemContext.currentPage = newPage, this._itemContext && this._itemContext.startIndex < this._itemContext.items.length) {
                    this._renderItems();
                    const newTotalPage = Math.ceil(this._itemContext.pages / this._itemContext.maxPages);
                    if (this._itemContext.totalPage = newTotalPage, this._itemContext.isScrollbar && this._pagerComponent) {
                        const newDelta = this._computeScrollbarDelta(), [start] = this._pagerComponent.getScrollRange();
                        this._pagerComponent.setScrollRange([ start, start + newDelta ]);
                    }
                }
                if (this._itemContext.isScrollbar) {
                    const [start] = this._pagerComponent.getScrollRange();
                    let containerSize;
                    containerSize = this._itemContext.isHorizontal ? this._itemsContainer.AABBBounds.width() : this._itemsContainer.AABBBounds.height();
                    const startOffset = containerSize * start;
                    this.updateScrollMask(), animation ? this._itemsContainer.animate().to({
                        [channel]: -startOffset
                    }, animationDuration, animationEasing) : this._itemsContainer.setAttribute(channel, -startOffset);
                } else animation ? this._itemsContainer.animate().to({
                    [channel]: -(newPage - 1) * pageSize
                }, animationDuration, animationEasing) : this._itemsContainer.setAttribute(channel, -(newPage - 1) * pageSize);
            }
        };
        if (this._itemContext.isScrollbar) {
            if (this._pagerComponent.addEventListener("scrollDrag", onPaging), this._pagerComponent.addEventListener("scrollUp", onPaging), 
            this.attribute.pager.roamScroll) {
                const THROTTLE_TIME = 50;
                this.addEventListener("wheel", (e => e.nativeEvent.preventDefault())), this.addEventListener("wheel", throttle(onScroll, THROTTLE_TIME));
            }
        } else this._pagerComponent.addEventListener("toPrev", onPaging), this._pagerComponent.addEventListener("toNext", onPaging);
    }
    _renderPager() {
        const renderStartY = this._title ? this._title.AABBBounds.height() + get(this.attribute, "title.space", 8) : 0, {maxWidth: maxWidth, maxCol: maxCol = 1, maxRow: maxRow = 2, item: item = {}, pager: pager = {}} = this.attribute, {spaceCol: spaceCol = DEFAULT_ITEM_SPACE_COL, spaceRow: spaceRow = DEFAULT_ITEM_SPACE_ROW} = item, itemsContainer = this._itemsContainer, {space: pagerSpace = DEFAULT_PAGER_SPACE, defaultCurrent: defaultCurrent = 1} = pager, compStyle = __rest(pager, [ "space", "defaultCurrent" ]), {isHorizontal: isHorizontal} = this._itemContext, maxHeight = this._contentMaxHeight;
        let comp, compWidth = 0, compHeight = 0, contentWidth = 0, contentHeight = 0, startX = 0, startY = 0, pages = 1;
        if (isHorizontal) {
            if (compHeight = (maxRow - 1) * spaceRow + this._itemHeight * maxRow, compWidth = maxWidth, 
            comp = this._createPager(compStyle), this._pagerComponent = comp, this._innerView.add(comp), 
            contentWidth = maxWidth - comp.AABBBounds.width() - pagerSpace, contentWidth <= 0) return this._innerView.removeChild(comp), 
            !1;
            itemsContainer.getChildren().forEach(((item, index) => {
                const {width: width, height: height} = item.attribute;
                contentWidth < startX + width && (startX = 0, startY += height + spaceRow, pages += 1), 
                index > 0 && item.setAttributes({
                    x: startX,
                    y: startY
                }), startX += spaceCol + width;
            })), this._itemContext.startX = startX, this._itemContext.startY = startY, this._itemContext.pages = pages;
            const total = Math.ceil(pages / maxRow);
            this._itemContext.totalPage = total, this._updatePositionOfPager(renderStartY, compWidth, compHeight);
        } else {
            if (compWidth = this._itemMaxWidth * maxCol + (maxCol - 1) * spaceCol, compHeight = maxHeight, 
            contentWidth = compWidth, comp = this._createPager(compStyle), this._pagerComponent = comp, 
            this._innerView.add(comp), contentHeight = maxHeight - comp.AABBBounds.height() - pagerSpace - renderStartY, 
            contentHeight <= 0) return this._innerView.removeChild(comp), !1;
            itemsContainer.getChildren().forEach(((item, index) => {
                const {height: height} = item.attribute;
                contentHeight < startY + height && (startY = 0, startX += this._itemMaxWidth + spaceCol, 
                pages += 1), index > 0 && item.setAttributes({
                    x: startX,
                    y: startY
                }), startY += spaceRow + height;
            }));
            const total = Math.ceil(pages / maxCol);
            this._itemContext.totalPage = total, this._updatePositionOfPager(renderStartY, compWidth, compHeight);
        }
        defaultCurrent > 1 && (isHorizontal ? itemsContainer.setAttribute("y", -(defaultCurrent - 1) * (compHeight + spaceRow)) : itemsContainer.setAttribute("x", -(defaultCurrent - 1) * (compWidth + spaceCol)));
        const clipGroup = graphicCreator.group({
            x: 0,
            y: renderStartY,
            width: isHorizontal ? contentWidth : compWidth,
            height: isHorizontal ? compHeight : contentHeight,
            clip: !0,
            pickable: !1
        });
        return clipGroup.add(itemsContainer), this._innerView.add(clipGroup), this._itemContext.clipContainer = clipGroup, 
        this._bindEventsOfPager(isHorizontal ? compHeight + spaceRow : compWidth + spaceCol, isHorizontal ? "y" : "x"), 
        !0;
    }
    _renderScrollbar() {
        var _a;
        const renderStartY = this._title ? this._title.AABBBounds.height() + get(this.attribute, "title.space", 8) : 0, {maxWidth: maxWidth, item: item = {}, pager: pager = {}} = this.attribute, {spaceCol: spaceCol = DEFAULT_ITEM_SPACE_COL, spaceRow: spaceRow = DEFAULT_ITEM_SPACE_ROW} = item, itemsContainer = this._itemsContainer, {space: pagerSpace = DEFAULT_PAGER_SPACE, defaultCurrent: defaultCurrent = 1} = pager, compStyle = __rest(pager, [ "space", "defaultCurrent" ]), {isHorizontal: isHorizontal} = this._itemContext, maxHeight = this._contentMaxHeight;
        let comp, contentWidth = 0, contentHeight = 0, startY = 0, pages = 1;
        if (isHorizontal) contentWidth = maxWidth, contentHeight = this._itemHeight, comp = this._createScrollbar(compStyle, contentWidth), 
        this._pagerComponent = comp, this._innerView.add(comp); else {
            if (contentHeight = maxHeight - renderStartY, contentWidth = this._itemMaxWidth, 
            comp = this._createScrollbar(compStyle, contentHeight), this._pagerComponent = comp, 
            this._innerView.add(comp), contentHeight <= 0) return this._innerView.removeChild(comp), 
            !1;
            const items = itemsContainer.getChildren(), itemsHeightArr = items.map((item => item.attribute.height));
            if (1 === itemsHeightArr.length || itemsHeightArr.every((entry => entry === itemsHeightArr[0]))) {
                const itemHeight = itemsHeightArr[0], maxContentHeight = contentHeight, pageItemsCount = Math.floor(maxContentHeight / (spaceRow + itemHeight));
                contentHeight = pageItemsCount * (spaceRow + itemHeight), pages = Math.ceil(items.length / pageItemsCount);
            } else items.forEach(((item, index) => {
                const {height: height} = item.attribute, prePages = pages, preStartY = startY;
                pages = Math.floor((startY + height) / contentHeight) + 1, startY += spaceRow + height, 
                prePages !== pages && index === itemsContainer.getChildren().length - 1 && startY - contentHeight >= 1 / 3 * height && (contentHeight = preStartY + height, 
                pages -= 1);
            }));
            this._itemContext.totalPage = pages, this._itemContext.pages = pages;
        }
        if (defaultCurrent > 1) if (isHorizontal) {
            const maxOffset = this._itemsContainer.AABBBounds.width() - contentWidth;
            itemsContainer.setAttribute("x", -Math.min((defaultCurrent - 1) * (contentWidth + spaceCol), maxOffset));
        } else {
            const maxOffset = this._itemsContainer.AABBBounds.height() - contentHeight;
            itemsContainer.setAttribute("y", -Math.min((defaultCurrent - 1) * (contentHeight + spaceRow), maxOffset));
        }
        const clipGroup = graphicCreator.group({
            x: 0,
            y: renderStartY,
            width: contentWidth,
            height: contentHeight,
            clip: !0,
            pickable: !1
        });
        return clipGroup.add(itemsContainer), this._innerView.add(clipGroup), this._itemContext.clipContainer = clipGroup, 
        this._updatePositionOfScrollbar(contentWidth, contentHeight, renderStartY), (null === (_a = pager.scrollMask) || void 0 === _a ? void 0 : _a.visible) && this.renderScrollMask(clipGroup), 
        this._bindEventsOfPager(isHorizontal ? contentWidth : contentHeight, isHorizontal ? "x" : "y"), 
        !0;
    }
    renderScrollMask(clipGroup) {
        const {scrollMask: scrollMask = {}} = this.attribute.pager, {visible: visible = !0, gradientLength: gradientLength = 16, gradientStops: gradientStops} = scrollMask;
        if (!visible || !gradientStops) return;
        const width = clipGroup.AABBBounds.width(), height = clipGroup.AABBBounds.height(), totalLength = this._itemContext.isHorizontal ? width : height, startStops = gradientStops.map((stop => ({
            offset: gradientLength * stop.offset / totalLength,
            color: stop.color
        }))), endStops = gradientStops.map((stop => ({
            offset: (totalLength - gradientLength * stop.offset) / totalLength,
            color: stop.color
        }))), mask = graphicCreator.rect({
            x: 0,
            y: 0,
            width: width,
            height: height
        });
        this._scrollMask = mask, this._scrollMaskContext = {
            startStops: startStops,
            endStops: endStops
        }, this.updateScrollMask(), clipGroup.add(mask);
    }
    updateScrollMask() {
        if (!this._scrollMask || !this._pagerComponent) return;
        if (!this._itemContext.isScrollbar) return;
        const [start, end] = this._pagerComponent.getScrollRange(), stops = [];
        isNumberClose(clamp(end, 0, 1), 1) || stops.push(...this._scrollMaskContext.endStops), 
        isNumberClose(clamp(start, 0, 1), 0) || stops.push(...this._scrollMaskContext.startStops), 
        stops.length && (this._itemContext.isHorizontal ? this._scrollMask.setAttributes({
            fill: {
                gradient: "linear",
                x0: 0,
                y0: 0,
                x1: 1,
                y1: 0,
                stops: stops
            }
        }) : this._scrollMask.setAttributes({
            fill: {
                gradient: "linear",
                x0: 0,
                y0: 0,
                x1: 0,
                y1: 1,
                stops: stops
            }
        }));
    }
    _renderPagerComponent() {
        return this._itemContext.isScrollbar ? this._renderScrollbar() : this._renderPager(), 
        !0;
    }
    _hover(legendItem, e) {
        this._lastActiveItem = legendItem;
        legendItem.hasState(LegendStateValue.selected) ? this._setLegendItemState(legendItem, LegendStateValue.selectedHover, e) : this._setLegendItemState(legendItem, LegendStateValue.unSelectedHover, e);
        const focusButton = legendItem.getChildren()[0].find((node => node.name === LEGEND_ELEMENT_NAME.focus), !1);
        focusButton && focusButton.setAttribute("visible", !0), this._dispatchLegendEvent(LegendEvent.legendItemHover, legendItem, e);
    }
    _unHover(legendItem, e) {
        let attributeUpdate = !1;
        (legendItem.hasState(LegendStateValue.unSelectedHover) || legendItem.hasState(LegendStateValue.selectedHover)) && (attributeUpdate = !0), 
        legendItem.removeState(LegendStateValue.unSelectedHover), legendItem.removeState(LegendStateValue.selectedHover), 
        legendItem.getChildren()[0].getChildren().forEach((child => {
            attributeUpdate || !child.hasState(LegendStateValue.unSelectedHover) && !child.hasState(LegendStateValue.selectedHover) || (attributeUpdate = !0), 
            child.removeState(LegendStateValue.unSelectedHover), child.removeState(LegendStateValue.selectedHover);
        }));
        const focusButton = legendItem.getChildren()[0].find((node => node.name === LEGEND_ELEMENT_NAME.focus), !1);
        focusButton && focusButton.setAttribute("visible", !1), attributeUpdate && this._dispatchLegendEvent(LegendEvent.legendItemAttributeUpdate, legendItem, e), 
        this._dispatchLegendEvent(LegendEvent.legendItemUnHover, legendItem, e);
    }
    _setLegendItemState(legendItem, stateName, e) {
        let attributeUpdate = !1;
        legendItem.hasState(stateName) || (attributeUpdate = !0), legendItem.addState(stateName, true), 
        legendItem.getChildren()[0].getChildren().forEach((child => {
            child.name !== LEGEND_ELEMENT_NAME.focus && (attributeUpdate || child.hasState(stateName) || (attributeUpdate = !0), 
            child.addState(stateName, true));
        })), attributeUpdate && this._dispatchLegendEvent(LegendEvent.legendItemAttributeUpdate, legendItem, e);
    }
    _removeLegendItemState(legendItem, stateNames, e) {
        let attributeUpdate = !1;
        stateNames.forEach((name => {
            !attributeUpdate && legendItem.hasState(name) && (attributeUpdate = !0), legendItem.removeState(name);
        })), legendItem.getChildren()[0].getChildren().forEach((child => {
            child.name !== LEGEND_ELEMENT_NAME.focus && stateNames.forEach((name => {
                !attributeUpdate && child.hasState(name) && (attributeUpdate = !0), child.removeState(name);
            }));
        })), attributeUpdate && this._dispatchLegendEvent(LegendEvent.legendItemAttributeUpdate, legendItem, e);
    }
    _getSelectedLegends() {
        var _a;
        const selectedData = [];
        return null === (_a = this._itemsContainer) || void 0 === _a || _a.getChildren().forEach((item => {
            item.hasState(LegendStateValue.selected) && selectedData.push(item.data);
        })), selectedData;
    }
    _appendDataToShape(shape, name, data, delegateShape, states = {}) {
        shape.name = name, shape.data = data, shape.delegate = delegateShape, shape.states = merge({}, DEFAULT_STATES, states);
    }
    _dispatchLegendEvent(eventName, legendItem, event) {
        const currentSelectedItems = this._getSelectedLegends();
        currentSelectedItems.sort(((pre, next) => pre.index - next.index));
        const currentSelected = currentSelectedItems.map((obj => obj.label));
        this._dispatchEvent(eventName, {
            item: legendItem,
            data: legendItem.data,
            selected: legendItem.hasState(LegendStateValue.selected),
            currentSelectedItems: currentSelectedItems,
            currentSelected: currentSelected,
            event: event
        });
    }
    _handleStyle(config, item, isSelected, index, items) {
        const newConfig = {};
        return config.style && (isFunction(config.style) ? newConfig.style = config.style(item, isSelected, index, items) : newConfig.style = config.style), 
        config.state && (newConfig.state = {}, Object.keys(config.state).forEach((key => {
            config.state[key] && (isFunction(config.state[key]) ? newConfig.state[key] = config.state[key](item, isSelected, index, items) : newConfig.state[key] = config.state[key]);
        }))), newConfig;
    }
    release() {
        super.release(), this.removeAllEventListeners();
    }
}

DiscreteLegend.defaultAttributes = {
    layout: "horizontal",
    title: {
        align: "start",
        space: DEFAULT_TITLE_SPACE,
        textStyle: {
            fontSize: 12,
            fontWeight: "bold",
            fill: "#2C3542"
        }
    },
    item: {
        spaceCol: DEFAULT_ITEM_SPACE_COL,
        spaceRow: DEFAULT_ITEM_SPACE_ROW,
        shape: {
            space: DEFAULT_SHAPE_SPACE,
            style: {
                size: DEFAULT_SHAPE_SIZE,
                cursor: "pointer"
            },
            state: {
                selectedHover: {
                    opacity: .85
                },
                unSelected: {
                    opacity: .5
                }
            }
        },
        label: {
            space: DEFAULT_LABEL_SPACE,
            style: {
                fontSize: 12,
                fill: "#2C3542",
                cursor: "pointer"
            },
            state: {
                selectedHover: {
                    opacity: .85
                },
                unSelected: {
                    fill: "#D8D8D8"
                }
            }
        },
        value: {
            alignRight: !1,
            style: {
                fontSize: 12,
                fill: "#ccc",
                cursor: "pointer"
            },
            state: {
                selectedHover: {
                    opacity: .85
                },
                unSelected: {
                    fill: "#D8D8D8"
                }
            }
        },
        background: {
            style: {
                cursor: "pointer"
            }
        },
        focus: !1,
        focusIconStyle: {
            size: DEFAULT_SHAPE_SIZE,
            symbolType: "M8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1ZM8.75044 2.55077L8.75 3.75H7.25L7.25006 2.5507C4.81247 2.88304 2.88304 4.81247 2.5507 7.25006L3.75 7.25V8.75L2.55077 8.75044C2.8833 11.1878 4.81264 13.117 7.25006 13.4493L7.25 12.25H8.75L8.75044 13.4492C11.1876 13.1167 13.1167 11.1876 13.4492 8.75044L12.25 8.75V7.25L13.4493 7.25006C13.117 4.81264 11.1878 2.8833 8.75044 2.55077ZM8 5.5C9.38071 5.5 10.5 6.61929 10.5 8C10.5 9.38071 9.38071 10.5 8 10.5C6.61929 10.5 5.5 9.38071 5.5 8C5.5 6.61929 6.61929 5.5 8 5.5ZM8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7Z",
            fill: "#333",
            cursor: "pointer"
        }
    },
    autoPage: !0,
    pager: {
        space: DEFAULT_PAGER_SPACE,
        handler: {
            style: {
                size: 10
            },
            space: 4
        }
    },
    hover: !0,
    select: !0,
    selectMode: "multiple",
    allowAllCanceled: !0
};
//# sourceMappingURL=discrete.js.map
