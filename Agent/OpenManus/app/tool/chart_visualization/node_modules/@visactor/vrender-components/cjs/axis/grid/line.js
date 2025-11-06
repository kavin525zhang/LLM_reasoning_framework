"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.LineAxisGrid = void 0;

const vutils_1 = require("@visactor/vutils"), base_1 = require("./base"), constant_1 = require("../../constant"), line_1 = require("../mixin/line"), register_1 = require("../register"), util_1 = require("../util");

(0, register_1.loadLineAxisGridComponent)();

class LineAxisGrid extends base_1.BaseGrid {
    constructor(attributes, options) {
        super((null == options ? void 0 : options.skipDefault) ? attributes : (0, vutils_1.merge)({}, base_1.BaseGrid.defaultAttributes, attributes), options);
    }
    _getGridPoint(gridType, point) {
        let gridPoints;
        if ("line" === gridType) {
            const {length: length} = this.attribute;
            gridPoints = [ point, this.getVerticalCoord(point, length, !0) ];
        } else if ("circle" === gridType || "polygon" === gridType) {
            const {center: center, sides: sides = 6, startAngle: startAngle = constant_1.POLAR_START_ANGLE, endAngle: endAngle = constant_1.POLAR_END_ANGLE} = this.attribute, distance = vutils_1.PointService.distancePP(center, point);
            gridPoints = (0, util_1.getCirclePoints)(center, sides, distance, startAngle, endAngle);
        }
        return gridPoints;
    }
    getGridPointsByValue(value) {
        const basePoint = this.getTickCoord(value);
        return this._getGridPoint(this.attribute.type, basePoint);
    }
    getGridAttribute(isSubGrid) {
        const {type: gridType, alignWithLabel: alignWithLabel = !0} = this.attribute, tickSegment = this._parseTickSegment();
        let gridAttribute, items = [];
        if (isSubGrid) {
            gridAttribute = (0, vutils_1.merge)({}, this.attribute, this.attribute.subGrid);
            const subGridItems = [], {count: subCount = 4} = gridAttribute;
            if (this.data.length >= 2) {
                const points = this._getPointsOfSubGrid(tickSegment, alignWithLabel);
                for (let i = 0; i < points.length - 1; i++) {
                    const pre = points[i], next = points[i + 1];
                    subGridItems.push({
                        id: `sub-${i}-0`,
                        points: this.getGridPointsByValue(pre.value),
                        datum: {}
                    });
                    for (let j = 0; j < subCount; j++) {
                        const percent = (j + 1) / (subCount + 1), value = (1 - percent) * pre.value + percent * next.value;
                        subGridItems.push({
                            id: `sub-${i}-${j + 1}`,
                            points: this.getGridPointsByValue(value),
                            datum: {}
                        });
                    }
                    i === points.length - 2 && subGridItems.push({
                        id: `sub-${i}-${subCount + 1}`,
                        points: this.getGridPointsByValue(next.value),
                        datum: {}
                    });
                }
                items = subGridItems;
            }
        } else {
            gridAttribute = this.attribute;
            const gridItems = [];
            this.data.forEach((item => {
                let {point: point} = item;
                if (!alignWithLabel) {
                    const value = item.value - tickSegment / 2;
                    if (this.isInValidValue(value)) return;
                    point = this.getTickCoord(value);
                }
                gridItems.push({
                    id: item.label,
                    datum: item,
                    points: this._getGridPoint(gridType, point)
                });
            })), items = gridItems;
        }
        return Object.assign(Object.assign({}, gridAttribute), {
            items: items
        });
    }
}

exports.LineAxisGrid = LineAxisGrid, (0, vutils_1.mixin)(LineAxisGrid, line_1.LineAxisMixin);
//# sourceMappingURL=line.js.map
