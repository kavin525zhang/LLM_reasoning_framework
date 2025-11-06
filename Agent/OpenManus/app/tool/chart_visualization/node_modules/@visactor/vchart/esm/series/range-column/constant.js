import { bar3dSeriesMark, barSeriesMark } from "../bar/constant";

export const rangeColumnSeriesMark = Object.assign(Object.assign({}, barSeriesMark), {
    minLabel: {
        name: "minLabel",
        type: "text"
    },
    maxLabel: {
        name: "maxLabel",
        type: "text"
    }
});

export const rangeColumn3dSeriesMark = Object.assign(Object.assign({}, bar3dSeriesMark), {
    minLabel: {
        name: "minLabel",
        type: "text"
    },
    maxLabel: {
        name: "maxLabel",
        type: "text"
    }
});
//# sourceMappingURL=constant.js.map
