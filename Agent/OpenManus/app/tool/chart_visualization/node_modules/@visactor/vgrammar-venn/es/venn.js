import { computeTextCenters, normalizeSolution, scaleSolution, venn } from "./utils";

import { getArcsFromCircles, getPathFromArcs } from "./utils/path";

import { array } from "@visactor/vutils";

export const transform = (options, upstreamData) => {
    const {x0: x0, x1: x1, y0: y0, y1: y1, setField: setField = "sets", valueField: valueField = "size", orientation: orientation = Math.PI / 2, orientationOrder: orientationOrder = null} = options;
    let circles = {}, textCenters = {};
    if (upstreamData.length > 0) {
        const vennData = upstreamData.map((area => ({
            sets: array(area[setField]),
            size: area[valueField]
        })));
        let solution = venn(vennData, options);
        solution = normalizeSolution(solution, orientation, orientationOrder), circles = scaleSolution(solution, x1 - x0, y1 - y0, x0, y0), 
        textCenters = computeTextCenters(circles, vennData);
    }
    return upstreamData.map((area => {
        const sets = array(area[setField]), key = sets.toString(), textCenter = textCenters[key], basicDatum = Object.assign(Object.assign({}, area), {
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
        const arcs = getArcsFromCircles(sets.map((name => circles[name])));
        return Object.assign(Object.assign({}, basicDatum), {
            type: "overlap",
            x: 0,
            y: 0,
            path: getPathFromArcs(arcs),
            arcs: arcs
        });
    }));
};

export const transformMark = (options, upstreamData) => upstreamData.filter((datum => datum.type === options.datumType));
//# sourceMappingURL=venn.js.map