"use strict";

function pseudoRandom(n, seed = 0) {
    let hash = 3735928559 ^ seed;
    return hash = (2654435769 ^ hash) + (hash << 6) + (hash >> 2), hash = 3432918353 * (hash ^ n), 
    hash = hash << 15 | hash >>> 17, hash ^= hash << 25, hash += hash << 9, hash ^= hash >> 4, 
    hash ^= hash << 18, hash |= 1, (hash >>> 0) % 2147483647 / 2147483647;
}

function randomOpacity(ctx, row, column, rowCount, columnCount, ratio, graphic, minRatio = 0, amplitude = 1) {
    const targetRandomValue = 2 * pseudoRandom(row * columnCount + column) * Math.PI, _r = minRatio + amplitude * (Math.sin(2 * ratio * Math.PI + targetRandomValue) + 1) / 2;
    return Math.min(1, Math.max(0, _r));
}

function columnLeftToRight(ctx, row, column, rowCount, columnCount, ratio, graphic, minRatio = 0, amplitude = 1) {
    const delay = column / columnCount, _r = minRatio + amplitude * (Math.sin(2 * ratio * Math.PI - 2 * delay * Math.PI) + 1) / 2;
    return Math.min(1, Math.max(0, _r));
}

function columnRightToLeft(ctx, row, column, rowCount, columnCount, ratio, graphic, minRatio = 0, amplitude = 1) {
    const delay = (columnCount - 1 - column) / columnCount, _r = minRatio + amplitude * (Math.sin(2 * ratio * Math.PI - 2 * delay * Math.PI) + 1) / 2;
    return Math.min(1, Math.max(0, _r));
}

function rowTopToBottom(ctx, row, column, rowCount, columnCount, ratio, graphic, minRatio = 0, amplitude = 1) {
    const delay = row / rowCount, _r = minRatio + amplitude * (Math.sin(2 * ratio * Math.PI - 2 * delay * Math.PI) + 1) / 2;
    return Math.min(1, Math.max(0, _r));
}

function rowBottomToTop(ctx, row, column, rowCount, columnCount, ratio, graphic, minRatio = 0, amplitude = 1) {
    const delay = (rowCount - 1 - row) / rowCount, _r = minRatio + amplitude * (Math.sin(2 * ratio * Math.PI - 2 * delay * Math.PI) + 1) / 2;
    return Math.min(1, Math.max(0, _r));
}

function diagonalCenterToEdge(ctx, row, column, rowCount, columnCount, ratio, graphic, minRatio = 0, amplitude = 1) {
    const centerRow = rowCount / 2, centerCol = columnCount / 2, distance = Math.sqrt(Math.pow((row - centerRow) / rowCount, 2) + Math.pow((column - centerCol) / columnCount, 2)), _r = minRatio + amplitude * (Math.sin(2 * ratio * Math.PI - 2 * distance * Math.PI) + 1) / 2;
    return Math.min(1, Math.max(0, _r));
}

function diagonalTopLeftToBottomRight(ctx, row, column, rowCount, columnCount, ratio, graphic, minRatio = 0, amplitude = 1) {
    const delay = (row / rowCount + column / columnCount) / 2, _r = minRatio + amplitude * (Math.sin(2 * ratio * Math.PI - 2 * delay * Math.PI) + 1) / 2;
    return Math.min(1, Math.max(0, _r));
}

function rotationScan(ctx, row, column, rowCount, columnCount, ratio, graphic, minRatio = 0, amplitude = 1) {
    const centerRow = rowCount / 2, centerCol = columnCount / 2, angle = Math.atan2(row - centerRow, column - centerCol), delay = (angle < 0 ? angle + 2 * Math.PI : angle) / (2 * Math.PI), _r = minRatio + amplitude * (Math.sin(2 * ratio * Math.PI - 2 * delay * Math.PI) + 1) / 2;
    return Math.min(1, Math.max(0, _r));
}

