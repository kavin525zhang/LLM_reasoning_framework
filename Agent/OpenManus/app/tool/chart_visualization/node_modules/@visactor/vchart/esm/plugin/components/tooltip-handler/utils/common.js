import { isString, isNumber } from "@visactor/vutils";

import { TOOLTIP_EMPTY_STRING } from "../constants";

export function escapeHTML(value) {
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\(/g, "&#40;").replace(/  /g, " &nbsp;");
}

export const getScale = (element, boundingClientRect) => element ? (boundingClientRect || (boundingClientRect = element.getBoundingClientRect()), 
element.offsetWidth > 0 ? boundingClientRect.width / element.offsetWidth : element.offsetHeight > 0 ? boundingClientRect.height / element.offsetHeight : 1) : 1;

export const formatContent = content => isString(content) && "" !== (null == content ? void 0 : content.trim()) || isNumber(content) ? escapeHTML(content) : TOOLTIP_EMPTY_STRING;
//# sourceMappingURL=common.js.map
