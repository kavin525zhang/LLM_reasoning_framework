import { array, isValid } from "@visactor/vutils";

import { isXAxis, isYAxis } from "../../axis/cartesian/util/common";

import { isDiscrete } from "@visactor/vscale";

import { getComponentThemeFromOption } from "../../util";

import { ComponentTypeEnum } from "../../interface/type";

import { isDiscreteAxis } from "../../axis/util";

import { mergeSpec } from "@visactor/vutils-extension";

export function limitTagInBounds(shape, bounds) {
    const {x1: regionMinX, y1: regionMinY, x2: regionMaxX, y2: regionMaxY} = bounds, {x1: x1, y1: y1, x2: x2, y2: y2} = shape.AABBBounds, {dx: originDx = 0, dy: originDy = 0} = shape.attribute;
    let dx = 0, dy = 0;
    x1 < regionMinX && (dx = regionMinX - x1), y1 < regionMinY && (dy = regionMinY - y1), 
    x2 > regionMaxX && (dx = regionMaxX - x2), y2 > regionMaxY && (dy = regionMaxY - y2), 
    dx && shape.setAttribute("dx", dx + originDx), dy && shape.setAttribute("dy", dy + originDy);
}

export function getDatumByValue(data, value, startField, endField) {
    for (let i = 0, len = data.length; i < len; i++) {
        const record = data[i];
        if (record) {
            const startValue = record[startField], endValue = record[endField || startField];
            if (startValue <= value && endValue >= value) return record;
        }
    }
    return null;
}

export const getCartesianCrosshairTheme = (chartTheme, chartSpec) => {
    var _a, _b;
    const axes = array(null !== (_a = chartSpec.axes) && void 0 !== _a ? _a : []), {bandField: bandField, linearField: linearField, xField: xField, yField: yField} = null !== (_b = getComponentThemeFromOption(ComponentTypeEnum.crosshair, chartTheme)) && void 0 !== _b ? _b : {}, xAxis = axes.find((axis => isXAxis(axis.orient)));
    let newXField;
    newXField = isValid(xAxis) ? mergeSpec({}, isDiscreteAxis(xAxis.type) ? bandField : linearField, xField) : xField;
    const yAxis = axes.find((axis => isYAxis(axis.orient)));
    let newYField;
    return newYField = isValid(yAxis) ? mergeSpec({}, isDiscrete(yAxis.type) ? bandField : linearField, yField) : yField, 
    {
        xField: newXField,
        yField: newYField
    };
};

export const getPolarCrosshairTheme = (chartTheme, chartSpec) => {
    var _a, _b;
    const axes = array(null !== (_a = chartSpec.axes) && void 0 !== _a ? _a : []), {bandField: bandField, linearField: linearField, categoryField: categoryField, valueField: valueField} = null !== (_b = getComponentThemeFromOption(ComponentTypeEnum.crosshair, chartTheme)) && void 0 !== _b ? _b : {}, angleAxis = axes.find((axis => "angle" === axis.orient));
    let newAngleField;
    newAngleField = isValid(angleAxis) ? mergeSpec({}, isDiscreteAxis(angleAxis.type) ? bandField : linearField, categoryField) : categoryField;
    const radiusAxis = axes.find((axis => "radius" === axis.orient));
    let newRadiusField;
    return newRadiusField = isValid(radiusAxis) ? mergeSpec({}, isDiscrete(radiusAxis.type) ? bandField : linearField, valueField) : valueField, 
    {
        categoryField: newAngleField,
        valueField: newRadiusField
    };
};
//# sourceMappingURL=common.js.map
