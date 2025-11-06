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

import { labelingPoint } from "./util";

import { registerLabelComponent } from "./data-label-register";

export class SymbolLabel extends LabelBase {
    constructor(attributes, options) {
        const {data: data} = attributes, restAttributes = __rest(attributes, [ "data" ]);
        super((null == options ? void 0 : options.skipDefault) ? attributes : Object.assign({
            data: data
        }, merge({}, SymbolLabel.defaultAttributes, restAttributes))), this.name = "symbol-label";
    }
    labeling(textBounds, graphicBounds, position = "top", offset = 0) {
        return labelingPoint(textBounds, graphicBounds, position, offset);
    }
}

SymbolLabel.defaultAttributes = {
    textStyle: {
        fill: "#000"
    },
    position: "top",
    offset: 5
};

export const registerSymbolDataLabel = () => {
    registerLabelComponent("symbol", SymbolLabel), registerLabelComponent("line-data", SymbolLabel);
};
//# sourceMappingURL=symbol.js.map
