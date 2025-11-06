"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.point = void 0;

const vutils_1 = require("@visactor/vutils");

function point(event) {
    [ "touches", "changedTouches", "targetTouches" ].forEach((touchKey => {
        event[touchKey] && event[touchKey].length && Array.from(event[touchKey]).forEach((touch => {
            defineSrPosition(touch, clientToLocal(touch), !1);
        }));
    }));
    const pos = clientToLocal(event);
    return defineSrPosition(event, pos);
}

function clientToLocal(e) {
    return (0, vutils_1.isNil)(e.offsetX) ? (0, vutils_1.isNil)(e.x) ? e.changedTouches && e.changedTouches.length ? getChangedTouchesPos(e) : {
        canvasX: 0,
        canvasY: 0
    } : getXYPos(e) : getOffsetPos(e);
}

function getOffsetPos(e) {
    return {
        canvasX: e.offsetX,
        canvasY: e.offsetY
    };
}

function getXYPos(e) {
    return {
        canvasX: e.x,
        canvasY: e.y
    };
}

function getChangedTouchesPos(e) {
    const pos = e.changedTouches[0];
    return {
        canvasX: pos.x,
        canvasY: pos.y
    };
}

function defineSrPosition(event, pos, client = !0) {
    const keys = [ "canvasX", "canvasY" ];
    return client && (keys.push("clientX"), keys.push("clientY")), keys.forEach((key => {
        (0, vutils_1.isValidNumber)(pos[key]) && Object.defineProperty(event, key, {
            value: pos[key],
            writable: !0
        });
    })), [ pos.canvasX, pos.canvasY ];
}

exports.point = point;
//# sourceMappingURL=point.js.map
