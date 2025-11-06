var __rest = this && this.__rest || function(s, e) {
    var t = {};
    for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0 && (t[p] = s[p]);
    if (null != s && "function" == typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (p = Object.getOwnPropertySymbols(s); i < p.length; i++) e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]) && (t[p[i]] = s[p[i]]);
    }
    return t;
};

import { isValidNumber, merge } from "@visactor/vutils";

import { AbstractComponent } from "../core/base";

import { bitmapTool } from "./overlap";

import { LabelBase as PointLabel } from "./base";

import { getLabelComponent } from "./data-label-register";

export class DataLabel extends AbstractComponent {
    constructor(attributes, options) {
        const {dataLabels: dataLabels} = attributes, restAttributes = __rest(attributes, [ "dataLabels" ]);
        super((null == options ? void 0 : options.skipDefault) ? attributes : Object.assign({
            dataLabels: dataLabels
        }, merge({}, DataLabel.defaultAttributes, restAttributes))), this.name = "data-label";
    }
    render() {
        var _a;
        const {dataLabels: dataLabels, size: size} = this.attribute;
        if (!dataLabels || 0 === dataLabels.length) return;
        const {width: width = 0, height: height = 0, padding: padding} = size || {};
        if (!width || !height || !isValidNumber(height * width)) return;
        this._componentMap || (this._componentMap = new Map);
        const tool = bitmapTool(width, height, padding), bitmap = tool.bitmap(), currentComponentMap = new Map, prevComponentMap = this._componentMap;
        for (let i = 0; i < dataLabels.length; i++) {
            const dataLabel = dataLabels[i], labelComponent = getLabelComponent(dataLabel.type) || PointLabel;
            if (labelComponent) {
                const {baseMarkGroupName: baseMarkGroupName, type: type} = dataLabel, id = null !== (_a = dataLabel.id) && void 0 !== _a ? _a : `${baseMarkGroupName}-${type}-${i}`;
                "arc" === dataLabel.type && (dataLabel.width = size.width, dataLabel.height = size.height);
                let component = this._componentMap.get(id);
                component ? (component.setBitmapTool(tool), component.setBitmap(bitmap), component.setAttributes(dataLabel), 
                currentComponentMap.set(id, component)) : (component = new labelComponent(dataLabel), 
                component.setBitmap(bitmap), component.setBitmapTool(tool), this.add(component), 
                currentComponentMap.set(id, component));
            }
        }
        prevComponentMap.forEach(((cp, key) => {
            currentComponentMap.get(key) || this.removeChild(cp);
        })), this._componentMap = currentComponentMap;
    }
    setLocation(point) {
        this.translateTo(point.x, point.y);
    }
    disableAnimation() {
        this._componentMap.forEach((component => {
            component.disableAnimation();
        }));
    }
    enableAnimation() {
        this._componentMap.forEach((component => {
            component.enableAnimation();
        }));
    }
}

DataLabel.defaultAttributes = {
    pickable: !1
};
//# sourceMappingURL=dataLabel.js.map