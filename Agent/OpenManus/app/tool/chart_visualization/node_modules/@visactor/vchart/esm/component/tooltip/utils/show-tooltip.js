import { SeriesTypeEnum } from "../../../series/interface/type";

import { Event_Source_Type } from "../../../constant/event";

import { getElementAbsolutePosition, isArray, isValid, isNil } from "@visactor/vutils";

import { VChart } from "../../../core/vchart";

import { isDiscrete } from "@visactor/vscale";

const getDataArrayFromFieldArray = (fields, datum) => isValid(datum) ? fields.map((f => datum[f])) : void 0, datumContainsArray = (fields, data) => datum => fields.every(((key, i) => datum[key] === (null == data ? void 0 : data[i]))), hasData = data => !isNil(data) && (isArray(data) ? data.length > 0 && data.every(isValid) : Object.keys(data).length > 0);

export function showTooltip(datum, options, component) {
    var _a, _b, _c;
    const opt = Object.assign({
        regionIndex: 0
    }, options), componentOptions = component.getOption(), region = componentOptions.getRegionsInUserIdOrIndex(isValid(opt.regionId) ? [ opt.regionId ] : void 0, isValid(opt.regionIndex) ? [ opt.regionIndex ] : void 0)[0];
    if (!region) return "none";
    const markInfoList = getMarkInfoList(datum, region), activeType = null !== (_a = opt.activeType) && void 0 !== _a ? _a : markInfoList.length > 1 ? "dimension" : "mark", regionPos = region.getLayoutStartPoint(), regionRect = region.getLayoutRect(), container = componentOptions.globalInstance.getContainer(), containerPos = Object.assign({
        x: 0,
        y: 0
    }, container ? getElementAbsolutePosition(container) : {}), getOriginDatum = info => {
        var _a;
        const {dimensionFields: dimensionFields, dimensionData: dimensionData, measureFields: measureFields, measureData: measureData, groupField: groupField, groupData: groupData} = info.data, originDatum = null === (_a = info.series.getViewData()) || void 0 === _a ? void 0 : _a.latestData.find((datum => datumContainsArray(dimensionFields, dimensionData)(datum) && datumContainsArray(measureFields, measureData)(datum) && (isNil(groupField) || datumContainsArray([ groupField ], [ groupData ])(datum))));
        return originDatum;
    }, getMockEvent = originPos => {
        var _a, _b;
        const pos = (pos => ({
            x: Math.min(Math.max(pos.x, 0), regionRect.width),
            y: Math.min(Math.max(pos.y, 0), regionRect.height)
        }))(originPos), canvasX = null !== (_a = opt.x) && void 0 !== _a ? _a : regionPos.x + pos.x, canvasY = null !== (_b = opt.y) && void 0 !== _b ? _b : regionPos.y + pos.y;
        return {
            canvasX: canvasX,
            canvasY: canvasY,
            clientX: containerPos.x + canvasX,
            clientY: containerPos.y + canvasY
        };
    };
    if ("dimension" === activeType) {
        const firstInfo = markInfoList[0];
        if (!firstInfo) return "none";
        const markInfoSeriesMap = new Map;
        markInfoList.forEach((info => {
            var _a;
            markInfoSeriesMap.has(info.series) || markInfoSeriesMap.set(info.series, []), null === (_a = markInfoSeriesMap.get(info.series)) || void 0 === _a || _a.push(info);
        }));
        const mockDimensionInfo = [ {
            value: datum[firstInfo.data.dimensionFields[0]],
            data: [ ...markInfoSeriesMap.keys() ].map((series => {
                var _a, _b;
                return {
                    series: series,
                    datum: null !== (_b = null === (_a = markInfoSeriesMap.get(series)) || void 0 === _a ? void 0 : _a.map((info => getOriginDatum(info)))) && void 0 !== _b ? _b : []
                };
            }))
        } ];
        isValid(firstInfo.dimType) && (mockDimensionInfo[0].position = firstInfo.pos[firstInfo.dimType], 
        mockDimensionInfo[0].dimType = firstInfo.dimType);
        const mockParams = {
            changePositionOnly: !1,
            action: "enter",
            tooltip: null,
            dimensionInfo: mockDimensionInfo,
            chart: null !== (_b = componentOptions.globalInstance.getChart()) && void 0 !== _b ? _b : void 0,
            datum: void 0,
            model: void 0,
            source: Event_Source_Type.chart,
            event: getMockEvent({
                x: markInfoList.reduce(((sum, info) => sum + info.pos.x), 0) / markInfoList.length,
                y: markInfoList.reduce(((sum, info) => sum + info.pos.y), 0) / markInfoList.length
            }),
            item: void 0,
            itemMap: new Map
        };
        component.processor.dimension.showTooltip(mockDimensionInfo, mockParams, !1);
        const vchart = componentOptions.globalInstance;
        return VChart.globalConfig.uniqueTooltip && VChart.hideTooltip(vchart.id), activeType;
    }
    if ("mark" === activeType) {
        const info = markInfoList[0];
        if (!info) return "none";
        const mockDatum = Object.assign(Object.assign({}, getOriginDatum(info)), datum), mockDimensionData = [ {
            datum: [ mockDatum ],
            series: info.series
        } ], mockParams = {
            changePositionOnly: !1,
            tooltip: null,
            dimensionInfo: [ {
                value: mockDatum[info.data.dimensionFields[0]],
                data: mockDimensionData
            } ],
            chart: null !== (_c = componentOptions.globalInstance.getChart()) && void 0 !== _c ? _c : void 0,
            datum: mockDatum,
            model: info.series,
            source: Event_Source_Type.chart,
            event: getMockEvent(info.pos),
            item: void 0,
            itemMap: new Map
        };
        component.processor.mark.showTooltip({
            datum: mockDatum,
            mark: null,
            series: info.series
        }, mockParams, !1);
        const vchart = componentOptions.globalInstance;
        return VChart.globalConfig.uniqueTooltip && VChart.hideTooltip(vchart.id), activeType;
    }
    return "none";
}

