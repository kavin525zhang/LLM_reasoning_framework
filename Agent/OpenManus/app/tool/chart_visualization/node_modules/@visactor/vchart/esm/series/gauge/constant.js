import { baseSeriesMark } from "../base/constant";

import { progressLikeSeriesMark } from "../polar/progress-like/constant";

export const gaugeSeriesMark = Object.assign(Object.assign({}, progressLikeSeriesMark), {
    segment: {
        name: "segment",
        type: "arc"
    },
    track: {
        name: "track",
        type: "arc"
    }
});

export const gaugePointerSeriesMark = Object.assign(Object.assign({}, baseSeriesMark), {
    pin: {
        name: "pin",
        type: "path"
    },
    pinBackground: {
        name: "pinBackground",
        type: "path"
    },
    pointer: {
        name: "pointer",
        type: [ "path", "rect" ]
    }
});
//# sourceMappingURL=constant.js.map
