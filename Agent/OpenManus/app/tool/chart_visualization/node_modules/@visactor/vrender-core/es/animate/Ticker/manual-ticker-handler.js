export class ManualTickHandler {
    constructor() {
        this.time = 0;
    }
    static Avaliable() {
        return !0;
    }
    avaliable() {
        return ManualTickHandler.Avaliable();
    }
    tick(interval, cb) {
        this.time = Math.max(0, interval + this.time), cb(this, {
            once: !0
        });
    }
    tickTo(t, cb) {
        this.time = Math.max(0, t), cb(this, {
            once: !0
        });
    }
    release() {
        this.timerId > 0 && (this.timerId = -1);
    }
    getTime() {
        return this.time;
    }
}
//# sourceMappingURL=manual-ticker-handler.js.map
