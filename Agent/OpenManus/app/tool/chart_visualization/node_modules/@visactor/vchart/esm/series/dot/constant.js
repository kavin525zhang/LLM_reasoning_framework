import { baseSeriesMark } from "../base/constant";

export const dotSeriesMark = Object.assign(Object.assign({}, baseSeriesMark), {
    group: {
        name: "group",
        type: "group"
    },
    grid: {
        name: "grid",
        type: "rule"
    },
    gridBackground: {
        name: "gridBackground",
        type: "rect"
    },
    dot: {
        name: "dot",
        type: "symbol"
    },
    title: {
        name: "title",
        type: "text"
    },
    subTitle: {
        name: "subTitle",
        type: "text"
    },
    symbol: {
        name: "symbol",
        type: "symbol"
    }
});
//# sourceMappingURL=constant.js.map
