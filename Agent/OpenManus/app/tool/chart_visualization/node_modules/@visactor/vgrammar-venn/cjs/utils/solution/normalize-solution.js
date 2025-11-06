"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.normalizeSolution = void 0;

const common_1 = require("./common");

function normalizeSolution(solution, orientation, orientationOrder) {
    null === orientation && (orientation = Math.PI / 2);
    let circles = [];
    for (const setId in solution) if (solution.hasOwnProperty(setId)) {
        const previous = solution[setId];
        circles.push({
            x: previous.x,
            y: previous.y,
            radius: previous.radius,
            setId: setId
        });
    }
    const clusters = (0, common_1.disjointCluster)(circles);
    for (let i = 0; i < clusters.length; ++i) {
        (0, common_1.orientateCircles)(clusters[i], orientation, orientationOrder);
        const bounds = (0, common_1.getBoundingBox)(clusters[i]);
        clusters[i].size = (bounds.xRange.max - bounds.xRange.min) * (bounds.yRange.max - bounds.yRange.min), 
        clusters[i].bounds = bounds;
    }
    clusters.sort((function(a, b) {
        return b.size - a.size;
    })), circles = clusters[0];
    let returnBounds = circles.bounds;
    const spacing = (returnBounds.xRange.max - returnBounds.xRange.min) / 50;
    function addCluster(cluster, right, bottom) {
        if (!cluster) return;
        const bounds = cluster.bounds;
        let xOffset, yOffset, centering;
        right ? xOffset = returnBounds.xRange.max - bounds.xRange.min + spacing : (xOffset = returnBounds.xRange.max - bounds.xRange.max, 
        centering = (bounds.xRange.max - bounds.xRange.min) / 2 - (returnBounds.xRange.max - returnBounds.xRange.min) / 2, 
        centering < 0 && (xOffset += centering)), bottom ? yOffset = returnBounds.yRange.max - bounds.yRange.min + spacing : (yOffset = returnBounds.yRange.max - bounds.yRange.max, 
        centering = (bounds.yRange.max - bounds.yRange.min) / 2 - (returnBounds.yRange.max - returnBounds.yRange.min) / 2, 
        centering < 0 && (yOffset += centering));
        for (let j = 0; j < cluster.length; ++j) cluster[j].x += xOffset, cluster[j].y += yOffset, 
        circles.push(cluster[j]);
    }
    let index = 1;
    for (;index < clusters.length; ) addCluster(clusters[index], !0, !1), addCluster(clusters[index + 1], !1, !0), 
    addCluster(clusters[index + 2], !0, !0), index += 3, returnBounds = (0, common_1.getBoundingBox)(circles);
    const ret = {};
    for (let i = 0; i < circles.length; ++i) ret[circles[i].setId] = circles[i];
    return ret;
}

exports.normalizeSolution = normalizeSolution;