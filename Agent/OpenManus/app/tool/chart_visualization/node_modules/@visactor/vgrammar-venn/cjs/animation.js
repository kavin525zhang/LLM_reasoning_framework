"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.VennOverlapAnimation = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), path_1 = require("./utils/path");

class VennOverlapAnimation extends vrender_core_1.ACustomAnimate {
    onBind() {
        this.fromCircles = {}, (0, path_1.getCirclesFromArcs)(this.from.arcs).forEach((c => {
            this.fromCircles[c.setId] = c;
        })), this.toCircles = {}, (0, path_1.getCirclesFromArcs)(this.to.arcs).forEach((c => {
            this.toCircles[c.setId] = c;
        }));
    }
    onUpdate(end, ratio, out) {
        const circles = [];
        Object.keys(this.fromCircles).forEach((key => {
            const fromC = this.fromCircles[key], toC = this.toCircles[key];
            fromC && toC && circles.push({
                radius: fromC.radius + (toC.radius - fromC.radius) * ratio,
                x: fromC.x + (toC.x - fromC.x) * ratio,
                y: fromC.y + (toC.y - fromC.y) * ratio,
                setId: key
            });
        }));
        const arcs = (0, path_1.getArcsFromCircles)(circles);
        out.arcs = arcs, out.path = (0, path_1.getPathFromArcs)(arcs);
    }
}

exports.VennOverlapAnimation = VennOverlapAnimation;