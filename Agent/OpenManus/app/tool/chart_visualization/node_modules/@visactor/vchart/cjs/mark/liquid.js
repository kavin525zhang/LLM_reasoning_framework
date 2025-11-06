"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerLiquidMark = exports.LiquidMark = void 0;

const factory_1 = require("./../core/factory"), vgrammar_core_1 = require("@visactor/vgrammar-core"), base_1 = require("./base"), WAVE_GLYPH_TYPE = "wave";

class LiquidMark extends base_1.BaseMark {
    constructor() {
        super(...arguments), this.type = LiquidMark.type;
    }
    _getDefaultStyle() {
        return Object.assign(Object.assign({}, super._getDefaultStyle()), {
            wave: 0
        });
    }
    _initProduct(group) {
        const view = this.getVGrammarView(), id = this.getProductId();
        this._product = view.glyph("wave", null != group ? group : view.rootMark).id(id), 
        this._compiledProductId = id;
    }
}

exports.LiquidMark = LiquidMark, LiquidMark.type = "liquid";

const registerLiquidMark = () => {
    factory_1.Factory.registerMark(LiquidMark.type, LiquidMark), (0, vgrammar_core_1.registerWaveGlyph)();
};

exports.registerLiquidMark = registerLiquidMark;
//# sourceMappingURL=liquid.js.map
