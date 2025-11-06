"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.loadPolygonSectorCrosshairComponent = exports.loadSectorCrosshairComponent = exports.loadRectCrosshairComponent = exports.loadPolygonCrosshairComponent = exports.loadCircleCrosshairComponent = exports.loadLineCrosshairComponent = void 0;

const vrender_kits_1 = require("@visactor/vrender-kits");

function loadLineCrosshairComponent() {
    (0, vrender_kits_1.registerGroup)(), (0, vrender_kits_1.registerLine)();
}

function loadCircleCrosshairComponent() {
    (0, vrender_kits_1.registerGroup)(), (0, vrender_kits_1.registerArc)();
}

function loadPolygonCrosshairComponent() {
    (0, vrender_kits_1.registerGroup)(), (0, vrender_kits_1.registerPath)();
}

function loadRectCrosshairComponent() {
    (0, vrender_kits_1.registerGroup)(), (0, vrender_kits_1.registerRect)();
}

function loadSectorCrosshairComponent() {
    (0, vrender_kits_1.registerGroup)(), (0, vrender_kits_1.registerArc)();
}

function loadPolygonSectorCrosshairComponent() {
    (0, vrender_kits_1.registerGroup)(), (0, vrender_kits_1.registerPath)();
}

exports.loadLineCrosshairComponent = loadLineCrosshairComponent, exports.loadCircleCrosshairComponent = loadCircleCrosshairComponent, 
exports.loadPolygonCrosshairComponent = loadPolygonCrosshairComponent, exports.loadRectCrosshairComponent = loadRectCrosshairComponent, 
exports.loadSectorCrosshairComponent = loadSectorCrosshairComponent, exports.loadPolygonSectorCrosshairComponent = loadPolygonSectorCrosshairComponent;
//# sourceMappingURL=register.js.map