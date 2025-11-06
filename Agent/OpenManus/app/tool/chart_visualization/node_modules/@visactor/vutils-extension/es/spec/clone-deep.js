import { isHTMLElement, cloneDeep } from "@visactor/vutils";

import { isDataView } from "@visactor/vdataset";

const ignoreWhen = value => isDataView(value) || isHTMLElement(value);

export function cloneDeepSpec(spec, excludeKeys = [ "data" ]) {
    return cloneDeep(spec, ignoreWhen, excludeKeys);
}
//# sourceMappingURL=clone-deep.js.map