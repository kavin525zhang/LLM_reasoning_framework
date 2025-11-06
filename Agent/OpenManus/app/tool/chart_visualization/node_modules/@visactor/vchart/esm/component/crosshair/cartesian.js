import { isValid } from "@visactor/vutils";

import { ComponentTypeEnum } from "../interface/type";

import { LineCrosshair, RectCrosshair } from "@visactor/vrender-components";

import { BaseCrossHair } from "./base";

import { isXAxis, isYAxis } from "../axis/cartesian/util/common";

import { Factory } from "../../core/factory";

import { layoutByValue, layoutCrosshair } from "./utils/cartesian";

import { getFirstSeries } from "../../util";

import { getSpecInfo } from "../util";

export class CartesianCrossHair extends BaseCrossHair {
    static getSpecInfo(chartSpec) {
        return getSpecInfo(chartSpec, this.specKey, this.type, (s => s.xField && !1 !== s.xField.visible || s.yField && !1 !== s.yField.visible));
    }
    constructor(spec, options) {
        super(spec, options), this.type = ComponentTypeEnum.cartesianCrosshair, this.name = ComponentTypeEnum.cartesianCrosshair, 
        this._stateByField = {
            xField: {
                coordKey: "x",
                anotherAxisKey: "y",
                currentValue: new Map,
                labelsComp: {
                    top: null,
                    bottom: null
                }
            },
            yField: {
                coordKey: "y",
                anotherAxisKey: "x",
                currentValue: new Map,
                labelsComp: {
                    left: null,
                    right: null
                }
            }
        };
    }
    _findAllAxisContains(relativeX, relativeY) {
        const xAxisMap = this._getAxisInfoByField("x"), yAxisMap = this._getAxisInfoByField("y");
        return {
            xAxisMap: this._filterAxisByPoint(xAxisMap, relativeX, relativeY),
            yAxisMap: this._filterAxisByPoint(yAxisMap, relativeX, relativeY)
        };
    }
    _getDatumAtPoint(axis, point) {
        const dim = isXAxis(axis.getOrient()) ? "x" : "y", coordByAxis = point[dim] - (axis.getLayoutStartPoint()[dim] - this.getLayoutStartPoint()[dim]);
        return axis.getScale().invert(coordByAxis);
    }
    setAxisValue(datum, axis) {
        isXAxis(axis.getOrient()) ? this._stateByField.xField.currentValue.set(axis.getSpecIndex(), {
            datum: datum,
            axis: axis
        }) : this._stateByField.yField.currentValue.set(axis.getSpecIndex(), {
            datum: datum,
            axis: axis
        });
    }
    _layoutCrosshair(relativeX, relativeY, tooltipData, activeType) {
        var _a;
        let x = relativeX, y = relativeY;
        if (tooltipData && tooltipData.length) if ("dimension" === activeType) {
            const dimensionInfo = tooltipData[0], datumIndex = dimensionInfo.data.findIndex((dimData => dimData.datum.length > 0));
            let pos;
            if (datumIndex > -1) {
                const dimensionData = dimensionInfo.data[datumIndex];
                pos = dimensionData.series.dataToPosition(dimensionData.datum[0]);
            }
            (isValid(dimensionInfo.dimType) ? "y" === dimensionInfo.dimType : isYAxis(null === (_a = null == dimensionInfo ? void 0 : dimensionInfo.axis) || void 0 === _a ? void 0 : _a.getOrient())) ? y = null == pos ? void 0 : pos.y : x = null == pos ? void 0 : pos.x;
        } else if ("mark" === activeType) {
            const dimensionData = tooltipData[0], pos = dimensionData.series.dataToPosition(dimensionData.datum[0]);
            x = null == pos ? void 0 : pos.x, y = null == pos ? void 0 : pos.y;
        }
        this.clearAxisValue();
        const {xAxisMap: xAxisMap, yAxisMap: yAxisMap} = this._findAllAxisContains(x, y);
        if (xAxisMap && 0 === xAxisMap.size || yAxisMap && 0 === yAxisMap.size) {
            if (this.enableRemain) return;
            this.hide();
        } else xAxisMap && xAxisMap.size && this._setAllAxisValues(xAxisMap, {
            x: x,
            y: y
        }, "xField"), yAxisMap && yAxisMap.size && this._setAllAxisValues(yAxisMap, {
            x: x,
            y: y
        }, "yField"), this.layoutByValue();
    }
    layoutByValue(enableRemain) {
        if (!this.enable) return;
        const series = getFirstSeries(this._regions, "cartesian");
        series && (layoutByValue(this._stateByField, series, this.getLayoutStartPoint(), null != enableRemain ? enableRemain : this.enableRemain), 
        Object.keys(this._stateByField).forEach((field => {
            this._layoutByField(field);
        })));
    }
    _layoutByField(field) {
        const {cacheInfo: cacheInfo, attributes: attributes, labelsComp: labelsComp, bandSize: bandSize, coordKey: coordKey} = this._stateByField[field];
        if (!attributes || !cacheInfo || cacheInfo._isCache && this.enableRemain) return;
        const {coord: coord, labels: labels, visible: visible, labelsTextStyle: labelsTextStyle} = cacheInfo;
        if (visible) {
            const positionAttribute = layoutCrosshair(this._stateByField[field]);
            this._updateCrosshairByField(field, positionAttribute), Object.keys(labels).forEach((labelKey => {
                var _a;
                if (labels[labelKey].visible) {
                    const updateAttrs = Object.assign(Object.assign(Object.assign({
                        [coordKey]: coord + bandSize / 2
                    }, labels[labelKey]), attributes.label), {
                        textStyle: Object.assign(Object.assign({}, null === (_a = attributes.label) || void 0 === _a ? void 0 : _a.textStyle), labelsTextStyle[labelKey]),
                        zIndex: this.labelZIndex,
                        visible: !0
                    });
                    this._updateCrosshairLabel(labelsComp[labelKey], updateAttrs, (label => {
                        label.name = `crosshair-${field.replace("Field", "")}-${labelKey}-label`, labelsComp[labelKey] = label;
                    }));
                } else labelsComp[labelKey] && labelsComp[labelKey].hideAll();
            }));
        } else this._hideByField(field);
    }
    _updateCrosshairByField(field, positionAttribute) {
        const container = this.getContainer(), {attributes: attributes} = this._stateByField[field];
        let {crosshairComp: crosshairComp} = this._stateByField[field];
        if (crosshairComp) crosshairComp.setAttributes(positionAttribute); else {
            const style = attributes.style;
            "line" === attributes.type ? crosshairComp = new LineCrosshair(Object.assign(Object.assign({}, positionAttribute), {
                lineStyle: style,
                zIndex: this.gridZIndex + 1,
                disableTriggerEvent: this._option.disableTriggerEvent,
                pickable: !1
            })) : "rect" === attributes.type && (crosshairComp = new RectCrosshair(Object.assign(Object.assign({}, positionAttribute), {
                rectStyle: style,
                zIndex: this.gridZIndex,
                disableTriggerEvent: this._option.disableTriggerEvent,
                pickable: !1
            }))), null == container || container.add(crosshairComp), this._stateByField[field].crosshairComp = crosshairComp;
        }
    }
}

CartesianCrossHair.specKey = "crosshair", CartesianCrossHair.type = ComponentTypeEnum.cartesianCrosshair;

export const registerCartesianCrossHair = () => {
    Factory.registerComponent(CartesianCrossHair.type, CartesianCrossHair);
};
//# sourceMappingURL=cartesian.js.map
