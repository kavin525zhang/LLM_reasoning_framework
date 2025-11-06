"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.scaleSolution = void 0;

const common_1 = require("./common");

function scaleSolution(solution, width, height, x0, y0) {
    width = Math.max(width, 1), height = Math.max(height, 1);
    const circles = [], setIds = [];
    for (const setId in solution) solution.hasOwnProperty(setId) && (setIds.push(setId), 
    circles.push(solution[setId]));
    const bounds = (0, common_1.getBoundingBox)(circles), xRange = bounds.xRange, yRange = bounds.yRange;
    if (xRange.max === xRange.min || yRange.max === yRange.min) return console.log("not scaling solution: zero size detected"), 
    solution;
    const xScaling = width / (xRange.max - xRange.min), yScaling = height / (yRange.max - yRange.min), scaling = Math.min(yScaling, xScaling), xOffset = (width - (xRange.max - xRange.min) * scaling) / 2, yOffset = (height - (yRange.max - yRange.min) * scaling) / 2, scaled = {};
    for (let i = 0; i < circles.length; ++i) {
        const circle = circles[i];
        scaled[setIds[i]] = {
            radius: scaling * circle.radius,
            x: x0 + xOffset + (circle.x - xRange.min) * scaling,
            y: y0 + yOffset + (circle.y - yRange.min) * scaling,
            setId: circle.setId
        };
    }
    return scaled;
}

exports.scaleSolution = scaleSolution;
//# sourceMappingURL=scale-solution.js.map