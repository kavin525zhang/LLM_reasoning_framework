"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
    void 0 === k2 && (k2 = k);
    var desc = Object.getOwnPropertyDescriptor(m, k);
    desc && !("get" in desc ? !m.__esModule : desc.writable || desc.configurable) || (desc = {
        enumerable: !0,
        get: function() {
            return m[k];
        }
    }), Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    void 0 === k2 && (k2 = k), o[k2] = m[k];
}), __exportStar = this && this.__exportStar || function(m, exports) {
    for (var p in m) "default" === p || Object.prototype.hasOwnProperty.call(exports, p) || __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.VChart = void 0;

const core_1 = require("./core");

Object.defineProperty(exports, "VChart", {
    enumerable: !0,
    get: function() {
        return core_1.VChart;
    }
});

const pie_1 = require("./chart/pie/pie"), label_1 = require("./component/label/label"), tooltip_1 = require("./component/tooltip/tooltip"), legend_1 = require("./component/legend/discrete/legend"), components_1 = require("./plugin/components");

__exportStar(require("./core"), exports), core_1.VChart.useRegisters([ pie_1.registerPieChart, legend_1.registerDiscreteLegend, tooltip_1.registerTooltip, label_1.registerLabel, components_1.registerDomTooltipHandler, components_1.registerCanvasTooltipHandler ]), 
exports.default = core_1.VChart;
//# sourceMappingURL=vchart-pie.js.map