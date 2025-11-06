"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.morph = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), vutils_1 = require("@visactor/vutils"), util_1 = require("../../parse/util"), differ_1 = require("../mark/differ"), doMorph = (prev, next, runningConfig, onEnd, parameters) => {
    var _a, _b;
    const morphData = {
        prev: prev.map((element => element.getDatum())),
        next: next.map((element => element.getDatum()))
    }, morphElements = {
        prev: prev.slice(),
        next: next.slice()
    }, easing = runningConfig.animation.easing, delay = (0, util_1.invokeFunctionType)(runningConfig.animation.delay, parameters, morphData, morphElements), duration = (0, 
    util_1.invokeFunctionType)(runningConfig.animation.duration, parameters, morphData, morphElements), oneByOne = (0, 
    util_1.invokeFunctionType)(runningConfig.animation.oneByOne, parameters, morphData, morphElements), splitPath = (0, 
    util_1.invokeFunctionType)(runningConfig.animation.splitPath, parameters, morphData, morphElements), individualDelay = (0, 
    vutils_1.isValidNumber)(oneByOne) && oneByOne > 0 ? index => (0, vutils_1.isNumber)(oneByOne) ? index * oneByOne : !0 === oneByOne ? index * duration : 0 : void 0;
    1 !== prev.length && 0 !== prev.length || 1 !== next.length ? 1 === prev.length && next.length > 1 ? (0, 
    vrender_core_1.oneToMultiMorph)(prev[0].getGraphicItem(), next.map((element => element.getGraphicItem())), {
        delay: delay,
        duration: duration,
        easing: easing,
        onEnd: onEnd,
        individualDelay: individualDelay,
        splitPath: splitPath
    }) : prev.length > 1 && 1 === next.length && (0, vrender_core_1.multiToOneMorph)(prev.map((element => element.getGraphicItem())), next[0].getGraphicItem(), {
        delay: delay,
        duration: duration,
        easing: easing,
        onEnd: onEnd,
        individualDelay: individualDelay,
        splitPath: splitPath
    }) : (0, vrender_core_1.morphPath)(null === (_b = null === (_a = prev[0]) || void 0 === _a ? void 0 : _a.getGraphicItem) || void 0 === _b ? void 0 : _b.call(_a), next[0].getGraphicItem(), {
        delay: delay,
        duration: duration,
        easing: easing,
        onEnd: onEnd
    });
}, divideElements = (elements, count) => {
    const divideLength = Math.floor(elements.length / count);
    return new Array(count).fill(0).map(((i, index) => elements.slice(divideLength * index, index === count - 1 ? elements.length : divideLength * (index + 1))));
}, appendMorphKeyToElements = mark => {
    const config = mark.getMorphConfig();
    if (!(0, vutils_1.isNil)(config.morphElementKey)) {
        const getter = (0, util_1.parseField)(config.morphElementKey);
        mark.elements && mark.elements.forEach((el => {
            el.morphKey = getter(el.getDatum());
        }));
    }
}, morph = (prevMarks, nextMarks, runningConfig) => {
    const prevElements = prevMarks.reduce(((elements, mark) => (appendMorphKeyToElements(mark), 
    elements.concat(mark.elements))), []), nextElements = nextMarks.reduce(((elements, mark) => (appendMorphKeyToElements(mark), 
    elements.concat(mark.elements))), []), diffResult = (0, differ_1.diffMultiple)(prevElements, nextElements, (element => {
        var _a;
        return null !== (_a = element.morphKey) && void 0 !== _a ? _a : element.key;
    }));
    prevMarks.forEach((mark => {
        var _a, _b;
        return null === (_b = null === (_a = mark.animate) || void 0 === _a ? void 0 : _a.disable) || void 0 === _b ? void 0 : _b.call(_a);
    })), nextMarks.forEach((mark => {
        var _a, _b;
        return null === (_b = null === (_a = mark.animate) || void 0 === _a ? void 0 : _a.disable) || void 0 === _b ? void 0 : _b.call(_a);
    }));
    const parameters = prevMarks.concat(nextMarks).reduce(((parameters, mark) => (Object.assign(parameters, mark.parameters()), 
    parameters)), {});
    let morphCount = 0;
    const onMorphEnd = () => {
        morphCount -= 1, 0 === morphCount && nextMarks.forEach((mark => {
            var _a, _b;
            null === (_b = null === (_a = mark.animate) || void 0 === _a ? void 0 : _a.enable) || void 0 === _b || _b.call(_a);
        }));
    };
    diffResult.enter.forEach((diff => {
        diff.next.forEach((element => {
            doMorph([], [ element ], runningConfig, onMorphEnd, parameters);
        })), morphCount += 1;
    })), diffResult.update.forEach((diff => {
        const divideCount = Math.min(diff.prev.length, diff.next.length), prevDivide = divideElements(diff.prev, divideCount), nextDivide = divideElements(diff.next, divideCount);
        for (let i = 0; i < divideCount; i++) doMorph(prevDivide[i], nextDivide[i], runningConfig, onMorphEnd, parameters), 
        morphCount += 1;
    }));
};

exports.morph = morph;
//# sourceMappingURL=morph.js.map
