"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.DimensionTrigger = void 0;

const vutils_1 = require("@visactor/vutils"), interface_1 = require("../event/events/dimension/interface"), mark_set_1 = require("../mark/mark-set"), interface_2 = require("../compile/mark/interface");

class DimensionTrigger {
    get hover() {
        return this._hover;
    }
    get select() {
        return this._select;
    }
    constructor(option) {
        this._marks = new mark_set_1.MarkSet, this._markReverse = new mark_set_1.MarkSet, 
        this.onHover = params => {
            switch (params.action) {
              case "enter":
                this.interaction.getEventElement(interface_2.STATE_VALUE_ENUM.STATE_DIMENSION_HOVER).forEach((e => this.interaction.addEventElement(interface_2.STATE_VALUE_ENUM.STATE_DIMENSION_HOVER_REVERSE, e))), 
                this.interaction.clearEventElement(interface_2.STATE_VALUE_ENUM.STATE_DIMENSION_HOVER, !1);
                this.getEventElement(params).forEach((el => this.interaction.addEventElement(interface_2.STATE_VALUE_ENUM.STATE_DIMENSION_HOVER, el))), 
                this.interaction.reverseEventElement(interface_2.STATE_VALUE_ENUM.STATE_DIMENSION_HOVER);
                break;

              case "leave":
                this.interaction.clearEventElement(interface_2.STATE_VALUE_ENUM.STATE_DIMENSION_HOVER, !0), 
                params = null;
            }
        }, this._option = option, this.event = this._option.model.getOption().getChart().getEvent(), 
        this.interaction = option.interaction, this.initConfig(option.mode);
    }
    setStateKeys(fields) {}
    registerMark(mark) {
        (0, vutils_1.isEmpty)(mark.stateStyle[interface_2.STATE_VALUE_ENUM.STATE_DIMENSION_HOVER]) || this._marks.addMark(mark), 
        (0, vutils_1.isEmpty)(mark.stateStyle[interface_2.STATE_VALUE_ENUM.STATE_DIMENSION_HOVER_REVERSE]) || this._markReverse.addMark(mark);
    }
    init() {
        this.initEvent();
    }
    release() {
        this.releaseEvent();
    }
    initEvent() {
        this.event.on(interface_1.DimensionEventEnum.dimensionHover, this.onHover);
    }
    releaseEvent() {
        this.event.release();
    }
    initConfig(mode) {}
    getEventElement(params, reverse = !1) {
        const items = [];
        return params.dimensionInfo.forEach((df => {
            df.data.forEach((dd => {
                (reverse ? this._markReverse : this._marks).getMarks().filter((m => m.model === dd.series && m.getVisible())).forEach((m => {
                    const markProduct = m.getProduct();
                    if (!markProduct || !markProduct.elements) return;
                    const elements = markProduct.elements.filter((e => {
                        const datum = e.getDatum();
                        let c;
                        return c = (0, vutils_1.isArray)(datum) ? datum.every(((oneData, i) => oneData === dd.datum[i])) : dd.datum.some((dd_d => dd_d === datum)), 
                        reverse ? !c : c;
                    }));
                    items.push(...elements);
                }));
            }));
        })), items;
    }
}

exports.DimensionTrigger = DimensionTrigger;
//# sourceMappingURL=dimension-trigger.js.map
