"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.autoHide = void 0;

const vutils_1 = require("@visactor/vutils"), util_1 = require("../util"), methods = {
    parity: function(items) {
        return items.filter(((item, i) => i % 2 ? item.setAttribute("opacity", 0) : 1));
    },
    greedy: function(items, sep) {
        let a;
        return items.filter(((b, i) => i && (0, util_1.textIntersect)(a, b, sep) ? b.setAttribute("opacity", 0) : (a = b, 
        1)));
    }
};

function hasBounds(item) {
    let bounds;
    return bounds = item.OBBBounds.empty() ? item.AABBBounds : item.OBBBounds, bounds.width() > 1 && bounds.height() > 1;
}

function reset(items) {
    return items.forEach((item => item.setAttribute("opacity", 1))), items;
}

function forceItemVisible(sourceItem, items, check, comparator, inverse = !1) {
    if (check && !sourceItem.attribute.opacity) {
        const remainLength = items.length;
        if (remainLength > 1) {
            sourceItem.setAttribute("opacity", 1);
            for (let i = 0; i < remainLength; i++) {
                const item = inverse ? items[remainLength - 1 - i] : items[i];
                if (!comparator(item)) break;
                item.setAttribute("opacity", 0);
            }
        }
    }
}

function autoHide(labels, config) {
    if ((0, vutils_1.isEmpty)(labels)) return;
    const source = labels.filter(hasBounds);
    if ((0, vutils_1.isEmpty)(source)) return;
    let items;
    items = reset(source);
    const {method: method = "parity", separation: sep = 0} = config, reduce = (0, vutils_1.isFunction)(method) ? method : methods[method] || methods.parity;
    if (items.length >= 3 && (0, util_1.hasOverlap)(items, sep)) {
        do {
            items = reduce(items, sep);
        } while (items.length >= 3 && (0, util_1.hasOverlap)(items, sep));
        const shouldCheck = (length, visibility, checkLength = !0) => checkLength && length < 3 || visibility, checkFirst = shouldCheck(items.length, config.firstVisible, !1);
        let checkLast = shouldCheck(items.length, config.lastVisible);
        const firstSourceItem = source[0], lastSourceItem = (0, vutils_1.last)(source);
        (0, util_1.textIntersect)(firstSourceItem, lastSourceItem, sep) && checkFirst && checkLast && (lastSourceItem.setAttribute("opacity", 0), 
        checkLast = !1), forceItemVisible(firstSourceItem, items, checkFirst, (item => (0, 
        util_1.textIntersect)(item, firstSourceItem, sep))), forceItemVisible(lastSourceItem, items, checkLast, (item => (0, 
        util_1.textIntersect)(item, lastSourceItem, sep) || !(!checkFirst || item === firstSourceItem) && (0, 
        util_1.textIntersect)(item, firstSourceItem, sep)), !0);
    }
    source.forEach((item => {
        item.setAttribute("visible", !!item.attribute.opacity);
    }));
}

exports.autoHide = autoHide;
//# sourceMappingURL=auto-hide.js.map
