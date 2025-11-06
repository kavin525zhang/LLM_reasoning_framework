import { isBoolean, isFunction, isNil, isObject } from "@visactor/vutils";

import { BaseModelSpecTransformer } from "../../model/base-model-transformer";

import { array, get, isArray, isValid, transformSeriesThemeToMerge } from "../../util";

import { mergeSpec } from "@visactor/vutils-extension";

import { getDirectionFromSeriesSpec } from "../util/spec";

import { Factory } from "../../core/factory";

export class BaseSeriesSpecTransformer extends BaseModelSpecTransformer {
    constructor() {
        super(...arguments), this.markLabelSpec = {};
    }
    getLabelSpec(markName) {
        return this.markLabelSpec[markName];
    }
    setLabelSpec(markName, label) {
        this.markLabelSpec[markName] = array(label);
    }
    addLabelSpec(markName, label, head = !1) {
        this.markLabelSpec[markName] || (this.markLabelSpec[markName] = []), head ? this.markLabelSpec[markName].unshift(label) : this.markLabelSpec[markName].push(label);
    }
    getTheme(spec, chartSpec) {
        var _a, _b, _c;
        const direction = getDirectionFromSeriesSpec(spec), chartTheme = null === (_a = this._option) || void 0 === _a ? void 0 : _a.getTheme(), {markByName: markByName, mark: mark} = chartTheme, type = this._option.type, theme = Factory.getSeriesMarkMap(type) ? transformSeriesThemeToMerge(get(chartTheme, `series.${type}`), type, mark, markByName) : {}, themeWithDirection = get(chartTheme, `series.${type}_${direction}`), themeWithStack = (null !== (_c = null !== (_b = this.stack) && void 0 !== _b ? _b : null == themeWithDirection ? void 0 : themeWithDirection.stack) && void 0 !== _c ? _c : null == theme ? void 0 : theme.stack) ? get(chartTheme, `series.${type}_stack`) : void 0;
        return mergeSpec({}, theme, themeWithDirection, themeWithStack);
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
        isBoolean(spec.stack) && (this.stack = spec.stack), isBoolean(spec.percent) && (this.stack = spec.percent || this.stack), 
        isNil(this.stack) && this._supportStack && spec.seriesField && (this.stack = !0);
    }
    _addMarkLabelSpec(spec, markName, labelSpecKey = "label", styleHandlerName = "initLabelMarkStyle", hasAnimation = !0, head) {
        if (!spec) return;
        array(spec[labelSpecKey]).forEach((labelSpec => {
            var _a, _b, _c;
            if (labelSpec && labelSpec.visible) {
                const {animation: animation = !0, animationUpdate: labelAnimationUpdate = !0, animationEnter: labelAnimationEnter = !0, animationExit: labelAnimationExit = !0} = labelSpec, {animationUpdate: animationUpdate = !0, animationEnter: animationEnter = !0, animationExit: animationExit = !0} = spec, labelAnimationEnabled = !!(null !== (_c = null !== (_b = null === (_a = this._option) || void 0 === _a ? void 0 : _a.animation) && void 0 !== _b ? _b : spec.animation) && void 0 !== _c ? _c : labelSpec.animation) && !!hasAnimation;
                this.addLabelSpec(isFunction(markName) ? markName(labelSpec) : markName, Object.assign(Object.assign({}, labelSpec), {
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
        return isValid(outerRadius) && (spec.outerRadius = outerRadius), isValid(innerRadius) && (spec.innerRadius = innerRadius), 
        isValid(direction) && (spec.direction = direction), Object.keys(spec).length > 0 ? spec : void 0;
    }
    _mergeThemeToSpec(spec, chartSpec) {
        const theme = this._theme;
        if (this._shouldMergeThemeToSpec()) {
            const specFromChart = this._getDefaultSpecFromChart(chartSpec), merge = originalSpec => {
                const result = mergeSpec({}, theme, specFromChart, originalSpec), labelTheme = theme.label;
                return labelTheme && isObject(labelTheme) && isArray(result.label) && (result.label = result.label.map((label => mergeSpec({}, labelTheme, label)))), 
                result;
            };
            return isArray(spec) ? {
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
//# sourceMappingURL=base-series-transformer.js.map
