export class TimeOutTickHandler {
    static Avaliable() {
        return !0;
    }
    avaliable() {
        return TimeOutTickHandler.Avaliable();
    }
    tick(interval, cb) {
        this.timerId = setTimeout((() => {
            cb(this);
        }), interval);
    }
    release() {
        this.timerId > 0 && (clearTimeout(this.timerId), this.timerId = -1);
    }
    getTime() {
        return Date.now();
    }
}
//# sourceMappingURL=timeout-tick-handler.js.map
