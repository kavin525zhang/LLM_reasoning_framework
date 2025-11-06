"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.SymlogScale = void 0;

const vutils_1 = require("@visactor/vutils"), linear_scale_1 = require("./linear-scale"), type_1 = require("./type"), tick_sample_1 = require("./utils/tick-sample"), utils_1 = require("./utils/utils"), log_nice_mixin_1 = require("./log-nice-mixin");

class SymlogScale extends linear_scale_1.LinearScale {
    constructor() {
        super((0, utils_1.symlog)(1), (0, utils_1.symexp)(1)), this.type = type_1.ScaleEnum.Symlog, 
        this._const = 1;
    }
    clone() {
        return (new SymlogScale).domain(this._domain, !0).range(this._range, !0).unknown(this._unknown).clamp(this.clamp(), null, !0).interpolate(this._interpolate, !0).constant(this._const);
    }
    constant(_, slience) {
        return arguments.length ? (this._const = _, this.transformer = (0, utils_1.symlog)(_), 
        this.untransformer = (0, utils_1.symexp)(_), this.rescale(slience)) : this._const;
    }
    d3Ticks(count = 10, options) {
        const d = this.domain(), u = d[0], v = d[d.length - 1];
        return (0, tick_sample_1.d3TicksForLog)(u, v, count, this._const, this.transformer, this.untransformer, options);
    }
    ticks(count = 10) {
        const d = this.calculateVisibleDomain(this._range);
        return (0, tick_sample_1.ticksBaseTransform)(d[0], d[d.length - 1], count, this._const, this.transformer, this.untransformer);
    }
    forceTicks(count = 10) {
        const d = this.calculateVisibleDomain(this._range);
        return (0, tick_sample_1.forceTicksBaseTransform)(d[0], d[d.length - 1], count, this.transformer, this.untransformer);
    }
    stepTicks(step) {
        const d = this.calculateVisibleDomain(this._range);
        return (0, tick_sample_1.forceTicksBaseTransform)(d[0], d[d.length - 1], step, this.transformer, this.untransformer);
    }
}

exports.SymlogScale = SymlogScale, (0, vutils_1.mixin)(SymlogScale, log_nice_mixin_1.LogNiceMixin);
//# sourceMappingURL=symlog-scale.js.map