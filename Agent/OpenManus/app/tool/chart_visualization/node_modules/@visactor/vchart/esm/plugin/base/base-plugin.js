import { createID } from "../../util/id";

export class BasePlugin {
    constructor(type) {
        this.id = createID(), this.name = `${type}_${this.id}`;
    }
    onAdd(service) {
        this.service = service;
    }
    release() {
        this.service = null;
    }
}
//# sourceMappingURL=base-plugin.js.map
