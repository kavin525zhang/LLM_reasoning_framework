import { Factory } from "@visactor/vgrammar-core";

import { transform, transformMark } from "./venn";

export * from "./interface";

export * from "./animation";

export const vennTransform = transform;

export const vennMarkTransform = transformMark;

export const registerVennTransforms = () => {
    Factory.registerTransform("venn", {
        transform: transform,
        markPhase: "beforeJoin"
    }, !0), Factory.registerTransform("vennMark", {
        transform: transformMark,
        markPhase: "beforeJoin"
    }, !0);
};
//# sourceMappingURL=index.js.map