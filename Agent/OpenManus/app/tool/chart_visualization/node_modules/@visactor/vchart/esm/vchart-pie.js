import { VChart } from "./core";

import { registerPieChart } from "./chart/pie/pie";

import { registerLabel } from "./component/label/label";

import { registerTooltip } from "./component/tooltip/tooltip";

import { registerDiscreteLegend } from "./component/legend/discrete/legend";

import { registerCanvasTooltipHandler, registerDomTooltipHandler } from "./plugin/components";

export * from "./core";

VChart.useRegisters([ registerPieChart, registerDiscreteLegend, registerTooltip, registerLabel, registerDomTooltipHandler, registerCanvasTooltipHandler ]);

export { VChart };

export default VChart;
//# sourceMappingURL=vchart-pie.js.map