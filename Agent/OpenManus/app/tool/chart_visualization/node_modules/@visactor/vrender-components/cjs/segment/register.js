"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.loadArcSegmentComponent = exports.loadSegmentComponent = void 0;

const vrender_kits_1 = require("@visactor/vrender-kits");

function loadSegmentComponent() {
    (0, vrender_kits_1.registerGroup)(), (0, vrender_kits_1.registerLine)(), (0, vrender_kits_1.registerPolygon)(), 
    (0, vrender_kits_1.registerSymbol)();
}

function loadArcSegmentComponent() {
    (0, vrender_kits_1.registerGroup)(), (0, vrender_kits_1.registerLine)(), (0, vrender_kits_1.registerArc)(), 
    (0, vrender_kits_1.registerSymbol)();
}

exports.loadSegmentComponent = loadSegmentComponent, exports.loadArcSegmentComponent = loadArcSegmentComponent;
//# sourceMappingURL=register.js.map
