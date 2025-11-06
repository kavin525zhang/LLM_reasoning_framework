import { POLAR_END_ANGLE, POLAR_START_ANGLE } from "../../../../constant/polar";

import { calculateMaxRadius, isFunction, isNumber, isValid } from "@visactor/vutils";

import { ComponentTypeEnum } from "../../../interface";

export const getPolarAxisInfo = (spec, chartSpec) => {
    var _a, _b, _c, _d, _e, _f;
    const axisType = null !== (_a = spec.type) && void 0 !== _a ? _a : "angle" === spec.orient ? "band" : "linear", componentName = `${ComponentTypeEnum.polarAxis}-${axisType}`, startAngleFromSpec = null !== (_b = spec.startAngle) && void 0 !== _b ? _b : chartSpec.startAngle, endAngleFromSpec = null !== (_c = spec.endAngle) && void 0 !== _c ? _c : chartSpec.endAngle;
    return {
        axisType: axisType,
        componentName: componentName,
        startAngle: null != startAngleFromSpec ? startAngleFromSpec : POLAR_START_ANGLE,
        endAngle: null != endAngleFromSpec ? endAngleFromSpec : isValid(startAngleFromSpec) ? startAngleFromSpec + 360 : POLAR_END_ANGLE,
        center: isValid(chartSpec.center) ? chartSpec.center : isValid(null == chartSpec ? void 0 : chartSpec.centerX) || isValid(null == chartSpec ? void 0 : chartSpec.centerY) ? {
            x: null == chartSpec ? void 0 : chartSpec.centerX,
            y: null == chartSpec ? void 0 : chartSpec.centerY
        } : void 0,
        outerRadius: null !== (_f = null !== (_e = null !== (_d = spec.outerRadius) && void 0 !== _d ? _d : spec.radius) && void 0 !== _e ? _e : chartSpec.outerRadius) && void 0 !== _f ? _f : chartSpec.radius,
        layoutRadius: chartSpec.layoutRadius
    };
};

export const computeLayoutRadius = (getLayoutRadius, getLayoutRect, getCenter, getAngles) => {
    const layoutRadius = getLayoutRadius();
    if (isNumber(layoutRadius)) return layoutRadius;
    if (isFunction(layoutRadius)) return layoutRadius(getLayoutRect(), getCenter());
    const rect = getLayoutRect();
    if ("auto" === layoutRadius && rect.width > 0 && rect.height > 0) {
        const {startAngle: startAngle = 0, endAngle: endAngle = 2 * Math.PI} = getAngles();
        return calculateMaxRadius(rect, getCenter(), startAngle, endAngle);
    }
    return Math.min(rect.width / 2, rect.height / 2);
};
//# sourceMappingURL=common.js.map
