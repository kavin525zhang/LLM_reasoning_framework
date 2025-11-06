"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.AbstractComponent = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), vutils_1 = require("@visactor/vutils"), GROUP_ATTRIBUTES = [ "x", "y", "dx", "dy", "scaleX", "scaleY", "angle", "anchor", "postMatrix", "visible", "clip", "pickable", "childrenPickable", "zIndex", "cursor" ];

class AbstractComponent extends vrender_core_1.Group {
    constructor(attributes, options) {
        super(attributes), this._skipRenderAttributes = GROUP_ATTRIBUTES, (null == options ? void 0 : options.mode) && (this.mode = options.mode, 
        this.setMode(options.mode)), (null == options ? void 0 : options.skipDefault) && (this.skipDefault = !0), 
        this.setTheme({
            common: {
                strokeBoundsBuffer: 0
            }
        }), this.attribute = attributes, this.onSetStage((() => {
            this.render(), this.bindEvents();
        }));
    }
    setAttribute(key, value, forceUpdateTag, context) {
        const params = this.onBeforeAttributeUpdate && this.onBeforeAttributeUpdate({
            [key]: value
        }, this.attribute, key, context);
        if (params) return this._setAttributes(params, forceUpdateTag);
        (0, vutils_1.isPlainObject)(this.attribute[key]) && (0, vutils_1.isPlainObject)(value) && !(0, 
        vutils_1.isFunction)(this.attribute[key]) && !(0, vutils_1.isFunction)(value) ? (0, 
        vutils_1.merge)(this.attribute[key], value) : this.attribute[key] = value, this._skipRenderAttributes.includes(key) || this.render(), 
        this.valid = this.isValid(), this.updateShapeAndBoundsTagSetted() || !forceUpdateTag && !this.needUpdateTag(key) ? this.addUpdateBoundTag() : this.addUpdateShapeAndBoundsTag(), 
        this.addUpdatePositionTag(), this.onAttributeUpdate();
    }
    setAttributes(params, forceUpdateTag, context) {
        return params = this.onBeforeAttributeUpdate && this.onBeforeAttributeUpdate(params, this.attribute, null, context) || params, 
        this._setAttributes(params, forceUpdateTag);
    }
    _setAttributes(params, forceUpdateTag) {
        const keys = Object.keys(params);
        this._mergeAttributes(params, keys), keys.every((key => this._skipRenderAttributes.includes(key))) || this.render(), 
        this.valid = this.isValid(), this.updateShapeAndBoundsTagSetted() || !forceUpdateTag && !this.needUpdateTags(keys) ? this.addUpdateBoundTag() : this.addUpdateShapeAndBoundsTag(), 
        this.addUpdatePositionTag(), this.onAttributeUpdate();
    }
    _mergeAttributes(params, keys) {
        (0, vutils_1.isNil)(keys) && (keys = Object.keys(params));
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            !(0, vutils_1.isPlainObject)(this.attribute[key]) || (0, vutils_1.isFunction)(this.attribute[key]) || (0, 
            vutils_1.isFunction)(params[key]) ? this.attribute[key] = params[key] : (0, vutils_1.merge)(this.attribute[key], params[key]);
        }
    }
    bindEvents() {}
    _getNodeId(id) {
        var _a;
        return `${null !== (_a = this.id) && void 0 !== _a ? _a : this._uid}-${this.name}-${id}`;
    }
    _dispatchEvent(eventName, details) {
        var _a;
        const changeEvent = new vrender_core_1.CustomEvent(eventName, details);
        changeEvent.manager = null === (_a = this.stage) || void 0 === _a ? void 0 : _a.eventSystem.manager, 
        this.dispatchEvent(changeEvent);
    }
}

exports.AbstractComponent = AbstractComponent;
//# sourceMappingURL=base.js.map