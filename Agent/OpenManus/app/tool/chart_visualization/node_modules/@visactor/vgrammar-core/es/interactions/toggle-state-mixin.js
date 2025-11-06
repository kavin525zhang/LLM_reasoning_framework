export class ToggleStateMixin {
    updateStates(newStatedElements, prevStatedElements, state, reverseState) {
        return newStatedElements && newStatedElements.length ? (state && reverseState ? prevStatedElements && prevStatedElements.length ? (this.toggleReverseStateOfElements(newStatedElements, prevStatedElements, reverseState), 
        this.toggleStateOfElements(newStatedElements, prevStatedElements, state)) : this.addBothStateOfElements(newStatedElements, state, reverseState) : state && (prevStatedElements && prevStatedElements.length ? this.toggleStateOfElements(newStatedElements, prevStatedElements, state) : this.addStateOfElements(newStatedElements, state)), 
        newStatedElements) : null;
    }
    toggleReverseStateOfElements(newStatedElements, prevStatedElements, reverseState) {
        prevStatedElements.forEach((element => {
            reverseState && this._stateMarks[reverseState] && this._stateMarks[reverseState].includes(element.mark) && element.addState(reverseState);
        })), newStatedElements.forEach((element => {
            reverseState && this._stateMarks[reverseState] && this._stateMarks[reverseState].includes(element.mark) && element.removeState(reverseState);
        }));
    }
    toggleStateOfElements(newStatedElements, prevStatedElements, state) {
        prevStatedElements.forEach((element => {
            state && this._stateMarks[state] && this._stateMarks[state].includes(element.mark) && element.removeState(state);
        })), newStatedElements.forEach((element => {
            state && this._stateMarks[state] && this._stateMarks[state].includes(element.mark) && element.addState(state);
        }));
    }
    addBothStateOfElements(statedElements, state, reverseState) {
        this._marks.forEach((mark => {
            var _a;
            const hasReverse = reverseState && this._stateMarks[reverseState] && this._stateMarks[reverseState].includes(mark), hasState = state && this._stateMarks[state] && this._stateMarks[state].includes(mark);
            (hasReverse || hasState) && (null === (_a = mark.elements) || void 0 === _a || _a.forEach((el => {
                statedElements && statedElements.includes(el) ? hasState && el.addState(state) : hasReverse && el.addState(reverseState);
            })));
        }));
    }
    addStateOfElements(statedElements, state) {
        this._marks.forEach((mark => {
            var _a;
            const hasState = state && this._stateMarks[state] && this._stateMarks[state].includes(mark);
            hasState && (null === (_a = mark.elements) || void 0 === _a || _a.forEach((el => {
                statedElements && statedElements.includes(el) && hasState && el.addState(state);
            })));
        }));
    }
    clearAllStates(state, reverseState) {
        this._statedElements && this._statedElements.length && this._marks.forEach((mark => {
            mark && mark.elements && (reverseState && this._stateMarks[reverseState] && this._stateMarks[reverseState].includes(mark) && mark.elements.forEach((el => {
                el.removeState(reverseState);
            })), state && this._stateMarks[state] && this._stateMarks[state].includes(mark) && mark.elements.forEach((el => {
                this._statedElements.includes(el) && el.removeState(state);
            })));
        }));
    }
}
//# sourceMappingURL=toggle-state-mixin.js.map
