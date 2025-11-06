import { progressLikeSeriesMark } from "../../polar/progress-like/constant";

export const circularProgressSeriesMark = Object.assign(Object.assign({}, progressLikeSeriesMark), {
    track: {
        name: "track",
        type: "arc"
    },
    progress: {
        name: "progress",
        type: "arc"
    }
});
//# sourceMappingURL=constant.js.map
