"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.BaseTooltipProcessor = void 0;

const vutils_1 = require("@visactor/vutils"), event_1 = require("../../../constant/event"), get_spec_1 = require("../utils/get-spec"), common_1 = require("../utils/common"), constant_1 = require("../constant");

class BaseTooltipProcessor {
    constructor(component) {
        this._showTooltipByHandler = (data, params) => {
            var _a, _b, _c;
            if ((0, vutils_1.isNil)(data)) return 1;
            params.changePositionOnly || this.clearCache(), this._updateViewSpec(data, params);
            const spec = this._cacheActiveSpec;
            if ((0, vutils_1.isNil)(spec) || !1 === spec.visible) return 1;
            params.tooltipSpec = this.component.getSpec(), params.activeTooltipSpec = spec;
            const {title: title, content: content} = spec, isEmpty = (0, vutils_1.isNil)(null == title ? void 0 : title.key) && (0, 
            vutils_1.isNil)(null == title ? void 0 : title.value) && !(null == content ? void 0 : content.length);
            if (this.component.event.emit(event_1.ChartEvent.tooltipShow, Object.assign(Object.assign({}, params), {
                isEmptyTooltip: isEmpty,
                tooltipData: data,
                activeType: this.activeType,
                tooltip: this.component
            })), isEmpty) return 1;
            let showTooltip;
            return (null === (_a = spec.handler) || void 0 === _a ? void 0 : _a.showTooltip) ? showTooltip = spec.handler.showTooltip.bind(spec.handler) : (null === (_b = this.component.tooltipHandler) || void 0 === _b ? void 0 : _b.showTooltip) && (showTooltip = this.component.tooltipHandler.showTooltip.bind(this.component.tooltipHandler)), 
            showTooltip ? null !== (_c = showTooltip(this.activeType, data, params)) && void 0 !== _c ? _c : 0 : 1;
        }, this.component = component;
    }
    _preprocessDimensionInfo(dimensionInfo) {
        const newDimensionInfo = [];
        if (null == dimensionInfo || dimensionInfo.forEach((info => {
            const di = Object.assign(Object.assign({}, info), {
                data: info.data.filter((({series: series}) => {
                    var _a, _b;
                    return !1 !== (null === (_b = null === (_a = series.getSpec()) || void 0 === _a ? void 0 : _a.tooltip) || void 0 === _b ? void 0 : _b.visible);
                }))
            });
            di.data.length > 0 && newDimensionInfo.push(di);
        })), newDimensionInfo.length > 0) return newDimensionInfo;
    }
    _updateViewSpec(data, params) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const {changePositionOnly: changePositionOnly, model: model} = params;
        if (!changePositionOnly || !this._cacheActiveSpec) {
            const tooltipSpec = this.component.getSpec();
            if (this._cacheActiveSpec = (0, get_spec_1.getTooltipSpecForShow)(this.activeType, this.component.getSpec(), model, data, params), 
            this._cacheActiveSpec) {
                (0, vutils_1.isNil)(this._cacheActiveSpec.handler) && (0, vutils_1.isValid)(tooltipSpec.handler) && (this._cacheActiveSpec.handler = tooltipSpec.handler);
                const specByType = null !== (_a = tooltipSpec[this.activeType]) && void 0 !== _a ? _a : {}, updateTitle = null !== (_b = this._cacheActiveSpec.updateTitle) && void 0 !== _b ? _b : specByType.updateTitle, updateContent = null !== (_c = this._cacheActiveSpec.updateContent) && void 0 !== _c ? _c : specByType.updateContent, maxLineCount = null !== (_e = null !== (_d = this._cacheActiveSpec.maxLineCount) && void 0 !== _d ? _d : specByType.maxLineCount) && void 0 !== _e ? _e : constant_1.TOOLTIP_MAX_LINE_COUNT;
                if (updateTitle && (this._cacheActiveSpec.title = null !== (_f = updateTitle(this._cacheActiveSpec.title, data, params)) && void 0 !== _f ? _f : this._cacheActiveSpec.title), 
                updateContent) this._cacheActiveSpec.content = null !== (_g = updateContent(this._cacheActiveSpec.content, data, params)) && void 0 !== _g ? _g : this._cacheActiveSpec.content; else if (maxLineCount >= 1 && (null === (_h = this._cacheActiveSpec.content) || void 0 === _h ? void 0 : _h.length) > maxLineCount) {
                    const othersLine = null !== (_j = this._cacheActiveSpec.othersLine) && void 0 !== _j ? _j : specByType.othersLine, otherLine = othersLine ? Object.assign(Object.assign({}, constant_1.TOOLTIP_OTHERS_LINE), othersLine) : constant_1.TOOLTIP_OTHERS_LINE;
                    this._cacheActiveSpec.content = [ ...this._cacheActiveSpec.content.slice(0, maxLineCount - 1), Object.assign(Object.assign({}, this._cacheActiveSpec.content[maxLineCount - 1]), otherLine) ];
                }
            }
        }
    }
    shouldHandleTooltip(params, info) {
        var _a, _b;
        return !(0, vutils_1.isNil)(info) && (0, common_1.isActiveTypeVisible)(this.activeType, null === (_b = null === (_a = params.model) || void 0 === _a ? void 0 : _a.tooltipHelper) || void 0 === _b ? void 0 : _b.spec);
    }
    clearCache() {
        this._cacheActiveSpec = void 0;
    }
}

exports.BaseTooltipProcessor = BaseTooltipProcessor;
//# sourceMappingURL=base.js.map
