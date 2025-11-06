"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getComponentThemeWithDirection = exports.getComponentThemeFromGlobalTheme = void 0;

const common_1 = require("../axis/cartesian/util/common"), util_1 = require("../axis/util"), utils_1 = require("../crosshair/utils"), type_1 = require("../interface/type"), util_2 = require("../util"), vutils_extension_1 = require("@visactor/vutils-extension");

function getComponentThemeFromGlobalTheme(type, chartTheme, componentSpec, chartSpec) {
    switch (type) {
      case type_1.ComponentTypeEnum.cartesianBandAxis:
        return (0, util_1.getCartesianAxisTheme)((0, common_1.getOrient)(componentSpec, [ "z" ]), "band", chartTheme);

      case type_1.ComponentTypeEnum.cartesianLinearAxis:
        return (0, util_1.getCartesianAxisTheme)((0, common_1.getOrient)(componentSpec, [ "z" ]), "linear", chartTheme);

      case type_1.ComponentTypeEnum.cartesianLogAxis:
        return (0, util_1.getCartesianAxisTheme)((0, common_1.getOrient)(componentSpec, [ "z" ]), "log", chartTheme);

      case type_1.ComponentTypeEnum.cartesianSymlogAxis:
        return (0, util_1.getCartesianAxisTheme)((0, common_1.getOrient)(componentSpec, [ "z" ]), "symlog", chartTheme);

      case type_1.ComponentTypeEnum.cartesianAxis:
      case type_1.ComponentTypeEnum.cartesianTimeAxis:
        return (0, util_1.getCartesianAxisTheme)((0, common_1.getOrient)(componentSpec), void 0, chartTheme);

      case type_1.ComponentTypeEnum.polarBandAxis:
        return (0, util_1.getPolarAxisTheme)(componentSpec.orient, "band", chartTheme);

      case type_1.ComponentTypeEnum.polarLinearAxis:
        return (0, util_1.getPolarAxisTheme)(componentSpec.orient, "linear", chartTheme);

      case type_1.ComponentTypeEnum.polarAxis:
        return (0, util_1.getPolarAxisTheme)(componentSpec.orient, void 0, chartTheme);

      case type_1.ComponentTypeEnum.cartesianCrosshair:
        return (0, utils_1.getCartesianCrosshairTheme)(chartTheme, chartSpec);

      case type_1.ComponentTypeEnum.polarCrosshair:
        return (0, utils_1.getPolarCrosshairTheme)(chartTheme, chartSpec);

      case type_1.ComponentTypeEnum.colorLegend:
      case type_1.ComponentTypeEnum.sizeLegend:
      case type_1.ComponentTypeEnum.discreteLegend:
      case type_1.ComponentTypeEnum.dataZoom:
      case type_1.ComponentTypeEnum.scrollBar:
        return (0, exports.getComponentThemeWithDirection)(componentSpec, (0, util_2.getComponentThemeFromOption)(type, chartTheme));

      default:
        return (0, util_2.getComponentThemeFromOption)(type, chartTheme);
    }
}

exports.getComponentThemeFromGlobalTheme = getComponentThemeFromGlobalTheme;

const getComponentThemeWithDirection = (componentSpec, originalTheme) => {
    var _a;
    const orient = null !== (_a = componentSpec.orient) && void 0 !== _a ? _a : originalTheme.orient, directionTheme = originalTheme[(0, 
    common_1.getDirectionByOrient)(orient)], finalTheme = (0, vutils_extension_1.mergeSpec)({}, originalTheme, directionTheme);
    return delete finalTheme.horizontal, delete finalTheme.vertical, finalTheme;
};

exports.getComponentThemeWithDirection = getComponentThemeWithDirection;
//# sourceMappingURL=util.js.map
