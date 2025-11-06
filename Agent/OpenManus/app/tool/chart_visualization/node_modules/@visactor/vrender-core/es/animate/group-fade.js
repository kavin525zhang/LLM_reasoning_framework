import { ACustomAnimate } from "./animate";

export class GroupFadeIn extends ACustomAnimate {
    getEndProps() {
        return {};
    }
    onBind() {
        this.target.setTheme({
            common: {
                opacity: 0
            }
        });
    }
    onEnd() {
        this.target.setTheme({
            common: {
                opacity: 1
            }
        });
    }
    onUpdate(end, ratio, out) {
        this.target.setTheme({
            common: {
                opacity: ratio
            }
        });
    }
}

export class GroupFadeOut extends ACustomAnimate {
    getEndProps() {
        return {};
    }
    onBind() {
        this.target.setTheme({
            common: {
                opacity: 1
            }
        });
    }
    onEnd() {
        this.target.setTheme({
            common: {
                opacity: 0
            }
        });
    }
    onUpdate(end, ratio, out) {
        this.target.setTheme({
            common: {
                opacity: 1 - ratio
            }
        });
    }
}
//# sourceMappingURL=group-fade.js.map