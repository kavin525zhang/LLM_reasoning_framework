import { DEFAULT_DATA_INDEX } from "../../constant/data";

import { PREFIX } from "../../constant/base";

export const DEFAULT_MAP_LOOK_UP_KEY = `${PREFIX}_MAP_LOOK_UP_KEY`;

export const map = (data, opt) => (data.features && data.features.forEach(((f, index) => {
    var _a;
    f[DEFAULT_DATA_INDEX] = index;
    const name = null === (_a = f.properties) || void 0 === _a ? void 0 : _a[opt.nameProperty];
    opt.nameMap && opt.nameMap[name] ? f[DEFAULT_MAP_LOOK_UP_KEY] = opt.nameMap[name] : f[DEFAULT_MAP_LOOK_UP_KEY] = name;
})), data.features);
//# sourceMappingURL=map.js.map
