import { AttributeLevel } from "../../../constant/attribute";

import { SeriesTypeEnum } from "../../interface/type";

import { registerArc3dMark } from "../../../mark/arc-3d";

import { BasePieSeries } from "../pie";

import { pie3dSeriesMark } from "../constant";

import { Factory } from "../../../core/factory";

import { registerPie3dAnimation } from "../animation/animation";

import { Pie3dSeriesSpecTransformer } from "./pie-3d-transformer";

export class Pie3dSeries extends BasePieSeries {
    constructor() {
        super(...arguments), this.type = SeriesTypeEnum.pie3d, this._pieMarkName = "pie3d", 
        this._pieMarkType = "arc3d", this.transformerConstructor = Pie3dSeriesSpecTransformer;
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
        }, "normal", AttributeLevel.Series);
    }
    initLabelMarkStyle(textMark, spec = {}) {
        textMark && (super.initLabelMarkStyle(textMark), this.setMarkStyle(textMark, {
            support3d: !0
        }, void 0, AttributeLevel.Mark));
    }
}

Pie3dSeries.type = SeriesTypeEnum.pie3d, Pie3dSeries.mark = pie3dSeriesMark, Pie3dSeries.transformerConstructor = Pie3dSeriesSpecTransformer;

export const registerPie3dSeries = () => {
    registerPie3dAnimation(), registerArc3dMark(), Factory.registerSeries(Pie3dSeries.type, Pie3dSeries);
};
//# sourceMappingURL=pie-3d.js.map
