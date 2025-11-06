import { ACustomAnimate } from "@visactor/vrender-core";

import { getArcsFromCircles, getCirclesFromArcs, getPathFromArcs } from "./utils/path";

export class VennOverlapAnimation extends ACustomAnimate {
    onBind() {
        this.fromCircles = {}, getCirclesFromArcs(this.from.arcs).forEach((c => {
            this.fromCircles[c.setId] = c;
        })), this.toCircles = {}, getCirclesFromArcs(this.to.arcs).forEach((c => {
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
        const arcs = getArcsFromCircles(circles);
        out.arcs = arcs, out.path = getPathFromArcs(arcs);
    }
}