var __rest = this && this.__rest || function(s, e) {
    var t = {};
    for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0 && (t[p] = s[p]);
    if (null != s && "function" == typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (p = Object.getOwnPropertySymbols(s); i < p.length; i++) e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]) && (t[p[i]] = s[p[i]]);
    }
    return t;
};

import { merge } from "@visactor/vutils";

import { LabelBase } from "./base";

import { labelingLineOrArea } from "./util";

import { registerLabelComponent } from "./data-label-register";

export class LineLabel extends LabelBase {
    constructor(attributes, options) {
        const {data: data} = attributes, restAttributes = __rest(attributes, [ "data" ]);
        super((null == options ? void 0 : options.skipDefault) ? attributes : Object.assign({
            data: data
        }, merge({}, LineLabel.defaultAttributes, restAttributes))), this.name = "line-label";
    }
    getGraphicBounds(graphic, point = {}, position = "end") {
        if (!graphic || "line" !== graphic.type && "area" !== graphic.type) return super.getGraphicBounds(graphic, point);
        let points = graphic.attribute.points;
        const segments = graphic.attribute.segments;
        !points && segments && segments.length && (points = segments.reduce(((res, seg) => {
            var _a;
            return res.concat(null !== (_a = seg.points) && void 0 !== _a ? _a : []);
        }), [])), points && 0 !== points.length || (points = [ point ]);
        const index = "start" === position ? 0 : points.length - 1;
        return points[index] ? {
            x1: points[index].x,
            x2: points[index].x,
            y1: points[index].y,
            y2: points[index].y
        } : void 0;
    }
    labeling(textBounds, graphicBounds, position = "end", offset = 0) {
        return labelingLineOrArea(textBounds, graphicBounds, position, offset);
    }
}

LineLabel.defaultAttributes = {
    textStyle: {
        fill: "#000"
    },
    position: "end",
    offset: 6
};

export const registerLineDataLabel = () => {
    registerLabelComponent("line", LineLabel), registerLabelComponent("area", LineLabel);
};
//# sourceMappingURL=line.js.map