function rippleEffect(ctx, row, column, rowCount, columnCount, ratio, graphic, minRatio = 0, amplitude = 1) {
    const centerRow = rowCount / 2, centerCol = columnCount / 2, normalizedDistance = Math.sqrt(Math.pow(row - centerRow, 2) + Math.pow(column - centerCol, 2)) / Math.sqrt(Math.pow(rowCount / 2, 2) + Math.pow(columnCount / 2, 2)), _r = minRatio + amplitude * (Math.sin(2 * ratio * Math.PI * 3 - 2 * normalizedDistance * Math.PI) + 1) / 2;
    return Math.min(1, Math.max(0, _r));
}

function snakeWave(ctx, row, column, rowCount, columnCount, ratio, graphic, minRatio = 0, amplitude = 1) {
    const delay = (row + column) % (rowCount + columnCount) / (rowCount + columnCount), _r = minRatio + amplitude * (Math.sin(2 * ratio * Math.PI - 4 * delay * Math.PI) + 1) / 2;
    return Math.min(1, Math.max(0, _r));
}

function alternatingWave(ctx, row, column, rowCount, columnCount, ratio, graphic, minRatio = 0, amplitude = 1) {
    const rowPhase = row / rowCount, colPhase = column / columnCount, _r = minRatio + amplitude * (Math.sin(2 * ratio * Math.PI - 2 * rowPhase * Math.PI) * Math.sin(2 * ratio * Math.PI - 2 * colPhase * Math.PI) + 1) / 2;
    return Math.min(1, Math.max(0, _r));
}

function spiralEffect(ctx, row, column, rowCount, columnCount, ratio, graphic, minRatio = 0, amplitude = 1) {
    const centerRow = rowCount / 2, centerCol = columnCount / 2, distance = Math.sqrt(Math.pow(row - centerRow, 2) + Math.pow(column - centerCol, 2)), angle = Math.atan2(row - centerRow, column - centerCol), delay = (distance / Math.sqrt(Math.pow(rowCount / 2, 2) + Math.pow(columnCount / 2, 2)) + angle / (2 * Math.PI)) / 2, _r = minRatio + amplitude * (Math.sin(2 * ratio * Math.PI - 4 * delay * Math.PI) + 1) / 2;
    return Math.min(1, Math.max(0, _r));
}

function columnCenterToEdge(ctx, row, column, rowCount, columnCount, ratio, graphic, minRatio = 0, amplitude = 1) {
    const centerCol = columnCount / 2, distance = Math.abs(column - centerCol) / centerCol, _r = minRatio + amplitude * (Math.sin(2 * ratio * Math.PI - 2 * distance * Math.PI) + 1) / 2;
    return Math.min(1, Math.max(0, _r));
}

function columnEdgeToCenter(ctx, row, column, rowCount, columnCount, ratio, graphic, minRatio = 0, amplitude = 1) {
    const centerCol = columnCount / 2, distance = 1 - Math.abs(column - centerCol) / centerCol, _r = minRatio + amplitude * (Math.sin(2 * ratio * Math.PI - 2 * distance * Math.PI) + 1) / 2;
    return Math.min(1, Math.max(0, _r));
}

function rowCenterToEdge(ctx, row, column, rowCount, columnCount, ratio, graphic, minRatio = 0, amplitude = 1) {
    const centerRow = rowCount / 2, distance = Math.abs(row - centerRow) / centerRow, _r = minRatio + amplitude * (Math.sin(2 * ratio * Math.PI - 2 * distance * Math.PI) + 1) / 2;
    return Math.min(1, Math.max(0, _r));
}

function rowEdgeToCenter(ctx, row, column, rowCount, columnCount, ratio, graphic, minRatio = 0, amplitude = 1) {
    const centerRow = rowCount / 2, distance = 1 - Math.abs(row - centerRow) / centerRow, _r = minRatio + amplitude * (Math.sin(2 * ratio * Math.PI - 2 * distance * Math.PI) + 1) / 2;
    return Math.min(1, Math.max(0, _r));
}

function cornerToCenter(ctx, row, column, rowCount, columnCount, ratio, graphic, minRatio = 0, amplitude = 1) {
    const centerRow = rowCount / 2, centerCol = columnCount / 2, distance = Math.sqrt(Math.pow((row - centerRow) / centerRow, 2) + Math.pow((column - centerCol) / centerCol, 2)), normalizedDistance = Math.min(distance, 1), _r = minRatio + amplitude * (Math.sin(2 * ratio * Math.PI - 2 * normalizedDistance * Math.PI) + 1) / 2;
    return Math.min(1, Math.max(0, _r));
}

