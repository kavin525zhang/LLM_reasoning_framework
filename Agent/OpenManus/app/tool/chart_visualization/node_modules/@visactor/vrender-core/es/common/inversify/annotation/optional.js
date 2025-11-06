import { Metadata } from "../meta-data";

import { OPTIONAL_TAG } from "../metadata_keys";

import { createTaggedDecorator } from "./inject_base";

function optional() {
    return createTaggedDecorator(new Metadata(OPTIONAL_TAG, !0));
}

export { optional };
//# sourceMappingURL=optional.js.map
