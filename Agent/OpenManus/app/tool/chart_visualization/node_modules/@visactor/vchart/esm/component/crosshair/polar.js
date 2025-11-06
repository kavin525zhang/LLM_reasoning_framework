import { ComponentTypeEnum } from "../interface/type";

import { LineCrosshair, SectorCrosshair, CircleCrosshair, PolygonCrosshair } from "@visactor/vrender-components";

import { BaseCrossHair } from "./base";

import { polarToCartesian } from "@visactor/vutils";

import { angleLabelOrientAttribute, radiusLabelOrientAttribute } from "../../util/math";

import { Factory } from "../../core/factory";

import { layoutByValue, layoutCrosshair } from "./utils/polar";

import { getFirstSeries } from "../../util";

import { getSpecInfo } from "../util";

export class PolarCrossHair extends BaseCrossHair {
    static getSpecInfo(chartSpec) {
        return getSpecInfo(chartSpec, this.specKey, this.type, (s => s.categoryField && !1 !== s.categoryField.visible || s.valueField && !1 !== s.valueField.visible));
    }
    constructor(spec, options) {
        super(spec, options), this.type = ComponentTypeEnum.polarCrosshair, this.name = ComponentTypeEnum.polarCrosshair, 
        this._stateByField = {
            categoryField: {
                coordKey: "angle",
                anotherAxisKey: "radius",
                currentValue: new Map,
                labelsComp: {
                    all: null
                }
            },
            valueField: {
                coordKey: "radius",
                anotherAxisKey: "angle",
                currentValue: new Map,
                labelsComp: {
                    all: null
                }
            }
        };
    }
    setAxisValue(datum, axis) {
        "radius" === axis.getOrient() ? this._stateByField.valueField.currentValue.set(axis.getSpecIndex(), {
            datum: datum,
            axis: axis
        }) : this._stateByField.categoryField.currentValue.set(axis.getSpecIndex(), {
            datum: datum,
            axis: axis
        });
    }
    _findAllAxisContains(relativeX, relativeY) {
        const angleAxisMap = this._getAxisInfoByField("category"), radiusAxisMap = this._getAxisInfoByField("value");
        return {
            angleAxisMap: this._filterAxisByPoint(angleAxisMap, relativeX, relativeY),
            radiusAxisMap: this._filterAxisByPoint(radiusAxisMap, relativeX, relativeY)
        };
    }
    _getDatumAtPoint(axis, point) {
        const {x: axisStartX, y: axisStartY} = axis.getLayoutStartPoint(), {x: x, y: y} = this.getLayoutStartPoint();
        return axis.positionToData({
            x: point.x - (axisStartX - x),
            y: point.y - (axisStartY - y)
        });
    }
    _layoutCrosshair(relativeX, relativeY, tooltipData, activeType) {
        let x = relativeX, y = relativeY;
        if (tooltipData && tooltipData.length) if ("dimension" === activeType) {
            const dimensionInfo = tooltipData[0];
            if (dimensionInfo.axis) {
                const triggerCoord = dimensionInfo.axis.pointToCoord({
                    x: x,
                    y: y
                }), coord = "radius" === dimensionInfo.axis.getOrient() ? {
                    radius: dimensionInfo.position,
                    angle: triggerCoord.angle
                } : {
                    radius: triggerCoord.radius,
                    angle: dimensionInfo.position
                }, uniformPos = dimensionInfo.axis.coordToPoint(coord);
                x = uniformPos.x, y = uniformPos.y;
            }
        } else if ("mark" === activeType) {
            const dimensionData = tooltipData[0], pos = dimensionData.series.dataToPosition(dimensionData.datum[0]);
            x = pos.x, y = pos.y;
        }
        this.clearAxisValue();
        const {angleAxisMap: angleAxisMap, radiusAxisMap: radiusAxisMap} = this._findAllAxisContains(x, y);
        if (0 !== angleAxisMap.size || 0 !== radiusAxisMap.size) angleAxisMap && this._setAllAxisValues(angleAxisMap, {
            x: x,
            y: y
        }, "categoryField"), radiusAxisMap && this._setAllAxisValues(radiusAxisMap, {
            x: x,
            y: y
        }, "valueField"), this.layoutByValue(); else {
            if (this.enableRemain) return;
            this.hide();
        }
    }
    layoutByValue(enableRemain) {
        if (!this.enable) return;
        const series = getFirstSeries(this._regions, "polar");
        series && (layoutByValue(this._stateByField, series, null != enableRemain ? enableRemain : this.enableRemain), 
        Object.keys(this._stateByField).forEach((field => {
            this._layoutByField(field);
        })));
    }
    _layoutByField(fieldName) {
        var _a, _b, _c;
        const {cacheInfo: cacheInfo, attributes: attributes, crosshairComp: crosshairComp, labelsComp: labelsComp, coordKey: coordKey} = this._stateByField[fieldName];
        if (!cacheInfo || cacheInfo._isCache && this.enableRemain) return;
        const container = this.getContainer(), {visible: visible, labels: labels, coord: coord, sizeRange: sizeRange, axis: axis} = cacheInfo;
        if (visible) {
            const layoutStartPoint = this.getLayoutStartPoint(), smooth = null === (_b = null === (_a = this._spec.valueField) || void 0 === _a ? void 0 : _a.line) || void 0 === _b ? void 0 : _b.smooth, positionAttrs = layoutCrosshair(this._stateByField[fieldName], layoutStartPoint, smooth);
            if (crosshairComp) crosshairComp.setAttributes(positionAttrs); else {
                let crosshair;
                if ("angle" === coordKey) {
                    const crosshairType = "rect" === attributes.type ? "sector" : "line";
                    "line" === crosshairType ? crosshair = new LineCrosshair(Object.assign(Object.assign({}, positionAttrs), {
                        lineStyle: attributes.style,
                        zIndex: this.gridZIndex,
                        pickable: !1
                    })) : "sector" === crosshairType && (crosshair = new SectorCrosshair(Object.assign(Object.assign({}, positionAttrs), {
                        sectorStyle: attributes.style,
                        zIndex: this.gridZIndex,
                        pickable: !1
                    })));
                } else {
                    crosshair = "polygon" === (smooth ? "circle" : "polygon") ? new PolygonCrosshair(Object.assign(Object.assign({}, positionAttrs), {
                        lineStyle: attributes.style,
                        zIndex: this.gridZIndex + 1
                    })) : new CircleCrosshair(Object.assign(Object.assign({}, positionAttrs), {
                        lineStyle: attributes.style,
                        zIndex: this.gridZIndex
                    }));
                }
                this._stateByField[fieldName].crosshairComp = crosshair, container.add(crosshair);
            }
            const label = labels.all;
            if (label.visible) {
                const axisCenter = axis.getCenter(), center = {
                    x: axisCenter.x + layoutStartPoint.x,
                    y: axisCenter.y + layoutStartPoint.y
                }, orient = "angle" === coordKey ? angleLabelOrientAttribute(coord) : radiusLabelOrientAttribute(axis.startAngle), point = "angle" === coordKey ? polarToCartesian(center, sizeRange[1] + label.offset, coord) : polarToCartesian(center, positionAttrs.radius, axis.startAngle), labelAttrs = Object.assign(Object.assign(Object.assign(Object.assign({}, point), attributes.label), label), {
                    textStyle: Object.assign(Object.assign({}, null === (_c = attributes.label) || void 0 === _c ? void 0 : _c.textStyle), {
                        textAlign: orient.align,
                        textBaseline: orient.baseline
                    }),
                    zIndex: this.labelZIndex
                });
                this._updateCrosshairLabel(labelsComp.all, labelAttrs, (label => {
                    label.name = `crosshair-${coordKey}-label`, labelsComp.all = label;
                }));
            } else labelsComp.all && labelsComp.all.hideAll();
        }
    }
}

PolarCrossHair.specKey = "crosshair", PolarCrossHair.type = ComponentTypeEnum.polarCrosshair;

export const registerPolarCrossHair = () => {
    Factory.registerComponent(PolarCrossHair.type, PolarCrossHair);
};
//# sourceMappingURL=polar.js.map
