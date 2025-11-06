import { isBoolean, isFunction, isNil, isNumber, isValid, last, maxInArray, minInArray, uniqArray } from "@visactor/vutils";

import { mergeSpec } from "@visactor/vutils-extension";

import { ComponentTypeEnum } from "../../interface/type";

import { DataFilterBaseComponent } from "../data-filter-base-component";

import { DataZoom as DataZoomComponent } from "@visactor/vrender-components";

import { transformToGraphic } from "../../../util/style";

import { LinearScale, isContinuous, isDiscrete } from "@visactor/vscale";

import { LayoutLevel, LayoutZIndex } from "../../../constant/layout";

import { ChartEvent } from "../../../constant/event";

import { Factory } from "../../../core/factory";

import { DataZoomSpecTransformer } from "./data-zoom-transformer";

import { getFormatFunction } from "../../util";

export class DataZoom extends DataFilterBaseComponent {
    constructor(spec, options) {
        var _a;
        super(spec, options), this.type = ComponentTypeEnum.dataZoom, this.name = ComponentTypeEnum.dataZoom, 
        this.transformerConstructor = DataZoomSpecTransformer, this.specKey = "dataZoom", 
        this.layoutZIndex = LayoutZIndex.DataZoom, this.layoutLevel = LayoutLevel.DataZoom, 
        this.layoutType = "region-relative", this._isReverseCache = !1, this._dataToPositionX = datum => {
            const offsetLeft = "left" === this._orient ? this._middleHandlerSize : 0, offsetHandler = this._isHorizontal ? this._startHandlerSize / 2 : 0, xScale = this._isHorizontal ? this._stateScale : this._valueScale, xField = this._isHorizontal ? this._stateField : this._valueField;
            return xScale.scale(datum[xField]) + this.getLayoutStartPoint().x + offsetLeft + offsetHandler;
        }, this._dataToPositionX2 = datum => {
            const offsetLeft = "left" === this._orient ? this._middleHandlerSize : 0, offsetHandler = this._isHorizontal ? this._startHandlerSize / 2 : 0, xScale = this._isHorizontal ? this._stateScale : this._valueScale, min = xScale.domain()[0];
            return xScale.scale(min) + this.getLayoutStartPoint().x + offsetLeft + offsetHandler;
        }, this._dataToPositionY = datum => {
            const offsetTop = this._isHorizontal ? this._middleHandlerSize : 0, offsetHandler = this._isHorizontal ? 0 : this._startHandlerSize / 2, yScale = this._isHorizontal ? this._valueScale : this._stateScale, yField = this._isHorizontal ? this._valueField : this._stateField;
            return yScale.scale(datum[yField]) + this.getLayoutStartPoint().y + offsetTop + offsetHandler;
        }, this._dataToPositionY2 = datum => {
            const offsetTop = this._isHorizontal ? this._middleHandlerSize : 0, offsetHandler = this._isHorizontal ? 0 : this._startHandlerSize / 2, yScale = this._isHorizontal ? this._valueScale : this._stateScale, min = yScale.domain()[0];
            return yScale.scale(min) + this.getLayoutStartPoint().y + offsetTop + offsetHandler;
        }, this._valueField = "y", this._filterMode = null !== (_a = spec.filterMode) && void 0 !== _a ? _a : "filter";
    }
    created() {
        super.created(), this._initValueScale();
    }
    setAttrFromSpec() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        super.setAttrFromSpec(), isBoolean(this._spec.roam) && (this._zoomAttr.enable = this._spec.roam, 
        this._dragAttr.enable = this._spec.roam, this._scrollAttr.enable = this._spec.roam), 
        (this._zoomAttr.enable || this._dragAttr.enable || this._scrollAttr.enable) && this.initZoomable(this.event, this._option.mode), 
        this._backgroundSize = null !== (_b = null === (_a = this._spec.background) || void 0 === _a ? void 0 : _a.size) && void 0 !== _b ? _b : 30, 
        this._middleHandlerSize = this._computeMiddleHandlerSize(), this._width = this._computeWidth(), 
        this._height = this._computeHeight(), isNil(null === (_e = null === (_d = null === (_c = this._spec) || void 0 === _c ? void 0 : _c.startHandler) || void 0 === _d ? void 0 : _d.style) || void 0 === _e ? void 0 : _e.size) && (this._spec.startHandler.style.size = this._isHorizontal ? this._height - this._middleHandlerSize : this._width - this._middleHandlerSize), 
        isNil(null === (_h = null === (_g = null === (_f = this._spec) || void 0 === _f ? void 0 : _f.endHandler) || void 0 === _g ? void 0 : _g.style) || void 0 === _h ? void 0 : _h.size) && (this._spec.endHandler.style.size = this._isHorizontal ? this._height - this._middleHandlerSize : this._width - this._middleHandlerSize);
        const startHandlerVisble = null === (_j = this._spec.startHandler.style.visible) || void 0 === _j || _j, endHandlerVisble = null === (_k = this._spec.endHandler.style.visible) || void 0 === _k || _k;
        this._startHandlerSize = startHandlerVisble ? this._spec.startHandler.style.size : 0, 
        this._endHandlerSize = endHandlerVisble ? this._spec.endHandler.style.size : 0;
    }
    onLayoutEnd(ctx) {
        this._updateScaleRange(), this._isReverse() && !this._isReverseCache && (this._isReverseCache = this._isReverse(), 
        this.effect.onZoomChange()), !1 !== this._cacheVisibility && super.onLayoutEnd(ctx);
    }
    _initValueScale() {
        const domain = this._computeDomainOfValueScale();
        if (domain) {
            const valueScale = new LinearScale;
            valueScale.domain(domain), this._valueScale = valueScale;
        }
    }
    _updateScaleRange() {
        var _a, _b;
        const handlerSize = this._startHandlerSize + this._endHandlerSize;
        if (!this._stateScale || !this._valueScale) return;
        let stateScaleRange;
        const defaultSize = this._isHorizontal ? this.getLayoutRect().width - handlerSize : this.getLayoutRect().height - handlerSize, defaultRange = null !== (_b = null === (_a = this._relatedAxisComponent) || void 0 === _a ? void 0 : _a.getScale().range()) && void 0 !== _b ? _b : [ this._startHandlerSize / 2, defaultSize + this._startHandlerSize / 2 ], compWidth = this._computeWidth(), compHeight = this._computeHeight();
        this._isHorizontal ? (stateScaleRange = this._visible ? [ this._startHandlerSize / 2, compWidth - handlerSize + this._startHandlerSize / 2 ] : defaultRange, 
        this._stateScale.range(stateScaleRange), this._valueScale.range([ compHeight - this._middleHandlerSize, 0 ])) : (stateScaleRange = this._visible ? [ this._startHandlerSize / 2, compHeight - handlerSize + this._startHandlerSize / 2 ] : defaultRange, 
        this._stateScale.range(stateScaleRange), "left" === this.layoutOrient ? this._valueScale.range([ compWidth - this._middleHandlerSize, 0 ]) : this._valueScale.range([ 0, compWidth - this._middleHandlerSize ])), 
        this._component && !1 !== this._cacheVisibility && this._component.setAttributes({
            size: {
                width: compWidth,
                height: compHeight
            },
            position: {
                x: this.getLayoutStartPoint().x,
                y: this.getLayoutStartPoint().y
            }
        });
    }
    _computeDomainOfValueScale() {
        const domain = this._data.getLatestData().map((d => d[this._valueField])), domainNum = domain.map((n => 1 * n));
        return domain.length ? [ minInArray(domainNum), maxInArray(domainNum) ] : null;
    }
    _computeMiddleHandlerSize() {
        var _a, _b, _c, _d;
        let size = 0;
        if (null === (_b = null === (_a = this._spec) || void 0 === _a ? void 0 : _a.middleHandler) || void 0 === _b ? void 0 : _b.visible) {
            const middleHandlerIconSize = null !== (_c = this._spec.middleHandler.icon.style.size) && void 0 !== _c ? _c : 8, middleHandlerBackSize = null !== (_d = this._spec.middleHandler.background.size) && void 0 !== _d ? _d : 40;
            size += Math.max(middleHandlerIconSize, middleHandlerBackSize);
        }
        return size;
    }
    _computeWidth() {
        return !1 === this._visible ? 0 : isNumber(this._spec.width) ? this._spec.width : this._isHorizontal ? this.getLayoutRect().width : this._backgroundSize + this._middleHandlerSize;
    }
    _computeHeight() {
        return !1 === this._visible ? 0 : isNumber(this._spec.height) ? this._spec.height : this._isHorizontal ? this._backgroundSize + this._middleHandlerSize : this.getLayoutRect().height;
    }
    _isScaleValid(scale) {
        if (!scale || !scale.domain()) return !1;
        const domain = scale.domain();
        return (!isContinuous(scale.type) || domain[0] !== last(domain)) && (!isDiscrete(scale.type) || 1 !== uniqArray(domain).length);
    }
    _getAttrs(isNeedPreview) {
        var _a, _b, _c, _d, _e;
        const spec = null !== (_a = this._spec) && void 0 !== _a ? _a : {};
        return Object.assign({
            zIndex: this.layoutZIndex,
            start: this._start,
            end: this._end,
            position: {
                x: this.getLayoutStartPoint().x,
                y: this.getLayoutStartPoint().y
            },
            orient: this._orient,
            size: {
                width: this._computeWidth(),
                height: this._computeHeight()
            },
            showDetail: spec.showDetail,
            brushSelect: null !== (_b = spec.brushSelect) && void 0 !== _b && _b,
            zoomLock: null !== (_c = spec.zoomLock) && void 0 !== _c && _c,
            minSpan: this._minSpan,
            maxSpan: this._maxSpan,
            delayType: spec.delayType,
            delayTime: isValid(spec.delayType) ? null !== (_d = spec.delayTime) && void 0 !== _d ? _d : 30 : 0,
            realTime: null === (_e = spec.realTime) || void 0 === _e || _e,
            previewData: isNeedPreview && this._data.getLatestData(),
            previewPointsX: isNeedPreview && this._dataToPositionX,
            previewPointsY: isNeedPreview && this._dataToPositionY,
            tolerance: this._spec.tolerance
        }, this._getComponentAttrs(isNeedPreview));
    }
    _createOrUpdateComponent() {
        if (this._visible) {
            const xScale = this._isHorizontal ? this._stateScale : this._valueScale, yScale = this._isHorizontal ? this._valueScale : this._stateScale, isNeedPreview = this._isScaleValid(xScale) && this._isScaleValid(yScale) && !1 !== this._spec.showBackgroundChart, attrs = this._getAttrs(isNeedPreview);
            if (this._component) this._component.setAttributes(attrs); else {
                const container = this.getContainer();
                this._component = new DataZoomComponent(attrs), this._isHorizontal ? isNeedPreview && this._component.setPreviewPointsY1(this._dataToPositionY2) : isNeedPreview && this._component.setPreviewPointsX1(this._dataToPositionX2), 
                this._component.setStatePointToData((state => this.statePointToData(state))), this._component.addEventListener("change", (e => {
                    const {start: start, end: end, tag: tag} = e.detail;
                    this._handleChange(start, end, void 0, tag);
                })), container.add(this._component), this._updateScaleRange();
            }
        }
    }
    _handleChange(start, end, updateComponent, tag) {
        if (super._handleChange(start, end, updateComponent), this._shouldChange) {
            updateComponent && this._component && this._component.setStartAndEnd(start, end), 
            this._start = start, this._end = end;
            const startValue = this.statePointToData(start), endValue = this.statePointToData(end);
            (isFunction(this._spec.updateDataAfterChange) ? this._spec.updateDataAfterChange(start, end, startValue, endValue) : this._handleStateChange(startValue, endValue, tag)) && this.event.emit(ChartEvent.dataZoomChange, {
                model: this,
                value: {
                    filterData: "axis" !== this._filterMode,
                    start: start,
                    end: end,
                    startValue: this._startValue,
                    endValue: this._endValue,
                    newDomain: this._newDomain
                }
            });
        }
    }
    _handleDataCollectionChange() {
        var _a;
        const data = this._data.getDataView();
        if (data.reRunAllTransform(), null === (_a = this._component) || void 0 === _a || _a.setPreviewData(data.latestData), 
        this._valueScale) {
            const domain = this._computeDomainOfValueScale();
            domain && this._valueScale.domain(domain);
        }
    }
    _getComponentAttrs(isNeedPreview) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        const {middleHandler: middleHandler = {}, startText: startText = {}, endText: endText = {}, backgroundChart: backgroundChart = {}, selectedBackgroundChart: selectedBackgroundChart = {}} = this._spec;
        return {
            backgroundStyle: transformToGraphic(null === (_a = this._spec.background) || void 0 === _a ? void 0 : _a.style),
            startHandlerStyle: transformToGraphic(null === (_b = this._spec.startHandler) || void 0 === _b ? void 0 : _b.style),
            middleHandlerStyle: middleHandler.visible ? {
                visible: !0,
                icon: transformToGraphic(null === (_c = middleHandler.icon) || void 0 === _c ? void 0 : _c.style),
                background: {
                    size: null === (_d = middleHandler.background) || void 0 === _d ? void 0 : _d.size,
                    style: transformToGraphic(null === (_e = middleHandler.background) || void 0 === _e ? void 0 : _e.style)
                }
            } : {
                visible: !1
            },
            endHandlerStyle: transformToGraphic(null === (_f = this._spec.endHandler) || void 0 === _f ? void 0 : _f.style),
            startTextStyle: {
                padding: startText.padding,
                formatMethod: this._getHandlerTextFormatMethod(startText),
                textStyle: transformToGraphic(startText.style)
            },
            endTextStyle: {
                padding: endText.padding,
                formatMethod: this._getHandlerTextFormatMethod(endText),
                textStyle: transformToGraphic(endText.style)
            },
            selectedBackgroundStyle: transformToGraphic(this._spec.selectedBackground.style),
            dragMaskStyle: transformToGraphic(null === (_g = this._spec.dragMask) || void 0 === _g ? void 0 : _g.style),
            backgroundChartStyle: isNeedPreview ? {
                line: mergeSpec(transformToGraphic(null === (_h = backgroundChart.line) || void 0 === _h ? void 0 : _h.style), {
                    fill: !1
                }),
                area: Object.assign({
                    curveType: "basis",
                    visible: !0
                }, transformToGraphic(null === (_j = backgroundChart.area) || void 0 === _j ? void 0 : _j.style))
            } : {
                line: {
                    visible: !1
                },
                area: {
                    visible: !1
                }
            },
            selectedBackgroundChartStyle: isNeedPreview ? {
                line: mergeSpec(transformToGraphic(null === (_k = selectedBackgroundChart.line) || void 0 === _k ? void 0 : _k.style), {
                    fill: !1
                }),
                area: Object.assign({
                    curveType: "basis",
                    visible: !0
                }, transformToGraphic(null === (_l = selectedBackgroundChart.area) || void 0 === _l ? void 0 : _l.style))
            } : {
                line: {
                    visible: !1
                },
                area: {
                    visible: !1
                }
            },
            disableTriggerEvent: this._option.disableTriggerEvent
        };
    }
    _getHandlerTextFormatMethod(spec) {
        const {formatMethod: formatMethod, formatter: formatter} = spec, {formatFunc: formatFunc} = getFormatFunction(formatMethod, formatter);
        return formatFunc ? text => formatFunc(text, {
            label: text
        }, formatter) : void 0;
    }
    _getNeedClearVRenderComponents() {
        return [ this._component ];
    }
    clear() {
        if (this._component) {
            const container = this.getContainer();
            this._component.removeAllChild(), container && container.removeChild(this._component), 
            this._component = null;
        }
        super.clear();
    }
}

DataZoom.type = ComponentTypeEnum.dataZoom, DataZoom.transformerConstructor = DataZoomSpecTransformer, 
DataZoom.specKey = "dataZoom";

export const registerDataZoom = () => {
    Factory.registerComponent(DataZoom.type, DataZoom);
};
//# sourceMappingURL=data-zoom.js.map
