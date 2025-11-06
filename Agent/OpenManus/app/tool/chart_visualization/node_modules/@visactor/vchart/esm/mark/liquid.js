import { Factory } from "./../core/factory";

import { registerWaveGlyph } from "@visactor/vgrammar-core";

import { BaseMark } from "./base";

const WAVE_GLYPH_TYPE = "wave";

export class LiquidMark extends BaseMark {
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

LiquidMark.type = "liquid";

export const registerLiquidMark = () => {
    Factory.registerMark(LiquidMark.type, LiquidMark), registerWaveGlyph();
};
//# sourceMappingURL=liquid.js.map
