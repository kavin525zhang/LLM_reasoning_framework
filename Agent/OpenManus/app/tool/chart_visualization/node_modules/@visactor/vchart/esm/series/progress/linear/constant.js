import { baseSeriesMark } from "../../base/constant";

export const linearProgressSeriesMark = Object.assign(Object.assign({}, baseSeriesMark), {
    track: {
        name: "track",
        type: "rect"
    },
    progress: {
        name: "progress",
        type: "rect"
    },
    group: {
        name: "group",
        type: "group"
    }
});
//# sourceMappingURL=constant.js.map
