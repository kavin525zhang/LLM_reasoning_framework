"use strict";

var __rest = this && this.__rest || function(s, e) {
    var t = {};
    for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0 && (t[p] = s[p]);
    if (null != s && "function" == typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (p = Object.getOwnPropertySymbols(s); i < p.length; i++) e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]) && (t[p[i]] = s[p[i]]);
    }
    return t;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.BaseMarkPoint = void 0;

const utils_1 = require("../utils"), vrender_components_1 = require("@visactor/vrender-components"), vutils_1 = require("@visactor/vutils"), style_1 = require("../../../util/style"), base_marker_1 = require("../base-marker"), layout_1 = require("../../../constant/layout");

class BaseMarkPoint extends base_marker_1.BaseMarker {
    constructor() {
        super(...arguments), this.specKey = "markPoint", this.layoutZIndex = layout_1.LayoutZIndex.MarkPoint;
    }
    static _getMarkerCoordinateType(markerSpec) {
        const {doPolarProcess: doPolarProcess, doGeoProcess: doGeoProcess} = (0, utils_1.getMarkPointProcessInfo)(markerSpec);
        return "polar" === markerSpec.coordinateType || doPolarProcess ? "polar" : "geo" === markerSpec.coordinateType || doGeoProcess ? "geo" : "cartesian";
    }
    _createMarkerComponent() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
        const {itemContent: itemContent = {}, itemLine: itemLine = {}, targetSymbol: targetSymbol = {}} = this._spec, {text: label = {}, symbol: symbol, image: image, richText: richText} = itemContent, restItemContent = __rest(itemContent, [ "text", "symbol", "image", "richText" ]), markPointAttrs = {
            zIndex: this.layoutZIndex,
            interactive: null === (_a = this._spec.interactive) || void 0 === _a || _a,
            hover: null === (_b = this._spec.interactive) || void 0 === _b || _b,
            select: null === (_c = this._spec.interactive) || void 0 === _c || _c,
            position: {
                x: 0,
                y: 0
            },
            clipInRange: null !== (_d = this._spec.clip) && void 0 !== _d && _d,
            itemContent: Object.assign({
                offsetX: (0, utils_1.transformOffset)(itemContent.offsetX, this._relativeSeries.getRegion()),
                offsetY: (0, utils_1.transformOffset)(itemContent.offsetX, this._relativeSeries.getRegion())
            }, restItemContent),
            targetSymbol: {
                offset: null !== (_e = targetSymbol.offset) && void 0 !== _e ? _e : 0,
                visible: null !== (_f = targetSymbol.visible) && void 0 !== _f && _f,
                size: null !== (_g = targetSymbol.size) && void 0 !== _g ? _g : 20,
                style: (0, utils_1.transformStyle)(targetSymbol.style, this._markerData, this._markAttributeContext)
            },
            state: {
                line: (0, utils_1.transformState)(null !== (_j = null === (_h = this._spec.itemLine.line) || void 0 === _h ? void 0 : _h.state) && void 0 !== _j ? _j : {}, this._markerData, this._markAttributeContext),
                lineStartSymbol: (0, utils_1.transformState)(null !== (_l = null === (_k = this._spec.itemLine.startSymbol) || void 0 === _k ? void 0 : _k.state) && void 0 !== _l ? _l : {}, this._markerData, this._markAttributeContext),
                lineEndSymbol: (0, utils_1.transformState)(null !== (_o = null === (_m = this._spec.itemLine.endSymbol) || void 0 === _m ? void 0 : _m.state) && void 0 !== _o ? _o : {}, this._markerData, this._markAttributeContext),
                symbol: (0, utils_1.transformState)(null !== (_q = null === (_p = this._spec.itemContent.symbol) || void 0 === _p ? void 0 : _p.state) && void 0 !== _q ? _q : {}, this._markerData, this._markAttributeContext),
                image: (0, utils_1.transformState)(null !== (_s = null === (_r = this._spec.itemContent.image) || void 0 === _r ? void 0 : _r.state) && void 0 !== _s ? _s : {}, this._markerData, this._markAttributeContext),
                text: (0, utils_1.transformState)(null !== (_u = null === (_t = this._spec.itemContent.text) || void 0 === _t ? void 0 : _t.state) && void 0 !== _u ? _u : {}, this._markerData, this._markAttributeContext),
                textBackground: (0, utils_1.transformState)(null === (_w = null === (_v = this._spec.itemContent.text) || void 0 === _v ? void 0 : _v.labelBackground) || void 0 === _w ? void 0 : _w.state, this._markerData, this._markAttributeContext),
                richText: (0, utils_1.transformState)(null !== (_y = null === (_x = this._spec.itemContent.richText) || void 0 === _x ? void 0 : _x.state) && void 0 !== _y ? _y : {}, this._markerData, this._markAttributeContext),
                customMark: (0, utils_1.transformState)(null !== (_0 = null === (_z = this._spec.itemContent.customMark) || void 0 === _z ? void 0 : _z.state) && void 0 !== _0 ? _0 : {}, this._markerData, this._markAttributeContext),
                targetItem: (0, utils_1.transformState)(null !== (_2 = null === (_1 = this._spec.targetSymbol) || void 0 === _1 ? void 0 : _1.state) && void 0 !== _2 ? _2 : {}, this._markerData, this._markAttributeContext)
            },
            animation: null !== (_3 = this._spec.animation) && void 0 !== _3 && _3,
            animationEnter: this._spec.animationEnter,
            animationExit: this._spec.animationExit,
            animationUpdate: this._spec.animationUpdate
        };
        (null == symbol ? void 0 : symbol.style) && (markPointAttrs.itemContent.symbolStyle = (0, 
        style_1.transformToGraphic)((0, utils_1.transformStyle)(symbol.style, this._markerData, this._markAttributeContext))), 
        (null == image ? void 0 : image.style) && (markPointAttrs.itemContent.imageStyle = (0, 
        utils_1.transformStyle)(image.style, this._markerData, this._markAttributeContext)), 
        label && (markPointAttrs.itemContent.textStyle = (0, utils_1.transformLabelAttributes)(label, this._markerData, this._markAttributeContext)), 
        (null == richText ? void 0 : richText.style) && (markPointAttrs.itemContent.richTextStyle = (0, 
        utils_1.transformStyle)(richText.style, this._markerData, this._markAttributeContext));
        const {visible: visible, line: line = {}} = itemLine, restItemLine = __rest(itemLine, [ "visible", "line" ]);
        markPointAttrs.itemLine = !1 !== visible ? Object.assign(Object.assign({}, restItemLine), {
            visible: !0,
            lineStyle: (0, style_1.transformToGraphic)(line.style)
        }) : {
            visible: !1
        };
        return new vrender_components_1.MarkPoint(markPointAttrs);
    }
    _markerLayout() {
        var _a, _b, _c, _d, _e;
        const spec = this._spec, data = this._markerData, relativeSeries = this._relativeSeries, {point: point} = this._computePointsAttr(), seriesData = this._getRelativeDataView().latestData, dataPoints = data ? data.latestData[0] && data.latestData[0].latestData ? data.latestData[0].latestData : data.latestData : seriesData;
        let limitRect;
        if (spec.clip || (null === (_a = spec.itemContent) || void 0 === _a ? void 0 : _a.confine)) {
            const {minX: minX, maxX: maxX, minY: minY, maxY: maxY} = (0, utils_1.computeClipRange)([ relativeSeries.getRegion() ]);
            limitRect = {
                x: minX,
                y: minY,
                width: maxX - minX,
                height: maxY - minY
            };
        }
        if (this._markerComponent) {
            const attribute = null !== (_b = this._markerComponent.attribute) && void 0 !== _b ? _b : {}, textStyle = null !== (_d = null === (_c = attribute.itemContent) || void 0 === _c ? void 0 : _c.textStyle) && void 0 !== _d ? _d : {};
            this._markerComponent.setAttributes({
                position: void 0 === point ? {
                    x: null,
                    y: null
                } : point,
                itemContent: Object.assign(Object.assign({}, attribute.itemContent), {
                    textStyle: Object.assign(Object.assign({}, textStyle), {
                        text: (null === (_e = this._spec.itemContent.text) || void 0 === _e ? void 0 : _e.formatMethod) ? this._spec.itemContent.text.formatMethod(dataPoints, seriesData) : textStyle.text
                    }),
                    offsetX: (0, utils_1.computeOffsetFromRegion)(point, attribute.itemContent.offsetX, this._relativeSeries.getRegion()),
                    offsetY: (0, utils_1.computeOffsetFromRegion)(point, attribute.itemContent.offsetY, this._relativeSeries.getRegion())
                }),
                limitRect: limitRect,
                dx: this._layoutOffsetX,
                dy: this._layoutOffsetY
            });
        }
    }
    _initDataView() {
        const spec = this._spec, {doXYProcess: doXYProcess, doPolarProcess: doPolarProcess, doGeoProcess: doGeoProcess} = (0, 
        utils_1.getMarkPointProcessInfo)(spec);
        ((0, vutils_1.isValid)(spec.coordinate) || doXYProcess || doPolarProcess || doGeoProcess) && this._initCommonDataView();
    }
}

exports.BaseMarkPoint = BaseMarkPoint, BaseMarkPoint.specKey = "markPoint";
//# sourceMappingURL=base-mark-point.js.map
