import { STATE_VALUE_ENUM } from "../../compile/mark/interface";

import { VGRAMMAR_HOOK_EVENT } from "../../constant/event";

import { AttributeLevel } from "../../constant/attribute";

import { DEFAULT_DATA_KEY } from "../../constant/data";

import { CartesianSeries } from "../cartesian/cartesian";

import { SeriesTypeEnum } from "../interface/type";

import { registerDataSetInstanceTransform } from "../../data/register";

import { flatten } from "../../data/transforms/flatten";

import { isValidNumber, Bounds, Matrix, mixin, merge } from "@visactor/vutils";

import { registerTreemapTransforms } from "@visactor/vgrammar-hierarchy";

import { DataView } from "@visactor/vdataset";

import { hierarchyDimensionStatistics } from "../../data/transforms/hierarchy-dimension-statistics";

import { addVChartProperty } from "../../data/transforms/add-property";

import { addHierarchyDataKey, initHierarchyKeyMap } from "../../data/transforms/data-key";

import { DEFAULT_HIERARCHY_ROOT } from "../../constant/hierarchy";

import { TreemapTooltipHelper } from "./tooltip-helper";

import { animationConfig, userAnimationConfig } from "../../animation/utils";

import { registerFadeInOutAnimation } from "../../animation/config";

import { Zoomable } from "../../interaction/zoom/zoomable";

import { Drillable } from "../../interaction/drill/drillable";

import { registerRectMark } from "../../mark/rect";

import { registerTextMark } from "../../mark/text";

import { treemapSeriesMark } from "./constant";

import { Factory } from "../../core/factory";

import { registerTreemapAnimation } from "./animation";

import { TreemapSeriesSpecTransformer } from "./treemap-transform";

import { registerFilterTransform, registerMapTransform } from "@visactor/vgrammar-core";

import { appendHierarchyFields } from "../util/hierarchy";

