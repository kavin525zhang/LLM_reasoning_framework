import { initTextMeasure as initTextMeasureFunc } from "@visactor/vrender-components";

import { token } from "../theme/token";

export const initTextMeasure = (textSpec, option, useNaiveCanvas) => initTextMeasureFunc(textSpec, option, useNaiveCanvas, {
    fontFamily: token.fontFamily,
    fontSize: token.fontSize
});

export const measureText = (text, textSpec, option, useNaiveCanvas) => initTextMeasure(textSpec, option, useNaiveCanvas).measure(text);
//# sourceMappingURL=text.js.map
