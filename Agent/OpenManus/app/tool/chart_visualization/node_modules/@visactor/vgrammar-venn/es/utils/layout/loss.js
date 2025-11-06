import { PointService, circleOverlap, intersectionArea } from "@visactor/vutils";

export function lossFunction(sets, overlaps) {
    let output = 0;
    for (let i = 0; i < overlaps.length; ++i) {
        const area = overlaps[i];
        let overlap;
        if (1 === area.sets.length) continue;
        if (2 === area.sets.length) {
            const left = sets[area.sets[0]], right = sets[area.sets[1]];
            overlap = circleOverlap(left.radius, right.radius, PointService.distancePP(left, right));
        } else overlap = intersectionArea(area.sets.map((function(i) {
            return sets[i];
        })));
        output += (area.hasOwnProperty("weight") ? area.weight : 1) * (overlap - area.size) * (overlap - area.size);
    }
    return output;
}
//# sourceMappingURL=loss.js.map