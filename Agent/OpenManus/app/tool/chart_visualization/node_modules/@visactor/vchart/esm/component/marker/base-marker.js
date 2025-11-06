import { DataSet, DataView } from "@visactor/vdataset";

import { array, isValid, isNil, isString, isEqual } from "@visactor/vutils";

import { BaseComponent } from "../base/base-component";

import { calcLayoutNumber } from "../../util/space";

import { isAggrSpec } from "./utils";

import { getFirstSeries } from "../../util";

import { arrayParser } from "../../data/parser/array";

import { getSpecInfo } from "../util";

import { registerDataSetInstanceTransform } from "../../data/register";

import { markerAggregation } from "../../data/transforms/aggregation";

import { markerFilter } from "../../data/transforms/marker-filter";

export class BaseMarker extends BaseComponent {
    constructor() {
        super(...arguments), this.layoutType = "none", this._layoutOffsetX = 0, this._layoutOffsetY = 0;
    }
    getRelativeSeries() {
        return this._relativeSeries;
    }
    getMarkerData() {
        return this._markerData;
    }
    static _getMarkerCoordinateType(markerSpec) {
        return "cartesian";
    }
    static getSpecInfo(chartSpec) {
        return getSpecInfo(chartSpec, this.specKey, this.type, (s => !1 !== s.visible && this._getMarkerCoordinateType(s) === this.coordinateType));
    }
    getMarkAttributeContext() {
        return this._markAttributeContext;
    }
    _buildMarkerAttributeContext() {
        this._markAttributeContext = {
            relativeSeries: this._relativeSeries,
            startRelativeSeries: this._startRelativeSeries,
            endRelativeSeries: this._endRelativeSeries,
            vchart: this._option.globalInstance
        };
    }
    created() {
        super.created(), this._bindSeries(), this._initDataView(), this.initEvent(), this._buildMarkerAttributeContext();
    }
    _getAllRelativeSeries() {
        return {
            getRelativeSeries: () => this._relativeSeries,
            getStartRelativeSeries: () => this._startRelativeSeries,
            getEndRelativeSeries: () => this._endRelativeSeries
        };
    }
    _getFieldInfoFromSpec(dim, spec, relativeSeries) {
        const specKeyByDim = {
            x: "xField",
            y: "yField",
            radius: "valueField",
            angle: "categoryField",
            areaName: "nameField"
        };
        return isString(spec) && isAggrSpec(spec) ? {
            field: relativeSeries.getSpec()[specKeyByDim[dim]],
            aggrType: spec
        } : spec;
    }
    _processSpecByDims(dimSpec) {
        const relativeSeries = this._relativeSeries, dimMap = {};
        return dimSpec.forEach((d => dimMap[d.dim] = this._getFieldInfoFromSpec(d.dim, d.specValue, relativeSeries))), 
        Object.assign(Object.assign({}, dimMap), this._getAllRelativeSeries());
    }
    _processSpecCoo(spec) {
        return Object.assign(Object.assign({
            coordinates: spec.coordinates || spec.coordinate
        }, this._getAllRelativeSeries()), {
            getSeriesByIdOrIndex: (seriesUserId, seriesIndex) => this._getSeriesByIdOrIndex(seriesUserId, seriesIndex),
            coordinateType: this.coordinateType
        });
    }
    _getRelativeDataView() {
        if (this._specifiedDataSeries) {
            let resultData = [];
            array(this._specifiedDataSeries).forEach((series => {
                resultData = resultData.concat(series.getViewData().latestData);
            }));
            const dataSet = new DataSet;
            return dataSet.registerParser("array", arrayParser), new DataView(dataSet).parse(resultData, {
                type: "array"
            });
        }
        return this._relativeSeries.getViewData();
    }
    updateLayoutAttribute() {
        var _a, _b, _c;
        if (null === (_a = this._spec.visible) || void 0 === _a || _a) {
            if (!this._markerComponent) {
                const markerComponent = this._createMarkerComponent();
                markerComponent.name = null !== (_b = this._spec.name) && void 0 !== _b ? _b : this.type, 
                markerComponent.id = null !== (_c = this._spec.id) && void 0 !== _c ? _c : `${this.type}-${this.id}`, 
                this._markerComponent = markerComponent, this.getContainer().add(this._markerComponent), 
                this._markerComponent.on("*", ((event, type) => {
                    this._delegateEvent(this._markerComponent, event, type, null, this.getMarkerData.bind(this));
                }));
            }
            this._markerLayout();
        }
        super.updateLayoutAttribute();
    }
    _getSeriesByIdOrIndex(seriesUserId, seriesIndex) {
        var _a, _b;
        let series;
        return series = null === (_a = this._option.getSeriesInUserIdOrIndex(isValid(seriesUserId) ? [ seriesUserId ] : [], [ seriesIndex ])) || void 0 === _a ? void 0 : _a[0], 
        series || (series = null !== (_b = this._relativeSeries) && void 0 !== _b ? _b : this._getFirstSeries()), 
        series;
    }
    _bindSeries() {
        const spec = this._spec;
        this._relativeSeries = this._getSeriesByIdOrIndex(spec.relativeSeriesId, spec.relativeSeriesIndex), 
        this._startRelativeSeries = this._getSeriesByIdOrIndex(spec.startRelativeSeriesId, spec.startRelativeSeriesIndex), 
        this._endRelativeSeries = this._getSeriesByIdOrIndex(spec.endRelativeSeriesId, spec.endRelativeSeriesIndex), 
        spec.specifiedDataSeriesIndex && "all" === spec.specifiedDataSeriesIndex || spec.specifiedDataSeriesId && "all" === spec.specifiedDataSeriesId ? this._specifiedDataSeries = this._option.getAllSeries() : (spec.specifiedDataSeriesIndex || spec.specifiedDataSeriesId) && (this._specifiedDataSeries = this._getSeriesByIdOrIndex(spec.specifiedDataSeriesId, spec.specifiedDataSeriesIndex));
    }
    initEvent() {
        "cartesian" !== this._relativeSeries.coordinate && (this._relativeSeries.event.on("zoom", this._markerLayout.bind(this)), 
        this._relativeSeries.event.on("panmove", this._markerLayout.bind(this)), this._relativeSeries.event.on("scroll", this._markerLayout.bind(this)));
    }
    onRender(ctx) {}
    changeRegions(regions) {}
    clear() {
        super.clear(), this._firstSeries = null;
    }
    _getFirstSeries() {
        var _a;
        if (this._firstSeries) return this._firstSeries;
        const firstSeries = getFirstSeries(this._regions);
        return firstSeries ? (this._firstSeries = firstSeries, firstSeries) : (null === (_a = this._option) || void 0 === _a || _a.onError("need at least one series"), 
        null);
    }
    _getNeedClearVRenderComponents() {
        return [ this._markerComponent ];
    }
    onLayoutStart(layoutRect, chartViewRect, ctx) {
        isNil(this._spec.offsetX) || (this._layoutOffsetX = calcLayoutNumber(this._spec.offsetX, chartViewRect.width, chartViewRect)), 
        isNil(this._spec.offsetY) || (this._layoutOffsetY = calcLayoutNumber(this._spec.offsetY, chartViewRect.height, chartViewRect)), 
        super.onLayoutStart(layoutRect, chartViewRect, ctx);
    }
    _compareSpec(spec, prevSpec) {
        const result = super._compareSpec(spec, prevSpec);
        return isEqual(prevSpec, spec) || (result.reRender = !0, result.reMake = !0, result.change = !0), 
        result;
    }
    _initCommonDataView() {
        const {options: options} = this._computeOptions(), seriesData = this._getRelativeDataView();
        registerDataSetInstanceTransform(this._option.dataSet, "markerAggregation", markerAggregation), 
        registerDataSetInstanceTransform(this._option.dataSet, "markerFilter", markerFilter);
        const data = new DataView(this._option.dataSet, {
            name: `${this.type}_${this.id}_data`
        });
        data.parse([ seriesData ], {
            type: "dataview"
        }), data.transform({
            type: "markerAggregation",
            options: options
        }), data.transform({
            type: "markerFilter",
            options: this._getAllRelativeSeries()
        }), data.target.on("change", (() => {
            this._markerLayout();
        })), this._markerData = data;
    }
}
//# sourceMappingURL=base-marker.js.map
