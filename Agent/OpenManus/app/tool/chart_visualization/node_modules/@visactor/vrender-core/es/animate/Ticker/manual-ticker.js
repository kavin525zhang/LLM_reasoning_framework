import { DefaultTicker } from "./default-ticker";

import { ManualTickHandler } from "./manual-ticker-handler";

export class ManualTicker extends DefaultTicker {
    set mode(m) {
        this.setupTickHandler();
    }
    get mode() {
        return this._mode;
    }
    initHandler() {
        return this.mode = "manual", null;
    }
    setupTickHandler() {
        const handler = new ManualTickHandler;
        return this._mode = "manual", this.tickerHandler && this.tickerHandler.release(), 
        this.tickerHandler = handler, !0;
    }
    tickAt(time) {
        this.tickerHandler.tick(time - Math.max(this.lastFrameTime, 0), (handler => {
            this.handleTick(handler, {
                once: !0
            });
        }));
    }
    ifCanStop() {
        return !1;
    }
}
//# sourceMappingURL=manual-ticker.js.map
