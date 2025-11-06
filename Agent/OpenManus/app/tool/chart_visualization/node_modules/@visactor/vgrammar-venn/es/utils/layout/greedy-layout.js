import { lossFunction } from "./loss";

import { distanceFromIntersectArea } from "./common";

import { SMALL, circleCircleIntersection } from "@visactor/vutils";

export function greedyLayout(areas, params) {
    const loss = params && params.lossFunction ? params.lossFunction : lossFunction, circles = {}, setOverlaps = {};
    for (let i = 0; i < areas.length; ++i) {
        const area = areas[i];
        if (1 === area.sets.length) {
            const set = area.sets[0];
            circles[set] = {
                x: 1e10,
                y: 1e10,
                size: area.size,
                radius: Math.sqrt(area.size / Math.PI),
                setId: set
            }, setOverlaps[set] = [];
        }
    }
    areas = areas.filter((function(a) {
        return 2 === a.sets.length;
    }));
    for (let i = 0; i < areas.length; ++i) {
        const current = areas[i];
        let weight = current.hasOwnProperty("weight") ? current.weight : 1;
        const left = current.sets[0], right = current.sets[1];
        current.size + SMALL >= Math.min(circles[left].size, circles[right].size) && (weight = 0), 
        setOverlaps[left].push({
            set: right,
            size: current.size,
            weight: weight
        }), setOverlaps[right].push({
            set: left,
            size: current.size,
            weight: weight
        });
    }
    const mostOverlapped = [];
    for (const set in setOverlaps) if (setOverlaps.hasOwnProperty(set)) {
        let size = 0;
        for (let i = 0; i < setOverlaps[set].length; ++i) size += setOverlaps[set][i].size * setOverlaps[set][i].weight;
        mostOverlapped.push({
            set: set,
            size: size
        });
    }
    function sortOrder(a, b) {
        return b.size - a.size;
    }
    mostOverlapped.sort(sortOrder);
    const positioned = {};
    function isPositioned(element) {
        return element.set in positioned;
    }
    function positionSet(point, index) {
        circles[index].x = point.x, circles[index].y = point.y, positioned[index] = !0;
    }
    positionSet({
        x: 0,
        y: 0
    }, mostOverlapped[0].set);
    for (let i = 1; i < mostOverlapped.length; ++i) {
        const setIndex = mostOverlapped[i].set, overlap = setOverlaps[setIndex].filter(isPositioned), set = circles[setIndex];
        if (overlap.sort(sortOrder), 0 === overlap.length) throw "ERROR: missing pairwise overlap information";
        const points = [];
        for (let j = 0; j < overlap.length; ++j) {
            const p1 = circles[overlap[j].set], d1 = distanceFromIntersectArea(set.radius, p1.radius, overlap[j].size);
            points.push({
                x: p1.x + d1,
                y: p1.y
            }), points.push({
                x: p1.x - d1,
                y: p1.y
            }), points.push({
                y: p1.y + d1,
                x: p1.x
            }), points.push({
                y: p1.y - d1,
                x: p1.x
            });
            for (let k = j + 1; k < overlap.length; ++k) {
                const p2 = circles[overlap[k].set], d2 = distanceFromIntersectArea(set.radius, p2.radius, overlap[k].size), extraPoints = circleCircleIntersection({
                    x: p1.x,
                    y: p1.y,
                    radius: d1
                }, {
                    x: p2.x,
                    y: p2.y,
                    radius: d2
                });
                for (let l = 0; l < extraPoints.length; ++l) points.push(extraPoints[l]);
            }
        }
        let bestLoss = 1e50, bestPoint = points[0];
        for (let j = 0; j < points.length; ++j) {
            circles[setIndex].x = points[j].x, circles[setIndex].y = points[j].y;
            const localLoss = loss(circles, areas);
            localLoss < bestLoss && (bestLoss = localLoss, bestPoint = points[j]);
        }
        positionSet(bestPoint, setIndex);
    }
    return circles;
}
//# sourceMappingURL=greedy-layout.js.map