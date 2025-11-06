"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerTitle = exports.Title = void 0;

const layout_1 = require("../../constant/layout"), factory_1 = require("../../core/factory"), space_1 = require("../../util/space"), base_component_1 = require("../base/base-component"), type_1 = require("../interface/type"), vrender_components_1 = require("@visactor/vrender-components"), vutils_1 = require("@visactor/vutils"), util_1 = require("../util");

class Title extends base_component_1.BaseComponent {
    get orient() {
        return this._orient;
    }
    constructor(spec, options) {
        super(spec, options), this.type = type_1.ComponentTypeEnum.title, this.specKey = type_1.ComponentTypeEnum.title, 
        this.layoutType = "normal", this.layoutZIndex = layout_1.LayoutZIndex.Title, this.layoutLevel = layout_1.LayoutLevel.Title, 
        this._orient = "top", this._orient = (0, space_1.isValidOrient)(spec.orient) ? spec.orient : "top";
    }
    initLayout() {
        super.initLayout(), this._layout && (this._layout.layoutOrient = this._orient);
    }
    static getSpecInfo(chartSpec) {
        return (0, util_1.getSpecInfo)(chartSpec, this.specKey, type_1.ComponentTypeEnum.title, (s => !1 !== s.visible));
    }
    onRender(ctx) {}
    _compareSpec(spec, prevSpec) {
        const result = super._compareSpec(spec, prevSpec);
        return (null == prevSpec ? void 0 : prevSpec.orient) === (null == spec ? void 0 : spec.orient) && (null == prevSpec ? void 0 : prevSpec.visible) === spec.visible || (result.reMake = !0), 
        result.change = !0, result.reRender = !0, result;
    }
    changeRegions(regions) {}
    update(ctx) {}
    resize(ctx) {}
    afterSetLayoutStartPoint(pos) {
        (0, vutils_1.isValidNumber)(pos.x) && this._titleComponent && this._titleComponent.setAttribute("x", pos.x), 
        (0, vutils_1.isValidNumber)(pos.y) && this._titleComponent && this._titleComponent.setAttribute("y", pos.y), 
        super.afterSetLayoutStartPoint(pos);
    }
    getBoundsInRect(rect) {
        let result = {};
        this.setLayoutRect(rect);
        const attrs = this._getTitleAttrs();
        this._createOrUpdateTitleComponent(attrs), result = this._getTitleLayoutRect();
        const {x: x, y: y} = this.getLayoutStartPoint();
        return {
            x1: x,
            y1: y,
            x2: x + result.width,
            y2: y + result.height
        };
    }
    _getTitleLayoutRect() {
        const titleBounds = this._titleComponent.AABBBounds;
        return {
            width: this._spec.width ? this._spec.width : (0, vutils_1.isValidNumber)(titleBounds.width()) ? titleBounds.width() : 0,
            height: this._spec.height ? this._spec.height : (0, vutils_1.isValidNumber)(titleBounds.height()) ? titleBounds.height() : 0
        };
    }
    _getTitleAttrs() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (!1 === this._spec.visible) return {
            visible: !1
        };
        const layoutRect = this.getLayoutRect(), titleWidth = (0, space_1.calcLayoutNumber)(this._spec.width, layoutRect.width, null, layoutRect.width), titleMaxWidth = (0, 
        space_1.calcLayoutNumber)(this._spec.maxWidth, layoutRect.width, null, layoutRect.width), maxWidth = Math.max(Math.min(titleWidth, titleMaxWidth, layoutRect.width), 0), attrs = Object.assign(Object.assign({}, (0, 
        vutils_1.pickWithout)(this._spec, [ "padding" ])), {
            textType: null !== (_a = this._spec.textType) && void 0 !== _a ? _a : "text",
            text: null !== (_b = this._spec.text) && void 0 !== _b ? _b : "",
            subtextType: null !== (_c = this._spec.subtextType) && void 0 !== _c ? _c : "text",
            subtext: null !== (_d = this._spec.subtext) && void 0 !== _d ? _d : "",
            x: null !== (_e = this._spec.x) && void 0 !== _e ? _e : 0,
            y: null !== (_f = this._spec.y) && void 0 !== _f ? _f : 0,
            height: this._spec.height,
            minWidth: this._spec.minWidth,
            maxWidth: maxWidth,
            minHeight: this._spec.minHeight,
            maxHeight: this._spec.maxHeight,
            padding: this._spec.innerPadding,
            align: null !== (_g = this._spec.align) && void 0 !== _g ? _g : "left",
            verticalAlign: null !== (_h = this._spec.verticalAlign) && void 0 !== _h ? _h : "top",
            textStyle: Object.assign({
                width: maxWidth,
                maxLineWidth: maxWidth
            }, this._spec.textStyle),
            subtextStyle: Object.assign({
                maxLineWidth: maxWidth
            }, this._spec.subtextStyle)
        });
        return (0, vutils_1.isValid)(this._spec.width) && (attrs.textStyle.width = Math.max(titleWidth, layoutRect.width), 
        attrs.subtextStyle.width = attrs.textStyle.width), attrs;
    }
    _createOrUpdateTitleComponent(attrs) {
        if (this._titleComponent) (0, vutils_1.isEqual)(attrs, this._cacheAttrs) || this._titleComponent.setAttributes(attrs); else {
            const container = this.getContainer(), title = new vrender_components_1.Title(attrs);
            title.name = "title", container.add(title), this._titleComponent = title, title.on("*", ((event, type) => this._delegateEvent(title, event, type)));
        }
        return this._cacheAttrs = attrs, this._titleComponent;
    }
    _getNeedClearVRenderComponents() {
        return [ this._titleComponent ];
    }
    clear() {
        super.clear(), this._cacheAttrs = null;
    }
}

exports.Title = Title, Title.type = type_1.ComponentTypeEnum.title, Title.specKey = type_1.ComponentTypeEnum.title;

const registerTitle = () => {
    factory_1.Factory.registerComponent(Title.type, Title);
};

exports.registerTitle = registerTitle;
//# sourceMappingURL=title.js.map
