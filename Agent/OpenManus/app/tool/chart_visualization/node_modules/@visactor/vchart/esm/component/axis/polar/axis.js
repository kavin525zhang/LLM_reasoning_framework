var __rest = this && this.__rest || function(s, e) {
    var t = {};
    for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0 && (t[p] = s[p]);
    if (null != s && "function" == typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (p = Object.getOwnPropertySymbols(s); i < p.length; i++) e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]) && (t[p[i]] = s[p[i]]);
    }
    return t;
};

import { POLAR_DEFAULT_RADIUS, POLAR_END_RADIAN, POLAR_START_RADIAN } from "../../../constant/polar";

import { isContinuous } from "@visactor/vscale";

import { LayoutZIndex } from "../../../constant/layout";

import { ComponentTypeEnum } from "../../interface/type";

import { Factory } from "../../../core/factory";

import { eachSeries } from "../../../util/model";

import { isPolarAxisSeries } from "../../../series/util/utils";

import { getAxisItem, getAxisLabelOffset, isValidPolarAxis, shouldUpdateAxis } from "../util";

import { PointService, degreeToRadian, isValid, isArray, isValidNumber, polarToCartesian, cartesianToPolar } from "@visactor/vutils";

import { AxisComponent } from "../base-axis";

import { computeLayoutRadius, getPolarAxisInfo } from "./util";

import { mergeSpec } from "@visactor/vutils-extension";

import { calcLayoutNumber } from "../../../util/space";

