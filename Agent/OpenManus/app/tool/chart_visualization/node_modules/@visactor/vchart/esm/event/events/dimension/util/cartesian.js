import { isDiscrete } from "@visactor/vscale";

import { getDimensionData, getAxis } from "./common";

import { isNil } from "@visactor/vutils";

import { isXAxis, isYAxis } from "../../../../component/axis/cartesian/util/common";

const discreteXAxisGetDimensionField = series => series.fieldX[0], discreteYAxisGetDimensionField = series => series.fieldY[0], continuousXAxisGetDimensionField = series => {
    var _a;
    return [ series.fieldX[0], null !== (_a = series.fieldX2) && void 0 !== _a ? _a : series.fieldX[1] ];
}, continuousYAxisGetDimensionField = series => {
    var _a;
    return [ series.fieldY[0], null !== (_a = series.fieldY2) && void 0 !== _a ? _a : series.fieldY[1] ];
}, getDimensionFieldFunc = (isXAxis, isDiscreteAxis) => isXAxis ? isDiscreteAxis ? discreteXAxisGetDimensionField : continuousXAxisGetDimensionField : isDiscreteAxis ? discreteYAxisGetDimensionField : continuousYAxisGetDimensionField;

export const getCartesianDimensionInfo = (chart, pos, isTooltip) => {
    var _a, _b;
    if (!chart) return null;
    const {x: x, y: y} = pos, xAxisList = null !== (_a = getAxis(chart, (cmp => isXAxis(cmp.getOrient())), pos)) && void 0 !== _a ? _a : [], yAxisList = null !== (_b = getAxis(chart, (cmp => isYAxis(cmp.getOrient())), pos)) && void 0 !== _b ? _b : [];
    if (!xAxisList.length && !yAxisList.length) return null;
    const bandAxisSet = new Set, linearAxisSet = new Set, forceAxisSet = new Set;
    [ xAxisList, yAxisList ].forEach((axisList => axisList.forEach((axis => {
        isDiscrete(axis.getScale().type) ? bandAxisSet.add(axis) : linearAxisSet.add(axis), 
        isTooltip && axis.getSpec().hasDimensionTooltip && forceAxisSet.add(axis);
    }))));
    const targetAxisInfo = [], addAxisDimensionInfo = orient => {
        const isXAxis = "x" === orient, posValue = isXAxis ? x : y;
        (isXAxis ? xAxisList : yAxisList).forEach((axis => {
            if (forceAxisSet.size > 0) {
                if (forceAxisSet.has(axis)) {
                    const info = getDimensionInfoByPosition(axis, posValue, getDimensionFieldFunc(isXAxis, isDiscrete(axis.getScale().type)));
                    info && targetAxisInfo.push(info);
                }
            } else {
                const hasDiscreteAxis = bandAxisSet.size > 0;
                if ((hasDiscreteAxis ? bandAxisSet : linearAxisSet).has(axis)) {
                    const info = getDimensionInfoByPosition(axis, posValue, getDimensionFieldFunc(isXAxis, hasDiscreteAxis));
                    info && targetAxisInfo.push(info);
                }
            }
        }));
    };
    return "horizontal" === chart.getSpec().direction ? (addAxisDimensionInfo("y"), 
    0 === targetAxisInfo.length && addAxisDimensionInfo("x")) : (addAxisDimensionInfo("x"), 
    0 === targetAxisInfo.length && addAxisDimensionInfo("y")), targetAxisInfo.length ? targetAxisInfo : null;
};

export const getDimensionInfoByPosition = (axis, posValue, getDimensionField) => {
    const value = axis.positionToData(posValue, !0);
    return isNil(value) ? null : getDimensionInfoByValue(axis, value, getDimensionField);
};

export const getDimensionInfoByValue = (axis, value, getDimensionField) => {
    const scale = axis.getScale();
    if (isNil(value)) return null;
    let index = scale.domain().findIndex((v => (null == v ? void 0 : v.toString()) === value.toString()));
    index < 0 && (index = void 0);
    const data = getDimensionData(value, axis, "cartesian", null != getDimensionField ? getDimensionField : isXAxis(axis.getOrient()) ? discreteXAxisGetDimensionField : discreteYAxisGetDimensionField);
    return {
        index: index,
        value: value,
        position: scale.scale(value),
        axis: axis,
        data: data
    };
};
//# sourceMappingURL=cartesian.js.map
