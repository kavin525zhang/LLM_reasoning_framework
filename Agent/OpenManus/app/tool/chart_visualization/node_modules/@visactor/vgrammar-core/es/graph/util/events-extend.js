import { point } from "./point";

import { EVENT_SOURCE_VIEW, EVENT_SOURCE_WINDOW } from "../../view/constants";

import { BridgeElementKey } from "../constants";

export default function getExtendedEvents(view, event, type, source) {
    var _a, _b;
    if (source === EVENT_SOURCE_WINDOW) {
        const e = event.changedTouches ? event.changedTouches[0] : event;
        point(e);
    }
    let element = null === (_a = event.target) || void 0 === _a ? void 0 : _a[BridgeElementKey];
    if (!element && source === EVENT_SOURCE_VIEW) {
        let target = event.target;
        const rootGraphic = null === (_b = view.rootMark) || void 0 === _b ? void 0 : _b.graphicItem;
        for (;(null == target ? void 0 : target.parent) && target.parent !== rootGraphic; ) if (target = target.parent, 
        target[BridgeElementKey]) {
            element = target[BridgeElementKey];
            break;
        }
    }
    return event.element = element, event;
}
//# sourceMappingURL=events-extend.js.map
