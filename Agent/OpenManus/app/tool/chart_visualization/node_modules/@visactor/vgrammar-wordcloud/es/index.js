import { Factory } from "@visactor/vgrammar-core";

import { transform } from "./wordcloud";

export const registerWordCloudTransforms = () => {
    Factory.registerTransform("wordcloud", {
        transform: transform,
        markPhase: "beforeJoin"
    }, !0);
};

export const wordcloudTransform = transform;

export { shapes } from "@visactor/vgrammar-util";
//# sourceMappingURL=index.js.map