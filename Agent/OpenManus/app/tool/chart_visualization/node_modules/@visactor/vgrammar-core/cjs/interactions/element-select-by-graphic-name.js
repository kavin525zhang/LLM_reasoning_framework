"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ElementSelectByGraphicName = void 0;

const element_select_1 = require("./element-select");

class ElementSelectByGraphicName extends element_select_1.ElementSelect {
    constructor() {
        super(...arguments), this.type = ElementSelectByGraphicName.type;
    }
    start(element) {
        var _a;
        const name = null === (_a = element.getGraphicItem()) || void 0 === _a ? void 0 : _a.name;
        name && this._marks.forEach((mark => {
            mark.elements.forEach((el => {
                var _a;
                (null === (_a = el.getGraphicItem()) || void 0 === _a ? void 0 : _a.name) === name && super.start(el);
            }));
        }));
    }
}

exports.ElementSelectByGraphicName = ElementSelectByGraphicName, ElementSelectByGraphicName.type = "element-select-by-graphic-name";
//# sourceMappingURL=element-select-by-graphic-name.js.map