"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getPolarCrosshairTheme = exports.getCartesianCrosshairTheme = exports.getDatumByValue = exports.limitTagInBounds = void 0;

const vutils_1 = require("@visactor/vutils"), common_1 = require("../../axis/cartesian/util/common"), vscale_1 = require("@visactor/vscale"), util_1 = require("../../util"), type_1 = require("../../interface/type"), util_2 = require("../../axis/util"), vutils_extension_1 = require("@visactor/vutils-extension");

function limitTagInBounds(shape, bounds) {
    const {x1: regionMinX, y1: regionMinY, x2: regionMaxX, y2: regionMaxY} = bounds, {x1: x1, y1: y1, x2: x2, y2: y2} = shape.AABBBounds, {dx: originDx = 0, dy: originDy = 0} = shape.attribute;
    let dx = 0, dy = 0;
    x1 < regionMinX && (dx = regionMinX - x1), y1 < regionMinY && (dy = regionMinY - y1), 
    x2 > regionMaxX && (dx = regionMaxX - x2), y2 > regionMaxY && (dy = regionMaxY - y2), 
    dx && shape.setAttribute("dx", dx + originDx), dy && shape.setAttribute("dy", dy + originDy);
}

function getDatumByValue(data, value, startField, endField) {
    for (let i = 0, len = data.length; i < len; i++) {
        const record = data[i];
        if (record) {
            const startValue = record[startField], endValue = record[endField || startField];
            if (startValue <= value && endValue >= value) return record;
        }
    }
    return null;
}

exports.limitTagInBounds = limitTagInBounds, exports.getDatumByValue = getDatumByValue;

const getCartesianCrosshairTheme = (chartTheme, chartSpec) => {
    var _a, _b;
    const axes = (0, vutils_1.array)(null !== (_a = chartSpec.axes) && void 0 !== _a ? _a : []), {bandField: bandField, linearField: linearField, xField: xField, yField: yField} = null !== (_b = (0, 
    util_1.getComponentThemeFromOption)(type_1.ComponentTypeEnum.crosshair, chartTheme)) && void 0 !== _b ? _b : {}, xAxis = axes.find((axis => (0, 
    common_1.isXAxis)(axis.orient)));
    let newXField;
    newXField = (0, vutils_1.isValid)(xAxis) ? (0, vutils_extension_1.mergeSpec)({}, (0, 
    util_2.isDiscreteAxis)(xAxis.type) ? bandField : linearField, xField) : xField;
    const yAxis = axes.find((axis => (0, common_1.isYAxis)(axis.orient)));
    let newYField;
    return newYField = (0, vutils_1.isValid)(yAxis) ? (0, vutils_extension_1.mergeSpec)({}, (0, 
    vscale_1.isDiscrete)(yAxis.type) ? bandField : linearField, yField) : yField, {
        xField: newXField,
        yField: newYField
    };
};

exports.getCartesianCrosshairTheme = getCartesianCrosshairTheme;

const getPolarCrosshairTheme = (chartTheme, chartSpec) => {
    var _a, _b;
    const axes = (0, vutils_1.array)(null !== (_a = chartSpec.axes) && void 0 !== _a ? _a : []), {bandField: bandField, linearField: linearField, categoryField: categoryField, valueField: valueField} = null !== (_b = (0, 
    util_1.getComponentThemeFromOption)(type_1.ComponentTypeEnum.crosshair, chartTheme)) && void 0 !== _b ? _b : {}, angleAxis = axes.find((axis => "angle" === axis.orient));
    let newAngleField;
    newAngleField = (0, vutils_1.isValid)(angleAxis) ? (0, vutils_extension_1.mergeSpec)({}, (0, 
    util_2.isDiscreteAxis)(angleAxis.type) ? bandField : linearField, categoryField) : categoryField;
    const radiusAxis = axes.find((axis => "radius" === axis.orient));
    let newRadiusField;
    return newRadiusField = (0, vutils_1.isValid)(radiusAxis) ? (0, vutils_extension_1.mergeSpec)({}, (0, 
    vscale_1.isDiscrete)(radiusAxis.type) ? bandField : linearField, valueField) : valueField, 
    {
        categoryField: newAngleField,
        valueField: newRadiusField
    };
};

exports.getPolarCrosshairTheme = getPolarCrosshairTheme;
//# sourceMappingURL=common.js.map
