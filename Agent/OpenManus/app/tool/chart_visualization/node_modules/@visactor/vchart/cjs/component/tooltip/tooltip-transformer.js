"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.TooltipSpecTransformer = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), util_1 = require("../../util"), base_1 = require("../base"), constant_1 = require("./constant"), common_1 = require("./utils/common"), vutils_extension_1 = require("@visactor/vutils-extension");

class TooltipSpecTransformer extends base_1.BaseComponentSpecTransformer {
    _shouldMergeThemeToSpec() {
        return !1;
    }
    _initTheme(spec, chartSpec) {
        var _a;
        const {spec: newSpec, theme: theme} = super._initTheme(spec, chartSpec);
        return newSpec.style = (0, vutils_extension_1.mergeSpec)({}, this._theme, newSpec.style), 
        newSpec.offset = (0, vutils_extension_1.mergeSpec)({}, theme.offset, spec.offset), 
        newSpec.transitionDuration = null !== (_a = spec.transitionDuration) && void 0 !== _a ? _a : theme.transitionDuration, 
        {
            spec: newSpec,
            theme: theme
        };
    }
    _transformSpecAfterMergingTheme(spec, chartSpec, chartSpecInfo) {
        var _a, _b, _c, _d, _e, _f, _g;
        super._transformSpecAfterMergingTheme(spec, chartSpec, chartSpecInfo), spec.visible = null === (_a = spec.visible) || void 0 === _a || _a, 
        spec.activeType = (0, common_1.getTooltipActualActiveType)(spec), spec.renderMode = null !== (_b = spec.renderMode) && void 0 !== _b ? _b : (0, 
        util_1.isMiniAppLikeMode)(this._option.mode) || !(0, util_1.isTrueBrowser)(this._option.mode) ? "canvas" : "html", 
        spec.trigger = null !== (_c = spec.trigger) && void 0 !== _c ? _c : "hover", spec.className = null !== (_d = spec.className) && void 0 !== _d ? _d : constant_1.TOOLTIP_EL_CLASS_NAME, 
        spec.enterable = null !== (_e = spec.enterable) && void 0 !== _e && _e, spec.transitionDuration = null !== (_f = spec.transitionDuration) && void 0 !== _f ? _f : 150, 
        spec.confine = null !== (_g = spec.confine) && void 0 !== _g ? _g : "canvas" === spec.renderMode, 
        (0, util_1.isValid)(spec.parentElement) ? (0, util_1.isString)(spec.parentElement) && (spec.parentElement = vrender_core_1.vglobal.getElementById(spec.parentElement)) : (0, 
        util_1.isTrueBrowser)(this._option.mode) && (spec.parentElement = null === util_1.domDocument || void 0 === util_1.domDocument ? void 0 : util_1.domDocument.body);
    }
}

exports.TooltipSpecTransformer = TooltipSpecTransformer;
//# sourceMappingURL=tooltip-transformer.js.map