export class PolarAxis extends AxisComponent {
    get center() {
        return this._center;
    }
    get startAngle() {
        return this._startAngle;
    }
    get endAngle() {
        return this._endAngle;
    }
    getOrient() {
        return this._orient;
    }
    getDefaultInteractive() {
        return "angle" !== this._orient;
    }
    getGroupScales() {
        return this._groupScales;
    }
    static getSpecInfo(chartSpec) {
        if (!chartSpec[this.specKey]) return null;
        const isArraySpec = isArray(chartSpec[this.specKey]), axesSpec = isArraySpec ? chartSpec[this.specKey] : [ chartSpec[this.specKey] ], specInfos = [];
        let angleAxisIndex, radiusAxisIndex;
        const radiusAxisSpecInfos = [], angleAxisSpecInfos = [];
        return axesSpec.forEach(((s, i) => {
            if (!isValidPolarAxis(s)) return;
            const {axisType: axisType, componentName: componentName, startAngle: startAngle, endAngle: endAngle, center: center, outerRadius: outerRadius, layoutRadius: layoutRadius} = getPolarAxisInfo(s, chartSpec);
            s.center = center, s.startAngle = startAngle, s.endAngle = endAngle, s.outerRadius = outerRadius, 
            s.type = axisType, s.layoutRadius = layoutRadius;
            const info = {
                spec: s,
                specPath: isArraySpec ? [ this.specKey, i ] : [ this.specKey ],
                specInfoPath: [ "component", this.specKey, i ],
                type: componentName
            };
            specInfos.push(info), "radius" === s.orient ? (radiusAxisSpecInfos.push(info), radiusAxisIndex = i) : (angleAxisSpecInfos.push(info), 
            angleAxisIndex = i);
        })), radiusAxisSpecInfos.forEach((info => {
            info.angleAxisIndex = angleAxisIndex;
        })), angleAxisSpecInfos.forEach((info => {
            info.radiusAxisIndex = radiusAxisIndex;
        })), specInfos;
    }
    static createComponent(specInfo, options) {
        const {spec: spec} = specInfo, others = __rest(specInfo, [ "spec" ]), C = Factory.getComponentInKey(others.type);
        return C ? new C(spec, Object.assign(Object.assign({}, options), others)) : (options.onError(`Component ${others.type} not found`), 
        null);
    }
    constructor(spec, options) {
        super(spec, options), this.type = ComponentTypeEnum.polarAxis, this.name = ComponentTypeEnum.polarAxis, 
        this._defaultBandPosition = 0, this._defaultBandInnerPadding = 0, this._defaultBandOuterPadding = 0, 
        this.layoutType = "absolute", this.layoutZIndex = LayoutZIndex.Axis, this._tick = void 0, 
        this._center = null, this._startAngle = POLAR_START_RADIAN, this._endAngle = POLAR_END_RADIAN, 
        this._orient = "radius", this._groupScales = [], this.effect = {
            scaleUpdate: param => {
                this.computeData(null == param ? void 0 : param.value), eachSeries(this._regions, (s => {
                    "radius" === this.getOrient() ? shouldUpdateAxis(s.radiusAxisHelper, this.axisHelper(), isValid(this._seriesUserId) || isValid(this._seriesIndex)) && (s.radiusAxisHelper = this.axisHelper()) : shouldUpdateAxis(s.angleAxisHelper, this.axisHelper(), isValid(this._seriesUserId) || isValid(this._seriesIndex)) && (s.angleAxisHelper = this.axisHelper());
                }), {
                    userId: this._seriesUserId,
                    specIndex: this._seriesIndex
                });
            }
        }, this._transformLayoutPosition = pos => {
            var _a;
            const region = null === (_a = this.getRegions()) || void 0 === _a ? void 0 : _a[0];
            return region ? region.getLayoutStartPoint() : pos;
        }, this.getCenter = () => {
            var _a, _b;
            const layoutRect = this.getRefLayoutRect(), {width: width, height: height} = layoutRect;
            return {
                x: calcLayoutNumber(null === (_a = this._center) || void 0 === _a ? void 0 : _a.x, width, layoutRect, width / 2),
                y: calcLayoutNumber(null === (_b = this._center) || void 0 === _b ? void 0 : _b.y, height, layoutRect, height / 2)
            };
        }, this.getRefLayoutRect = () => this.getRegions()[0].getLayoutRect(), this._coordinateType = "polar";
    }
    setAttrFromSpec() {
        super.setAttrFromSpec(), this.visible && (this._axisStyle = this._getAxisAttributes(), 
        this._gridStyle = this._getGridAttributes()), this._tick = this._spec.tick, this._orient = "angle" === this._spec.orient ? "angle" : "radius", 
        this._center = this._spec.center, this._startAngle = degreeToRadian(this._spec.startAngle), 
        this._endAngle = degreeToRadian(this._spec.endAngle), this._inverse = this._spec.inverse;
    }
    onRender(ctx) {}
    changeRegions() {}
    _tickTransformOption() {
        var _a;
        return Object.assign(Object.assign({}, super._tickTransformOption()), {
            noDecimal: null === (_a = this._tick) || void 0 === _a ? void 0 : _a.noDecimals,
            startAngle: this.startAngle,
            labelOffset: getAxisLabelOffset(this._spec),
            getRadius: () => this.getOuterRadius(),
            inside: this._spec.inside
        });
    }
    updateScaleRange() {
        const prevRange = this._scale.range();
        let newRange;
        return newRange = "radius" === this.getOrient() ? this._inverse ? [ this.computeLayoutOuterRadius(), this.computeLayoutInnerRadius() ] : [ this.computeLayoutInnerRadius(), this.computeLayoutOuterRadius() ] : this._inverse ? [ this._endAngle, this._startAngle ] : [ this._startAngle, this._endAngle ], 
        (!prevRange || !newRange || prevRange[0] !== newRange[0] || prevRange[1] !== newRange[1]) && (this._scale.range(newRange), 
        !0);
    }
    collectSeriesField(depth, series) {
        var _a, _b;
        let field;
        return field = depth > 0 ? null === (_b = null === (_a = series.getGroups()) || void 0 === _a ? void 0 : _a.fields) || void 0 === _b ? void 0 : _b[depth] : "radius" === this.getOrient() ? series.getRadiusField() : series.getAngleField(), 
        field;
    }
    updateSeriesScale() {
        eachSeries(this._regions, (s => {
            "radius" === this.getOrient() ? shouldUpdateAxis(s.radiusAxisHelper, this.axisHelper(), isValid(this._seriesUserId) || isValid(this._seriesIndex)) && (s.setRadiusScale(this._scale), 
            s.radiusAxisHelper = this.axisHelper()) : shouldUpdateAxis(s.angleAxisHelper, this.axisHelper(), isValid(this._seriesUserId) || isValid(this._seriesIndex)) && (s.setAngleScale(this._scale), 
            s.angleAxisHelper = this.axisHelper());
        }), {
            userId: this._seriesUserId,
            specIndex: this._seriesIndex
        });
    }
    getSeriesStatisticsField(s) {
        const f = "radius" === this.getOrient() ? s.getRadiusField() : s.getAngleField();
        return isContinuous(this._scale.type) ? f : [ f[0] ];
    }
    initGroupScales() {}
    axisHelper() {
        return {
            isContinuous: isContinuous(this._scale.type),
            dataToPosition: this.dataToPosition.bind(this),
            coordToPoint: this.coordToPoint.bind(this),
            pointToCoord: this.pointToCoord.bind(this),
            center: this.getCenter.bind(this),
            layoutRadius: this._computeLayoutRadius.bind(this),
            getScale: (depth = 0) => this._scales[depth],
            getAxisId: () => this.id,
            getSpec: () => this._spec
        };
    }
    positionToData(position) {
        const coord = this.pointToCoord(position);
        return "radius" === this.getOrient() ? this.invert(coord.radius) : this.invert(coord.angle);
    }
    coordToPoint(point) {
        const center = this.getCenter();
        return polarToCartesian(center, point.radius, point.angle);
    }
    pointToCoord(point) {
        const center = this.getCenter(), startAngle = this._startAngle, endAngle = this._endAngle;
        return cartesianToPolar(point, center, startAngle, endAngle);
    }
    getOuterRadius() {
        return this.computeLayoutOuterRadius();
    }
    getInnerRadius() {
        return this.computeLayoutInnerRadius();
    }
    updateLayoutAttribute() {
        this._visible && ("radius" === this.getOrient() ? this._layoutRadiusAxis() : this._layoutAngleAxis()), 
        super.updateLayoutAttribute();
    }
    _getNormalizedValue(values, length) {
        return 0 === length ? 0 : (this.dataToPosition(values) - this._getStartValue()) / length;
    }
    getLabelItems(length) {
        var _a;
        const tickLatestData = null === (_a = this.getTickData()) || void 0 === _a ? void 0 : _a.getLatestData();
        return tickLatestData && tickLatestData.length ? [ tickLatestData.map((obj => getAxisItem(obj.value, this._getNormalizedValue([ obj.value ], length)))) ] : [];
    }
    _getStartValue() {
        return "radius" === this.getOrient() ? this.computeLayoutInnerRadius() : this._startAngle;
    }
    _layoutAngleAxis() {
        var _a, _b, _c;
        const center = this.getCenter(), radius = this.computeLayoutOuterRadius(), innerRadius = this.computeLayoutInnerRadius(), angleRange = this._endAngle - this._startAngle, items = this.getLabelItems(angleRange), commonAttrs = Object.assign(Object.assign({}, this.getLayoutStartPoint()), {
            inside: this._spec.inside,
            center: center,
            radius: radius,
            innerRadius: innerRadius,
            startAngle: this._startAngle,
            endAngle: this._endAngle,
            sides: (null === (_c = null === (_b = null === (_a = this._getRelatedAxis(this._option.radiusAxisIndex)) || void 0 === _a ? void 0 : _a.getSpec()) || void 0 === _b ? void 0 : _b.grid) || void 0 === _c ? void 0 : _c.smooth) ? void 0 : this.getScale().domain().length
        }), attrs = Object.assign(Object.assign({}, commonAttrs), {
            size: this.getRefLayoutRect(),
            title: {
                text: this._spec.title.text || this._dataFieldText
            },
            items: items,
            orient: "angle"
        });
        this._spec.grid.visible && (attrs.grid = Object.assign({
            type: "line",
            smoothLink: !0,
            items: items[0]
        }, commonAttrs)), this._update(attrs);
    }
    _layoutRadiusAxis() {
        var _a, _b, _c;
        const center = this.getCenter(), radius = this.computeLayoutOuterRadius(), innerRadius = this.computeLayoutInnerRadius(), endPoint = this.coordToPoint({
            angle: this._startAngle,
            radius: radius
        }), startPoint = this.coordToPoint({
            angle: this._startAngle,
            radius: innerRadius
        }), distance = PointService.distancePP(startPoint, endPoint), items = this.getLabelItems(distance), commonAttrs = Object.assign(Object.assign({}, this.getLayoutStartPoint()), {
            start: startPoint,
            end: endPoint,
            verticalFactor: -1
        }), attrs = Object.assign(Object.assign({}, commonAttrs), {
            title: {
                text: this._spec.title.text || this._dataFieldText
            },
            items: items,
            orient: "radius"
        });
        (null === (_a = this._spec.grid) || void 0 === _a ? void 0 : _a.visible) && (attrs.grid = Object.assign({
            items: items[0],
            type: (null === (_b = this._spec.grid) || void 0 === _b ? void 0 : _b.smooth) ? "circle" : "polygon",
            center: center,
            closed: !0,
            sides: null === (_c = this._getRelatedAxis(this._option.angleAxisIndex)) || void 0 === _c ? void 0 : _c.getScale().domain().length,
            startAngle: this._startAngle,
            endAngle: this._endAngle
        }, commonAttrs)), this._update(attrs);
    }
    _getRelatedAxis(index) {
        if (isValid(index)) return this._option.getComponentByIndex(this.specKey, index);
    }
    _computeLayoutRadius() {
        return computeLayoutRadius((() => this._spec.layoutRadius), this.getRefLayoutRect, this.getCenter, (() => ({
            startAngle: this._startAngle,
            endAngle: this._endAngle
        })));
    }
    computeLayoutOuterRadius() {
        var _a;
        const radius = null !== (_a = this._spec.outerRadius) && void 0 !== _a ? _a : this._spec.radius, outerRadius = null != radius ? radius : this.getRefSeriesRadius().outerRadius;
        return this._computeLayoutRadius() * outerRadius;
    }
    computeLayoutInnerRadius() {
        var _a;
        const innerRadius = null !== (_a = this._spec.innerRadius) && void 0 !== _a ? _a : this.getRefSeriesRadius().innerRadius;
        return this._computeLayoutRadius() * innerRadius;
    }
    getRefSeriesRadius() {
        let outerRadius = POLAR_DEFAULT_RADIUS, innerRadius = 0;
        const chartSpec = this.getChart().getSpec();
        return eachSeries(this.getRegions(), (s => {
            const series = s;
            if (isPolarAxisSeries(series.type)) {
                const {outerRadius: seriesRadius = chartSpec.outerRadius, innerRadius: seriesInnerRadius = chartSpec.innerRadius} = series;
                isValidNumber(seriesRadius) && (outerRadius = seriesRadius), isValidNumber(seriesInnerRadius) && (innerRadius = seriesInnerRadius);
            }
        }), {
            userId: this._seriesUserId,
            specIndex: this._seriesIndex
        }), {
            outerRadius: outerRadius,
            innerRadius: innerRadius
        };
    }
    _update(attrs) {
        const {grid: gridAttrs} = attrs, axisAttrs = __rest(attrs, [ "grid" ]);
        if (this._axisMark.getProduct().encode(mergeSpec({}, this._axisStyle, axisAttrs)), 
        this._gridMark) {
            this._gridMark.getProduct().encode(mergeSpec({}, this._gridStyle, gridAttrs));
        }
    }
    invert(value) {
        var _a;
        if ("angle" === this.getOrient() && "band" === this._scale.type) {
            const range = this._scale.range(), rangeValue = range[range.length - 1] - range[0], offset = .5 === (null !== (_a = this.getSpec().bandPosition) && void 0 !== _a ? _a : this._defaultBandPosition) ? 0 : this._scale.bandwidth() / 2;
            if (range[0] < 0) {
                const transformedAngle = (value + offset + Math.abs(range[0])) % rangeValue - Math.abs(range[0]);
                return this._scale.invert(transformedAngle);
            }
            return this._scale.invert((value + offset) % rangeValue);
        }
        return this._scale.invert(value);
    }
}

PolarAxis.type = ComponentTypeEnum.polarAxis, PolarAxis.specKey = "axes";
//# sourceMappingURL=axis.js.map
