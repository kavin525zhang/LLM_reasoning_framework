"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerRadarSeries = exports.RadarSeries = void 0;

const line_mixin_1 = require("../mixin/line-mixin"), polar_1 = require("../../constant/polar"), attribute_1 = require("../../constant/attribute"), event_1 = require("../../constant/event"), interpolate_1 = require("../../typings/interpolate"), type_1 = require("../interface/type"), vutils_1 = require("@visactor/vutils"), utils_1 = require("../../animation/utils"), animation_1 = require("./animation"), rose_like_1 = require("../polar/rose-like"), area_1 = require("../../mark/area"), line_1 = require("../../mark/line"), symbol_1 = require("../../mark/symbol"), constant_1 = require("./constant"), factory_1 = require("../../core/factory"), line_mixin_transformer_1 = require("../mixin/line-mixin-transformer"), polar_2 = require("../../component/axis/polar");

class RadarSeries extends rose_like_1.RoseLikeSeries {
    constructor() {
        super(...arguments), this.type = type_1.SeriesTypeEnum.radar, this.transformerConstructor = line_mixin_transformer_1.LineLikeSeriesSpecTransformer, 
        this._sortDataByAxis = !1;
    }
    initGroups() {}
    compile() {
        super.compile(), this.addOverlapCompile();
    }
    initMark() {
        var _a, _b, _c, _d;
        const progressive = {
            progressiveStep: this._spec.progressiveStep,
            progressiveThreshold: this._spec.progressiveThreshold,
            large: this._spec.large,
            largeThreshold: this._spec.largeThreshold
        }, isAreaVisible = !1 !== (null === (_a = this._spec.area) || void 0 === _a ? void 0 : _a.visible) && !1 !== (null === (_c = null === (_b = this._spec.area) || void 0 === _b ? void 0 : _b.style) || void 0 === _c ? void 0 : _c.visible), seriesMark = null !== (_d = this._spec.seriesMark) && void 0 !== _d ? _d : "area";
        this.initAreaMark(progressive, isAreaVisible && "area" === seriesMark), this.initLineMark(progressive, "line" === seriesMark || "area" === seriesMark && !isAreaVisible), 
        this.initSymbolMark(progressive, "point" === seriesMark);
    }
    initMarkStyle() {
        this.initAreaMarkStyle(), this.initLineMarkStyle(), this.initSymbolMarkStyle(), 
        [ this._lineMark, this._symbolMark, this._areaMark ].forEach((mark => {
            mark && this.setMarkStyle(mark, {
                center: () => {
                    var _a;
                    return null === (_a = this.angleAxisHelper) || void 0 === _a ? void 0 : _a.center();
                }
            });
        }));
    }
    initAreaMark(progressive, isSeriesMark) {
        var _a, _b;
        this._areaMark = this._createMark(RadarSeries.mark.area, {
            groupKey: this._seriesField,
            isSeriesMark: isSeriesMark,
            stateSort: null === (_a = this._spec.area) || void 0 === _a ? void 0 : _a.stateSort
        }, Object.assign(Object.assign({}, progressive), {
            setCustomizedShape: null === (_b = this._spec.area) || void 0 === _b ? void 0 : _b.customShape
        }));
    }
    initAreaMarkStyle() {
        const areaMark = this._areaMark;
        areaMark && (this.setMarkStyle(areaMark, {
            x: this.dataToPositionX.bind(this),
            y: this.dataToPositionY.bind(this),
            x1: datum => datum && this.angleAxisHelper && this.radiusAxisHelper ? this.valueToPosition(this.getDatumPositionValues(datum, this._angleField), this.getStack() ? this.getDatumPositionValues(datum, this._innerRadiusField) : this.radiusScale.domain()[0]).x : Number.NaN,
            y1: datum => {
                if (!datum || !this.angleAxisHelper || !this.radiusAxisHelper) return Number.NaN;
                return this.valueToPosition(this.getDatumPositionValues(datum, this._angleField), this.getStack() ? this.getDatumPositionValues(datum, this._innerRadiusField) : this.radiusScale.domain()[0]).y;
            },
            fill: this.getColorAttribute(),
            curveType: interpolate_1.DEFAULT_LINEAR_INTERPOLATE,
            closePath: !0
        }, "normal", attribute_1.AttributeLevel.Series), "zero" !== this._invalidType && this.setMarkStyle(areaMark, {
            defined: this._getInvalidDefined.bind(this),
            connectedType: this._getInvalidConnectType()
        }, "normal", attribute_1.AttributeLevel.Series), this.event.on(event_1.ChartEvent.viewDataStatisticsUpdate, {
            filter: param => param.model === this
        }, (() => {
            this.encodeDefined(areaMark, "defined");
        })));
    }
    initTooltip() {
        super.initTooltip();
        const {group: group, mark: mark} = this._tooltipHelper.activeTriggerSet;
        this._lineMark && group.add(this._lineMark), this._areaMark && group.add(this._areaMark), 
        this._symbolMark && (mark.add(this._symbolMark), group.add(this._symbolMark));
    }
    initAnimation() {
        var _a, _b, _c, _d;
        const animationParams = {
            center: () => {
                var _a;
                return null === (_a = this.angleAxisHelper) || void 0 === _a ? void 0 : _a.center();
            },
            radius: () => {
                const rect = this.getLayoutRect();
                return Math.min(rect.width, rect.height);
            },
            startAngle: (0, vutils_1.isValid)(this._spec.startAngle) ? (0, vutils_1.degreeToRadian)(this._spec.startAngle) : polar_1.POLAR_START_RADIAN
        }, appearPreset = null !== (_c = null === (_b = null === (_a = this._spec) || void 0 === _a ? void 0 : _a.animationAppear) || void 0 === _b ? void 0 : _b.preset) && void 0 !== _c ? _c : "clipIn";
        "clipIn" === appearPreset && this._rootMark && this._rootMark.setAnimationConfig((0, 
        utils_1.animationConfig)(null === (_d = factory_1.Factory.getAnimationInKey("radarGroup")) || void 0 === _d ? void 0 : _d(animationParams, appearPreset), (0, 
        utils_1.userAnimationConfig)("group", this._spec, this._markAttributeContext)));
        [ [ this._areaMark, "radar" ], [ this._lineMark, "radar" ], [ this._symbolMark, "radarSymbol" ] ].forEach((([mark, animation]) => {
            if ((0, vutils_1.isValid)(mark)) {
                const getAnimation = factory_1.Factory.getAnimationInKey(animation);
                mark.setAnimationConfig((0, utils_1.animationConfig)(null == getAnimation ? void 0 : getAnimation(animationParams, appearPreset), (0, 
                utils_1.userAnimationConfig)(mark.name, this._spec, this._markAttributeContext)));
            }
        }));
    }
    getDefaultShapeType() {
        return "square";
    }
    getActiveMarks() {
        return [ this._areaMark, this._symbolMark, this._lineMark ];
    }
    getSeriesStyle(datum) {
        return attribute => {
            var _a, _b, _c, _d;
            let result = null !== (_b = null === (_a = this._seriesMark) || void 0 === _a ? void 0 : _a.getAttribute(attribute, datum)) && void 0 !== _b ? _b : void 0;
            return "fill" !== attribute || result || (attribute = "stroke", result = null !== (_d = null === (_c = this._seriesMark) || void 0 === _c ? void 0 : _c.getAttribute(attribute, datum)) && void 0 !== _d ? _d : void 0), 
            "stroke" === attribute && (0, vutils_1.isArray)(result) ? result[0] : result;
        };
    }
}

exports.RadarSeries = RadarSeries, RadarSeries.type = type_1.SeriesTypeEnum.radar, 
RadarSeries.mark = constant_1.radarSeriesMark, RadarSeries.transformerConstructor = line_mixin_transformer_1.LineLikeSeriesSpecTransformer, 
(0, vutils_1.mixin)(RadarSeries, line_mixin_1.LineLikeSeriesMixin);

const registerRadarSeries = () => {
    factory_1.Factory.registerSeries(RadarSeries.type, RadarSeries), (0, area_1.registerAreaMark)(), 
    (0, line_1.registerLineMark)(), (0, symbol_1.registerSymbolMark)(), (0, animation_1.registerRadarAnimation)(), 
    (0, polar_2.registerPolarBandAxis)(), (0, polar_2.registerPolarLinearAxis)();
};

exports.registerRadarSeries = registerRadarSeries;
//# sourceMappingURL=radar.js.map
