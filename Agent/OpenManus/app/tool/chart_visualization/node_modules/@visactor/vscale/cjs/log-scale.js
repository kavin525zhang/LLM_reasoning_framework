"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.LogScale = void 0;

const tick_sample_1 = require("./utils/tick-sample"), continuous_scale_1 = require("./continuous-scale"), type_1 = require("./type"), utils_1 = require("./utils/utils"), vutils_1 = require("@visactor/vutils"), log_nice_mixin_1 = require("./log-nice-mixin");

function reflect(f) {
    return x => -f(-x);
}

function limitPositiveZero(min = Number.EPSILON) {
    return x => Math.max(x, min);
}

function limitNegativeZero(min = Number.EPSILON) {
    return x => Math.min(x, -min);
}

class LogScale extends continuous_scale_1.ContinuousScale {
    constructor() {
        super((0, utils_1.logp)(10), (0, utils_1.powp)(10)), this.type = type_1.ScaleEnum.Log, 
        this._limit = limitPositiveZero(), this._logs = this.transformer, this._pows = this.untransformer, 
        this._domain = [ 1, 10 ], this._base = 10;
    }
    clone() {
        return (new LogScale).domain(this._domain, !0).range(this._range, !0).unknown(this._unknown).clamp(this.clamp(), null, !0).interpolate(this._interpolate, !0).base(this._base);
    }
    rescale(slience) {
        var _a;
        if (slience) return this;
        super.rescale();
        const logs = (0, utils_1.logp)(this._base), pows = (0, utils_1.powp)(this._base);
        return (null !== (_a = this._niceDomain) && void 0 !== _a ? _a : this._domain)[0] < 0 ? (this._logs = reflect(logs), 
        this._pows = reflect(pows), this._limit = limitNegativeZero(), this.transformer = utils_1.logNegative, 
        this.untransformer = utils_1.expNegative) : (this._logs = logs, this._pows = pows, 
        this._limit = limitPositiveZero(), this.transformer = this._logs, this.untransformer = pows), 
        this;
    }
    scale(x) {
        var _a;
        if (x = Number(x), Number.isNaN(x) || this._domainValidator && !this._domainValidator(x)) return this._unknown;
        this._output || (this._output = this._piecewise((null !== (_a = this._niceDomain) && void 0 !== _a ? _a : this._domain).map(this._limit).map(this.transformer), this._calculateWholeRange(this._range), this._interpolate));
        const output = this._output(this.transformer(this._limit(this._clamp(x))));
        return this._fishEyeTransform ? this._fishEyeTransform(output) : output;
    }
    base(_, slience) {
        return arguments.length ? (this._base = _, this.rescale(slience)) : this._base;
    }
    tickFormat() {
        return utils_1.identity;
    }
    d3Ticks(count = 10, options) {
        const d = this.domain(), u = this._limit(d[0]), v = this._limit(d[d.length - 1]);
        return (0, tick_sample_1.d3TicksForLog)(u, v, count, this._base, this.transformer, this.untransformer, options);
    }
    ticks(count = 10) {
        const d = this.calculateVisibleDomain(this._range);
        return (0, tick_sample_1.ticksBaseTransform)(this._limit(d[0]), this._limit(d[d.length - 1]), count, this._base, this.transformer, this.untransformer);
    }
    forceTicks(count = 10) {
        const d = this.calculateVisibleDomain(this._range);
        return (0, tick_sample_1.forceTicksBaseTransform)(d[0], d[d.length - 1], count, this.transformer, this.untransformer);
    }
    stepTicks(step) {
        const d = this.calculateVisibleDomain(this._range);
        return (0, tick_sample_1.forceTicksBaseTransform)(this._limit(d[0]), this._limit(d[d.length - 1]), step, this.transformer, this.untransformer);
    }
    getNiceConfig() {
        return {
            floor: x => this._pows(Math.floor(this._logs(this._limit(x)))),
            ceil: x => Math.abs(x) >= 1 ? Math.ceil(x) : this._pows(Math.ceil(this._logs(this._limit(x))))
        };
    }
}

exports.LogScale = LogScale, (0, vutils_1.mixin)(LogScale, log_nice_mixin_1.LogNiceMixin);
//# sourceMappingURL=log-scale.js.map