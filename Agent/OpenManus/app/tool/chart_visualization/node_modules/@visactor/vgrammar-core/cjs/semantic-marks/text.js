"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Text = void 0;

const enums_1 = require("../graph/enums"), mark_1 = require("../view/mark"), graphic_1 = require("../graph/util/graphic");

class Text extends mark_1.Mark {
    addGraphicItem(initAttrs, groupKey) {
        const originalAttrs = initAttrs && initAttrs.limitAttrs, isRich = originalAttrs && ("rich" === originalAttrs.textType || originalAttrs.text && "rich" === originalAttrs.text.type), graphicItem = (0, 
        graphic_1.createGraphicItem)(this, isRich ? enums_1.GrammarMarkType.richtext : enums_1.GrammarMarkType.text, initAttrs);
        return super.addGraphicItem(initAttrs, groupKey, graphicItem);
    }
    release() {
        super.release();
    }
}

exports.Text = Text, Text.markType = enums_1.GrammarMarkType.text;
//# sourceMappingURL=text.js.map
