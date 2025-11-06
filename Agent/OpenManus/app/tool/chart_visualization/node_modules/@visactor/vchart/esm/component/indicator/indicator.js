var __rest = this && this.__rest || function(s, e) {
    var t = {};
    for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0 && (t[p] = s[p]);
    if (null != s && "function" == typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (p = Object.getOwnPropertySymbols(s); i < p.length; i++) e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]) && (t[p[i]] = s[p[i]]);
    }
    return t;
};

import { DataView } from "@visactor/vdataset";

import { LayoutLevel, LayoutZIndex } from "../../constant/layout";

import { ComponentTypeEnum } from "../interface/type";

import { BaseComponent } from "../base/base-component";

import { mergeSpec } from "@visactor/vutils-extension";

import { transformIndicatorStyle } from "../../util/style";

import { getActualNumValue } from "../../util/space";

import { isEqual, isValid, isFunction, array, pickWithout } from "@visactor/vutils";

import { indicatorMapper } from "./util";

import { registerDataSetInstanceTransform } from "../../data/register";

import { CompilableData } from "../../compile/data/compilable-data";

import { Indicator as IndicatorComponents } from "@visactor/vrender-components";

import { Factory } from "../../core/factory";

import { getSpecInfo } from "../util";

export class Indicator extends BaseComponent {
    constructor() {
        super(...arguments), this.type = ComponentTypeEnum.indicator, this.name = ComponentTypeEnum.indicator, 
        this.specKey = "indicator", this.layoutType = "none", this.layoutZIndex = LayoutZIndex.Indicator, 
        this.layoutLevel = LayoutLevel.Indicator, this._gap = 0, this._activeDatum = null;
    }
    static getSpecInfo(chartSpec) {
        return getSpecInfo(chartSpec, this.specKey, this.type, (s => s && !1 !== s.visible));
    }
    created() {
        super.created(), this.initData(), this.initEvent();
    }
    setAttrFromSpec() {
        super.setAttrFromSpec(), this._gap = this._spec.gap || 0, this._title = this._spec.title, 
        this._content = array(this._spec.content), this._regions = this._option.getRegionsInUserIdOrIndex(array(this._spec.regionId), array(this._spec.regionIndex));
    }
    onRender(ctx) {}
    changeRegions(regions) {}
    initEvent() {
        var _a;
        if (this._option.disableTriggerEvent) return;
        if ("none" === this._spec.trigger) return;
        const view = null === (_a = this.getCompiler()) || void 0 === _a ? void 0 : _a.getVGrammarView();
        view && ("hover" === this._spec.trigger ? (view.addEventListener("element-highlight:start", (params => {
            this.isRelativeModel(params.options.regionId) && this.updateDatum(params.elements[0].getDatum());
        })), view.addEventListener("element-highlight:reset", (params => {
            this.isRelativeModel(params.options.regionId) && this.updateDatum(null);
        }))) : (view.addEventListener("element-select:start", (params => {
            this.isRelativeModel(params.options.regionId) && this.updateDatum(params.elements[0].getDatum());
        })), view.addEventListener("element-select:reset", (params => {
            this.isRelativeModel(params.options.regionId) && this.updateDatum(null);
        }))));
    }
    updateDatum(datum) {
        this._activeDatum = datum, this._displayData.updateData();
        const attrs = this._getIndicatorAttrs();
        this._createOrUpdateIndicatorComponent(attrs);
    }
    initData() {
        registerDataSetInstanceTransform(this._option.dataSet, "indicatorFilter", indicatorMapper);
        const displayData = new DataView(this._option.dataSet, {
            name: `${this.type}_${this.id}_data`
        });
        displayData.transform({
            type: "indicatorFilter",
            options: {
                title: this._title,
                content: this._content,
                datum: () => this._activeDatum
            }
        }), displayData.target.addListener("change", this.updateDatum.bind(this)), this._displayData = new CompilableData(this._option, displayData);
    }
    updateLayoutAttribute() {
        const attrs = this._getIndicatorAttrs();
        this._createOrUpdateIndicatorComponent(attrs), super.updateLayoutAttribute();
    }
    _getIndicatorAttrs() {
        if (!1 === this._spec.visible || !1 === this._spec.fixed && null === this._activeDatum) return {
            visible: !1
        };
        const region = this._regions[0], {width: width, height: height} = region.getLayoutRect(), {x: x, y: y} = region.getLayoutStartPoint(), _a = this._spec, {content: content, offsetX: offsetX, offsetY: offsetY, limitRatio: limitRatio, title: title} = _a, restSpec = __rest(_a, [ "content", "offsetX", "offsetY", "limitRatio", "title" ]), contentComponentSpec = [];
        return array(content).forEach((eachItem => {
            const contentSpec = mergeSpec({}, this._theme.content, eachItem);
            contentComponentSpec.push({
                visible: !1 !== contentSpec.visible && (!contentSpec.field || null !== this._activeDatum),
                space: contentSpec.space || this._gap,
                autoLimit: contentSpec.autoLimit,
                autoFit: contentSpec.autoFit,
                fitPercent: contentSpec.fitPercent,
                fitStrategy: contentSpec.fitStrategy,
                style: Object.assign(Object.assign({}, transformIndicatorStyle(pickWithout(contentSpec.style, [ "text" ]), this._activeDatum)), {
                    text: this._createText(contentSpec.field, contentSpec.style.text)
                })
            });
        })), Object.assign({
            visible: !0,
            size: {
                width: width,
                height: height
            },
            zIndex: this.layoutZIndex,
            x: x,
            y: y,
            dx: offsetX ? getActualNumValue(offsetX, this._computeLayoutRadius()) : 0,
            dy: offsetY ? getActualNumValue(offsetY, this._computeLayoutRadius()) : 0,
            limitRatio: limitRatio || 1 / 0,
            title: {
                visible: !1 !== title.visible && (!isValid(title.field) || null !== this._activeDatum),
                space: title.space || this._gap,
                autoLimit: title.autoLimit,
                autoFit: title.autoFit,
                fitPercent: title.fitPercent,
                fitStrategy: title.fitStrategy,
                style: Object.assign(Object.assign({}, transformIndicatorStyle(pickWithout(title.style, [ "text" ]), this._activeDatum)), {
                    text: this._createText(title.field, title.style.text)
                })
            },
            content: contentComponentSpec
        }, restSpec);
    }
    _createOrUpdateIndicatorComponent(attrs) {
        if (!1 === attrs.visible) return this._indicatorComponent && this._indicatorComponent.parent && this._indicatorComponent.parent.removeChild(this._indicatorComponent), 
        void (this._indicatorComponent = null);
        if (this._indicatorComponent) isEqual(attrs, this._cacheAttrs) || this._indicatorComponent.setAttributes(attrs); else {
            const container = this.getContainer(), indicator = new IndicatorComponents(attrs);
            indicator.name = "indicator", container.add(indicator), this._indicatorComponent = indicator, 
            this._indicatorComponent.on("*", ((event, type) => this._delegateEvent(this._indicatorComponent, event, type)));
        }
        this._cacheAttrs = attrs;
    }
    _createText(field, text) {
        var _a;
        return field ? this._activeDatum ? this._activeDatum[field] : "" : isFunction(text) ? null !== (_a = text(this._activeDatum, void 0)) && void 0 !== _a ? _a : "" : null != text ? text : "";
    }
    _computeLayoutRadius() {
        const region = this._regions[0], {width: width, height: height} = region.getLayoutRect();
        return Math.min(width / 2, height / 2);
    }
    isRelativeModel(regionId) {
        return this._regions.some((region => region.id === regionId));
    }
    _getNeedClearVRenderComponents() {
        return [ this._indicatorComponent ];
    }
    clear() {
        this._cacheAttrs = null, super.clear();
    }
    getIndicatorComponent() {
        return this._indicatorComponent;
    }
}

Indicator.type = ComponentTypeEnum.indicator, Indicator.specKey = "indicator";

export const registerIndicator = () => {
    Factory.registerComponent(Indicator.type, Indicator);
};
//# sourceMappingURL=indicator.js.map
