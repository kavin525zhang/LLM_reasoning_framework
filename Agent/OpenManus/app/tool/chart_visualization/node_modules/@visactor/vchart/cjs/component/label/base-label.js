"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.BaseLabelComponent = void 0;

const base_component_1 = require("../base/base-component"), type_1 = require("../interface/type"), layout_1 = require("../../constant/layout"), vutils_1 = require("@visactor/vutils");

class BaseLabelComponent extends base_component_1.BaseComponent {
    constructor(spec, options) {
        super(spec, options), this.type = type_1.ComponentTypeEnum.label, this.name = type_1.ComponentTypeEnum.label, 
        this.layoutType = "none", this.layoutZIndex = layout_1.LayoutZIndex.Label, this._regions = options.getRegionsInIndex(options.regionIndexes);
    }
    _interactiveConfig(labelSpec) {
        const {interactive: interactive} = labelSpec, result = {
            hover: !1,
            select: !1,
            state: labelSpec.state
        };
        if (!0 !== interactive) return result;
        const {hover: hover, select: select} = this._option.getChart().getSpec();
        return !1 === hover && !1 === hover.enable || (result.hover = !0), !1 === select && !1 === select.enable || (result.select = !0), 
        result;
    }
    _compareSpec(spec, prevSpec) {
        const result = super._compareSpec(spec, prevSpec);
        return result.reRender = !0, (0, vutils_1.isEqual)(prevSpec, spec) || (result.reMake = !0), 
        result;
    }
    onRender(ctx) {}
    changeRegions(regions) {}
    _getNeedClearVRenderComponents() {
        return [];
    }
}

exports.BaseLabelComponent = BaseLabelComponent, BaseLabelComponent.type = type_1.ComponentTypeEnum.label;
//# sourceMappingURL=base-label.js.map
