import { vglobal } from "@visactor/vrender-core";

import { domDocument, isMiniAppLikeMode, isString, isTrueBrowser, isValid } from "../../util";

import { BaseComponentSpecTransformer } from "../base";

import { TOOLTIP_EL_CLASS_NAME } from "./constant";

import { getTooltipActualActiveType } from "./utils/common";

import { mergeSpec } from "@visactor/vutils-extension";

export class TooltipSpecTransformer extends BaseComponentSpecTransformer {
    _shouldMergeThemeToSpec() {
        return !1;
    }
    _initTheme(spec, chartSpec) {
        var _a;
        const {spec: newSpec, theme: theme} = super._initTheme(spec, chartSpec);
        return newSpec.style = mergeSpec({}, this._theme, newSpec.style), newSpec.offset = mergeSpec({}, theme.offset, spec.offset), 
        newSpec.transitionDuration = null !== (_a = spec.transitionDuration) && void 0 !== _a ? _a : theme.transitionDuration, 
        {
            spec: newSpec,
            theme: theme
        };
    }
    _transformSpecAfterMergingTheme(spec, chartSpec, chartSpecInfo) {
        var _a, _b, _c, _d, _e, _f, _g;
        super._transformSpecAfterMergingTheme(spec, chartSpec, chartSpecInfo), spec.visible = null === (_a = spec.visible) || void 0 === _a || _a, 
        spec.activeType = getTooltipActualActiveType(spec), spec.renderMode = null !== (_b = spec.renderMode) && void 0 !== _b ? _b : isMiniAppLikeMode(this._option.mode) || !isTrueBrowser(this._option.mode) ? "canvas" : "html", 
        spec.trigger = null !== (_c = spec.trigger) && void 0 !== _c ? _c : "hover", spec.className = null !== (_d = spec.className) && void 0 !== _d ? _d : TOOLTIP_EL_CLASS_NAME, 
        spec.enterable = null !== (_e = spec.enterable) && void 0 !== _e && _e, spec.transitionDuration = null !== (_f = spec.transitionDuration) && void 0 !== _f ? _f : 150, 
        spec.confine = null !== (_g = spec.confine) && void 0 !== _g ? _g : "canvas" === spec.renderMode, 
        isValid(spec.parentElement) ? isString(spec.parentElement) && (spec.parentElement = vglobal.getElementById(spec.parentElement)) : isTrueBrowser(this._option.mode) && (spec.parentElement = null == domDocument ? void 0 : domDocument.body);
    }
}
//# sourceMappingURL=tooltip-transformer.js.map
