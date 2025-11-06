"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.appendHierarchyFields = void 0;

const hierarchy_1 = require("../../constant/hierarchy"), appendHierarchyFields = (fields, catField, valueField) => (fields.push({
    key: catField,
    operations: [ "values" ]
}), fields.push({
    key: valueField,
    operations: [ "max", "min" ]
}), fields.push({
    key: hierarchy_1.DEFAULT_HIERARCHY_DEPTH,
    operations: [ "max", "min", "values" ]
}), fields.push({
    key: hierarchy_1.DEFAULT_HIERARCHY_ROOT,
    operations: [ "values" ]
}), fields);

exports.appendHierarchyFields = appendHierarchyFields;
//# sourceMappingURL=hierarchy.js.map
