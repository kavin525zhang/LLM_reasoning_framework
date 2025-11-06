"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.draw3dItem = void 0;

const vutils_1 = require("@visactor/vutils"), constants_1 = require("../graphic/constants"), draw3dItem = (context, graphic, callback, output) => {
    let result, isPie = !1, is3d = !1;
    if (graphic.forEachChildren((c => (isPie = c.numberType === constants_1.ARC3D_NUMBER_TYPE, 
    !isPie))), graphic.forEachChildren((c => (is3d = !!c.findFace, !is3d))), isPie) {
        const children = graphic.getChildren(), sortedChildren = [ ...children ];
        sortedChildren.sort(((a, b) => {
            var _a, _b, _c, _d;
            let angle1 = (null !== (_b = null !== (_a = a.attribute.startAngle) && void 0 !== _a ? _a : 0 + a.attribute.endAngle) && void 0 !== _b ? _b : 0) / 2, angle2 = (null !== (_d = null !== (_c = b.attribute.startAngle) && void 0 !== _c ? _c : 0 + b.attribute.endAngle) && void 0 !== _d ? _d : 0) / 2;
            for (;angle1 < 0; ) angle1 += vutils_1.pi2;
            for (;angle2 < 0; ) angle2 += vutils_1.pi2;
            return angle2 - angle1;
        })), sortedChildren.forEach((c => {
            c._next = null, c._prev = null;
        })), graphic.removeAllChild(), graphic.update(), sortedChildren.forEach((c => {
            graphic.appendChild(c);
        })), output.hack_pieFace = "outside", result = callback(isPie, is3d), result && result.graphic || (output.hack_pieFace = "inside", 
        result = callback(isPie, is3d)), result && result.graphic || (output.hack_pieFace = "top", 
        result = callback(isPie, is3d)), graphic.removeAllChild(), children.forEach((c => {
            c._next = null, c._prev = null;
        })), children.forEach((c => {
            graphic.appendChild(c);
        }));
    } else if (is3d) {
        const children = graphic.getChildren(), zChildren = children.map((g => ({
            ave_z: g.findFace().vertices.map((v => {
                var _a;
                return context.view(v[0], v[1], null !== (_a = v[2] + g.attribute.z) && void 0 !== _a ? _a : 0)[2];
            })).reduce(((a, b) => a + b), 0),
            g: g
        })));
        zChildren.sort(((a, b) => b.ave_z - a.ave_z)), graphic.removeAllChild(), zChildren.forEach((i => {
            i.g._next = null, i.g._prev = null;
        })), graphic.update(), zChildren.forEach((i => {
            graphic.add(i.g);
        })), result = callback(isPie, is3d), graphic.removeAllChild(), children.forEach((g => {
            g._next = null, g._prev = null;
        })), graphic.update(), children.forEach((g => {
            graphic.add(g);
        }));
    } else result = callback(isPie, is3d);
    return result;
};

exports.draw3dItem = draw3dItem;
//# sourceMappingURL=3d-interceptor.js.map