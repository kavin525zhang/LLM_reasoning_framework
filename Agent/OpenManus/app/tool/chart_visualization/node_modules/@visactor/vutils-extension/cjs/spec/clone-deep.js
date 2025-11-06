"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.cloneDeepSpec = void 0;

const vutils_1 = require("@visactor/vutils"), vdataset_1 = require("@visactor/vdataset"), ignoreWhen = value => (0, 
vdataset_1.isDataView)(value) || (0, vutils_1.isHTMLElement)(value);

function cloneDeepSpec(spec, excludeKeys = [ "data" ]) {
    return (0, vutils_1.cloneDeep)(spec, ignoreWhen, excludeKeys);
}

exports.cloneDeepSpec = cloneDeepSpec;
//# sourceMappingURL=clone-deep.js.map