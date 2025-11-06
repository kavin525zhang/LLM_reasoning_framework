"use strict";

var __rest = this && this.__rest || function(s, e) {
    var t = {};
    for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0 && (t[p] = s[p]);
    if (null != s && "function" == typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (p = Object.getOwnPropertySymbols(s); i < p.length; i++) e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]) && (t[p[i]] = s[p[i]]);
    }
    return t;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.CartesianAxis = void 0;

const vutils_1 = require("@visactor/vutils"), vutils_extension_1 = require("@visactor/vutils-extension"), util_1 = require("../../../util"), vscale_1 = require("@visactor/vscale"), factory_1 = require("../../../core/factory"), common_1 = require("./util/common"), event_1 = require("../../../constant/event"), layout_1 = require("../../../constant/layout"), axis_sync_1 = require("../../../plugin/components/axis-sync/axis-sync"), type_1 = require("../../interface/type"), vgrammar_core_1 = require("@visactor/vgrammar-core"), util_2 = require("../util"), base_axis_1 = require("../base-axis"), vrender_core_1 = require("@visactor/vrender-core"), CartesianAxisPlugin = [ axis_sync_1.AxisSyncPlugin ];

class CartesianAxis extends base_axis_1.AxisComponent {
    getOrient() {
        return this._orient;
    }
    getDefaultInteractive() {
        return !0;
    }
    set autoIndentOnce(v) {
        this._autoIndentOnce = v;
    }
    getScales() {
        return this._scales;
    }
    constructor(spec, options) {
        super(spec, options), this.type = type_1.ComponentTypeEnum.cartesianAxis, this.name = type_1.ComponentTypeEnum.cartesianAxis, 
        this._defaultBandPosition = .5, this._defaultBandInnerPadding = .1, this._defaultBandOuterPadding = .3, 
        this.layoutType = "region-relative", this.layoutZIndex = layout_1.LayoutZIndex.Axis, 
        this.layoutLevel = layout_1.LayoutLevel.Axis, this._orient = "left", this._autoIndentOnce = !1, 
        this._hasAutoIndent = !1, this._scales = [], this._tick = void 0, this._layoutCache = {
            width: 0,
            height: 0,
            _lastComputeOutBounds: {
                x1: 0,
                x2: 0,
                y1: 0,
                y2: 0
            }
        }, this._innerOffset = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }, this.effect = {
            scaleUpdate: params => {
                this.computeData(null == params ? void 0 : params.value), (0, util_1.eachSeries)(this._regions, (s => {
                    const orient = this.getOrient();
                    (0, common_1.isXAxis)(orient) ? (0, util_2.shouldUpdateAxis)(s.getXAxisHelper(), this.axisHelper(), (0, 
                    util_1.isValid)(this._seriesUserId) || (0, util_1.isValid)(this._seriesIndex)) && s.setXAxisHelper(this.axisHelper()) : (0, 
                    common_1.isYAxis)(orient) ? (0, util_2.shouldUpdateAxis)(s.getYAxisHelper(), this.axisHelper(), (0, 
                    util_1.isValid)(this._seriesUserId) || (0, util_1.isValid)(this._seriesIndex)) && s.setYAxisHelper(this.axisHelper()) : (0, 
                    common_1.isZAxis)(orient) && (0, util_2.shouldUpdateAxis)(s.getZAxisHelper(), this.axisHelper(), (0, 
                    util_1.isValid)(this._seriesUserId) || (0, util_1.isValid)(this._seriesIndex)) && s.setZAxisHelper(this.axisHelper());
                }), {
                    userId: this._seriesUserId,
                    specIndex: this._seriesIndex
                });
            }
        }, this._transformLayoutPosition = pos => {
            let {x: x, y: y} = pos;
            return (0, util_1.isValidNumber)(x) && (x += Number("left" === this._orient) * this.getLayoutRect().width), 
            (0, util_1.isValidNumber)(y) && (y += Number("top" === this._orient) * this.getLayoutRect().height), 
            {
                x: x,
                y: y
            };
        }, this._transformLayoutRect = result => {
            if (!this._visible) return result;
            const bounds = this._latestBounds.clone().translate(-this.getLayoutStartPoint().x, -this.getLayoutStartPoint().y);
            switch (this._layout.layoutOrient) {
              case "left":
                this._layout.layoutRectLevelMap.width === layout_1.DEFAULT_LAYOUT_RECT_LEVEL && (result.width = bounds.x1 < 0 ? -bounds.x1 : 0);
                break;

              case "right":
                this._layout.layoutRectLevelMap.width === layout_1.DEFAULT_LAYOUT_RECT_LEVEL && (result.width = bounds.x2 > 0 ? bounds.x2 : 0);
                break;

              case "top":
                this._layout.layoutRectLevelMap.height === layout_1.DEFAULT_LAYOUT_RECT_LEVEL && (result.height = bounds.y1 < 0 ? -bounds.y1 : 0);
                break;

              case "bottom":
                this._layout.layoutRectLevelMap.height === layout_1.DEFAULT_LAYOUT_RECT_LEVEL && (result.height = bounds.y2 > 0 ? bounds.y2 : 0);
            }
            return result.width = Math.ceil(result.width), result.height = Math.ceil(result.height), 
            this._layout.setRectInSpec(this._layoutCacheProcessing(result));
        }, this._updateAxisLayout = () => {
            const startPoint = this.getLayoutStartPoint(), _a = this._getUpdateAttribute(!1), {grid: updateGridAttrs} = _a, updateAxisAttrs = __rest(_a, [ "grid" ]), axisProduct = this._axisMark.getProduct(), axisAttrs = (0, 
            vutils_extension_1.mergeSpec)({
                x: startPoint.x,
                y: startPoint.y
            }, this._axisStyle, updateAxisAttrs);
            if (axisProduct.encode(axisAttrs), this._gridMark) {
                this._gridMark.getProduct().encode((0, vutils_extension_1.mergeSpec)({
                    x: startPoint.x,
                    y: startPoint.y
                }, this._getGridAttributes(), updateGridAttrs));
            }
        }, this._fixAxisOnZero = () => {
            const {onZero: onZero, visible: visible} = this._spec.domainLine;
            if (this.visible && onZero && !1 !== visible) {
                const {onZeroAxisId: onZeroAxisId, onZeroAxisIndex: onZeroAxisIndex} = this._spec.domainLine, axesComponents = this._option.getComponentsByKey("axes"), isX = (0, 
                common_1.isXAxis)(this.getOrient()), isValidAxis = item => {
                    var _a;
                    return (isX ? !(0, common_1.isXAxis)(item.getOrient()) : (0, common_1.isXAxis)(item.getOrient())) && (0, 
                    vscale_1.isContinuous)(item.getScale().type) && (item.getTickData() ? null === (_a = item.getTickData().getLatestData()) || void 0 === _a ? void 0 : _a.find((d => 0 === d.value)) : item.getScale().domain()[0] <= 0 && (0, 
                    vutils_1.last)(item.getScale().domain()) >= 0);
                }, relativeAxes = axesComponents.filter((item => isValidAxis(item)));
                if (relativeAxes.length) {
                    let bindAxis;
                    if ((0, util_1.isValid)(onZeroAxisId)) bindAxis = relativeAxes.find((axis => axis.id === onZeroAxisId)); else if ((0, 
                    util_1.isValid)(onZeroAxisIndex)) {
                        const indexAxis = axesComponents[onZeroAxisIndex];
                        isValidAxis(indexAxis) && (bindAxis = indexAxis);
                    } else bindAxis = relativeAxes[0];
                    if (bindAxis) {
                        const axisMark = this._axisMark.getProduct(), position = bindAxis.valueToPosition(0);
                        isX ? axisMark.encode({
                            line: Object.assign(Object.assign({}, this._axisStyle.line), {
                                dy: "bottom" === this._orient ? -((bindAxis.getInverse() ? bindAxis.getScale().range()[1] : bindAxis.getScale().range()[0]) - position) : position
                            })
                        }) : axisMark.encode({
                            line: Object.assign(Object.assign({}, this._axisStyle.line), {
                                dx: "left" === this._orient ? position : -((bindAxis.getInverse() ? bindAxis.getScale().range()[0] : bindAxis.getScale().range()[1]) - position)
                            })
                        });
                    }
                }
            }
        }, this._orient = (0, common_1.getOrient)(spec, [ "z" ]), (0, common_1.isZAxis)(this._orient) && (this.layoutType = "absolute"), 
        this._dataSet = options.dataSet, this._coordinateType = "cartesian";
    }
    static getSpecInfo(chartSpec) {
        const axesSpec = chartSpec[this.specKey];
        if (!axesSpec) return null;
        const isHorizontal = "horizontal" === chartSpec.direction;
        if (!(0, util_1.isArray)(axesSpec)) {
            if (!(0, util_2.isValidCartesianAxis)(axesSpec)) return null;
            const {axisType: axisType, componentName: componentName} = (0, common_1.getCartesianAxisInfo)(axesSpec, isHorizontal);
            return axesSpec.type = axisType, [ {
                spec: axesSpec,
                specPath: [ this.specKey ],
                specInfoPath: [ "component", this.specKey, 0 ],
                type: componentName
            } ];
        }
        let valid = !0;
        if (axesSpec.filter((s => "z" === s.orient))[0]) {
            const xAxis = axesSpec.filter((s => "bottom" === s.orient))[0], yAxis = axesSpec.filter((s => (0, 
            common_1.isYAxis)(s.orient)))[0];
            valid = 3 === axesSpec.length && xAxis && yAxis;
        }
        let axesSpecList = axesSpec.map(((spec, index) => ({
            spec: spec,
            index: index
        })));
        valid || (axesSpecList = axesSpecList.filter((({spec: spec}) => "z" !== spec.orient)));
        const specInfos = [];
        return axesSpecList.forEach((({spec: spec, index: index}) => {
            if (!(0, util_2.isValidCartesianAxis)(spec)) return;
            const {axisType: axisType, componentName: componentName} = (0, common_1.getCartesianAxisInfo)(spec, isHorizontal);
            spec.type = axisType, specInfos.push({
                spec: spec,
                specPath: [ this.specKey, index ],
                specInfoPath: [ "component", this.specKey, index ],
                type: componentName
            });
        })), specInfos;
    }
    static createComponent(specInfo, options) {
        const {spec: spec} = specInfo, others = __rest(specInfo, [ "spec" ]), C = factory_1.Factory.getComponentInKey(others.type);
        return C ? new C(spec, Object.assign(Object.assign({}, options), others)) : (options.onError(`Component ${others.type} not found`), 
        null);
    }
    initLayout() {
        super.initLayout(), this._layout.autoIndent = !1 !== this._spec.autoIndent, this._layout.layoutOrient = this._orient;
    }
    setLayout3dBox(box3d) {
        this.layout3dBox = box3d;
    }
    getNewScaleRange() {
        const {width: width, height: height} = this.getLayoutRect(), {left: left, right: right, top: top, bottom: bottom} = this._innerOffset;
        let newRange = [];
        return (0, common_1.isXAxis)(this.getOrient()) ? (0, util_1.isValidNumber)(width) && (newRange = this._inverse ? [ width - right, left ] : [ left, width - right ]) : (0, 
        common_1.isZAxis)(this.getOrient()) ? (0, util_1.isValidNumber)(width) && (newRange = this._inverse ? [ width - right, left ] : [ left, width - right ], 
        this._scale.range(newRange)) : (0, util_1.isValidNumber)(height) && (newRange = this._inverse ? [ top, height - bottom ] : [ height - bottom, top ]), 
        newRange;
    }
    updateScaleRange() {
        let isScaleChange = !1;
        const newRange = this.getNewScaleRange(), range = this._scale.range();
        return newRange.length === range.length && newRange.every(((value, index) => value === range[index])) ? isScaleChange = !1 : (isScaleChange = !0, 
        this._scale.range(newRange)), isScaleChange;
    }
    init(option) {
        var _a;
        super.init(option), null === (_a = this.pluginService) || void 0 === _a || _a.load(CartesianAxisPlugin.map((P => new P))), 
        this.callPlugin((plugin => {
            this.pluginService && plugin.onInit && plugin.onInit(this.pluginService, this);
        }));
    }
    setAttrFromSpec() {
        var _a;
        if (super.setAttrFromSpec(), this.visible) {
            (0, common_1.isXAxis)(this.getOrient()) ? (0, util_1.isUndefined)(this._spec.maxHeight) && (this._spec.maxHeight = "30%") : (0, 
            util_1.isUndefined)(this._spec.maxWidth) && (this._spec.maxWidth = "30%");
            const axisStyle = this._getAxisAttributes();
            axisStyle.label.formatMethod = this._getLabelFormatMethod(), axisStyle.verticalFactor = "top" === this.getOrient() || "right" === this.getOrient() ? -1 : 1, 
            this._axisStyle = axisStyle;
        }
        this._tick = this._spec.tick;
        const chartSpec = null === (_a = this._option.getChart()) || void 0 === _a ? void 0 : _a.getSpec();
        this._inverse = (0, common_1.transformInverse)(this._spec, "horizontal" === (null == chartSpec ? void 0 : chartSpec.direction));
    }
    onLayoutStart(layoutRect, viewRect, ctx) {
        if (super.onLayoutStart(layoutRect, viewRect, ctx), !(0, common_1.isZAxis)(this.getOrient()) && this._spec.innerOffset) {
            const spec = this._spec;
            (0, common_1.isYAxis)(this.getOrient()) ? [ "top", "bottom" ].forEach((orient => {
                this._innerOffset[orient] = (0, util_1.calcLayoutNumber)(spec.innerOffset[orient], viewRect.height, viewRect);
            })) : [ "left", "right" ].forEach((orient => {
                this._innerOffset[orient] = (0, util_1.calcLayoutNumber)(spec.innerOffset[orient], viewRect.width, viewRect);
            }));
        }
    }
    getSeriesStatisticsField(s) {
        let f;
        return f = (0, common_1.isXAxis)(this.getOrient()) ? s.fieldX : (0, common_1.isZAxis)(this.getOrient()) ? s.fieldZ : s.fieldY, 
        (0, vscale_1.isContinuous)(this._scale.type) ? f : [ f[0] ];
    }
    _tickTransformOption() {
        var _a, _b, _c, _d;
        return Object.assign(Object.assign({}, super._tickTransformOption()), {
            noDecimals: null === (_a = this._tick) || void 0 === _a ? void 0 : _a.noDecimals,
            labelLastVisible: null === (_b = this._spec.label) || void 0 === _b ? void 0 : _b.lastVisible,
            labelFirstVisible: null === (_c = this._spec.label) || void 0 === _c ? void 0 : _c.firstVisible,
            labelFlush: null === (_d = this._spec.label) || void 0 === _d ? void 0 : _d.flush
        });
    }
    axisHelper() {
        return {
            isContinuous: (0, vscale_1.isContinuous)(this._scale.type),
            dataToPosition: this.dataToPosition.bind(this),
            getScale: (depth = 0) => this._scales[depth],
            getAxisType: () => this.type,
            getAxisId: () => this.id,
            isInverse: () => !0 === this._inverse,
            getSpec: () => this._spec
        };
    }
    afterCompile() {
        var _a;
        const product = null === (_a = this._axisMark) || void 0 === _a ? void 0 : _a.getProduct();
        product && product.addEventListener(vgrammar_core_1.HOOK_EVENT.AFTER_ELEMENT_ENCODE, (() => {
            if (!1 === this._isLayout && ((0, common_1.isXAxis)(this.getOrient()) ? this.callPlugin((plugin => {
                this.pluginService && plugin.onDidLayoutHorizontal && plugin.onDidLayoutHorizontal(this.pluginService, this);
            })) : this.callPlugin((plugin => {
                this.pluginService && plugin.onDidLayoutVertical && plugin.onDidLayoutVertical(this.pluginService, this);
            })), this._unitText)) {
                const {x: x, y: y} = this.getLayoutStartPoint(), pos = (0, common_1.isXAxis)(this._orient) ? {
                    x: (0, util_1.maxInArr)(this._scale.range()) + x,
                    y: y
                } : {
                    x: x,
                    y: (0, util_1.minInArr)(this._scale.range()) + y
                };
                this._unitText.setAttributes(pos);
            }
        })), this.callPlugin((plugin => {
            this.pluginService && plugin.onDidCompile && plugin.onDidCompile(this.pluginService, this);
        }));
    }
    onRender(ctx) {}
    changeRegions(regions) {}
    update(ctx) {}
    resize(ctx) {}
    collectScale() {
        const scales = [];
        return (0, util_1.eachSeries)(this._regions, (s => {
            scales.push("left" === this.getOrient() || "right" === this.getOrient() ? s.scaleY : s.scaleX);
        }), {
            userId: this._seriesUserId,
            specIndex: this._seriesIndex
        }), scales;
    }
    collectSeriesField(depth, series) {
        var _a, _b;
        let field;
        return field = depth > 0 ? null === (_b = null === (_a = series.getGroups()) || void 0 === _a ? void 0 : _a.fields) || void 0 === _b ? void 0 : _b[depth] : (0, 
        common_1.isXAxis)(this.getOrient()) ? series.getSpec().x2Field ? [ ...series.fieldX, series.fieldX2 ] : series.fieldX : (0, 
        common_1.isZAxis)(this.getOrient()) ? series.fieldZ : series.getSpec().y2Field ? [ ...series.fieldY, series.fieldY2 ] : series.fieldY, 
        field;
    }
    updateSeriesScale() {
        const orient = this.getOrient();
        (0, util_1.eachSeries)(this._regions, (s => {
            (0, common_1.isXAxis)(orient) ? (0, util_2.shouldUpdateAxis)(s.getXAxisHelper(), this.axisHelper(), (0, 
            util_1.isValid)(this._seriesUserId) || (0, util_1.isValid)(this._seriesIndex)) && (s.setScaleX(this._scale), 
            s.setXAxisHelper(this.axisHelper())) : (0, common_1.isYAxis)(orient) ? (0, util_2.shouldUpdateAxis)(s.getYAxisHelper(), this.axisHelper(), (0, 
            util_1.isValid)(this._seriesUserId) || (0, util_1.isValid)(this._seriesIndex)) && (s.setScaleY(this._scale), 
            s.setYAxisHelper(this.axisHelper())) : (0, common_1.isZAxis)(orient) && (0, util_2.shouldUpdateAxis)(s.getZAxisHelper(), this.axisHelper(), (0, 
            util_1.isValid)(this._seriesUserId) || (0, util_1.isValid)(this._seriesIndex)) && (s.setScaleZ(this._scale), 
            s.setZAxisHelper(this.axisHelper()));
        }), {
            userId: this._seriesUserId,
            specIndex: this._seriesIndex
        });
    }
    getBoundsInRect(rect) {
        var _a;
        let result = {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0
        };
        if (!this._visible) return result;
        this._verticalLimitSize = (0, common_1.isXAxis)(this.getOrient()) ? rect.height : rect.width, 
        this.setLayoutRect(rect);
        !this.updateScaleRange() && (0, util_1.isArray)(null === (_a = this.getTickData()) || void 0 === _a ? void 0 : _a.getLatestData()) || this.computeData("range");
        const context = {
            skipLayout: !1
        }, isX = (0, common_1.isXAxis)(this.getOrient());
        this.pluginService && (isX ? this.callPlugin((plugin => {
            plugin.onWillLayoutHorizontal && plugin.onWillLayoutHorizontal(this.pluginService, context, this);
        })) : this.callPlugin((plugin => {
            plugin.onWillLayoutVertical && plugin.onWillLayoutVertical(this.pluginService, context, this);
        })));
        const product = this._axisMark.getProduct();
        let hasBounds = !1;
        if (!context.skipLayout) {
            const attrs = this._getUpdateAttribute(!0), axisComponent = product.getGroupGraphicItem(), spec = (0, 
            vutils_extension_1.mergeSpec)(Object.assign({}, this.getLayoutStartPoint()), this._axisStyle, attrs, {
                line: {
                    visible: !1
                }
            });
            let updateBounds = axisComponent.getBoundsWithoutRender(spec);
            updateBounds.empty() && (updateBounds = (new vutils_1.Bounds).set(spec.x, spec.y, spec.x, spec.y)), 
            hasBounds = !0, this._latestBounds = updateBounds, result = this._appendAxisUnit(updateBounds, isX);
        }
        return hasBounds || (this._latestBounds = product.getBounds()), result;
    }
    positionToData(pos, isViewPos) {
        const isX = (0, common_1.isXAxis)(this.getOrient());
        isViewPos && (pos -= isX ? this.getLayoutStartPoint().x : this.getLayoutStartPoint().y), 
        this._innerOffset && (pos = isX ? (0, util_1.clamp)(pos, this._innerOffset.left, this.getLayoutRect().width - this._innerOffset.right) : (0, 
        util_1.clamp)(pos, this._innerOffset.top, this.getLayoutRect().height - this._innerOffset.bottom));
        const range = this._scale.range();
        return (pos - range[0]) * (pos - (0, vutils_1.last)(range)) > 0 ? null : this._scale.invert(pos);
    }
    _getTitleLimit(isX) {
        var _a, _b, _c, _d, _e;
        const titleSpec = this._spec.title;
        if (titleSpec.visible && (0, util_1.isNil)(null === (_a = titleSpec.style) || void 0 === _a ? void 0 : _a.maxLineWidth)) {
            const angle = null !== (_e = null !== (_c = null === (_b = this._axisStyle.title) || void 0 === _b ? void 0 : _b.angle) && void 0 !== _c ? _c : null === (_d = titleSpec.style) || void 0 === _d ? void 0 : _d.angle) && void 0 !== _e ? _e : 0;
            if (isX) {
                const width = this.getLayoutRect().width, cosValue = Math.abs(Math.cos(angle));
                return cosValue < 1e-6 ? 1 / 0 : width / cosValue;
            }
            const height = this.getLayoutRect().height, sinValue = Math.abs(Math.sin(angle));
            return sinValue < 1e-6 ? 1 / 0 : height / sinValue;
        }
        return null;
    }
    _getUpdateAttribute(ignoreGrid) {
        var _a;
        let regionHeight = 0, regionWidth = 0;
        if (!ignoreGrid) {
            const regions = this.getRegions();
            let {x: minX, y: minY} = regions[0].getLayoutStartPoint(), maxX = minX + regions[0].getLayoutRect().width, maxY = minY + regions[0].getLayoutRect().height;
            for (let index = 1; index < regions.length; index++) {
                const region = regions[index], {x: x, y: y} = region.getLayoutStartPoint(), {width: width, height: height} = region.getLayoutRect();
                minX = Math.min(minX, x), maxX = Math.max(maxX, width + x), minY = Math.min(minY, y), 
                maxY = Math.max(maxY, height + y);
            }
            regionHeight = Math.abs(maxY - minY), regionWidth = Math.abs(maxX - minX);
        }
        const {width: width, height: height} = this.getLayoutRect(), isX = (0, common_1.isXAxis)(this._orient), isY = (0, 
        common_1.isYAxis)(this._orient), isZ = (0, common_1.isZAxis)(this._orient), depth = this.layout3dBox ? this.layout3dBox.length : 0;
        let end = {
            x: 0,
            y: 0
        }, gridLength = regionHeight, axisLength = width;
        isX ? end = {
            x: width,
            y: 0
        } : isY ? (end = {
            x: 0,
            y: height
        }, gridLength = regionWidth, axisLength = height) : isZ && (end = {
            x: depth,
            y: 0
        });
        const items = this.getLabelItems(axisLength), attrs = {
            start: {
                x: 0,
                y: 0
            },
            end: end,
            title: {
                text: this._spec.title.text || this._dataFieldText,
                maxWidth: this._getTitleLimit(isX)
            },
            items: items
        };
        if (ignoreGrid || (attrs.grid = {
            type: "line",
            start: {
                x: 0,
                y: 0
            },
            end: end,
            items: items[0],
            verticalFactor: this._axisStyle.verticalFactor,
            depth: depth,
            length: gridLength
        }), isZ) {
            const directionStr = null !== (_a = this.directionStr) && void 0 !== _a ? _a : "r2l", depthZ = this.layout3dBox ? this.layout3dBox.width : 0;
            let anchor3d = [ 0, 0 ], alpha = -Math.PI / 2, z = 0;
            "l2r" === directionStr && (z = this.layout3dBox.length, anchor3d = [ 0, 0, 0 ], 
            alpha = Math.PI / 2), attrs.z = z, attrs.alpha = alpha, attrs.anchor3d = anchor3d, 
            ignoreGrid || (attrs.grid.depth = depthZ);
        } else {
            let verticalMinSize = isX ? this.layout.minHeight : this.layout.minWidth;
            (isX && this._layout.layoutRectLevelMap.height === layout_1.USER_LAYOUT_RECT_LEVEL || isY && this._layout.layoutRectLevelMap.width === layout_1.USER_LAYOUT_RECT_LEVEL) && (verticalMinSize = this._verticalLimitSize), 
            attrs.verticalLimitSize = this._verticalLimitSize, attrs.verticalMinSize = verticalMinSize, 
            attrs.label = {
                overflowLimitLength: this._getLabelOverflowLimit(isX)
            };
        }
        return attrs;
    }
    getLabelItems(length) {
        var _a;
        const tickLatestData = null === (_a = this.getTickData()) || void 0 === _a ? void 0 : _a.getLatestData();
        return tickLatestData && tickLatestData.length ? [ tickLatestData.map((obj => {
            const normalizedValue = this._getNormalizedValue([ obj.value ], length);
            return (0, util_2.getAxisItem)(obj.value, normalizedValue);
        })).filter((entry => {
            const {value: value, rawValue: rawValue} = entry, domain = this._scale.domain();
            return "log" === this.getSpec().type ? value >= 0 && value <= 1 : (0, vscale_1.isContinuous)(this._scale.type) ? rawValue >= domain[0] && rawValue <= (0, 
            vutils_1.last)(domain) : domain.includes(rawValue);
        })) ] : [];
    }
    initEvent() {
        super.initEvent(), this.visible && (this.event.on(event_1.ChartEvent.layoutEnd, this._updateAxisLayout), 
        this.event.on(event_1.ChartEvent.layoutEnd, this._fixAxisOnZero), this.event.on(event_1.ChartEvent.layoutRectUpdate, (() => {
            this._clearLayoutCache();
        })));
    }
    _getNormalizedValue(values, length) {
        return 0 === length ? 0 : this.dataToPosition(values) / length;
    }
    _layoutCacheProcessing(rect) {
        return [ "width", "height" ].forEach((key => {
            rect[key] < this._layoutCache[key] ? rect[key] = this._layoutCache[key] : this._layoutCache[key] = rect[key];
        })), this._autoIndentOnce && this._hasAutoIndent ? [ "x1", "x2", "y1", "y2" ].forEach((key => {
            this.layout.getLastComputeOutBounds()[key] = this._layoutCache._lastComputeOutBounds[key];
        })) : (this._hasAutoIndent = !0, [ "x1", "x2", "y1", "y2" ].forEach((key => {
            this.layout.getLastComputeOutBounds()[key] < this._layoutCache._lastComputeOutBounds[key] ? this.layout.getLastComputeOutBounds()[key] = this._layoutCache._lastComputeOutBounds[key] : this._layoutCache._lastComputeOutBounds[key] = this.layout.getLastComputeOutBounds()[key];
        }))), rect;
    }
    _clearLayoutCache() {
        this._hasAutoIndent = !1, this._layoutCache.width = 0, this._layoutCache.height = 0, 
        this._layoutCache._lastComputeOutBounds = {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 0
        };
    }
    onDataUpdate() {
        this._clearLayoutCache();
    }
    _appendAxisUnit(bounds, isX) {
        var _a;
        if (this._spec.unit && this._spec.unit.visible) {
            const {text: text, style: style} = this._spec.unit;
            let pos, unitTextStyle;
            const {x: x, y: y} = this.getLayoutStartPoint();
            isX ? (pos = {
                x: (0, util_1.maxInArr)(this._scale.range()) + x,
                y: y
            }, unitTextStyle = {
                textAlign: "left",
                textBaseline: "middle"
            }) : (pos = {
                x: x,
                y: (0, util_1.minInArr)(this._scale.range()) + y
            }, unitTextStyle = {
                textAlign: "left" === this._orient ? "left" : "right",
                textBaseline: "bottom"
            }), unitTextStyle = Object.assign(Object.assign(Object.assign({}, unitTextStyle), style), {
                x: pos.x,
                y: pos.y,
                text: text
            }), this._unitText ? this._unitText.setAttributes(unitTextStyle) : (this._unitText = (0, 
            vrender_core_1.createText)(unitTextStyle), this._unitText.name = "axis-unit", null === (_a = this.getContainer()) || void 0 === _a || _a.add(this._unitText));
            const textBounds = this._unitText.AABBBounds;
            isX ? (bounds.x2 += textBounds.x2 > bounds.x2 ? textBounds.x2 - bounds.x2 : 0, bounds.y2 += textBounds.y2 > bounds.y2 ? textBounds.y2 - bounds.y2 : 0) : (bounds.x1 += textBounds.x1 < bounds.x1 ? textBounds.x1 - bounds.x1 : 0, 
            bounds.y1 += textBounds.y1 < bounds.y1 ? textBounds.y1 - bounds.y1 : 0);
        }
        return bounds;
    }
    _getNeedClearVRenderComponents() {
        return this._unitText ? [ this._unitText ] : [];
    }
    _getLabelOverflowLimit(isX) {
        var _a, _b;
        if (isX && !1 !== (null === (_a = this._spec.label) || void 0 === _a ? void 0 : _a.visible) && !0 === (null === (_b = this._spec.label) || void 0 === _b ? void 0 : _b.autoLimit)) {
            const axesComponents = this._option.getComponentsByKey("axes"), relativeRegions = this.getRegions(), relativeAxes = axesComponents.filter((item => {
                const orient = item.getOrient();
                return ("left" === orient || "right" === orient) && item.getRegions().some((region => relativeRegions.includes(region)));
            }));
            let leftLimitLength = 0, rightLimitLength = 0;
            const startX = this.getLayoutStartPoint().x, endX = startX + this.getLayoutRect().width;
            return relativeAxes.forEach((axis => {
                const relativeStartX = axis.getLayoutStartPoint().x;
                if ("left" === axis.getOrient() && relativeStartX === startX) {
                    const leftAxisWidth = axis.getLayoutRect().width;
                    leftLimitLength = Math.max(leftLimitLength, leftAxisWidth);
                } else if (relativeStartX === endX) {
                    const rightAxisWidth = axis.getLayoutRect().width;
                    rightLimitLength = Math.max(rightLimitLength, rightAxisWidth);
                }
            })), {
                left: leftLimitLength,
                right: rightLimitLength
            };
        }
    }
}

exports.CartesianAxis = CartesianAxis, CartesianAxis.type = type_1.ComponentTypeEnum.cartesianAxis, 
CartesianAxis.specKey = "axes";
//# sourceMappingURL=axis.js.map
