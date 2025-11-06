import { merge } from "@visactor/vutils";

import { AbstractComponent } from "../core/base";

import { Arc, Text } from "@visactor/vrender-core";

import { loadRadioComponent } from "./register";

loadRadioComponent();

export class Radio extends AbstractComponent {
    constructor(attributes, options) {
        super((null == options ? void 0 : options.skipDefault) ? attributes : merge({}, Radio.defaultAttributes, attributes)), 
        this._handlePointerUp = () => {
            this.attribute.disabled || this.attribute.checked || (this.setAttribute("checked", !0), 
            this._dispatchEvent("radio_checked", {
                eventType: "radio_checked",
                target: this
            }), this.stage.renderNextFrame());
        }, this.renderGroup(), this.onBeforeAttributeUpdate = (val, attributes, key) => {
            "interactive" in val && this.setAttribute("pickable", val.interactive), "disabled" in val && this.setAttribute("cursor", val.disable ? this.attribute.disableCursor : this.attribute.cursor);
        }, this.addEventListener("pointerup", this._handlePointerUp);
    }
    render() {
        this.removeAllChild(!0), this.renderCircle(), this.renderText(), this.layout();
    }
    renderCircle() {
        this._circle = new Arc(merge({}, this.attribute.circle));
        const isChecked = this.attribute.checked;
        isChecked && this.attribute.disabled ? this._circle.setAttributes({
            fill: this.attribute.circle.disableCheckedFill,
            stroke: this.attribute.circle.disableCheckedStroke
        }) : isChecked ? this._circle.setAttributes({
            fill: this.attribute.circle.checkedFill,
            stroke: this.attribute.circle.checkedStroke
        }) : this.attribute.disabled && this._circle.setAttributes({
            fill: this.attribute.circle.disableFill
        }), this.appendChild(this._circle);
    }
    renderText() {
        this._text = new Text(merge({}, this.attribute.text)), this.attribute.disabled && this._text.setAttribute("fill", this.attribute.text.disableFill), 
        this.appendChild(this._text);
    }
    renderGroup() {
        this.attribute.interactive || this.setAttribute("pickable", !1), this.attribute.disabled && this.setAttribute("cursor", this.attribute.disableCursor);
    }
    layout() {
        const circleHeight = 2 * (this.attribute.circle.outerRadius + this.attribute.circle.lineWidth), textHeight = this._text.AABBBounds.height(), maxHeight = Math.max(circleHeight, textHeight), circleY = maxHeight / 2 - circleHeight / 2 + this.attribute.circle.outerRadius + this.attribute.circle.lineWidth, textY = maxHeight / 2 - textHeight / 2, circleWidth = 2 * (this.attribute.circle.outerRadius + this.attribute.circle.lineWidth), circleX = this.attribute.circle.outerRadius + this.attribute.circle.lineWidth, textX = circleWidth + this.attribute.spaceBetweenTextAndIcon;
        this._circle.setAttributes({
            x: circleX,
            y: circleY
        }), this._text.setAttributes({
            x: textX,
            y: textY
        });
    }
    initAttributes(params, options) {
        params = (null == options ? void 0 : options.skipDefault) ? params : merge({}, Radio.defaultAttributes, params), 
        super.initAttributes(params), this.renderGroup(), this.render();
    }
}

Radio.defaultAttributes = {
    interactive: !0,
    disabled: !1,
    checked: !1,
    cursor: "pointer",
    disableCursor: "not-allowed",
    spaceBetweenTextAndIcon: 8,
    text: {
        text: "text",
        fontSize: 14,
        fill: "#000",
        disableFill: "rgb(201,205,212)",
        textBaseline: "top",
        pickable: !1
    },
    circle: {
        outerRadius: 7,
        innerRadius: 3,
        startAngle: 0,
        endAngle: 2 * Math.PI,
        lineWidth: 1,
        fill: "#fff",
        stroke: "rgb(229,230,235)",
        disableFill: "rgb(242,243,245)",
        checkedFill: "rgb(22, 93, 255)",
        checkedStroke: "rgb(22, 93, 255)",
        disableCheckedFill: "rgb(148, 191, 255)",
        disableCheckedStroke: "rgb(148, 191, 255)",
        pickable: !1
    }
};
//# sourceMappingURL=radio.js.map
