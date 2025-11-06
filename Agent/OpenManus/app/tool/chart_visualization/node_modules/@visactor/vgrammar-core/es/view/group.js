import { transformsByType } from "../graph/attributes";

import { DefaultKey, DefaultMarkData } from "../graph/constants";

import { BuiltInEncodeNames, GrammarMarkType, HOOK_EVENT } from "../graph/enums";

import { createGraphicItem } from "../graph/util/graphic";

import { Mark } from "./mark";

import { isFunction, isNil } from "@visactor/vutils";

import { invokeEncoderToItems } from "../graph/mark/encode";

export class GroupMark extends Mark {
    constructor(view, group) {
        super(view, GrammarMarkType.group, group), this.children = [];
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
        return !!this.children.includes(mark) || !!descendant && this.children.some((child => child.markType === GrammarMarkType.group && child.includesChild(mark, !0)));
    }
    updateLayoutChildren() {
        return this.children.length ? (this.layoutChildren || (this.layoutChildren = []), 
        this.layoutChildren = this.children.filter((child => child.needLayout())), this) : this;
    }
    getAttributeTransforms() {
        return transformsByType.rect;
    }
    evaluateJoin(data) {
        if (!this.elements.length) {
            const el = this.createElement();
            el.updateData(DefaultKey, DefaultMarkData, (() => "")), this.elements = [ el ], 
            this.elementMap.set(DefaultKey, el);
        }
    }
    getChannelsFromConfig(element) {
        const spec = this.spec, initAttrs = {};
        if (isNil(spec.clip) || (initAttrs.clip = spec.clip), isNil(spec.zIndex) || (initAttrs.zIndex = spec.zIndex), 
        !isNil(spec.clipPath)) {
            const paths = isFunction(spec.clipPath) ? spec.clipPath([ element ]) : spec.clipPath;
            paths && paths.length ? initAttrs.path = paths : (initAttrs.path = null, initAttrs.clip = !1);
        }
        return isNil(spec.interactive) || (initAttrs.pickable = spec.interactive), initAttrs;
    }
    evaluateGroupEncode(elements, groupEncode, parameters) {
        var _a;
        const el = this.elements[0], nextAttrs = {}, items = [ Object.assign({}, null === (_a = el.items) || void 0 === _a ? void 0 : _a[0], {
            nextAttrs: nextAttrs
        }) ];
        return invokeEncoderToItems(el, items, groupEncode, parameters), this._groupEncodeResult = nextAttrs, 
        nextAttrs;
    }
    evaluateEncode(elements, encoders, parameters, noGroupEncode) {
        const initAttrs = this.getChannelsFromConfig();
        if (encoders) {
            this.emit(HOOK_EVENT.BEFORE_ELEMENT_ENCODE, {
                encoders: encoders,
                parameters: parameters
            }, this);
            const groupEncodeAttrs = noGroupEncode ? null : this.evaluateGroupEncode(elements, encoders[BuiltInEncodeNames.group], parameters);
            elements.forEach((element => {
                element.items.forEach((item => {
                    item.nextAttrs = Object.assign(item.nextAttrs, initAttrs, groupEncodeAttrs);
                })), element.encodeItems(element.items, encoders, this._isReentered, parameters);
            })), this._isReentered = !1, this.evaluateTransform(this._getTransformsAfterEncodeItems(), elements, parameters), 
            elements.forEach((element => {
                element.encodeGraphic();
            })), this.emit(HOOK_EVENT.AFTER_ELEMENT_ENCODE, {
                encoders: encoders,
                parameters: parameters
            }, this);
        } else elements.forEach((element => {
            element.initGraphicItem(initAttrs);
        }));
    }
    addGraphicItem(attrs, groupKey, newGraphicItem) {
        const graphicItem = null != newGraphicItem ? newGraphicItem : createGraphicItem(this, this.markType, attrs);
        if (graphicItem) return this.emit(HOOK_EVENT.BEFORE_ADD_VRENDER_MARK, {
            graphicItem: graphicItem
        }), graphicItem.name = `${this.id() || this.markType}`, this.graphicParent.insertIntoKeepIdx(graphicItem, this.graphicIndex), 
        this.emit(HOOK_EVENT.AFTER_ADD_VRENDER_MARK, {
            graphicItem: graphicItem
        }), graphicItem;
    }
}
//# sourceMappingURL=group.js.map
