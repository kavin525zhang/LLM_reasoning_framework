"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Region = void 0;

const vutils_1 = require("@visactor/vutils"), interface_1 = require("../compile/mark/interface"), dimension_trigger_1 = require("../interaction/dimension-trigger"), interaction_1 = require("../interaction/interaction"), event_1 = require("../constant/event"), layout_1 = require("../constant/layout"), attribute_1 = require("../constant/attribute"), animate_manager_1 = require("../animation/animate-manager"), layout_model_1 = require("../model/layout-model"), region_transformer_1 = require("./region-transformer");

class Region extends layout_model_1.LayoutModel {
    getMaxWidth() {
        return this._layout.maxWidth;
    }
    setMaxWidth(value) {
        this._layout.maxWidth = value;
    }
    getMaxHeight() {
        return this._layout.maxHeight;
    }
    setMaxHeight(value) {
        this._layout.maxHeight = value;
    }
    getGroupMark() {
        return this._groupMark;
    }
    getInteractionMark() {
        return this._interactionMark;
    }
    getStackInverse() {
        return !0 === this._spec.stackInverse;
    }
    getStackSort() {
        return !0 === this._spec.stackSort;
    }
    constructor(spec, ctx) {
        var _a;
        super(spec, ctx), this.transformerConstructor = region_transformer_1.RegionSpecTransformer, 
        this.modelType = "region", this.specKey = "region", this.type = Region.type, this._series = [], 
        this.layoutType = "region", this.layoutZIndex = layout_1.LayoutZIndex.Region, this.interaction = new interaction_1.Interaction, 
        this.seriesDataFilterOver = () => {
            this.event.emit(event_1.ChartEvent.regionSeriesDataFilterOver, {
                model: this,
                chart: this.getChart()
            }), this._series.forEach((s => {
                s.getViewDataFilter() && s.reTransformViewData();
            }));
        }, this.getBoundsInRect = () => ({
            x1: this._layout.getLayoutStartPoint().x,
            y1: this._layout.getLayoutStartPoint().y,
            x2: this._layout.getLayoutStartPoint().x + this._layout.getLayoutRect().width,
            y2: this._layout.getLayoutStartPoint().y + this._layout.getLayoutRect().height
        }), this.userId = spec.id, this.coordinate = null !== (_a = spec.coordinate) && void 0 !== _a ? _a : "cartesian", 
        this._option.animation && (this.animate = new animate_manager_1.AnimateManager({
            getCompiler: ctx.getCompiler
        })), this.interaction.setDisableActiveEffect(this._option.disableTriggerEvent);
    }
    _getClipDefaultValue() {
        var _a, _b, _c, _d;
        const chartSpec = this._option.getChart().getSpec(), hasDataZoom = null === (_b = null === (_a = chartSpec.dataZoom) || void 0 === _a ? void 0 : _a.some) || void 0 === _b ? void 0 : _b.call(_a, (entry => {
            var _a;
            return "axis" === (null !== (_a = entry.filterMode) && void 0 !== _a ? _a : "filter");
        })), hasScrollBar = null === (_d = null === (_c = chartSpec.scrollBar) || void 0 === _c ? void 0 : _c.some) || void 0 === _d ? void 0 : _d.call(_c, (entry => {
            var _a;
            return "axis" === (null !== (_a = entry.filterMode) && void 0 !== _a ? _a : "axis");
        }));
        return !(!hasDataZoom && !hasScrollBar) || this._layout.layoutClip;
    }
    created() {
        var _a, _b;
        this.initLayout(), super.created();
        const clip = null !== (_a = this._spec.clip) && void 0 !== _a ? _a : this._getClipDefaultValue();
        this._groupMark = this._createGroupMark("regionGroup", this.userId, this.layoutZIndex), 
        this._spec.roam && this._groupMark.setMarkConfig({
            interactive: !0
        }), this._interactionMark = this._createGroupMark("regionInteractionGroup", (null !== (_b = this.userId) && void 0 !== _b ? _b : this.type) + "_interaction", layout_1.LayoutZIndex.Interaction), 
        (0, vutils_1.isEmpty)(this._spec.style) || (this._backgroundMark = this._createMark({
            type: "rect",
            name: "regionBackground"
        }), clip && (this._foregroundMark = this._createMark({
            type: "rect",
            name: "regionForeground"
        })), [ this._backgroundMark, this._foregroundMark ].forEach((mark => {
            mark && (mark.created(), this.setMarkStyle(mark, {
                width: () => this.getLayoutRect().width,
                height: () => this.getLayoutRect().height
            }, "normal", attribute_1.AttributeLevel.Built_In), this._groupMark.addMark(mark));
        })), this._backgroundMark && this._backgroundMark.setMarkConfig({
            zIndex: layout_1.LayoutZIndex.SeriesGroup - 1
        }), this._foregroundMark && this._foregroundMark.setMarkConfig({
            zIndex: layout_1.LayoutZIndex.Mark + 1
        })), this.createTrigger();
    }
    _createGroupMark(name, userId, zIndex) {
        var _a, _b;
        const groupMark = this._createMark({
            type: "group",
            name: name
        });
        groupMark.setUserId(userId), groupMark.setMarkConfig({
            zIndex: zIndex
        });
        const clip = null !== (_a = this._spec.clip) && void 0 !== _a ? _a : this._getClipDefaultValue();
        return this.setMarkStyle(groupMark, {
            x: () => this.getLayoutStartPoint().x,
            y: () => this.getLayoutStartPoint().y,
            width: () => this.getLayoutRect().width,
            height: () => this.getLayoutRect().height,
            clip: clip
        }, "normal", attribute_1.AttributeLevel.Built_In), this.setMarkStyle(groupMark, {
            cornerRadius: null === (_b = this._spec.style) || void 0 === _b ? void 0 : _b.cornerRadius
        }, "normal", attribute_1.AttributeLevel.User_Mark), this._marks.addMark(groupMark), 
        groupMark;
    }
    init(option) {
        super.init(option), this.initMark(), this.initSeriesDataflow(), this.initInteraction(), 
        this.initTrigger();
    }
    initMark() {
        this._initBackgroundMarkStyle(), this._initForegroundMarkStyle();
    }
    _initBackgroundMarkStyle() {
        var _a, _b;
        this._backgroundMark && (this.setMarkStyle(this._backgroundMark, Object.assign({
            fillOpacity: (null === (_a = this._spec.style) || void 0 === _a ? void 0 : _a.fill) ? 1 : 0
        }, this._spec.style), "normal", attribute_1.AttributeLevel.User_Mark), (null !== (_b = this._spec.clip) && void 0 !== _b ? _b : this._getClipDefaultValue()) && this.setMarkStyle(this._backgroundMark, {
            strokeOpacity: 0
        }, "normal", attribute_1.AttributeLevel.Built_In));
    }
    _initForegroundMarkStyle() {
        this._foregroundMark && this.setMarkStyle(this._foregroundMark, Object.assign(Object.assign({}, this._spec.style), {
            fillOpacity: 0,
            pickable: !1
        }), "normal", attribute_1.AttributeLevel.User_Mark);
    }
    _compareSpec(spec, prevSpec) {
        const result = super._compareSpec(spec, prevSpec);
        return (0, vutils_1.isEqual)(null == prevSpec ? void 0 : prevSpec.style, null == spec ? void 0 : spec.style) || (result.reMake = !0), 
        result;
    }
    reInit(spec) {
        super.reInit(spec), this._initBackgroundMarkStyle(), this._initForegroundMarkStyle();
    }
    addSeries(s) {
        s && (this._series.includes(s) || this._series.push(s));
    }
    removeSeries(s) {
        if (!s) return;
        const index = this._series.findIndex((s_ => s_ === s));
        index >= 0 && this._series.splice(index, 1);
    }
    getSeries(opt = {}) {
        return this._series.filter((s => {
            var _a, _b;
            return (!opt.name || (null == s ? void 0 : s.name) === opt.name) && (!opt.userId || (0, 
            vutils_1.array)(opt.userId).includes(s.userId)) && (!(0, vutils_1.isValid)(opt.specIndex) || (0, 
            vutils_1.array)(opt.specIndex).includes(s.getSpecIndex())) && (!opt.id || s.id === opt.id) && (!opt.type || s.type === opt.type) && (!opt.coordinateType || s.coordinate === opt.coordinateType) && (!opt.dataName || (null === (_b = null === (_a = s.getRawData) || void 0 === _a ? void 0 : _a.call(s)) || void 0 === _b ? void 0 : _b.name) === opt.dataName);
        }));
    }
    getSeriesInName(name) {
        return this.getSeries({
            name: name
        })[0];
    }
    getSeriesInUserId(userId) {
        return this.getSeries({
            userId: userId
        })[0];
    }
    getSeriesInId(id) {
        return this.getSeries({
            id: id
        })[0];
    }
    getSeriesInType(type) {
        return this.getSeries({
            type: type
        });
    }
    getSeriesInCoordinateType(coordinateType) {
        return this.getSeries({
            coordinateType: coordinateType
        });
    }
    getSeriesInDataName(dataName) {
        return this.getSeries({
            dataName: dataName
        });
    }
    onRender(ctx) {}
    initSeriesDataflow() {
        const viewDataFilters = this._series.map((s => {
            var _a;
            return null !== (_a = s.getViewDataFilter()) && void 0 !== _a ? _a : s.getViewData();
        })).filter((v => !!v));
        this._option.dataSet.multipleDataViewAddListener(viewDataFilters, "change", this.seriesDataFilterOver);
    }
    release() {
        super.release(), this._series = [];
    }
    createTrigger() {
        const triggerOptions = Object.assign(Object.assign({}, this._option), {
            model: this,
            interaction: this.interaction
        });
        this._trigger = new dimension_trigger_1.DimensionTrigger(triggerOptions);
    }
    initTrigger() {
        this._series.forEach((s => {
            s.getMarksWithoutRoot().forEach((m => {
                this._trigger.registerMark(m);
            }));
        })), this._trigger.init();
    }
    initInteraction() {
        this._option.disableTriggerEvent || this._series.forEach((s => {
            s.getMarksWithoutRoot().forEach((m => {
                for (const key in interface_1.STATE_VALUE_ENUM_REVERSE) (0, vutils_1.isEmpty)(m.stateStyle[interface_1.STATE_VALUE_ENUM_REVERSE[key]]) || this.interaction.registerMark(interface_1.STATE_VALUE_ENUM_REVERSE[key], m);
            }));
        }));
    }
    compileMarks(group) {
        this.getMarks().forEach((m => {
            var _a;
            m.compile({
                group: group,
                context: {
                    model: this
                }
            }), null === (_a = m.getProduct()) || void 0 === _a || _a.layout(((group, children, parentLayoutBounds, options) => {}));
        }));
    }
    compile() {
        var _a;
        null === (_a = this.animate) || void 0 === _a || _a.compile(), this.compileMarks();
    }
    onLayoutEnd(ctx) {
        this._series.forEach((s => s.onLayoutEnd(ctx))), super.onLayoutEnd(ctx);
    }
}

exports.Region = Region, Region.type = "region", Region.transformerConstructor = region_transformer_1.RegionSpecTransformer, 
Region.specKey = "region";
//# sourceMappingURL=region.js.map
