import { BaseComponent } from "../base/base-component";

import { ComponentTypeEnum } from "../interface/type";

import { LayoutZIndex } from "../../constant/layout";

import { isEqual } from "@visactor/vutils";

export class BaseLabelComponent extends BaseComponent {
    constructor(spec, options) {
        super(spec, options), this.type = ComponentTypeEnum.label, this.name = ComponentTypeEnum.label, 
        this.layoutType = "none", this.layoutZIndex = LayoutZIndex.Label, this._regions = options.getRegionsInIndex(options.regionIndexes);
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
        return result.reRender = !0, isEqual(prevSpec, spec) || (result.reMake = !0), result;
    }
    onRender(ctx) {}
    changeRegions(regions) {}
    _getNeedClearVRenderComponents() {
        return [];
    }
}

BaseLabelComponent.type = ComponentTypeEnum.label;
//# sourceMappingURL=base-label.js.map
