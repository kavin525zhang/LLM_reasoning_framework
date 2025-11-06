import { array, degreeToRadian, isFunction, isNil, merge, seedRandom } from "@visactor/vutils";

import { getShapeFunction } from "@visactor/vgrammar-util";

import { functor, randomHslColor } from "./util";

export class BaseLayout {
    constructor(options) {
        var _a, _b;
        switch (this.options = merge({}, BaseLayout.defaultOptions, options), isFunction(this.options.shape) ? this.shape = this.options.shape : this.shape = getShapeFunction(this.options.shape), 
        this.getText = null !== (_a = functor(this.options.text)) && void 0 !== _a ? _a : d => d, 
        this.getTextFontWeight = functor(this.options.fontWeight), this.getTextFontSize = functor(this.options.fontSize), 
        this.getTextFontStyle = functor(this.options.fontStyle), this.getTextFontFamily = functor(this.options.fontFamily), 
        this.outputCallback = null !== (_b = this.options.outputCallback) && void 0 !== _b ? _b : res => res, 
        this.options.color) {
          case "random-dark":
            this.getTextColor = () => randomHslColor(10, 50);
            break;

          case "random-light":
            this.getTextColor = () => randomHslColor(50, 90);
            break;

          default:
            this.getTextColor = functor(this.options.color);
        }
        if (isNil(this.options.rotate)) if (this.options.useRandomRotate) {
            const rotationRange = Math.abs(this.options.maxRotation - this.options.minRotation), rotationSteps = Math.abs(Math.floor(this.options.rotationSteps)), minRotation = Math.min(this.options.maxRotation, this.options.minRotation);
            this.getTextRotate = () => 0 === this.options.rotateRatio || Math.random() > this.options.rotateRatio ? 0 : 0 === rotationRange ? minRotation : rotationSteps > 0 ? minRotation + Math.floor(Math.random() * rotationSteps) * rotationRange / (rotationSteps - 1) : minRotation + Math.random() * rotationRange;
        } else this.getTextRotate = () => 0; else this.getTextRotate = isFunction(this.options.rotate) ? d => {
            var _a;
            return degreeToRadian(null !== (_a = this.options.rotate(d)) && void 0 !== _a ? _a : 0);
        } : (d, i) => {
            const rotates = array(this.options.rotate), random = this.options.random ? Math.random() : seedRandom(i);
            return degreeToRadian(rotates[Math.floor(random * rotates.length)]);
        };
    }
    canRepeat() {
        return !1;
    }
    exceedTime() {
        var _a;
        return this.options.progressiveStep > 0 ? this.progressiveIndex >= ((null !== (_a = this.currentStepIndex) && void 0 !== _a ? _a : -1) + 1) * this.options.progressiveStep : this.options.progressiveTime > 0 && (new Date).getTime() - this.escapeTime > this.options.progressiveTime;
    }
    progressiveRun() {
        var _a;
        if (this.options.progressiveStep > 0 ? this.currentStepIndex = (null !== (_a = this.currentStepIndex) && void 0 !== _a ? _a : -1) + 1 : this.options.progressiveTime > 0 && (this.escapeTime = Date.now()), 
        this.data && this.progressiveIndex < this.data.length) {
            this.progressiveResult = [];
            let i = this.progressiveIndex, curWordTryCount = 0;
            const maxSingleWordTryCount = this.options.maxSingleWordTryCount, maxFailCount = Math.min(this.options.maxFailCount, this.originalData.length);
            for (;i < this.data.length && this.failCount < maxFailCount; ) {
                const drawn = this.layoutWord(i);
                if (curWordTryCount++, (drawn || curWordTryCount > maxSingleWordTryCount) && (i++, 
                curWordTryCount = 0, this.failCount = drawn ? 0 : this.failCount + 1), this.progressiveIndex = i, 
                this.exceedTime()) break;
                i === this.data.length && this.failCount < maxFailCount && this.options.repeatFill && this.canRepeat() && (this.data = [ ...this.data, ...this.originalData.map((entry => Object.assign(Object.assign({}, entry), {
                    isFill: !0
                }))) ], this.isTryRepeatFill = !0);
            }
            return this.progressiveResult;
        }
        return this.result;
    }
    initProgressive() {
        this.failCount = 0, this.progressiveIndex = 0, this.options.progressiveStep > 0 ? this.currentStepIndex = -1 : this.options.progressiveTime > 0 && (this.escapeTime = Date.now()), 
        this.progressiveResult = [];
    }
    output() {
        return this.result ? this.outputCallback(this.result) : null;
    }
    progressiveOutput() {
        return this.progressiveResult ? this.outputCallback(this.progressiveResult) : null;
    }
    unfinished() {
        return this.data && this.data.length && !isNil(this.progressiveIndex) && this.progressiveIndex < this.data.length;
    }
    release() {
        this.data = null, this.result = null, this.progressiveIndex = null, this.progressiveResult = null;
    }
}

BaseLayout.defaultOptions = {
    fontFamily: '"Trebuchet MS", "Heiti TC", "微軟正黑體", "Arial Unicode MS", "Droid Fallback Sans", sans-serif',
    fontWeight: "normal",
    color: "random-dark",
    fontStyle: "normal",
    minFontSize: 12,
    drawOutOfBound: !1,
    shrink: !1,
    minRotation: -Math.PI / 2,
    maxRotation: Math.PI / 2,
    rotationSteps: 0,
    rotateRatio: .1,
    random: !1,
    shape: "circle",
    progressiveTime: 0,
    progressiveStep: 0,
    repeatFill: !1,
    fillTextFontSize: 12,
    maxFailCount: 20
};