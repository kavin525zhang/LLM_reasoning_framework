"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerCanvasTooltipHandler = exports.CanvasTooltipHandler = void 0;

const base_1 = require("./base"), vrender_components_1 = require("@visactor/vrender-components"), vutils_1 = require("@visactor/vutils"), register_1 = require("../register"), constant_1 = require("../../../component/tooltip/constant"), attribute_1 = require("./utils/attribute");

class CanvasTooltipHandler extends base_1.BaseTooltipHandler {
    constructor() {
        super(CanvasTooltipHandler.type), this.type = constant_1.TooltipHandlerType.canvas, 
        this._attributes = null;
    }
    onAdd(service) {
        var _a;
        super.onAdd(service), this._tooltipCanvasId = null === (_a = this._chartOption.modeParams) || void 0 === _a ? void 0 : _a.tooltipCanvasId;
    }
    _initTooltipComponent(stage) {
        const layer = this._getLayer(stage);
        this._tooltipComponent = new vrender_components_1.Tooltip({
            autoCalculatePosition: !1,
            autoMeasure: !1
        }), layer.add(this._tooltipComponent);
    }
    _getLayer(stage) {
        if (this._layer) return this._layer;
        this._layer = stage.createLayer(this._tooltipCanvasId);
        const layerCanvas = this._layer.layerHandler.canvas.nativeCanvas;
        return layerCanvas && layerCanvas.style && (layerCanvas.style.touchAction = "none", 
        layerCanvas.style.pointerEvents = "none"), this._layer;
    }
    _getTooltipBoxSize(actualTooltip, changePositionOnly) {
        var _a, _b, _c;
        if (!changePositionOnly || (0, vutils_1.isNil)(this._attributes)) {
            const chartTheme = null !== (_b = null === (_a = this._chartOption) || void 0 === _a ? void 0 : _a.getTheme()) && void 0 !== _b ? _b : {};
            this._attributes = (0, attribute_1.getTooltipAttributes)(actualTooltip, this._component.getSpec(), chartTheme);
        }
        const {panel: panel} = null !== (_c = this._attributes) && void 0 !== _c ? _c : {};
        return {
            width: panel.width + panel.lineWidth,
            height: panel.height + panel.lineWidth
        };
    }
    _removeTooltip() {
        this._layer && this._layer.removeAllChild(), this._attributes = null;
    }
    _updateTooltip(visible, params) {
        this._visible = visible;
        const stage = this._compiler.getStage();
        if (!stage) return;
        if (!visible) return void (this._tooltipComponent && this._tooltipComponent.attribute.visible && (this._tooltipComponent.hideAll(), 
        this._tooltipComponent.setAttributes({
            visibleAll: !1
        })));
        this._tooltipComponent || this._initTooltipComponent(stage);
        const {activeTooltipSpec: activeTooltipSpec} = params, pos = activeTooltipSpec.position;
        params.changePositionOnly ? (0, vutils_1.isValid)(pos) && this._tooltipComponent.setAttributes(pos) : this._tooltipComponent.setAttributes(Object.assign(Object.assign({}, this._attributes), pos)), 
        this._tooltipComponent.attribute.visible || (this._tooltipComponent.showAll(), this._tooltipComponent.setAttributes({
            visibleAll: !0
        }));
    }
    isTooltipShown() {
        var _a;
        return null === (_a = this._tooltipComponent) || void 0 === _a ? void 0 : _a.attribute.visibleAll;
    }
    release() {
        var _a;
        super.release(), null === (_a = this._layer) || void 0 === _a || _a.release();
    }
}

exports.CanvasTooltipHandler = CanvasTooltipHandler, CanvasTooltipHandler.type = constant_1.TooltipHandlerType.canvas;

const registerCanvasTooltipHandler = () => {
    (0, register_1.registerComponentPlugin)(CanvasTooltipHandler);
};

exports.registerCanvasTooltipHandler = registerCanvasTooltipHandler;
//# sourceMappingURL=canvas-tooltip-handler.js.map
