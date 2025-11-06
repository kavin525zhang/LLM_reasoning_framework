"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Base3dRender = void 0;

const store_1 = require("../../../color-string/store"), base_render_1 = require("./base-render");

class Base3dRender extends base_render_1.BaseRender {
    stroke(x, y, z, face3d, context) {
        const vertices = face3d.vertices;
        face3d.edges.forEach((edge => {
            const p1 = vertices[edge[0]], v1 = {
                x: x + p1[0],
                y: y + p1[1],
                z: z + p1[2]
            }, p2 = vertices[edge[1]], v2 = {
                x: x + p2[0],
                y: y + p2[1],
                z: z + p2[2]
            };
            context.beginPath(), context.moveTo(v1.x, v1.y, v1.z), context.lineTo(v2.x, v2.y, v2.z), 
            context.stroke();
        }));
    }
    fill(x, y, z, face3d, faces, fillColor, context, light, graphic3d, graphic3dAttribute, fillCb) {
        const rgbArray = store_1.ColorStore.Get(fillColor, store_1.ColorType.Color255), vertices = face3d.vertices, viewdVerticesZ = vertices.map((v => context.view(v[0], v[1], v[2])[2])), sortFace = [];
        face3d.polygons.forEach(((p, i) => {
            if (faces && !faces[i]) return;
            sortFace.push({
                faceIdx: i,
                polygon: p
            });
            const {polygon: polygon} = p, z1 = viewdVerticesZ[polygon[0]], z2 = viewdVerticesZ[polygon[1]], z3 = viewdVerticesZ[polygon[2]], z4 = viewdVerticesZ[polygon[3]];
            p.ave_z = z1 + z2 + z3 + z4;
        })), sortFace.sort(((a, b) => b.polygon.ave_z - a.polygon.ave_z)), sortFace.forEach((item => {
            const {polygon: polygon, normal: normal} = item.polygon, p1 = vertices[polygon[0]], p2 = vertices[polygon[1]], p3 = vertices[polygon[2]], p4 = vertices[polygon[3]], v1 = {
                x: x + p1[0],
                y: y + p1[1],
                z: z + p1[2]
            }, v2 = {
                x: x + p2[0],
                y: y + p2[1],
                z: z + p2[2]
            }, v3 = {
                x: x + p3[0],
                y: y + p3[1],
                z: z + p3[2]
            }, v4 = {
                x: x + p4[0],
                y: y + p4[1],
                z: z + p4[2]
            };
            context.beginPath(), context.moveTo(v1.x, v1.y, v1.z), context.lineTo(v2.x, v2.y, v2.z), 
            context.lineTo(v3.x, v3.y, v3.z), context.lineTo(v4.x, v4.y, v4.z), context.closePath(), 
            fillCb ? fillCb(context, graphic3d && graphic3d.attribute, graphic3dAttribute) : (context.fillStyle = light ? light.computeColor(normal, rgbArray) : fillColor, 
            context.fill());
        }));
    }
}

exports.Base3dRender = Base3dRender;
//# sourceMappingURL=base-3d-render.js.map
