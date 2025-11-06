"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerTotalLabel = exports.totalLabelPosition = exports.TotalLabel = void 0;

const label_1 = require("../../mark/label"), type_1 = require("../interface/type"), data_1 = require("../../constant/data"), layout_1 = require("../../constant/layout"), attribute_1 = require("../../constant/attribute"), vutils_extension_1 = require("@visactor/vutils-extension"), vgrammar_core_1 = require("@visactor/vgrammar-core"), util_1 = require("./util"), base_label_1 = require("./base-label"), factory_1 = require("../../core/factory"), component_1 = require("../../mark/component");

class TotalLabel extends base_label_1.BaseLabelComponent {
    constructor() {
        super(...arguments), this.type = type_1.ComponentTypeEnum.totalLabel, this.name = type_1.ComponentTypeEnum.totalLabel, 
        this.specKey = "totalLabel", this.layoutZIndex = layout_1.LayoutZIndex.Label;
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
                    type: type_1.ComponentTypeEnum.totalLabel,
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
            text: datum => datum[data_1.STACK_FIELD_TOTAL]
        }, "normal", attribute_1.AttributeLevel.Default);
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
                    return (0, vutils_extension_1.mergeSpec)({
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
                        dataFilter: data => data.filter((d => "bottom" === position ? d.data[data_1.STACK_FIELD_TOTAL_BOTTOM] : d.data[data_1.STACK_FIELD_TOTAL_TOP]))
                    }, interactive));
                }
            })).encode((datum => (0, util_1.textAttribute)({
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

function totalLabelPosition(series, type, position = "top") {
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

exports.TotalLabel = TotalLabel, TotalLabel.type = type_1.ComponentTypeEnum.totalLabel, 
TotalLabel.specKey = "totalLabel", exports.totalLabelPosition = totalLabelPosition;

const registerTotalLabel = () => {
    (0, vgrammar_core_1.registerLabel)(), (0, label_1.registerLabelMark)(), (0, component_1.registerComponentMark)(), 
    factory_1.Factory.registerComponent(TotalLabel.type, TotalLabel, !0);
};

exports.registerTotalLabel = registerTotalLabel;
//# sourceMappingURL=total-label.js.map
