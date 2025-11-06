import { array, isArray } from "@visactor/vutils";

import { ChartEvent } from "../../../constant/event";

import { CompilableData } from "../../../compile/data/compilable-data";

import { getAxisItem } from "../util";

export class BandAxisMixin {
    constructor() {
        this._rawDomainIndex = [];
    }
    _initData() {
        var _a;
        if (this._spec.showAllGroupLayers && this._scales.length > 1) for (let layer = 0; layer < this._scales.length; layer++) {
            const layerConfig = (null !== (_a = this._spec.layers) && void 0 !== _a ? _a : [])[this._scales.length - 1 - layer] || {};
            if (!1 !== layerConfig.visible && 0 !== layerConfig.tickCount && 0 !== layerConfig.forceTickCount) {
                const tickData = this._initTickDataSet(Object.assign(Object.assign({}, this._tickTransformOption()), layerConfig), layer);
                tickData.target.addListener("change", this._forceLayout.bind(this));
                const compilableData = new CompilableData(this._option, tickData);
                this._tickData.push(compilableData), this._tickDataMap || (this._tickDataMap = {}), 
                this._tickDataMap[layer] = compilableData;
            }
        } else {
            const tickData = this._initTickDataSet(this._tickTransformOption());
            tickData.target.addListener("change", this._forceLayout.bind(this));
            const compilableData = new CompilableData(this._option, tickData);
            this._tickData = [ compilableData ], this._tickDataMap = {
                0: compilableData
            };
        }
    }
    dataToPosition(values, cfg = {}) {
        var _a, _b;
        if (0 === values.length || 0 === this._scales.length) return 0;
        const {position: position, bandScale: bandScale} = this.getPosition(values);
        return position + bandScale.bandwidth() * (null !== (_b = null !== (_a = cfg.bandPosition) && void 0 !== _a ? _a : this._spec.bandPosition) && void 0 !== _b ? _b : this._defaultBandPosition);
    }
    valueToPosition(value) {
        return this._scale.scale(value);
    }
    updateGroupScaleRange() {
        let parentScale = this._scale;
        this._scales.forEach(((scale, i) => {
            i > 0 && (scale.range([ 0, parentScale.bandwidth() ]), parentScale = scale);
        }));
    }
    getPosition(values) {
        let position = 0, bandScale = this._scale;
        if (1 === this._scales.length || 1 === values.length) position = this.valueToPosition(values[0]); else {
            const max = Math.min(values.length, this._scales.length);
            for (let i = 0; i < max; i++) position += this._scales[i].scale(values[i]);
            bandScale = this._scales[max - 1];
        }
        return {
            position: position,
            bandScale: bandScale
        };
    }
    calcScales(DEFAULT_BAND_INNER_PADDING, DEFAULT_BAND_OUTER_PADDING) {
        var _a, _b;
        const {bandPadding: bandPadding, paddingInner: paddingInner, paddingOuter: paddingOuter} = this._spec, isBandPaddingArray = isArray(bandPadding), isPaddingInnerArray = isArray(paddingInner), isPaddingOuterArray = isArray(paddingOuter);
        for (let i = 0; i < this._scales.length; i++) {
            const _padding = isBandPaddingArray ? bandPadding[i] : bandPadding, _paddingInner = isPaddingInnerArray ? paddingInner[i] : paddingInner, _paddingOuter = isPaddingOuterArray ? paddingOuter[i] : paddingOuter;
            this._scales[i].paddingInner(null !== (_a = null != _paddingInner ? _paddingInner : _padding) && void 0 !== _a ? _a : DEFAULT_BAND_INNER_PADDING, !0).paddingOuter(null !== (_b = null != _paddingOuter ? _paddingOuter : _padding) && void 0 !== _b ? _b : DEFAULT_BAND_OUTER_PADDING, !0);
        }
    }
    computeBandDomain(data) {
        if (!data.length) return [];
        if (1 === data.length) return data[0].values;
        const tempSet = new Set;
        for (let i = 0; i < data.length; i++) for (let j = 0; j < data[i].values.length; j++) tempSet.add(data[i].values[j]);
        return Array.from(tempSet);
    }
    updateScaleDomain() {
        var _a;
        if (!this.isSeriesDataEnable()) return;
        !(null === (_a = this._rawDomainIndex) || void 0 === _a ? void 0 : _a.length) && this._scales.length && this._updateRawDomain();
        const userDomain = this._spec.domain;
        for (let i = 0; i < this._scales.length; i++) if (userDomain && userDomain.length && 0 === i) this._scales[i].domain(userDomain); else {
            const data = this.collectData(i), domain = this.computeBandDomain(data);
            this._scales[i].domain(domain.sort(((a, b) => this._rawDomainIndex[i][a] - this._rawDomainIndex[i][b])));
        }
        this.transformScaleDomain(), this.event.emit(ChartEvent.scaleDomainUpdate, {
            model: this
        }), this.event.emit(ChartEvent.scaleUpdate, {
            model: this,
            value: "domain"
        });
    }
    getLabelItems(length) {
        const labelItems = [];
        let preData = [];
        return this._scales.forEach(((scale, index) => {
            var _a;
            const tickData = this._tickDataMap[index], isTickDataHaveData = null === (_a = null == tickData ? void 0 : tickData.getLatestData()) || void 0 === _a ? void 0 : _a.length, ticks = isTickDataHaveData ? tickData.getLatestData().map((obj => obj.value)) : scale.domain();
            if (ticks && ticks.length) if (preData && preData.length) {
                const currentLabelItems = [], curData = [];
                preData.forEach((value => {
                    ticks.forEach((tick => {
                        const values = array(value).concat(tick);
                        if (curData.push(values), isTickDataHaveData) {
                            const axisItem = getAxisItem(tick, this._getNormalizedValue(values, length));
                            currentLabelItems.push(axisItem);
                        }
                    }));
                })), isTickDataHaveData && labelItems.push(currentLabelItems.filter((entry => entry.value >= 0 && entry.value <= 1))), 
                preData = curData;
            } else ticks.forEach((tick => {
                preData.push(tick);
            })), isTickDataHaveData && labelItems.push(tickData.getLatestData().map((obj => getAxisItem(obj.value, this._getNormalizedValue([ obj.value ], length)))).filter((entry => entry.value >= 0 && entry.value <= 1)));
        })), labelItems.reverse();
    }
    _updateRawDomain() {
        this._rawDomainIndex = [];
        const userDomain = this._spec.domain;
        for (let i = 0; i < this._scales.length; i++) if (userDomain && userDomain.length && 0 === i) this._scales[i].domain(userDomain); else {
            const data = this.collectData(i, !0), domain = this.computeBandDomain(data);
            this._rawDomainIndex[i] = {}, domain.forEach(((d, _i) => this._rawDomainIndex[i][d] = _i));
        }
    }
    _clearRawDomain() {
        this._rawDomainIndex = [];
    }
}
//# sourceMappingURL=band-axis-mixin.js.map
