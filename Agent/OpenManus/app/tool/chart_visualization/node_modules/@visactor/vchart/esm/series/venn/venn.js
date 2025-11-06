import { STATE_VALUE_ENUM } from "../../compile/mark/interface";

import { DEFAULT_DATA_KEY } from "../../constant/data";

import { AttributeLevel } from "../../constant/attribute";

import { SeriesTypeEnum } from "../interface/type";

import { VennTooltipHelper } from "./tooltip-helper";

import { registerFadeInOutAnimation } from "../../animation/config";

import { vennSeriesMark } from "./constant";

import { Factory } from "../../core/factory";

import { registerVennAnimation } from "./animation";

import { VennSeriesSpecTransformer } from "./venn-transform";

import { BaseSeries } from "../base";

import { registerArcMark } from "../../mark/arc";

import { registerPathMark } from "../../mark/path";

import { registerVennTransforms } from "@visactor/vgrammar-venn";

import { Bounds, array } from "@visactor/vutils";

import { getVennSeriesDataKey } from "./util";

import { ComponentTypeEnum } from "../../component/interface";

import { animationConfig, userAnimationConfig } from "../../animation/utils";

export class VennSeries extends BaseSeries {
    constructor() {
        super(...arguments), this.type = SeriesTypeEnum.venn, this.transformerConstructor = VennSeriesSpecTransformer, 
        this._viewBox = new Bounds;
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
        this.setSeriesField(null !== (_c = this._spec.seriesField) && void 0 !== _c ? _c : DEFAULT_DATA_KEY);
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
        }, STATE_VALUE_ENUM.STATE_NORMAL, AttributeLevel.Series);
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
        }, STATE_VALUE_ENUM.STATE_NORMAL, AttributeLevel.Series), this.setMarkStyle(this._overlapMark, {
            zIndex: datum => 100 * datum.sets.length + 1
        }, STATE_VALUE_ENUM.STATE_HOVER, AttributeLevel.Series));
    }
    initLabelMarkStyle(labelMark) {
        labelMark && (this._labelMark = labelMark, labelMark.setRule("venn"), this.setMarkStyle(labelMark, {
            x: datum => datum.labelX,
            y: datum => datum.labelY,
            text: datum => getVennSeriesDataKey(datum.sets),
            maxLineWidth: datum => {
                const {x: x, radius: radius, labelX: labelX} = datum, circleX0 = x - radius, circleX1 = x + radius;
                return Math.min(labelX - circleX0, circleX1 - labelX);
            }
        }, STATE_VALUE_ENUM.STATE_NORMAL, AttributeLevel.Series));
    }
    initOverlapLabelMarkStyle(labelMark) {
        labelMark && (this._labelMark = labelMark, labelMark.setRule("venn"), this.setMarkStyle(labelMark, {
            x: datum => datum.labelX,
            y: datum => datum.labelY,
            text: datum => getVennSeriesDataKey(datum.sets)
        }, STATE_VALUE_ENUM.STATE_NORMAL, AttributeLevel.Series));
    }
    initTooltip() {
        this._tooltipHelper = new VennTooltipHelper(this), this._circleMark && this._tooltipHelper.activeTriggerSet.mark.add(this._circleMark), 
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
            key: getVennSeriesDataKey(originalKey),
            originalKey: originalKey,
            style: this.getSeriesStyle({
                [field]: originalKey
            }),
            shapeType: defaultShapeType
        })));
    }
    getSeriesFieldValue(datum, seriesField) {
        const value = super.getSeriesFieldValue(datum, seriesField);
        return getVennSeriesDataKey(value);
    }
    legendSelectedFilter(component, selectedKeys) {
        if (component.type === ComponentTypeEnum.discreteLegend) {
            const originalLegendKeys = component.getLegendDefaultData(!0);
            if (0 === selectedKeys.length && originalLegendKeys.length) return [];
            if (selectedKeys.length === originalLegendKeys.length) return selectedKeys;
            const selectedFilter = {};
            selectedKeys.forEach((s => {
                selectedFilter[s] = !0;
            }));
            const disableKeys = originalLegendKeys.filter((key => !selectedFilter[getVennSeriesDataKey(key)])), derivedDisableKeys = originalLegendKeys.filter((key => !disableKeys.includes(key) && disableKeys.some((disableKey => array(disableKey).every((k => key.includes(k)))))));
            selectedKeys = selectedKeys.slice(), derivedDisableKeys.forEach((key => {
                selectedKeys.splice(selectedKeys.indexOf(getVennSeriesDataKey(key)), 1);
            }));
        }
        return selectedKeys;
    }
    initAnimation() {
        this.getMarksInType("arc").forEach((mark => {
            var _a;
            mark.setAnimationConfig(animationConfig(null === (_a = Factory.getAnimationInKey("vennCircle")) || void 0 === _a ? void 0 : _a(), userAnimationConfig(mark.name, this._spec, this._markAttributeContext)));
        })), this.getMarksInType("path").forEach((mark => {
            var _a;
            mark.setAnimationConfig(animationConfig(null === (_a = Factory.getAnimationInKey("vennOverlap")) || void 0 === _a ? void 0 : _a(), userAnimationConfig(mark.name, this._spec, this._markAttributeContext)));
        }));
    }
}

VennSeries.type = SeriesTypeEnum.venn, VennSeries.mark = vennSeriesMark, VennSeries.transformerConstructor = VennSeriesSpecTransformer;

export const registerVennSeries = () => {
    registerArcMark(), registerPathMark(), registerVennAnimation(), registerFadeInOutAnimation(), 
    registerVennTransforms(), Factory.registerSeries(VennSeries.type, VennSeries);
};
//# sourceMappingURL=venn.js.map
