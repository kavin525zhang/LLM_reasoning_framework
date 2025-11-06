import { StateValue } from "../constant";

import { traverseGroup } from "../util";

import { isEmpty } from "@visactor/vutils";

export const dispatchHoverState = (e, container, lastHover) => {
    const target = e.target;
    return target !== lastHover && target.name && !isEmpty(target.states) ? (target.addState(StateValue.hover, !0), 
    traverseGroup(container, (node => {
        node !== target && node.name && !isEmpty(node.states) && node.addState(StateValue.hoverReverse, !0);
    })), target) : lastHover;
};

export const dispatchUnHoverState = (e, container, lastHover) => lastHover ? (traverseGroup(container, (node => {
    node.name && !isEmpty(node.states) && (node.removeState(StateValue.hoverReverse), 
    node.removeState(StateValue.hover));
})), null) : lastHover;

export const dispatchClickState = (e, container, lastSelect) => {
    const target = e.target;
    return lastSelect === target && target.hasState(StateValue.selected) ? (traverseGroup(container, (node => {
        node.name && !isEmpty(node.states) && (node.removeState(StateValue.selectedReverse), 
        node.removeState(StateValue.selected));
    })), null) : target.name && !isEmpty(target.states) ? (target.addState(StateValue.selected, !0), 
    traverseGroup(container, (node => {
        node !== target && node.name && !isEmpty(node.states) && node.addState(StateValue.selectedReverse, !0);
    })), target) : lastSelect;
};
//# sourceMappingURL=interaction.js.map
