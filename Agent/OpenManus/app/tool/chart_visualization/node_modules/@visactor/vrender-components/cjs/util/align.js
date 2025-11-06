"use strict";

function alignAxisLabels(labels, start, containerSize, orient, align) {
    "left" === orient || "right" === orient ? "left" === align ? labels.forEach((label => {
        var _a;
        label.setAttributes({
            dx: (null !== (_a = label.attribute.dx) && void 0 !== _a ? _a : 0) + start - label.AABBBounds.x1
        });
    })) : "right" === align ? labels.forEach((label => {
        var _a;
        label.setAttributes({
            dx: (null !== (_a = label.attribute.dx) && void 0 !== _a ? _a : 0) + start + containerSize - label.AABBBounds.x2
        });
    })) : "center" === align && labels.forEach((label => {
        var _a;
        label.setAttributes({
            dx: (null !== (_a = label.attribute.dx) && void 0 !== _a ? _a : 0) + start + containerSize / 2 - (label.AABBBounds.x1 + label.AABBBounds.x2) / 2
        });
    })) : "bottom" !== orient && "top" !== orient || ("top" === align ? labels.forEach((label => {
        var _a;
        label.setAttributes({
            dy: (null !== (_a = label.attribute.dy) && void 0 !== _a ? _a : 0) + start - label.AABBBounds.y1
        });
    })) : "bottom" === align ? labels.forEach((label => {
        var _a;
        label.setAttributes({
            dy: (null !== (_a = label.attribute.dy) && void 0 !== _a ? _a : 0) + start + containerSize - label.AABBBounds.y2
        });
    })) : "middle" === align && labels.forEach((label => {
        var _a;
        label.setAttributes({
            dy: (null !== (_a = label.attribute.dy) && void 0 !== _a ? _a : 0) + start + containerSize / 2 - (label.AABBBounds.y1 + label.AABBBounds.y2) / 2
        });
    })));
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.alignAxisLabels = void 0, exports.alignAxisLabels = alignAxisLabels;
//# sourceMappingURL=align.js.map
