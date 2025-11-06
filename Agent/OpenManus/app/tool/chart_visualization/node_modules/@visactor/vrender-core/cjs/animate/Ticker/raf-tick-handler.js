"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.RAFTickHandler = void 0;

const application_1 = require("../../application");

class RAFTickHandler {
    static Avaliable() {
        return !!application_1.application.global.getRequestAnimationFrame();
    }
    avaliable() {
        return RAFTickHandler.Avaliable();
    }
    tick(interval, cb) {
        application_1.application.global.getRequestAnimationFrame()((() => {
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

exports.RAFTickHandler = RAFTickHandler;
//# sourceMappingURL=raf-tick-handler.js.map
