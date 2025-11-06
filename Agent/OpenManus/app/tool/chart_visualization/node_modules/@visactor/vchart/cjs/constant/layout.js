"use strict";

var LayoutZIndex, LayoutLevel;

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.LayoutLevel = exports.LayoutZIndex = exports.DEFAULT_LAYOUT_RECT_LEVEL_MIN = exports.DEFAULT_LAYOUT_RECT_LEVEL = exports.USER_LAYOUT_RECT_LEVEL = void 0, 
exports.USER_LAYOUT_RECT_LEVEL = 9, exports.DEFAULT_LAYOUT_RECT_LEVEL = 0, exports.DEFAULT_LAYOUT_RECT_LEVEL_MIN = -1, 
function(LayoutZIndex) {
    LayoutZIndex[LayoutZIndex.SeriesGroup = 0] = "SeriesGroup", LayoutZIndex[LayoutZIndex.Axis_Grid = 50] = "Axis_Grid", 
    LayoutZIndex[LayoutZIndex.CrossHair_Grid = 100] = "CrossHair_Grid", LayoutZIndex[LayoutZIndex.Region = 450] = "Region", 
    LayoutZIndex[LayoutZIndex.Mark = 300] = "Mark", LayoutZIndex[LayoutZIndex.Node = 400] = "Node", 
    LayoutZIndex[LayoutZIndex.Axis = 100] = "Axis", LayoutZIndex[LayoutZIndex.MarkLine = 500] = "MarkLine", 
    LayoutZIndex[LayoutZIndex.MarkArea = 100] = "MarkArea", LayoutZIndex[LayoutZIndex.MarkPoint = 500] = "MarkPoint", 
    LayoutZIndex[LayoutZIndex.DataZoom = 500] = "DataZoom", LayoutZIndex[LayoutZIndex.ScrollBar = 500] = "ScrollBar", 
    LayoutZIndex[LayoutZIndex.Player = 500] = "Player", LayoutZIndex[LayoutZIndex.Legend = 500] = "Legend", 
    LayoutZIndex[LayoutZIndex.CrossHair = 500] = "CrossHair", LayoutZIndex[LayoutZIndex.Indicator = 500] = "Indicator", 
    LayoutZIndex[LayoutZIndex.Title = 500] = "Title", LayoutZIndex[LayoutZIndex.Label = 500] = "Label", 
    LayoutZIndex[LayoutZIndex.Brush = 500] = "Brush", LayoutZIndex[LayoutZIndex.CustomMark = 500] = "CustomMark", 
    LayoutZIndex[LayoutZIndex.Interaction = 700] = "Interaction";
}(LayoutZIndex = exports.LayoutZIndex || (exports.LayoutZIndex = {})), function(LayoutLevel) {
    LayoutLevel[LayoutLevel.Indicator = 10] = "Indicator", LayoutLevel[LayoutLevel.Region = 20] = "Region", 
    LayoutLevel[LayoutLevel.Axis = 30] = "Axis", LayoutLevel[LayoutLevel.DataZoom = 40] = "DataZoom", 
    LayoutLevel[LayoutLevel.Player = 40] = "Player", LayoutLevel[LayoutLevel.ScrollBar = 40] = "ScrollBar", 
    LayoutLevel[LayoutLevel.Legend = 50] = "Legend", LayoutLevel[LayoutLevel.Title = 70] = "Title", 
    LayoutLevel[LayoutLevel.CustomMark = 70] = "CustomMark";
}(LayoutLevel = exports.LayoutLevel || (exports.LayoutLevel = {}));
//# sourceMappingURL=layout.js.map