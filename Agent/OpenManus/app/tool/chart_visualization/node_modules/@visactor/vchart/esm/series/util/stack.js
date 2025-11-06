import { valueInScaleRange } from "../../util/scale";

export function stackWithMinHeight(stackCache, stackInverse, context) {
    var _a, _b;
    if (stackCache.values.length > 0) {
        let lastY;
        if (stackCache.sortDatums.length) {
            let sortDatums = stackCache.sortDatums;
            stackInverse && (sortDatums = stackCache.sortDatums.slice().reverse());
            for (let index = 0; index < sortDatums.length; index++) lastY = computeOneDatumY(sortDatums[index].datum, lastY, sortDatums[index].series, context, null === (_b = (_a = sortDatums[index].series[context.axisHelper]).getScale) || void 0 === _b ? void 0 : _b.call(_a, 0), 0 === index);
        } else {
            let seriesInfo = stackCache.series;
            stackInverse && (seriesInfo = seriesInfo.slice().reverse()), seriesInfo.forEach((({s: s, values: values}, sIndex) => {
                var _a, _b;
                const seriesScale = null === (_b = (_a = s[context.axisHelper]).getScale) || void 0 === _b ? void 0 : _b.call(_a, 0);
                for (let index = 0; index < values.length; index++) {
                    const obj = values[stackInverse ? values.length - 1 - index : index];
                    lastY = computeOneDatumY(obj, lastY, s, context, seriesScale, 0 === index && 0 === sIndex);
                }
            }));
        }
    }
    for (const key in stackCache.nodes) stackWithMinHeight(stackCache.nodes[key], stackInverse, context);
}

function computeOneDatumY(obj, lastY, s, context, seriesScale, isFirst) {
    const barMinHeight = s.getSpec().barMinHeight, inverse = s[context.axisHelper].isInverse(), y1 = valueInScaleRange(s[context.startMethod](obj), seriesScale);
    let y = valueInScaleRange(s[context.endMethod](obj), seriesScale);
    isFirst && (lastY = y1);
    let height = Math.abs(y1 - y);
    height < barMinHeight && (height = barMinHeight);
    let flag = 1;
    return y < y1 ? flag = -1 : y === y1 && (flag = context.isVertical ? inverse ? 1 : -1 : inverse ? -1 : 1), 
    y = lastY + flag * height, obj[context.start] = lastY, obj[context.end] = y, y;
}
//# sourceMappingURL=stack.js.map
