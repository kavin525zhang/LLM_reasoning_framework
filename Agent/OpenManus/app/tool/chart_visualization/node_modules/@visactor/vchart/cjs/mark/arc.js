"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerArcMark = exports.ArcMark = exports.BaseArcMark = void 0;

const factory_1 = require("./../core/factory"), polar_1 = require("../constant/polar"), base_mark_1 = require("./base/base-mark"), vgrammar_core_1 = require("@visactor/vgrammar-core"), config_1 = require("../animation/config"), vutils_1 = require("@visactor/vutils");

class BaseArcMark extends base_mark_1.BaseMark {
    constructor(name, option) {
        super(name, option), this.type = ArcMark.type, this._unCompileChannel = {
            centerOffset: !0,
            radiusOffset: !0
        }, this.computeOuterRadius = (key, datum, states = "normal", opt, superValue) => {
            var _a;
            return superValue + (null !== (_a = this.getAttribute("radiusOffset", datum, states, opt)) && void 0 !== _a ? _a : 0);
        }, this.computeCenter = (key, datum, states = "normal", opt, center) => (0, vutils_1.polarToCartesian)({
            x: 0,
            y: 0
        }, this.getAttribute("centerOffset", datum, states, opt), datum[polar_1.ARC_MIDDLE_ANGLE])[key] + center, 
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

exports.BaseArcMark = BaseArcMark;

class ArcMark extends BaseArcMark {
    constructor() {
        super(...arguments), this.type = ArcMark.type;
    }
}

exports.ArcMark = ArcMark, ArcMark.type = "arc";

const registerArcMark = () => {
    (0, vgrammar_core_1.registerArcGraphic)(), (0, config_1.registerVGrammarArcAnimation)(), 
    factory_1.Factory.registerMark(ArcMark.type, ArcMark);
};

exports.registerArcMark = registerArcMark;
//# sourceMappingURL=arc.js.map
