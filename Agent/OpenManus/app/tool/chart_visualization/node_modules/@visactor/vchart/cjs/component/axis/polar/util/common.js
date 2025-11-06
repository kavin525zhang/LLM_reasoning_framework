"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.computeLayoutRadius = exports.getPolarAxisInfo = void 0;

const polar_1 = require("../../../../constant/polar"), vutils_1 = require("@visactor/vutils"), interface_1 = require("../../../interface"), getPolarAxisInfo = (spec, chartSpec) => {
    var _a, _b, _c, _d, _e, _f;
    const axisType = null !== (_a = spec.type) && void 0 !== _a ? _a : "angle" === spec.orient ? "band" : "linear", componentName = `${interface_1.ComponentTypeEnum.polarAxis}-${axisType}`, startAngleFromSpec = null !== (_b = spec.startAngle) && void 0 !== _b ? _b : chartSpec.startAngle, endAngleFromSpec = null !== (_c = spec.endAngle) && void 0 !== _c ? _c : chartSpec.endAngle;
    return {
        axisType: axisType,
        componentName: componentName,
        startAngle: null != startAngleFromSpec ? startAngleFromSpec : polar_1.POLAR_START_ANGLE,
        endAngle: null != endAngleFromSpec ? endAngleFromSpec : (0, vutils_1.isValid)(startAngleFromSpec) ? startAngleFromSpec + 360 : polar_1.POLAR_END_ANGLE,
        center: (0, vutils_1.isValid)(chartSpec.center) ? chartSpec.center : (0, vutils_1.isValid)(null == chartSpec ? void 0 : chartSpec.centerX) || (0, 
        vutils_1.isValid)(null == chartSpec ? void 0 : chartSpec.centerY) ? {
            x: null == chartSpec ? void 0 : chartSpec.centerX,
            y: null == chartSpec ? void 0 : chartSpec.centerY
        } : void 0,
        outerRadius: null !== (_f = null !== (_e = null !== (_d = spec.outerRadius) && void 0 !== _d ? _d : spec.radius) && void 0 !== _e ? _e : chartSpec.outerRadius) && void 0 !== _f ? _f : chartSpec.radius,
        layoutRadius: chartSpec.layoutRadius
    };
};

exports.getPolarAxisInfo = getPolarAxisInfo;

const computeLayoutRadius = (getLayoutRadius, getLayoutRect, getCenter, getAngles) => {
    const layoutRadius = getLayoutRadius();
    if ((0, vutils_1.isNumber)(layoutRadius)) return layoutRadius;
    if ((0, vutils_1.isFunction)(layoutRadius)) return layoutRadius(getLayoutRect(), getCenter());
    const rect = getLayoutRect();
    if ("auto" === layoutRadius && rect.width > 0 && rect.height > 0) {
        const {startAngle: startAngle = 0, endAngle: endAngle = 2 * Math.PI} = getAngles();
        return (0, vutils_1.calculateMaxRadius)(rect, getCenter(), startAngle, endAngle);
    }
    return Math.min(rect.width / 2, rect.height / 2);
};

exports.computeLayoutRadius = computeLayoutRadius;
//# sourceMappingURL=common.js.map
