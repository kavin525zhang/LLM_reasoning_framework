import { mixin } from "@visactor/vutils";

import { LinearScale } from "./linear-scale";

import { ScaleEnum } from "./type";

import { d3TicksForLog, forceTicksBaseTransform, ticksBaseTransform } from "./utils/tick-sample";

import { symlog, symexp } from "./utils/utils";

import { LogNiceMixin } from "./log-nice-mixin";

export class SymlogScale extends LinearScale {
    constructor() {
        super(symlog(1), symexp(1)), this.type = ScaleEnum.Symlog, this._const = 1;
    }
    clone() {
        return (new SymlogScale).domain(this._domain, !0).range(this._range, !0).unknown(this._unknown).clamp(this.clamp(), null, !0).interpolate(this._interpolate, !0).constant(this._const);
    }
    constant(_, slience) {
        return arguments.length ? (this._const = _, this.transformer = symlog(_), this.untransformer = symexp(_), 
        this.rescale(slience)) : this._const;
    }
    d3Ticks(count = 10, options) {
        const d = this.domain(), u = d[0], v = d[d.length - 1];
        return d3TicksForLog(u, v, count, this._const, this.transformer, this.untransformer, options);
    }
    ticks(count = 10) {
        const d = this.calculateVisibleDomain(this._range);
        return ticksBaseTransform(d[0], d[d.length - 1], count, this._const, this.transformer, this.untransformer);
    }
    forceTicks(count = 10) {
        const d = this.calculateVisibleDomain(this._range);
        return forceTicksBaseTransform(d[0], d[d.length - 1], count, this.transformer, this.untransformer);
    }
    stepTicks(step) {
        const d = this.calculateVisibleDomain(this._range);
        return forceTicksBaseTransform(d[0], d[d.length - 1], step, this.transformer, this.untransformer);
    }
}

mixin(SymlogScale, LogNiceMixin);
//# sourceMappingURL=symlog-scale.js.map