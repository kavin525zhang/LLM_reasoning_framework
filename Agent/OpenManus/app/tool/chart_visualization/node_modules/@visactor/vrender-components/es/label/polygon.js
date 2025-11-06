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

export class PolygonLabel extends LabelBase {
    constructor(attributes, options) {
        const {data: data} = attributes, restAttributes = __rest(attributes, [ "data" ]);
        super((null == options ? void 0 : options.skipDefault) ? attributes : Object.assign({
            data: data
        }, merge({}, PolygonLabel.defaultAttributes, restAttributes))), this.name = "polygon-label";
    }
    labeling(textBounds, graphicBounds, position = "center", offset = 0) {
        if (!textBounds || !graphicBounds) return;
        const {x1: x1, x2: x2, y2: y2, y1: y1} = textBounds;
        return {
            x: (x1 + x2) / 2,
            y: (y1 + y2) / 2
        };
    }
}

PolygonLabel.defaultAttributes = {
    textStyle: {
        fill: "#000"
    },
    position: "center",
    offset: 6
};
//# sourceMappingURL=polygon.js.map