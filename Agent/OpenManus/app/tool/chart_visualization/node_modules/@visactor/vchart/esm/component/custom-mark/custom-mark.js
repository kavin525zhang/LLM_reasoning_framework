import { BaseComponent } from "../base/base-component";

import { ComponentTypeEnum } from "../interface/type";

import { LayoutLevel, LayoutZIndex } from "../../constant/layout";

import { PREFIX } from "../../constant/base";

import { Bounds, isEqual, isNil, isValid, isValidNumber } from "@visactor/vutils";

import { Factory } from "../../core/factory";

import { animationConfig, userAnimationConfig } from "../../animation/utils";

export class CustomMark extends BaseComponent {
    constructor() {
        super(...arguments), this.type = ComponentTypeEnum.customMark, this.specKey = "customMark", 
        this.layoutType = "none", this.layoutZIndex = LayoutZIndex.CustomMark, this.layoutLevel = LayoutLevel.CustomMark;
    }
    created() {
        super.created(), this.initMarks(), this.initEvent();
    }
    getMarkAttributeContext() {
        return this._markAttributeContext;
    }
    _buildMarkAttributeContext() {
        this._markAttributeContext = {
            vchart: this._option.globalInstance,
            globalScale: (key, value) => {
                var _a;
                return null === (_a = this._option.globalScale.getScale(key)) || void 0 === _a ? void 0 : _a.scale(value);
            }
        };
    }
    initMarks() {
        if (!this._spec) return;
        const series = this._option && this._option.getAllSeries(), hasAnimation = !1 !== this._option.animation, depend = [];
        series && series.length && series.forEach((s => {
            const marks = s && s.getMarksWithoutRoot();
            marks && marks.length && marks.forEach((mark => {
                depend.push(mark);
            }));
        }));
        let parentMark = null;
        if (this._spec.parent) {
            const mark = this.getChart().getAllMarks().find((m => m.getUserId() === this._spec.parent));
            "group" === mark.type && (parentMark = mark);
        }
        this._createExtensionMark(this._spec, parentMark, `${PREFIX}_series_${this.id}_extensionMark`, 0, {
            depend: depend,
            hasAnimation: hasAnimation
        });
    }
    _createExtensionMark(spec, parentMark, namePrefix, index = 0, options) {
        var _a;
        const mark = this._createMark({
            type: spec.type,
            name: isValid(spec.name) ? `${spec.name}` : `${namePrefix}_${index}`
        }, {
            skipBeforeLayouted: !0,
            attributeContext: this._getMarkAttributeContext(),
            componentType: spec.componentType,
            key: spec.dataKey
        });
        if (mark) {
            if (isValid(spec.id) && mark.setUserId(spec.id), options.hasAnimation && spec.animation) {
                const config = animationConfig({}, userAnimationConfig(spec.type, spec, this._markAttributeContext));
                mark.setAnimationConfig(config);
            }
            if (options.depend && options.depend.length && mark.setDepend(...options.depend), 
            isNil(parentMark) ? this._marks.addMark(mark) : parentMark && parentMark.addMark(mark), 
            this.initMarkStyleWithSpec(mark, spec), "group" === spec.type && (namePrefix = `${namePrefix}_${index}`, 
            null === (_a = spec.children) || void 0 === _a || _a.forEach(((s, i) => {
                this._createExtensionMark(s, mark, namePrefix, i, options);
            }))), isValid(spec.dataId) || isValidNumber(spec.dataIndex)) {
                const dataview = this.getChart().getSeriesData(spec.dataId, spec.dataIndex);
                dataview && (dataview.target.addListener("change", (() => {
                    mark.getData().updateData();
                })), mark.setDataView(dataview));
            }
        }
    }
    initEvent() {}
    _compareSpec(spec, prevSpec) {
        const result = super._compareSpec(spec, prevSpec);
        return isEqual(prevSpec, spec) || (result.reMake = !0), result.change = !0, result.reRender = !0, 
        result;
    }
    changeRegions(regions) {}
    _getNeedClearVRenderComponents() {
        return [];
    }
    onRender(ctx) {}
    _getMarkAttributeContext() {
        return {
            vchart: this._option.globalInstance,
            chart: this.getChart(),
            globalScale: (key, value) => {
                var _a;
                return null === (_a = this._option.globalScale.getScale(key)) || void 0 === _a ? void 0 : _a.scale(value);
            },
            getLayoutBounds: () => {
                const {x: x, y: y} = this.getLayoutStartPoint(), {width: width, height: height} = this.getLayoutRect();
                return (new Bounds).set(x, y, x + width, y + height);
            }
        };
    }
    _getLayoutRect() {
        const bounds = new Bounds;
        return this.getMarks().forEach((mark => {
            const product = mark.getProduct();
            product && bounds.union(product.getBounds());
        })), bounds.empty() ? {
            width: 0,
            height: 0
        } : {
            width: bounds.width(),
            height: bounds.height()
        };
    }
    getBoundsInRect(rect) {
        this.setLayoutRect(rect);
        const result = this._getLayoutRect(), {x: x, y: y} = this.getLayoutStartPoint();
        return {
            x1: x,
            y1: y,
            x2: x + result.width,
            y2: y + result.height
        };
    }
    getVRenderComponents() {
        const comps = [], checkFunc = m => {
            var _a;
            if (m && "group" === m.type) m.getMarks().forEach((child => {
                checkFunc(child);
            })); else if ("component" === m.type) {
                const comp = null === (_a = null == m ? void 0 : m.getProduct()) || void 0 === _a ? void 0 : _a.getGroupGraphicItem();
                comp && comps.push(comp);
            }
        };
        return this.getMarks().forEach((m => {
            checkFunc(m);
        })), comps;
    }
}

CustomMark.type = ComponentTypeEnum.customMark, CustomMark.specKey = "customMark";

export const registerCustomMark = () => {
    Factory.registerComponent(CustomMark.type, CustomMark);
};
//# sourceMappingURL=custom-mark.js.map
