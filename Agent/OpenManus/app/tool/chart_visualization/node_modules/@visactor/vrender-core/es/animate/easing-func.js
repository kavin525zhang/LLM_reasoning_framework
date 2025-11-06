import { CustomPath2D } from "../common/custom-path2d";

import { CurveContext } from "../common/segment";

export function generatorPathEasingFunc(path) {
    const customPath = new CustomPath2D;
    return customPath.setCtx(new CurveContext(customPath)), customPath.fromString(path, 0, 0, 1, 1), 
    x => customPath.getYAt(x);
}
//# sourceMappingURL=easing-func.js.map