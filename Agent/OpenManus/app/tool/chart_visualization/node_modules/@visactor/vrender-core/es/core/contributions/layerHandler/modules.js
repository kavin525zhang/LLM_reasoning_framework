import { ContainerModule } from "../../../common/inversify-lite";

import { StaticLayerHandlerContribution } from "../../constants";

import { CanvasLayerHandlerContribution } from "./canvas2d-contribution";

export default new ContainerModule((bind => {
    bind(CanvasLayerHandlerContribution).toSelf(), bind(StaticLayerHandlerContribution).toService(CanvasLayerHandlerContribution);
}));
//# sourceMappingURL=modules.js.map
