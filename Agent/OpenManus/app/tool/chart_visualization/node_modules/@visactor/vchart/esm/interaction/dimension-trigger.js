import { isEmpty, isArray } from "@visactor/vutils";

import { DimensionEventEnum } from "../event/events/dimension/interface";

import { MarkSet } from "../mark/mark-set";

import { STATE_VALUE_ENUM } from "../compile/mark/interface";

export class DimensionTrigger {
    get hover() {
        return this._hover;
    }
    get select() {
        return this._select;
    }
    constructor(option) {
        this._marks = new MarkSet, this._markReverse = new MarkSet, this.onHover = params => {
            switch (params.action) {
              case "enter":
                this.interaction.getEventElement(STATE_VALUE_ENUM.STATE_DIMENSION_HOVER).forEach((e => this.interaction.addEventElement(STATE_VALUE_ENUM.STATE_DIMENSION_HOVER_REVERSE, e))), 
                this.interaction.clearEventElement(STATE_VALUE_ENUM.STATE_DIMENSION_HOVER, !1);
                this.getEventElement(params).forEach((el => this.interaction.addEventElement(STATE_VALUE_ENUM.STATE_DIMENSION_HOVER, el))), 
                this.interaction.reverseEventElement(STATE_VALUE_ENUM.STATE_DIMENSION_HOVER);
                break;

              case "leave":
                this.interaction.clearEventElement(STATE_VALUE_ENUM.STATE_DIMENSION_HOVER, !0), 
                params = null;
            }
        }, this._option = option, this.event = this._option.model.getOption().getChart().getEvent(), 
        this.interaction = option.interaction, this.initConfig(option.mode);
    }
    setStateKeys(fields) {}
    registerMark(mark) {
        isEmpty(mark.stateStyle[STATE_VALUE_ENUM.STATE_DIMENSION_HOVER]) || this._marks.addMark(mark), 
        isEmpty(mark.stateStyle[STATE_VALUE_ENUM.STATE_DIMENSION_HOVER_REVERSE]) || this._markReverse.addMark(mark);
    }
    init() {
        this.initEvent();
    }
    release() {
        this.releaseEvent();
    }
    initEvent() {
        this.event.on(DimensionEventEnum.dimensionHover, this.onHover);
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
                        return c = isArray(datum) ? datum.every(((oneData, i) => oneData === dd.datum[i])) : dd.datum.some((dd_d => dd_d === datum)), 
                        reverse ? !c : c;
                    }));
                    items.push(...elements);
                }));
            }));
        })), items;
    }
}
//# sourceMappingURL=dimension-trigger.js.map
