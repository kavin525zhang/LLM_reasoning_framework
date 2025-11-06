"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ChartData = void 0;

const vutils_1 = require("@visactor/vutils"), vdataset_1 = require("@visactor/vdataset"), initialize_1 = require("../../data/initialize"), debug_1 = require("../../util/debug");

class ChartData {
    get dataList() {
        return this._dataArr;
    }
    constructor(dataSet) {
        this._dataArr = [], this._dataSet = dataSet;
    }
    parseData(dataSpec) {
        this._dataArr = [];
        const list = (0, vutils_1.array)(dataSpec);
        for (let i = 0; i < list.length; i++) this._dataArr.push((0, initialize_1.dataToDataView)(list[i], this._dataSet, this._dataArr));
    }
    updateData(dataSpec, fullUp = !1, forceMerge = !0) {
        const list = (0, vutils_1.array)(dataSpec);
        return (!fullUp || list.length === this._dataArr.length) && (this._dataValueForEach(list, ((_data, dv) => {
            dv.markRunning();
        })), this._dataValueForEach(list, ((data, dv) => {
            (0, initialize_1.updateDataViewInData)(dv, data, forceMerge);
        })), !0);
    }
    _dataValueForEach(list, callBack) {
        list.forEach(((data, i) => {
            if (data instanceof vdataset_1.DataView) return;
            const dv = this.getSeriesData(data.id, i);
            dv && callBack(data, dv, i);
        }));
    }
    getSeriesData(id, index) {
        if (!this._dataArr.length) return null;
        if ("string" == typeof id) {
            const metchData = this._dataArr.filter((data => data.name === id));
            if (metchData[0]) return metchData[0];
            (0, debug_1.warn)(`no data matches dataId ${id}!`);
        }
        if ("number" == typeof index) {
            if (this._dataArr[index]) return this._dataArr[index];
            (0, debug_1.warn)(`no data matches dataIndex ${index}!`);
        }
        return this._dataArr[0];
    }
}

exports.ChartData = ChartData;
//# sourceMappingURL=data.js.map
