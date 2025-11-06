import { Factory } from "./../core/factory";

import { ARC_MIDDLE_ANGLE } from "../constant/polar";

import { BaseMark } from "./base/base-mark";

import { registerArcGraphic } from "@visactor/vgrammar-core";

import { registerVGrammarArcAnimation } from "../animation/config";

import { polarToCartesian } from "@visactor/vutils";

export class BaseArcMark extends BaseMark {
    constructor(name, option) {
        super(name, option), this.type = ArcMark.type, this._unCompileChannel = {
            centerOffset: !0,
            radiusOffset: !0
        }, this.computeOuterRadius = (key, datum, states = "normal", opt, superValue) => {
            var _a;
            return superValue + (null !== (_a = this.getAttribute("radiusOffset", datum, states, opt)) && void 0 !== _a ? _a : 0);
        }, this.computeCenter = (key, datum, states = "normal", opt, center) => polarToCartesian({
            x: 0,
            y: 0
        }, this.getAttribute("centerOffset", datum, states, opt), datum[ARC_MIDDLE_ANGLE])[key] + center, 
        this._computeExChannel.x = this.computeCenter, this._computeExChannel.y = this.computeCenter, 
        this._computeExChannel.outerRadius = this.computeOuterRadius, this._extensionChannel.centerOffset = [ "x", "y" ], 
        this._extensionChannel.radiusOffset = [ "outerRadius" ];
    }
    _getDefaultStyle() {
        return Object.assign(Object.assign({}, super._getDefaultStyle()), {
            startAngle: 0,
            endAngle: 0,
            outerRadius: 0,
            innerRadius: 0,
            cornerRadius: 0,
            lineWidth: 0,
            innerPadding: 0,
            outerPadding: 0
        });
    }
}

export class ArcMark extends BaseArcMark {
    constructor() {
        super(...arguments), this.type = ArcMark.type;
    }
}

ArcMark.type = "arc";

export const registerArcMark = () => {
    registerArcGraphic(), registerVGrammarArcAnimation(), Factory.registerMark(ArcMark.type, ArcMark);
};
//# sourceMappingURL=arc.js.map
