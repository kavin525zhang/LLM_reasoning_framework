import { DEFAULT_HIERARCHY_DEPTH, DEFAULT_HIERARCHY_ROOT } from "../../constant/hierarchy";

export const appendHierarchyFields = (fields, catField, valueField) => (fields.push({
    key: catField,
    operations: [ "values" ]
}), fields.push({
    key: valueField,
    operations: [ "max", "min" ]
}), fields.push({
    key: DEFAULT_HIERARCHY_DEPTH,
    operations: [ "max", "min", "values" ]
}), fields.push({
    key: DEFAULT_HIERARCHY_ROOT,
    operations: [ "values" ]
}), fields);
//# sourceMappingURL=hierarchy.js.map
