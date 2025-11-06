"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.layoutCrosshair = exports.layoutByValue = void 0;

const util_1 = require("../../axis/util"), vutils_1 = require("@visactor/vutils"), util_2 = require("../../util"), layoutByValue = (stateByField, series, enableRemain = !1) => {
    Object.keys(stateByField).forEach((field => {
        const {attributes: attributes, currentValue: currentValue, cacheInfo: cacheInfo, coordKey: coordKey} = stateByField[field];
        if (attributes) {
            const isVisible = !!currentValue.size, useCache = enableRemain && !isVisible && (0, 
            vutils_1.isValid)(cacheInfo), newInfo = useCache ? cacheInfo : {
                coord: 0,
                axis: null,
                visible: isVisible,
                coordRange: [ 0, 0 ],
                sizeRange: [ 0, 0 ],
                labels: {
                    all: {
                        visible: !1,
                        text: "",
                        offset: 0
                    }
                }
            };
            if (cacheInfo && (cacheInfo._isCache = useCache), "valueField" === field && (newInfo.sides = series.angleAxisHelper.getScale(0).domain().length), 
            currentValue.forEach((({axis: axis, datum: value = ""}) => {
                var _a;
                const niceLabelFormatter = axis.niceLabelFormatter;
                if ((null === (_a = attributes.label) || void 0 === _a ? void 0 : _a.visible) && (newInfo.labels.all.visible = !0, 
                newInfo.labels.all.defaultFormatter = niceLabelFormatter, newInfo.labels.all.text = value, 
                newInfo.labels.all.offset = (0, util_1.getAxisLabelOffset)(axis.getSpec())), "categoryField" === field) {
                    const angle = series.angleAxisHelper.dataToPosition([ value ]), bandSize = series.angleAxisHelper.getBandwidth(0), radius = axis.getOuterRadius();
                    newInfo.coord = angle, newInfo.coordRange = [ angle - bandSize / 2, angle + bandSize / 2 ], 
                    newInfo.sizeRange = [ radius, radius ];
                } else {
                    const angle = axis.startAngle, radius = series.radiusAxisHelper.dataToPosition([ value ]);
                    newInfo.coord = radius, newInfo.coordRange = [ radius, radius ], newInfo.sizeRange = [ angle, angle ];
                }
                newInfo.axis = axis;
            })), newInfo && !useCache && newInfo.labels.all.visible && attributes && attributes.label) {
                const label = newInfo.labels.all, {formatMethod: formatMethod, formatter: formatter} = attributes.label, {formatFunc: formatFunc, args: args} = (0, 
                util_2.getFormatFunction)(formatMethod, formatter, label.text, {
                    label: label.text,
                    orient: coordKey
                });
                formatFunc ? label.text = formatFunc(...args) : label.defaultFormatter && (label.text = label.defaultFormatter(label.text));
            }
            stateByField[field].cacheInfo = newInfo;
        }
    }));
};

exports.layoutByValue = layoutByValue;

const layoutCrosshair = (stateItem, layoutStartPoint, smooth) => {
    const {cacheInfo: cacheInfo, coordKey: coordKey, attributes: attributes} = stateItem, {axis: axis, coord: coord, sizeRange: sizeRange, coordRange: coordRange} = cacheInfo, axisCenter = axis.getCenter(), center = {
        x: axisCenter.x + layoutStartPoint.x,
        y: axisCenter.y + layoutStartPoint.y
    };
    if ("angle" === coordKey) {
        return "sector" === ("rect" === attributes.type ? "sector" : "line") ? {
            center: center,
            innerRadius: axis.getInnerRadius(),
            radius: axis.getOuterRadius(),
            startAngle: coordRange[0],
            endAngle: coordRange[1]
        } : {
            start: (0, vutils_1.polarToCartesian)(center, axis.getInnerRadius(), coord),
            end: (0, vutils_1.polarToCartesian)(center, axis.getOuterRadius(), coord)
        };
    }
    const startAngle = axis.startAngle, endAngle = axis.endAngle, sides = cacheInfo.sides;
    let polygonRadius = coord;
    if (!smooth) {
        const axisCenter = axis.getCenter(), point = axis.coordToPoint({
            angle: sizeRange[0],
            radius: coord
        }), curAngle = (0, vutils_1.getAngleByPoint)(axisCenter, point), stepAngle = (endAngle - startAngle) / sides, index = Math.floor((curAngle - startAngle) / stepAngle), preAngle = index * stepAngle + startAngle, nextAngle = Math.min((index + 1) * stepAngle + startAngle, endAngle), prePoint = (0, 
        vutils_1.polarToCartesian)(axisCenter, coord, preAngle), nextPoint = (0, vutils_1.polarToCartesian)(axisCenter, coord, nextAngle), insertPoint = (0, 
        vutils_1.getIntersectPoint)([ nextPoint.x, nextPoint.y ], [ prePoint.x, prePoint.y ], [ axisCenter.x, axisCenter.y ], [ point.x, point.y ]);
        insertPoint && (polygonRadius = (0, vutils_1.clamp)(vutils_1.PointService.distancePN(point, insertPoint[0], insertPoint[1]) + coord, axis.getInnerRadius(), axis.getOuterRadius()));
    }
    return {
        center: center,
        startAngle: startAngle,
        endAngle: endAngle,
        radius: polygonRadius,
        sides: sides
    };
};

exports.layoutCrosshair = layoutCrosshair;
//# sourceMappingURL=polar.js.map
