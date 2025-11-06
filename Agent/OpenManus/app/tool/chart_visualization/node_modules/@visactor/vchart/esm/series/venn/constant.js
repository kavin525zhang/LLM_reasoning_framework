import { baseSeriesMark } from "../base/constant";

export const vennSeriesMark = Object.assign(Object.assign({}, baseSeriesMark), {
    circle: {
        name: "circle",
        type: "arc"
    },
    overlap: {
        name: "overlap",
        type: "path"
    },
    overlapLabel: {
        name: "overlapLabel",
        type: "text"
    }
});
//# sourceMappingURL=constant.js.map
