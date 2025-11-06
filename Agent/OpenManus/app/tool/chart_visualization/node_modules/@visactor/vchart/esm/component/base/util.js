import { getDirectionByOrient, getOrient } from "../axis/cartesian/util/common";

import { getCartesianAxisTheme, getPolarAxisTheme } from "../axis/util";

import { getCartesianCrosshairTheme, getPolarCrosshairTheme } from "../crosshair/utils";

import { ComponentTypeEnum } from "../interface/type";

import { getComponentThemeFromOption } from "../util";

import { mergeSpec } from "@visactor/vutils-extension";

export function getComponentThemeFromGlobalTheme(type, chartTheme, componentSpec, chartSpec) {
    switch (type) {
      case ComponentTypeEnum.cartesianBandAxis:
        return getCartesianAxisTheme(getOrient(componentSpec, [ "z" ]), "band", chartTheme);

      case ComponentTypeEnum.cartesianLinearAxis:
        return getCartesianAxisTheme(getOrient(componentSpec, [ "z" ]), "linear", chartTheme);

      case ComponentTypeEnum.cartesianLogAxis:
        return getCartesianAxisTheme(getOrient(componentSpec, [ "z" ]), "log", chartTheme);

      case ComponentTypeEnum.cartesianSymlogAxis:
        return getCartesianAxisTheme(getOrient(componentSpec, [ "z" ]), "symlog", chartTheme);

      case ComponentTypeEnum.cartesianAxis:
      case ComponentTypeEnum.cartesianTimeAxis:
        return getCartesianAxisTheme(getOrient(componentSpec), void 0, chartTheme);

      case ComponentTypeEnum.polarBandAxis:
        return getPolarAxisTheme(componentSpec.orient, "band", chartTheme);

      case ComponentTypeEnum.polarLinearAxis:
        return getPolarAxisTheme(componentSpec.orient, "linear", chartTheme);

      case ComponentTypeEnum.polarAxis:
        return getPolarAxisTheme(componentSpec.orient, void 0, chartTheme);

      case ComponentTypeEnum.cartesianCrosshair:
        return getCartesianCrosshairTheme(chartTheme, chartSpec);

      case ComponentTypeEnum.polarCrosshair:
        return getPolarCrosshairTheme(chartTheme, chartSpec);

      case ComponentTypeEnum.colorLegend:
      case ComponentTypeEnum.sizeLegend:
      case ComponentTypeEnum.discreteLegend:
      case ComponentTypeEnum.dataZoom:
      case ComponentTypeEnum.scrollBar:
        return getComponentThemeWithDirection(componentSpec, getComponentThemeFromOption(type, chartTheme));

      default:
        return getComponentThemeFromOption(type, chartTheme);
    }
}

export const getComponentThemeWithDirection = (componentSpec, originalTheme) => {
    var _a;
    const orient = null !== (_a = componentSpec.orient) && void 0 !== _a ? _a : originalTheme.orient, directionTheme = originalTheme[getDirectionByOrient(orient)], finalTheme = mergeSpec({}, originalTheme, directionTheme);
    return delete finalTheme.horizontal, delete finalTheme.vertical, finalTheme;
};
//# sourceMappingURL=util.js.map
