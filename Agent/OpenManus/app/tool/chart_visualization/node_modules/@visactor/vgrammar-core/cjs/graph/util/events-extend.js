"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
});

const point_1 = require("./point"), constants_1 = require("../../view/constants"), constants_2 = require("../constants");

function getExtendedEvents(view, event, type, source) {
    var _a, _b;
    if (source === constants_1.EVENT_SOURCE_WINDOW) {
        const e = event.changedTouches ? event.changedTouches[0] : event;
        (0, point_1.point)(e);
    }
    let element = null === (_a = event.target) || void 0 === _a ? void 0 : _a[constants_2.BridgeElementKey];
    if (!element && source === constants_1.EVENT_SOURCE_VIEW) {
        let target = event.target;
        const rootGraphic = null === (_b = view.rootMark) || void 0 === _b ? void 0 : _b.graphicItem;
        for (;(null == target ? void 0 : target.parent) && target.parent !== rootGraphic; ) if (target = target.parent, 
        target[constants_2.BridgeElementKey]) {
            element = target[constants_2.BridgeElementKey];
            break;
        }
    }
    return event.element = element, event;
}

exports.default = getExtendedEvents;
//# sourceMappingURL=events-extend.js.map
