export function queryToken(tokenMap, tokenKey) {
    return tokenMap && tokenKey.key in tokenMap ? tokenMap[tokenKey.key] : tokenKey.default;
}

export function isTokenKey(obj) {
    return obj && "token" === obj.type && !!obj.key;
}
//# sourceMappingURL=util.js.map
