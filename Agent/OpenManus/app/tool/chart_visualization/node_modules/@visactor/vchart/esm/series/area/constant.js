import { baseSeriesMark } from "../base/constant";

import { lineLikeSeriesMark } from "../mixin/constant";

export const areaSeriesMark = Object.assign(Object.assign(Object.assign({}, baseSeriesMark), lineLikeSeriesMark), {
    area: {
        name: "area",
        type: "area"
    }
});
//# sourceMappingURL=constant.js.map
