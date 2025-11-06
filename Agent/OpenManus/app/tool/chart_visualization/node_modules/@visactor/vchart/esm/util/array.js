import { array, last as peek, maxInArray as maxInArr, minInArray as minInArr } from "@visactor/vutils";

export function shallowCompare(arrA, arrB) {
    const setA = new Set(array(arrA)), setB = new Set(array(arrB));
    if (setA.size !== setB.size) return !1;
    for (const v of setA.values()) if (!setB.has(v)) return !1;
    return !0;
}

export function combineDomains(domains) {
    const result = [];
    for (let index = 0; index < domains.length; index++) {
        const domain = domains[index];
        0 !== index && domain[0] === result[result.length - 1] || result.push(domain[0]), 
        result.push(domain[1]);
    }
    return result;
}

export { array, peek, maxInArr, minInArr };
//# sourceMappingURL=array.js.map
