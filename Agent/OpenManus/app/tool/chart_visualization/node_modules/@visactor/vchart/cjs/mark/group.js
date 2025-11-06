"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerGroupMark = exports.GroupMark = void 0;

const factory_1 = require("./../core/factory"), debug_1 = require("../util/debug"), base_mark_1 = require("./base/base-mark"), vgrammar_core_1 = require("@visactor/vgrammar-core");

class GroupMark extends base_mark_1.BaseMark {
    constructor() {
        super(...arguments), this.type = GroupMark.type, this._marks = [];
    }
    getMarks() {
        return this._marks;
    }
    _getDefaultStyle() {
        return Object.assign({}, super._getDefaultStyle());
    }
    isMarkExist(mark) {
        return void 0 !== this._marks.find((m => m.id === mark.id));
    }
    addMark(mark) {
        return this.isMarkExist(mark) ? ((0, debug_1.warn)("Mark already exists, add mark failed."), 
        !1) : (this._marks.push(mark), !0);
    }
    removeMark(mark) {
        const index = this._marks.findIndex((m => m.id === mark.id || m.name === mark.name));
        return -1 === index ? ((0, debug_1.warn)("Mark does not exists, removeMark failed."), 
        !1) : (this._marks.splice(index, 1), !0);
    }
    getMarkInType(type) {
        return this._marks.filter((m => m.type === type));
    }
    getMarkInId(id) {
        return this._marks.find((m => m.id === id));
    }
    getMarkInUserId(id) {
        let result;
        if (this._marks.forEach((m => {
            m.getUserId() === id && (result = m);
        })), !result) for (let i = 0; i < this._marks.length; i++) {
            const mark = this._marks[i];
            if ("group" === mark.type && (result = mark.getMarkInUserId(id)), result) break;
        }
        return result;
    }
    getMarkInName(name) {
        return this._marks.filter((m => m.name === name));
    }
    _compileProduct(option) {
        super._compileProduct(option), this._product.configure({
            zIndex: this._markConfig.zIndex
        }), (null == option ? void 0 : option.ignoreChildren) || this.getMarks().forEach((mark => {
            mark.getProduct() && mark.removeProduct(), mark.compile({
                group: this._product
            });
        }));
    }
}

exports.GroupMark = GroupMark, GroupMark.type = "group";

const registerGroupMark = () => {
    (0, vgrammar_core_1.registerGroupGraphic)(), factory_1.Factory.registerMark(GroupMark.type, GroupMark);
};

exports.registerGroupMark = registerGroupMark;
//# sourceMappingURL=group.js.map
