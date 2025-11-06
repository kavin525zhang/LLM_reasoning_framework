"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.invokeEncoder = exports.invokeEncoderToItems = void 0;

const vutils_1 = require("@visactor/vutils"), vgrammar_util_1 = require("@visactor/vgrammar-util"), mark_1 = require("../../parse/mark"), util_1 = require("../../parse/util"), helpers_1 = require("../attributes/helpers");

function invokeEncoderToItems(element, items, encoder, parameters, onlyFullEncodeFirst) {
    encoder && ((0, util_1.isFunctionType)(encoder) ? items.forEach((item => {
        const attributes = (0, util_1.invokeFunctionType)(encoder, parameters, item.datum, element);
        Object.assign(item.nextAttrs, attributes);
    })) : Object.keys(encoder).forEach((channel => {
        var _a, _b;
        const encode = encoder[channel], encodeItems = onlyFullEncodeFirst && !(0, helpers_1.isPositionOrSizeChannel)(element.mark.markType, channel) ? [ items[0] ] : items;
        if ((0, mark_1.isScaleEncode)(encode)) {
            const scale = (0, util_1.getGrammarOutput)(encode.scale, parameters), offset = null !== (_a = null == encode ? void 0 : encode.offset) && void 0 !== _a ? _a : 0, bandOffset = !(0, 
            vutils_1.isNil)(encode.band) && scale.bandwidth ? scale.bandwidth() * encode.band : null, hasField = (0, 
            vutils_1.isString)(null == encode ? void 0 : encode.field), fieldAccessor = hasField ? (0, 
            vgrammar_util_1.field)(encode.field) : null;
            let to = hasField ? null : (0, vutils_1.isNil)(null == encode ? void 0 : encode.value) ? 0 : null === (_b = scale.scale) || void 0 === _b ? void 0 : _b.call(scale, encode.value);
            encodeItems.forEach((item => {
                var _a;
                hasField && (to = null === (_a = scale.scale) || void 0 === _a ? void 0 : _a.call(scale, fieldAccessor(item.datum))), 
                item.nextAttrs[channel] = (0, vutils_1.isNumber)(to) || (0, vutils_1.isNumber)(bandOffset) ? to + offset + bandOffset : to;
            }));
        } else if ((0, mark_1.isFieldEncode)(encode)) {
            const fieldAccessor = (0, vgrammar_util_1.field)(encode.field);
            encodeItems.forEach((item => {
                item.nextAttrs[channel] = fieldAccessor(item.datum);
            }));
        } else encodeItems.forEach((item => {
            item.nextAttrs[channel] = (0, util_1.invokeFunctionType)(encode, parameters, item.datum, element);
        }));
    })));
}

function invokeEncoder(encoder, datum, element, parameters) {
    if (!encoder) return null;
    if ((0, util_1.isFunctionType)(encoder)) return (0, util_1.invokeFunctionType)(encoder, parameters, datum, element);
    const attributes = {};
    return Object.keys(encoder).forEach((channel => {
        var _a, _b, _c;
        const encode = encoder[channel];
        if ((0, mark_1.isScaleEncode)(encode)) {
            const scale = (0, util_1.getGrammarOutput)(encode.scale, parameters), offset = null !== (_a = null == encode ? void 0 : encode.offset) && void 0 !== _a ? _a : 0, bandOffset = !(0, 
            vutils_1.isNil)(encode.band) && scale.bandwidth ? scale.bandwidth() * encode.band : null, hasField = (0, 
            vutils_1.isString)(null == encode ? void 0 : encode.field), fieldAccessor = hasField ? (0, 
            vgrammar_util_1.field)(encode.field) : null, to = hasField ? null === (_b = scale.scale) || void 0 === _b ? void 0 : _b.call(scale, fieldAccessor(datum)) : (0, 
            vutils_1.isNil)(null == encode ? void 0 : encode.value) ? 0 : null === (_c = scale.scale) || void 0 === _c ? void 0 : _c.call(scale, encode.value);
            attributes[channel] = (0, vutils_1.isNumber)(to) || (0, vutils_1.isNumber)(bandOffset) ? to + offset + bandOffset : to;
        } else if ((0, mark_1.isFieldEncode)(encode)) {
            const fieldAccessor = (0, vgrammar_util_1.field)(encode.field);
            attributes[channel] = fieldAccessor(datum);
        } else attributes[channel] = (0, util_1.invokeFunctionType)(encode, parameters, datum, element);
    })), attributes;
}

exports.invokeEncoderToItems = invokeEncoderToItems, exports.invokeEncoder = invokeEncoder;
//# sourceMappingURL=encode.js.map