export const getMarkInfoList = (datum, region) => {
    const seriesList = region.getSeries(), markInfoList = [];
    return seriesList.forEach((series => {
        var _a, _b, _c, _d, _e, _f, _g;
        const dimensionFields = series.getDimensionField(), measureFields = series.getMeasureField(), groupField = series.getSeriesField(), groupData = isValid(groupField) ? datum[groupField] : void 0, groupDomain = isValid(groupField) && null !== (_d = null === (_c = null === (_b = null === (_a = series.getViewDataStatistics) || void 0 === _a ? void 0 : _a.call(series)) || void 0 === _b ? void 0 : _b.latestData[groupField]) || void 0 === _c ? void 0 : _c.values) && void 0 !== _d ? _d : [], dimensionData = getDataArrayFromFieldArray(dimensionFields, datum);
        let measureData = getDataArrayFromFieldArray(measureFields, datum);
        const hasMeasureData = hasData(measureData), isMultiGroups = !hasMeasureData && isValid(groupField) && isNil(groupData) && groupDomain.length > 0, parseMarkInfoOfSimpleSeries = () => {
            var _a;
            const originDatum = null === (_a = series.getViewData()) || void 0 === _a ? void 0 : _a.latestData.find(datumContainsArray(dimensionFields, dimensionData));
            if (!hasMeasureData && (measureData = getDataArrayFromFieldArray(measureFields, originDatum), 
            !hasData(measureData))) return;
            const pos = series.type === SeriesTypeEnum.pie ? series.dataToCentralPosition(originDatum) : series.dataToPosition(originDatum);
            isNil(pos) || isNaN(pos.x) || isNaN(pos.y) || markInfoList.push({
                pos: pos,
                data: {
                    dimensionFields: dimensionFields,
                    dimensionData: dimensionData,
                    measureFields: measureFields,
                    measureData: measureData,
                    hasMeasureData: hasMeasureData,
                    groupField: groupField,
                    groupData: groupData
                },
                series: series
            });
        };
        if ("cartesian" === series.coordinate) {
            const cartesianSeries = series, dimType = isDiscrete(null === (_f = null === (_e = series.getYAxisHelper()) || void 0 === _e ? void 0 : _e.getScale(0)) || void 0 === _f ? void 0 : _f.type) ? "y" : "x", invalidDimensionFields = dimensionFields.map(((field, i) => [ field, i ])).filter((([, i]) => isNil(null == dimensionData ? void 0 : dimensionData[i])));
            let dimensionDataList = [ null != dimensionData ? dimensionData : [] ];
            invalidDimensionFields.length > 0 && invalidDimensionFields.forEach((([field, i]) => {
                var _a, _b, _c, _d;
                const domain = null !== (_d = null === (_c = null === (_b = null === (_a = series.getViewDataStatistics) || void 0 === _a ? void 0 : _a.call(series)) || void 0 === _b ? void 0 : _b.latestData[field]) || void 0 === _c ? void 0 : _c.values) && void 0 !== _d ? _d : [], nextList = [];
                dimensionDataList.forEach((dimensionData => {
                    domain.forEach((value => {
                        var _a;
                        const newData = null !== (_a = null == dimensionData ? void 0 : dimensionData.slice()) && void 0 !== _a ? _a : [];
                        newData[i] = value, nextList.push(newData);
                    }));
                })), dimensionDataList = nextList;
            })), dimensionDataList.forEach((dimensionData => {
                var _a, _b;
                if (isMultiGroups) {
                    const measureDataList = null === (_a = cartesianSeries.getViewData()) || void 0 === _a ? void 0 : _a.latestData.filter(datumContainsArray(dimensionFields, dimensionData));
                    groupDomain.forEach((groupData => {
                        const originDatum = measureDataList.find((d => d[groupField] === groupData));
                        if (measureData = getDataArrayFromFieldArray(measureFields, originDatum), !hasData(measureData)) return;
                        const pos = cartesianSeries.dataToPosition(originDatum);
                        isNil(pos) || isNaN(pos.x) || isNaN(pos.y) || markInfoList.push({
                            pos: pos,
                            data: {
                                dimensionFields: dimensionFields,
                                dimensionData: dimensionData,
                                measureFields: measureFields,
                                measureData: measureData,
                                hasMeasureData: hasMeasureData,
                                groupField: groupField,
                                groupData: groupData
                            },
                            series: series,
                            dimType: dimType
                        });
                    }));
                } else {
                    const originDatum = null === (_b = cartesianSeries.getViewData()) || void 0 === _b ? void 0 : _b.latestData.find(datumContainsArray(dimensionFields, dimensionData));
                    if (!hasMeasureData && (measureData = getDataArrayFromFieldArray(measureFields, originDatum), 
                    !hasData(measureData))) return;
                    const pos = cartesianSeries.dataToPosition(originDatum);
                    if (isNil(pos) || isNaN(pos.x) || isNaN(pos.y)) return;
                    markInfoList.push({
                        pos: pos,
                        data: {
                            dimensionFields: dimensionFields,
                            dimensionData: dimensionData,
                            measureFields: measureFields,
                            measureData: measureData,
                            hasMeasureData: hasMeasureData,
                            groupField: groupField,
                            groupData: groupData
                        },
                        dimType: dimType,
                        series: series
                    });
                }
            }));
        } else if ("polar" === series.coordinate) if (series.type === SeriesTypeEnum.pie) parseMarkInfoOfSimpleSeries(); else {
            const polarSeries = series;
            if (isMultiGroups) {
                const originDatum = (null === (_g = polarSeries.getViewData()) || void 0 === _g ? void 0 : _g.latestData.filter(datumContainsArray(dimensionFields, dimensionData))).find((d => d[groupField] === groupData));
                groupDomain.forEach((groupData => {
                    if (measureData = getDataArrayFromFieldArray(measureFields, originDatum), !hasData(measureData)) return;
                    const pos = polarSeries.dataToPosition(originDatum);
                    isNil(pos) || isNaN(pos.x) || isNaN(pos.y) || markInfoList.push({
                        pos: pos,
                        data: {
                            dimensionFields: dimensionFields,
                            dimensionData: dimensionData,
                            measureFields: measureFields,
                            measureData: measureData,
                            hasMeasureData: hasMeasureData,
                            groupField: groupField,
                            groupData: groupData
                        },
                        series: series
                    });
                }));
            } else parseMarkInfoOfSimpleSeries();
        } else "geo" === series.coordinate && parseMarkInfoOfSimpleSeries();
    })), markInfoList;
};
//# sourceMappingURL=show-tooltip.js.map
