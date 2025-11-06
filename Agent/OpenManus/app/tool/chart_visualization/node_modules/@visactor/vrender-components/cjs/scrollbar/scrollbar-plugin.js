"use strict";

var ScrollBarPlugin_1, __decorate = this && this.__decorate || function(decorators, target, key, desc) {
    var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ScrollBarPlugin = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), scrollbar_1 = require("./scrollbar"), vutils_1 = require("@visactor/vutils"), constant_1 = require("../constant");

let ScrollBarPlugin = ScrollBarPlugin_1 = class {
    constructor() {
        this.name = "scrollbar", this.activeEvent = "onRegister", this._uid = vrender_core_1.Generator.GenAutoIncrementId(), 
        this.key = this.name + this._uid, this.scroll = e => {
            var _a, _b;
            const graphic = e.target, data = this.getScrollContainer(graphic);
            if (!data && !this.scrollContainer) return;
            if (!data && this.scrollContainer) {
                if (!this.scrollContainer.g.stage || this.scrollContainer.g.stage !== graphic.stage) return;
                const newScrollContainer = this.formatScrollContainer(this.scrollContainer.g);
                if (!newScrollContainer) return void this.clearScrollbar(this.scrollContainer.g, "all");
                this.scrollContainer.showH && !newScrollContainer.showH && this.clearScrollbar(this.scrollContainer.g, "horizontal"), 
                this.scrollContainer.showV && !newScrollContainer.showV && this.clearScrollbar(this.scrollContainer.g, "vertical"), 
                this.scrollContainer = newScrollContainer;
            } else data && this.scrollContainer && data.g !== this.scrollContainer.g && this.clearScrollbar(this.scrollContainer.g, "all");
            if (this.scrollContainer = null != data ? data : this.scrollContainer, !data) return;
            const scrollContainer = data.g;
            if (!scrollContainer) return;
            const {width: width, height: height, scrollX: scrollX = 0, scrollY: scrollY = 0} = scrollContainer.attribute;
            let newScrollX = scrollX, newScrollY = scrollY, {showH: showH, showV: showV} = data;
            this.scrollContainerBounds = (new vutils_1.Bounds).set(0, 0, scrollContainer.attribute.width, scrollContainer.attribute.height), 
            showH && showH && ((0, vutils_1.abs)(e.deltaX) > (0, vutils_1.abs)(e.deltaY) ? (showH = showH && !0, 
            showV = showV && !1) : (showH = showH && !1, showV = showV && !0));
            const scrollWidth = this.childrenBounds.width(), scrollHeight = this.childrenBounds.height();
            showH && (newScrollX = scrollX - (null !== (_a = e.deltaX) && void 0 !== _a ? _a : 0), 
            newScrollX > 0 ? newScrollX = 0 : newScrollX < width - scrollWidth && (newScrollX = width - scrollWidth)), 
            showV && (newScrollY = scrollY - (null !== (_b = e.deltaY) && void 0 !== _b ? _b : 0), 
            newScrollY > 0 ? newScrollY = 0 : newScrollY < height - scrollHeight && (newScrollY = height - scrollHeight)), 
            scrollContainer.setAttributes({
                scrollX: newScrollX,
                scrollY: newScrollY
            }), this.addOrUpdateScroll(showH, showV, scrollContainer.parent, scrollContainer);
        }, this.handleScrollBarChange = params => {
            if (!(this.scrollContainer && this.scrollContainerBounds && this.childrenBounds && params && params.target && params.detail && params.detail.value)) return;
            const scrollbar = params.target, newRange = params.detail.value;
            if ("horizontal" === scrollbar.attribute.direction) {
                const scrollWidth = this.childrenBounds.width();
                this.scrollContainer.g.setAttributes({
                    scrollX: -newRange[0] * scrollWidth
                });
            } else {
                const scrollHeight = this.childrenBounds.height();
                this.scrollContainer.g.setAttributes({
                    scrollY: -newRange[0] * scrollHeight
                });
            }
        };
    }
    activate(context) {
        this.pluginService = context;
        const {stage: stage} = this.pluginService;
        this.childrenBounds = new vutils_1.AABBBounds, stage.addEventListener("wheel", this.scroll), 
        this.params = ScrollBarPlugin_1.defaultParams;
    }
    initEventOfScrollbar(scrollContainer, scrollbar, isHorozntal) {
        scrollContainer.addEventListener("pointerover", (() => {
            scrollbar.setAttribute("visibleAll", !0);
        })), scrollContainer.addEventListener("pointermove", (() => {
            scrollbar.setAttribute("visibleAll", !0);
        })), scrollContainer.addEventListener("pointerout", (() => {
            scrollbar.setAttribute("visibleAll", !1);
        })), scrollbar.addEventListener("pointerover", (() => {
            scrollbar.setAttribute("visibleAll", !0);
        })), scrollbar.addEventListener("pointerout", (() => {
            scrollbar.setAttribute("visibleAll", !0);
        })), scrollbar.addEventListener("scrollUp", this.handleScrollBarChange), scrollbar.addEventListener(constant_1.SCROLLBAR_EVENT, this.handleScrollBarChange);
    }
    addOrUpdateScroll(showH, showV, container, scrollContainer) {
        if (showH) {
            const {scrollBar: hScrollbar, isUpdate: isUpdate} = this.addOrUpdateHScroll(scrollContainer, container, !0);
            isUpdate || this.initEventOfScrollbar(scrollContainer, hScrollbar, !0);
        } else this.clearScrollbar(scrollContainer, "horizontal");
        if (showV) {
            const {scrollBar: vScrollbar, isUpdate: isUpdate} = this.addOrUpdateHScroll(scrollContainer, container, !1);
            isUpdate || this.initEventOfScrollbar(scrollContainer, vScrollbar, !1);
        } else this.clearScrollbar(scrollContainer, "vertical");
    }
    getDirection(isHorozntal) {
        return isHorozntal ? "horizontal" : "vertical";
    }
    addOrUpdateHScroll(scrollContainer, container, isHorozntal) {
        var _a, _b;
        const direction = this.getDirection(isHorozntal), name = `${null !== (_a = scrollContainer.name) && void 0 !== _a ? _a : scrollContainer._uid}_${this.getDirection(isHorozntal)}_${this.name}`, scrollbars = container.children.filter((g => g.name === name));
        let isUpdate = !0, scrollBar = scrollbars[0];
        const {y: y = 0, dy: dy = 0, x: x = 0, dx: dx = 0, height: height, width: width, zIndex: zIndex = 0} = this.scrollContainer.g.attribute, attrs = {
            x: 0,
            y: 0,
            direction: direction,
            zIndex: zIndex + 1,
            visibleAll: !0,
            padding: [ 2, 0 ],
            railStyle: {
                fill: "rgba(0, 0, 0, .1)"
            },
            range: [ 0, .05 ]
        };
        isHorozntal ? (attrs.width = this.scrollContainerBounds.width(), attrs.height = 12) : (attrs.height = this.scrollContainerBounds.height(), 
        attrs.width = 12), scrollBar ? scrollbars.length > 1 && scrollbars.forEach(((child, index) => {
            var _a;
            index && (null === (_a = child.parent) || void 0 === _a || _a.removeChild(child));
        })) : (isUpdate = !1, scrollBar = new scrollbar_1.ScrollBar(attrs), scrollBar.name = name, 
        container.add(scrollBar), scrollBar.isScrollBar = !0);
        const childrenBounds = this.childrenBounds, {scrollX: scrollX, scrollY: scrollY} = scrollContainer.attribute;
        if (isHorozntal) {
            const ratio = Math.min(this.scrollContainerBounds.width() / childrenBounds.width(), 1), start = Math.max(Math.min(scrollX / this.childrenBounds.width(), 0), ratio - 1);
            attrs.x = x + dx, attrs.y = y + dy + height - (null !== (_b = attrs.height) && void 0 !== _b ? _b : 0), 
            attrs.range = [ -start, -start + ratio ];
        } else {
            const ratio = Math.min(this.scrollContainerBounds.height() / childrenBounds.height(), 1), start = Math.max(Math.min(scrollY / this.childrenBounds.height(), 0), ratio - 1);
            attrs.x = x + dx + width - this.scrollContainerBounds.width(), attrs.y = y + dy, 
            attrs.range = [ -start, -start + ratio ];
        }
        return scrollBar.setAttributes(attrs), {
            scrollBar: scrollBar,
            isUpdate: isUpdate
        };
    }
    clearScrollbar(scrollContainer, type) {
        if (!scrollContainer.parent) return;
        scrollContainer.parent.children.filter((child => child.isScrollBar && ("all" === type || child.attribute.direction === type))).forEach((child => {
            child.parent.removeChild(child);
        }));
    }
    formatScrollContainer(g) {
        if (!g || "group" !== g.type || !g.attribute) return null;
        const {overflow: overflow, width: width, height: height} = g.attribute;
        if (!overflow || "hidden" === overflow) return null;
        let showH = !1, showV = !1;
        "scroll" === overflow ? (showH = !0, showV = !0) : (showH = "scroll-x" === overflow, 
        showV = !showH);
        const childrenBounds = this.childrenBounds;
        return childrenBounds.clear(), g.forEachChildren((g => {
            childrenBounds.union(g.AABBBounds);
        })), g.AABBBounds.empty() || (showH && (showH = width < childrenBounds.width()), 
        showV && (showV = height < childrenBounds.height())), showH || showV ? {
            g: g,
            showH: showH,
            showV: showV
        } : null;
    }
    getScrollContainer(graphic) {
        let g = graphic;
        for (;g; ) {
            const res = this.formatScrollContainer(g);
            if (res) return res;
            g = g.parent;
        }
        return null;
    }
    deactivate(context) {
        const {stage: stage} = this.pluginService;
        stage.removeEventListener("wheel", this.scroll);
    }
};

ScrollBarPlugin.defaultParams = {
    timeout: 500
}, ScrollBarPlugin = ScrollBarPlugin_1 = __decorate([ (0, vrender_core_1.injectable)() ], ScrollBarPlugin), 
exports.ScrollBarPlugin = ScrollBarPlugin;
//# sourceMappingURL=scrollbar-plugin.js.map
