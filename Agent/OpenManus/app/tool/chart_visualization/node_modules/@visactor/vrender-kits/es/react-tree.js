import { isArray } from "@visactor/vutils";

import { REACT_TO_CANOPUS_EVENTS } from "./jsx";

export function decodeReactDom(dom) {
    if (!dom || !dom.$$typeof) return dom;
    const type = dom.type, {attribute: attribute, children: children, stateProxy: stateProxy, id: id, name: name} = dom.props, g = type({
        attribute: attribute
    }), out = parseToGraphic(g, dom.props, children);
    return out || (stateProxy && (g.stateProxy = stateProxy), g.id = id, g.name = name, 
    parseChildren(children, g), g);
}

function parseChildren(children, g) {
    isArray(children) ? children.forEach((item => {
        if (isArray(item)) parseChildren(item, g); else {
            const c = decodeReactDom(item);
            c && c.type && g.add(c);
        }
    })) : children && g.add(decodeReactDom(children));
}

function parseToGraphic(g, props, childrenList) {
    let out, isGraphic = !1;
    switch (g.type) {
      case "richtext":
        break;

      case "rich/text":
        out = g.attribute || {}, childrenList && (out.text = childrenList), g.attribute = out;
        break;

      case "rich/image":
        out = g.attribute || {};
        break;

      default:
        isGraphic = !0;
    }
    return isGraphic ? Object.keys(props).forEach((k => {
        const en = REACT_TO_CANOPUS_EVENTS[k];
        en && g.on(en, props[k]);
    })) : "richtext" === g.type && (g.attribute.textConfig = childrenList.map((item => decodeReactDom(item))).filter((item => item))), 
    out;
}
//# sourceMappingURL=react-tree.js.map