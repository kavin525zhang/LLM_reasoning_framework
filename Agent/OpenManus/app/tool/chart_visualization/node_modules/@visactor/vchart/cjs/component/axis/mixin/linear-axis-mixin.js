"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.LinearAxisMixin = exports.e2 = exports.e5 = exports.e10 = void 0;

const vutils_1 = require("@visactor/vutils"), array_1 = require("../../../util/array"), util_1 = require("../util"), event_1 = require("../../../constant/event"), common_1 = require("../cartesian/util/common"), break_data_1 = require("./util/break-data");

exports.e10 = Math.sqrt(50), exports.e5 = Math.sqrt(10), exports.e2 = Math.sqrt(2);

const DEFAULT_TICK_COUNT = 5;

class LinearAxisMixin {
    constructor() {
        this._extend = {}, this.niceLabelFormatter = null;
    }
    setExtraAttrFromSpec() {
        (0, vutils_1.isValid)(this._spec.nice) && (this._nice = this._spec.nice), (0, vutils_1.isValid)(this._spec.zero) && (this._zero = this._spec.zero), 
        this._expand = this._spec.expand, this._domain = (0, util_1.getLinearAxisSpecDomain)(this._spec);
    }
    transformScaleDomain() {
        this.setScaleNice();
    }
    setLinearScaleNice() {
        var _a;
        if (!this._nice) return !1;
        let tickCount = 5;
        const tick = this._spec.tick || {};
        if ((0, vutils_1.isValidNumber)(tick.forceTickCount)) tickCount = tick.forceTickCount; else if ((0, 
        vutils_1.isFunction)(tick.tickCount)) {
            const range = this._scale.range();
            let rangeSize = Math.abs((0, vutils_1.last)(range) - range[0]);
            if (1 === rangeSize && this._option) {
                rangeSize = (0, common_1.isXAxis)(this._orient) ? this._option.getChartViewRect().width : this._option.getChartViewRect().height;
            }
            tickCount = tick.tickCount({
                axisLength: rangeSize,
                labelStyle: this._spec.label && this._spec.label.style
            });
        } else tickCount = (0, vutils_1.isValidNumber)(tick.tickCount) ? tick.tickCount : 5;
        "accurateFirst" === this._spec.niceType && (tickCount = Math.max(5, tickCount));
        const {min: min, max: max} = null !== (_a = this._domain) && void 0 !== _a ? _a : {};
        return (0, vutils_1.isNil)(min) && (0, vutils_1.isNil)(max) && (0, vutils_1.isNil)(this._softMaxValue) && (0, 
        vutils_1.isNil)(this._softMinValue) ? this._scale.nice(tickCount) : ((0, vutils_1.isValid)(min) || (0, 
        vutils_1.isValid)(this._softMinValue)) && (0, vutils_1.isNil)(max) && (0, vutils_1.isNil)(this._softMaxValue) ? this._scale.niceMax(tickCount) : !(!(0, 
        vutils_1.isNil)(min) || !(0, vutils_1.isNil)(this._softMinValue) || !(0, vutils_1.isValid)(max) && !(0, 
        vutils_1.isValid)(this._softMaxValue)) && this._scale.niceMin(tickCount);
    }
    setLogScaleNice() {
        var _a;
        if (!this._nice) return !1;
        const {min: min, max: max} = null !== (_a = this._domain) && void 0 !== _a ? _a : {};
        return (0, vutils_1.isNil)(min) && (0, vutils_1.isNil)(max) && (0, vutils_1.isNil)(this._softMaxValue) && (0, 
        vutils_1.isNil)(this._softMinValue) ? this._scale.nice() : ((0, vutils_1.isValid)(min) || (0, 
        vutils_1.isValid)(this._softMinValue)) && (0, vutils_1.isNil)(max) && (0, vutils_1.isNil)(this._softMaxValue) ? this._scale.niceMax() : !(!(0, 
        vutils_1.isNil)(min) || !(0, vutils_1.isNil)(this._softMinValue) || !(0, vutils_1.isValid)(max) && !(0, 
        vutils_1.isValid)(this._softMaxValue)) && this._scale.niceMin();
    }
    setScaleNice() {
        return "log" === this._spec.type ? this.setLogScaleNice() : this.setLinearScaleNice();
    }
    dataToPosition(values, cfg) {
        return this.valueToPosition(values[0]);
    }
    valueToPosition(value) {
        return this._scale.scale(value);
    }
    computeLinearDomain(data) {
        let domain = [];
        if (data.length) {
            const userSetBreaks = this._spec.breaks && this._spec.breaks.length;
            let minDomain, maxDomain, values = [];
            if (data.forEach((d => {
                const {min: min, max: max} = d;
                minDomain = void 0 === minDomain ? min : Math.min(minDomain, min), maxDomain = void 0 === maxDomain ? max : Math.max(maxDomain, max), 
                userSetBreaks && (values = values.concat(d.values));
            })), userSetBreaks) {
                const breakRanges = [], breaks = [], breakMaxLimit = (0, vutils_1.isNil)(this._domain.max) ? maxDomain : this._domain.max;
                for (let index = 0; index < this._spec.breaks.length; index++) {
                    const {range: range} = this._spec.breaks[index];
                    range[0] <= range[1] && range[1] <= breakMaxLimit && (breakRanges.push(range), breaks.push(this._spec.breaks[index]));
                }
                if (breakRanges.sort(((a, b) => a[0] - b[0])), breakRanges.length) {
                    const {domain: breakDomains, scope: breakScopes} = (0, break_data_1.breakData)(values, (0, 
                    array_1.combineDomains)(breakRanges), this._spec.breaks[0].scopeType);
                    domain = (0, array_1.combineDomains)(breakDomains), this._break = {
                        domain: breakDomains,
                        scope: breakScopes,
                        breakDomains: breakRanges,
                        breaks: breaks
                    };
                } else domain = [ minDomain, maxDomain ];
            } else domain = [ minDomain, maxDomain ];
        } else domain[0] = 0, domain[1] = 0;
        return this.setSoftDomainMinMax(domain), this.expandDomain(domain), this.includeZero(domain), 
        this.setDomainMinMax(domain), domain;
    }
    expandDomain(domain) {
        if (!this._expand) return;
        let domainMin = domain[0], domainMax = (0, vutils_1.last)(domain);
        domainMin === domainMax && (0 === domainMax ? domainMax = 1 : domainMax > 0 ? domainMin = 0 : domainMax < 0 && (domainMax = 0)), 
        (0, vutils_1.isValid)(this._expand.min) && (domain[0] = domainMin - (domainMax - domainMin) * this._expand.min), 
        (0, vutils_1.isValid)(this._expand.max) && (domain[domain.length - 1] = domainMax + (domainMax - domainMin) * this._expand.max);
    }
    niceDomain(domain) {
        const {min: userMin, max: userMax} = (0, util_1.getLinearAxisSpecDomain)(this._spec);
        if ((0, vutils_1.isValid)(userMin) || (0, vutils_1.isValid)(userMax) || "linear" !== this._spec.type) return domain;
        if (Math.abs((0, array_1.minInArr)(domain) - (0, array_1.maxInArr)(domain)) <= 1e-12) {
            let num = domain[0];
            const flag = num >= 0 ? 1 : -1;
            if (num = Math.abs(num), num < 1) domain[0] = 0, domain[domain.length - 1] = 1; else {
                let step = num / 5;
                const power = Math.floor(Math.log(step) / Math.LN10), err = step / Math.pow(10, power);
                step = (err >= exports.e10 ? 10 : err >= exports.e5 ? 5 : err >= exports.e2 ? 2 : 1) * Math.pow(10, power), 
                domain[0] = 0, domain[domain.length - 1] = 10 * step;
            }
            flag < 0 && (domain.reverse(), domain[0] *= -1, domain[domain.length - 1] *= -1);
        }
        return domain;
    }
    includeZero(domain) {
        this._zero && (domain[0] = Math.min(domain[0], 0), domain[domain.length - 1] = Math.max((0, 
        vutils_1.last)(domain), 0));
    }
    setExtendDomain(key, value) {
        if (void 0 === value) return void delete this._extend[key];
        this._extend[key] = value;
        const domain = this._scale.domain();
        if (this.extendDomain(domain), this.includeZero(domain), this.setDomainMinMax(domain), 
        this.niceDomain(domain), this._scale.domain(domain, this._nice), this._nice) {
            !this.setScaleNice() && this._scale.rescale();
        }
        this.event.emit(event_1.ChartEvent.scaleUpdate, {
            model: this,
            value: "domain"
        });
    }
    extendDomain(domain) {
        let temp;
        const domainLast = domain.length - 1, reverse = domain[0] - domain[domainLast] > 0, min = reverse ? domainLast : 0, max = reverse ? 0 : domainLast;
        for (const key in this._extend) temp = this._extend[key], temp > domain[max] && (domain[max] = temp), 
        temp < domain[min] && (domain[min] = temp);
    }
    getDomainSpec() {
        return this._domain;
    }
    setDomainMinMax(domain) {
        if (!this._domain) return;
        const {min: min, max: max} = this._domain;
        (0, vutils_1.isValid)(min) && (domain[0] = min), (0, vutils_1.isValid)(max) && (domain[domain.length - 1] = max);
    }
    setSoftDomainMinMax(domain) {
        const {softMin: softMin, softMax: softMax} = this._spec;
        if ((0, vutils_1.isValid)(softMin)) {
            let softMinValue = (0, vutils_1.isFunction)(softMin) ? softMin(domain) : softMin;
            (0, vutils_1.isNil)(softMinValue) && (softMinValue = domain[0]), softMinValue <= domain[0] && (domain[0] = softMinValue, 
            this._softMinValue = softMinValue);
        }
        if ((0, vutils_1.isValid)(softMax)) {
            let softMaxValue = (0, vutils_1.isFunction)(softMax) ? softMax(domain) : softMax;
            (0, vutils_1.isNil)(softMaxValue) && (softMaxValue = (0, vutils_1.last)(domain)), 
            softMaxValue >= (0, vutils_1.last)(domain) && (domain[domain.length - 1] = softMaxValue), 
            this._softMaxValue = softMaxValue;
        }
    }
    setZero(zero) {
        this._zero !== zero && (this._zero = zero, this.updateScaleDomain());
    }
    updateScaleDomain() {
        if (!this.isSeriesDataEnable()) return;
        const data = this.collectData(), domain = this.computeLinearDomain(data);
        this.updateScaleDomainByModel(domain);
    }
    updateScaleDomainByModel(domain) {
        if (domain = null != domain ? domain : this._scale.domain(), this.extendDomain(domain), 
        this.includeZero(domain), this.setDomainMinMax(domain), this.niceDomain(domain), 
        this._scale.domain(domain, this._nice), this._nice) {
            !this.setScaleNice() && this._scale.rescale();
        }
        this._updateNiceLabelFormatter(domain), this._domainAfterSpec = this._scale.domain(), 
        this.event.emit(event_1.ChartEvent.scaleDomainUpdate, {
            model: this
        }), this.event.emit(event_1.ChartEvent.scaleUpdate, {
            model: this,
            value: "domain"
        });
    }
    getDomainAfterSpec() {
        return this._domainAfterSpec;
    }
    _updateNiceLabelFormatter(domain) {
        const domainSpan = Math.abs((0, vutils_1.last)(domain) - domain[0]), n = Math.max(-Math.floor(Math.log10(domainSpan)), 0) + 2, unit = Math.pow(10, n);
        this.niceLabelFormatter = value => (0, vutils_1.isValidNumber)(+value) ? Math.round(+value * unit) / unit : value;
    }
}

exports.LinearAxisMixin = LinearAxisMixin;
//# sourceMappingURL=linear-axis-mixin.js.map
