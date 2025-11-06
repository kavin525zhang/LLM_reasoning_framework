import { Factory } from "./../core/factory";

import { BaseMark } from "./base/base-mark";

import { registerRichTextGraphic, registerTextGraphic } from "@visactor/vgrammar-core";

export class TextMark extends BaseMark {
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

TextMark.type = "text";

export const registerTextMark = () => {
    Factory.registerMark(TextMark.type, TextMark), registerTextGraphic(), registerRichTextGraphic();
};
//# sourceMappingURL=text.js.map
