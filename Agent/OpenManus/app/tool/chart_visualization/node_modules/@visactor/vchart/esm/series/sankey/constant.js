import { baseSeriesMark } from "../base/constant";

export const sankeySeriesMark = Object.assign(Object.assign({}, baseSeriesMark), {
    node: {
        name: "node",
        type: "rect"
    },
    link: {
        name: "link",
        type: "linkPath"
    }
});
//# sourceMappingURL=constant.js.map
