"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerCartesianTimeAxis = exports.CartesianTimeAxis = void 0;

const vdataset_1 = require("@visactor/vdataset"), common_1 = require("./util/common"), vutils_1 = require("@visactor/vutils"), model_1 = require("../../../util/model"), linear_axis_1 = require("./linear-axis"), type_1 = require("../../interface/type"), compilable_data_1 = require("../../../compile/data/compilable-data"), factory_1 = require("../../../core/factory"), base_axis_1 = require("../base-axis"), util_1 = require("../util"), vutils_extension_1 = require("@visactor/vutils-extension"), vgrammar_core_1 = require("@visactor/vgrammar-core"), vrender_components_1 = require("@visactor/vrender-components"), register_1 = require("../../../data/register");

class CartesianTimeAxis extends linear_axis_1.CartesianLinearAxis {
    constructor() {
        super(...arguments), this.type = type_1.ComponentTypeEnum.cartesianTimeAxis, this._zero = !1, 
        this.effect = {
            scaleUpdate: params => {
                this.computeData(null == params ? void 0 : params.value), (0, model_1.eachSeries)(this._regions, (s => {
                    (0, common_1.isXAxis)(this.getOrient()) ? (0, util_1.shouldUpdateAxis)(s.getXAxisHelper(), this.axisHelper(), (0, 
                    vutils_1.isValid)(this._seriesUserId) || (0, vutils_1.isValid)(this._seriesIndex)) && s.setXAxisHelper(this.axisHelper()) : (0, 
                    util_1.shouldUpdateAxis)(s.getYAxisHelper(), this.axisHelper(), (0, vutils_1.isValid)(this._seriesUserId) || (0, 
                    vutils_1.isValid)(this._seriesIndex)) && s.setYAxisHelper(this.axisHelper());
                }), {
                    userId: this._seriesUserId,
                    specIndex: this._seriesIndex
                });
            }
        };
    }
    setAttrFromSpec() {
        var _a;
        super.setAttrFromSpec(), this._tick = (0, vutils_extension_1.mergeSpec)({}, this._spec.tick, null === (_a = this._spec.layers) || void 0 === _a ? void 0 : _a[0]);
    }
    _initData() {
        var _a;
        if (super._initData(), null === (_a = this._spec.layers) || void 0 === _a ? void 0 : _a[1]) {
            const layerTickData = new vdataset_1.DataView(this._option.dataSet, {
                name: `${this.type}_${this.id}_layer_1_ticks`
            }).parse(this._scale, {
                type: "scale"
            }).transform({
                type: `${this.type}-ticks`,
                options: Object.assign(Object.assign({}, this._tickTransformOption()), {
                    tickCount: this._spec.layers[1].tickCount,
                    forceTickCount: this._spec.layers[1].forceTickCount,
                    tickStep: this._spec.layers[1].tickStep
                })
            }, !1);
            this._layerTickData = new compilable_data_1.CompilableData(this._option, layerTickData);
        }
    }
    computeData(updateType) {
        super.computeData(updateType), this._layerTickData && (this._layerTickData.getDataView().reRunAllTransform(), 
        this._layerTickData.updateData());
    }
    _getLabelFormatMethod() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const timeUtil = vutils_1.TimeUtil.getInstance(), timeFormat1 = (null === (_b = null === (_a = this._spec.layers) || void 0 === _a ? void 0 : _a[1]) || void 0 === _b ? void 0 : _b.timeFormat) || "%Y%m%d", timeFormatter1 = "local" === ((null === (_d = null === (_c = this._spec.layers) || void 0 === _c ? void 0 : _c[1]) || void 0 === _d ? void 0 : _d.timeFormatMode) || "local") ? timeUtil.timeFormat : timeUtil.timeUTCFormat, timeFormat0 = (null === (_f = null === (_e = this._spec.layers) || void 0 === _e ? void 0 : _e[0]) || void 0 === _f ? void 0 : _f.timeFormat) || "%Y%m%d", timeFormatter0 = "local" === ((null === (_h = null === (_g = this._spec.layers) || void 0 === _g ? void 0 : _g[0]) || void 0 === _h ? void 0 : _h.timeFormatMode) || "local") ? timeUtil.timeFormat : timeUtil.timeUTCFormat;
        return (value, datum, index, data, layer) => {
            var _a;
            let timeValue;
            return timeValue = 0 === layer ? timeFormatter0(timeFormat0, value) : timeFormatter1(timeFormat1, value), 
            (null === (_a = this._spec.label) || void 0 === _a ? void 0 : _a.formatMethod) ? this._spec.label.formatMethod(timeValue, datum) : timeValue;
        };
    }
    getLabelItems(length) {
        var _a, _b;
        const items = [], tickLatestData = null === (_a = this.getTickData()) || void 0 === _a ? void 0 : _a.getLatestData();
        tickLatestData && tickLatestData.length && items.push(tickLatestData.map((obj => (0, 
        util_1.getAxisItem)(obj.value, this._getNormalizedValue([ obj.value ], length)))));
        const layerLatestData = null === (_b = this._layerTickData) || void 0 === _b ? void 0 : _b.getLatestData();
        return layerLatestData && layerLatestData.length && items.push(layerLatestData.map((obj => (0, 
        util_1.getAxisItem)(obj.value, this._getNormalizedValue([ obj.value ], length))))), 
        items;
    }
    registerTicksTransform() {
        const name = `${this.type}-ticks`;
        return (0, register_1.registerDataSetInstanceTransform)(this._option.dataSet, name, vrender_components_1.continuousTicks), 
        name;
    }
    transformScaleDomain() {}
}

exports.CartesianTimeAxis = CartesianTimeAxis, CartesianTimeAxis.type = type_1.ComponentTypeEnum.cartesianTimeAxis, 
CartesianTimeAxis.specKey = "axes";

const registerCartesianTimeAxis = () => {
    (0, vgrammar_core_1.registerLineAxis)(), (0, vgrammar_core_1.registerLineGrid)(), 
    (0, base_axis_1.registerAxis)(), factory_1.Factory.registerComponent(CartesianTimeAxis.type, CartesianTimeAxis);
};

exports.registerCartesianTimeAxis = registerCartesianTimeAxis;
//# sourceMappingURL=time-axis.js.map
