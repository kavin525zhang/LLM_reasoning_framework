"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerVennSeries = exports.VennSeries = void 0;

const interface_1 = require("../../compile/mark/interface"), data_1 = require("../../constant/data"), attribute_1 = require("../../constant/attribute"), type_1 = require("../interface/type"), tooltip_helper_1 = require("./tooltip-helper"), config_1 = require("../../animation/config"), constant_1 = require("./constant"), factory_1 = require("../../core/factory"), animation_1 = require("./animation"), venn_transform_1 = require("./venn-transform"), base_1 = require("../base"), arc_1 = require("../../mark/arc"), path_1 = require("../../mark/path"), vgrammar_venn_1 = require("@visactor/vgrammar-venn"), vutils_1 = require("@visactor/vutils"), util_1 = require("./util"), interface_2 = require("../../component/interface"), utils_1 = require("../../animation/utils");

class VennSeries extends base_1.BaseSeries {
    constructor() {
        super(...arguments), this.type = type_1.SeriesTypeEnum.venn, this.transformerConstructor = venn_transform_1.VennSeriesSpecTransformer, 
        this._viewBox = new vutils_1.Bounds;
    }
    getCategoryField() {
        return this._categoryField;
    }
    setCategoryField(f) {
        return this._categoryField = f, this._categoryField;
    }
    getValueField() {
        return this._valueField;
    }
    setValueField(f) {
        return this._valueField = f, this._valueField;
    }
    setAttrFromSpec() {
        var _a, _b, _c;
        super.setAttrFromSpec(), this.setCategoryField(null !== (_a = this._spec.categoryField) && void 0 !== _a ? _a : "sets"), 
        this.setValueField(null !== (_b = this._spec.valueField) && void 0 !== _b ? _b : "size"), 
        this.setSeriesField(null !== (_c = this._spec.seriesField) && void 0 !== _c ? _c : data_1.DEFAULT_DATA_KEY);
    }
    compile() {
        super.compile(), this._runVennTransform();
    }
    _runVennTransform(render = !1) {
        const viewDataProduct = this._data.getProduct();
        viewDataProduct && viewDataProduct.transform([ {
            type: "venn",
            x0: this._viewBox.x1,
            x1: this._viewBox.x2,
            y0: this._viewBox.y1,
            y1: this._viewBox.y2,
            setField: this._categoryField,
            valueField: this._valueField
        } ]), render && this.getCompiler().renderNextTick();
    }
    initMark() {
        const circleMark = this._createMark(VennSeries.mark.circle, {
            isSeriesMark: !0
        });
        circleMark && (circleMark.setTransform([ {
            type: "vennMark",
            datumType: "circle"
        } ]), this._circleMark = circleMark);
        const overlapMark = this._createMark(VennSeries.mark.overlap, {
            isSeriesMark: !0
        });
        overlapMark && (overlapMark.setTransform([ {
            type: "vennMark",
            datumType: "overlap"
        } ]), this._overlapMark = overlapMark);
    }
    initMarkStyle() {
        this._initCircleMarkStyle(), this._initOverlapMarkStyle();
    }
    _initCircleMarkStyle() {
        this._circleMark && this.setMarkStyle(this._circleMark, {
            x: datum => datum.x,
            y: datum => datum.y,
            innerRadius: 0,
            outerRadius: datum => datum.radius,
            startAngle: 0,
            endAngle: 2 * Math.PI,
            fill: this.getColorAttribute(),
            stroke: this.getColorAttribute()
        }, interface_1.STATE_VALUE_ENUM.STATE_NORMAL, attribute_1.AttributeLevel.Series);
    }
    _initOverlapMarkStyle() {
        this._overlapMark && (this.setMarkStyle(this._overlapMark, {
            x: datum => datum.x,
            y: datum => datum.y,
            path: datum => datum.path,
            arcs: datum => datum.arcs,
            fill: this.getColorAttribute(),
            stroke: this.getColorAttribute(),
            zIndex: datum => 100 * datum.sets.length
        }, interface_1.STATE_VALUE_ENUM.STATE_NORMAL, attribute_1.AttributeLevel.Series), 
        this.setMarkStyle(this._overlapMark, {
            zIndex: datum => 100 * datum.sets.length + 1
        }, interface_1.STATE_VALUE_ENUM.STATE_HOVER, attribute_1.AttributeLevel.Series));
    }
    initLabelMarkStyle(labelMark) {
        labelMark && (this._labelMark = labelMark, labelMark.setRule("venn"), this.setMarkStyle(labelMark, {
            x: datum => datum.labelX,
            y: datum => datum.labelY,
            text: datum => (0, util_1.getVennSeriesDataKey)(datum.sets),
            maxLineWidth: datum => {
                const {x: x, radius: radius, labelX: labelX} = datum, circleX0 = x - radius, circleX1 = x + radius;
                return Math.min(labelX - circleX0, circleX1 - labelX);
            }
        }, interface_1.STATE_VALUE_ENUM.STATE_NORMAL, attribute_1.AttributeLevel.Series));
    }
    initOverlapLabelMarkStyle(labelMark) {
        labelMark && (this._labelMark = labelMark, labelMark.setRule("venn"), this.setMarkStyle(labelMark, {
            x: datum => datum.labelX,
            y: datum => datum.labelY,
            text: datum => (0, util_1.getVennSeriesDataKey)(datum.sets)
        }, interface_1.STATE_VALUE_ENUM.STATE_NORMAL, attribute_1.AttributeLevel.Series));
    }
    initTooltip() {
        this._tooltipHelper = new tooltip_helper_1.VennTooltipHelper(this), this._circleMark && this._tooltipHelper.activeTriggerSet.mark.add(this._circleMark), 
        this._overlapMark && this._tooltipHelper.activeTriggerSet.mark.add(this._overlapMark);
    }
    getDimensionField() {
        return [ this._categoryField ];
    }
    getMeasureField() {
        return [ this._valueField ];
    }
    onLayoutEnd(ctx) {
        super.onLayoutEnd(ctx), this._viewBox.set(0, 0, this.getLayoutRect().width, this.getLayoutRect().height), 
        this._runVennTransform();
    }
    getDefaultShapeType() {
        return "circle";
    }
    getActiveMarks() {
        return [ this._circleMark, this._overlapMark ];
    }
    getStatisticFields() {
        const fields = [];
        return fields.push({
            key: this._categoryField,
            operations: [ "values" ]
        }), fields.push({
            key: this._valueField,
            operations: [ "max", "min" ]
        }), fields;
    }
    getGroupFields() {
        return null;
    }
    dataToPosition(data, checkInViewData) {
        return {
            x: data.x,
            y: data.y
        };
    }
    dataToPositionX(data) {
        return data.x;
    }
    dataToPositionY(data) {
        return data.y;
    }
    valueToPosition(value1, value2) {
        throw new Error("Method not implemented.");
    }
    getStackGroupFields() {
        return [];
    }
    getStackValueField() {
        return null;
    }
    _getSeriesInfo(field, keys) {
        const defaultShapeType = this.getDefaultShapeType();
        return keys.map((originalKey => ({
            key: (0, util_1.getVennSeriesDataKey)(originalKey),
            originalKey: originalKey,
            style: this.getSeriesStyle({
                [field]: originalKey
            }),
            shapeType: defaultShapeType
        })));
    }
    getSeriesFieldValue(datum, seriesField) {
        const value = super.getSeriesFieldValue(datum, seriesField);
        return (0, util_1.getVennSeriesDataKey)(value);
    }
    legendSelectedFilter(component, selectedKeys) {
        if (component.type === interface_2.ComponentTypeEnum.discreteLegend) {
            const originalLegendKeys = component.getLegendDefaultData(!0);
            if (0 === selectedKeys.length && originalLegendKeys.length) return [];
            if (selectedKeys.length === originalLegendKeys.length) return selectedKeys;
            const selectedFilter = {};
            selectedKeys.forEach((s => {
                selectedFilter[s] = !0;
            }));
            const disableKeys = originalLegendKeys.filter((key => !selectedFilter[(0, util_1.getVennSeriesDataKey)(key)])), derivedDisableKeys = originalLegendKeys.filter((key => !disableKeys.includes(key) && disableKeys.some((disableKey => (0, 
            vutils_1.array)(disableKey).every((k => key.includes(k)))))));
            selectedKeys = selectedKeys.slice(), derivedDisableKeys.forEach((key => {
                selectedKeys.splice(selectedKeys.indexOf((0, util_1.getVennSeriesDataKey)(key)), 1);
            }));
        }
        return selectedKeys;
    }
    initAnimation() {
        this.getMarksInType("arc").forEach((mark => {
            var _a;
            mark.setAnimationConfig((0, utils_1.animationConfig)(null === (_a = factory_1.Factory.getAnimationInKey("vennCircle")) || void 0 === _a ? void 0 : _a(), (0, 
            utils_1.userAnimationConfig)(mark.name, this._spec, this._markAttributeContext)));
        })), this.getMarksInType("path").forEach((mark => {
            var _a;
            mark.setAnimationConfig((0, utils_1.animationConfig)(null === (_a = factory_1.Factory.getAnimationInKey("vennOverlap")) || void 0 === _a ? void 0 : _a(), (0, 
            utils_1.userAnimationConfig)(mark.name, this._spec, this._markAttributeContext)));
        }));
    }
}

exports.VennSeries = VennSeries, VennSeries.type = type_1.SeriesTypeEnum.venn, VennSeries.mark = constant_1.vennSeriesMark, 
VennSeries.transformerConstructor = venn_transform_1.VennSeriesSpecTransformer;

const registerVennSeries = () => {
    (0, arc_1.registerArcMark)(), (0, path_1.registerPathMark)(), (0, animation_1.registerVennAnimation)(), 
    (0, config_1.registerFadeInOutAnimation)(), (0, vgrammar_venn_1.registerVennTransforms)(), 
    factory_1.Factory.registerSeries(VennSeries.type, VennSeries);
};

exports.registerVennSeries = registerVennSeries;
//# sourceMappingURL=venn.js.map
