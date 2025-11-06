import { barSeriesMark } from "../bar/constant";

export const waterfallSeriesMark = Object.assign(Object.assign({}, barSeriesMark), {
    leaderLine: {
        name: "leaderLine",
        type: "rule"
    },
    stackLabel: {
        name: "stackLabel",
        type: "text"
    }
});
//# sourceMappingURL=constant.js.map
