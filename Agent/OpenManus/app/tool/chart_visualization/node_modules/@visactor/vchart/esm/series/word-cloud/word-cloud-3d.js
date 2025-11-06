import { AttributeLevel } from "../../constant/attribute";

import { registerTextMark } from "../../mark/text";

import { SeriesTypeEnum } from "../interface/type";

import { animationConfig, userAnimationConfig } from "../../animation/utils";

import { BaseWordCloudSeries } from "./base";

import { Factory } from "../../core/factory";

import { registerWordCloud3dAnimation } from "./animation";

import { registerWordCloudTransforms } from "@visactor/vgrammar-wordcloud";

import { registerWordCloudShapeTransforms } from "@visactor/vgrammar-wordcloud-shape";

export class WordCloud3dSeries extends BaseWordCloudSeries {
    constructor() {
        super(...arguments), this.type = SeriesTypeEnum.wordCloud3d;
    }
    _wordCloudTransformOption() {
        var _a;
        return Object.assign(Object.assign({}, super._wordCloudTransformOption()), {
            postProjection: null !== (_a = this._spec.postProjection) && void 0 !== _a ? _a : "StereographicProjection",
            depth_3d: this._spec.depth_3d
        });
    }
    _wordCloudShapeTransformOption() {
        var _a;
        return Object.assign(Object.assign({}, super._wordCloudShapeTransformOption()), {
            postProjection: null !== (_a = this._spec.postProjection) && void 0 !== _a ? _a : "StereographicProjection",
            depth_3d: this._spec.depth_3d
        });
    }
    initMark() {
        this._wordMark = this._createMark(BaseWordCloudSeries.mark.word, {
            groupKey: this._seriesField,
            isSeriesMark: !0
        }, {
            support3d: !0
        });
    }
    initMarkStyle() {
        super.initMarkStyle();
        const wordMark = this._wordMark;
        wordMark && this.setMarkStyle(wordMark, {
            z: datum => {
                var _a;
                return null !== (_a = datum.z) && void 0 !== _a ? _a : 0;
            }
        }, "normal", AttributeLevel.Series);
    }
    initAnimation() {
        var _a, _b;
        const padding = null !== (_a = this._padding) && void 0 !== _a ? _a : {};
        this._wordMark && this._wordMark.setAnimationConfig(animationConfig(null === (_b = Factory.getAnimationInKey("wordCloud3d")) || void 0 === _b ? void 0 : _b((() => {
            var _a;
            const srView = this.getCompiler().getVGrammarView(), width = srView.width() - padding.left || 0 - padding.right || 0, height = srView.height() - padding.top || 0 - padding.bottom || 0, r = Math.max(width, height) / 2;
            return {
                center: {
                    x: r,
                    y: r,
                    z: null !== (_a = this._spec.depth_3d) && void 0 !== _a ? _a : r
                },
                r: r
            };
        })), userAnimationConfig("word", this._spec, this._markAttributeContext)));
    }
}

WordCloud3dSeries.type = SeriesTypeEnum.wordCloud3d;

export const registerWordCloud3dSeries = () => {
    registerWordCloudTransforms(), registerTextMark(), registerWordCloud3dAnimation(), 
    Factory.registerSeries(WordCloud3dSeries.type, WordCloud3dSeries);
};

export const registerWordCloudShape3dSeries = () => {
    registerWordCloudShapeTransforms(), registerWordCloudTransforms(), registerTextMark(), 
    registerWordCloud3dAnimation(), Factory.registerSeries(WordCloud3dSeries.type, WordCloud3dSeries);
};
//# sourceMappingURL=word-cloud-3d.js.map
