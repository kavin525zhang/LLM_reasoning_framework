import { isNil, isNumber, isString } from "@visactor/vutils";

import { field as getFieldAccessor } from "@visactor/vgrammar-util";

import { isFieldEncode, isScaleEncode } from "../../parse/mark";

import { getGrammarOutput, invokeFunctionType, isFunctionType } from "../../parse/util";

import { isPositionOrSizeChannel } from "../attributes/helpers";

export function invokeEncoderToItems(element, items, encoder, parameters, onlyFullEncodeFirst) {
    encoder && (isFunctionType(encoder) ? items.forEach((item => {
        const attributes = invokeFunctionType(encoder, parameters, item.datum, element);
        Object.assign(item.nextAttrs, attributes);
    })) : Object.keys(encoder).forEach((channel => {
        var _a, _b;
        const encode = encoder[channel], encodeItems = onlyFullEncodeFirst && !isPositionOrSizeChannel(element.mark.markType, channel) ? [ items[0] ] : items;
        if (isScaleEncode(encode)) {
            const scale = getGrammarOutput(encode.scale, parameters), offset = null !== (_a = null == encode ? void 0 : encode.offset) && void 0 !== _a ? _a : 0, bandOffset = !isNil(encode.band) && scale.bandwidth ? scale.bandwidth() * encode.band : null, hasField = isString(null == encode ? void 0 : encode.field), fieldAccessor = hasField ? getFieldAccessor(encode.field) : null;
            let to = hasField ? null : isNil(null == encode ? void 0 : encode.value) ? 0 : null === (_b = scale.scale) || void 0 === _b ? void 0 : _b.call(scale, encode.value);
            encodeItems.forEach((item => {
                var _a;
                hasField && (to = null === (_a = scale.scale) || void 0 === _a ? void 0 : _a.call(scale, fieldAccessor(item.datum))), 
                item.nextAttrs[channel] = isNumber(to) || isNumber(bandOffset) ? to + offset + bandOffset : to;
            }));
        } else if (isFieldEncode(encode)) {
            const fieldAccessor = getFieldAccessor(encode.field);
            encodeItems.forEach((item => {
                item.nextAttrs[channel] = fieldAccessor(item.datum);
            }));
        } else encodeItems.forEach((item => {
            item.nextAttrs[channel] = invokeFunctionType(encode, parameters, item.datum, element);
        }));
    })));
}

export function invokeEncoder(encoder, datum, element, parameters) {
    if (!encoder) return null;
    if (isFunctionType(encoder)) return invokeFunctionType(encoder, parameters, datum, element);
    const attributes = {};
    return Object.keys(encoder).forEach((channel => {
        var _a, _b, _c;
        const encode = encoder[channel];
        if (isScaleEncode(encode)) {
            const scale = getGrammarOutput(encode.scale, parameters), offset = null !== (_a = null == encode ? void 0 : encode.offset) && void 0 !== _a ? _a : 0, bandOffset = !isNil(encode.band) && scale.bandwidth ? scale.bandwidth() * encode.band : null, hasField = isString(null == encode ? void 0 : encode.field), fieldAccessor = hasField ? getFieldAccessor(encode.field) : null, to = hasField ? null === (_b = scale.scale) || void 0 === _b ? void 0 : _b.call(scale, fieldAccessor(datum)) : isNil(null == encode ? void 0 : encode.value) ? 0 : null === (_c = scale.scale) || void 0 === _c ? void 0 : _c.call(scale, encode.value);
            attributes[channel] = isNumber(to) || isNumber(bandOffset) ? to + offset + bandOffset : to;
        } else if (isFieldEncode(encode)) {
            const fieldAccessor = getFieldAccessor(encode.field);
            attributes[channel] = fieldAccessor(datum);
        } else attributes[channel] = invokeFunctionType(encode, parameters, datum, element);
    })), attributes;
}
//# sourceMappingURL=encode.js.map
