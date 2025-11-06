import { clamper } from "@visactor/vutils";

function generateTicks(start, stop, step, reverse) {
    const ticks = [];
    let ptr = start;
    for (;ptr <= stop; ) ticks.push(ptr), ptr += step;
    return reverse && ticks.reverse(), ticks;
}

export function ticks(start, stop, count, allowExcessive) {
    let reverse, step;
    if (stop = Math.floor(+stop), start = Math.floor(+start), !(count = Math.floor(+count))) return [];
    if (start === stop) return [ start ];
    if (reverse = stop < start) {
        const n = start;
        start = stop, stop = n;
    }
    let expectedCount = clamper(1, stop - start + 1)(count);
    if (step = Math.floor((stop - start + 1) / expectedCount), !allowExcessive) for (;Math.ceil((stop - start + 1) / step) > count && expectedCount > 1; ) expectedCount -= 1, 
    step = Math.floor((stop - start) / expectedCount);
    return generateTicks(start, stop, step, reverse);
}

export function stepTicks(start, stop, step) {
    let reverse;
    if (stop = Math.floor(+stop), start = Math.floor(+start), step = clamper(1, stop - start + 1)(Math.floor(+step)), 
    reverse = stop < start) {
        const n = start;
        start = stop, stop = n;
    }
    return generateTicks(start, stop, step, reverse);
}
//# sourceMappingURL=tick-sample-int.js.map