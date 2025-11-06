"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerAllMarks = exports.registerComponentMark = exports.registerImageMark = exports.registerRippleMark = exports.registerPyramid3dMark = exports.registerPolygonMark = exports.registerArc3dMark = exports.registerArcMark = exports.registerPathMark = exports.registerRect3dMark = exports.registerRectMark = exports.registerAreaMark = exports.registerTextMark = exports.registerRuleMark = exports.registerGroupMark = exports.registerSymbolMark = exports.registerLineMark = exports.BaseMark = exports.ImageMark = exports.RippleMark = exports.Pyramid3dMark = exports.PolygonMark = exports.ComponentMark = exports.ArcMark = exports.Arc3dMark = exports.PathMark = exports.RectMark = exports.Rect3dMark = exports.AreaMark = exports.TextMark = exports.RuleMark = exports.GroupMark = exports.SymbolMark = exports.LineMark = void 0;

const line_1 = require("./line");

Object.defineProperty(exports, "LineMark", {
    enumerable: !0,
    get: function() {
        return line_1.LineMark;
    }
}), Object.defineProperty(exports, "registerLineMark", {
    enumerable: !0,
    get: function() {
        return line_1.registerLineMark;
    }
});

const symbol_1 = require("./symbol");

Object.defineProperty(exports, "SymbolMark", {
    enumerable: !0,
    get: function() {
        return symbol_1.SymbolMark;
    }
}), Object.defineProperty(exports, "registerSymbolMark", {
    enumerable: !0,
    get: function() {
        return symbol_1.registerSymbolMark;
    }
});

const group_1 = require("./group");

Object.defineProperty(exports, "GroupMark", {
    enumerable: !0,
    get: function() {
        return group_1.GroupMark;
    }
}), Object.defineProperty(exports, "registerGroupMark", {
    enumerable: !0,
    get: function() {
        return group_1.registerGroupMark;
    }
});

const rule_1 = require("./rule");

Object.defineProperty(exports, "RuleMark", {
    enumerable: !0,
    get: function() {
        return rule_1.RuleMark;
    }
}), Object.defineProperty(exports, "registerRuleMark", {
    enumerable: !0,
    get: function() {
        return rule_1.registerRuleMark;
    }
});

const text_1 = require("./text");

Object.defineProperty(exports, "TextMark", {
    enumerable: !0,
    get: function() {
        return text_1.TextMark;
    }
}), Object.defineProperty(exports, "registerTextMark", {
    enumerable: !0,
    get: function() {
        return text_1.registerTextMark;
    }
});

const area_1 = require("./area");

Object.defineProperty(exports, "AreaMark", {
    enumerable: !0,
    get: function() {
        return area_1.AreaMark;
    }
}), Object.defineProperty(exports, "registerAreaMark", {
    enumerable: !0,
    get: function() {
        return area_1.registerAreaMark;
    }
});

const rect_1 = require("./rect");

Object.defineProperty(exports, "RectMark", {
    enumerable: !0,
    get: function() {
        return rect_1.RectMark;
    }
}), Object.defineProperty(exports, "registerRectMark", {
    enumerable: !0,
    get: function() {
        return rect_1.registerRectMark;
    }
});

const rect_3d_1 = require("./rect-3d");

Object.defineProperty(exports, "Rect3dMark", {
    enumerable: !0,
    get: function() {
        return rect_3d_1.Rect3dMark;
    }
}), Object.defineProperty(exports, "registerRect3dMark", {
    enumerable: !0,
    get: function() {
        return rect_3d_1.registerRect3dMark;
    }
});

const path_1 = require("./path");

Object.defineProperty(exports, "PathMark", {
    enumerable: !0,
    get: function() {
        return path_1.PathMark;
    }
}), Object.defineProperty(exports, "registerPathMark", {
    enumerable: !0,
    get: function() {
        return path_1.registerPathMark;
    }
});

const arc_1 = require("./arc");

Object.defineProperty(exports, "ArcMark", {
    enumerable: !0,
    get: function() {
        return arc_1.ArcMark;
    }
}), Object.defineProperty(exports, "registerArcMark", {
    enumerable: !0,
    get: function() {
        return arc_1.registerArcMark;
    }
});

const arc_3d_1 = require("./arc-3d");

Object.defineProperty(exports, "Arc3dMark", {
    enumerable: !0,
    get: function() {
        return arc_3d_1.Arc3dMark;
    }
}), Object.defineProperty(exports, "registerArc3dMark", {
    enumerable: !0,
    get: function() {
        return arc_3d_1.registerArc3dMark;
    }
});

const component_1 = require("./component");

Object.defineProperty(exports, "ComponentMark", {
    enumerable: !0,
    get: function() {
        return component_1.ComponentMark;
    }
}), Object.defineProperty(exports, "registerComponentMark", {
    enumerable: !0,
    get: function() {
        return component_1.registerComponentMark;
    }
});

const ripple_1 = require("./ripple");

Object.defineProperty(exports, "RippleMark", {
    enumerable: !0,
    get: function() {
        return ripple_1.RippleMark;
    }
}), Object.defineProperty(exports, "registerRippleMark", {
    enumerable: !0,
    get: function() {
        return ripple_1.registerRippleMark;
    }
});

const base_1 = require("./base");

Object.defineProperty(exports, "BaseMark", {
    enumerable: !0,
    get: function() {
        return base_1.BaseMark;
    }
});

const polygon_1 = require("./polygon/polygon");

Object.defineProperty(exports, "PolygonMark", {
    enumerable: !0,
    get: function() {
        return polygon_1.PolygonMark;
    }
}), Object.defineProperty(exports, "registerPolygonMark", {
    enumerable: !0,
    get: function() {
        return polygon_1.registerPolygonMark;
    }
});

const pyramid_3d_1 = require("./polygon/pyramid-3d");

Object.defineProperty(exports, "Pyramid3dMark", {
    enumerable: !0,
    get: function() {
        return pyramid_3d_1.Pyramid3dMark;
    }
}), Object.defineProperty(exports, "registerPyramid3dMark", {
    enumerable: !0,
    get: function() {
        return pyramid_3d_1.registerPyramid3dMark;
    }
});

const image_1 = require("./image");

Object.defineProperty(exports, "ImageMark", {
    enumerable: !0,
    get: function() {
        return image_1.ImageMark;
    }
}), Object.defineProperty(exports, "registerImageMark", {
    enumerable: !0,
    get: function() {
        return image_1.registerImageMark;
    }
});

const registerAllMarks = () => {
    (0, group_1.registerGroupMark)(), (0, line_1.registerLineMark)(), (0, symbol_1.registerSymbolMark)(), 
    (0, rule_1.registerRuleMark)(), (0, text_1.registerTextMark)(), (0, area_1.registerAreaMark)(), 
    (0, rect_1.registerRectMark)(), (0, path_1.registerPathMark)(), (0, arc_1.registerArcMark)(), 
    (0, polygon_1.registerPolygonMark)(), (0, image_1.registerImageMark)(), (0, ripple_1.registerRippleMark)(), 
    (0, component_1.registerComponentMark)(), (0, arc_3d_1.registerArc3dMark)(), (0, 
    rect_3d_1.registerRect3dMark)(), (0, pyramid_3d_1.registerPyramid3dMark)();
};

exports.registerAllMarks = registerAllMarks;
//# sourceMappingURL=index.js.map
