import { ChartEvent } from "../constant/event";

import { getRegionStackGroup, stack, stackOffsetSilhouette, stackTotal } from "../util";

import { registerDataSetInstanceTransform } from "../data/register";

import { stackSplit } from "../data/transforms/stack-split";

export class Stack {
    constructor(chart, options) {
        this.stackRegion = ({model: model}) => {
            var _a;
            const series = model.getSeries();
            if (!series.some((s => s.getStack()))) return;
            const hasTotalLabel = series.some((s => {
                var _a, _b, _c, _d;
                return !!(null === (_b = null === (_a = s.getSpec()) || void 0 === _a ? void 0 : _a.totalLabel) || void 0 === _b ? void 0 : _b.alwayCalculateTotal) || (null === (_d = null === (_c = s.getSpec()) || void 0 === _c ? void 0 : _c.totalLabel) || void 0 === _d ? void 0 : _d.visible);
            })), hasPercent = hasTotalLabel || series.some((s => s.getPercent())), hasOffsetSilhouette = series.some((s => s.getStackOffsetSilhouette())), stackValueGroup = getRegionStackGroup(model, !0);
            for (const stackValue in stackValueGroup) for (const key in stackValueGroup[stackValue].nodes) stack(stackValueGroup[stackValue].nodes[key], model.getStackInverse(), hasPercent, hasTotalLabel);
            if (hasOffsetSilhouette) for (const stackValue in stackValueGroup) for (const key in stackValueGroup[stackValue].nodes) stackOffsetSilhouette(stackValueGroup[stackValue].nodes[key]);
            hasTotalLabel && model.getSeries().forEach((s => {
                const stackData = s.getStackData(), stackValue = s.getStackValue(), stackValueField = s.getStackValueField();
                stackData && stackValueField && stackTotal(stackValueGroup[stackValue], stackValueField);
            })), (null === (_a = this._options) || void 0 === _a ? void 0 : _a.afterStackRegion) && this._options.afterStackRegion(model, stackValueGroup);
        }, this._chart = chart, this._options = options;
    }
    init() {
        this._chart.getAllRegions().forEach((r => {
            r.event.on(ChartEvent.regionSeriesDataFilterOver, {
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

export class StackChartMixin {
    _beforeInit() {
        this._dataSet && registerDataSetInstanceTransform(this._dataSet, "stackSplit", stackSplit);
    }
    _initStack() {
        this._stack = new Stack(this), this._stack.init();
    }
}
//# sourceMappingURL=stack.js.map