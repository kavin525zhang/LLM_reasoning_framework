"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.parseTriggerOffOfSelect = exports.groupMarksByState = exports.generateFilterValue = void 0;

const vutils_1 = require("@visactor/vutils"), generateFilterValue = options => options.filterField ? el => {
    var _a;
    return null === (_a = el.getDatum()) || void 0 === _a ? void 0 : _a[options.filterField];
} : el => el[options.filterType];

exports.generateFilterValue = generateFilterValue;

const groupMarksByState = (marks, states) => {
    if (!states || !marks) return null;
    const res = {};
    return marks.forEach((mark => {
        const markSpec = mark && mark.getSpec(), encode = markSpec && markSpec.encode;
        encode && states.forEach((state => {
            state && encode[state] && (res[state] || (res[state] = []), res[state].push(mark));
        }));
    })), res;
};

exports.groupMarksByState = groupMarksByState;

const parseTriggerOffOfSelect = triggerOff => {
    const triggerOffArray = (0, vutils_1.array)(triggerOff), resetType = [], eventNames = [];
    return triggerOffArray.forEach((off => {
        "empty" === off ? resetType.push("view") : (0, vutils_1.isString)(off) && "none" !== off ? off.includes("view:") ? (eventNames.push(off.replace("view:", "")), 
        resetType.push("view")) : (eventNames.push(off), resetType.push("self")) : (0, vutils_1.isNumber)(off) && resetType.push("timeout");
    })), {
        eventNames: eventNames,
        resetType: resetType
    };
};

exports.parseTriggerOffOfSelect = parseTriggerOffOfSelect;
//# sourceMappingURL=utils.js.map
