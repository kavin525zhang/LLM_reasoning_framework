import { application } from "../application";

const PARALLEL_NUMBER = 10;

export class ResourceLoader {
    static GetImage(url, mark) {
        var _a;
        const data = ResourceLoader.cache.get(url);
        data ? "fail" === data.loadState ? application.global.getRequestAnimationFrame()((() => {
            mark.imageLoadFail(url);
        })) : "init" === data.loadState || "loading" === data.loadState ? null === (_a = data.waitingMark) || void 0 === _a || _a.push(mark) : mark && mark.imageLoadSuccess(url, data.data) : ResourceLoader.loadImage(url, mark);
    }
    static GetSvg(svgStr, mark) {
        var _a;
        let data = ResourceLoader.cache.get(svgStr);
        data ? "fail" === data.loadState ? application.global.getRequestAnimationFrame()((() => {
            mark.imageLoadFail(svgStr);
        })) : "init" === data.loadState || "loading" === data.loadState ? null === (_a = data.waitingMark) || void 0 === _a || _a.push(mark) : mark && mark.imageLoadSuccess(svgStr, data.data) : (data = {
            type: "image",
            loadState: "init"
        }, ResourceLoader.cache.set(svgStr, data), data.dataPromise = application.global.loadSvg(svgStr), 
        data.dataPromise ? (data.waitingMark = [ mark ], data.dataPromise.then((res => {
            var _a;
            data.loadState = (null == res ? void 0 : res.data) ? "success" : "fail", data.data = null == res ? void 0 : res.data, 
            null === (_a = data.waitingMark) || void 0 === _a || _a.map(((mark, index) => {
                (null == res ? void 0 : res.data) ? (data.loadState = "success", data.data = res.data, 
                mark.imageLoadSuccess(svgStr, res.data)) : (data.loadState = "fail", mark.imageLoadFail(svgStr));
            })), data.waitingMark && (data.waitingMark = []);
        }))) : (data.loadState = "fail", mark.imageLoadFail(svgStr)));
    }
    static GetFile(url, type) {
        let data = ResourceLoader.cache.get(url);
        return data ? "fail" === data.loadState ? Promise.reject() : "init" === data.loadState || "loading" === data.loadState ? data.dataPromise.then((data => data.data)) : Promise.resolve(data.data) : (data = {
            type: type,
            loadState: "init"
        }, ResourceLoader.cache.set(url, data), "arrayBuffer" === type ? data.dataPromise = application.global.loadArrayBuffer(url) : "blob" === type ? data.dataPromise = application.global.loadBlob(url) : "json" === type && (data.dataPromise = application.global.loadJson(url)), 
        data.dataPromise.then((data => data.data)));
    }
    static loading() {
        setTimeout((() => {
            if (!ResourceLoader.isLoading && ResourceLoader.toLoadAueue.length) {
                ResourceLoader.isLoading = !0;
                const tasks = ResourceLoader.toLoadAueue.splice(0, 10), promises = [];
                tasks.forEach((task => {
                    const {url: url, marks: marks} = task, data = {
                        type: "image",
                        loadState: "init"
                    };
                    if (ResourceLoader.cache.set(url, data), data.dataPromise = application.global.loadImage(url), 
                    data.dataPromise) {
                        data.waitingMark = marks;
                        const end = data.dataPromise.then((res => {
                            var _a;
                            data.loadState = (null == res ? void 0 : res.data) ? "success" : "fail", data.data = null == res ? void 0 : res.data, 
                            null === (_a = data.waitingMark) || void 0 === _a || _a.map(((mark, index) => {
                                (null == res ? void 0 : res.data) ? (data.loadState = "success", data.data = res.data, 
                                mark.imageLoadSuccess(url, res.data)) : (data.loadState = "fail", mark.imageLoadFail(url));
                            })), data.waitingMark && (data.waitingMark = []);
                        }));
                        promises.push(end);
                    } else data.loadState = "fail", marks.forEach((mark => mark.imageLoadFail(url)));
                })), Promise.all(promises).then((() => {
                    ResourceLoader.isLoading = !1, this.onLoadSuccessCb.forEach((cb => cb())), ResourceLoader.loading();
                })).catch((error => {
                    console.error(error), ResourceLoader.isLoading = !1, this.onLoadSuccessCb.forEach((cb => cb())), 
                    ResourceLoader.loading();
                }));
            }
        }), 0);
    }
    static loadImage(url, mark) {
        const index = getIndex(url, ResourceLoader.toLoadAueue);
        if (-1 !== index) return ResourceLoader.toLoadAueue[index].marks.push(mark), void ResourceLoader.loading();
        ResourceLoader.toLoadAueue.push({
            url: url,
            marks: [ mark ]
        }), ResourceLoader.loading();
    }
    static improveImageLoading(url) {
        const index = getIndex(url, ResourceLoader.toLoadAueue);
        if (-1 !== index) {
            const elememt = ResourceLoader.toLoadAueue.splice(index, 1);
            ResourceLoader.toLoadAueue.unshift(elememt[0]);
        }
    }
    static onLoadSuccess(cb) {
        this.onLoadSuccessCb.push(cb);
    }
}

function getIndex(url, arr) {
    for (let i = 0; i < arr.length; i++) if (arr[i].url === url) return i;
    return -1;
}

ResourceLoader.cache = new Map, ResourceLoader.isLoading = !1, ResourceLoader.toLoadAueue = [], 
ResourceLoader.onLoadSuccessCb = [];
//# sourceMappingURL=loader.js.map
