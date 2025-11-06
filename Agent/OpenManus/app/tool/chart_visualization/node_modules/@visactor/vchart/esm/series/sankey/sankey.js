import { CartesianSeries } from "../cartesian/cartesian";

import { SeriesTypeEnum } from "../interface/type";

import { registerSankeyTransforms } from "@visactor/vgrammar-sankey";

import { animationConfig, userAnimationConfig } from "../../animation/utils";

import { registerFadeInOutAnimation } from "../../animation/config";

import { registerDataSetInstanceTransform } from "../../data/register";

import { sankeyFormat, sankeyLayout, collectHierarchyField } from "../../data/transforms/sankey";

import { sankeyNodes } from "../../data/transforms/sankey-nodes";

import { sankeyLinks } from "../../data/transforms/sankey-links";

import { STATE_VALUE_ENUM } from "../../compile/mark/interface";

import { DataView } from "@visactor/vdataset";

import { LayoutZIndex } from "../../constant/layout";

import { AttributeLevel } from "../../constant/attribute";

import { Event_Bubble_Level } from "../../constant/event";

import { SeriesData } from "../base/series-data";

import { SankeySeriesTooltipHelper } from "./tooltip-helper";

import { Bounds, array, isNil, isValid, isNumber, isArray } from "@visactor/vutils";

import { registerSankeyAnimation } from "./animation";

import { ColorOrdinalScale } from "../../scale/color-ordinal-scale";

import { registerRectMark } from "../../mark/rect";

import { registerTextMark } from "../../mark/text";

import { registerLinkPathMark } from "../../mark/link-path";

import { sankeySeriesMark } from "./constant";

import { flatten } from "../../data/transforms/flatten";

import { Factory } from "../../core/factory";

import { TransformLevel } from "../../data/initialize";

import { addDataKey, initKeyMap } from "../../data/transforms/data-key";

import { SankeySeriesSpecTransformer } from "./sankey-transformer";

import { getFormatFunction } from "../../component/util";

