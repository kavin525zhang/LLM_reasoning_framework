import { SankeyLayout } from "@visactor/vgrammar-sankey";

import { isArray, isNil } from "@visactor/vutils";

export const collectHierarchyField = (set, data, field) => {
    data.forEach((obj => {
        isNil(obj[field]) || set.add(obj[field]), obj.children && obj.children.length > 0 && collectHierarchyField(set, obj.children, field);
    }));
};

export const sankeyFormat = data => {
    var _a;
    if (!data || !isArray(data)) return [];
    if (data.length > 1) {
        const updateData = {
            links: [],
            nodes: []
        };
        return data.forEach((datum => {
            "links" !== datum.id && "nodes" !== datum.id || (updateData[datum.id] = datum.values);
        })), [ updateData ];
    }
    return (null === (_a = data[0]) || void 0 === _a ? void 0 : _a.latestData) ? data[0].latestData : data;
};

export const sankeyLayout = (data, op) => {
    if (!data || !(null == op ? void 0 : op.view) || !data.length) return [];
    const view = op.view();
    if (view.x1 - view.x0 == 0 || view.y1 - view.y0 == 0 || view.x1 - view.x0 == -1 / 0 || view.x1 - view.x0 == 1 / 0 || view.y1 - view.y0 == -1 / 0 || view.y1 - view.y0 == 1 / 0) return [];
    const originalData = data[0];
    if (("source" !== op.sourceField || "target" !== op.targetField || "value" !== op.valueField) && originalData.links) {
        const updatedData = [];
        originalData.links.forEach((datum => {
            const updatedDatum = {};
            for (const key in datum) key === op.sourceField ? updatedDatum.source = datum[op.sourceField] : key === op.targetField ? updatedDatum.target = datum[op.targetField] : key === op.valueField ? updatedDatum.value = datum[op.valueField] : updatedDatum[key] = datum[key];
            updatedData.push(updatedDatum);
        })), originalData.links = updatedData;
    }
    const layout = new SankeyLayout(op), result = [];
    return result.push(layout.layout(originalData, view)), result;
};
//# sourceMappingURL=sankey.js.map
