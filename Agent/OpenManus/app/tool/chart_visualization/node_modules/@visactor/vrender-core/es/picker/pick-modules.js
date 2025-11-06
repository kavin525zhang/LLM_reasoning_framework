import { ContainerModule } from "../common/inversify-lite";

import { PickerService, GlobalPickerService, PickItemInterceptor, PickServiceInterceptor } from "./constants";

import { Canvas3DPickItemInterceptor, InteractivePickItemInterceptorContribution, ShadowPickServiceInterceptorContribution, ShadowRootPickItemInterceptorContribution } from "./pick-interceptor";

import { bindContributionProvider } from "../common/contribution-provider";

export default new ContainerModule(((bind, unbind, isBound) => {
    isBound(PickerService) || (bind(GlobalPickerService).toSelf(), bind(PickerService).toService(GlobalPickerService)), 
    bind(Canvas3DPickItemInterceptor).toSelf().inSingletonScope(), bind(PickItemInterceptor).toService(Canvas3DPickItemInterceptor), 
    bind(ShadowRootPickItemInterceptorContribution).toSelf().inSingletonScope(), bind(PickItemInterceptor).toService(ShadowRootPickItemInterceptorContribution), 
    bind(InteractivePickItemInterceptorContribution).toSelf().inSingletonScope(), bind(PickItemInterceptor).toService(InteractivePickItemInterceptorContribution), 
    bindContributionProvider(bind, PickItemInterceptor), bind(ShadowPickServiceInterceptorContribution).toSelf().inSingletonScope(), 
    bind(PickServiceInterceptor).toService(ShadowPickServiceInterceptorContribution), 
    bindContributionProvider(bind, PickServiceInterceptor);
}));
//# sourceMappingURL=pick-modules.js.map
