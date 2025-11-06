"use strict";

var __rest = this && this.__rest || function(s, e) {
    var t = {};
    for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0 && (t[p] = s[p]);
    if (null != s && "function" == typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (p = Object.getOwnPropertySymbols(s); i < p.length; i++) e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]) && (t[p[i]] = s[p[i]]);
    }
    return t;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerSymbolDataLabel = exports.SymbolLabel = void 0;

const vutils_1 = require("@visactor/vutils"), base_1 = require("./base"), util_1 = require("./util"), data_label_register_1 = require("./data-label-register");

class SymbolLabel extends base_1.LabelBase {
    constructor(attributes, options) {
        const {data: data} = attributes, restAttributes = __rest(attributes, [ "data" ]);
        super((null == options ? void 0 : options.skipDefault) ? attributes : Object.assign({
            data: data
        }, (0, vutils_1.merge)({}, SymbolLabel.defaultAttributes, restAttributes))), this.name = "symbol-label";
    }
    labeling(textBounds, graphicBounds, position = "top", offset = 0) {
        return (0, util_1.labelingPoint)(textBounds, graphicBounds, position, offset);
    }
}

exports.SymbolLabel = SymbolLabel, SymbolLabel.defaultAttributes = {
    textStyle: {
        fill: "#000"
    },
    position: "top",
    offset: 5
};

const registerSymbolDataLabel = () => {
    (0, data_label_register_1.registerLabelComponent)("symbol", SymbolLabel), (0, data_label_register_1.registerLabelComponent)("line-data", SymbolLabel);
};

exports.registerSymbolDataLabel = registerSymbolDataLabel;
//# sourceMappingURL=symbol.js.map
