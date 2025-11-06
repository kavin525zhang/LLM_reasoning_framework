import { isValidNumber, isNil, isValid, isFunction, last } from "@visactor/vutils";

import { combineDomains, maxInArr, minInArr } from "../../../util/array";

import { getLinearAxisSpecDomain } from "../util";

import { ChartEvent } from "../../../constant/event";

import { isXAxis } from "../cartesian/util/common";

import { breakData } from "./util/break-data";

export const e10 = Math.sqrt(50);

export const e5 = Math.sqrt(10);

export const e2 = Math.sqrt(2);

const DEFAULT_TICK_COUNT = 5;

export class LinearAxisMixin {
    constructor() {
        this._extend = {}, this.niceLabelFormatter = null;
    }
    setExtraAttrFromSpec() {
        isValid(this._spec.nice) && (this._nice = this._spec.nice), isValid(this._spec.zero) && (this._zero = this._spec.zero), 
        this._expand = this._spec.expand, this._domain = getLinearAxisSpecDomain(this._spec);
    }
    transformScaleDomain() {
        this.setScaleNice();
    }
    setLinearScaleNice() {
        var _a;
        if (!this._nice) return !1;
        let tickCount = 5;
        const tick = this._spec.tick || {};
        if (isValidNumber(tick.forceTickCount)) tickCount = tick.forceTickCount; else if (isFunction(tick.tickCount)) {
            const range = this._scale.range();
            let rangeSize = Math.abs(last(range) - range[0]);
            if (1 === rangeSize && this._option) {
                rangeSize = isXAxis(this._orient) ? this._option.getChartViewRect().width : this._option.getChartViewRect().height;
            }
            tickCount = tick.tickCount({
                axisLength: rangeSize,
                labelStyle: this._spec.label && this._spec.label.style
            });
        } else tickCount = isValidNumber(tick.tickCount) ? tick.tickCount : 5;
        "accurateFirst" === this._spec.niceType && (tickCount = Math.max(5, tickCount));
        const {min: min, max: max} = null !== (_a = this._domain) && void 0 !== _a ? _a : {};
        return isNil(min) && isNil(max) && isNil(this._softMaxValue) && isNil(this._softMinValue) ? this._scale.nice(tickCount) : (isValid(min) || isValid(this._softMinValue)) && isNil(max) && isNil(this._softMaxValue) ? this._scale.niceMax(tickCount) : !(!isNil(min) || !isNil(this._softMinValue) || !isValid(max) && !isValid(this._softMaxValue)) && this._scale.niceMin(tickCount);
    }
    setLogScaleNice() {
        var _a;
        if (!this._nice) return !1;
        const {min: min, max: max} = null !== (_a = this._domain) && void 0 !== _a ? _a : {};
        return isNil(min) && isNil(max) && isNil(this._softMaxValue) && isNil(this._softMinValue) ? this._scale.nice() : (isValid(min) || isValid(this._softMinValue)) && isNil(max) && isNil(this._softMaxValue) ? this._scale.niceMax() : !(!isNil(min) || !isNil(this._softMinValue) || !isValid(max) && !isValid(this._softMaxValue)) && this._scale.niceMin();
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
                const breakRanges = [], breaks = [], breakMaxLimit = isNil(this._domain.max) ? maxDomain : this._domain.max;
                for (let index = 0; index < this._spec.breaks.length; index++) {
                    const {range: range} = this._spec.breaks[index];
                    range[0] <= range[1] && range[1] <= breakMaxLimit && (breakRanges.push(range), breaks.push(this._spec.breaks[index]));
                }
                if (breakRanges.sort(((a, b) => a[0] - b[0])), breakRanges.length) {
                    const {domain: breakDomains, scope: breakScopes} = breakData(values, combineDomains(breakRanges), this._spec.breaks[0].scopeType);
                    domain = combineDomains(breakDomains), this._break = {
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
        let domainMin = domain[0], domainMax = last(domain);
        domainMin === domainMax && (0 === domainMax ? domainMax = 1 : domainMax > 0 ? domainMin = 0 : domainMax < 0 && (domainMax = 0)), 
        isValid(this._expand.min) && (domain[0] = domainMin - (domainMax - domainMin) * this._expand.min), 
        isValid(this._expand.max) && (domain[domain.length - 1] = domainMax + (domainMax - domainMin) * this._expand.max);
    }
    niceDomain(domain) {
        const {min: userMin, max: userMax} = getLinearAxisSpecDomain(this._spec);
        if (isValid(userMin) || isValid(userMax) || "linear" !== this._spec.type) return domain;
        if (Math.abs(minInArr(domain) - maxInArr(domain)) <= 1e-12) {
            let num = domain[0];
            const flag = num >= 0 ? 1 : -1;
            if (num = Math.abs(num), num < 1) domain[0] = 0, domain[domain.length - 1] = 1; else {
                let step = num / 5;
                const power = Math.floor(Math.log(step) / Math.LN10), err = step / Math.pow(10, power);
                step = (err >= e10 ? 10 : err >= e5 ? 5 : err >= e2 ? 2 : 1) * Math.pow(10, power), 
                domain[0] = 0, domain[domain.length - 1] = 10 * step;
            }
            flag < 0 && (domain.reverse(), domain[0] *= -1, domain[domain.length - 1] *= -1);
        }
        return domain;
    }
    includeZero(domain) {
        this._zero && (domain[0] = Math.min(domain[0], 0), domain[domain.length - 1] = Math.max(last(domain), 0));
    }
    setExtendDomain(key, value) {
        if (void 0 === value) return void delete this._extend[key];
        this._extend[key] = value;
        const domain = this._scale.domain();
        if (this.extendDomain(domain), this.includeZero(domain), this.setDomainMinMax(domain), 
        this.niceDomain(domain), this._scale.domain(domain, this._nice), this._nice) {
            !this.setScaleNice() && this._scale.rescale();
        }
        this.event.emit(ChartEvent.scaleUpdate, {
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
        isValid(min) && (domain[0] = min), isValid(max) && (domain[domain.length - 1] = max);
    }
    setSoftDomainMinMax(domain) {
        const {softMin: softMin, softMax: softMax} = this._spec;
        if (isValid(softMin)) {
            let softMinValue = isFunction(softMin) ? softMin(domain) : softMin;
            isNil(softMinValue) && (softMinValue = domain[0]), softMinValue <= domain[0] && (domain[0] = softMinValue, 
            this._softMinValue = softMinValue);
        }
        if (isValid(softMax)) {
            let softMaxValue = isFunction(softMax) ? softMax(domain) : softMax;
            isNil(softMaxValue) && (softMaxValue = last(domain)), softMaxValue >= last(domain) && (domain[domain.length - 1] = softMaxValue), 
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
        this.event.emit(ChartEvent.scaleDomainUpdate, {
            model: this
        }), this.event.emit(ChartEvent.scaleUpdate, {
            model: this,
            value: "domain"
        });
    }
    getDomainAfterSpec() {
        return this._domainAfterSpec;
    }
    _updateNiceLabelFormatter(domain) {
        const domainSpan = Math.abs(last(domain) - domain[0]), n = Math.max(-Math.floor(Math.log10(domainSpan)), 0) + 2, unit = Math.pow(10, n);
        this.niceLabelFormatter = value => isValidNumber(+value) ? Math.round(+value * unit) / unit : value;
    }
}
//# sourceMappingURL=linear-axis-mixin.js.map
