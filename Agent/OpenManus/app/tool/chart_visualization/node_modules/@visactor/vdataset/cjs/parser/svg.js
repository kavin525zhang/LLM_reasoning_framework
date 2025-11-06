"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.svgParser = void 0;

const vutils_1 = require("@visactor/vutils"), tagNameToType = {
    svg: "group",
    rect: "rect",
    line: "rule",
    polygon: "polygon",
    path: "path",
    polyline: "line",
    g: "group",
    circle: "arc",
    ellipse: "arc"
}, validTagName = Object.keys(tagNameToType), validGroupNode = [ "g", "svg", "text", "tspan", "switch" ], validTextAttributes = [ "font-size", "font-family", "font-weight", "font-style", "text-align", "text-anchor" ], validCircleAttributes = [ "cx", "cy", "r" ], validEllipseAttributes = [ "cx", "cy", "rx", "ry" ], validLineAttributes = [ "x1", "x2", "y1", "y2" ], validAttributes = [ "visibility", "x", "y", "width", "height", "d", "points", "stroke", "stroke-width", "fill", "fill-opacity", "stroke-opacity", ...validTextAttributes, ...validCircleAttributes, ...validEllipseAttributes, ...validLineAttributes ], validInheritAttributes = [ "visible", "fill", "stroke", "stroke-width", "fill-opacity", "stroke-opacity", ...validTextAttributes ], numberReg = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;

function splitNumberSequence(rawStr) {
    return rawStr.match(numberReg) || [];
}

const svgParser = (data, option = {}, dataView) => {
    let parser = option.customDOMParser;
    if (parser || (null === window || void 0 === window ? void 0 : window.DOMParser) && (parser = svg => (new DOMParser).parseFromString(svg, "text/xml")), 
    !parser) throw new Error("No Available DOMParser!");
    const svg = parser(data);
    let node = 9 === svg.nodeType ? svg.firstChild : svg;
    for (;node && ("svg" !== node.nodeName.toLowerCase() || 1 !== node.nodeType); ) node = node.nextSibling;
    if (node) {
        return parseSvgNode(node);
    }
    return null;
};

exports.svgParser = svgParser;

let idx = 0;

function parseSvgNode(svg, opt = {}) {
    const elements = [], root = parseNode(svg, null);
    let width = parseFloat(svg.getAttribute("width") || opt.width), height = parseFloat(svg.getAttribute("height") || opt.height);
    !(0, vutils_1.isValidNumber)(width) && (width = null), !(0, vutils_1.isValidNumber)(height) && (height = null);
    const viewBox = svg.getAttribute("viewBox");
    let viewBoxRect;
    if (viewBox) {
        const viewBoxArr = splitNumberSequence(viewBox);
        if (viewBoxArr.length >= 4 && (viewBoxRect = {
            x: parseFloat(viewBoxArr[0] || 0),
            y: parseFloat(viewBoxArr[1] || 0),
            width: parseFloat(viewBoxArr[2]),
            height: parseFloat(viewBoxArr[3])
        }, width || height)) {
            const boundingRect = {
                x: 0,
                y: 0,
                width: width,
                height: height
            }, scaleX = boundingRect.width / viewBoxRect.width, scaleY = boundingRect.height / viewBoxRect.height, scale = Math.min(scaleX, scaleY), transLateX = -(viewBoxRect.x + viewBoxRect.width / 2) * scale + (boundingRect.x + boundingRect.width / 2), transLateY = -(viewBoxRect.y + viewBoxRect.height / 2) * scale + (boundingRect.y + boundingRect.height / 2), viewBoxTransform = (new vutils_1.Matrix).translate(transLateX, transLateY).scale(scale, scale);
            root.transform = viewBoxTransform;
        }
    }
    return traverse(svg, root, elements), {
        root: root,
        width: width,
        height: height,
        elements: elements,
        viewBoxRect: viewBoxRect
    };
}

function parseInheritAttributes(parsedElement) {
    let inheritedAttrs;
    const {parent: parent, attributes: attributes} = parsedElement, parse = parent => parent ? validInheritAttributes.reduce(((acc, attrName) => {
        const camelAttrName = (0, vutils_1.toCamelCase)(attrName);
        return (0, vutils_1.isValid)(parent[camelAttrName]) && (acc[camelAttrName] = parent[camelAttrName]), 
        acc;
    }), {}) : {};
    return parent ? (parent._inheritStyle || (parent._inheritStyle = parse(parent.attributes)), 
    inheritedAttrs = (0, vutils_1.merge)({}, parent._inheritStyle, parse(attributes))) : inheritedAttrs = parse(attributes), 
    inheritedAttrs;
}

