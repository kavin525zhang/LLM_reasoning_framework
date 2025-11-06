import { baseSeriesMark } from "../base/constant";

export const pieSeriesMark = Object.assign(Object.assign({}, baseSeriesMark), {
    pie: {
        name: "pie",
        type: "arc"
    },
    labelLine: {
        name: "labelLine",
        type: "path"
    }
});

export const pie3dSeriesMark = Object.assign(Object.assign({}, baseSeriesMark), {
    pie3d: {
        name: "pie3d",
        type: "arc3d"
    },
    labelLine: {
        name: "labelLine",
        type: "path"
    }
});
//# sourceMappingURL=constant.js.map