export class TreemapSeries extends CartesianSeries {
    constructor() {
        super(...arguments), this.type = SeriesTypeEnum.treemap, this.transformerConstructor = TreemapSeriesSpecTransformer, 
        this._categoryField = "name", this._valueField = "value", this._viewBox = new Bounds, 
        this._enableAnimationHook = this.enableMarkAnimation.bind(this), this.isHierarchyData = () => !0;
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
        var _a;
        super.setAttrFromSpec(), this.setCategoryField(this._spec.categoryField), this.setValueField(this._spec.valueField), 
        this.setSeriesField(null !== (_a = this._spec.seriesField) && void 0 !== _a ? _a : DEFAULT_HIERARCHY_ROOT), 
        this._spec.roam && (this.initZoomable(this.event, this._option.mode), this._matrix = new Matrix), 
        this._spec.drill && this.initDrillable({
            event: this.event,
            mode: this._option.mode,
            drillField: () => {
                var _a, _b;
                return null !== (_b = null !== (_a = this._spec.drillField) && void 0 !== _a ? _a : this._categoryField) && void 0 !== _b ? _b : DEFAULT_DATA_KEY;
            },
            getRawData: () => this.getRawData()
        }), isValidNumber(this._spec.maxDepth) && (this._maxDepth = this._spec.maxDepth - 1);
    }
    initData() {
        super.initData(), this.getViewData() && this._spec.drill && this.initDrillableData(this._dataSet);
    }
    compile() {
        super.compile(), this._runTreemapTransform();
    }
    _runTreemapTransform(render = !1) {
        var _a, _b, _c, _d;
        const viewDataProduct = this._data.getProduct();
        viewDataProduct && viewDataProduct.transform([ {
            type: "treemap",
            nameField: this._categoryField,
            valueField: this._valueField,
            x0: this._viewBox.x1,
            x1: this._viewBox.x2,
            y0: this._viewBox.y1,
            y1: this._viewBox.y2,
            maxDepth: this._maxDepth,
            gapWidth: this._spec.gapWidth,
            padding: this._spec.nodePadding,
            splitType: this._spec.splitType,
            aspectRatio: this._spec.aspectRatio,
            labelPadding: (null === (_a = this._spec.nonLeafLabel) || void 0 === _a ? void 0 : _a.visible) ? null === (_b = this._spec.nonLeafLabel) || void 0 === _b ? void 0 : _b.padding : 0,
            labelPosition: null === (_c = this._spec.nonLeafLabel) || void 0 === _c ? void 0 : _c.position,
            minVisibleArea: null !== (_d = this._spec.minVisibleArea) && void 0 !== _d ? _d : 10,
            minChildrenVisibleArea: this._spec.minChildrenVisibleArea,
            minChildrenVisibleSize: this._spec.minChildrenVisibleSize,
            flatten: !0
        }, {
            type: "map",
            callback: datum => (datum && [ DEFAULT_HIERARCHY_ROOT, "name" ].forEach((key => {
                datum[key] = datum.datum[datum.depth][this._categoryField];
            })), datum)
        } ]), render && this.getCompiler().renderNextTick();
    }
    _addDataIndexAndKey() {
        var _a;
        (null === (_a = this._rawData) || void 0 === _a ? void 0 : _a.dataSet) && (registerDataSetInstanceTransform(this._rawData.dataSet, "addVChartProperty", addVChartProperty), 
        this._rawData.transform({
            type: "addVChartProperty",
            options: {
                beforeCall: initHierarchyKeyMap.bind(this),
                call: addHierarchyDataKey
            }
        }));
    }
    getRawDataStatisticsByField(field, isNumeric) {
        var _a;
        if (this._rawStatisticsCache || (this._rawStatisticsCache = {}), !this._rawStatisticsCache[field] && this._rawData) {
            const result = hierarchyDimensionStatistics([ this._rawData ], {
                fields: [ {
                    key: field,
                    operations: isNumeric ? [ "min", "max" ] : [ "values" ]
                } ]
            })[field];
            this._rawStatisticsCache[field] = merge(null !== (_a = this._rawStatisticsCache[field]) && void 0 !== _a ? _a : {}, result);
        }
        return this._rawStatisticsCache[field];
    }
    _createHierarchyDataStatistics(dataName, rawData) {
        registerDataSetInstanceTransform(this._dataSet, "hierarchyDimensionStatistics", hierarchyDimensionStatistics), 
        registerDataSetInstanceTransform(this._dataSet, "flatten", flatten);
        const data = new DataView(this._dataSet, {
            name: dataName
        });
        return data.parse(rawData, {
            type: "dataview"
        }), data.transform({
            type: "hierarchyDimensionStatistics",
            options: {
                fields: () => {
                    const fields = this.getStatisticFields();
                    return this._seriesField && this._seriesField !== this._categoryField && fields.push({
                        key: this._seriesField,
                        operations: [ "values" ]
                    }), fields;
                }
            }
        }, !1), data;
    }
    getStatisticFields() {
        return appendHierarchyFields(super.getStatisticFields(), this._categoryField, this._valueField);
    }
    initMark() {
        var _a, _b, _c, _d;
        const nonLeafMark = this._createMark(TreemapSeries.mark.nonLeaf, {
            isSeriesMark: !0,
            stateSort: null === (_a = this._spec.nonLeaf) || void 0 === _a ? void 0 : _a.stateSort
        }, {
            setCustomizedShape: null === (_b = this._spec.nonLeaf) || void 0 === _b ? void 0 : _b.customShape
        });
        nonLeafMark && (nonLeafMark.setTransform([ {
            type: "filter",
            callback: datum => !this._shouldFilterElement(datum, "nonLeaf")
        } ]), this._nonLeafMark = nonLeafMark);
        const leafMark = this._createMark(TreemapSeries.mark.leaf, {
            isSeriesMark: !0,
            stateSort: null === (_c = this._spec.leaf) || void 0 === _c ? void 0 : _c.stateSort
        }, {
            setCustomizedShape: null === (_d = this._spec.leaf) || void 0 === _d ? void 0 : _d.customShape
        });
        leafMark && (leafMark.setTransform([ {
            type: "filter",
            callback: datum => !this._shouldFilterElement(datum, "leaf")
        } ]), this._leafMark = leafMark);
    }
    initMarkStyle() {
        this._initLeafMarkStyle(), this._initNonLeafMarkStyle();
    }
    _initLeafMarkStyle() {
        this._leafMark && this.setMarkStyle(this._leafMark, {
            x: datum => datum.x0,
            y: datum => datum.y0,
            x1: datum => datum.x1,
            y1: datum => datum.y1,
            fill: this.getColorAttribute()
        }, STATE_VALUE_ENUM.STATE_NORMAL, AttributeLevel.Series);
    }
    _initNonLeafMarkStyle() {
        this._nonLeafMark && this.setMarkStyle(this._nonLeafMark, {
            x: datum => datum.x0,
            y: datum => datum.y0,
            x1: datum => datum.x1,
            y1: datum => datum.y1,
            fill: this.getColorAttribute()
        }, STATE_VALUE_ENUM.STATE_NORMAL, AttributeLevel.Series);
    }
    _initRichStyleOfLabelMark(labelMark) {
        "rich" === labelMark.getTextType() && this.setMarkStyle(labelMark, {
            maxWidth: datum => Math.abs(datum.x0 - datum.x1),
            maxHeight: datum => Math.abs(datum.y0 - datum.y1),
            ellipsis: !0
        }, STATE_VALUE_ENUM.STATE_NORMAL, AttributeLevel.Series);
    }
    initLabelMarkStyle(labelMark) {
        labelMark && (this._labelMark = labelMark, labelMark.setRule("treemap"), this.setMarkStyle(labelMark, {
            x: datum => (datum.x0 + datum.x1) / 2,
            y: datum => (datum.y0 + datum.y1) / 2,
            text: datum => {
                var _a;
                return null === (_a = datum.datum[datum.depth]) || void 0 === _a ? void 0 : _a[this.getDimensionField()[0]];
            },
            maxLineWidth: datum => datum.x1 === datum.x0 ? Number.MIN_VALUE : datum.x1 - datum.x0
        }, STATE_VALUE_ENUM.STATE_NORMAL, AttributeLevel.Series), this._initRichStyleOfLabelMark(labelMark));
    }
    initNonLeafLabelMarkStyle(labelMark) {
        labelMark && (this._nonLeafLabelMark = labelMark, labelMark.setRule("treemap"), 
        this.setMarkStyle(labelMark, {
            x: datum => datum.labelRect ? (datum.labelRect.x0 + datum.labelRect.x1) / 2 : (datum.x0 + datum.x1) / 2,
            y: datum => datum.labelRect ? (datum.labelRect.y0 + datum.labelRect.y1) / 2 : (datum.y0 + datum.y1) / 2,
            text: datum => {
                var _a;
                return null === (_a = datum.datum[datum.depth]) || void 0 === _a ? void 0 : _a[this.getDimensionField()[0]];
            },
            maxLineWidth: datum => datum.x1 === datum.x0 ? Number.MIN_VALUE : datum.x1 - datum.x0
        }, STATE_VALUE_ENUM.STATE_NORMAL, AttributeLevel.Series), this._initRichStyleOfLabelMark(labelMark));
    }
    initAnimation() {
        this.getMarksInType("rect").forEach((mark => {
            var _a;
            mark.setAnimationConfig(animationConfig(null === (_a = Factory.getAnimationInKey("treemap")) || void 0 === _a ? void 0 : _a(), userAnimationConfig(mark.name, this._spec, this._markAttributeContext)));
        }));
    }
    initEvent() {
        super.initEvent(), this._spec.roam && (this.initDragEventOfSeries(this), this.event.on("panmove", (e => {
            this.handlePan(e);
        })), this.initZoomEventOfSeries(this), this.event.on("zoom", (e => {
            this.handleZoom(e);
        }))), this._spec.drill && this.bindDrillEvent();
    }
    _getDataIdKey() {
        return "key";
    }
    initTooltip() {
        this._tooltipHelper = new TreemapTooltipHelper(this), this._leafMark && this._tooltipHelper.activeTriggerSet.mark.add(this._leafMark), 
        this._nonLeafMark && this._tooltipHelper.activeTriggerSet.mark.add(this._nonLeafMark);
    }
    _shouldFilterElement(datum, nodeType) {
        const isLeaf = datum.isLeaf;
        return "leaf" === nodeType ? !isLeaf : isLeaf;
    }
    handlePan(event) {
        const {delta: delta} = event;
        if (0 === delta[0] && 0 === delta[1]) return;
        this._matrix.reset(), this._matrix.translate(delta[0], delta[1]);
        const {a: a, b: b, c: c, d: d, e: e, f: f} = this._matrix;
        this._matrix.multiply(a, b, c, d, e, f), this._viewBox.transformWithMatrix(this._matrix), 
        this._runTreemapTransform(!0);
    }
    handleZoom(event) {
        const {scale: scale, scaleCenter: scaleCenter} = event;
        if (1 === scale) return;
        this._matrix.reset();
        const {x: x, y: y} = scaleCenter;
        this._matrix.translate(x, y), this._matrix.scale(scale, scale), this._matrix.translate(-x, -y);
        const {a: a, b: b, c: c, d: d, e: e, f: f} = this._matrix;
        this._matrix.multiply(a, b, c, d, e, f), this.disableMarkAnimation(), this.event.on(VGRAMMAR_HOOK_EVENT.AFTER_DO_RENDER, this._enableAnimationHook), 
        this._viewBox.transformWithMatrix(this._matrix), this._runTreemapTransform(!0);
    }
    getDimensionField() {
        return [ this._categoryField ];
    }
    getMeasureField() {
        return [ this._valueField ];
    }
    onLayoutEnd(ctx) {
        super.onLayoutEnd(ctx), this._viewBox.set(0, 0, this.getLayoutRect().width, this.getLayoutRect().height), 
        this._runTreemapTransform();
    }
    enableMarkAnimation() {
        this.getMarks().forEach((mark => {
            var _a;
            null === (_a = mark.getProduct().animate) || void 0 === _a || _a.enable();
        })), [ this._labelMark, this._nonLeafLabelMark ].forEach((m => {
            m && m.getComponent() && m.getComponent().getProduct().getGroupGraphicItem().enableAnimation();
        })), this.event.off(VGRAMMAR_HOOK_EVENT.AFTER_DO_RENDER, this._enableAnimationHook);
    }
    disableMarkAnimation() {
        this.getMarks().forEach((mark => {
            var _a;
            null === (_a = mark.getProduct().animate) || void 0 === _a || _a.disable();
        })), [ this._labelMark, this._nonLeafLabelMark ].forEach((m => {
            m && m.getComponent() && m.getComponent().getProduct().getGroupGraphicItem().disableAnimation();
        }));
    }
    getDefaultShapeType() {
        return "square";
    }
    getActiveMarks() {
        return [ this._nonLeafMark, this._leafMark ];
    }
    getMarkData(datum) {
        return (null == datum ? void 0 : datum.datum) ? datum.datum[datum.datum.length - 1] : datum;
    }
}

TreemapSeries.type = SeriesTypeEnum.treemap, TreemapSeries.mark = treemapSeriesMark, 
TreemapSeries.transformerConstructor = TreemapSeriesSpecTransformer, mixin(TreemapSeries, Drillable), 
mixin(TreemapSeries, Zoomable);

export const registerTreemapSeries = () => {
    registerFilterTransform(), registerMapTransform(), registerRectMark(), registerTextMark(), 
    registerTreemapAnimation(), registerFadeInOutAnimation(), registerTreemapTransforms(), 
    Factory.registerSeries(TreemapSeries.type, TreemapSeries);
};
//# sourceMappingURL=treemap.js.map
