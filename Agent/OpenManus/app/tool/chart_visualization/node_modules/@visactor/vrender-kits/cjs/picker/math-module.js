"use strict";

var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.loadMathPicker = exports.mathPickerModule = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), math_picker_service_1 = require("./math-picker-service"), module_1 = __importDefault(require("./contributions/math-picker/module")), arc_module_1 = require("./contributions/math-picker/arc-module"), area_module_1 = require("./contributions/math-picker/area-module"), circle_module_1 = require("./contributions/math-picker/circle-module"), glyph_module_1 = require("./contributions/math-picker/glyph-module"), image_module_1 = require("./contributions/math-picker/image-module"), line_module_1 = require("./contributions/math-picker/line-module"), polygon_module_1 = require("./contributions/math-picker/polygon-module"), path_module_1 = require("./contributions/math-picker/path-module"), rect_module_1 = require("./contributions/math-picker/rect-module"), richtext_module_1 = require("./contributions/math-picker/richtext-module"), symbol_module_1 = require("./contributions/math-picker/symbol-module"), text_module_1 = require("./contributions/math-picker/text-module");

function loadMathPicker(c) {
    c.load(module_1.default), c.load(exports.mathPickerModule), c.load(arc_module_1.arcMathPickModule), 
    c.load(area_module_1.areaMathPickModule), c.load(circle_module_1.circleMathPickModule), 
    c.load(glyph_module_1.glyphMathPickModule), c.load(image_module_1.imageMathPickModule), 
    c.load(line_module_1.lineMathPickModule), c.load(polygon_module_1.polygonMathPickModule), 
    c.load(path_module_1.pathMathPickModule), c.load(rect_module_1.rectMathPickModule), 
    c.load(richtext_module_1.richTextMathPickModule), c.load(symbol_module_1.symbolMathPickModule), 
    c.load(text_module_1.textMathPickModule);
}

exports.mathPickerModule = new vrender_core_1.ContainerModule(((bind, unbind, isBound, rebind) => {
    isBound(math_picker_service_1.DefaultMathPickerService) || bind(math_picker_service_1.DefaultMathPickerService).toSelf().inSingletonScope(), 
    isBound(vrender_core_1.PickerService) ? rebind(vrender_core_1.PickerService).toService(math_picker_service_1.DefaultMathPickerService) : bind(vrender_core_1.PickerService).toService(math_picker_service_1.DefaultMathPickerService);
})), exports.loadMathPicker = loadMathPicker;
//# sourceMappingURL=math-module.js.map