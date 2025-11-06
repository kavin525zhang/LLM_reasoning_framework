"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerLabel = exports.Label = void 0;

const type_1 = require("../interface/type"), data_1 = require("../../constant/data"), event_1 = require("../../constant/event"), attribute_1 = require("../../constant/attribute"), layout_1 = require("../../constant/layout"), vutils_extension_1 = require("@visactor/vutils-extension"), model_1 = require("../../util/model"), vgrammar_core_1 = require("@visactor/vgrammar-core"), util_1 = require("./util"), component_1 = require("../../mark/component"), base_label_1 = require("./base-label"), vutils_1 = require("@visactor/vutils"), factory_1 = require("../../core/factory"), label_1 = require("../../mark/label"), label_transformer_1 = require("./label-transformer");

class Label extends base_label_1.BaseLabelComponent {
    constructor(spec, options) {
        super(spec, options), this.type = type_1.ComponentTypeEnum.label, this.name = type_1.ComponentTypeEnum.label, 
        this.specKey = "label", this.transformerConstructor = label_transformer_1.LabelSpecTransformer, 
        this.layoutZIndex = layout_1.LayoutZIndex.Label, this._layoutRule = spec.labelLayout || "series";
    }
    static getSpecInfo(chartSpec, chartSpecInfo) {
        const specInfo = [], regionSpecInfo = (null == chartSpecInfo ? void 0 : chartSpecInfo.region) || [];
        return regionSpecInfo.forEach(((regionInfo, i) => {
            (regionInfo.seriesIndexes || []).some((seriesIndex => {
                const seriesInfo = chartSpecInfo.series[seriesIndex], {markLabelSpec: markLabelSpec = {}} = seriesInfo;
                return Object.values(markLabelSpec).some((labelSpecList => Array.isArray(labelSpecList) && (labelSpecList => labelSpecList.some((labelSpec => labelSpec.visible)))(labelSpecList)));
            })) && specInfo.push({
                spec: chartSpec,
                type: type_1.ComponentTypeEnum.label,
                specInfoPath: [ "component", this.specKey, i ],
                regionIndexes: [ i ]
            });
        })), specInfo;
    }
    init(option) {
        super.init(option), this.initEvent(), this._initTextMark(), this._initLabelComponent(), 
        this._initTextMarkStyle();
    }
    reInit(spec) {
        super.reInit(spec), this._labelInfoMap && this._labelInfoMap.clear(), this._initTextMark(), 
        this._initTextMarkStyle();
    }
    initEvent() {
        this.event.on(event_1.ChartEvent.dataZoomChange, (() => {
            this._labelComponentMap.forEach(((info, component) => {
                const graphicItem = component.getProduct().getGroupGraphicItem();
                graphicItem && graphicItem.disableAnimation();
            })), this.event.on(event_1.VGRAMMAR_HOOK_EVENT.AFTER_MARK_RENDER_END, enableAnimation);
        }));
        const enableAnimation = () => {
            this._labelComponentMap.forEach(((info, component) => {
                const graphicItem = component.getProduct().getGroupGraphicItem();
                graphicItem && graphicItem.enableAnimation();
            })), this.event.off(event_1.VGRAMMAR_HOOK_EVENT.AFTER_MARK_RENDER_END, enableAnimation);
        };
    }
    _initTextMark() {
        this._labelInfoMap || (this._labelInfoMap = new Map), this._labelComponentMap || (this._labelComponentMap = new Map), 
        (0, model_1.eachSeries)(this._regions, (series => {
            const {markLabelSpec: markLabelSpec = {}} = series.getSpecInfo(), markNames = Object.keys(markLabelSpec), region = series.getRegion();
            this._labelInfoMap.get(region) || this._labelInfoMap.set(region, []);
            for (let i = 0; i < markNames.length; i++) {
                const markName = markNames[i], mark = series.getMarkInName(markName);
                mark && markLabelSpec[markName].forEach(((spec, index) => {
                    var _a, _b;
                    if (spec.visible) {
                        const info = this._labelInfoMap.get(region), labelMark = this._createMark({
                            type: "label",
                            name: `${markName}-label-${index}`
                        }, {
                            noSeparateStyle: !0,
                            attributeContext: series.getMarkAttributeContext()
                        });
                        spec.showRelatedMarkTooltip && (null === (_b = null === (_a = series.tooltipHelper) || void 0 === _a ? void 0 : _a.activeTriggerSet.mark) || void 0 === _b || _b.add(labelMark)), 
                        labelMark.setTarget(mark), info.push({
                            labelMark: labelMark,
                            baseMark: mark,
                            series: series,
                            labelSpec: spec
                        });
                    }
                }));
            }
        }));
    }
    _initLabelComponent() {
        this._labelInfoMap.forEach(((regionLabelInfo, region) => {
            if ("region" === this._layoutRule) {
                const component = this._createMark({
                    type: "component",
                    name: `${region.getGroupMark().name}-label-component`
                }, {
                    componentType: "label",
                    noSeparateStyle: !0
                }, {
                    support3d: this._spec.support3d
                });
                component && (component.setSkipBeforeLayouted(!0), regionLabelInfo[0] && (0, vutils_1.isValid)(regionLabelInfo[0].labelSpec.zIndex) && component.setMarkConfig({
                    zIndex: regionLabelInfo[0].labelSpec.zIndex
                }), this._marks.addMark(component), this._labelComponentMap.set(component, (() => this._labelInfoMap.get(region))));
            } else regionLabelInfo.forEach(((labelInfo, i) => {
                const component = this._createMark({
                    type: "component",
                    name: `${labelInfo.labelMark.name}-component`
                }, {
                    componentType: "label",
                    noSeparateStyle: !0
                }, {
                    support3d: labelInfo.baseMark.getMarkConfig().support3d
                });
                component && ((0, vutils_1.isValid)(labelInfo.labelSpec.zIndex) && component.setMarkConfig({
                    zIndex: labelInfo.labelSpec.zIndex
                }), component.setSkipBeforeLayouted(!0), this._marks.addMark(component), this._labelComponentMap.set(component, (() => this._labelInfoMap.get(region)[i])));
            }));
        }));
    }
    _initTextMarkStyle() {
        this._labelComponentMap.forEach(((labelInfoCb, labelComponent) => {
            (0, vutils_1.array)(labelInfoCb()).forEach((({labelMark: labelMark}) => {
                labelMark.setComponent(labelComponent);
            }));
        })), this._labelInfoMap.forEach((labelInfos => {
            labelInfos.forEach((info => {
                var _a, _b;
                const {labelMark: labelMark, labelSpec: labelSpec, series: series} = info;
                if (this.initMarkStyleWithSpec(labelMark, labelSpec, void 0), (0, vutils_1.isFunction)(null == labelSpec ? void 0 : labelSpec.getStyleHandler)) {
                    const styleHandler = labelSpec.getStyleHandler(series);
                    null == styleHandler || styleHandler.call(series, labelMark, labelSpec);
                }
                (null === (_b = null === (_a = labelMark.stateStyle) || void 0 === _a ? void 0 : _a.normal) || void 0 === _b ? void 0 : _b.lineWidth) && labelMark.setAttribute("stroke", series.getColorAttribute(), "normal", attribute_1.AttributeLevel.Base_Series);
            }));
        }));
    }
    updateLayoutAttribute() {
        super.updateLayoutAttribute(), this._labelComponentMap.forEach(((labelInfoCb, labelComponent) => {
            const labelInfo = labelInfoCb();
            (0, vutils_1.isArray)(labelInfo) ? this._updateMultiLabelAttribute(labelInfo, labelComponent) : this._updateSingleLabelAttribute(labelInfo, labelComponent);
        }));
    }
    _updateMultiLabelAttribute(labelInfo, labelComponent) {
        this._updateLabelComponentAttribute(labelComponent.getProduct(), labelInfo.map((({baseMark: baseMark}) => baseMark.getProduct())), labelInfo);
    }
    _updateSingleLabelAttribute(labelInfo, labelComponent) {
        const {baseMark: baseMark} = labelInfo;
        this._updateLabelComponentAttribute(labelComponent.getProduct(), baseMark.getProduct(), [ labelInfo ]);
    }
    _updateLabelComponentAttribute(component, target, labelInfos) {
        const dependCmp = this._option.getComponentsByType("totalLabel");
        component.target(target).configure({
            interactive: !1
        }).depend(dependCmp.map((cmp => cmp.getMarks()[0].getProduct()))).labelStyle(((mark, params) => {
            var _a, _b;
            const labelInfo = labelInfos[params.labelIndex];
            if (labelInfo) {
                const {labelSpec: labelSpec, labelMark: labelMark, series: series} = labelInfo, rule = labelMark.getRule(), interactive = this._interactiveConfig(labelSpec), centerOffset = null !== (_b = null === (_a = this._spec) || void 0 === _a ? void 0 : _a.centerOffset) && void 0 !== _b ? _b : 0;
                let spec = (0, vutils_extension_1.mergeSpec)({
                    textStyle: Object.assign({
                        pickable: !0 === labelSpec.interactive
                    }, labelSpec.style),
                    overlap: {
                        avoidMarks: dependCmp.map((cmp => cmp.getMarks()[0].getProductId()))
                    }
                }, (0, util_1.defaultLabelConfig)(rule, labelInfo), Object.assign(Object.assign(Object.assign({}, (0, 
                vutils_1.pickWithout)(labelSpec, [ "position", "style", "state", "type", "stackDataFilterType", "getStyleHandler" ])), interactive), {
                    centerOffset: centerOffset
                }), labelSpec.stackDataFilterType ? {
                    dataFilter: "min" === labelSpec.stackDataFilterType ? data => data.filter((d => d.data[data_1.STACK_FIELD_TOTAL_BOTTOM])) : data => data.filter((d => d.data[data_1.STACK_FIELD_TOTAL_TOP]))
                } : {});
                return series && series.parseLabelStyle && (spec = series.parseLabelStyle(spec, labelSpec, labelMark)), 
                "line" !== rule && "area" !== rule || (spec.type = rule), spec;
            }
        })).encode(((datum, element, params) => {
            if (labelInfos[params.labelIndex]) {
                const {labelSpec: labelSpec, labelMark: labelMark} = labelInfos[params.labelIndex];
                return labelMark.skipEncode ? {
                    data: datum
                } : (0, util_1.textAttribute)(labelInfos[params.labelIndex], datum, labelSpec.formatMethod, labelSpec.formatter);
            }
        })).size((() => {
            var _a;
            return Object.assign({
                padding: null === (_a = labelInfos[0].labelSpec.overlap) || void 0 === _a ? void 0 : _a.padding
            }, labelInfos[0].series.getRegion().getLayoutRect());
        }));
    }
    compileMarks() {
        this.getMarks().forEach((m => {
            const labelInfo = this._labelComponentMap.get(m)();
            let group;
            group = (0, vutils_1.isArray)(labelInfo) ? labelInfo[0].series.getRegion().getGroupMark().getProduct() : labelInfo.series.getRegion().getGroupMark().getProduct(), 
            m.compile({
                group: group,
                context: {
                    model: this,
                    labelInfo: labelInfo
                }
            });
        }));
    }
    getVRenderComponents() {
        const labels = [];
        return this._labelComponentMap.forEach(((infoFunc, component) => {
            const graphicItem = component.getProduct().getGroupGraphicItem();
            graphicItem && labels.push(graphicItem);
        })), labels;
    }
    getLabelInfoByTextGraphic(text) {
        let labelInfo;
        const vrenderLabel = null == text ? void 0 : text.parent, vrenderDataLabel = null == vrenderLabel ? void 0 : vrenderLabel.parent;
        if (vrenderDataLabel) {
            const labelIndex = vrenderDataLabel.getChildren().indexOf(vrenderLabel);
            this._labelComponentMap.forEach(((infoFunc, component) => {
                component.getProduct().getGroupGraphicItem() === vrenderDataLabel && (labelInfo = (0, 
                vutils_1.array)(infoFunc())[labelIndex]);
            }));
        }
        return labelInfo;
    }
}

exports.Label = Label, Label.type = type_1.ComponentTypeEnum.label, Label.specKey = "label", 
Label.transformerConstructor = label_transformer_1.LabelSpecTransformer;

const registerLabel = () => {
    (0, vgrammar_core_1.registerLabel)(), (0, label_1.registerLabelMark)(), (0, component_1.registerComponentMark)(), 
    factory_1.Factory.registerComponent(Label.type, Label, !0);
};

exports.registerLabel = registerLabel;
//# sourceMappingURL=label.js.map
