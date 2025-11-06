"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerLiquidSeries = exports.LiquidSeries = void 0;

const type_1 = require("../interface/type"), vutils_1 = require("@visactor/vutils"), utils_1 = require("../../animation/utils"), animation_1 = require("./animation"), constant_1 = require("./constant"), factory_1 = require("../../core/factory"), line_mixin_transformer_1 = require("../mixin/line-mixin-transformer"), liquid_1 = require("../../mark/liquid"), attribute_1 = require("../../constant/attribute"), event_1 = require("../../constant/event"), base_1 = require("../base"), group_1 = require("../../mark/group"), util_1 = require("./util"), vrender_core_1 = require("@visactor/vrender-core"), vrender_components_1 = require("@visactor/vrender-components"), util_2 = require("../../util"), tooltip_helper_1 = require("./tooltip-helper");

class LiquidSeries extends base_1.BaseSeries {
    constructor() {
        super(...arguments), this.type = type_1.SeriesTypeEnum.liquid, this.transformerConstructor = line_mixin_transformer_1.LineLikeSeriesSpecTransformer, 
        this._liquidBackgroundMark = null, this._liquidOutlineMark = null, this._getLiquidPosY = () => {
            let liquidY = 0;
            const {height: liquidBackHeight, startY: startY} = this._getLiquidBackPosAndSize();
            return liquidY = this._reverse ? liquidBackHeight * this._heightRatio : liquidBackHeight * (1 - this._heightRatio), 
            liquidY + startY;
        }, this._getLiquidHeight = () => {
            const {height: liquidBackHeight} = this._getLiquidBackPosAndSize();
            return liquidBackHeight * this._heightRatio;
        }, this._getLiquidBackPosAndSize = (isOutline = !1) => {
            var _a, _b;
            let {top: marginTop = 0, bottom: marginBottom = 0, left: marginLeft = 0, right: marginRight = 0} = this._marginSpec, {top: paddingTop = 0, bottom: paddingBottom = 0, left: paddingLeft = 0, right: paddingRight = 0} = isOutline ? {} : this._paddingSpec;
            "triangle" === this._maskShape && (marginBottom /= Math.sqrt(3), marginTop = marginTop / Math.sqrt(3) * 2, 
            paddingBottom /= Math.sqrt(3), paddingTop = paddingTop / Math.sqrt(3) * 2);
            const {width: regionWidth, height: regionHeight} = null !== (_b = null === (_a = this._region) || void 0 === _a ? void 0 : _a.getLayoutRect()) && void 0 !== _b ? _b : {
                width: 0,
                height: 0
            }, x = regionWidth / 2 + (marginLeft + paddingLeft - (marginRight + paddingRight)) / 2, y = regionHeight / 2 + (marginTop + paddingTop - (marginBottom + paddingBottom)) / 2;
            let width = regionWidth - (marginLeft + marginRight + paddingLeft + paddingRight), height = regionHeight - (marginTop + marginBottom + paddingTop + paddingBottom);
            const size = Math.min(width, height);
            return "rect" !== this._maskShape && (width = size, height = size), {
                x: x,
                y: y,
                size: size,
                width: width,
                height: height,
                startX: x - width / 2,
                startY: y - height / 2,
                endX: x + width / 2,
                endY: y + height / 2
            };
        }, this._getLiquidBackPath = (isOutline = !1) => {
            var _a;
            let symbolPath;
            if ("rect" === this._maskShape) {
                const {x: x, y: y, width: width, height: height} = this._getLiquidBackPosAndSize(isOutline);
                symbolPath = (0, vrender_core_1.createRect)({
                    x: x - width / 2,
                    y: y - height / 2,
                    width: width,
                    height: height,
                    fill: !0
                });
            } else {
                const {x: x, y: y, size: size} = this._getLiquidBackPosAndSize(isOutline);
                symbolPath = (0, vrender_core_1.createSymbol)({
                    x: x,
                    y: y,
                    size: size,
                    symbolType: (0, util_1.getShapes)(null !== (_a = this._spec.maskShape) && void 0 !== _a ? _a : "circle", size),
                    fill: !0
                });
            }
            return [ symbolPath ];
        };
    }
    setValueField(field) {
        (0, vutils_1.isValid)(field) && (this._valueField = field);
    }
    getValueField() {
        return this._valueField;
    }
    setAttrFromSpec() {
        var _a, _b;
        super.setAttrFromSpec(), this._marginSpec = (0, util_2.normalizeLayoutPaddingSpec)(this._spec.outlineMargin), 
        this._paddingSpec = (0, util_2.normalizeLayoutPaddingSpec)(this._spec.outlinePadding), 
        this.setValueField(this._spec.valueField), this._reverse = null !== (_a = this._spec.reverse) && void 0 !== _a && _a, 
        this._maskShape = null !== (_b = this._spec.maskShape) && void 0 !== _b ? _b : "circle";
    }
    viewDataUpdate(d) {
        super.viewDataUpdate(d), this._heightRatio = (0, vutils_1.max)(...this._data.getLatestData().map((d => d[this._valueField])));
    }
    initMark() {
        this._initLiquidOutlineMark(), this._initLiquidBackgroundMark(), this._initLiquidMark();
    }
    initMarkStyle() {
        this._initLiquidOutlineMarkStyle(), this._initLiquidBackgroundMarkStyle(), this._initLiquidMarkStyle();
    }
    _initLiquidOutlineMark() {
        return this._liquidOutlineMark = this._createMark(LiquidSeries.mark.liquidOutline, {
            isSeriesMark: !0,
            skipBeforeLayouted: !1
        }), this._liquidOutlineMark;
    }
    _initLiquidBackgroundMark() {
        return this._liquidBackgroundMark = this._createMark(LiquidSeries.mark.liquidBackground, {
            isSeriesMark: !0,
            skipBeforeLayouted: !1
        }), this._liquidBackgroundMark;
    }
    _initLiquidMark() {
        return this._liquidGroupMark = this._createMark(LiquidSeries.mark.liquidGroup, {
            parent: this._liquidBackgroundMark,
            isSeriesMark: !0,
            skipBeforeLayouted: !1
        }), this._liquidMark = this._createMark(LiquidSeries.mark.liquid, {
            parent: this._liquidGroupMark,
            isSeriesMark: !0,
            skipBeforeLayouted: !1
        }), this._liquidMark;
    }
    _buildMarkAttributeContext() {
        super._buildMarkAttributeContext(), this._markAttributeContext.getLiquidBackPosAndSize = this._getLiquidBackPosAndSize, 
        this._markAttributeContext.getLiquidPosY = this._getLiquidPosY, this._markAttributeContext.getLiquidHeight = this._getLiquidHeight;
    }
    _initLiquidOutlineMarkStyle() {
        const liquidOutlineMark = this._liquidOutlineMark;
        liquidOutlineMark.created(), this.setMarkStyle(liquidOutlineMark, {
            stroke: this.getColorAttribute(),
            width: () => this._region.getLayoutRect().width,
            height: () => this._region.getLayoutRect().height,
            path: () => this._getLiquidBackPath(!0)
        }, "normal", attribute_1.AttributeLevel.Series), this._liquidOutlineMark.setMarkConfig({
            interactive: !1,
            zIndex: this.layoutZIndex
        });
    }
    _initLiquidBackgroundMarkStyle() {
        const liquidBackgroundMark = this._liquidBackgroundMark;
        liquidBackgroundMark.created(), this.setMarkStyle(liquidBackgroundMark, {
            width: () => this._region.getLayoutRect().width,
            height: () => this._region.getLayoutRect().height,
            path: () => this._getLiquidBackPath()
        }, "normal", attribute_1.AttributeLevel.Series), this._liquidBackgroundMark.setMarkConfig({
            interactive: !1,
            zIndex: this.layoutZIndex,
            clip: !0
        });
    }
    _initLiquidMarkStyle() {
        const liquidMark = this._liquidMark, liquidGroupMark = this._liquidGroupMark;
        liquidGroupMark && this.setMarkStyle(liquidGroupMark, {
            x: () => this._region.getLayoutStartPoint().x + this._region.getLayoutRect().width / 2,
            angle: this._reverse ? -Math.PI : 0,
            y: 0,
            dy: this._getLiquidPosY
        }), liquidMark && this.setMarkStyle(liquidMark, {
            y: 0,
            dy: 0,
            height: this._getLiquidHeight,
            fill: this.getColorAttribute(),
            wave: 0
        }, "normal", attribute_1.AttributeLevel.Series);
    }
    initTooltip() {
        this._tooltipHelper = new tooltip_helper_1.LiquidSeriesTooltipHelper(this), this._liquidMark && this._tooltipHelper.activeTriggerSet.mark.add(this._liquidMark);
    }
    initInteraction() {
        this._parseInteractionConfig(this._liquidMark ? [ this._liquidMark ] : []);
    }
    initAnimation() {
        var _a, _b, _c, _d;
        const animationParams = {
            height: {
                from: 0,
                to: () => this._getLiquidHeight()
            },
            dy: {
                from: () => {
                    let liquidY = 0;
                    const {height: liquidBackHeight, startY: startY} = this._getLiquidBackPosAndSize();
                    return liquidY = this._reverse ? 0 : liquidBackHeight, liquidY + startY;
                }
            }
        }, appearPreset = null === (_b = null === (_a = this._spec) || void 0 === _a ? void 0 : _a.animationAppear) || void 0 === _b ? void 0 : _b.preset;
        this._liquidMark.setAnimationConfig((0, utils_1.animationConfig)(null === (_c = factory_1.Factory.getAnimationInKey("liquid")) || void 0 === _c ? void 0 : _c(animationParams, appearPreset), (0, 
        utils_1.userAnimationConfig)("liquid", this._spec, this._markAttributeContext))), 
        this._liquidGroupMark.setAnimationConfig((0, utils_1.animationConfig)(null === (_d = factory_1.Factory.getAnimationInKey("liquidGroup")) || void 0 === _d ? void 0 : _d(animationParams, appearPreset), (0, 
        utils_1.userAnimationConfig)("liquidGroup", this._spec, this._markAttributeContext)));
    }
    initEvent() {
        super.initEvent(), this._spec.indicatorSmartInvert && this._option.getChart().getComponentsByKey("indicator") && this.event.on(event_1.ChartEvent.renderFinished, (() => {
            this._option.getChart().getComponentsByKey("indicator").forEach((indicatorComponent => {
                var _a, _b;
                const waveItem = this._liquidMark.getProduct().elements[0].glyphGraphicItems.wave1;
                let {y1: waveY1, y2: waveY2} = waveItem.globalAABBBounds;
                waveY1 += this._region.getLayoutStartPoint().y, waveY2 += this._region.getLayoutStartPoint().y, 
                null === (_b = null === (_a = null == indicatorComponent ? void 0 : indicatorComponent.getIndicatorComponent()) || void 0 === _a ? void 0 : _a.getChildren()[0]) || void 0 === _b || _b.getChildren().forEach((text => {
                    const {y1: textY1, y2: textY2} = text.globalAABBBounds;
                    if (waveY1 < textY1 && waveY2 > textY2) {
                        const foregroundColor = text.attribute.fill, backgroundColor = waveItem.attribute.fill, invertColor = (0, 
                        vrender_components_1.labelSmartInvert)(foregroundColor, backgroundColor);
                        text.setAttribute("fill", invertColor);
                    }
                }));
            }));
        }));
    }
    dataToPosition(data) {
        return null;
    }
    dataToPositionX(data) {
        return null;
    }
    dataToPositionY(data) {
        return null;
    }
    valueToPosition(value1, value2) {
        return null;
    }
    getStatisticFields() {
        return [];
    }
    getGroupFields() {
        return [];
    }
    getStackGroupFields() {
        return [];
    }
    getStackValueField() {
        return "";
    }
    getActiveMarks() {
        return [ this._liquidMark ];
    }
}

exports.LiquidSeries = LiquidSeries, LiquidSeries.type = type_1.SeriesTypeEnum.liquid, 
LiquidSeries.mark = constant_1.LiquidSeriesMark, LiquidSeries.transformerConstructor = line_mixin_transformer_1.LineLikeSeriesSpecTransformer;

const registerLiquidSeries = () => {
    (0, liquid_1.registerLiquidMark)(), (0, group_1.registerGroupMark)(), (0, animation_1.registerLiquidAnimation)(), 
    factory_1.Factory.registerSeries(LiquidSeries.type, LiquidSeries);
};

exports.registerLiquidSeries = registerLiquidSeries;
//# sourceMappingURL=liquid.js.map
