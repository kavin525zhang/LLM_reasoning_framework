import { BasePluginService } from "../base/base-plugin-service";

export class ComponentPluginService extends BasePluginService {
    constructor(component) {
        super(), this.component = component;
    }
    releaseAll() {
        super.releaseAll(), this.component = null;
    }
}
//# sourceMappingURL=plugin-service.js.map
