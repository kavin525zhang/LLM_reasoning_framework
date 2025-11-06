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
}), exports.Fragment = exports.jsx = void 0;

const vutils_1 = require("@visactor/vutils"), vrender_core_1 = require("@visactor/vrender-core"), graphicType_1 = require("./graphicType");

function flatten(list, out) {
    if ((0, vutils_1.isArray)(list)) return list.forEach((i => flatten(i, out)));
    out.push(list);
}

function jsx(type, config, ...children) {
    const _a = config || {}, {key: key, name: name, id: id, attribute: attribute, stateProxy: stateProxy, animation: animation, timeline: timeline} = _a, props = __rest(_a, [ "key", "name", "id", "attribute", "stateProxy", "animation", "timeline" ]);
    let c = type;
    (0, vutils_1.isString)(type) && (c = vrender_core_1.graphicCreator[type]);
    const childrenList = [];
    children.length && flatten(1 === children.length ? children[0] : children, childrenList);
    const g = "Group" === c.name ? new c(attribute) : c(config);
    if (parseToGraphic(g, childrenList, props), stateProxy && (g.stateProxy = stateProxy), 
    name && (g.name = name), (0, vutils_1.isArray)(animation)) {
        const animate = g.animate();
        timeline && animate.setTimeline(timeline), animation.forEach((item => {
            animate[item[0]](...item.slice(1));
        }));
    }
    return g;
}

function parseToGraphic(g, childrenList, props) {
    let out, isGraphic = !1;
    switch (g.type) {
      case "richtext":
      case "rich/image":
        break;

      case "rich/text":
        out = g.attribute || {}, childrenList[0] && (out.text = childrenList[0]);
        break;

      default:
        isGraphic = !0;
    }
    isGraphic ? (childrenList.forEach((c => {
        c && g.add(c);
    })), Object.keys(props).forEach((k => {
        const en = graphicType_1.REACT_TO_CANOPUS_EVENTS[k];
        en && g.on(en, props[k]);
    }))) : "richtext" === g.type && (g.attribute.textConfig = childrenList.map((item => item.attribute)).filter((item => item)));
}

exports.jsx = jsx, exports.Fragment = vrender_core_1.Group;
//# sourceMappingURL=jsx-classic.js.map