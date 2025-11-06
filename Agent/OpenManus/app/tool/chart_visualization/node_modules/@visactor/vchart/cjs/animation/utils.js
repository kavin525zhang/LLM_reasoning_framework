"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.isAnimationEnabledForSeries = exports.uniformAnimationConfig = exports.isChannelAnimation = exports.isTimeLineAnimation = exports.shouldMarkDoMorph = exports.userAnimationConfig = exports.animationConfig = exports.AnimationStates = void 0;

const type_1 = require("../util/type"), data_1 = require("../constant/data"), config_1 = require("./config"), vutils_1 = require("@visactor/vutils"), vutils_extension_1 = require("@visactor/vutils-extension");

function animationConfig(defaultConfig = {}, userConfig, params) {
    const config = {};
    for (let i = 0; i < exports.AnimationStates.length; i++) {
        const state = exports.AnimationStates[i], userStateConfig = userConfig ? userConfig[state] : void 0;
        if (!1 === userStateConfig) continue;
        if ("normal" === state) {
            userStateConfig && (config.normal = userStateConfig);
            continue;
        }
        if ("state" === state) {
            !1 !== userStateConfig && (config.state = null != userStateConfig ? userStateConfig : config_1.DEFAULT_ANIMATION_CONFIG.state);
            continue;
        }
        if ("update" !== state && !userStateConfig && !defaultConfig[state]) continue;
        let defaultStateConfig, stateConfig;
        (defaultStateConfig = (0, vutils_1.isArray)(defaultConfig[state]) ? defaultConfig[state] : [ Object.assign(Object.assign({}, config_1.DEFAULT_ANIMATION_CONFIG[state]), defaultConfig[state]) ], 
        "exit" === state && defaultStateConfig.forEach((exitConfig => {
            exitConfig.controlOptions = {
                stopWhenStateChange: !0
            };
        })), userStateConfig) ? (stateConfig = (0, vutils_1.isArray)(userStateConfig) ? userStateConfig.map(((userConfig, i) => {
            var _a;
            let singleConfig = userConfig;
            return isChannelAnimation(singleConfig) && delete singleConfig.type, singleConfig.oneByOne && (singleConfig = produceOneByOne(singleConfig, null !== (_a = null == params ? void 0 : params.dataIndex) && void 0 !== _a ? _a : defaultDataIndex, null == params ? void 0 : params.dataCount)), 
            singleConfig;
        })) : defaultStateConfig.map(((stateConfig, i) => {
            var _a;
            let singleConfig = (0, vutils_extension_1.mergeSpec)({}, defaultStateConfig[i], userStateConfig);
            return isChannelAnimation(singleConfig) && delete singleConfig.type, singleConfig.oneByOne && (singleConfig = produceOneByOne(singleConfig, null !== (_a = null == params ? void 0 : params.dataIndex) && void 0 !== _a ? _a : defaultDataIndex, null == params ? void 0 : params.dataCount)), 
            singleConfig;
        })), config[state] = stateConfig) : config[state] = defaultStateConfig;
    }
    return config;
}

function userAnimationConfig(markName, spec, ctx) {
    var _a, _b, _c, _d, _e, _f;
    const userConfig = {};
    return (0, vutils_1.isValid)(spec.animationAppear) && (userConfig.appear = null !== (_a = spec.animationAppear[markName]) && void 0 !== _a ? _a : spec.animationAppear), 
    (0, vutils_1.isValid)(spec.animationDisappear) && (userConfig.disappear = null !== (_b = spec.animationDisappear[markName]) && void 0 !== _b ? _b : spec.animationDisappear), 
    (0, vutils_1.isValid)(spec.animationEnter) && (userConfig.enter = null !== (_c = spec.animationEnter[markName]) && void 0 !== _c ? _c : spec.animationEnter), 
    (0, vutils_1.isValid)(spec.animationExit) && (userConfig.exit = null !== (_d = spec.animationExit[markName]) && void 0 !== _d ? _d : spec.animationExit), 
    (0, vutils_1.isValid)(spec.animationUpdate) && (userConfig.update = null !== (_e = spec.animationUpdate[markName]) && void 0 !== _e ? _e : spec.animationUpdate), 
    (0, vutils_1.isValid)(spec.animationState) && (userConfig.state = null !== (_f = spec.animationState[markName]) && void 0 !== _f ? _f : spec.animationState), 
    spec.animationNormal && spec.animationNormal[markName] && (userConfig.normal = spec.animationNormal[markName]), 
    uniformAnimationConfig(userConfig, ctx);
}

