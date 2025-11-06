"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.BaseSeriesSpecTransformer = void 0;

const vutils_1 = require("@visactor/vutils"), base_model_transformer_1 = require("../../model/base-model-transformer"), util_1 = require("../../util"), vutils_extension_1 = require("@visactor/vutils-extension"), spec_1 = require("../util/spec"), factory_1 = require("../../core/factory");

class BaseSeriesSpecTransformer extends base_model_transformer_1.BaseModelSpecTransformer {
    constructor() {
        super(...arguments), this.markLabelSpec = {};
    }
    getLabelSpec(markName) {
        return this.markLabelSpec[markName];
    }
    setLabelSpec(markName, label) {
        this.markLabelSpec[markName] = (0, util_1.array)(label);
    }
    addLabelSpec(markName, label, head = !1) {
        this.markLabelSpec[markName] || (this.markLabelSpec[markName] = []), head ? this.markLabelSpec[markName].unshift(label) : this.markLabelSpec[markName].push(label);
    }
    getTheme(spec, chartSpec) {
        var _a, _b, _c;
        const direction = (0, spec_1.getDirectionFromSeriesSpec)(spec), chartTheme = null === (_a = this._option) || void 0 === _a ? void 0 : _a.getTheme(), {markByName: markByName, mark: mark} = chartTheme, type = this._option.type, theme = factory_1.Factory.getSeriesMarkMap(type) ? (0, 
        util_1.transformSeriesThemeToMerge)((0, util_1.get)(chartTheme, `series.${type}`), type, mark, markByName) : {}, themeWithDirection = (0, 
        util_1.get)(chartTheme, `series.${type}_${direction}`), themeWithStack = (null !== (_c = null !== (_b = this.stack) && void 0 !== _b ? _b : null == themeWithDirection ? void 0 : themeWithDirection.stack) && void 0 !== _c ? _c : null == theme ? void 0 : theme.stack) ? (0, 
        util_1.get)(chartTheme, `series.${type}_stack`) : void 0;
        return (0, vutils_extension_1.mergeSpec)({}, theme, themeWithDirection, themeWithStack);
    }
    transformSpec(spec, chartSpec, chartSpecInfo) {
        this._transformStack(spec);
        const result = super.transformSpec(spec, chartSpec, chartSpecInfo);
        return this._transformLabelSpec(result.spec), Object.assign(Object.assign({}, result), {
            markLabelSpec: this.markLabelSpec,
            stack: this.stack
        });
    }
    _transformLabelSpec(spec) {}
    _transformStack(spec) {
        (0, vutils_1.isBoolean)(spec.stack) && (this.stack = spec.stack), (0, vutils_1.isBoolean)(spec.percent) && (this.stack = spec.percent || this.stack), 
        (0, vutils_1.isNil)(this.stack) && this._supportStack && spec.seriesField && (this.stack = !0);
    }
    _addMarkLabelSpec(spec, markName, labelSpecKey = "label", styleHandlerName = "initLabelMarkStyle", hasAnimation = !0, head) {
        if (!spec) return;
        (0, util_1.array)(spec[labelSpecKey]).forEach((labelSpec => {
            var _a, _b, _c;
            if (labelSpec && labelSpec.visible) {
                const {animation: animation = !0, animationUpdate: labelAnimationUpdate = !0, animationEnter: labelAnimationEnter = !0, animationExit: labelAnimationExit = !0} = labelSpec, {animationUpdate: animationUpdate = !0, animationEnter: animationEnter = !0, animationExit: animationExit = !0} = spec, labelAnimationEnabled = !!(null !== (_c = null !== (_b = null === (_a = this._option) || void 0 === _a ? void 0 : _a.animation) && void 0 !== _b ? _b : spec.animation) && void 0 !== _c ? _c : labelSpec.animation) && !!hasAnimation;
                this.addLabelSpec((0, vutils_1.isFunction)(markName) ? markName(labelSpec) : markName, Object.assign(Object.assign({}, labelSpec), {
                    animation: !!labelAnimationEnabled && animation,
                    animationUpdate: !!(labelAnimationEnabled && animationUpdate && labelAnimationUpdate) && animationUpdate,
                    animationEnter: !!(labelAnimationEnabled && animationEnter && labelAnimationEnter) && animationEnter,
                    animationExit: !!(labelAnimationEnabled && animationEnter && labelAnimationExit) && animationExit,
                    getStyleHandler: series => {
                        var _a;
                        return null === (_a = series[styleHandlerName]) || void 0 === _a ? void 0 : _a.bind(series);
                    }
                }), head);
            }
        }));
    }
    _getDefaultSpecFromChart(chartSpec) {
        var _a;
        const spec = null !== (_a = super._getDefaultSpecFromChart(chartSpec)) && void 0 !== _a ? _a : {}, {outerRadius: outerRadius, innerRadius: innerRadius, direction: direction} = chartSpec;
        return (0, util_1.isValid)(outerRadius) && (spec.outerRadius = outerRadius), (0, 
        util_1.isValid)(innerRadius) && (spec.innerRadius = innerRadius), (0, util_1.isValid)(direction) && (spec.direction = direction), 
        Object.keys(spec).length > 0 ? spec : void 0;
    }
    _mergeThemeToSpec(spec, chartSpec) {
        const theme = this._theme;
        if (this._shouldMergeThemeToSpec()) {
            const specFromChart = this._getDefaultSpecFromChart(chartSpec), merge = originalSpec => {
                const result = (0, vutils_extension_1.mergeSpec)({}, theme, specFromChart, originalSpec), labelTheme = theme.label;
                return labelTheme && (0, vutils_1.isObject)(labelTheme) && (0, util_1.isArray)(result.label) && (result.label = result.label.map((label => (0, 
                vutils_extension_1.mergeSpec)({}, labelTheme, label)))), result;
            };
            return (0, util_1.isArray)(spec) ? {
                spec: spec.map((specItem => merge(specItem))),
                theme: theme
            } : {
                spec: merge(spec),
                theme: theme
            };
        }
        return {
            spec: spec,
            theme: theme
        };
    }
}

exports.BaseSeriesSpecTransformer = BaseSeriesSpecTransformer;
//# sourceMappingURL=base-series-transformer.js.map
