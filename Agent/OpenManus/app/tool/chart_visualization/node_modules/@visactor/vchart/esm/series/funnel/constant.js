import { baseSeriesMark } from "../base/constant";

export const funnelSeriesMark = Object.assign(Object.assign({}, baseSeriesMark), {
    funnel: {
        name: "funnel",
        type: "polygon"
    },
    transform: {
        name: "transform",
        type: "polygon"
    },
    transformLabel: {
        name: "transformLabel",
        type: "text"
    },
    outerLabel: {
        name: "outerLabel",
        type: "text"
    },
    outerLabelLine: {
        name: "outerLabelLine",
        type: "rule"
    }
});

export const funnel3dSeriesMark = Object.assign(Object.assign({}, baseSeriesMark), {
    funnel3d: {
        name: "funnel3d",
        type: "pyramid3d"
    },
    transform3d: {
        name: "transform3d",
        type: "pyramid3d"
    },
    transformLabel: {
        name: "transformLabel",
        type: "text"
    },
    outerLabel: {
        name: "outerLabel",
        type: "text"
    },
    outerLabelLine: {
        name: "outerLabelLine",
        type: "rule"
    }
});
//# sourceMappingURL=constant.js.map
