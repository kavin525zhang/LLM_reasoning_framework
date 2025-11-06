function simplifyRadialDist(points, sqTolerance) {
    let deltaX, deltaY, lastX = points[0].x, lastY = points[0].y;
    const newPoints = [ points[0] ];
    for (let i = 1, len = points.length; i < len; i++) deltaX = points[i].x - lastX, 
    deltaY = points[i].y - lastY, deltaX * deltaX + deltaY * deltaY > sqTolerance && (lastX = points[i].x, 
    lastY = points[i].y, newPoints.push(points[i]));
    return points[points.length - 1].x === lastX && points[points.length - 1].y === lastY || newPoints.push(points[points.length - 1]), 
    newPoints;
}

function simplifyDPStep(points, startIdx, endIdx, sqTolerance, simplified) {
    let maxSqDist = sqTolerance, nextIdx = startIdx;
    const startX = points[startIdx].x, startY = points[startIdx].y, vecX2 = points[endIdx].x - startX, vecY2 = points[endIdx].y - startY, sqLength = vecX2 * vecX2 + vecY2 * vecY2;
    let area, sqArea, sqDistance, vecX1, vecY1;
    for (let i = startIdx + 1, len = endIdx - 1; i < len; i++) vecX1 = points[i].x - startX, 
    vecY1 = points[i].y - startY, area = vecX1 * vecY2 - vecX2 * vecY1, sqArea = area * area, 
    sqDistance = sqArea / sqLength, sqDistance > maxSqDist && (maxSqDist = sqDistance, 
    nextIdx = i);
    maxSqDist > sqTolerance && (nextIdx - startIdx > 2 && simplifyDPStep(points, startIdx, nextIdx, sqTolerance, simplified), 
    simplified.push(points[nextIdx], points[nextIdx + 1]), endIdx - nextIdx > 2 && simplifyDPStep(points, nextIdx + 1, endIdx, sqTolerance, simplified));
}

function simplifyDouglasPeucker(points, sqTolerance) {
    const lastIdx = points.length - 1, simplified = [ points[0] ];
    return simplifyDPStep(points, 0, lastIdx, sqTolerance, simplified), simplified.push(points[lastIdx]), 
    simplified;
}

export function flatten_simplify(points, tolerance, highestQuality) {
    if (points.length <= 10) return points;
    return points = highestQuality ? points : simplifyRadialDist(points, void 0 !== tolerance ? tolerance * tolerance : 1);
}
//# sourceMappingURL=simplify.js.map