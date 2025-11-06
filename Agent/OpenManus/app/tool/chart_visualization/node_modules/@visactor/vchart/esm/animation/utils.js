import { isFunction, isValidNumber } from "../util/type";

import { DEFAULT_DATA_INDEX } from "../constant/data";

import { DEFAULT_ANIMATION_CONFIG } from "./config";

import { cloneDeep, isArray, isObject, isValid } from "@visactor/vutils";

import { mergeSpec } from "@visactor/vutils-extension";

export const AnimationStates = [ ...Object.keys(DEFAULT_ANIMATION_CONFIG), "normal" ];

export function animationConfig(defaultConfig = {}, userConfig, params) {
    const config = {};
    for (let i = 0; i < AnimationStates.length; i++) {
        const state = AnimationStates[i], userStateConfig = userConfig ? userConfig[state] : void 0;
        if (!1 === userStateConfig) continue;
        if ("normal" === state) {
            userStateConfig && (config.normal = userStateConfig);
            continue;
        }
        if ("state" === state) {
            !1 !== userStateConfig && (config.state = null != userStateConfig ? userStateConfig : DEFAULT_ANIMATION_CONFIG.state);
            continue;
        }
        if ("update" !== state && !userStateConfig && !defaultConfig[state]) continue;
        let defaultStateConfig, stateConfig;
        (defaultStateConfig = isArray(defaultConfig[state]) ? defaultConfig[state] : [ Object.assign(Object.assign({}, DEFAULT_ANIMATION_CONFIG[state]), defaultConfig[state]) ], 
        "exit" === state && defaultStateConfig.forEach((exitConfig => {
            exitConfig.controlOptions = {
                stopWhenStateChange: !0
            };
        })), userStateConfig) ? (stateConfig = isArray(userStateConfig) ? userStateConfig.map(((userConfig, i) => {
            var _a;
            let singleConfig = userConfig;
            return isChannelAnimation(singleConfig) && delete singleConfig.type, singleConfig.oneByOne && (singleConfig = produceOneByOne(singleConfig, null !== (_a = null == params ? void 0 : params.dataIndex) && void 0 !== _a ? _a : defaultDataIndex, null == params ? void 0 : params.dataCount)), 
            singleConfig;
        })) : defaultStateConfig.map(((stateConfig, i) => {
            var _a;
            let singleConfig = mergeSpec({}, defaultStateConfig[i], userStateConfig);
            return isChannelAnimation(singleConfig) && delete singleConfig.type, singleConfig.oneByOne && (singleConfig = produceOneByOne(singleConfig, null !== (_a = null == params ? void 0 : params.dataIndex) && void 0 !== _a ? _a : defaultDataIndex, null == params ? void 0 : params.dataCount)), 
            singleConfig;
        })), config[state] = stateConfig) : config[state] = defaultStateConfig;
    }
    return config;
}

export function userAnimationConfig(markName, spec, ctx) {
    var _a, _b, _c, _d, _e, _f;
    const userConfig = {};
    return isValid(spec.animationAppear) && (userConfig.appear = null !== (_a = spec.animationAppear[markName]) && void 0 !== _a ? _a : spec.animationAppear), 
    isValid(spec.animationDisappear) && (userConfig.disappear = null !== (_b = spec.animationDisappear[markName]) && void 0 !== _b ? _b : spec.animationDisappear), 
    isValid(spec.animationEnter) && (userConfig.enter = null !== (_c = spec.animationEnter[markName]) && void 0 !== _c ? _c : spec.animationEnter), 
    isValid(spec.animationExit) && (userConfig.exit = null !== (_d = spec.animationExit[markName]) && void 0 !== _d ? _d : spec.animationExit), 
    isValid(spec.animationUpdate) && (userConfig.update = null !== (_e = spec.animationUpdate[markName]) && void 0 !== _e ? _e : spec.animationUpdate), 
    isValid(spec.animationState) && (userConfig.state = null !== (_f = spec.animationState[markName]) && void 0 !== _f ? _f : spec.animationState), 
    spec.animationNormal && spec.animationNormal[markName] && (userConfig.normal = spec.animationNormal[markName]), 
    uniformAnimationConfig(userConfig, ctx);
}

