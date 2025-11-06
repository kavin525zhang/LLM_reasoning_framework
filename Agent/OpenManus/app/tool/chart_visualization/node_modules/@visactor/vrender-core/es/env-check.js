import { application } from "./application";

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

export function isBrowserEnv() {
    initIsBrowserEnv();
    const env = application.global && application.global.env;
    return env ? "browser" === env : _isBrowserEnv;
}

export function isNodeEnv() {
    initIsBrowserEnv();
    const env = application.global && application.global.env;
    return env ? "node" === env : !_isBrowserEnv;
}

export function getCurrentEnv() {
    return isBrowserEnv() ? "browser" : "node";
}
//# sourceMappingURL=env-check.js.map