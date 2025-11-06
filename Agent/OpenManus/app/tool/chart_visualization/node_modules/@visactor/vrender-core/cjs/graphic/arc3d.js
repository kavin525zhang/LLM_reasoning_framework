"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.createArc3d = exports.Arc3d = void 0;

const arc_1 = require("./arc"), application_1 = require("../application"), constants_1 = require("./constants"), graphic_1 = require("./graphic");

class Arc3d extends arc_1.Arc {
    constructor(params) {
        super(params), this.type = "arc3d", this.numberType = constants_1.ARC3D_NUMBER_TYPE;
    }
    updateAABBBounds(attribute, arcTheme, aabbBounds) {
        const stage = this.stage;
        if (!stage || !stage.camera) return aabbBounds;
        const {outerRadius: outerRadius = arcTheme.outerRadius, height: height = 0} = attribute, r = outerRadius + height;
        return aabbBounds.setValue(-r, -r, r, r), application_1.application.graphicService.updateTempAABBBounds(aabbBounds), 
        application_1.application.graphicService.transformAABBBounds(attribute, aabbBounds, arcTheme, !1, this), 
        aabbBounds;
    }
    getNoWorkAnimateAttr() {
        return Arc3d.NOWORK_ANIMATE_ATTR;
    }
}

function createArc3d(attributes) {
    return new Arc3d(attributes);
}

exports.Arc3d = Arc3d, Arc3d.NOWORK_ANIMATE_ATTR = Object.assign({
    cap: 1
}, graphic_1.NOWORK_ANIMATE_ATTR), exports.createArc3d = createArc3d;
//# sourceMappingURL=arc3d.js.map
