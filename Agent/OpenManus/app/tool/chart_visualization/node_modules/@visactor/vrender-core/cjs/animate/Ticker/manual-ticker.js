"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ManualTicker = void 0;

const default_ticker_1 = require("./default-ticker"), manual_ticker_handler_1 = require("./manual-ticker-handler");

class ManualTicker extends default_ticker_1.DefaultTicker {
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
        const handler = new manual_ticker_handler_1.ManualTickHandler;
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

exports.ManualTicker = ManualTicker;
//# sourceMappingURL=manual-ticker.js.map
