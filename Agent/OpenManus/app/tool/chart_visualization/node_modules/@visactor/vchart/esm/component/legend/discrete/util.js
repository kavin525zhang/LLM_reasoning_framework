var __rest = this && this.__rest || function(s, e) {
    var t = {};
    for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0 && (t[p] = s[p]);
    if (null != s && "function" == typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (p = Object.getOwnPropertySymbols(s); i < p.length; i++) e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]) && (t[p[i]] = s[p[i]]);
    }
    return t;
};

import { isEmpty, isValid } from "@visactor/vutils";

import { isPercent } from "../../../util/space";

import { mergeSpec } from "@visactor/vutils-extension";

import { transformComponentStyle, transformToGraphic } from "../../../util/style";

import { transformLegendTitleAttributes } from "../util";

export function getLegendAttributes(spec, rect) {
    const {title: title = {}, item: item = {}, pager: pager = {}, background: background = {}, type: type, id: id, visible: visible, orient: orient, position: position, data: data, filter: filter, regionId: regionId, regionIndex: regionIndex, seriesIndex: seriesIndex, seriesId: seriesId, padding: padding} = spec, attrs = __rest(spec, [ "title", "item", "pager", "background", "type", "id", "visible", "orient", "position", "data", "filter", "regionId", "regionIndex", "seriesIndex", "seriesId", "padding" ]);
    return title.visible ? attrs.title = transformLegendTitleAttributes(title) : attrs.title = {
        visible: !1
    }, isEmpty(item.focusIconStyle) || transformToGraphic(item.focusIconStyle), item.shape && (item.shape = transformComponentStyle(item.shape)), 
    item.label && (item.label = transformComponentStyle(item.label)), item.value && (item.value = transformComponentStyle(item.value)), 
    item.background && (item.background = transformComponentStyle(item.background)), 
    isPercent(item.maxWidth) && (item.maxWidth = Number(item.maxWidth.substring(0, item.maxWidth.length - 1)) * rect.width / 100), 
    isPercent(item.width) && (item.width = Number(item.width.substring(0, item.width.length - 1)) * rect.width / 100), 
    isPercent(item.height) && (item.height = Number(item.height.substring(0, item.height.length - 1)) * rect.width / 100), 
    attrs.item = item, "scrollbar" === pager.type ? (isEmpty(pager.railStyle) || transformToGraphic(pager.railStyle), 
    isEmpty(pager.sliderStyle) || transformToGraphic(pager.sliderStyle)) : (isEmpty(pager.textStyle) || transformToGraphic(pager.textStyle), 
    pager.handler && transformComponentStyle(pager.handler)), attrs.pager = pager, background.visible && !isEmpty(background.style) && (mergeSpec(attrs, background.style), 
    isValid(background.padding) && (attrs.padding = background.padding)), attrs;
}
//# sourceMappingURL=util.js.map