export class SankeySeries extends CartesianSeries {
    constructor() {
        super(...arguments), this.type = SeriesTypeEnum.sankey, this.transformerConstructor = SankeySeriesSpecTransformer, 
        this._nodeLayoutZIndex = LayoutZIndex.Node, this._labelLayoutZIndex = LayoutZIndex.Label, 
        this._viewBox = new Bounds, this._fillByNode = datum => {
            var _a, _b, _c, _d, _e;
            if (datum && datum.sourceRect && datum.targetRect) return this._fillByLink(datum);
            const fill = null === (_b = null === (_a = this._spec.node) || void 0 === _a ? void 0 : _a.style) || void 0 === _b ? void 0 : _b.fill;
            if (isValid(fill)) return fill;
            if (isValid(this._spec.seriesField)) {
                const colorScale = null === (_d = null === (_c = this._option) || void 0 === _c ? void 0 : _c.globalScale) || void 0 === _d ? void 0 : _d.getScale("color"), nodeDatum = (null == datum ? void 0 : datum.datum) ? datum.datum : datum;
                return null == colorScale ? void 0 : colorScale.scale(null == nodeDatum ? void 0 : nodeDatum[this._spec.seriesField]);
            }
            return null === (_e = this._colorScale) || void 0 === _e ? void 0 : _e.scale(this._getNodeNameFromData(datum));
        }, this._fillByLink = datum => {
            var _a, _b, _c, _d, _e, _f, _g;
            const fill = null === (_b = null === (_a = this._spec.link) || void 0 === _a ? void 0 : _a.style) || void 0 === _b ? void 0 : _b.fill;
            if (fill) return fill;
            if (isValid(this._spec.seriesField)) {
                const sourceNode = null === (_d = null === (_c = this._nodesSeriesData) || void 0 === _c ? void 0 : _c.getLatestData()) || void 0 === _d ? void 0 : _d.find((entry => datum.source === entry.key)), nodeDatum = null == sourceNode ? void 0 : sourceNode.datum, colorScale = null === (_f = null === (_e = this._option) || void 0 === _e ? void 0 : _e.globalScale) || void 0 === _f ? void 0 : _f.getScale("color");
                return null == colorScale ? void 0 : colorScale.scale(null == nodeDatum ? void 0 : nodeDatum[this._spec.seriesField]);
            }
            const sourceName = isNumber(datum.source) ? this.getNodeList()[datum.source] : datum.source;
            return null === (_g = this._colorScale) || void 0 === _g ? void 0 : _g.scale(sourceName);
        }, this._handleEmphasisElement = params => {
            var _a, _b, _c, _d, _e;
            const emphasisSpec = null !== (_a = this._spec.emphasis) && void 0 !== _a ? _a : {}, element = params.item;
            "adjacency" === emphasisSpec.effect ? element && element.mark === (null === (_b = this._nodeMark) || void 0 === _b ? void 0 : _b.getProduct()) ? this._handleNodeAdjacencyClick(element) : element && element.mark === (null === (_c = this._linkMark) || void 0 === _c ? void 0 : _c.getProduct()) ? this._handleLinkAdjacencyClick(element) : this._handleClearEmpty() : "related" === emphasisSpec.effect && (element && element.mark === (null === (_d = this._nodeMark) || void 0 === _d ? void 0 : _d.getProduct()) ? this._handleNodeRelatedClick(element) : element && element.mark === (null === (_e = this._linkMark) || void 0 === _e ? void 0 : _e.getProduct()) ? this._handleLinkRelatedClick(element) : this._handleClearEmpty());
        }, this._handleClearEmpty = () => {
            var _a, _b;
            if (!this._needClear) return;
            const allNodeElements = null === (_a = this._nodeMark) || void 0 === _a ? void 0 : _a.getProductElements();
            if (!allNodeElements || !allNodeElements.length) return;
            const allLinkElements = null === (_b = this._linkMark) || void 0 === _b ? void 0 : _b.getProductElements();
            if (!allLinkElements || !allLinkElements.length) return;
            const states = [ STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS, STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS_REVERSE ];
            allNodeElements.forEach((el => {
                el.removeState(states);
            })), allLinkElements.forEach((el => {
                el.removeState(states);
            })), this._needClear = !1;
        }, this._handleNodeAdjacencyClick = element => {
            const nodeDatum = element.getDatum(), highlightNodes = [ nodeDatum.key ];
            if (this._linkMark) {
                const allLinkElements = this._linkMark.getProductElements();
                if (!allLinkElements || !allLinkElements.length) return;
                allLinkElements.forEach(((linkEl, i) => {
                    const linkDatum = linkEl.getDatum();
                    linkDatum.source === nodeDatum.key ? (highlightNodes.includes(linkDatum.target) || highlightNodes.push(linkDatum.target), 
                    linkEl.removeState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS_REVERSE), linkEl.addState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS)) : linkDatum.target === nodeDatum.key ? (highlightNodes.includes(linkDatum.source) || highlightNodes.push(linkDatum.source), 
                    linkEl.removeState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS_REVERSE), linkEl.addState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS)) : (linkEl.removeState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS), 
                    linkEl.addState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS_REVERSE));
                }));
            }
            this._nodeMark && this._highLightElements(this._nodeMark.getProductElements(), highlightNodes), 
            this._needClear = !0;
        }, this._handleLinkAdjacencyClick = element => {
            const curLinkDatum = element.getDatum(), highlightNodes = [ curLinkDatum.source, curLinkDatum.target ];
            if (this._linkMark) {
                const allLinkElements = this._linkMark.getProductElements();
                if (!allLinkElements || !allLinkElements.length) return;
                allLinkElements.forEach((linkEl => {
                    linkEl === element ? (linkEl.removeState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS_REVERSE), 
                    linkEl.addState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS, {
                        ratio: 1
                    })) : (linkEl.removeState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS), linkEl.addState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS_REVERSE));
                }));
            }
            this._nodeMark && this._highLightElements(this._nodeMark.getProductElements(), highlightNodes), 
            this._needClear = !0;
        }, this._handleNodeRelatedClick = element => {
            var _a;
            const nodeDatum = element.getDatum(), allNodeElements = this._nodeMark.getProductElements();
            if (!allNodeElements || !allNodeElements.length) return;
            const allLinkElements = this._linkMark.getProductElements();
            if (!allLinkElements || !allLinkElements.length) return;
            const father = (null === (_a = allLinkElements[0].getDatum()) || void 0 === _a ? void 0 : _a.parents) ? "parents" : "source";
            if ("source" === father) {
                const highlightNodes = [ nodeDatum.key ], highlightLinks = [];
                if (allLinkElements.forEach(((linkEl, i) => {
                    var _a, _b, _c, _d;
                    const linkDatum = linkEl.getDatum(), father = (null == linkDatum ? void 0 : linkDatum.parents) ? "parents" : "source";
                    if (array(linkDatum[father]).includes(nodeDatum.key)) {
                        if (highlightLinks.includes(null !== (_a = linkDatum.key) && void 0 !== _a ? _a : linkDatum.index) || highlightLinks.push(null !== (_b = linkDatum.key) && void 0 !== _b ? _b : linkDatum.index), 
                        highlightNodes.includes(linkDatum.source) || highlightNodes.push(linkDatum.source), 
                        !highlightNodes.includes(linkDatum.target)) {
                            highlightNodes.push(linkDatum.target);
                            let targetNodeSourceLinks = allNodeElements.find((nodeElement => nodeElement.data[0].key === linkDatum.target)).data[0].sourceLinks;
                            for (;(null == targetNodeSourceLinks ? void 0 : targetNodeSourceLinks.length) > 0; ) {
                                const newTargetNodeSourceLinks = [];
                                return targetNodeSourceLinks.forEach((targetNodeSourceLinkDatum => {
                                    var _a, _b;
                                    if (!highlightLinks.includes(null !== (_a = targetNodeSourceLinkDatum.key) && void 0 !== _a ? _a : targetNodeSourceLinkDatum.index) && (highlightLinks.push(null !== (_b = targetNodeSourceLinkDatum.key) && void 0 !== _b ? _b : targetNodeSourceLinkDatum.index), 
                                    !highlightNodes.includes(targetNodeSourceLinkDatum.target))) {
                                        highlightNodes.push(targetNodeSourceLinkDatum.target);
                                        const sourceNodeTemp = allNodeElements.find((nodeElement => nodeElement.data[0].key === targetNodeSourceLinkDatum.target));
                                        newTargetNodeSourceLinks.push(sourceNodeTemp.data[0].targetLinks);
                                    }
                                })), void (targetNodeSourceLinks = newTargetNodeSourceLinks);
                            }
                        }
                    } else if (linkDatum.target === nodeDatum.key && (highlightLinks.includes(null !== (_c = linkDatum.key) && void 0 !== _c ? _c : linkDatum.index) || highlightLinks.push(null !== (_d = linkDatum.key) && void 0 !== _d ? _d : linkDatum.index), 
                    !highlightNodes.includes(linkDatum.source))) {
                        highlightNodes.push(linkDatum.source);
                        let sourceNodeTargetLinks = allNodeElements.find((nodeElement => nodeElement.data[0].key === linkDatum.source)).data[0].targetLinks;
                        for (;(null == sourceNodeTargetLinks ? void 0 : sourceNodeTargetLinks.length) > 0; ) {
                            const newSourceNodeTargetLinks = [];
                            return sourceNodeTargetLinks.forEach((sourceNodeTargetLinkDatum => {
                                var _a, _b;
                                if (!highlightLinks.includes(null !== (_a = sourceNodeTargetLinkDatum.key) && void 0 !== _a ? _a : sourceNodeTargetLinkDatum.index) && (highlightLinks.push(null !== (_b = sourceNodeTargetLinkDatum.key) && void 0 !== _b ? _b : sourceNodeTargetLinkDatum.index), 
                                !highlightNodes.includes(sourceNodeTargetLinkDatum.source))) {
                                    highlightNodes.push(sourceNodeTargetLinkDatum.source);
                                    const sourceNodeTemp = allNodeElements.find((nodeElement => nodeElement.data[0].key === sourceNodeTargetLinkDatum.source));
                                    newSourceNodeTargetLinks.push(sourceNodeTemp.data[0].targetLinks);
                                }
                            })), void (sourceNodeTargetLinks = newSourceNodeTargetLinks);
                        }
                    }
                })), this._linkMark) {
                    const allLinkElements = this._linkMark.getProductElements();
                    if (!allLinkElements || !allLinkElements.length) return;
                    allLinkElements.forEach(((linkEl, i) => {
                        var _a;
                        highlightLinks.includes(null !== (_a = linkEl.getDatum().key) && void 0 !== _a ? _a : linkEl.getDatum().index) ? (linkEl.removeState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS_REVERSE), 
                        linkEl.addState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS)) : (linkEl.removeState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS), 
                        linkEl.addState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS_REVERSE));
                    }));
                }
                this._nodeMark && this._highLightElements(this._nodeMark.getProductElements(), highlightNodes);
            } else {
                const highlightNodes = [ nodeDatum.key ], upstreamLinks = nodeDatum.targetLinks.reduce(((res, link) => (array(link.datum).forEach((dividedLink => {
                    const parents = dividedLink.parents, len = parents.length;
                    for (let i = 0; i < len; i++) {
                        const source = parents[i].key, target = parents[i + 1] ? parents[i + 1].key : nodeDatum.key, value = dividedLink.value, existingItem = res.find((item => item.source === source && item.target === target));
                        existingItem ? existingItem.value += value : res.push({
                            source: source,
                            target: target,
                            value: value
                        });
                    }
                })), res)), []);
                allLinkElements.forEach(((linkEl, i) => {
                    const linkDatum = linkEl.getDatum(), originalDatum = linkDatum.datum, selectedDatum = originalDatum ? originalDatum.filter((entry => entry[father].some((par => par.key === nodeDatum.key)))) : null, upSelectedLink = upstreamLinks.find((upLink => upLink.source === linkDatum.source && upLink.target === linkDatum.target));
                    if (selectedDatum && selectedDatum.length) {
                        highlightNodes.includes(linkDatum.source) || highlightNodes.push(linkDatum.source), 
                        highlightNodes.includes(linkDatum.target) || highlightNodes.push(linkDatum.target);
                        const ratio = selectedDatum.reduce(((sum, d) => sum + d.value), 0) / linkDatum.value;
                        return linkEl.removeState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS_REVERSE), void linkEl.addState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS, {
                            ratio: ratio
                        });
                    }
                    if (upSelectedLink) return highlightNodes.includes(linkDatum.source) || highlightNodes.push(linkDatum.source), 
                    highlightNodes.includes(linkDatum.target) || highlightNodes.push(linkDatum.target), 
                    linkEl.removeState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS_REVERSE), void linkEl.addState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS, {
                        ratio: upSelectedLink.value / linkDatum.value
                    });
                    linkEl.removeState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS), linkEl.addState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS_REVERSE);
                })), this._nodeMark && this._highLightElements(this._nodeMark.getProductElements(), highlightNodes);
            }
            this._needClear = !0;
        }, this._handleLinkRelatedClick = element => {
            var _a;
            const allNodeElements = this._nodeMark.getProductElements();
            if (!allNodeElements || !allNodeElements.length) return;
            const allLinkElements = this._linkMark.getProductElements();
            if (!allLinkElements || !allLinkElements.length) return;
            if ("source" === ((null === (_a = element.getDatum()) || void 0 === _a ? void 0 : _a.parents) ? "parents" : "source")) {
                const states = [ STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS, STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS_REVERSE ];
                this._linkMark && allLinkElements.forEach((linkEl => {
                    linkEl.removeState(states);
                })), this._nodeMark && allNodeElements.forEach((el => {
                    el.removeState(states);
                }));
            } else {
                const curLinkDatum = element.getDatum(), highlightNodes = [ curLinkDatum.source, curLinkDatum.target ], upstreamLinks = [];
                array(curLinkDatum.datum).forEach((dividedLink => {
                    const parents = dividedLink.parents, len = parents.length;
                    for (let i = 0; i < len - 1; i++) {
                        const source = parents[i].key, target = parents[i + 1].key, value = dividedLink.value, existingItem = upstreamLinks.find((item => item.source === source && item.target === target));
                        upstreamLinks.push({
                            source: parents[i].key,
                            target: parents[i + 1].key,
                            value: dividedLink.value
                        }), existingItem ? existingItem.value += value : upstreamLinks.push({
                            source: source,
                            target: target,
                            value: value
                        });
                    }
                })), allLinkElements.forEach((linkEl => {
                    const linkDatum = linkEl.getDatum(), originalDatum = linkDatum.datum;
                    if (linkDatum.source === curLinkDatum.source && linkDatum.target === curLinkDatum.target) return linkEl.removeState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS_REVERSE), 
                    void linkEl.addState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS, {
                        ratio: 1
                    });
                    const selectedDatum = originalDatum ? originalDatum.filter((entry => {
                        const parentKeysList = entry.parents.map((item => item.key));
                        return parentKeysList.includes(curLinkDatum.source) && parentKeysList.includes(curLinkDatum.target);
                    })) : null;
                    if (selectedDatum && selectedDatum.length) {
                        highlightNodes.includes(linkDatum.source) || highlightNodes.push(linkDatum.source), 
                        highlightNodes.includes(linkDatum.target) || highlightNodes.push(linkDatum.target);
                        const val = selectedDatum.filter((entry => entry.parents.some(((par, index) => {
                            var _a;
                            return par.key === curLinkDatum.source && (null === (_a = entry.parents[index + 1]) || void 0 === _a ? void 0 : _a.key) === curLinkDatum.target;
                        })))).reduce(((sum, d) => sum + d.value), 0), ratio = val / linkDatum.value;
                        return linkEl.removeState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS_REVERSE), void linkEl.addState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS, {
                            ratio: ratio
                        });
                    }
                    const upSelectedLink = upstreamLinks.find((upLink => upLink.source === linkDatum.source && upLink.target === linkDatum.target));
                    if (upSelectedLink) return highlightNodes.includes(linkDatum.source) || highlightNodes.push(linkDatum.source), 
                    highlightNodes.includes(linkDatum.target) || highlightNodes.push(linkDatum.target), 
                    linkEl.removeState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS_REVERSE), void linkEl.addState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS, {
                        ratio: upSelectedLink.value / linkDatum.value
                    });
                    linkEl.removeState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS), linkEl.addState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS_REVERSE);
                })), this._highLightElements(allNodeElements, highlightNodes);
            }
            this._needClear = !0;
        };
    }
    get direction() {
        var _a;
        return null !== (_a = this._spec.direction) && void 0 !== _a ? _a : "horizontal";
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
        this.setSeriesField(null !== (_a = this._spec.seriesField) && void 0 !== _a ? _a : this._spec.categoryField);
    }
    initData() {
        var _a, _b, _c, _d;
        super.initData();
        const viewData = this.getViewData(), rawData = this.getRawData();
        if (rawData && viewData) {
            registerDataSetInstanceTransform(this._dataSet, "sankeyLayout", sankeyLayout), registerDataSetInstanceTransform(this._dataSet, "sankeyFormat", sankeyFormat), 
            rawData.transform({
                type: "sankeyFormat"
            }, !1), viewData.transform({
                type: "sankeyLayout",
                options: {
                    view: () => ({
                        x0: this._viewBox.x1,
                        x1: this._viewBox.x2,
                        y0: this._viewBox.y1,
                        y1: this._viewBox.y2
                    }),
                    sourceField: this._spec.sourceField,
                    targetField: this._spec.targetField,
                    valueField: this._spec.valueField,
                    direction: this.direction,
                    crossNodeAlign: this._spec.crossNodeAlign,
                    nodeAlign: null !== (_a = this._spec.nodeAlign) && void 0 !== _a ? _a : "justify",
                    nodeGap: null !== (_b = this._spec.nodeGap) && void 0 !== _b ? _b : 8,
                    nodeWidth: null !== (_c = this._spec.nodeWidth) && void 0 !== _c ? _c : 10,
                    linkWidth: this._spec.linkWidth,
                    minStepWidth: this._spec.minStepWidth,
                    minNodeHeight: null !== (_d = this._spec.minNodeHeight) && void 0 !== _d ? _d : 4,
                    maxNodeHeight: this._spec.maxNodeHeight,
                    minLinkHeight: this._spec.minLinkHeight,
                    maxLinkHeight: this._spec.maxLinkHeight,
                    iterations: this._spec.iterations,
                    nodeKey: this._spec.nodeKey,
                    linkSortBy: this._spec.linkSortBy,
                    nodeSortBy: this._spec.nodeSortBy,
                    setNodeLayer: this._spec.setNodeLayer,
                    dropIsolatedNode: this._spec.dropIsolatedNode,
                    nodeHeight: this._spec.nodeHeight,
                    linkHeight: this._spec.linkHeight,
                    equalNodeHeight: this._spec.equalNodeHeight,
                    linkOverlap: this._spec.linkOverlap,
                    inverse: this._spec.inverse
                },
                level: TransformLevel.sankeyLayout
            });
            const {dataSet: dataSet} = this._option;
            registerDataSetInstanceTransform(dataSet, "sankeyNodes", sankeyNodes), registerDataSetInstanceTransform(dataSet, "flatten", flatten);
            const nodesDataView = new DataView(dataSet, {
                name: `sankey-node-${this.id}-data`
            });
            nodesDataView.parse([ this.getViewData() ], {
                type: "dataview"
            }), nodesDataView.transform({
                type: "sankeyNodes"
            }), nodesDataView.transform({
                type: "flatten",
                options: {
                    callback: node => {
                        if (node.datum) {
                            const nodeData = node.datum[node.depth];
                            return Object.assign(Object.assign({}, node), nodeData);
                        }
                        return node;
                    }
                }
            }, !1), nodesDataView.transform({
                type: "addVChartProperty",
                options: {
                    beforeCall: initKeyMap.bind(this),
                    call: addDataKey
                }
            }, !1), this._nodesSeriesData = new SeriesData(this._option, nodesDataView), registerDataSetInstanceTransform(dataSet, "sankeyLinks", sankeyLinks);
            const linksDataView = new DataView(dataSet, {
                name: `sankey-link-${this.id}-data`
            });
            linksDataView.parse([ this.getViewData() ], {
                type: "dataview"
            }), linksDataView.transform({
                type: "sankeyLinks"
            }), linksDataView.transform({
                type: "addVChartProperty",
                options: {
                    beforeCall: initKeyMap.bind(this),
                    call: addDataKey
                }
            }, !1), this._linksSeriesData = new SeriesData(this._option, linksDataView);
        }
    }
    compileData() {
        var _a, _b;
        super.compileData(), null === (_a = this._linksSeriesData) || void 0 === _a || _a.compile(), 
        null === (_b = this._nodesSeriesData) || void 0 === _b || _b.compile();
    }
    initMark() {
        var _a, _b, _c, _d;
        this._rootMark.setMarkConfig({
            overflow: this._spec.overflow,
            interactive: !!this._spec.overflow
        });
        const nodeMark = this._createMark(SankeySeries.mark.node, {
            isSeriesMark: !0,
            dataView: this._nodesSeriesData.getDataView(),
            dataProductId: this._nodesSeriesData.getProductId(),
            stateSort: null === (_a = this._spec.node) || void 0 === _a ? void 0 : _a.stateSort
        }, {
            setCustomizedShape: null === (_b = this._spec.node) || void 0 === _b ? void 0 : _b.customShape
        });
        nodeMark && (nodeMark.setMarkConfig({
            zIndex: this._nodeLayoutZIndex
        }), this._nodeMark = nodeMark);
        const linkMark = this._createMark(SankeySeries.mark.link, {
            dataView: this._linksSeriesData.getDataView(),
            dataProductId: this._linksSeriesData.getProductId(),
            stateSort: null === (_c = this._spec.link) || void 0 === _c ? void 0 : _c.stateSort
        }, {
            setCustomizedShape: null === (_d = this._spec.link) || void 0 === _d ? void 0 : _d.customShape
        });
        linkMark && (this._linkMark = linkMark);
    }
    _buildMarkAttributeContext() {
        super._buildMarkAttributeContext(), this._markAttributeContext.valueToNode = this.valueToNode.bind(this), 
        this._markAttributeContext.valueToLink = this.valueToLink.bind(this);
    }
    valueToNode(value) {
        const nodes = this._nodesSeriesData.getLatestData(), specifyValue = array(value)[0];
        return nodes && nodes.find((node => node.key === specifyValue));
    }
    valueToLink(value) {
        const links = this._linksSeriesData.getLatestData(), specifyValue = array(value);
        return links && links.find((link => link && link.source === specifyValue[0] && link.target === specifyValue[1]));
    }
    valueToPositionX(value) {
        const node = this.valueToNode(value);
        return null == node ? void 0 : node.x0;
    }
    valueToPositionY(value) {
        const node = this.valueToNode(value);
        return null == node ? void 0 : node.y0;
    }
    initMarkStyle() {
        this._initNodeMarkStyle(), this._initLinkMarkStyle();
    }
    _initNodeMarkStyle() {
        var _a, _b;
        const nodeMark = this._nodeMark;
        nodeMark && (this.setMarkStyle(nodeMark, {
            x: datum => datum.x0,
            x1: datum => datum.x1,
            y: datum => datum.y0,
            y1: datum => datum.y1
        }, STATE_VALUE_ENUM.STATE_NORMAL, AttributeLevel.Mark), this.setMarkStyle(nodeMark, {
            fill: null !== (_b = null === (_a = this._spec.node.style) || void 0 === _a ? void 0 : _a.fill) && void 0 !== _b ? _b : this._fillByNode
        }, "normal", AttributeLevel.User_Mark));
    }
    _initLinkMarkStyle() {
        var _a, _b;
        const linkMark = this._linkMark;
        linkMark && (this.setMarkStyle(linkMark, {
            x0: datum => datum.x0,
            x1: datum => datum.x1,
            y0: datum => datum.y0,
            y1: datum => datum.y1,
            thickness: datum => datum.thickness,
            direction: this.direction
        }, STATE_VALUE_ENUM.STATE_NORMAL, AttributeLevel.Series), this.setMarkStyle(linkMark, {
            fill: null !== (_b = null === (_a = this._spec.link.style) || void 0 === _a ? void 0 : _a.fill) && void 0 !== _b ? _b : this._fillByLink
        }, "normal", AttributeLevel.User_Mark));
    }
    initLabelMarkStyle(labelMark, labelSpec) {
        if (!labelMark) return;
        const position = labelSpec.position;
        position && position.includes("inside") ? this.setMarkStyle(labelMark, {
            fill: "#ffffff",
            text: datum => this._createText(datum, labelSpec),
            maxLineWidth: datum => {
                var _a;
                return null !== (_a = labelSpec.limit) && void 0 !== _a ? _a : datum.x1 - datum.x0;
            }
        }) : this.setMarkStyle(labelMark, {
            fill: this._fillByNode,
            text: datum => this._createText(datum, labelSpec),
            maxLineWidth: labelSpec.limit
        }), labelMark.setMarkConfig({
            zIndex: this._labelLayoutZIndex
        });
    }
    _createText(datum, labelSpec) {
        if (isNil(datum) || isNil(datum.datum)) return "";
        let text = datum.datum[this._spec.categoryField] || "";
        const {formatMethod: formatMethod, formatter: formatter} = labelSpec || {}, {formatFunc: formatFunc, args: args} = getFormatFunction(formatMethod, formatter, text, datum.datum);
        return formatFunc && (text = formatFunc(...args, {
            series: this
        })), text;
    }
    initAnimation() {
        var _a, _b, _c, _d;
        const animationParams = {
            direction: this.direction,
            growFrom: () => {
                var _a, _b;
                return "horizontal" === this.direction ? null === (_a = this._xAxisHelper) || void 0 === _a ? void 0 : _a.getScale(0).scale(0) : null === (_b = this._yAxisHelper) || void 0 === _b ? void 0 : _b.getScale(0).scale(0);
            }
        }, appearPreset = null === (_b = null === (_a = this._spec) || void 0 === _a ? void 0 : _a.animationAppear) || void 0 === _b ? void 0 : _b.preset;
        this._nodeMark && this._nodeMark.setAnimationConfig(animationConfig(null === (_c = Factory.getAnimationInKey("sankeyNode")) || void 0 === _c ? void 0 : _c(animationParams, appearPreset), userAnimationConfig("node", this._spec, this._markAttributeContext))), 
        this._linkMark && this._linkMark.setAnimationConfig(animationConfig(null === (_d = Factory.getAnimationInKey("sankeyLinkPath")) || void 0 === _d ? void 0 : _d(animationParams, appearPreset), userAnimationConfig("link", this._spec, this._markAttributeContext)));
    }
    initEvent() {
        var _a, _b, _c;
        super.initEvent(), null === (_a = this._nodesSeriesData.getDataView()) || void 0 === _a || _a.target.addListener("change", this.nodesSeriesDataUpdate.bind(this)), 
        null === (_b = this._linksSeriesData.getDataView()) || void 0 === _b || _b.target.addListener("change", this.linksSeriesDataUpdate.bind(this));
        const emphasisSpec = null !== (_c = this._spec.emphasis) && void 0 !== _c ? _c : {};
        if (!0 !== this._option.disableTriggerEvent && emphasisSpec.enable && ("adjacency" === emphasisSpec.effect || "related" === emphasisSpec.effect)) {
            const event = "hover" === emphasisSpec.trigger ? "pointerover" : "pointerdown";
            this.event.on(event, {
                level: Event_Bubble_Level.chart
            }, this._handleEmphasisElement);
        }
    }
    nodesSeriesDataUpdate() {
        this._nodesSeriesData.updateData(), this._nodeList = null, this._setNodeOrdinalColorScale();
    }
    linksSeriesDataUpdate() {
        this._linksSeriesData.updateData();
    }
    _highLightElements(vGrammarElements, highlightNodes) {
        vGrammarElements && vGrammarElements.length && vGrammarElements.forEach((el => {
            el.removeState([ STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS_REVERSE, STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS ]), 
            highlightNodes.includes(el.getDatum().key) ? el.addState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS) : el.addState(STATE_VALUE_ENUM.STATE_SANKEY_EMPHASIS_REVERSE);
        }));
    }
    initTooltip() {
        this._tooltipHelper = new SankeySeriesTooltipHelper(this), this._nodeMark && this._tooltipHelper.activeTriggerSet.mark.add(this._nodeMark), 
        this._linkMark && this._tooltipHelper.activeTriggerSet.mark.add(this._linkMark);
    }
    _setNodeOrdinalColorScale() {
        var _a, _b, _c, _d, _e;
        const colorScale = null === (_b = null === (_a = this._option) || void 0 === _a ? void 0 : _a.globalScale) || void 0 === _b ? void 0 : _b.getScale("color");
        if (null == colorScale ? void 0 : colorScale._specified) return void (this._colorScale = colorScale);
        let colorDomain, colorRange;
        colorScale && (colorDomain = colorScale.domain(), colorRange = colorScale.range()), 
        colorRange || (colorRange = this._getDataScheme()), colorDomain && !isNil(colorDomain[0]) || (colorDomain = this.getNodeList(), 
        colorDomain.length > 10 && (colorRange = null === (_c = this._getDataScheme()[1]) || void 0 === _c ? void 0 : _c.scheme));
        const ordinalScale = new ColorOrdinalScale;
        null === (_e = (_d = ordinalScale.domain(colorDomain)).range) || void 0 === _e || _e.call(_d, colorRange), 
        this._colorScale = ordinalScale;
    }
    getNodeList() {
        var _a, _b;
        if (this._nodeList) return this._nodeList;
        const data = this._rawData.latestData[0], nodeList = (null == data ? void 0 : data.nodes) ? (null === (_a = data.nodes[0]) || void 0 === _a ? void 0 : _a.children) ? Array.from(this.extractNamesFromTree(data.nodes, this._spec.categoryField)) : data.nodes.map(((datum, index) => datum[this._spec.categoryField])) : (null == data ? void 0 : data.links) ? Array.from(this.extractNamesFromLink(data.links)) : null === (_b = null == data ? void 0 : data.values) || void 0 === _b ? void 0 : _b.map(((datum, index) => datum[this._spec.categoryField]));
        return this._nodeList = nodeList, nodeList;
    }
    _getNodeNameFromData(datum) {
        var _a;
        return (null == datum ? void 0 : datum.datum) ? datum.datum[this._spec.categoryField] : null !== (_a = datum.key) && void 0 !== _a ? _a : datum[this._spec.categoryField];
    }
    extractNamesFromTree(tree, categoryName) {
        const uniqueNames = new Set;
        return tree.forEach((node => {
            if (uniqueNames.add(node[categoryName]), node.children) {
                this.extractNamesFromTree(node.children, categoryName).forEach((name => uniqueNames.add(name)));
            }
        })), uniqueNames;
    }
    extractNamesFromLink(links) {
        const uniqueNames = new Set, {sourceField: sourceField, targetField: targetField} = this._spec;
        return links.forEach((link => {
            isValid(link[sourceField]) && uniqueNames.add(link[sourceField]), isValid(link[targetField]) && uniqueNames.add(link[targetField]);
        })), uniqueNames;
    }
    getDimensionField() {
        return [ this._spec.categoryField ];
    }
    getMeasureField() {
        return [ this._valueField ];
    }
    getRawDataStatisticsByField(field, isNumeric) {
        var _a;
        if (this._rawStatisticsCache || (this._rawStatisticsCache = {}), !this._rawStatisticsCache[field]) {
            this._viewDataStatistics && this.getViewData().transformsArr.length <= 1 && (null === (_a = this._viewDataStatistics.latestData) || void 0 === _a ? void 0 : _a[field]) ? this._rawStatisticsCache[field] = this._viewDataStatistics.latestData[field] : this._rawData && (this._rawStatisticsCache[field] = {
                values: this._collectByField(field)
            });
        }
        return this._rawStatisticsCache[field];
    }
    _collectByField(field) {
        var _a, _b, _c;
        const keyArray = [], rawData = null === (_b = null === (_a = this.getRawData()) || void 0 === _a ? void 0 : _a.latestData) || void 0 === _b ? void 0 : _b[0];
        if (!rawData) return [];
        if (rawData.links) (null === (_c = rawData.nodes) || void 0 === _c ? void 0 : _c.length) && rawData.nodes.forEach((node => {
            node[this._seriesField] && keyArray.push(node[this._seriesField]);
        })); else if (rawData.nodes) {
            const set = new Set;
            return collectHierarchyField(set, rawData.nodes, this._seriesField), Array.from(set);
        }
        return keyArray;
    }
    onLayoutEnd(ctx) {
        super.onLayoutEnd(ctx), this._viewBox.set(0, 0, this._region.getLayoutRect().width, this._region.getLayoutRect().height), 
        this.getViewData().reRunAllTransform();
    }
    getDefaultShapeType() {
        return "square";
    }
    _noAnimationDataKey(datum, index) {}
    getActiveMarks() {
        return [ this._nodeMark, this._linkMark ];
    }
    getMarkData(datum) {
        return datum.datum ? isArray(datum.datum) ? datum.datum[datum.datum.length - 1] : datum.datum : datum;
    }
}

SankeySeries.type = SeriesTypeEnum.sankey, SankeySeries.transformerConstructor = SankeySeriesSpecTransformer, 
SankeySeries.mark = sankeySeriesMark;

export const registerSankeySeries = () => {
    registerSankeyTransforms(), registerRectMark(), registerLinkPathMark(), registerTextMark(), 
    registerSankeyAnimation(), registerFadeInOutAnimation(), Factory.registerSeries(SankeySeries.type, SankeySeries);
};
//# sourceMappingURL=sankey.js.map
