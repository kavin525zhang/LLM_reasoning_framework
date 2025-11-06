import { couldBeValidNumber } from "../../util/type";

export const invalidTravel = (data, op) => {
    const {config: config} = op;
    if (!config) return data;
    const {invalidType: invalidType, checkField: checkField} = config();
    return "zero" !== invalidType || checkField && checkField.length && data.forEach((datum => {
        checkField.forEach((field => {
            couldBeValidNumber(datum[field]) || (datum[field] = 0);
        }));
    })), data;
};
//# sourceMappingURL=invalid-travel.js.map
