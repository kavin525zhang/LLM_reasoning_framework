"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerPie3dSeries = exports.Pie3dSeries = void 0;

const attribute_1 = require("../../../constant/attribute"), type_1 = require("../../interface/type"), arc_3d_1 = require("../../../mark/arc-3d"), pie_1 = require("../pie"), constant_1 = require("../constant"), factory_1 = require("../../../core/factory"), animation_1 = require("../animation/animation"), pie_3d_transformer_1 = require("./pie-3d-transformer");

class Pie3dSeries extends pie_1.BasePieSeries {
    constructor() {
        super(...arguments), this.type = type_1.SeriesTypeEnum.pie3d, this._pieMarkName = "pie3d", 
        this._pieMarkType = "arc3d", this.transformerConstructor = pie_3d_transformer_1.Pie3dSeriesSpecTransformer;
    }
    setAttrFromSpec() {
        var _a, _b;
        super.setAttrFromSpec(), this._angle3d = null !== (_b = null === (_a = this._spec) || void 0 === _a ? void 0 : _a.angle3d) && void 0 !== _b ? _b : -Math.PI / 3;
    }
    initMarkStyle() {
        super.initMarkStyle();
        const pieMark = this._pieMark;
        pieMark && this.setMarkStyle(pieMark, {
            beta: () => this._angle3d
        }, "normal", attribute_1.AttributeLevel.Series);
    }
    initLabelMarkStyle(textMark, spec = {}) {
        textMark && (super.initLabelMarkStyle(textMark), this.setMarkStyle(textMark, {
            support3d: !0
        }, void 0, attribute_1.AttributeLevel.Mark));
    }
}

exports.Pie3dSeries = Pie3dSeries, Pie3dSeries.type = type_1.SeriesTypeEnum.pie3d, 
Pie3dSeries.mark = constant_1.pie3dSeriesMark, Pie3dSeries.transformerConstructor = pie_3d_transformer_1.Pie3dSeriesSpecTransformer;

const registerPie3dSeries = () => {
    (0, animation_1.registerPie3dAnimation)(), (0, arc_3d_1.registerArc3dMark)(), factory_1.Factory.registerSeries(Pie3dSeries.type, Pie3dSeries);
};

exports.registerPie3dSeries = registerPie3dSeries;
//# sourceMappingURL=pie-3d.js.map
