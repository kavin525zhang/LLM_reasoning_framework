import { array, isNumber, isString } from "@visactor/vutils";

export const generateFilterValue = options => options.filterField ? el => {
    var _a;
    return null === (_a = el.getDatum()) || void 0 === _a ? void 0 : _a[options.filterField];
} : el => el[options.filterType];

export const groupMarksByState = (marks, states) => {
    if (!states || !marks) return null;
    const res = {};
    return marks.forEach((mark => {
        const markSpec = mark && mark.getSpec(), encode = markSpec && markSpec.encode;
        encode && states.forEach((state => {
            state && encode[state] && (res[state] || (res[state] = []), res[state].push(mark));
        }));
    })), res;
};

export const parseTriggerOffOfSelect = triggerOff => {
    const triggerOffArray = array(triggerOff), resetType = [], eventNames = [];
    return triggerOffArray.forEach((off => {
        "empty" === off ? resetType.push("view") : isString(off) && "none" !== off ? off.includes("view:") ? (eventNames.push(off.replace("view:", "")), 
        resetType.push("view")) : (eventNames.push(off), resetType.push("self")) : isNumber(off) && resetType.push("timeout");
    })), {
        eventNames: eventNames,
        resetType: resetType
    };
};
//# sourceMappingURL=utils.js.map
