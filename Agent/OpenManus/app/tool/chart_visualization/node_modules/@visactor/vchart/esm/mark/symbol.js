import { Factory } from "./../core/factory";

import { BaseMark } from "./base/base-mark";

import { registerSymbolGraphic } from "@visactor/vgrammar-core";

export class BaseSymbolMark extends BaseMark {
    _getDefaultStyle() {
        return Object.assign(Object.assign({}, super._getDefaultStyle()), {
            size: 1,
            symbolType: "circle",
            fill: void 0,
            lineWidth: 0
        });
    }
}

export class SymbolMark extends BaseSymbolMark {
    constructor() {
        super(...arguments), this.type = SymbolMark.type;
    }
}

SymbolMark.type = "symbol";

export const registerSymbolMark = () => {
    Factory.registerMark(SymbolMark.type, SymbolMark), registerSymbolGraphic();
};
//# sourceMappingURL=symbol.js.map
