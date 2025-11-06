"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Marker = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), base_1 = require("../core/base"), interaction_1 = require("../util/interaction"), vutils_1 = require("@visactor/vutils");

class Marker extends base_1.AbstractComponent {
    constructor() {
        super(...arguments), this.name = "marker", this._onHover = e => {
            this._lastHover = (0, interaction_1.dispatchHoverState)(e, this._container, this._lastHover);
        }, this._onUnHover = e => {
            this._lastHover = (0, interaction_1.dispatchUnHoverState)(e, this._container, this._lastHover);
        }, this._onClick = e => {
            this._lastSelect = (0, interaction_1.dispatchClickState)(e, this._container, this._lastSelect);
        };
    }
    transAnimationConfig() {
        var _a, _b, _c;
        if (!1 !== this.attribute.animation) {
            const animation = (0, vutils_1.isObject)(this.attribute.animation) ? this.attribute.animation : {};
            this._animationConfig = {
                enter: (0, vutils_1.merge)({}, this.defaultUpdateAnimation, animation, null !== (_a = this.attribute.animationEnter) && void 0 !== _a ? _a : {}),
                exit: (0, vutils_1.merge)({}, this.defaultExitAnimation, animation, null !== (_b = this.attribute.animationExit) && void 0 !== _b ? _b : {}),
                update: (0, vutils_1.merge)({}, this.defaultUpdateAnimation, animation, null !== (_c = this.attribute.animationUpdate) && void 0 !== _c ? _c : {})
            };
        }
    }
    setAttribute(key, value, forceUpdateTag) {
        super.setAttribute(key, value, forceUpdateTag), "visible" === key && this.render();
    }
    _bindEvent() {
        var _a, _b, _c;
        if (!this.attribute.interactive) return;
        const {hover: hover, select: select} = this.attribute;
        hover && (null === (_a = this._container) || void 0 === _a || _a.addEventListener("pointermove", this._onHover), 
        null === (_b = this._container) || void 0 === _b || _b.addEventListener("pointerout", this._onUnHover)), 
        select && (null === (_c = this._container) || void 0 === _c || _c.addEventListener("pointerdown", this._onClick));
    }
    _releaseEvent() {
        var _a, _b, _c;
        null === (_a = this._container) || void 0 === _a || _a.removeEventListener("pointermove", this._onHover), 
        null === (_b = this._container) || void 0 === _b || _b.removeEventListener("pointerout", this._onUnHover), 
        null === (_c = this._container) || void 0 === _c || _c.removeEventListener("pointerdown", this._onClick);
    }
    _initContainer() {
        var _a, _b;
        const {limitRect: limitRect = {}, clipInRange: clipInRange} = this.attribute;
        let group;
        if (clipInRange) {
            const groupClip = vrender_core_1.graphicCreator.group(Object.assign(Object.assign({}, limitRect), {
                clip: !0,
                pickable: !1
            }));
            group = vrender_core_1.graphicCreator.group({
                x: -(null !== (_a = limitRect.x) && void 0 !== _a ? _a : 0),
                y: -(null !== (_b = limitRect.y) && void 0 !== _b ? _b : 0),
                pickable: !1
            }), groupClip.add(group), this._containerClip = groupClip, this.add(groupClip);
        } else group = vrender_core_1.graphicCreator.group({
            x: 0,
            y: 0,
            pickable: !1
        }), this.add(group);
        group.name = "marker-container", this._container = group;
    }
    _updateContainer() {
        var _a, _b;
        const {limitRect: limitRect = {}, clipInRange: clipInRange} = this.attribute;
        this._containerClip && this._containerClip.setAttributes(Object.assign({}, limitRect)), 
        this._container.setAttributes({
            x: clipInRange ? -(null !== (_a = limitRect.x) && void 0 !== _a ? _a : 0) : 0,
            y: clipInRange ? -(null !== (_b = limitRect.y) && void 0 !== _b ? _b : 0) : 0
        });
    }
    render() {
        var _a;
        this.transAnimationConfig(), this.setAttribute("pickable", !1);
        const markerVisible = null === (_a = this.attribute.visible) || void 0 === _a || _a;
        !1 === this.attribute.interactive && this.setAttribute("childrenPickable", !1), 
        markerVisible && this.isValidPoints() ? this._container ? (this._updateContainer(), 
        this.updateMarker(), this.markerAnimate("update")) : (this._initContainer(), this.initMarker(this._container), 
        this.markerAnimate("enter")) : (this.markerAnimate("exit"), this._container = null, 
        this.removeAllChild(!0)), this._releaseEvent(), this._bindEvent();
    }
    release() {
        this.markerAnimate("exit"), super.release(), this._releaseEvent(), this._container = null;
    }
}

exports.Marker = Marker;
//# sourceMappingURL=base.js.map
