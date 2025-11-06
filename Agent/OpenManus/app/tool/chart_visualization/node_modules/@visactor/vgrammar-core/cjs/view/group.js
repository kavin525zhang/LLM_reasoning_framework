"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.GroupMark = void 0;

const attributes_1 = require("../graph/attributes"), constants_1 = require("../graph/constants"), enums_1 = require("../graph/enums"), graphic_1 = require("../graph/util/graphic"), mark_1 = require("./mark"), vutils_1 = require("@visactor/vutils"), encode_1 = require("../graph/mark/encode");

class GroupMark extends mark_1.Mark {
    constructor(view, group) {
        super(view, enums_1.GrammarMarkType.group, group), this.children = [];
    }
    parseRenderContext() {
        return {
            large: !1
        };
    }
    appendChild(mark) {
        return this.children.push(mark), this;
    }
    removeChild(mark) {
        return this.children = this.children.filter((child => child !== mark)), this;
    }
    includesChild(mark, descendant = !0) {
        return !!this.children.includes(mark) || !!descendant && this.children.some((child => child.markType === enums_1.GrammarMarkType.group && child.includesChild(mark, !0)));
    }
    updateLayoutChildren() {
        return this.children.length ? (this.layoutChildren || (this.layoutChildren = []), 
        this.layoutChildren = this.children.filter((child => child.needLayout())), this) : this;
    }
    getAttributeTransforms() {
        return attributes_1.transformsByType.rect;
    }
    evaluateJoin(data) {
        if (!this.elements.length) {
            const el = this.createElement();
            el.updateData(constants_1.DefaultKey, constants_1.DefaultMarkData, (() => "")), 
            this.elements = [ el ], this.elementMap.set(constants_1.DefaultKey, el);
        }
    }
    getChannelsFromConfig(element) {
        const spec = this.spec, initAttrs = {};
        if ((0, vutils_1.isNil)(spec.clip) || (initAttrs.clip = spec.clip), (0, vutils_1.isNil)(spec.zIndex) || (initAttrs.zIndex = spec.zIndex), 
        !(0, vutils_1.isNil)(spec.clipPath)) {
            const paths = (0, vutils_1.isFunction)(spec.clipPath) ? spec.clipPath([ element ]) : spec.clipPath;
            paths && paths.length ? initAttrs.path = paths : (initAttrs.path = null, initAttrs.clip = !1);
        }
        return (0, vutils_1.isNil)(spec.interactive) || (initAttrs.pickable = spec.interactive), 
        initAttrs;
    }
    evaluateGroupEncode(elements, groupEncode, parameters) {
        var _a;
        const el = this.elements[0], nextAttrs = {}, items = [ Object.assign({}, null === (_a = el.items) || void 0 === _a ? void 0 : _a[0], {
            nextAttrs: nextAttrs
        }) ];
        return (0, encode_1.invokeEncoderToItems)(el, items, groupEncode, parameters), this._groupEncodeResult = nextAttrs, 
        nextAttrs;
    }
    evaluateEncode(elements, encoders, parameters, noGroupEncode) {
        const initAttrs = this.getChannelsFromConfig();
        if (encoders) {
            this.emit(enums_1.HOOK_EVENT.BEFORE_ELEMENT_ENCODE, {
                encoders: encoders,
                parameters: parameters
            }, this);
            const groupEncodeAttrs = noGroupEncode ? null : this.evaluateGroupEncode(elements, encoders[enums_1.BuiltInEncodeNames.group], parameters);
            elements.forEach((element => {
                element.items.forEach((item => {
                    item.nextAttrs = Object.assign(item.nextAttrs, initAttrs, groupEncodeAttrs);
                })), element.encodeItems(element.items, encoders, this._isReentered, parameters);
            })), this._isReentered = !1, this.evaluateTransform(this._getTransformsAfterEncodeItems(), elements, parameters), 
            elements.forEach((element => {
                element.encodeGraphic();
            })), this.emit(enums_1.HOOK_EVENT.AFTER_ELEMENT_ENCODE, {
                encoders: encoders,
                parameters: parameters
            }, this);
        } else elements.forEach((element => {
            element.initGraphicItem(initAttrs);
        }));
    }
    addGraphicItem(attrs, groupKey, newGraphicItem) {
        const graphicItem = null != newGraphicItem ? newGraphicItem : (0, graphic_1.createGraphicItem)(this, this.markType, attrs);
        if (graphicItem) return this.emit(enums_1.HOOK_EVENT.BEFORE_ADD_VRENDER_MARK, {
            graphicItem: graphicItem
        }), graphicItem.name = `${this.id() || this.markType}`, this.graphicParent.insertIntoKeepIdx(graphicItem, this.graphicIndex), 
        this.emit(enums_1.HOOK_EVENT.AFTER_ADD_VRENDER_MARK, {
            graphicItem: graphicItem
        }), graphicItem;
    }
}

exports.GroupMark = GroupMark;
//# sourceMappingURL=group.js.map
