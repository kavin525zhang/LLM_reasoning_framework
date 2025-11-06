import { registerLabelMark } from "../../mark/label";

import { ComponentTypeEnum } from "../interface/type";

import { STACK_FIELD_TOTAL, STACK_FIELD_TOTAL_BOTTOM, STACK_FIELD_TOTAL_TOP } from "../../constant/data";

import { LayoutZIndex } from "../../constant/layout";

import { AttributeLevel } from "../../constant/attribute";

import { mergeSpec } from "@visactor/vutils-extension";

import { registerLabel as registerVGrammarLabel } from "@visactor/vgrammar-core";

import { textAttribute } from "./util";

import { BaseLabelComponent } from "./base-label";

import { Factory } from "../../core/factory";

import { registerComponentMark } from "../../mark/component";

export class TotalLabel extends BaseLabelComponent {
    constructor() {
        super(...arguments), this.type = ComponentTypeEnum.totalLabel, this.name = ComponentTypeEnum.totalLabel, 
        this.specKey = "totalLabel", this.layoutZIndex = LayoutZIndex.Label;
    }
    static getSpecInfo(chartSpec, chartSpecInfo) {
        var _a;
        const specInfo = [];
        return null === (_a = null == chartSpecInfo ? void 0 : chartSpecInfo.region) || void 0 === _a || _a.forEach(((regionInfo, regionIndex) => {
            var _a;
            null === (_a = regionInfo.seriesIndexes) || void 0 === _a || _a.forEach((seriesIndex => {
                const {spec: spec} = chartSpecInfo.series[seriesIndex], labelSpec = spec[this.specKey];
                (null == labelSpec ? void 0 : labelSpec.visible) && specInfo.push({
                    spec: labelSpec,
                    type: ComponentTypeEnum.totalLabel,
                    specPath: [ "series", seriesIndex, this.specKey ],
                    specInfoPath: [ "component", this.specKey, seriesIndex ],
                    regionIndexes: [ regionIndex ],
                    seriesIndexes: [ seriesIndex ]
                });
            }));
        })), specInfo;
    }
    init(option) {
        super.init(option), this._initTextMark(), this._initLabelComponent();
    }
    reInit(spec) {
        super.reInit(spec), this._initTextMark();
    }
    _initTextMark() {
        var _a;
        const series = this._getSeries();
        if (null === (_a = series.getSpec().totalLabel) || void 0 === _a ? void 0 : _a.visible) {
            const mark = series.getSeriesMark();
            if (mark) {
                const textMark = this._createMark({
                    type: "label",
                    name: `${mark.name}-total-label`
                });
                this._baseMark = mark, this._textMark = textMark, this._initTextMarkStyle();
            }
        }
    }
    _initTextMarkStyle() {
        var _a;
        super.initMarkStyleWithSpec(this._textMark, this._spec), this.setMarkStyle(this._textMark, {
            text: datum => datum[STACK_FIELD_TOTAL]
        }, "normal", AttributeLevel.Default);
        const series = this._getSeries();
        null === (_a = series.initTotalLabelMarkStyle) || void 0 === _a || _a.call(series, this._textMark);
    }
    _initLabelComponent() {
        const series = this._getSeries(), component = this._createMark({
            type: "component",
            name: `${series.name}-total-label-component`
        }, {
            componentType: "label",
            noSeparateStyle: !0
        }, {
            support3d: this._spec.support3d
        });
        component && this._marks.addMark(component);
    }
    updateLayoutAttribute() {
        super.updateLayoutAttribute();
        const series = this._getSeries();
        this._marks.forEach(((componentMark, index) => {
            componentMark.getProduct().target(this._baseMark.getProduct()).configure({
                interactive: !1
            }).labelStyle((() => {
                var _a, _b;
                if (this._baseMark) {
                    const {offset: offset, animation: animation, overlap: overlap, position: position = "top"} = this._spec, interactive = this._interactiveConfig(this._spec);
                    return mergeSpec({
                        textStyle: {
                            pickable: !0 === this._spec.interactive
                        },
                        position: totalLabelPosition(series, this._baseMark.type, position),
                        x: 0,
                        y: 0
                    }, null !== (_b = null === (_a = series.getTotalLabelComponentStyle) || void 0 === _a ? void 0 : _a.call(series, {
                        baseMark: this._baseMark,
                        labelMark: this._textMark
                    })) && void 0 !== _b ? _b : {}, Object.assign({
                        offset: offset,
                        animation: animation,
                        overlap: overlap,
                        dataFilter: data => data.filter((d => "bottom" === position ? d.data[STACK_FIELD_TOTAL_BOTTOM] : d.data[STACK_FIELD_TOTAL_TOP]))
                    }, interactive));
                }
            })).encode((datum => textAttribute({
                baseMark: this._baseMark,
                labelMark: this._textMark,
                series: series,
                labelSpec: series.getSpec().totalLabel
            }, datum, this._spec.formatMethod))).size((() => {
                var _a;
                return Object.assign({
                    padding: null === (_a = this._spec.overlap) || void 0 === _a ? void 0 : _a.padding
                }, this._regions[0].getLayoutRect());
            }));
        }));
    }
    compileMarks() {
        this.getMarks().forEach((m => {
            const group = this._regions[0].getGroupMark().getProduct();
            m.compile({
                group: group,
                context: {
                    model: this
                }
            });
        }));
    }
    getVRenderComponents() {
        const labels = [];
        return this.getMarks().forEach((m => {
            const graphicItem = m.getProduct().getGroupGraphicItem();
            graphicItem && labels.push(graphicItem);
        })), labels;
    }
    _getSeries() {
        return this._option.getSeriesInIndex([ this.getSpecPath()[1] ])[0];
    }
}

TotalLabel.type = ComponentTypeEnum.totalLabel, TotalLabel.specKey = "totalLabel";

export function totalLabelPosition(series, type, position = "top") {
    var _a, _b;
    let finalPosition;
    const {direction: direction} = series;
    let positionMap;
    positionMap = "bottom" === position ? {
        vertical: [ "bottom", "top" ],
        horizontal: [ "left", "right" ]
    } : {
        vertical: [ "top", "bottom" ],
        horizontal: [ "right", "left" ]
    };
    const index = ("horizontal" === direction ? null === (_a = series.getXAxisHelper()) || void 0 === _a ? void 0 : _a.isInverse() : null === (_b = series.getYAxisHelper()) || void 0 === _b ? void 0 : _b.isInverse()) ? 1 : 0;
    switch (type) {
      case "rect":
      case "symbol":
        finalPosition = positionMap[direction][index];
        break;

      default:
        finalPosition = "top";
    }
    return finalPosition;
}

export const registerTotalLabel = () => {
    registerVGrammarLabel(), registerLabelMark(), registerComponentMark(), Factory.registerComponent(TotalLabel.type, TotalLabel, !0);
};
//# sourceMappingURL=total-label.js.map