function parseAttributes(el) {
    var _a, _b, _c;
    const attrs = {}, attributes = null !== (_a = el.attributes) && void 0 !== _a ? _a : {}, style = null !== (_b = el.style) && void 0 !== _b ? _b : {};
    for (let i = 0; i < validAttributes.length; i++) {
        const attrName = validAttributes[i], attrValue = (0, vutils_1.isValid)(style[attrName]) && "" !== style[attrName] ? style[attrName] : null === (_c = attributes[attrName]) || void 0 === _c ? void 0 : _c.value;
        (0, vutils_1.isValid)(attrValue) && (attrs[(0, vutils_1.toCamelCase)(attrName)] = isNaN(+attrValue) ? attrValue : parseFloat(attrValue));
    }
    return "none" === style.display && (attrs.visible = !1), [ "fontSize", "strokeWidth", "width", "height" ].forEach((attr => {
        const attrValue = attrs[attr];
        (0, vutils_1.isString)(attrs[attr]) && (attrs[attr] = parseFloat(attrValue));
    })), attrs;
}

function parseNode(node, parent) {
    var _a, _b, _c, _d, _e;
    const tagName = null === (_a = node.tagName) || void 0 === _a ? void 0 : _a.toLowerCase();
    if (3 === node.nodeType || "text" === tagName || "tspan" === tagName) return parseText(node, parent);
    if (!validTagName.includes(tagName)) return null;
    const parsed = {
        tagName: tagName,
        graphicType: tagNameToType[tagName],
        attributes: parseAttributes(node),
        parent: parent,
        name: null !== (_b = node.getAttribute("name")) && void 0 !== _b ? _b : null === (_c = null == parent ? void 0 : parent.attributes) || void 0 === _c ? void 0 : _c.name,
        id: null !== (_d = node.getAttribute("id")) && void 0 !== _d ? _d : `${tagName}-${idx++}`,
        transform: parseTransform(node)
    };
    return parsed._inheritStyle = parseInheritAttributes(parsed), parent && !(0, vutils_1.isValid)(parsed.name) && (parsed._nameFromParent = null !== (_e = parent.name) && void 0 !== _e ? _e : parent._nameFromParent), 
    parsed;
}

function parseText(node, parent) {
    var _a, _b, _c, _d, _e, _f;
    if (!parent) return null;
    const tagName = null === (_a = node.tagName) || void 0 === _a ? void 0 : _a.toLowerCase();
    if (!tagName && "group" !== parent.graphicType) return null;
    const nodeAsGroup = "text" === tagName || "tspan" === tagName, elType = nodeAsGroup ? "group" : "text", value = nodeAsGroup || null === (_b = node.textContent) || void 0 === _b ? void 0 : _b.replace(/\n/g, " ").replace(/\s+/g, " ");
    if (" " === value) return null;
    let parsed;
    return parsed = nodeAsGroup ? {
        tagName: tagName,
        graphicType: elType,
        attributes: parseAttributes(node),
        parent: parent,
        name: node.getAttribute("name"),
        id: null !== (_c = node.getAttribute("id")) && void 0 !== _c ? _c : `${tagName}-${idx++}`,
        transform: parseTransform(node),
        value: value
    } : {
        tagName: tagName,
        graphicType: "text",
        attributes: parseAttributes(node),
        parent: parent,
        name: null == parent ? void 0 : parent.name,
        id: null !== (_e = null === (_d = node.getAttribute) || void 0 === _d ? void 0 : _d.call(node, "id")) && void 0 !== _e ? _e : `${tagName}-${idx++}`,
        value: value
    }, parsed._inheritStyle = parseInheritAttributes(parsed), (0, vutils_1.isValid)(parsed.name) || (parsed._nameFromParent = null !== (_f = parent.name) && void 0 !== _f ? _f : parent._nameFromParent), 
    nodeAsGroup ? parent._textGroupStyle ? parsed._textGroupStyle = (0, vutils_1.merge)({}, parent._textGroupStyle, parseAttributes(node)) : parsed._textGroupStyle = parseAttributes(node) : parsed.attributes = parsed._inheritStyle, 
    parsed;
}

function parseTransform(node) {
    var _a, _b;
    const transforms = null === (_a = node.transform) || void 0 === _a ? void 0 : _a.baseVal;
    if (!transforms) return null;
    const matrix = null === (_b = transforms.consolidate()) || void 0 === _b ? void 0 : _b.matrix;
    if (!matrix) return null;
    const {a: a, b: b, c: c, d: d, e: e, f: f} = matrix;
    return new vutils_1.Matrix(a, b, c, d, e, f);
}

function traverse(node, parsedParent, result = []) {
    var _a;
    if (!node) return;
    let parseResult;
    "svg" !== node.nodeName && (parseResult = parseNode(node, parsedParent)), parseResult && result.push(parseResult);
    let child = validGroupNode.includes(null === (_a = node.tagName) || void 0 === _a ? void 0 : _a.toLocaleLowerCase()) ? node.firstChild : null;
    for (;child; ) traverse(child, null != parseResult ? parseResult : parsedParent, result), 
    child = child.nextSibling;
}
//# sourceMappingURL=svg.js.map