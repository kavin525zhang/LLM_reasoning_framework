"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.invalidTravel = void 0;

const type_1 = require("../../util/type"), invalidTravel = (data, op) => {
    const {config: config} = op;
    if (!config) return data;
    const {invalidType: invalidType, checkField: checkField} = config();
    return "zero" !== invalidType || checkField && checkField.length && data.forEach((datum => {
        checkField.forEach((field => {
            (0, type_1.couldBeValidNumber)(datum[field]) || (datum[field] = 0);
        }));
    })), data;
};

exports.invalidTravel = invalidTravel;
//# sourceMappingURL=invalid-travel.js.map
