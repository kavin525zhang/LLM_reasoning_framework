"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.StackChartMixin = exports.Stack = void 0;

const event_1 = require("../constant/event"), util_1 = require("../util"), register_1 = require("../data/register"), stack_split_1 = require("../data/transforms/stack-split");

class Stack {
    constructor(chart, options) {
        this.stackRegion = ({model: model}) => {
            var _a;
            const series = model.getSeries();
            if (!series.some((s => s.getStack()))) return;
            const hasTotalLabel = series.some((s => {
                var _a, _b, _c, _d;
                return !!(null === (_b = null === (_a = s.getSpec()) || void 0 === _a ? void 0 : _a.totalLabel) || void 0 === _b ? void 0 : _b.alwayCalculateTotal) || (null === (_d = null === (_c = s.getSpec()) || void 0 === _c ? void 0 : _c.totalLabel) || void 0 === _d ? void 0 : _d.visible);
            })), hasPercent = hasTotalLabel || series.some((s => s.getPercent())), hasOffsetSilhouette = series.some((s => s.getStackOffsetSilhouette())), stackValueGroup = (0, 
            util_1.getRegionStackGroup)(model, !0);
            for (const stackValue in stackValueGroup) for (const key in stackValueGroup[stackValue].nodes) (0, 
            util_1.stack)(stackValueGroup[stackValue].nodes[key], model.getStackInverse(), hasPercent, hasTotalLabel);
            if (hasOffsetSilhouette) for (const stackValue in stackValueGroup) for (const key in stackValueGroup[stackValue].nodes) (0, 
            util_1.stackOffsetSilhouette)(stackValueGroup[stackValue].nodes[key]);
            hasTotalLabel && model.getSeries().forEach((s => {
                const stackData = s.getStackData(), stackValue = s.getStackValue(), stackValueField = s.getStackValueField();
                stackData && stackValueField && (0, util_1.stackTotal)(stackValueGroup[stackValue], stackValueField);
            })), (null === (_a = this._options) || void 0 === _a ? void 0 : _a.afterStackRegion) && this._options.afterStackRegion(model, stackValueGroup);
        }, this._chart = chart, this._options = options;
    }
    init() {
        this._chart.getAllRegions().forEach((r => {
            r.event.on(event_1.ChartEvent.regionSeriesDataFilterOver, {
                filter: ({model: model}) => (null == model ? void 0 : model.id) === r.id
            }, this.stackRegion);
        }));
    }
    stackAll() {
        this._chart.getAllRegions().forEach((r => {
            this.stackRegion({
                model: r
            });
        }));
    }
}

exports.Stack = Stack;

class StackChartMixin {
    _beforeInit() {
        this._dataSet && (0, register_1.registerDataSetInstanceTransform)(this._dataSet, "stackSplit", stack_split_1.stackSplit);
    }
    _initStack() {
        this._stack = new Stack(this), this._stack.init();
    }
}

exports.StackChartMixin = StackChartMixin;
//# sourceMappingURL=stack.js.map