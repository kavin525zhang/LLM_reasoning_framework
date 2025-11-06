"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.formatContent = exports.getScale = exports.escapeHTML = void 0;

const vutils_1 = require("@visactor/vutils"), constants_1 = require("../constants");

function escapeHTML(value) {
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\(/g, "&#40;").replace(/  /g, " &nbsp;");
}

exports.escapeHTML = escapeHTML;

const getScale = (element, boundingClientRect) => element ? (boundingClientRect || (boundingClientRect = element.getBoundingClientRect()), 
element.offsetWidth > 0 ? boundingClientRect.width / element.offsetWidth : element.offsetHeight > 0 ? boundingClientRect.height / element.offsetHeight : 1) : 1;

exports.getScale = getScale;

const formatContent = content => (0, vutils_1.isString)(content) && "" !== (null == content ? void 0 : content.trim()) || (0, 
vutils_1.isNumber)(content) ? escapeHTML(content) : constants_1.TOOLTIP_EMPTY_STRING;

exports.formatContent = formatContent;
//# sourceMappingURL=common.js.map
