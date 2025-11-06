"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerFormatPlugin = exports.FormatterPlugin = void 0;

const vutils_1 = require("@visactor/vutils"), base_plugin_1 = require("../../base/base-plugin"), factory_1 = require("../../../core/factory"), register_1 = require("../register"), bracketReg = /\{([^}]+)\}/, bracketGReg = /\{([^}]+)\}/g, semicolonReg = /:/;

class FormatterPlugin extends base_plugin_1.BasePlugin {
    constructor() {
        super(FormatterPlugin.type), this.type = "formatterPlugin", this._timeModeFormat = {
            utc: vutils_1.TimeUtil.getInstance().timeUTCFormat,
            local: vutils_1.TimeUtil.getInstance().timeFormat
        }, this._formatter = this._format, this._timeFormatter = this._timeModeFormat.local, 
        this._numericFormatter = vutils_1.NumberUtil.getInstance().format, this._numericSpecifier = vutils_1.NumberUtil.getInstance().formatter, 
        this._numericFormatterCache = new Map, this._isNumericFormatterCache = new Map;
    }
    onInit(service, chartSpec) {
        var _a;
        const {globalInstance: globalInstance} = service;
        if (!globalInstance) return;
        this._spec = null !== (_a = null == chartSpec ? void 0 : chartSpec[FormatterPlugin.specKey]) && void 0 !== _a ? _a : {};
        const {timeMode: timeMode, customFormatter: customFormatter, numericFormatter: numericFormatter, timeFormatter: timeFormatter} = this._spec;
        (0, vutils_1.isFunction)(customFormatter) ? this._formatter = customFormatter : (this._formatter = this._format.bind(this), 
        (0, vutils_1.isFunction)(timeFormatter) ? this._timeFormatter = timeFormatter : timeMode && this._timeModeFormat[timeMode] && (this._timeFormatter = this._timeModeFormat[timeMode]), 
        numericFormatter && (this._numericFormatter = numericFormatter, this._numericSpecifier = null, 
        this._numericFormatterCache = null)), factory_1.Factory.registerFormatter(this._formatter);
    }
    _format(text, datum, formatter) {
        return (0, vutils_1.isArray)(text) ? text.map(((t, i) => {
            const f = (0, vutils_1.isArray)(formatter) ? formatter[i] : formatter;
            return f ? this._formatSingleLine(t, datum, f) : t;
        })) : (0, vutils_1.isArray)(formatter) ? formatter.map((f => this._formatSingleLine(text, datum, f))) : this._formatSingleLine(text, datum, formatter);
    }
    _formatSingleLine(text, datum, formatter) {
        let isTemplate;
        if (this._isNumericFormatterCache && (this._isNumericFormatterCache.get(formatter) ? isTemplate = this._isNumericFormatterCache.get(formatter) : (isTemplate = bracketReg.test(formatter), 
        this._isNumericFormatterCache.set(formatter, isTemplate))), isTemplate) {
            return formatter.replace(bracketGReg, ((match, key) => {
                if (!semicolonReg.test(key)) {
                    const value = datum[key.trim()];
                    return void 0 !== value ? value : match;
                }
                const parts = key.split(":"), value = datum[parts.shift()], valueFormatter = parts.join(":");
                return this._formatSingleText(value, valueFormatter);
            }));
        }
        return this._formatSingleText(text, formatter);
    }
    _formatSingleText(text, formatter) {
        if (vutils_1.numberSpecifierReg.test(formatter) && this._numericFormatter) {
            let numericFormat;
            return this._numericFormatterCache && this._numericSpecifier ? (this._numericFormatterCache.get(formatter) ? numericFormat = this._numericFormatterCache.get(formatter) : (numericFormat = this._numericSpecifier(formatter), 
            this._numericFormatterCache.set(formatter, numericFormat)), numericFormat(Number(text))) : this._numericFormatter(formatter, Number(text));
        }
        return formatter.includes("%") && this._timeFormatter ? this._timeFormatter(formatter, text) : text;
    }
    release() {
        super.release(), this._format = null, this._timeFormatter = null, this._numericFormatter = null, 
        this._numericSpecifier = null, this._numericFormatterCache = null, this._isNumericFormatterCache = null;
    }
}

exports.FormatterPlugin = FormatterPlugin, FormatterPlugin.pluginType = "chart", 
FormatterPlugin.specKey = "formatter", FormatterPlugin.type = "formatterPlugin";

const registerFormatPlugin = () => {
    (0, register_1.registerChartPlugin)(FormatterPlugin);
};

exports.registerFormatPlugin = registerFormatPlugin;
//# sourceMappingURL=formatter.js.map
