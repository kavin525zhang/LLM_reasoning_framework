"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.transformMark = exports.transform = void 0;

const utils_1 = require("./utils"), path_1 = require("./utils/path"), vutils_1 = require("@visactor/vutils"), transform = (options, upstreamData) => {
    const {x0: x0, x1: x1, y0: y0, y1: y1, setField: setField = "sets", valueField: valueField = "size", orientation: orientation = Math.PI / 2, orientationOrder: orientationOrder = null} = options;
    let circles = {}, textCenters = {};
    if (upstreamData.length > 0) {
        const vennData = upstreamData.map((area => ({
            sets: (0, vutils_1.array)(area[setField]),
            size: area[valueField]
        })));
        let solution = (0, utils_1.venn)(vennData, options);
        solution = (0, utils_1.normalizeSolution)(solution, orientation, orientationOrder), 
        circles = (0, utils_1.scaleSolution)(solution, x1 - x0, y1 - y0, x0, y0), textCenters = (0, 
        utils_1.computeTextCenters)(circles, vennData);
    }
    return upstreamData.map((area => {
        const sets = (0, vutils_1.array)(area[setField]), key = sets.toString(), textCenter = textCenters[key], basicDatum = Object.assign(Object.assign({}, area), {
            datum: area,
            sets: sets,
            key: key,
            size: area[valueField],
            labelX: null == textCenter ? void 0 : textCenter.x,
            labelY: null == textCenter ? void 0 : textCenter.y
        }), circle = circles[key];
        if (circle) return Object.assign(Object.assign({}, basicDatum), {
            type: "circle",
            x: circle.x,
            y: circle.y,
            radius: circle.radius
        });
        const arcs = (0, path_1.getArcsFromCircles)(sets.map((name => circles[name])));
        return Object.assign(Object.assign({}, basicDatum), {
            type: "overlap",
            x: 0,
            y: 0,
            path: (0, path_1.getPathFromArcs)(arcs),
            arcs: arcs
        });
    }));
};

exports.transform = transform;

const transformMark = (options, upstreamData) => upstreamData.filter((datum => datum.type === options.datumType));

exports.transformMark = transformMark;
//# sourceMappingURL=venn.js.map