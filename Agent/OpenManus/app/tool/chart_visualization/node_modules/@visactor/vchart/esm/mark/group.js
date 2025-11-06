import { Factory } from "./../core/factory";

import { warn } from "../util/debug";

import { BaseMark } from "./base/base-mark";

import { registerGroupGraphic } from "@visactor/vgrammar-core";

export class GroupMark extends BaseMark {
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
        return this.isMarkExist(mark) ? (warn("Mark already exists, add mark failed."), 
        !1) : (this._marks.push(mark), !0);
    }
    removeMark(mark) {
        const index = this._marks.findIndex((m => m.id === mark.id || m.name === mark.name));
        return -1 === index ? (warn("Mark does not exists, removeMark failed."), !1) : (this._marks.splice(index, 1), 
        !0);
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

GroupMark.type = "group";

export const registerGroupMark = () => {
    registerGroupGraphic(), Factory.registerMark(GroupMark.type, GroupMark);
};
//# sourceMappingURL=group.js.map
