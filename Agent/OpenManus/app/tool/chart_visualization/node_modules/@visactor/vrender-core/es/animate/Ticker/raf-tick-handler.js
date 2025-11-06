import { application } from "../../application";

export class RAFTickHandler {
    static Avaliable() {
        return !!application.global.getRequestAnimationFrame();
    }
    avaliable() {
        return RAFTickHandler.Avaliable();
    }
    tick(interval, cb) {
        application.global.getRequestAnimationFrame()((() => {
            this.released || cb(this);
        }));
    }
    release() {
        this.released = !0;
    }
    getTime() {
        return Date.now();
    }
}
//# sourceMappingURL=raf-tick-handler.js.map
