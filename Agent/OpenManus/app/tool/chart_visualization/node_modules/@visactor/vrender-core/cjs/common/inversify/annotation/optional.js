"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.optional = void 0;

const meta_data_1 = require("../meta-data"), metadata_keys_1 = require("../metadata_keys"), inject_base_1 = require("./inject_base");

function optional() {
    return (0, inject_base_1.createTaggedDecorator)(new meta_data_1.Metadata(metadata_keys_1.OPTIONAL_TAG, !0));
}

exports.optional = optional;
//# sourceMappingURL=optional.js.map
