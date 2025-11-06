"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.bestInitialLayout = exports.venn = void 0;

const greedy_layout_1 = require("./greedy-layout"), loss_1 = require("./loss"), constrained_mds_layout_1 = require("./constrained-mds-layout"), vutils_1 = require("@visactor/vutils");

function venn(areas, parameters) {
    (parameters = parameters || {}).maxIterations = parameters.maxIterations || 500;
    const initialLayout = parameters.initialLayout || bestInitialLayout, loss = parameters.lossFunction || loss_1.lossFunction, circles = initialLayout(areas = addMissingAreas(areas), parameters), initial = [], setIds = [];
    for (const setId in circles) circles.hasOwnProperty(setId) && (initial.push(circles[setId].x), 
    initial.push(circles[setId].y), setIds.push(setId));
    const positions = (0, vutils_1.nelderMead)((function(values) {
        const current = {};
        for (let i = 0; i < setIds.length; ++i) {
            const setId = setIds[i];
            current[setId] = {
                x: values[2 * i],
                y: values[2 * i + 1],
                radius: circles[setId].radius
            };
        }
        return loss(current, areas);
    }), initial, parameters).x;
    for (let i = 0; i < setIds.length; ++i) {
        const setId = setIds[i];
        circles[setId].x = positions[2 * i], circles[setId].y = positions[2 * i + 1];
    }
    return circles;
}

function addMissingAreas(areas) {
    areas = areas.slice();
    const ids = [], pairs = {};
    for (let i = 0; i < areas.length; ++i) {
        const area = areas[i];
        if (1 === area.sets.length) ids.push(area.sets[0]); else if (2 === area.sets.length) {
            const a = area.sets[0], b = area.sets[1];
            pairs[[ a, b ].toString()] = !0, pairs[[ b, a ].toString()] = !0;
        }
    }
    ids.sort((function(a, b) {
        return +(a > b);
    }));
    for (let i = 0; i < ids.length; ++i) {
        const a = ids[i];
        for (let j = i + 1; j < ids.length; ++j) {
            const b = ids[j];
            [ a, b ].toString() in pairs || areas.push({
                sets: [ a, b ],
                size: 0
            });
        }
    }
    return areas;
}

function bestInitialLayout(areas, params) {
    let initial = (0, greedy_layout_1.greedyLayout)(areas, params);
    const loss = params.lossFunction || loss_1.lossFunction;
    if (areas.length >= 8) {
        const constrained = (0, constrained_mds_layout_1.constrainedMDSLayout)(areas, params);
        loss(constrained, areas) + 1e-8 < loss(initial, areas) && (initial = constrained);
    }
    return initial;
}

exports.venn = venn, exports.bestInitialLayout = bestInitialLayout;
//# sourceMappingURL=layout.js.map