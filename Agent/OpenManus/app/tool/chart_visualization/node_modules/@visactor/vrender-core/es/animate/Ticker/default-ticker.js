import { EventEmitter, Logger } from "@visactor/vutils";

import { application } from "../../application";

import { STATUS } from "./type";

import { RAFTickHandler } from "./raf-tick-handler";

import { TimeOutTickHandler } from "./timeout-tick-handler";

export class DefaultTicker extends EventEmitter {
    set mode(m) {
        this._mode !== m && (this._mode = m, this.setupTickHandler());
    }
    get mode() {
        return this._mode;
    }
    constructor(timelines = []) {
        super(), this.handleTick = (handler, params) => {
            const {once: once = !1} = null != params ? params : {};
            this.ifCanStop() ? this.stop() : (this._handlerTick(), once || handler.tick(this.interval, this.handleTick));
        }, this._handlerTick = () => {
            const time = this.tickerHandler.getTime();
            let delta = 0;
            this.lastFrameTime >= 0 && (delta = time - this.lastFrameTime), this.lastFrameTime = time, 
            this.status === STATUS.RUNNING && (this.tickCounts++, this.timelines.forEach((t => {
                t.tick(delta);
            })), this.emit("tick"));
        }, this.init(), this.lastFrameTime = -1, this.tickCounts = 0, this.timelines = timelines, 
        this.autoStop = !0;
    }
    init() {
        this.interval = NaN, this.status = STATUS.INITIAL, application.global.hooks.onSetEnv.tap("default-ticker", (() => {
            this.initHandler();
        })), application.global.env && this.initHandler();
    }
    addTimeline(timeline) {
        this.timelines.push(timeline);
    }
    remTimeline(timeline) {
        this.timelines = this.timelines.filter((t => t !== timeline));
    }
    getTimelines() {
        return this.timelines;
    }
    initHandler() {
        if (this._mode) return null;
        const ticks = [ {
            mode: "raf",
            cons: RAFTickHandler
        }, {
            mode: "timeout",
            cons: TimeOutTickHandler
        } ];
        for (let i = 0; i < ticks.length; i++) if (ticks[i].cons.Avaliable()) {
            this.mode = ticks[i].mode;
            break;
        }
        return null;
    }
    setupTickHandler() {
        let handler;
        switch (this._mode) {
          case "raf":
            handler = new RAFTickHandler;
            break;

          case "timeout":
            handler = new TimeOutTickHandler;
            break;

          default:
            Logger.getInstance().warn("非法的计时器模式"), handler = new RAFTickHandler;
        }
        return !!handler.avaliable() && (this.tickerHandler && this.tickerHandler.release(), 
        this.tickerHandler = handler, !0);
    }
    setInterval(interval) {
        this.interval = interval;
    }
    getInterval() {
        return this.interval;
    }
    setFPS(fps) {
        this.setInterval(1e3 / fps);
    }
    getFPS() {
        return 1e3 / this.interval;
    }
    tick(interval) {
        this.tickerHandler.tick(interval, (handler => {
            this.handleTick(handler, {
                once: !0
            });
        }));
    }
    tickTo(t) {
        this.tickerHandler.tickTo && this.tickerHandler.tickTo(t, (handler => {
            this.handleTick(handler, {
                once: !0
            });
        }));
    }
    pause() {
        return this.status !== STATUS.INITIAL && (this.status = STATUS.PAUSE, !0);
    }
    resume() {
        return this.status !== STATUS.INITIAL && (this.status = STATUS.RUNNING, !0);
    }
    ifCanStop() {
        if (this.autoStop) {
            if (!this.timelines.length) return !0;
            if (0 === this.timelines.reduce(((a, b) => a + b.animateCount), 0)) return !0;
        }
        return !1;
    }
    start(force = !1) {
        if (this.status === STATUS.RUNNING) return !1;
        if (!this.tickerHandler) return !1;
        if (!force) {
            if (this.status === STATUS.PAUSE) return !1;
            if (!this.timelines.length) return !1;
            if (0 === this.timelines.reduce(((a, b) => a + b.animateCount), 0)) return !1;
        }
        return this.status = STATUS.RUNNING, this.tickerHandler.tick(0, this.handleTick), 
        !0;
    }
    stop() {
        this.status = STATUS.INITIAL, this.setupTickHandler(), this.lastFrameTime = -1;
    }
    release() {
        this.stop(), this.timelines = [], this.tickerHandler.release(), this.emit("afterTick");
    }
    trySyncTickStatus() {
        this.status === STATUS.RUNNING && this._handlerTick();
    }
}
//# sourceMappingURL=default-ticker.js.map
