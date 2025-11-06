import { ElementSelect } from "./element-select";

export class ElementSelectByGraphicName extends ElementSelect {
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

ElementSelectByGraphicName.type = "element-select-by-graphic-name";
//# sourceMappingURL=element-select-by-graphic-name.js.map