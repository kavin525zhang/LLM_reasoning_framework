import { isFunction, isNil, isValidNumber, get } from "@visactor/vutils";

import { DataView } from "@visactor/vdataset";

import { ComponentTypeEnum } from "../../interface/type";

import { getLegendAttributes } from "./util";

import { registerDataSetInstanceTransform } from "../../../data/register";

import { eachSeries } from "../../../util/model";

import { getFieldAlias } from "../../../util/data";

import { isDataDomainSpec } from "../../../util/type";

import { LegendEvent } from "@visactor/vrender-components";

import { DiscreteLegend as LegendComponent } from "@visactor/vrender-components";

import { discreteLegendDataMake, discreteLegendFilter } from "../../../data/transforms/legend-data/discrete/discrete";

import { BaseLegend } from "../base-legend";

import { ChartEvent } from "../../../constant/event";

import { Factory } from "../../../core/factory";

import { TransformLevel } from "../../../data/initialize";

import { getFormatFunction, getSpecInfo } from "../../util";

export class DiscreteLegend extends BaseLegend {
    constructor() {
        super(...arguments), this.type = ComponentTypeEnum.discreteLegend, this.name = ComponentTypeEnum.discreteLegend;
    }
    static getSpecInfo(chartSpec) {
        return getSpecInfo(chartSpec, this.specKey, this.type, (s => !s.type || "discrete" === s.type));
    }
    init(option) {
        super.init(option), eachSeries(this._regions, (s => {
            s.addViewDataFilter({
                type: "discreteLegendFilter",
                options: {
                    series: s,
                    selected: () => this._selectedData,
                    field: () => this._getSeriesLegendField(s),
                    data: () => this.getLegendDefaultData(),
                    customFilter: this._spec.customFilter
                },
                level: TransformLevel.legendFilter
            });
        }), {
            userId: this._seriesUserId,
            specIndex: this._seriesIndex
        });
    }
    _initLegendData() {
        registerDataSetInstanceTransform(this._option.dataSet, "discreteLegendFilter", discreteLegendFilter), 
        registerDataSetInstanceTransform(this._option.dataSet, "discreteLegendDataMake", discreteLegendDataMake);
        const legendData = new DataView(this._option.dataSet, {
            name: `${this.type}_${this.id}_data`
        });
        return legendData.transform({
            type: "discreteLegendDataMake",
            options: {
                series: () => {
                    const result = [];
                    return eachSeries(this._regions, (s => {
                        result.push(s);
                    }), {
                        specIndex: this._spec.seriesIndex,
                        userId: this._spec.seriesId
                    }), result;
                },
                seriesField: s => this._getSeriesLegendField(s)
            }
        }), legendData;
    }
    _getSeriesLegendField(s) {
        var _a, _b, _c;
        const defaultField = s.getSeriesField(), specifyScaleId = null !== (_a = this._spec.scaleName) && void 0 !== _a ? _a : this._spec.scale;
        if (isNil(specifyScaleId)) return defaultField;
        if (!s.getRawData()) return defaultField;
        const scaleSpec = this._option.globalScale.getScaleSpec(specifyScaleId);
        if (!scaleSpec) return defaultField;
        if (this._spec.field) return this._spec.field;
        if (!isDataDomainSpec(scaleSpec.domain)) return defaultField;
        const seriesData = scaleSpec.domain.find((d => d.dataId === s.getRawData().name));
        return seriesData && null !== (_c = null === (_b = seriesData.fields) || void 0 === _b ? void 0 : _b[0]) && void 0 !== _c ? _c : defaultField;
    }
    _initSelectedData() {
        const fullSelectedData = this.getLegendDefaultData();
        if (this._unselectedData) {
            const selected = [], unselected = [];
            fullSelectedData.forEach((entry => {
                this._unselectedData.includes(entry) ? unselected.push(entry) : selected.push(entry);
            })), this._selectedData = selected, this._unselectedData = unselected;
        } else this._spec.defaultSelected ? this._selectedData = [ ...this._spec.defaultSelected ] : this._selectedData = fullSelectedData;
    }
    getLegendDefaultData(originalData) {
        return isFunction(this._spec.data) ? this._getLegendItems().map((obj => obj.label)) : this._legendData.getLatestData().map(originalData ? obj => obj.originalKey : obj => obj.key);
    }
    _addDefaultTitleText(attrs) {
        var _a, _b, _c, _d;
        if ((null === (_a = attrs.title) || void 0 === _a ? void 0 : _a.visible) && isNil(attrs.title.text) && isNil(null === (_b = attrs.title.style) || void 0 === _b ? void 0 : _b.text)) {
            const series = null === (_d = null === (_c = this._regions) || void 0 === _c ? void 0 : _c[0]) || void 0 === _d ? void 0 : _d.getSeries()[0];
            if (!series) return;
            attrs.title.text = getFieldAlias(series.getRawData(), series.getSeriesField());
        }
    }
    _getLegendAttributes(rect) {
        const layout = "bottom" === this.layoutOrient || "top" === this.layoutOrient ? "horizontal" : "vertical", attrs = Object.assign(Object.assign({
            layout: layout,
            items: this._getLegendItems(),
            zIndex: this.layoutZIndex
        }, getLegendAttributes(this._spec, rect)), {
            maxWidth: rect.width,
            maxHeight: rect.height
        });
        return this._addDefaultTitleText(attrs), this._addLegendItemFormatMethods(attrs), 
        attrs;
    }
    _getLegendConstructor() {
        return LegendComponent;
    }
    setSelectedData(selectedData) {
        selectedData && (this._unselectedData = this.getLegendDefaultData().filter((entry => !selectedData.includes(entry)))), 
        super.setSelectedData(selectedData);
    }
    _initEvent() {
        if (this._legendComponent) {
            const doFilter = !1 !== this._spec.filter;
            this._legendComponent.addEventListener(LegendEvent.legendItemClick, (e => {
                const selectedData = get(e, "detail.currentSelected");
                doFilter && this.setSelectedData(selectedData), this.event.emit(ChartEvent.legendItemClick, {
                    model: this,
                    value: selectedData,
                    event: e
                });
            })), this._legendComponent.addEventListener(LegendEvent.legendItemHover, (e => {
                const detail = get(e, "detail");
                this.event.emit(ChartEvent.legendItemHover, {
                    model: this,
                    value: detail,
                    event: e
                });
            })), this._legendComponent.addEventListener(LegendEvent.legendItemUnHover, (e => {
                const detail = get(e, "detail");
                this.event.emit(ChartEvent.legendItemUnHover, {
                    model: this,
                    value: detail,
                    event: e
                });
            }));
        }
    }
    _getLegendItems() {
        const originData = (this._legendData.getLatestData() || []).map((datum => {
            var _a, _b;
            const fillOpacity = datum.style("fillOpacity"), strokeOpacity = datum.style("strokeOpacity"), opacity = datum.style("opacity"), texture = datum.style("texture");
            return {
                label: datum.key,
                shape: {
                    symbolType: null !== (_b = null !== (_a = datum.style("symbolType")) && void 0 !== _a ? _a : datum.shapeType) && void 0 !== _b ? _b : "circle",
                    fillOpacity: isValidNumber(fillOpacity) ? fillOpacity : 1,
                    strokeOpacity: isValidNumber(strokeOpacity) ? strokeOpacity : 1,
                    opacity: isValidNumber(opacity) ? opacity : 1,
                    texturePadding: texture ? 1 : null,
                    textureSize: texture ? 4 : null,
                    texture: texture,
                    fill: datum.style("fill"),
                    stroke: datum.style("stroke"),
                    textureColor: datum.style("textureColor"),
                    innerBorder: datum.style("innerBorder"),
                    outerBorder: datum.style("outerBorder"),
                    lineDash: datum.style("lineDash"),
                    lineDashOffset: datum.style("lineDashOffset"),
                    lineWidth: datum.style("lineWidth")
                }
            };
        }));
        return isFunction(this._spec.data) ? this._spec.data(originData, this._option.globalScale.getScale("color"), this._option.globalScale) : originData;
    }
    _addLegendItemFormatMethods(attrs) {
        var _a, _b, _c, _d;
        const {formatMethod: labelFormatMethod, formatter: labelFormatter} = null !== (_b = null === (_a = this._spec.item) || void 0 === _a ? void 0 : _a.label) && void 0 !== _b ? _b : {}, {formatMethod: valueFormatMethod, formatter: valueFormatter} = null !== (_d = null === (_c = this._spec.item) || void 0 === _c ? void 0 : _c.value) && void 0 !== _d ? _d : {}, {formatFunc: labelFormatFunc} = getFormatFunction(labelFormatMethod, labelFormatter);
        labelFormatter && !labelFormatMethod && labelFormatFunc && (attrs.item.label.formatMethod = (value, datum) => labelFormatFunc(value, datum, labelFormatter));
        const {formatFunc: valueFormatFunc} = getFormatFunction(valueFormatMethod, valueFormatter);
        valueFormatter && !valueFormatMethod && valueFormatFunc && (attrs.item.value.formatMethod = (value, datum) => valueFormatFunc(valueFormatter, value, datum, labelFormatter));
    }
}

DiscreteLegend.specKey = "legends", DiscreteLegend.type = ComponentTypeEnum.discreteLegend;

export const registerDiscreteLegend = () => {
    Factory.registerComponent(DiscreteLegend.type, DiscreteLegend);
};
//# sourceMappingURL=legend.js.map
