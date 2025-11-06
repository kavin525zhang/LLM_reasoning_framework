const labelComponentMap = {};

export const registerLabelComponent = (type, LabelClass) => {
    labelComponentMap[type] = LabelClass;
};

export const getLabelComponent = type => labelComponentMap[type];
//# sourceMappingURL=data-label-register.js.map