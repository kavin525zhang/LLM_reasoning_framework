import { baseSeriesMark } from "../base/constant";

export const treemapSeriesMark = Object.assign(Object.assign({}, baseSeriesMark), {
    nonLeaf: {
        name: "nonLeaf",
        type: "rect"
    },
    leaf: {
        name: "leaf",
        type: "rect"
    },
    nonLeafLabel: {
        name: "nonLeafLabel",
        type: "text"
    }
});
//# sourceMappingURL=constant.js.map
