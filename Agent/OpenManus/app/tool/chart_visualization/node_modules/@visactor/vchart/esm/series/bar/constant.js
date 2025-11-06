import { baseSeriesMark } from "../base/constant";

export const barSeriesMark = Object.assign(Object.assign({}, baseSeriesMark), {
    bar: {
        name: "bar",
        type: "rect"
    },
    barBackground: {
        name: "barBackground",
        type: "rect"
    }
});

export const bar3dSeriesMark = Object.assign(Object.assign({}, baseSeriesMark), {
    bar3d: {
        name: "bar3d",
        type: "rect3d"
    }
});
//# sourceMappingURL=constant.js.map
