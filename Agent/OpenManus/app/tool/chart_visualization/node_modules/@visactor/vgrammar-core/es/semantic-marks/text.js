import { GrammarMarkType } from "../graph/enums";

import { Mark } from "../view/mark";

import { createGraphicItem } from "../graph/util/graphic";

export class Text extends Mark {
    addGraphicItem(initAttrs, groupKey) {
        const originalAttrs = initAttrs && initAttrs.limitAttrs, isRich = originalAttrs && ("rich" === originalAttrs.textType || originalAttrs.text && "rich" === originalAttrs.text.type), graphicItem = createGraphicItem(this, isRich ? GrammarMarkType.richtext : GrammarMarkType.text, initAttrs);
        return super.addGraphicItem(initAttrs, groupKey, graphicItem);
    }
    release() {
        super.release();
    }
}

Text.markType = GrammarMarkType.text;
//# sourceMappingURL=text.js.map
