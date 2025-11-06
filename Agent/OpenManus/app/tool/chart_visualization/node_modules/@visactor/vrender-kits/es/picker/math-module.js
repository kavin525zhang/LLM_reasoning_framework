import { ContainerModule, PickerService } from "@visactor/vrender-core";

import { DefaultMathPickerService } from "./math-picker-service";

import mathModule from "./contributions/math-picker/module";

import { arcMathPickModule } from "./contributions/math-picker/arc-module";

import { areaMathPickModule } from "./contributions/math-picker/area-module";

import { circleMathPickModule } from "./contributions/math-picker/circle-module";

import { glyphMathPickModule } from "./contributions/math-picker/glyph-module";

import { imageMathPickModule } from "./contributions/math-picker/image-module";

import { lineMathPickModule } from "./contributions/math-picker/line-module";

import { polygonMathPickModule } from "./contributions/math-picker/polygon-module";

import { pathMathPickModule } from "./contributions/math-picker/path-module";

import { rectMathPickModule } from "./contributions/math-picker/rect-module";

import { richTextMathPickModule } from "./contributions/math-picker/richtext-module";

import { symbolMathPickModule } from "./contributions/math-picker/symbol-module";

import { textMathPickModule } from "./contributions/math-picker/text-module";

export const mathPickerModule = new ContainerModule(((bind, unbind, isBound, rebind) => {
    isBound(DefaultMathPickerService) || bind(DefaultMathPickerService).toSelf().inSingletonScope(), 
    isBound(PickerService) ? rebind(PickerService).toService(DefaultMathPickerService) : bind(PickerService).toService(DefaultMathPickerService);
}));

export function loadMathPicker(c) {
    c.load(mathModule), c.load(mathPickerModule), c.load(arcMathPickModule), c.load(areaMathPickModule), 
    c.load(circleMathPickModule), c.load(glyphMathPickModule), c.load(imageMathPickModule), 
    c.load(lineMathPickModule), c.load(polygonMathPickModule), c.load(pathMathPickModule), 
    c.load(rectMathPickModule), c.load(richTextMathPickModule), c.load(symbolMathPickModule), 
    c.load(textMathPickModule);
}
//# sourceMappingURL=math-module.js.map