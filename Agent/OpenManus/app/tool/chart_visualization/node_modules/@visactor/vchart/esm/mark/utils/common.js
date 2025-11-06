export const MultiDatumMark = [ "line", "area", "trail" ];

export function isMultiDatumMark(type) {
    return MultiDatumMark.includes(type);
}

export function curveTypeTransform(type, direction) {
    return "monotone" === type ? "horizontal" === direction ? "monotoneY" : "monotoneX" : type;
}

export function is3DMark(type) {
    return [ "arc3d", "rect3d", "pyramid3d" ].includes(type);
}
//# sourceMappingURL=common.js.map
