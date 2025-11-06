"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerImageMark = exports.ImageMark = void 0;

const factory_1 = require("./../core/factory"), base_mark_1 = require("./base/base-mark"), vgrammar_core_1 = require("@visactor/vgrammar-core");

class ImageMark extends base_mark_1.BaseMark {
    constructor() {
        super(...arguments), this.type = ImageMark.type;
    }
    _getDefaultStyle() {
        return Object.assign(Object.assign({}, super._getDefaultStyle()), {
            width: void 0,
            height: void 0,
            lineWidth: 0
        });
    }
}

exports.ImageMark = ImageMark, ImageMark.type = "image";

const registerImageMark = () => {
    factory_1.Factory.registerMark(ImageMark.type, ImageMark), (0, vgrammar_core_1.registerImageGraphic)();
};

exports.registerImageMark = registerImageMark;
//# sourceMappingURL=image.js.map
