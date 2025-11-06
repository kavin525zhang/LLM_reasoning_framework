import { ComponentTypeEnum } from "../interface/type";

import { STACK_FIELD_TOTAL_BOTTOM, STACK_FIELD_TOTAL_TOP } from "../../constant/data";

import { ChartEvent, VGRAMMAR_HOOK_EVENT } from "../../constant/event";

import { AttributeLevel } from "../../constant/attribute";

import { LayoutZIndex } from "../../constant/layout";

import { mergeSpec } from "@visactor/vutils-extension";

import { eachSeries } from "../../util/model";

import { registerLabel as registerVGrammarLabel } from "@visactor/vgrammar-core";

import { defaultLabelConfig, textAttribute } from "./util";

import { registerComponentMark } from "../../mark/component";

import { BaseLabelComponent } from "./base-label";

import { array, isArray, isFunction, isValid, pickWithout } from "@visactor/vutils";

import { Factory } from "../../core/factory";

import { registerLabelMark } from "../../mark/label";

import { LabelSpecTransformer } from "./label-transformer";

export class Label extends BaseLabelComponent {
    constructor(spec, options) {
        super(spec, options), this.type = ComponentTypeEnum.label, this.name = ComponentTypeEnum.label, 
        this.specKey = "label", this.transformerConstructor = LabelSpecTransformer, this.layoutZIndex = LayoutZIndex.Label, 
        this._layoutRule = spec.labelLayout || "series";
    }
    static getSpecInfo(chartSpec, chartSpecInfo) {
        const specInfo = [], regionSpecInfo = (null == chartSpecInfo ? void 0 : chartSpecInfo.region) || [];
        return regionSpecInfo.forEach(((regionInfo, i) => {
            (regionInfo.seriesIndexes || []).some((seriesIndex => {
                const seriesInfo = chartSpecInfo.series[seriesIndex], {markLabelSpec: markLabelSpec = {}} = seriesInfo;
                return Object.values(markLabelSpec).some((labelSpecList => Array.isArray(labelSpecList) && (labelSpecList => labelSpecList.some((labelSpec => labelSpec.visible)))(labelSpecList)));
            })) && specInfo.push({
                spec: chartSpec,
                type: ComponentTypeEnum.label,
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
        this.event.on(ChartEvent.dataZoomChange, (() => {
            this._labelComponentMap.forEach(((info, component) => {
                const graphicItem = component.getProduct().getGroupGraphicItem();
                graphicItem && graphicItem.disableAnimation();
            })), this.event.on(VGRAMMAR_HOOK_EVENT.AFTER_MARK_RENDER_END, enableAnimation);
        }));
        const enableAnimation = () => {
            this._labelComponentMap.forEach(((info, component) => {
                const graphicItem = component.getProduct().getGroupGraphicItem();
                graphicItem && graphicItem.enableAnimation();
            })), this.event.off(VGRAMMAR_HOOK_EVENT.AFTER_MARK_RENDER_END, enableAnimation);
        };
    }
    _initTextMark() {
        this._labelInfoMap || (this._labelInfoMap = new Map), this._labelComponentMap || (this._labelComponentMap = new Map), 
        eachSeries(this._regions, (series => {
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
                component && (component.setSkipBeforeLayouted(!0), regionLabelInfo[0] && isValid(regionLabelInfo[0].labelSpec.zIndex) && component.setMarkConfig({
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
                component && (isValid(labelInfo.labelSpec.zIndex) && component.setMarkConfig({
                    zIndex: labelInfo.labelSpec.zIndex
                }), component.setSkipBeforeLayouted(!0), this._marks.addMark(component), this._labelComponentMap.set(component, (() => this._labelInfoMap.get(region)[i])));
            }));
        }));
    }
    _initTextMarkStyle() {
        this._labelComponentMap.forEach(((labelInfoCb, labelComponent) => {
            array(labelInfoCb()).forEach((({labelMark: labelMark}) => {
                labelMark.setComponent(labelComponent);
            }));
        })), this._labelInfoMap.forEach((labelInfos => {
            labelInfos.forEach((info => {
                var _a, _b;
                const {labelMark: labelMark, labelSpec: labelSpec, series: series} = info;
                if (this.initMarkStyleWithSpec(labelMark, labelSpec, void 0), isFunction(null == labelSpec ? void 0 : labelSpec.getStyleHandler)) {
                    const styleHandler = labelSpec.getStyleHandler(series);
                    null == styleHandler || styleHandler.call(series, labelMark, labelSpec);
                }
                (null === (_b = null === (_a = labelMark.stateStyle) || void 0 === _a ? void 0 : _a.normal) || void 0 === _b ? void 0 : _b.lineWidth) && labelMark.setAttribute("stroke", series.getColorAttribute(), "normal", AttributeLevel.Base_Series);
            }));
        }));
    }
    updateLayoutAttribute() {
        super.updateLayoutAttribute(), this._labelComponentMap.forEach(((labelInfoCb, labelComponent) => {
            const labelInfo = labelInfoCb();
            isArray(labelInfo) ? this._updateMultiLabelAttribute(labelInfo, labelComponent) : this._updateSingleLabelAttribute(labelInfo, labelComponent);
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
                let spec = mergeSpec({
                    textStyle: Object.assign({
                        pickable: !0 === labelSpec.interactive
                    }, labelSpec.style),
                    overlap: {
                        avoidMarks: dependCmp.map((cmp => cmp.getMarks()[0].getProductId()))
                    }
                }, defaultLabelConfig(rule, labelInfo), Object.assign(Object.assign(Object.assign({}, pickWithout(labelSpec, [ "position", "style", "state", "type", "stackDataFilterType", "getStyleHandler" ])), interactive), {
                    centerOffset: centerOffset
                }), labelSpec.stackDataFilterType ? {
                    dataFilter: "min" === labelSpec.stackDataFilterType ? data => data.filter((d => d.data[STACK_FIELD_TOTAL_BOTTOM])) : data => data.filter((d => d.data[STACK_FIELD_TOTAL_TOP]))
                } : {});
                return series && series.parseLabelStyle && (spec = series.parseLabelStyle(spec, labelSpec, labelMark)), 
                "line" !== rule && "area" !== rule || (spec.type = rule), spec;
            }
        })).encode(((datum, element, params) => {
            if (labelInfos[params.labelIndex]) {
                const {labelSpec: labelSpec, labelMark: labelMark} = labelInfos[params.labelIndex];
                return labelMark.skipEncode ? {
                    data: datum
                } : textAttribute(labelInfos[params.labelIndex], datum, labelSpec.formatMethod, labelSpec.formatter);
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
            group = isArray(labelInfo) ? labelInfo[0].series.getRegion().getGroupMark().getProduct() : labelInfo.series.getRegion().getGroupMark().getProduct(), 
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
                component.getProduct().getGroupGraphicItem() === vrenderDataLabel && (labelInfo = array(infoFunc())[labelIndex]);
            }));
        }
        return labelInfo;
    }
}

Label.type = ComponentTypeEnum.label, Label.specKey = "label", Label.transformerConstructor = LabelSpecTransformer;

export const registerLabel = () => {
    registerVGrammarLabel(), registerLabelMark(), registerComponentMark(), Factory.registerComponent(Label.type, Label, !0);
};
//# sourceMappingURL=label.js.map
