import { parseNiceOptions } from "./utils/tick-sample";

import { nice } from "./utils/utils";

export class LogNiceMixin {
    nice(count = 10, option) {
        var _b, _c, _d, _e;
        const originalDomain = this._domain;
        let niceMinMax = [], niceType = null;
        if (option) {
            const res = parseNiceOptions(originalDomain, option);
            if (niceMinMax = res.niceMinMax, this._domainValidator = res.domainValidator, niceType = res.niceType, 
            res.niceDomain) return this._niceDomain = res.niceDomain, this.rescale(), this;
        } else niceType = "all";
        if (niceType) {
            const niceDomain = nice(originalDomain.slice(), null !== (_c = null === (_b = this.getNiceConfig) || void 0 === _b ? void 0 : _b.call(this)) && void 0 !== _c ? _c : {
                floor: x => Math.floor(x),
                ceil: x => Math.ceil(x)
            });
            return "min" === niceType ? niceDomain[niceDomain.length - 1] = null !== (_d = niceMinMax[1]) && void 0 !== _d ? _d : niceDomain[niceDomain.length - 1] : "max" === niceType && (niceDomain[0] = null !== (_e = niceMinMax[0]) && void 0 !== _e ? _e : niceDomain[0]), 
            this._niceDomain = niceDomain, this.rescale(), this;
        }
        return this;
    }
    niceMin() {
        const maxD = this._domain[this._domain.length - 1];
        this.nice();
        const niceDomain = this._domain.slice();
        return this._domain && (niceDomain[niceDomain.length - 1] = maxD, this._niceDomain = niceDomain, 
        this.rescale()), this;
    }
    niceMax() {
        const minD = this._domain[0];
        this.nice();
        const niceDomain = this._domain.slice();
        return this._domain && (niceDomain[0] = minD, this._niceDomain = niceDomain, this.rescale()), 
        this;
    }
}
//# sourceMappingURL=log-nice-mixin.js.map