"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.mergeSpecWithFilter = exports.mergeSpec = void 0;

const vutils_1 = require("@visactor/vutils");

function mergeSpec(target, ...sources) {
    let sourceIndex = -1;
    const length = sources.length;
    for (;++sourceIndex < length; ) {
        const source = sources[sourceIndex];
        (0, vutils_1.baseMerge)(target, source, !0, !0);
    }
    return target;
}

function mergeSpecWithFilter(target, filter, spec, forceMerge) {
    Object.keys(target).forEach((k => {
        if ((0, vutils_1.isObject)(filter)) filter.type === k && ((0, vutils_1.isArray)(target[k]) ? target[k].length >= filter.index && (target[k][filter.index] = forceMerge ? mergeSpec({}, target[k][filter.index], spec) : spec) : target[k] = forceMerge ? mergeSpec({}, target[k], spec) : spec); else if ((0, 
        vutils_1.isArray)(target[k])) {
            const index = target[k].findIndex((_s => _s.id === filter));
            index >= 0 && (target[k][index] = forceMerge ? mergeSpec({}, target[k][index], spec) : spec);
        } else target.id === filter && (target[k] = forceMerge ? mergeSpec({}, target[k], spec) : spec);
    }));
}

exports.mergeSpec = mergeSpec, exports.mergeSpecWithFilter = mergeSpecWithFilter;
//# sourceMappingURL=merge-spec.js.map