function centerToCorner(ctx, row, column, rowCount, columnCount, ratio, graphic, minRatio = 0, amplitude = 1) {
    const centerRow = rowCount / 2, centerCol = columnCount / 2, distance = Math.sqrt(Math.pow((row - centerRow) / centerRow, 2) + Math.pow((column - centerCol) / centerCol, 2)), normalizedDistance = 1 - Math.min(distance, 1), _r = minRatio + amplitude * (Math.sin(2 * ratio * Math.PI - 2 * normalizedDistance * Math.PI) + 1) / 2;
    return Math.min(1, Math.max(0, _r));
}

function pulseWave(ctx, row, column, rowCount, columnCount, ratio, graphic, minRatio = 0, amplitude = 1) {
    const centerRow = rowCount / 2, centerCol = columnCount / 2, distance = Math.sqrt(Math.pow((row - centerRow) / centerRow, 2) + Math.pow((column - centerCol) / centerCol, 2)), normalizedDistance = Math.min(distance, 1), wavePhase = 2 * ratio * Math.PI * 3, decay = Math.max(0, 1 - normalizedDistance), _r = minRatio + amplitude * ((Math.sin(wavePhase - 4 * normalizedDistance * Math.PI) + 1) / 2) * (.7 * decay + .3);
    return Math.min(1, Math.max(0, _r));
}

function particleEffect(ctx, row, column, rowCount, columnCount, ratio, graphic, minRatio = 0, amplitude = 1) {
    const index = row * columnCount + column, phase = 2 * pseudoRandom(index, 0) * Math.PI, speed = .5 * pseudoRandom(index, 1) + .5, direction = 2 * pseudoRandom(index, 2) * Math.PI, centerRow = rowCount / 2, centerCol = columnCount / 2, distance = Math.sqrt(Math.pow((row - centerRow) / centerRow, 2) + Math.pow((column - centerCol) / centerCol, 2)), normalizedDistance = Math.min(distance, 1), scatterRatio = (ratio - .4) / .6, movement = Math.sin(scatterRatio * speed * 8 * Math.PI + phase + direction * scatterRatio), distanceEffect = Math.cos(normalizedDistance * Math.PI + scatterRatio * Math.PI), _r = minRatio + amplitude * ((movement + 1) / 2 * Math.max(0, 1 - 1.2 * scatterRatio) * (.3 + .7 * distanceEffect));
    return Math.min(1, Math.max(0, _r));
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.particleEffect = exports.pulseWave = exports.centerToCorner = exports.cornerToCenter = exports.rowEdgeToCenter = exports.rowCenterToEdge = exports.columnEdgeToCenter = exports.columnCenterToEdge = exports.spiralEffect = exports.alternatingWave = exports.snakeWave = exports.rippleEffect = exports.rotationScan = exports.diagonalTopLeftToBottomRight = exports.diagonalCenterToEdge = exports.rowBottomToTop = exports.rowTopToBottom = exports.columnRightToLeft = exports.columnLeftToRight = exports.randomOpacity = void 0, 
exports.randomOpacity = randomOpacity, exports.columnLeftToRight = columnLeftToRight, 
exports.columnRightToLeft = columnRightToLeft, exports.rowTopToBottom = rowTopToBottom, 
exports.rowBottomToTop = rowBottomToTop, exports.diagonalCenterToEdge = diagonalCenterToEdge, 
exports.diagonalTopLeftToBottomRight = diagonalTopLeftToBottomRight, exports.rotationScan = rotationScan, 
exports.rippleEffect = rippleEffect, exports.snakeWave = snakeWave, exports.alternatingWave = alternatingWave, 
exports.spiralEffect = spiralEffect, exports.columnCenterToEdge = columnCenterToEdge, 
exports.columnEdgeToCenter = columnEdgeToCenter, exports.rowCenterToEdge = rowCenterToEdge, 
exports.rowEdgeToCenter = rowEdgeToCenter, exports.cornerToCenter = cornerToCenter, 
exports.centerToCorner = centerToCorner, exports.pulseWave = pulseWave, exports.particleEffect = particleEffect;
//# sourceMappingURL=effect.js.map
