import { array } from "@visactor/vutils";

import { DataView } from "@visactor/vdataset";

import { dataToDataView, updateDataViewInData } from "../../data/initialize";

import { warn } from "../../util/debug";

export class ChartData {
    get dataList() {
        return this._dataArr;
    }
    constructor(dataSet) {
        this._dataArr = [], this._dataSet = dataSet;
    }
    parseData(dataSpec) {
        this._dataArr = [];
        const list = array(dataSpec);
        for (let i = 0; i < list.length; i++) this._dataArr.push(dataToDataView(list[i], this._dataSet, this._dataArr));
    }
    updateData(dataSpec, fullUp = !1, forceMerge = !0) {
        const list = array(dataSpec);
        return (!fullUp || list.length === this._dataArr.length) && (this._dataValueForEach(list, ((_data, dv) => {
            dv.markRunning();
        })), this._dataValueForEach(list, ((data, dv) => {
            updateDataViewInData(dv, data, forceMerge);
        })), !0);
    }
    _dataValueForEach(list, callBack) {
        list.forEach(((data, i) => {
            if (data instanceof DataView) return;
            const dv = this.getSeriesData(data.id, i);
            dv && callBack(data, dv, i);
        }));
    }
    getSeriesData(id, index) {
        if (!this._dataArr.length) return null;
        if ("string" == typeof id) {
            const metchData = this._dataArr.filter((data => data.name === id));
            if (metchData[0]) return metchData[0];
            warn(`no data matches dataId ${id}!`);
        }
        if ("number" == typeof index) {
            if (this._dataArr[index]) return this._dataArr[index];
            warn(`no data matches dataIndex ${index}!`);
        }
        return this._dataArr[0];
    }
}
//# sourceMappingURL=data.js.map
