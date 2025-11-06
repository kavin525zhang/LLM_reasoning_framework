import { isEmpty, merge } from "@visactor/vutils";

import { graphicCreator } from "@visactor/vrender-core";

import { loadArcSegmentComponent } from "./register";

import { Segment } from "./segment";

loadArcSegmentComponent();

export class ArcSegment extends Segment {
    constructor(attributes, options) {
        super((null == options ? void 0 : options.skipDefault) ? attributes : merge({}, Segment.defaultAttributes, attributes)), 
        this.name = "arc-segment", this.key = "arc-segment", this.isReverseArc = !1;
    }
    getStartAngle() {
        const tangAng = this.isReverseArc ? this._startAngle + Math.PI / 2 : this._startAngle - Math.PI / 2;
        return tangAng < 0 ? tangAng + 2 * Math.PI : tangAng > 2 * Math.PI ? tangAng - 2 * Math.PI : tangAng;
    }
    getEndAngle() {
        const tangAng = this.isReverseArc ? this._endAngle - Math.PI / 2 : this._endAngle + Math.PI / 2;
        return tangAng < 0 ? tangAng + 2 * Math.PI : tangAng > 2 * Math.PI ? tangAng - 2 * Math.PI : tangAng;
    }
    getMainSegmentPoints() {
        return this._mainSegmentPoints;
    }
    _computeStartRotate(angle) {
        return this.isReverseArc ? angle + Math.PI : angle;
    }
    _computeEndRotate(angle) {
        return this.isReverseArc ? angle : angle + Math.PI;
    }
    render() {
        this.removeAllChild(!0), this._reset();
        const {startSymbol: startSymbol, endSymbol: endSymbol, lineStyle: lineStyle, state: state, visible: visible = !0, radius: radius, startAngle: startAngle, endAngle: endAngle, center: center} = this.attribute;
        if (!visible) return;
        this._startAngle = startAngle, this._endAngle = endAngle, this.isReverseArc = startAngle > endAngle;
        const startPoint = {
            x: center.x + radius * Math.cos(this._startAngle),
            y: center.y + radius * Math.sin(this._startAngle)
        }, endPoint = {
            x: center.x + radius * Math.cos(this._endAngle),
            y: center.y + radius * Math.sin(this._endAngle)
        };
        this._mainSegmentPoints = [ startPoint, endPoint ];
        const startSymbolShape = this._renderSymbol(startSymbol, this._mainSegmentPoints, "start"), endSymbolShape = this._renderSymbol(endSymbol, this._mainSegmentPoints, "end");
        this.startSymbol = startSymbolShape, this.endSymbol = endSymbolShape;
        const line = graphicCreator.arc(Object.assign({
            x: center.x,
            y: center.y,
            startAngle: startAngle,
            endAngle: endAngle,
            innerRadius: radius,
            outerRadius: radius
        }, lineStyle));
        line.name = `${this.name}-line`, line.id = this._getNodeId("arc"), isEmpty(null == state ? void 0 : state.line) || (line.states = [].concat(state.line)[0]), 
        this.add(line), this.line = line;
    }
}
//# sourceMappingURL=arc-segment.js.map
