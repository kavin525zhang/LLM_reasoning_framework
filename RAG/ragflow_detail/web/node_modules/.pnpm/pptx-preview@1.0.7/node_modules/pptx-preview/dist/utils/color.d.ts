import PPTX from '../reader/PPTX';
import Theme from "../reader/Theme";
import { BackgroundImageType, ColorType, GradFillType } from "../type/color";
interface SolidFill {
    'a:srgbClr'?: {
        attrs: {
            val: string;
        };
        'a:alpha'?: {
            attrs: {
                val: string;
            };
        };
    };
    'a:schemeClr'?: {
        attrs: {
            val: string;
        };
        'a:alpha'?: {
            attrs: {
                val: string;
            };
        };
    };
}
export declare function getSolidFillColor(solidFill: SolidFill, theme: Theme, node?: {
    getColorThemeName(string: any): string;
}): ColorType;
export declare function getBlipFill(blipFill: any, pptx: PPTX, ctx: any): BackgroundImageType;
export declare function getGradFillColor(gradFill: any, theme: Theme, node?: {
    getColorThemeName(string: any): string;
}): GradFillType;
export declare function getColorName2Hex(name: string): string;
export declare function getRenderColor(colorConfig: ColorType, options?: {
    light?: number;
    dark?: number;
}): string;
export {};
