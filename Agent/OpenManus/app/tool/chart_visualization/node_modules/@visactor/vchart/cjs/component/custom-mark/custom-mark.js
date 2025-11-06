"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerCustomMark = exports.CustomMark = void 0;

const base_component_1 = require("../base/base-component"), type_1 = require("../interface/type"), layout_1 = require("../../constant/layout"), base_1 = require("../../constant/base"), vutils_1 = require("@visactor/vutils"), factory_1 = require("../../core/factory"), utils_1 = require("../../animation/utils");

class CustomMark extends base_component_1.BaseComponent {
    constructor() {
        super(...arguments), this.type = type_1.ComponentTypeEnum.customMark, this.specKey = "customMark", 
        this.layoutType = "none", this.layoutZIndex = layout_1.LayoutZIndex.CustomMark, 
        this.layoutLevel = layout_1.LayoutLevel.CustomMark;
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
        this._createExtensionMark(this._spec, parentMark, `${base_1.PREFIX}_series_${this.id}_extensionMark`, 0, {
            depend: depend,
            hasAnimation: hasAnimation
        });
    }
    _createExtensionMark(spec, parentMark, namePrefix, index = 0, options) {
        var _a;
        const mark = this._createMark({
            type: spec.type,
            name: (0, vutils_1.isValid)(spec.name) ? `${spec.name}` : `${namePrefix}_${index}`
        }, {
            skipBeforeLayouted: !0,
            attributeContext: this._getMarkAttributeContext(),
            componentType: spec.componentType,
            key: spec.dataKey
        });
        if (mark) {
            if ((0, vutils_1.isValid)(spec.id) && mark.setUserId(spec.id), options.hasAnimation && spec.animation) {
                const config = (0, utils_1.animationConfig)({}, (0, utils_1.userAnimationConfig)(spec.type, spec, this._markAttributeContext));
                mark.setAnimationConfig(config);
            }
            if (options.depend && options.depend.length && mark.setDepend(...options.depend), 
            (0, vutils_1.isNil)(parentMark) ? this._marks.addMark(mark) : parentMark && parentMark.addMark(mark), 
            this.initMarkStyleWithSpec(mark, spec), "group" === spec.type && (namePrefix = `${namePrefix}_${index}`, 
            null === (_a = spec.children) || void 0 === _a || _a.forEach(((s, i) => {
                this._createExtensionMark(s, mark, namePrefix, i, options);
            }))), (0, vutils_1.isValid)(spec.dataId) || (0, vutils_1.isValidNumber)(spec.dataIndex)) {
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
        return (0, vutils_1.isEqual)(prevSpec, spec) || (result.reMake = !0), result.change = !0, 
        result.reRender = !0, result;
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
                return (new vutils_1.Bounds).set(x, y, x + width, y + height);
            }
        };
    }
    _getLayoutRect() {
        const bounds = new vutils_1.Bounds;
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

exports.CustomMark = CustomMark, CustomMark.type = type_1.ComponentTypeEnum.customMark, 
CustomMark.specKey = "customMark";

const registerCustomMark = () => {
    factory_1.Factory.registerComponent(CustomMark.type, CustomMark);
};

exports.registerCustomMark = registerCustomMark;
//# sourceMappingURL=custom-mark.js.map
