"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.dispatchClickState = exports.dispatchUnHoverState = exports.dispatchHoverState = void 0;

const constant_1 = require("../constant"), util_1 = require("../util"), vutils_1 = require("@visactor/vutils"), dispatchHoverState = (e, container, lastHover) => {
    const target = e.target;
    return target !== lastHover && target.name && !(0, vutils_1.isEmpty)(target.states) ? (target.addState(constant_1.StateValue.hover, !0), 
    (0, util_1.traverseGroup)(container, (node => {
        node !== target && node.name && !(0, vutils_1.isEmpty)(node.states) && node.addState(constant_1.StateValue.hoverReverse, !0);
    })), target) : lastHover;
};

exports.dispatchHoverState = dispatchHoverState;

const dispatchUnHoverState = (e, container, lastHover) => lastHover ? ((0, util_1.traverseGroup)(container, (node => {
    node.name && !(0, vutils_1.isEmpty)(node.states) && (node.removeState(constant_1.StateValue.hoverReverse), 
    node.removeState(constant_1.StateValue.hover));
})), null) : lastHover;

exports.dispatchUnHoverState = dispatchUnHoverState;

const dispatchClickState = (e, container, lastSelect) => {
    const target = e.target;
    return lastSelect === target && target.hasState(constant_1.StateValue.selected) ? ((0, 
    util_1.traverseGroup)(container, (node => {
        node.name && !(0, vutils_1.isEmpty)(node.states) && (node.removeState(constant_1.StateValue.selectedReverse), 
        node.removeState(constant_1.StateValue.selected));
    })), null) : target.name && !(0, vutils_1.isEmpty)(target.states) ? (target.addState(constant_1.StateValue.selected, !0), 
    (0, util_1.traverseGroup)(container, (node => {
        node !== target && node.name && !(0, vutils_1.isEmpty)(node.states) && node.addState(constant_1.StateValue.selectedReverse, !0);
    })), target) : lastSelect;
};

exports.dispatchClickState = dispatchClickState;
//# sourceMappingURL=interaction.js.map
