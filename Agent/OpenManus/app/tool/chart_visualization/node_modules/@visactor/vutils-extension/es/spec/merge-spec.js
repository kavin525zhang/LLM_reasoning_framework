import { baseMerge, isArray, isObject } from "@visactor/vutils";

export function mergeSpec(target, ...sources) {
    let sourceIndex = -1;
    const length = sources.length;
    for (;++sourceIndex < length; ) {
        const source = sources[sourceIndex];
        baseMerge(target, source, !0, !0);
    }
    return target;
}

export function mergeSpecWithFilter(target, filter, spec, forceMerge) {
    Object.keys(target).forEach((k => {
        if (isObject(filter)) filter.type === k && (isArray(target[k]) ? target[k].length >= filter.index && (target[k][filter.index] = forceMerge ? mergeSpec({}, target[k][filter.index], spec) : spec) : target[k] = forceMerge ? mergeSpec({}, target[k], spec) : spec); else if (isArray(target[k])) {
            const index = target[k].findIndex((_s => _s.id === filter));
            index >= 0 && (target[k][index] = forceMerge ? mergeSpec({}, target[k][index], spec) : spec);
        } else target.id === filter && (target[k] = forceMerge ? mergeSpec({}, target[k], spec) : spec);
    }));
}
//# sourceMappingURL=merge-spec.js.map