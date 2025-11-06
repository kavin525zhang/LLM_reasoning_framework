import { GrammarMarkType } from "../graph/enums";

import { createGlyphGraphicItem } from "../graph/util/graphic";

import { Mark } from "./mark";

import { Factory } from "../core/factory";

import { GlyphElement } from "../graph/glyph-element";

export class GlyphMark extends Mark {
    constructor(view, glyphType, group) {
        super(view, GrammarMarkType.glyph, group), this.glyphType = glyphType, this.glyphMeta = Factory.getGlyph(glyphType);
    }
    configureGlyph(config) {
        return this.spec.glyphConfig = config, this.commit(), this;
    }
    getGlyphMeta() {
        return this.glyphMeta;
    }
    getGlyphConfig() {
        return this.spec.glyphConfig;
    }
    addGraphicItem(attrs, groupKey) {
        const graphicItem = createGlyphGraphicItem(this, this.glyphMeta, attrs);
        return super.addGraphicItem(attrs, groupKey, graphicItem);
    }
    createElement() {
        return new GlyphElement(this);
    }
}

GlyphMark.markType = GrammarMarkType.glyph;

export const registerGlyphMark = () => {
    Factory.registerMark(GrammarMarkType.glyph, GlyphMark);
};
//# sourceMappingURL=glyph.js.map
