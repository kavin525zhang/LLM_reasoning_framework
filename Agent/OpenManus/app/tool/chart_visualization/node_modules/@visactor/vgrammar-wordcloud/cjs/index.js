"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.shapes = exports.wordcloudTransform = exports.registerWordCloudTransforms = void 0;

const vgrammar_core_1 = require("@visactor/vgrammar-core"), wordcloud_1 = require("./wordcloud"), registerWordCloudTransforms = () => {
    vgrammar_core_1.Factory.registerTransform("wordcloud", {
        transform: wordcloud_1.transform,
        markPhase: "beforeJoin"
    }, !0);
};

exports.registerWordCloudTransforms = registerWordCloudTransforms, exports.wordcloudTransform = wordcloud_1.transform;

var vgrammar_util_1 = require("@visactor/vgrammar-util");

Object.defineProperty(exports, "shapes", {
    enumerable: !0,
    get: function() {
        return vgrammar_util_1.shapes;
    }
});
//# sourceMappingURL=index.js.map