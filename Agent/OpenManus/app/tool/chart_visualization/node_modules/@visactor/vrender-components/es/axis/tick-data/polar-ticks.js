import { isContinuous, isDiscrete } from "@visactor/vscale";

import { continuousTicks } from "./continuous";

import { convertDomainToTickData } from "./util";

import { polarAngleAxisDiscreteTicks } from "./discrete/polar-angle";

export const polarTicks = (scale, op) => isContinuous(scale.type) ? continuousTicks(scale, op) : isDiscrete(scale.type) && "polar" === op.coordinateType && "angle" === op.axisOrientType ? polarAngleAxisDiscreteTicks(scale, op) : convertDomainToTickData(scale.domain());
//# sourceMappingURL=polar-ticks.js.map
