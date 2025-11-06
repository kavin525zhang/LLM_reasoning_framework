"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.LineLikeSeriesMixin = void 0;

const base_1 = require("../../constant/base"), vdataset_1 = require("@visactor/vdataset"), event_1 = require("../../constant/event"), attribute_1 = require("../../constant/attribute"), interpolate_1 = require("../../typings/interpolate"), line_stroke_1 = require("../../typings/line-stroke"), utils_1 = require("../../animation/utils"), dimension_1 = require("../../event/events/dimension"), interface_1 = require("../../compile/mark/interface"), constant_1 = require("./constant"), vutils_extension_1 = require("@visactor/vutils-extension");

class LineLikeSeriesMixin {
    addSamplingCompile() {
        if (this._spec.sampling) {
            const {width: width, height: height} = this._region.getLayoutRect(), samplingTrans = [], fieldsY = this._fieldY, fieldsX = this._fieldX;
            samplingTrans.push({
                type: "sampling",
                size: "horizontal" === this._direction ? height : width,
                factor: this._spec.samplingFactor,
                yfield: "horizontal" === this._direction ? fieldsX[0] : fieldsY[0],
                groupBy: this._seriesField,
                mode: this._spec.sampling
            }), this._data.getProduct().transform(samplingTrans);
        }
    }
    addOverlapCompile() {
        var _a;
        if (this._spec.markOverlap) {
            const overlapTrans = [];
            overlapTrans.push({
                type: "markoverlap",
                direction: "horizontal" === this._direction && "cartesian" === this.coordinate ? 2 : 1,
                delta: this._spec.pointDis,
                deltaMul: this._spec.pointDisMul,
                groupBy: this._seriesField
            }), null === (_a = this._symbolMark) || void 0 === _a || _a.getProduct().transform(overlapTrans);
        }
    }
    reCompileSampling() {
        this._spec.sampling && this.compile();
    }
    initLineMark(progressive, isSeriesMark) {
        var _a, _b;
        return this._lineMark = this._createMark(constant_1.lineLikeSeriesMark.line, {
            groupKey: this._seriesField,
            isSeriesMark: null == isSeriesMark || isSeriesMark,
            stateSort: null === (_a = this._spec.line) || void 0 === _a ? void 0 : _a.stateSort
        }, Object.assign(Object.assign({}, progressive), {
            setCustomizedShape: null === (_b = this._spec.line) || void 0 === _b ? void 0 : _b.customShape,
            morphElementKey: this.getDimensionField()[0]
        })), this._lineMark;
    }
    initLineMarkStyle(direction, areaCurveType) {
        var _a, _b;
        const lineMark = this._lineMark;
        if (lineMark) {
            if (this.setMarkStyle(lineMark, {
                stroke: this.getColorAttribute()
            }, "normal", attribute_1.AttributeLevel.Series), "zero" !== this._invalidType && this.setMarkStyle(lineMark, {
                defined: this._getInvalidDefined.bind(this),
                connectedType: this._getInvalidConnectType()
            }, "normal", attribute_1.AttributeLevel.Series), this.event.on(event_1.ChartEvent.viewDataStatisticsUpdate, {
                filter: param => param.model === this
            }, (() => {
                this.encodeDefined(lineMark, "defined");
            })), "polar" === this.coordinate) this.setMarkStyle(lineMark, {
                lineJoin: line_stroke_1.DEFAULT_CLOSE_STROKE_JOIN,
                curveType: interpolate_1.DEFAULT_LINEAR_INTERPOLATE,
                closePath: !0
            }, "normal", attribute_1.AttributeLevel.Series); else {
                const userCurveType = null != areaCurveType ? areaCurveType : null === (_b = null === (_a = this.getSpec().line) || void 0 === _a ? void 0 : _a.style) || void 0 === _b ? void 0 : _b.curveType, curveType = userCurveType === interpolate_1.DEFAULT_SMOOTH_INTERPOLATE ? "horizontal" === direction ? "monotoneY" : "monotoneX" : userCurveType;
                this.setMarkStyle(lineMark, {
                    curveType: curveType
                }, "normal", attribute_1.AttributeLevel.Built_In);
            }
            this.setMarkStyle(lineMark, {
                x: this.dataToPositionX.bind(this),
                y: this.dataToPositionY.bind(this),
                z: this._fieldZ ? this.dataToPositionZ.bind(this) : null
            }, "normal", attribute_1.AttributeLevel.Series);
        }
        return lineMark;
    }
    _getEventElement(params, reverse = !1) {
        let data = [];
        return params.dimensionInfo.some((df => (df.data.some((dd => dd.series === this && (data = dd.datum, 
        !0))), !data.length))), data;
    }
    _dimensionTrigger(params) {
        const elements = this._getEventElement(params);
        switch (params.action) {
          case "enter":
            this._symbolActiveMark.getDataView().parse(elements), this._symbolActiveMark.getData().updateData(!1);
            break;

          case "leave":
            this._symbolActiveMark.getDataView().parse([]), this._symbolActiveMark.getData().updateData(!1);
        }
    }
    initSymbolMark(progressive, isSeriesMark) {
        const pointSpec = this._spec.point || {};
        if (!1 !== pointSpec.visible && (this._symbolMark = this._createMark(constant_1.lineLikeSeriesMark.point, {
            groupKey: this._seriesField,
            isSeriesMark: !!isSeriesMark,
            stateSort: pointSpec.stateSort
        }, Object.assign(Object.assign({}, progressive), {
            setCustomizedShape: pointSpec.customShape,
            morph: (0, utils_1.shouldMarkDoMorph)(this._spec, constant_1.lineLikeSeriesMark.point.name),
            morphElementKey: this.getDimensionField()[0]
        }))), !0 === this._spec.activePoint) {
            const activeData = new vdataset_1.DataView(this._option.dataSet, {
                name: `${base_1.PREFIX}_series_${this.id}_active_point`
            });
            activeData.parse([]), this._symbolActiveMark = this._createMark({
                name: `active_point_${this.id}`,
                type: "symbol"
            }, {
                groupKey: this._seriesField,
                isSeriesMark: !1,
                dataView: activeData,
                parent: this._region.getInteractionMark(),
                stateSort: pointSpec.stateSort
            }, {
                setCustomizedShape: pointSpec.customShape,
                morph: !1
            }), this._symbolActiveMark.setVisible(!1);
        }
        return this._symbolMark;
    }
    initSymbolMarkStyle() {
        const symbolMark = this._symbolMark;
        if (!symbolMark) return this._initSymbolActiveMarkAlone(), symbolMark;
        if (this._initSymbolMark(symbolMark), this._symbolActiveMark && this._symbolMark.stateStyle.dimension_hover) {
            this._symbolActiveMark.setVisible(!0), this.event.on(dimension_1.DimensionEventEnum.dimensionHover, this._dimensionTrigger.bind(this));
            for (const state in this._symbolMark.stateStyle) {
                this._symbolActiveMark.stateStyle[state] = {};
                for (const key in this._symbolMark.stateStyle[state]) "visible" !== key && (this._symbolActiveMark.stateStyle[state][key] = {
                    style: null,
                    level: attribute_1.AttributeLevel.Series,
                    referer: symbolMark
                });
            }
            this._symbolActiveMark.state.changeStateInfo({
                stateValue: interface_1.STATE_VALUE_ENUM.STATE_DIMENSION_HOVER,
                filter: () => !0
            });
        }
        return symbolMark;
    }
    _initSymbolMark(symbolMark) {
        symbolMark && (this.setMarkStyle(symbolMark, {
            fill: this.getColorAttribute()
        }, "normal", attribute_1.AttributeLevel.Series), this.setMarkStyle(symbolMark, {
            x: datum => "zero" === this._invalidType || this._getInvalidDefined(datum) ? this.dataToPositionX(datum) : Number.NaN,
            y: datum => "zero" === this._invalidType || this._getInvalidDefined(datum) ? this.dataToPositionY(datum) : Number.NaN,
            z: this._fieldZ ? this.dataToPositionZ.bind(this) : null
        }, "normal", attribute_1.AttributeLevel.Series));
    }
    _initSymbolActiveMarkAlone() {
        var _a, _b;
        const symbolMark = this._symbolActiveMark;
        symbolMark && (this._initSymbolMark(symbolMark), symbolMark && (null === (_b = null === (_a = this._spec[constant_1.lineLikeSeriesMark.point.name]) || void 0 === _a ? void 0 : _a.state) || void 0 === _b ? void 0 : _b.dimension_hover) && (symbolMark.setVisible(!0), 
        this.event.on(dimension_1.DimensionEventEnum.dimensionHover, this._dimensionTrigger.bind(this)), 
        this.initMarkStyleWithSpec(symbolMark, (0, vutils_extension_1.mergeSpec)({}, this._spec[constant_1.lineLikeSeriesMark.point.name], {
            visible: !0
        })), this._symbolActiveMark.state.changeStateInfo({
            stateValue: interface_1.STATE_VALUE_ENUM.STATE_DIMENSION_HOVER,
            filter: () => !0
        })));
    }
    initLabelMarkStyle(labelMark) {
        var _a;
        labelMark && ("symbol" !== (null === (_a = labelMark.getTarget()) || void 0 === _a ? void 0 : _a.type) && labelMark.setRule("line-data"), 
        this.setMarkStyle(labelMark, {
            fill: this.getColorAttribute(),
            text: datum => datum[this.getStackValueField()],
            z: this._fieldZ ? this.dataToPositionZ.bind(this) : null
        }), "zero" !== this._invalidType && this.setMarkStyle(labelMark, {
            visible: this._getInvalidDefined.bind(this)
        }, "normal", attribute_1.AttributeLevel.Series), this.event.on(event_1.ChartEvent.viewDataStatisticsUpdate, {
            filter: param => param.model === this
        }, (() => {
            this.encodeDefined(labelMark, "visible");
        })));
    }
    initLineLabelMarkStyle(labelMark) {
        labelMark && this.setMarkStyle(labelMark, {
            fill: this.getColorAttribute(),
            text: datum => {
                var _a;
                return null !== (_a = datum[this.getSeriesField()]) && void 0 !== _a ? _a : this.getSeriesKeys()[0];
            },
            z: this._fieldZ ? this.dataToPositionZ.bind(this) : null
        });
    }
    encodeDefined(mark, attr) {
        var _a, _b, _c, _d;
        if (!mark) return;
        const allValid = this._isFieldAllValid();
        if ("zero" === this._invalidType || allValid) {
            if (!0 === (null === (_b = null === (_a = mark.stateStyle.normal) || void 0 === _a ? void 0 : _a[attr]) || void 0 === _b ? void 0 : _b.style)) return;
            this.setMarkStyle(mark, {
                [attr]: !0
            }, "normal", attribute_1.AttributeLevel.Series);
        } else {
            if (!0 !== (null === (_d = null === (_c = mark.stateStyle.normal) || void 0 === _c ? void 0 : _c[attr]) || void 0 === _d ? void 0 : _d.style)) return;
            this.setMarkStyle(mark, {
                [attr]: this._getInvalidDefined.bind(this)
            }, "normal", attribute_1.AttributeLevel.Series);
        }
        mark.getProduct() && mark.compileEncode();
    }
    _isFieldAllValid() {
        const viewStatistics = this.getViewDataStatistics(), field = this.getStackValueField();
        return !!(viewStatistics && viewStatistics.latestData && field) && (viewStatistics.latestData[field] && viewStatistics.latestData[field].allValid);
    }
}

exports.LineLikeSeriesMixin = LineLikeSeriesMixin;
//# sourceMappingURL=line-mixin.js.map
