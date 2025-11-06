import { DataView } from "@visactor/vdataset";

import { Factory } from "../../core";

import { GeoSeries } from "../geo/geo";

import { SeriesTypeEnum } from "../interface";

import { PictogramSeriesMark } from "./constant";

import { getSVGSource, registerSVGSource, svgSourceMap, unregisterSVGSource } from "./svg-source";

import { SeriesData } from "../base/series-data";

import { lookup } from "../../data/transforms/lookup";

import { registerDataSetInstanceTransform } from "../../data/register";

import { shouldMarkDoMorph } from "../../animation/utils";

import { AttributeLevel } from "../../constant/attribute";

import { PictogramSeriesSpecTransformer } from "./pictogram-transformer";

import { Bounds, Matrix, isValid, merge } from "@visactor/vutils";

import { createRect } from "@visactor/vrender-core";

import { VGRAMMAR_HOOK_EVENT } from "../../constant/event";

import { STATE_VALUE_ENUM } from "../../compile/mark";

import { registerElementHighlightByGraphicName, registerElementSelectByGraphicName } from "@visactor/vgrammar-core";

import { PictogramSeriesTooltipHelper } from "./tooltip-helper";

import { graphicAttributeTransform, pictogram } from "../../data/transforms/pictogram";

export class PictogramSeries extends GeoSeries {
    constructor() {
        super(...arguments), this.type = SeriesTypeEnum.pictogram, this._idToMark = new Map;
    }
    setAttrFromSpec() {
        var _a, _b, _c;
        super.setAttrFromSpec(), this.svg = this._spec.svg, this._nameField = this._spec.nameField, 
        this._valueField = this._spec.valueField, this.svg || null === (_a = this._option) || void 0 === _a || _a.onError("svg source is not specified !"), 
        this._parsedSvgResult = null === (_b = getSVGSource(this.svg)) || void 0 === _b ? void 0 : _b.latestData, 
        this._parsedSvgResult || null === (_c = this._option) || void 0 === _c || _c.onError(`'${this.svg}' is not registered !`);
    }
    getDatumCenter(datum) {
        return [ Number.NaN, Number.NaN ];
    }
    getDatumName(datum) {
        return datum.name || datum._nameFromParent;
    }
    getMarksWithoutRoot() {
        return this.getMarks().filter((m => m.name && !m.name.includes("seriesGroup") && !m.name.includes("root") && m !== this._pictogramMark));
    }
    _buildMarkAttributeContext() {
        super._buildMarkAttributeContext(), this._markAttributeContext.getTransformMatrix = this.getRootMatrix.bind(this), 
        this._markAttributeContext.coordToPosition = this.coordToPosition.bind(this), this._markAttributeContext.dataToPosition = this.dataToPosition.bind(this);
    }
    _defaultHoverConfig(selector, finalHoverSpec) {
        return {
            seriesId: this.id,
            regionId: this._region.id,
            selector: selector,
            type: "element-highlight-by-graphic-name",
            trigger: finalHoverSpec.trigger,
            triggerOff: "pointerout",
            blurState: STATE_VALUE_ENUM.STATE_HOVER_REVERSE,
            highlightState: STATE_VALUE_ENUM.STATE_HOVER
        };
    }
    _defaultSelectConfig(selector, finalSelectSpec) {
        const isMultiple = "multiple" === finalSelectSpec.mode, triggerOff = isValid(finalSelectSpec.triggerOff) ? finalSelectSpec.triggerOff : isMultiple ? [ "empty", "self" ] : [ "empty", finalSelectSpec.trigger ];
        return {
            type: "element-select-by-graphic-name",
            seriesId: this.id,
            regionId: this._region.id,
            selector: selector,
            trigger: finalSelectSpec.trigger,
            triggerOff: triggerOff,
            reverseState: STATE_VALUE_ENUM.STATE_SELECTED_REVERSE,
            state: STATE_VALUE_ENUM.STATE_SELECTED,
            isMultiple: isMultiple
        };
    }
    initMark() {
        var _a;
        if (this._pictogramMark = this._createMark(PictogramSeries.mark.pictogram, {
            groupKey: this.getDimensionField()[0],
            isSeriesMark: !0,
            skipBeforeLayouted: !0,
            dataView: this._mapViewData.getDataView(),
            dataProductId: this._mapViewData.getProductId()
        }, {
            morph: shouldMarkDoMorph(this._spec, PictogramSeries.mark.pictogram.name)
        }), this._pictogramMark) {
            this._pictogramMark.setUserId(PictogramSeries.mark.pictogram.name);
            for (const element of this._mapViewData.getDataView().latestData) {
                const {graphicType: type, name: name, parent: parent, id: id, _nameFromParent: _nameFromParent, _uniqueId: _uniqueId} = element, mark = this._createMark({
                    type: type,
                    name: null != name ? name : _nameFromParent
                }, {
                    groupKey: _uniqueId,
                    isSeriesMark: !1,
                    skipBeforeLayouted: !0,
                    dataView: this._mapViewData.getDataView(),
                    dataProductId: this._mapViewData.getProductId(),
                    parent: null !== (_a = this._idToMark.get(null == parent ? void 0 : parent._uniqueId)) && void 0 !== _a ? _a : this._pictogramMark
                }, {
                    morph: shouldMarkDoMorph(this._spec, PictogramSeries.mark.pictogram.name)
                });
                mark && (mark.setUserId(_uniqueId), this._idToMark.set(_uniqueId, mark), "group" !== mark.type && mark.setMarkConfig({
                    graphicName: mark.name
                }), mark.setTransform([ {
                    type: "filter",
                    callback: datum => datum._uniqueId === _uniqueId
                } ]));
            }
            this._initLabelMark();
        }
    }
    _initLabelMark() {
        if (!0 !== this._spec.label.visible) return;
        const labelMark = this._createMark(PictogramSeries.mark.label, {
            isSeriesMark: !1,
            parent: this._pictogramMark,
            groupKey: "_uniqueId",
            skipBeforeLayouted: !0,
            depend: this.getMarksWithoutRoot()
        });
        labelMark && (this._labelMark = labelMark, this._labelMark.setDataView(this._mapViewData.getDataView()));
    }
    initLabelMarkStyle() {
        this._labelMark && this.setMarkStyle(this._labelMark, {
            visible: d => !!this._validElement(d),
            x: d => {
                var _a;
                return null === (_a = this.dataToPosition(d, !0)) || void 0 === _a ? void 0 : _a.x;
            },
            y: d => {
                var _a;
                return null === (_a = this.dataToPosition(d, !0)) || void 0 === _a ? void 0 : _a.y;
            },
            text: d => d[this.nameField],
            textAlign: "center",
            textBaseline: "middle"
        }, STATE_VALUE_ENUM.STATE_NORMAL, AttributeLevel.Series);
    }
    initMarkStyle() {
        const {root: root, viewBoxRect: viewBoxRect} = this._parsedSvgResult, elements = this._mapViewData.getDataView().latestData;
        root && (this.setMarkStyle(this._pictogramMark, graphicAttributeTransform.group(root.attributes), "normal", AttributeLevel.Built_In), 
        root.transform && this.setMarkStyle(this._pictogramMark, {
            postMatrix: () => root.transform
        }, "normal", AttributeLevel.Built_In), viewBoxRect && this._pictogramMark.setMarkConfig({
            clip: !0,
            clipPath: [ createRect(Object.assign(Object.assign({}, viewBoxRect), {
                fill: !0
            })) ]
        }));
        for (const element of elements) {
            const {_uniqueId: _uniqueId, _finalAttributes: attributes} = element, mark = this._idToMark.get(_uniqueId), valid = this._validElement(element);
            mark && (this.setMarkStyle(mark, {
                keepStrokeScale: !0
            }, "normal", AttributeLevel.Built_In), valid ? (this.initMarkStyleWithSpec(mark, merge({}, this._spec.pictogram, this._spec[mark.name])), 
            this.setMarkStyle(mark, attributes, "normal", AttributeLevel.Series), mark.setPostProcess("fill", ((result, datum) => isValid(result) ? result : this._spec.defaultFillColor))) : (mark.setMarkConfig({
                interactive: !1
            }), this.setMarkStyle(mark, attributes, "normal", AttributeLevel.Built_In)));
        }
        this.initLabelMarkStyle();
    }
    _validElement(element) {
        return element.name || element._nameFromParent;
    }
    initTooltip() {
        this._tooltipHelper = new PictogramSeriesTooltipHelper(this), this.getMarksWithoutRoot().forEach((mark => {
            mark && mark.name && this._tooltipHelper.activeTriggerSet.mark.add(mark);
        }));
    }
    dataToPosition(datum, global = !1) {
        if (!datum) return null;
        const name = datum[this.nameField];
        if (!name) return null;
        const mark = this.getMarksWithoutRoot().filter((mark => mark.name === name));
        if (!mark || 0 === mark.length) return null;
        let bounds = new Bounds;
        global ? mark.forEach((m => {
            bounds = bounds.union(m.getProduct().getGroupGraphicItem().globalAABBBounds);
        })) : mark.forEach((m => {
            bounds = bounds.union(m.getProduct().getBounds());
        }));
        const point = {
            x: (bounds.x1 + bounds.x2) / 2,
            y: (bounds.y1 + bounds.y2) / 2
        };
        if (global) {
            const {x: x, y: y} = this.getLayoutStartPoint();
            point.x -= x, point.y -= y;
        }
        return point;
    }
    coordToPosition(point) {
        if (!point) return null;
        const {x: x, y: y} = point, matrix = this.getRootMatrix();
        if (!matrix) return null;
        const position = {};
        return matrix.getInverse().transformPoint({
            x: x,
            y: y
        }, position), position;
    }
    getRootMatrix() {
        var _a;
        return null === (_a = this.getPictogramRootGraphic()) || void 0 === _a ? void 0 : _a.transMatrix;
    }
    getPictogramRootGraphic() {
        var _a;
        return null === (_a = this._pictogramMark.getProduct()) || void 0 === _a ? void 0 : _a.getGroupGraphicItem();
    }
    initData() {
        var _a, _b;
        super.initData();
        const parsedSvg = svgSourceMap.get(this.svg);
        parsedSvg || null === (_a = this._option) || void 0 === _a || _a.onError("no valid svg found!");
        const svgData = new DataView(this._dataSet, {
            name: `pictogram_${this.id}_data`
        });
        registerDataSetInstanceTransform(this._dataSet, "pictogram", pictogram), registerDataSetInstanceTransform(this._dataSet, "lookup", lookup), 
        svgData.parse([ parsedSvg ], {
            type: "dataview"
        }).transform({
            type: "pictogram"
        }).transform({
            type: "lookup",
            options: {
                from: () => this.getViewData().latestData,
                key: "name",
                fields: this._nameField,
                set: (a, b) => {
                    b && (a.data = b);
                }
            }
        }).transform({
            type: "lookup",
            options: {
                from: () => this.getViewData().latestData,
                key: "_nameFromParent",
                fields: this._nameField,
                set: (a, b) => {
                    b && (a.data = b);
                }
            }
        }), null === (_b = this._data) || void 0 === _b || _b.getDataView().target.addListener("change", svgData.reRunAllTransform), 
        this._mapViewData = new SeriesData(this._option, svgData);
    }
    mapViewDataUpdate() {
        this._mapViewData.updateData();
    }
    onLayoutEnd(ctx) {
        var _a;
        super.onLayoutEnd(ctx), null === (_a = this._mapViewData) || void 0 === _a || _a.getDataView().reRunAllTransform();
    }
    updateSVGSize() {
        const {width: regionWidth, height: regionHeight} = this.getLayoutRect(), regionCenterX = regionWidth / 2, regionCenterY = regionHeight / 2, root = this.getPictogramRootGraphic();
        if (root) {
            const bounds = root.AABBBounds, {x1: x1, x2: x2, y1: y1, y2: y2} = root.AABBBounds, rootCenterX = (x1 + x2) / 2, rootCenterY = (y1 + y2) / 2, scaleX = regionWidth / bounds.width(), scaleY = regionHeight / bounds.height(), scale = Math.min(scaleX, scaleY);
            root.scale(scale, scale, {
                x: rootCenterX,
                y: rootCenterY
            }), root.translate(regionCenterX - rootCenterX, regionCenterY - rootCenterY);
        }
    }
    initEvent() {
        var _a;
        super.initEvent(), null === (_a = this._mapViewData.getDataView()) || void 0 === _a || _a.target.addListener("change", this.mapViewDataUpdate.bind(this)), 
        this.event.on(VGRAMMAR_HOOK_EVENT.AFTER_MARK_LAYOUT_END, this.updateSVGSize.bind(this));
    }
    handleZoom(e) {
        const {scale: scale, scaleCenter: scaleCenter} = e;
        if (1 === scale) return;
        const root = this.getPictogramRootGraphic();
        root && (root.attribute.postMatrix || root.setAttributes({
            postMatrix: new Matrix
        }), root.scale(scale, scale, scaleCenter));
    }
    handlePan(e) {
        const {delta: delta} = e;
        if (0 === delta[0] && 0 === delta[1]) return;
        const root = this.getPictogramRootGraphic();
        root && (root.attribute.postMatrix || root.setAttributes({
            postMatrix: new Matrix
        }), root.translate(delta[0], delta[1]));
    }
    getMarkData(datum) {
        var _a;
        return null !== (_a = datum.data) && void 0 !== _a ? _a : {};
    }
    getMeasureField() {
        return [ this.valueField ];
    }
    getDimensionField() {
        return [ this.nameField ];
    }
    _getSeriesInfo(field, keys) {
        const defaultShapeType = this.getDefaultShapeType();
        return keys.map((key => ({
            key: key,
            originalKey: key,
            style: this.getSeriesStyle({
                data: {
                    [field]: key
                }
            }),
            shapeType: defaultShapeType
        })));
    }
    release() {
        this._parsedSvgResult = null, this._idToMark.clear(), this._idToMark = null;
    }
}

PictogramSeries.type = SeriesTypeEnum.pictogram, PictogramSeries.mark = PictogramSeriesMark, 
PictogramSeries.transformerConstructor = PictogramSeriesSpecTransformer;

export const registerPictogramSeries = () => {
    Factory.registerSeries(PictogramSeries.type, PictogramSeries), Factory.registerImplement("registerSVG", registerSVGSource), 
    Factory.registerImplement("unregisterSVG", unregisterSVGSource), registerElementHighlightByGraphicName(), 
    registerElementSelectByGraphicName();
};
//# sourceMappingURL=pictogram.js.map
