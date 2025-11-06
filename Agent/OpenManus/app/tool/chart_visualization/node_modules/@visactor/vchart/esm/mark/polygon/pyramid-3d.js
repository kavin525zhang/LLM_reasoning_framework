import { Factory } from "./../../core/factory";

import { BasePolygonMark } from "./base-polygon";

import { registerPyramid3dGraphic } from "@visactor/vgrammar-core";

import { registerVGrammarPolygonAnimation } from "../../animation/config";

export class Pyramid3dMark extends BasePolygonMark {
    constructor() {
        super(...arguments), this.type = Pyramid3dMark.type;
    }
}

Pyramid3dMark.type = "pyramid3d";

export const registerPyramid3dMark = () => {
    Factory.registerMark(Pyramid3dMark.type, Pyramid3dMark), registerPyramid3dGraphic(), 
    registerVGrammarPolygonAnimation();
};
//# sourceMappingURL=pyramid-3d.js.map
