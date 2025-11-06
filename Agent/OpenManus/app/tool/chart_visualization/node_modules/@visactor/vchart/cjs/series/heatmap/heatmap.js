"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerHeatmapSeries = exports.HeatmapSeries = exports.DefaultBandWidth = void 0;

const cell_1 = require("./../../mark/cell"), cartesian_1 = require("../cartesian/cartesian"), attribute_1 = require("../../constant/attribute"), animation_1 = require("./animation"), utils_1 = require("../../animation/utils"), text_1 = require("../../mark/text"), type_1 = require("../interface/type"), vutils_1 = require("@visactor/vutils"), tooltip_helper_1 = require("./tooltip-helper"), constant_1 = require("./constant"), factory_1 = require("../../core/factory"), utils_2 = require("../util/utils"), heatmap_transformer_1 = require("./heatmap-transformer"), cartesian_2 = require("../../component/axis/cartesian");

exports.DefaultBandWidth = 6;

class HeatmapSeries extends cartesian_1.CartesianSeries {
    constructor() {
        super(...arguments), this.type = type_1.SeriesTypeEnum.heatmap, this.transformerConstructor = heatmap_transformer_1.HeatmapSeriesSpecTransformer;
    }
    getFieldValue() {
        return this._fieldValue;
    }
    setFieldValue(f) {
        this._fieldValue = (0, vutils_1.array)(f);
    }
    setAttrFromSpec() {
        super.setAttrFromSpec(), this.setFieldValue(this._spec.valueField);
    }
    initMark() {
        var _a, _b, _c, _d;
        const progressive = {
            progressiveStep: this._spec.progressiveStep,
            progressiveThreshold: this._spec.progressiveThreshold,
            large: this._spec.large,
            largeThreshold: this._spec.largeThreshold
        };
        this._cellMark = this._createMark(HeatmapSeries.mark.cell, {
            isSeriesMark: !0,
            stateSort: null === (_a = this._spec.cell) || void 0 === _a ? void 0 : _a.stateSort
        }, Object.assign(Object.assign({}, progressive), {
            setCustomizedShape: null === (_b = this._spec.cell) || void 0 === _b ? void 0 : _b.customShape,
            morph: (0, utils_1.shouldMarkDoMorph)(this._spec, HeatmapSeries.mark.cell.name),
            morphElementKey: this.getDimensionField()[0]
        })), this._backgroundMark = this._createMark(HeatmapSeries.mark.cellBackground, {
            stateSort: null === (_c = this._spec.cellBackground) || void 0 === _c ? void 0 : _c.stateSort
        }, Object.assign(Object.assign({}, progressive), {
            setCustomizedShape: null === (_d = this._spec.cellBackground) || void 0 === _d ? void 0 : _d.customShape
        }));
    }
    initMarkStyle() {
        this.initCellMarkStyle(), this.initCellBackgroundMarkStyle();
    }
    initLabelMarkStyle(textMark) {
        textMark && this.setMarkStyle(textMark, {
            fill: this.getColorAttribute(),
            text: datum => datum[this.getMeasureField()[0]]
        });
    }
    initCellMarkStyle() {
        this.setMarkStyle(this._cellMark, {
            x: datum => this.dataToPositionX(datum),
            y: datum => this.dataToPositionY(datum),
            size: () => [ this.getCellSize(this._xAxisHelper), this.getCellSize(this._yAxisHelper) ],
            fill: this.getColorAttribute()
        }, "normal", attribute_1.AttributeLevel.Series);
    }
    initCellBackgroundMarkStyle() {
        var _a, _b, _c;
        const padding = (0, vutils_1.normalizePadding)(null !== (_c = null === (_b = null === (_a = this._spec.cellBackground) || void 0 === _a ? void 0 : _a.style) || void 0 === _b ? void 0 : _b.padding) && void 0 !== _c ? _c : 0);
        this.setMarkStyle(this._backgroundMark, {
            x: datum => {
                const width = this.getCellSize(this._xAxisHelper);
                return this.dataToPositionX(datum) - width / 2 + padding[3];
            },
            y: datum => {
                const height = this.getCellSize(this._yAxisHelper);
                return this.dataToPositionY(datum) - height / 2 + padding[0];
            },
            width: () => this.getCellSize(this._xAxisHelper) - padding[1] - padding[3],
            height: () => this.getCellSize(this._yAxisHelper) - padding[0] - padding[2]
        }, "normal", attribute_1.AttributeLevel.Series);
    }
    getColorAttribute() {
        var _a;
        return {
            scale: null !== (_a = this._option.globalScale.getScale("color")) && void 0 !== _a ? _a : this._getDefaultColorScale(),
            field: this.getFieldValue[0]
        };
    }
    initInteraction() {
        this._parseInteractionConfig(this._cellMark ? [ this._cellMark ] : []);
    }
    initAnimation() {
        var _a, _b, _c;
        const appearPreset = null === (_b = null === (_a = this._spec) || void 0 === _a ? void 0 : _a.animationAppear) || void 0 === _b ? void 0 : _b.preset, animationParams = (0, 
        utils_2.getGroupAnimationParams)(this);
        this._cellMark.setAnimationConfig((0, utils_1.animationConfig)(null === (_c = factory_1.Factory.getAnimationInKey("heatmap")) || void 0 === _c ? void 0 : _c(appearPreset), (0, 
        utils_1.userAnimationConfig)("cell", this._spec, this._markAttributeContext), animationParams));
    }
    getCellSize(axisHelper) {
        var _a, _b;
        return null !== (_b = null === (_a = axisHelper.getBandwidth) || void 0 === _a ? void 0 : _a.call(axisHelper, 0)) && void 0 !== _b ? _b : exports.DefaultBandWidth;
    }
    initTooltip() {
        this._tooltipHelper = new tooltip_helper_1.HeatmapSeriesTooltipHelper(this), this._cellMark && this._tooltipHelper.activeTriggerSet.mark.add(this._cellMark);
    }
    getDefaultShapeType() {
        return "square";
    }
    getDimensionField() {
        return [].concat(this.fieldX, this.fieldY);
    }
    getMeasureField() {
        return this.getFieldValue();
    }
    getActiveMarks() {
        return [ this._cellMark ];
    }
}

exports.HeatmapSeries = HeatmapSeries, HeatmapSeries.type = type_1.SeriesTypeEnum.heatmap, 
HeatmapSeries.mark = constant_1.heatmapSeriesMark, HeatmapSeries.transformerConstructor = heatmap_transformer_1.HeatmapSeriesSpecTransformer;

const registerHeatmapSeries = () => {
    (0, text_1.registerTextMark)(), (0, cell_1.registerCellMark)(), (0, animation_1.registerHeatmapAnimation)(), 
    (0, cartesian_2.registerCartesianBandAxis)(), (0, cartesian_2.registerCartesianLinearAxis)(), 
    factory_1.Factory.registerSeries(HeatmapSeries.type, HeatmapSeries);
};

exports.registerHeatmapSeries = registerHeatmapSeries;
//# sourceMappingURL=heatmap.js.map