function produceOneByOne(stateConfig, dataIndex, dataCount) {
    const {oneByOne: oneByOne, duration: duration, delay: delay, delayAfter: delayAfter} = stateConfig;
    return stateConfig.delay = (datum, element, params) => {
        const index = dataIndex(datum, params), durationTime = isFunction(duration) ? duration(datum, element, params) : isValidNumber(duration) ? duration : 0, userDelay = isFunction(delay) ? delay(datum, element, params) : isValidNumber(delay) ? delay : 0;
        let oneByOneTime = isFunction(oneByOne) ? oneByOne(datum, element, params) : oneByOne;
        return !1 === oneByOneTime ? userDelay : (oneByOneTime = !0 === oneByOneTime ? 0 : oneByOneTime, 
        userDelay + index * (durationTime + oneByOneTime));
    }, stateConfig.delayAfter = (datum, element, params) => {
        const index = dataIndex(datum, params), durationTime = isFunction(duration) ? duration(datum, element, params) : isValidNumber(duration) ? duration : 0, userDelayAfter = isFunction(delayAfter) ? delayAfter(datum, element, params) : isValidNumber(delayAfter) ? delayAfter : 0;
        let oneByOneTime = isFunction(oneByOne) ? oneByOne(datum, element, params) : oneByOne;
        if (!1 === oneByOneTime) return userDelayAfter;
        return oneByOneTime = !0 === oneByOneTime ? 0 : oneByOneTime, userDelayAfter + ((dataCount ? dataCount() : element.mark.elements.length) - index) * (durationTime + oneByOneTime);
    }, delete stateConfig.oneByOne, stateConfig;
}

function defaultDataIndex(datum, params) {
    var _a, _b;
    return null !== (_a = null == datum ? void 0 : datum[DEFAULT_DATA_INDEX]) && void 0 !== _a ? _a : null === (_b = null == params ? void 0 : params.VGRAMMAR_ANIMATION_PARAMETERS) || void 0 === _b ? void 0 : _b.elementIndex;
}

export function shouldMarkDoMorph(spec, markName) {
    var _a, _b, _c, _d, _e;
    if (!1 === spec.animation) return !1;
    if (!1 === (null === (_a = spec.morph) || void 0 === _a ? void 0 : _a.enable)) return !1;
    const appearAnimationEnabled = !1 !== (null !== (_c = null === (_b = spec.animationAppear) || void 0 === _b ? void 0 : _b[markName]) && void 0 !== _c ? _c : spec.animationAppear), updateAnimationEnabled = !1 !== (null !== (_e = null === (_d = spec.animationUpdate) || void 0 === _d ? void 0 : _d[markName]) && void 0 !== _e ? _e : spec.animationUpdate);
    return !(!appearAnimationEnabled || !updateAnimationEnabled);
}

export function isTimeLineAnimation(animationConfig) {
    return isValid(animationConfig.timeSlices);
}

export function isChannelAnimation(animationConfig) {
    return !isTimeLineAnimation(animationConfig) && isValid(animationConfig.channel);
}

export function uniformAnimationConfig(config, ctx) {
    if (!config) return config;
    const excludeKeys = [ "custom", "customParameters" ];
    return traverseSpec(config = cloneDeep(config, null, excludeKeys), (node => {
        var _a;
        if (isFunction(node) && (null === (_a = node.prototype) || void 0 === _a ? void 0 : _a.constructor) !== node) {
            return (...args) => node(...args, ctx);
        }
        return node;
    }), excludeKeys), config;
}

function traverseSpec(spec, transform, excludeKeys = []) {
    if (isArray(spec)) spec.forEach(((i, index) => {
        spec[index] = transform(spec[index], index), traverseSpec(spec[index], transform, excludeKeys);
    })); else if (isObject(spec)) for (const key in spec) excludeKeys.includes(key) || (spec[key] = transform(spec[key], key), 
    traverseSpec(spec[key], transform, excludeKeys));
}

export function isAnimationEnabledForSeries(series) {
    var _a, _b, _c, _d;
    const seriesSpec = series.getSpec();
    if (!1 === seriesSpec.animation) return !1;
    if (!isValid(series.getRegion().animate)) return !1;
    let animationThreshold = null !== (_a = seriesSpec.animationThreshold) && void 0 !== _a ? _a : Number.MAX_SAFE_INTEGER;
    return null === (_b = series.getMarks()) || void 0 === _b || _b.forEach((m => {
        const config = m.getMarkConfig();
        config && (config.large && config.largeThreshold && (animationThreshold = Math.min(animationThreshold, config.largeThreshold)), 
        config.progressiveThreshold && (animationThreshold = Math.min(animationThreshold, config.progressiveThreshold)));
    })), !((null === (_d = null === (_c = series.getRawData()) || void 0 === _c ? void 0 : _c.latestData) || void 0 === _d ? void 0 : _d.length) >= animationThreshold);
}