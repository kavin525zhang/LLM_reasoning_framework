import { GrammarItem } from "../grammar-item";

import { isNil } from "../../util/type";

import { GrammarType } from "../interface/compilable-item";

export class CompilableData extends GrammarItem {
    getDataView() {
        return this._data;
    }
    setDataView(d) {
        this._data = d;
    }
    getLatestData() {
        var _a;
        return null === (_a = this._data) || void 0 === _a ? void 0 : _a.latestData;
    }
    constructor(option, dataView) {
        super(option), this.grammarType = GrammarType.data, this._data = null, this._data = dataView;
    }
    release() {
        super.release(), this._data = null;
    }
    updateData(noRender) {
        const product = this.getProduct(), data = this.getLatestData();
        if (product && data && (product.values(data), !noRender)) return this.getCompiler().renderNextTick();
    }
    _compileProduct() {
        const data = this.getLatestData();
        isNil(data) || (isNil(this.getProduct()) ? this._initProduct(data) : this._product.values(data));
    }
    _initProduct(data) {
        var _a, _b;
        const view = this.getVGrammarView();
        if (!view || !data) return;
        const id = this.getProductId();
        this._product = null === (_b = null === (_a = null == view ? void 0 : view.data) || void 0 === _a ? void 0 : _a.call(view, data)) || void 0 === _b ? void 0 : _b.id(id), 
        this._compiledProductId = id;
    }
    generateProductId() {
        var _a;
        return `${null === (_a = this.getDataView()) || void 0 === _a ? void 0 : _a.name}`;
    }
    _lookupGrammar(id) {
        var _a, _b;
        return null === (_b = null === (_a = this.getCompiler().getVGrammarView()) || void 0 === _a ? void 0 : _a.getDataById) || void 0 === _b ? void 0 : _b.call(_a, id);
    }
}
//# sourceMappingURL=compilable-data.js.map
