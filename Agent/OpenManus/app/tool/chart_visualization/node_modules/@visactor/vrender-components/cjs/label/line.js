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
}), exports.registerLineDataLabel = exports.LineLabel = void 0;

const vutils_1 = require("@visactor/vutils"), base_1 = require("./base"), util_1 = require("./util"), data_label_register_1 = require("./data-label-register");

class LineLabel extends base_1.LabelBase {
    constructor(attributes, options) {
        const {data: data} = attributes, restAttributes = __rest(attributes, [ "data" ]);
        super((null == options ? void 0 : options.skipDefault) ? attributes : Object.assign({
            data: data
        }, (0, vutils_1.merge)({}, LineLabel.defaultAttributes, restAttributes))), this.name = "line-label";
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
        return (0, util_1.labelingLineOrArea)(textBounds, graphicBounds, position, offset);
    }
}

exports.LineLabel = LineLabel, LineLabel.defaultAttributes = {
    textStyle: {
        fill: "#000"
    },
    position: "end",
    offset: 6
};

const registerLineDataLabel = () => {
    (0, data_label_register_1.registerLabelComponent)("line", LineLabel), (0, data_label_register_1.registerLabelComponent)("area", LineLabel);
};

exports.registerLineDataLabel = registerLineDataLabel;
//# sourceMappingURL=line.js.map