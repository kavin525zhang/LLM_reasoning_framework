"use strict";

function queryToken(tokenMap, tokenKey) {
    return tokenMap && tokenKey.key in tokenMap ? tokenMap[tokenKey.key] : tokenKey.default;
}

function isTokenKey(obj) {
    return obj && "token" === obj.type && !!obj.key;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.isTokenKey = exports.queryToken = void 0, exports.queryToken = queryToken, 
exports.isTokenKey = isTokenKey;
//# sourceMappingURL=util.js.map
