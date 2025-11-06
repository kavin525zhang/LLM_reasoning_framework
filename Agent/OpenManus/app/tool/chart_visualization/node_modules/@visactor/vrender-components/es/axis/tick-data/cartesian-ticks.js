import { isContinuous, isDiscrete } from "@visactor/vscale";

import { continuousTicks } from "./continuous";

import { linearDiscreteTicks } from "./discrete/linear";

import { convertDomainToTickData } from "./util";

export const cartesianTicks = (scale, op) => isContinuous(scale.type) ? continuousTicks(scale, op) : isDiscrete(scale.type) && "cartesian" === op.coordinateType ? linearDiscreteTicks(scale, op) : convertDomainToTickData(scale.domain());
//# sourceMappingURL=cartesian-ticks.js.map