function produceOneByOne(stateConfig, dataIndex, dataCount) {
    const {oneByOne: oneByOne, duration: duration, delay: delay, delayAfter: delayAfter} = stateConfig;
    return stateConfig.delay = (datum, element, params) => {
        const index = dataIndex(datum, params), durationTime = (0, type_1.isFunction)(duration) ? duration(datum, element, params) : (0, 
        type_1.isValidNumber)(duration) ? duration : 0, userDelay = (0, type_1.isFunction)(delay) ? delay(datum, element, params) : (0, 
        type_1.isValidNumber)(delay) ? delay : 0;
        let oneByOneTime = (0, type_1.isFunction)(oneByOne) ? oneByOne(datum, element, params) : oneByOne;
        return !1 === oneByOneTime ? userDelay : (oneByOneTime = !0 === oneByOneTime ? 0 : oneByOneTime, 
        userDelay + index * (durationTime + oneByOneTime));
    }, stateConfig.delayAfter = (datum, element, params) => {
        const index = dataIndex(datum, params), durationTime = (0, type_1.isFunction)(duration) ? duration(datum, element, params) : (0, 
        type_1.isValidNumber)(duration) ? duration : 0, userDelayAfter = (0, type_1.isFunction)(delayAfter) ? delayAfter(datum, element, params) : (0, 
        type_1.isValidNumber)(delayAfter) ? delayAfter : 0;
        let oneByOneTime = (0, type_1.isFunction)(oneByOne) ? oneByOne(datum, element, params) : oneByOne;
        if (!1 === oneByOneTime) return userDelayAfter;
        return oneByOneTime = !0 === oneByOneTime ? 0 : oneByOneTime, userDelayAfter + ((dataCount ? dataCount() : element.mark.elements.length) - index) * (durationTime + oneByOneTime);
    }, delete stateConfig.oneByOne, stateConfig;
}

function defaultDataIndex(datum, params) {
    var _a, _b;
    return null !== (_a = null == datum ? void 0 : datum[data_1.DEFAULT_DATA_INDEX]) && void 0 !== _a ? _a : null === (_b = null == params ? void 0 : params.VGRAMMAR_ANIMATION_PARAMETERS) || void 0 === _b ? void 0 : _b.elementIndex;
}

function shouldMarkDoMorph(spec, markName) {
    var _a, _b, _c, _d, _e;
    if (!1 === spec.animation) return !1;
    if (!1 === (null === (_a = spec.morph) || void 0 === _a ? void 0 : _a.enable)) return !1;
    const appearAnimationEnabled = !1 !== (null !== (_c = null === (_b = spec.animationAppear) || void 0 === _b ? void 0 : _b[markName]) && void 0 !== _c ? _c : spec.animationAppear), updateAnimationEnabled = !1 !== (null !== (_e = null === (_d = spec.animationUpdate) || void 0 === _d ? void 0 : _d[markName]) && void 0 !== _e ? _e : spec.animationUpdate);
    return !(!appearAnimationEnabled || !updateAnimationEnabled);
}

function isTimeLineAnimation(animationConfig) {
    return (0, vutils_1.isValid)(animationConfig.timeSlices);
}

function isChannelAnimation(animationConfig) {
    return !isTimeLineAnimation(animationConfig) && (0, vutils_1.isValid)(animationConfig.channel);
}

function uniformAnimationConfig(config, ctx) {
    if (!config) return config;
    const excludeKeys = [ "custom", "customParameters" ];
    return traverseSpec(config = (0, vutils_1.cloneDeep)(config, null, excludeKeys), (node => {
        var _a;
        if ((0, type_1.isFunction)(node) && (null === (_a = node.prototype) || void 0 === _a ? void 0 : _a.constructor) !== node) {
            return (...args) => node(...args, ctx);
        }
        return node;
    }), excludeKeys), config;
}

function traverseSpec(spec, transform, excludeKeys = []) {
    if ((0, vutils_1.isArray)(spec)) spec.forEach(((i, index) => {
        spec[index] = transform(spec[index], index), traverseSpec(spec[index], transform, excludeKeys);
    })); else if ((0, vutils_1.isObject)(spec)) for (const key in spec) excludeKeys.includes(key) || (spec[key] = transform(spec[key], key), 
    traverseSpec(spec[key], transform, excludeKeys));
}

function isAnimationEnabledForSeries(series) {
    var _a, _b, _c, _d;
    const seriesSpec = series.getSpec();
    if (!1 === seriesSpec.animation) return !1;
    if (!(0, vutils_1.isValid)(series.getRegion().animate)) return !1;
    let animationThreshold = null !== (_a = seriesSpec.animationThreshold) && void 0 !== _a ? _a : Number.MAX_SAFE_INTEGER;
    return null === (_b = series.getMarks()) || void 0 === _b || _b.forEach((m => {
        const config = m.getMarkConfig();
        config && (config.large && config.largeThreshold && (animationThreshold = Math.min(animationThreshold, config.largeThreshold)), 
        config.progressiveThreshold && (animationThreshold = Math.min(animationThreshold, config.progressiveThreshold)));
    })), !((null === (_d = null === (_c = series.getRawData()) || void 0 === _c ? void 0 : _c.latestData) || void 0 === _d ? void 0 : _d.length) >= animationThreshold);
}

exports.AnimationStates = [ ...Object.keys(config_1.DEFAULT_ANIMATION_CONFIG), "normal" ], 
exports.animationConfig = animationConfig, exports.userAnimationConfig = userAnimationConfig, 
exports.shouldMarkDoMorph = shouldMarkDoMorph, exports.isTimeLineAnimation = isTimeLineAnimation, 
exports.isChannelAnimation = isChannelAnimation, exports.uniformAnimationConfig = uniformAnimationConfig, 
exports.isAnimationEnabledForSeries = isAnimationEnabledForSeries;