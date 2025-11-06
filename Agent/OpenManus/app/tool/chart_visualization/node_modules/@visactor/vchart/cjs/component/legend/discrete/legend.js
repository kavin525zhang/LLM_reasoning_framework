"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerDiscreteLegend = exports.DiscreteLegend = void 0;

const vutils_1 = require("@visactor/vutils"), vdataset_1 = require("@visactor/vdataset"), type_1 = require("../../interface/type"), util_1 = require("./util"), register_1 = require("../../../data/register"), model_1 = require("../../../util/model"), data_1 = require("../../../util/data"), type_2 = require("../../../util/type"), vrender_components_1 = require("@visactor/vrender-components"), vrender_components_2 = require("@visactor/vrender-components"), discrete_1 = require("../../../data/transforms/legend-data/discrete/discrete"), base_legend_1 = require("../base-legend"), event_1 = require("../../../constant/event"), factory_1 = require("../../../core/factory"), initialize_1 = require("../../../data/initialize"), util_2 = require("../../util");

class DiscreteLegend extends base_legend_1.BaseLegend {
    constructor() {
        super(...arguments), this.type = type_1.ComponentTypeEnum.discreteLegend, this.name = type_1.ComponentTypeEnum.discreteLegend;
    }
    static getSpecInfo(chartSpec) {
        return (0, util_2.getSpecInfo)(chartSpec, this.specKey, this.type, (s => !s.type || "discrete" === s.type));
    }
    init(option) {
        super.init(option), (0, model_1.eachSeries)(this._regions, (s => {
            s.addViewDataFilter({
                type: "discreteLegendFilter",
                options: {
                    series: s,
                    selected: () => this._selectedData,
                    field: () => this._getSeriesLegendField(s),
                    data: () => this.getLegendDefaultData(),
                    customFilter: this._spec.customFilter
                },
                level: initialize_1.TransformLevel.legendFilter
            });
        }), {
            userId: this._seriesUserId,
            specIndex: this._seriesIndex
        });
    }
    _initLegendData() {
        (0, register_1.registerDataSetInstanceTransform)(this._option.dataSet, "discreteLegendFilter", discrete_1.discreteLegendFilter), 
        (0, register_1.registerDataSetInstanceTransform)(this._option.dataSet, "discreteLegendDataMake", discrete_1.discreteLegendDataMake);
        const legendData = new vdataset_1.DataView(this._option.dataSet, {
            name: `${this.type}_${this.id}_data`
        });
        return legendData.transform({
            type: "discreteLegendDataMake",
            options: {
                series: () => {
                    const result = [];
                    return (0, model_1.eachSeries)(this._regions, (s => {
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
        if ((0, vutils_1.isNil)(specifyScaleId)) return defaultField;
        if (!s.getRawData()) return defaultField;
        const scaleSpec = this._option.globalScale.getScaleSpec(specifyScaleId);
        if (!scaleSpec) return defaultField;
        if (this._spec.field) return this._spec.field;
        if (!(0, type_2.isDataDomainSpec)(scaleSpec.domain)) return defaultField;
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
        return (0, vutils_1.isFunction)(this._spec.data) ? this._getLegendItems().map((obj => obj.label)) : this._legendData.getLatestData().map(originalData ? obj => obj.originalKey : obj => obj.key);
    }
    _addDefaultTitleText(attrs) {
        var _a, _b, _c, _d;
        if ((null === (_a = attrs.title) || void 0 === _a ? void 0 : _a.visible) && (0, 
        vutils_1.isNil)(attrs.title.text) && (0, vutils_1.isNil)(null === (_b = attrs.title.style) || void 0 === _b ? void 0 : _b.text)) {
            const series = null === (_d = null === (_c = this._regions) || void 0 === _c ? void 0 : _c[0]) || void 0 === _d ? void 0 : _d.getSeries()[0];
            if (!series) return;
            attrs.title.text = (0, data_1.getFieldAlias)(series.getRawData(), series.getSeriesField());
        }
    }
    _getLegendAttributes(rect) {
        const layout = "bottom" === this.layoutOrient || "top" === this.layoutOrient ? "horizontal" : "vertical", attrs = Object.assign(Object.assign({
            layout: layout,
            items: this._getLegendItems(),
            zIndex: this.layoutZIndex
        }, (0, util_1.getLegendAttributes)(this._spec, rect)), {
            maxWidth: rect.width,
            maxHeight: rect.height
        });
        return this._addDefaultTitleText(attrs), this._addLegendItemFormatMethods(attrs), 
        attrs;
    }
    _getLegendConstructor() {
        return vrender_components_2.DiscreteLegend;
    }
    setSelectedData(selectedData) {
        selectedData && (this._unselectedData = this.getLegendDefaultData().filter((entry => !selectedData.includes(entry)))), 
        super.setSelectedData(selectedData);
    }
    _initEvent() {
        if (this._legendComponent) {
            const doFilter = !1 !== this._spec.filter;
            this._legendComponent.addEventListener(vrender_components_1.LegendEvent.legendItemClick, (e => {
                const selectedData = (0, vutils_1.get)(e, "detail.currentSelected");
                doFilter && this.setSelectedData(selectedData), this.event.emit(event_1.ChartEvent.legendItemClick, {
                    model: this,
                    value: selectedData,
                    event: e
                });
            })), this._legendComponent.addEventListener(vrender_components_1.LegendEvent.legendItemHover, (e => {
                const detail = (0, vutils_1.get)(e, "detail");
                this.event.emit(event_1.ChartEvent.legendItemHover, {
                    model: this,
                    value: detail,
                    event: e
                });
            })), this._legendComponent.addEventListener(vrender_components_1.LegendEvent.legendItemUnHover, (e => {
                const detail = (0, vutils_1.get)(e, "detail");
                this.event.emit(event_1.ChartEvent.legendItemUnHover, {
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
                    fillOpacity: (0, vutils_1.isValidNumber)(fillOpacity) ? fillOpacity : 1,
                    strokeOpacity: (0, vutils_1.isValidNumber)(strokeOpacity) ? strokeOpacity : 1,
                    opacity: (0, vutils_1.isValidNumber)(opacity) ? opacity : 1,
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
        return (0, vutils_1.isFunction)(this._spec.data) ? this._spec.data(originData, this._option.globalScale.getScale("color"), this._option.globalScale) : originData;
    }
    _addLegendItemFormatMethods(attrs) {
        var _a, _b, _c, _d;
        const {formatMethod: labelFormatMethod, formatter: labelFormatter} = null !== (_b = null === (_a = this._spec.item) || void 0 === _a ? void 0 : _a.label) && void 0 !== _b ? _b : {}, {formatMethod: valueFormatMethod, formatter: valueFormatter} = null !== (_d = null === (_c = this._spec.item) || void 0 === _c ? void 0 : _c.value) && void 0 !== _d ? _d : {}, {formatFunc: labelFormatFunc} = (0, 
        util_2.getFormatFunction)(labelFormatMethod, labelFormatter);
        labelFormatter && !labelFormatMethod && labelFormatFunc && (attrs.item.label.formatMethod = (value, datum) => labelFormatFunc(value, datum, labelFormatter));
        const {formatFunc: valueFormatFunc} = (0, util_2.getFormatFunction)(valueFormatMethod, valueFormatter);
        valueFormatter && !valueFormatMethod && valueFormatFunc && (attrs.item.value.formatMethod = (value, datum) => valueFormatFunc(valueFormatter, value, datum, labelFormatter));
    }
}

exports.DiscreteLegend = DiscreteLegend, DiscreteLegend.specKey = "legends", DiscreteLegend.type = type_1.ComponentTypeEnum.discreteLegend;

const registerDiscreteLegend = () => {
    factory_1.Factory.registerComponent(DiscreteLegend.type, DiscreteLegend);
};

exports.registerDiscreteLegend = registerDiscreteLegend;
//# sourceMappingURL=legend.js.map
