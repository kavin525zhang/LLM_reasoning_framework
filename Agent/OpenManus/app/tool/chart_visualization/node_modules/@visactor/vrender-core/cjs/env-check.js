"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getCurrentEnv = exports.isNodeEnv = exports.isBrowserEnv = void 0;

const application_1 = require("./application");

let _isBrowserEnv;

function initIsBrowserEnv() {
    if (null == _isBrowserEnv) try {
        const canvas = document.createElement("canvas"), ctx = canvas.getContext("2d");
        _isBrowserEnv = !!(window && canvas.getBoundingClientRect && requestAnimationFrame && window.devicePixelRatio && ctx && ctx.isPointInPath && ctx.isPointInStroke), 
        _isBrowserEnv && (_isBrowserEnv = !!document.createElement);
    } catch (err) {
        _isBrowserEnv = !1;
    }
}

function isBrowserEnv() {
    initIsBrowserEnv();
    const env = application_1.application.global && application_1.application.global.env;
    return env ? "browser" === env : _isBrowserEnv;
}

function isNodeEnv() {
    initIsBrowserEnv();
    const env = application_1.application.global && application_1.application.global.env;
    return env ? "node" === env : !_isBrowserEnv;
}

function getCurrentEnv() {
    return isBrowserEnv() ? "browser" : "node";
}

exports.isBrowserEnv = isBrowserEnv, exports.isNodeEnv = isNodeEnv, exports.getCurrentEnv = getCurrentEnv;
//# sourceMappingURL=env-check.js.map