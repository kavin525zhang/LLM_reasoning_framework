"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
});

const inversify_lite_1 = require("../../../common/inversify-lite"), constants_1 = require("../../constants"), canvas2d_contribution_1 = require("./canvas2d-contribution");

exports.default = new inversify_lite_1.ContainerModule((bind => {
    bind(canvas2d_contribution_1.CanvasLayerHandlerContribution).toSelf(), bind(constants_1.StaticLayerHandlerContribution).toService(canvas2d_contribution_1.CanvasLayerHandlerContribution);
}));
//# sourceMappingURL=modules.js.map
