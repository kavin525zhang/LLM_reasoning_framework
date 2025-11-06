export const deltaXYToAngle = (y, x) => {
    const angle = Math.atan2(y, x);
    return angle < 0 ? angle + 2 * Math.PI : angle;
};

export const tan2AngleToAngle = angle => angle < 0 ? angle + 2 * Math.PI : angle;
//# sourceMappingURL=polar.js.map
