var __rest = this && this.__rest || function(s, e) {
    var t = {};
    for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0 && (t[p] = s[p]);
    if (null != s && "function" == typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (p = Object.getOwnPropertySymbols(s); i < p.length; i++) e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]) && (t[p[i]] = s[p[i]]);
    }
    return t;
};

import { calculateAnchorOfBounds, merge } from "@visactor/vutils";

import { LabelBase } from "./base";

import { registerLabelComponent } from "./data-label-register";

export class RectLabel extends LabelBase {
    constructor(attributes, options) {
        const {data: data} = attributes, restAttributes = __rest(attributes, [ "data" ]);
        super((null == options ? void 0 : options.skipDefault) ? attributes : Object.assign({
            data: data
        }, merge({}, RectLabel.defaultAttributes, restAttributes)));
    }
    labeling(textBounds, graphicBounds, position = "top", offset = 0) {
        if (!textBounds || !graphicBounds) return;
        const {x1: x1, y1: y1, x2: x2, y2: y2} = textBounds, width = Math.abs(x2 - x1), height = Math.abs(y2 - y1), {x: anchorX, y: anchorY} = calculateAnchorOfBounds(graphicBounds, position);
        let vx = 0, vy = 0;
        const isInside = position.includes("inside");
        switch (position.includes("top") ? vy = isInside ? 1 : -1 : position.includes("bottom") ? vy = isInside ? -1 : 1 : position.includes("left") ? vx = isInside ? 1 : -1 : position.includes("right") && (vx = isInside ? -1 : 1), 
        position) {
          case "top-right":
          case "bottom-right":
            vx = -1;
            break;

          case "top-left":
          case "bottom-left":
            vx = 1;
        }
        return {
            x: anchorX + vx * offset + vx * width / 2,
            y: anchorY + vy * offset + vy * height / 2
        };
    }
}

RectLabel.tag = "rect-label", RectLabel.defaultAttributes = {
    textStyle: {
        fill: "#000"
    },
    position: "top",
    offset: 5
};

export const registerRectDataLabel = () => {
    registerLabelComponent("rect", RectLabel);
};
//# sourceMappingURL=rect.js.map
