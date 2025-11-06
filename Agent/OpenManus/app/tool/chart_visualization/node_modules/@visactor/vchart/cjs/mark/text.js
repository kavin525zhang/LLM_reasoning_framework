"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerTextMark = exports.TextMark = void 0;

const factory_1 = require("./../core/factory"), base_mark_1 = require("./base/base-mark"), vgrammar_core_1 = require("@visactor/vgrammar-core");

class TextMark extends base_mark_1.BaseMark {
    getTextType() {
        return this._textType;
    }
    constructor(name, option) {
        super(name, option), this.type = TextMark.type, this._textType = "text";
    }
    _getDefaultStyle() {
        return Object.assign(Object.assign({}, super._getDefaultStyle()), {
            angle: 0,
            textAlign: "center",
            lineWidth: 0,
            textConfig: []
        });
    }
    initStyleWithSpec(spec, key) {
        super.initStyleWithSpec(spec, key), spec.textType && (this._textType = spec.textType);
    }
    compileEncode() {
        super.compileEncode(), "rich" === this._textType && this._product.encodeState("group", {
            textType: this._textType
        });
    }
}

exports.TextMark = TextMark, TextMark.type = "text";

const registerTextMark = () => {
    factory_1.Factory.registerMark(TextMark.type, TextMark), (0, vgrammar_core_1.registerTextGraphic)(), 
    (0, vgrammar_core_1.registerRichTextGraphic)();
};

exports.registerTextMark = registerTextMark;
//# sourceMappingURL=text.js.map
