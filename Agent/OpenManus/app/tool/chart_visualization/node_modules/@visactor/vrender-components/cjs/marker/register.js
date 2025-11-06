"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.loadMarkPointComponent = exports.loadMarkArcAreaComponent = exports.loadMarkAreaComponent = exports.loadMarkArcLineComponent = exports.loadMarkLineComponent = void 0;

const vrender_kits_1 = require("@visactor/vrender-kits"), register_1 = require("../tag/register"), register_2 = require("../segment/register");

function loadBaseMarker() {
    (0, vrender_kits_1.registerGroup)(), (0, register_1.loadTagComponent)();
}

function loadMarkLineComponent() {
    loadBaseMarker(), (0, register_2.loadSegmentComponent)();
}

function loadMarkArcLineComponent() {
    loadBaseMarker(), (0, register_2.loadArcSegmentComponent)();
}

function loadMarkAreaComponent() {
    loadBaseMarker(), (0, vrender_kits_1.registerPolygon)();
}

function loadMarkArcAreaComponent() {
    loadBaseMarker(), (0, vrender_kits_1.registerArc)();
}

function loadMarkPointComponent() {
    loadBaseMarker(), (0, register_2.loadSegmentComponent)(), (0, register_2.loadArcSegmentComponent)(), 
    (0, vrender_kits_1.registerSymbol)(), (0, vrender_kits_1.registerImage)(), (0, vrender_kits_1.registerLine)();
}

exports.loadMarkLineComponent = loadMarkLineComponent, exports.loadMarkArcLineComponent = loadMarkArcLineComponent, 
exports.loadMarkAreaComponent = loadMarkAreaComponent, exports.loadMarkArcAreaComponent = loadMarkArcAreaComponent, 
exports.loadMarkPointComponent = loadMarkPointComponent;
//# sourceMappingURL=register.js.map
