import { Arc } from "./arc";

import { application } from "../application";

import { ARC3D_NUMBER_TYPE } from "./constants";

import { NOWORK_ANIMATE_ATTR } from "./graphic";

export class Arc3d extends Arc {
    constructor(params) {
        super(params), this.type = "arc3d", this.numberType = ARC3D_NUMBER_TYPE;
    }
    updateAABBBounds(attribute, arcTheme, aabbBounds) {
        const stage = this.stage;
        if (!stage || !stage.camera) return aabbBounds;
        const {outerRadius: outerRadius = arcTheme.outerRadius, height: height = 0} = attribute, r = outerRadius + height;
        return aabbBounds.setValue(-r, -r, r, r), application.graphicService.updateTempAABBBounds(aabbBounds), 
        application.graphicService.transformAABBBounds(attribute, aabbBounds, arcTheme, !1, this), 
        aabbBounds;
    }
    getNoWorkAnimateAttr() {
        return Arc3d.NOWORK_ANIMATE_ATTR;
    }
}

Arc3d.NOWORK_ANIMATE_ATTR = Object.assign({
    cap: 1
}, NOWORK_ANIMATE_ATTR);

export function createArc3d(attributes) {
    return new Arc3d(attributes);
}
//# sourceMappingURL=arc3d.js.map
