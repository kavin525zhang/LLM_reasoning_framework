export const POLAR_START_ANGLE = -.5 * Math.PI;

export const POLAR_END_ANGLE = 1.5 * Math.PI;

export const DEFAULT_TEXT_FONT_FAMILY = "PingFang SC,Helvetica Neue,Microsoft Yahei,system-ui,-apple-system,segoe ui,Roboto,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol";

export const DEFAULT_TEXT_FONT_SIZE = 14;

export var StateValue;

!function(StateValue) {
    StateValue.selected = "selected", StateValue.selectedReverse = "selected_reverse", 
    StateValue.hover = "hover", StateValue.hoverReverse = "hover_reverse";
}(StateValue || (StateValue = {}));

export const DEFAULT_STATES = {
    [StateValue.selectedReverse]: {},
    [StateValue.selected]: {},
    [StateValue.hover]: {},
    [StateValue.hoverReverse]: {}
};

export const DEFAULT_HTML_TEXT_SPEC = {
    container: "",
    width: 30,
    height: 30,
    style: {}
};

export const SCROLLBAR_START_EVENT = "scrollDown";

export const SCROLLBAR_EVENT = "scrollDrag";

export const SCROLLBAR_END_EVENT = "scrollUp";