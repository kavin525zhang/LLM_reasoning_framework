"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.lossFunction = void 0;

const vutils_1 = require("@visactor/vutils");

function lossFunction(sets, overlaps) {
    let output = 0;
    for (let i = 0; i < overlaps.length; ++i) {
        const area = overlaps[i];
        let overlap;
        if (1 === area.sets.length) continue;
        if (2 === area.sets.length) {
            const left = sets[area.sets[0]], right = sets[area.sets[1]];
            overlap = (0, vutils_1.circleOverlap)(left.radius, right.radius, vutils_1.PointService.distancePP(left, right));
        } else overlap = (0, vutils_1.intersectionArea)(area.sets.map((function(i) {
            return sets[i];
        })));
        output += (area.hasOwnProperty("weight") ? area.weight : 1) * (overlap - area.size) * (overlap - area.size);
    }
    return output;
}

exports.lossFunction = lossFunction;
//# sourceMappingURL=loss.js.map