"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.map = exports.DEFAULT_MAP_LOOK_UP_KEY = void 0;

const data_1 = require("../../constant/data"), base_1 = require("../../constant/base");

exports.DEFAULT_MAP_LOOK_UP_KEY = `${base_1.PREFIX}_MAP_LOOK_UP_KEY`;

const map = (data, opt) => (data.features && data.features.forEach(((f, index) => {
    var _a;
    f[data_1.DEFAULT_DATA_INDEX] = index;
    const name = null === (_a = f.properties) || void 0 === _a ? void 0 : _a[opt.nameProperty];
    opt.nameMap && opt.nameMap[name] ? f[exports.DEFAULT_MAP_LOOK_UP_KEY] = opt.nameMap[name] : f[exports.DEFAULT_MAP_LOOK_UP_KEY] = name;
})), data.features);

exports.map = map;
//# sourceMappingURL=map.js.map
