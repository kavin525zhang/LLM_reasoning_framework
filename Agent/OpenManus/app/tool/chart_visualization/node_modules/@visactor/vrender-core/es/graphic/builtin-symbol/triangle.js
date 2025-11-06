import { TriangleUpSymbol } from "./triangle-up";

export class TriangleSymbol extends TriangleUpSymbol {
    constructor() {
        super(...arguments), this.type = "triangle";
    }
}

export default new TriangleSymbol;
//# sourceMappingURL=triangle.js.map
