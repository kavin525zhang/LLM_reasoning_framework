"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerRangeColumn3dSeries = exports.RangeColumn3dSeries = exports.DefaultBandWidth = void 0;

const type_1 = require("../../interface/type"), range_column_1 = require("../range-column"), rect_3d_1 = require("../../../mark/rect-3d"), constant_1 = require("../constant"), factory_1 = require("../../../core/factory"), cartesian_1 = require("../../../component/axis/cartesian");

exports.DefaultBandWidth = 6;

class RangeColumn3dSeries extends range_column_1.RangeColumnSeries {
    constructor() {
        super(...arguments), this.type = type_1.SeriesTypeEnum.rangeColumn3d, this._barMarkType = "rect3d", 
        this._barName = type_1.SeriesTypeEnum.bar3d;
    }
}

exports.RangeColumn3dSeries = RangeColumn3dSeries, RangeColumn3dSeries.type = type_1.SeriesTypeEnum.rangeColumn3d, 
RangeColumn3dSeries.mark = constant_1.rangeColumn3dSeriesMark;

const registerRangeColumn3dSeries = () => {
    (0, rect_3d_1.registerRect3dMark)(), (0, cartesian_1.registerCartesianBandAxis)(), 
    (0, cartesian_1.registerCartesianLinearAxis)(), factory_1.Factory.registerSeries(RangeColumn3dSeries.type, RangeColumn3dSeries);
};

exports.registerRangeColumn3dSeries = registerRangeColumn3dSeries;
//# sourceMappingURL=range-column-3d.js.map
