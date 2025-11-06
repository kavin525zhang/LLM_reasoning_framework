"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ViewDiff = void 0;

const differ_1 = require("./mark/differ"), enums_1 = require("./enums"), EmptyKey = Symbol.for("key");

class ViewDiff {
    diffGrammar(prevGrammars, nextGrammars) {
        return (0, differ_1.diffSingle)(prevGrammars, nextGrammars, (grammar => {
            var _a;
            return null !== (_a = grammar.id()) && void 0 !== _a ? _a : Symbol();
        }));
    }
    diffMark(prevMarks, nextMarks, runningConfig) {
        const diffResult = {
            enter: [],
            exit: [],
            update: []
        };
        let prevDiffMarks = [], nextDiffMarks = [];
        prevMarks.forEach((mark => {
            mark.markType !== enums_1.GrammarMarkType.group && (runningConfig.morph && mark.getMorphConfig().morph || runningConfig.morphAll || runningConfig.reuse) ? prevDiffMarks.push(mark) : diffResult.exit.push({
                prev: [ mark ]
            });
        })), nextMarks.forEach((mark => {
            mark.markType !== enums_1.GrammarMarkType.group && (runningConfig.morph && mark.getMorphConfig().morph || runningConfig.morphAll || runningConfig.reuse) ? nextDiffMarks.push(mark) : diffResult.enter.push({
                next: [ mark ]
            });
        }));
        const keyDiffResult = this.diffUpdateByGroup(prevDiffMarks, nextDiffMarks, (mark => mark.getMorphConfig().morphKey), (mark => mark.getMorphConfig().morphKey));
        prevDiffMarks = keyDiffResult.prev, nextDiffMarks = keyDiffResult.next, diffResult.update = diffResult.update.concat(keyDiffResult.update);
        const nameDiffResult = this.diffUpdateByGroup(prevDiffMarks, nextDiffMarks, (mark => mark.id()), (mark => mark.id()));
        prevDiffMarks = nameDiffResult.prev, nextDiffMarks = nameDiffResult.next, diffResult.update = diffResult.update.concat(nameDiffResult.update);
        const prevParentGroup = (0, differ_1.groupData)(prevDiffMarks, (mark => {
            var _a, _b;
            return null === (_b = null === (_a = mark.group) || void 0 === _a ? void 0 : _a.id) || void 0 === _b ? void 0 : _b.call(_a);
        })), nextParentGroup = (0, differ_1.groupData)(nextDiffMarks, (mark => {
            var _a, _b;
            return null === (_b = null === (_a = mark.group) || void 0 === _a ? void 0 : _a.id) || void 0 === _b ? void 0 : _b.call(_a);
        }));
        return Object.keys(nextParentGroup).forEach((groupName => {
            const prevChildren = prevParentGroup.data.get(groupName), nextChildren = nextParentGroup.data.get(groupName);
            if (prevChildren && nextChildren) {
                for (let i = 0; i < Math.max(prevChildren.length, nextChildren.length); i += 1) {
                    const prevChild = prevChildren[i], nextChild = nextChildren[i];
                    prevChild && nextChild ? diffResult.update.push({
                        prev: [ prevChild ],
                        next: [ nextChild ]
                    }) : prevChild ? diffResult.exit.push({
                        prev: [ prevChild ]
                    }) : nextChild && diffResult.enter.push({
                        next: [ nextChild ]
                    });
                }
                prevDiffMarks = prevDiffMarks.filter((mark => !prevChildren.includes(mark))), nextDiffMarks = nextDiffMarks.filter((mark => !nextChildren.includes(mark)));
            }
        })), prevDiffMarks.forEach((mark => diffResult.exit.push({
            prev: [ mark ]
        }))), nextDiffMarks.forEach((mark => diffResult.enter.push({
            next: [ mark ]
        }))), diffResult;
    }
    diffUpdateByGroup(prev, next, prevKey, nextKey) {
        const prevGroup = (0, differ_1.groupData)(prev, (datum => {
            var _a;
            return null !== (_a = prevKey(datum)) && void 0 !== _a ? _a : EmptyKey;
        })), nextGroup = (0, differ_1.groupData)(next, (datum => {
            var _a;
            return null !== (_a = nextKey(datum)) && void 0 !== _a ? _a : EmptyKey;
        }));
        let prevAfterDiff = prev, nextAfterDiff = next;
        const update = [];
        return nextGroup.keys.forEach((key => {
            if (key !== EmptyKey) {
                const prevKeyData = prevGroup.data.get(key), nextKeyData = nextGroup.data.get(key);
                prevKeyData && nextKeyData && (update.push({
                    prev: prevKeyData,
                    next: nextKeyData
                }), prevAfterDiff = prevAfterDiff.filter((datum => !prevKeyData.includes(datum))), 
                nextAfterDiff = nextAfterDiff.filter((datum => !nextKeyData.includes(datum))));
            }
        })), {
            prev: prevAfterDiff,
            next: nextAfterDiff,
            update: update
        };
    }
}

exports.ViewDiff = ViewDiff;
//# sourceMappingURL=view-diff.js.map