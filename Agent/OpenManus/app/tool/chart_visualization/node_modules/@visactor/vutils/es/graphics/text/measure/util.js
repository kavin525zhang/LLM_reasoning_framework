export function getContextFont(text, defaultAttr = {}, fontSizeScale) {
    fontSizeScale || (fontSizeScale = 1);
    const {fontStyle: fontStyle = defaultAttr.fontStyle, fontVariant: fontVariant = defaultAttr.fontVariant, fontWeight: fontWeight = defaultAttr.fontWeight, fontSize: fontSize = defaultAttr.fontSize, fontFamily: fontFamily = defaultAttr.fontFamily} = text;
    return (fontStyle ? fontStyle + " " : "") + (fontVariant ? fontVariant + " " : "") + (fontWeight ? fontWeight + " " : "") + fontSize * fontSizeScale + "px " + (fontFamily || "sans-serif");
}
//# sourceMappingURL=util.js.map
