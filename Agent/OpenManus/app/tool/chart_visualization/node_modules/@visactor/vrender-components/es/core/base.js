import { Group, CustomEvent } from "@visactor/vrender-core";

import { merge, isFunction, isPlainObject, isNil } from "@visactor/vutils";

const GROUP_ATTRIBUTES = [ "x", "y", "dx", "dy", "scaleX", "scaleY", "angle", "anchor", "postMatrix", "visible", "clip", "pickable", "childrenPickable", "zIndex", "cursor" ];

export class AbstractComponent extends Group {
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
        isPlainObject(this.attribute[key]) && isPlainObject(value) && !isFunction(this.attribute[key]) && !isFunction(value) ? merge(this.attribute[key], value) : this.attribute[key] = value, 
        this._skipRenderAttributes.includes(key) || this.render(), this.valid = this.isValid(), 
        this.updateShapeAndBoundsTagSetted() || !forceUpdateTag && !this.needUpdateTag(key) ? this.addUpdateBoundTag() : this.addUpdateShapeAndBoundsTag(), 
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
        isNil(keys) && (keys = Object.keys(params));
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            !isPlainObject(this.attribute[key]) || isFunction(this.attribute[key]) || isFunction(params[key]) ? this.attribute[key] = params[key] : merge(this.attribute[key], params[key]);
        }
    }
    bindEvents() {}
    _getNodeId(id) {
        var _a;
        return `${null !== (_a = this.id) && void 0 !== _a ? _a : this._uid}-${this.name}-${id}`;
    }
    _dispatchEvent(eventName, details) {
        var _a;
        const changeEvent = new CustomEvent(eventName, details);
        changeEvent.manager = null === (_a = this.stage) || void 0 === _a ? void 0 : _a.eventSystem.manager, 
        this.dispatchEvent(changeEvent);
    }
}
//# sourceMappingURL=base.js.map