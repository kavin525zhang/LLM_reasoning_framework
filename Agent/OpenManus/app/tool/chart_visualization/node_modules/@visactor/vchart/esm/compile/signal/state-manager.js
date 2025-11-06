import { merge } from "@visactor/vutils";

import { SignalManager } from "./signal-manager";

export class StateManager extends SignalManager {
    getStateMap() {
        return this._stateMap;
    }
    _getDefaultStateMap() {
        return {};
    }
    constructor(option) {
        super(option), option.stateKeyToSignalName ? this.stateKeyToSignalName = option.stateKeyToSignalName : this.stateKeyToSignalName = () => "state_signal", 
        this.initStateMap();
    }
    initStateMap(state) {
        this._stateMap = null != state ? state : this._getDefaultStateMap();
    }
    compile(stateMap) {
        const state = null != stateMap ? stateMap : this._stateMap;
        Object.keys(state).forEach((key => {
            const name = this.stateKeyToSignalName(key), value = state[key];
            this.updateSignal(name, value);
        }));
    }
    updateState(newState, noRender) {
        if (newState && (merge(this._stateMap, newState), this.compile(newState), !noRender)) return this.getCompiler().renderNextTick();
    }
}
//# sourceMappingURL=state-manager.js.map
