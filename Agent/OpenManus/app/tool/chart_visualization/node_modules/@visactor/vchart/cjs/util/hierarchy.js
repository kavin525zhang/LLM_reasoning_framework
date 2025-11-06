"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.filterHierarchyDataByRange = exports.isHierarchyItem = exports.findHierarchyPath = exports.findHierarchyNodeParent = exports.findHierarchyNode = void 0;

const vutils_1 = require("@visactor/vutils"), findHierarchyNode = (hierarchyData, key, keyField = "key", childrenField = "children") => {
    for (let i = 0; i < hierarchyData.length; i++) {
        const node = hierarchyData[i];
        if (node[keyField] === key) return node;
        if (node[childrenField]) {
            const result = (0, exports.findHierarchyNode)(node[childrenField], key, keyField, childrenField);
            if (result) return result;
        }
    }
    return null;
};

exports.findHierarchyNode = findHierarchyNode;

const findHierarchyNodeParent = (hierarchyData, key, keyField = "key", childrenField = "children") => {
    for (let i = 0; i < hierarchyData.length; i++) {
        const node = hierarchyData[i];
        if (node[childrenField]) for (let j = 0; j < node[childrenField].length; j++) {
            const childNode = node[childrenField][j];
            if (childNode[keyField] === key) return node;
            const result = (0, exports.findHierarchyNodeParent)([ childNode ], key, keyField, childrenField);
            if (result) return result;
        }
    }
    return null;
};

exports.findHierarchyNodeParent = findHierarchyNodeParent;

const findHierarchyPath = (hierarchyData, key, keyField = "key", childrenField = "children") => {
    const result = [], dfs = (data, path) => {
        for (const item of data) {
            if (item[keyField] === key) return result.push(...path, item[keyField].toString()), 
            !0;
            if (item[childrenField]) {
                const res = dfs(item[childrenField], [ ...path, item[keyField] ]);
                if (!0 === res) return res;
            }
        }
        return !1;
    };
    return dfs(hierarchyData, []), result;
};

function isHierarchyItem(item, valueField = "value", childrenField = "children") {
    return !!(0, vutils_1.isObject)(item) && (!!item.hasOwnProperty(childrenField) && Array.isArray(item[childrenField]));
}

function filterHierarchyDataByRange(data, minValue, maxValue, valueField = "value", childrenField = "children") {
    return Array.isArray(data) ? data.map((item => {
        const newItem = Object.assign({}, item);
        return Array.isArray(newItem[childrenField]) && (newItem[childrenField] = filterHierarchyDataByRange(newItem[childrenField], minValue, maxValue, valueField, childrenField)), 
        newItem;
    })).filter((item => +item[valueField] >= minValue && +item[valueField] <= maxValue || item[childrenField] && item[childrenField].length > 0)) : data;
}

exports.findHierarchyPath = findHierarchyPath, exports.isHierarchyItem = isHierarchyItem, 
exports.filterHierarchyDataByRange = filterHierarchyDataByRange;
//# sourceMappingURL=hierarchy.js.map
