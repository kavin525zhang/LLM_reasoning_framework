import Theme from "../reader/Theme";
import { BorderType } from "../type/line";
export declare function parseLine(line: any, theme: Theme, node?: {
    getColorThemeName(string: any): string;
}): BorderType;
