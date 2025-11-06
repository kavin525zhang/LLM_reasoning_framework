import { Factory } from "./../core/factory";

import { BaseMark } from "./base/base-mark";

import { registerRuleGraphic } from "@visactor/vgrammar-core";

export class RuleMark extends BaseMark {
    constructor() {
        super(...arguments), this.type = RuleMark.type;
    }
    _getDefaultStyle() {
        return Object.assign(Object.assign({}, super._getDefaultStyle()), {
            x1: 0,
            y1: 0
        });
    }
}

RuleMark.type = "rule";

export const registerRuleMark = () => {
    Factory.registerMark(RuleMark.type, RuleMark), registerRuleGraphic();
};
//# sourceMappingURL=rule.js.map
