"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.permit = exports.prevent = void 0;

const vutils_1 = require("@visactor/vutils");

function prevent(eventConfig, type) {
    const def = eventConfig.defaults, prevent = def.prevent, allow = def.allow;
    return !1 !== prevent && !0 !== allow && (!0 === prevent || !1 === allow || (prevent ? prevent[type] : !!allow && !allow[type]));
}

function permit(eventConfig, key, type) {
    const rule = null == eventConfig ? void 0 : eventConfig[key];
    return !(!1 === rule || (0, vutils_1.isObject)(rule) && !rule[type]);
}

exports.prevent = prevent, exports.permit = permit;
//# sourceMappingURL=events.js.map
