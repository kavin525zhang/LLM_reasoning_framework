import { GrammarMarkType } from '../graph/enums';
import type { IGlyphMark, IGroupMark, IView, GlyphMarkSpec, IGlyphMeta } from '../types';
import { Mark } from './mark';
import { GlyphElement } from '../graph/glyph-element';
export declare class GlyphMark extends Mark implements IGlyphMark {
    static markType: GrammarMarkType;
    protected spec: GlyphMarkSpec;
    markType: GrammarMarkType.glyph;
    readonly glyphType: string;
    private glyphMeta;
    constructor(view: IView, glyphType: string, group?: IGroupMark);
    configureGlyph(config: any): this;
    getGlyphMeta(): IGlyphMeta<any, any>;
    getGlyphConfig(): any;
    addGraphicItem(attrs: any, groupKey?: string): any;
    createElement(): GlyphElement;
}
export declare const registerGlyphMark: () => void;
