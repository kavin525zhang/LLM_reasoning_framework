"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.isAxisHorizontal = exports.getCartesianLabelBounds = exports.MIN_TICK_GAP = exports.labelDistance = exports.labelOverlap = exports.convertDomainToTickData = void 0;

const vutils_1 = require("@visactor/vutils"), text_1 = require("../../util/text"), convertDomainToTickData = domain => domain.map(((t, index) => ({
    index: index,
    value: t
})));

exports.convertDomainToTickData = convertDomainToTickData;

const labelOverlap = (prevLabel, nextLabel, gap = 0) => {
    const prevBounds = new vutils_1.AABBBounds(prevLabel).expand(gap / 2), nextBounds = new vutils_1.AABBBounds(nextLabel).expand(gap / 2);
    return prevBounds.intersects(nextBounds);
};

exports.labelOverlap = labelOverlap;

const labelDistance = (prevLabel, nextLabel) => {
    let horizontal = 0;
    prevLabel.x2 < nextLabel.x1 ? horizontal = nextLabel.x1 - prevLabel.x2 : nextLabel.x2 < prevLabel.x1 && (horizontal = prevLabel.x1 - nextLabel.x2);
    let vertical = 0;
    return prevLabel.y2 < nextLabel.y1 ? vertical = nextLabel.y1 - prevLabel.y2 : nextLabel.y2 < prevLabel.y1 && (vertical = prevLabel.y1 - nextLabel.y2), 
    [ horizontal, vertical ];
};

exports.labelDistance = labelDistance, exports.MIN_TICK_GAP = 12;

const calculateFlushPos = (basePosition, size, rangePosition, otherEnd) => rangePosition < basePosition ? Math.max(basePosition - size / 2, rangePosition) : rangePosition > basePosition ? Math.min(basePosition - size / 2, rangePosition - size) : rangePosition < otherEnd ? rangePosition : rangePosition - size, getCartesianLabelBounds = (scale, domain, op) => {
    var _a;
    const {labelStyle: labelStyle, axisOrientType: axisOrientType, labelFlush: labelFlush, labelFormatter: labelFormatter, startAngle: startAngle = 0} = op;
    let labelAngle = null !== (_a = labelStyle.angle) && void 0 !== _a ? _a : 0;
    "vertical" === labelStyle.direction && (labelAngle += (0, vutils_1.degreeToRadian)(90));
    const isHorizontal = [ "bottom", "top" ].includes(axisOrientType), isVertical = [ "left", "right" ].includes(axisOrientType);
    let scaleX = 1, scaleY = 0;
    isHorizontal || (isVertical ? (scaleX = 0, scaleY = 1) : startAngle && (scaleX = Math.cos(startAngle), 
    scaleY = -Math.sin(startAngle)));
    const textMeasure = (0, text_1.initTextMeasure)(labelStyle), range = scale.range(), labelBoundsList = domain.map(((v, i) => {
        var _a, _b;
        const str = labelFormatter ? labelFormatter(v) : `${v}`, {width: width, height: height} = textMeasure.quickMeasure(str), textWidth = Math.max(width, exports.MIN_TICK_GAP), textHeight = Math.max(height, exports.MIN_TICK_GAP), pos = scale.scale(v), baseTextX = scaleX * pos, baseTextY = scaleY * pos;
        let align, baseline, textX = baseTextX, textY = baseTextY;
        labelFlush && isHorizontal && 0 === i ? textX = calculateFlushPos(baseTextX, textWidth, range[0], range[range.length - 1]) : labelFlush && isHorizontal && i === domain.length - 1 ? textX = calculateFlushPos(baseTextX, textWidth, range[range.length - 1], range[0]) : align = null !== (_a = labelStyle.textAlign) && void 0 !== _a ? _a : "center", 
        "right" === align ? textX -= textWidth : "center" === align && (textX -= textWidth / 2), 
        labelFlush && isVertical && 0 === i ? textY = calculateFlushPos(baseTextY, textHeight, range[0], range[range.length - 1]) : labelFlush && isVertical && i === domain.length - 1 ? textY = calculateFlushPos(baseTextY, textHeight, range[range.length - 1], range[0]) : baseline = null !== (_b = labelStyle.textBaseline) && void 0 !== _b ? _b : "middle", 
        "bottom" === baseline ? textY -= textHeight : "middle" === baseline && (textY -= textHeight / 2);
        const bounds = (new vutils_1.AABBBounds).set(textX, textY, textX + textWidth, textY + textHeight);
        return labelAngle && bounds.rotate(labelAngle, baseTextX, baseTextY), bounds;
    }));
    return labelBoundsList;
};

exports.getCartesianLabelBounds = getCartesianLabelBounds;

const isAxisHorizontal = axisOrientType => [ "bottom", "top", "z" ].includes(axisOrientType);

exports.isAxisHorizontal = isAxisHorizontal;
//# sourceMappingURL=util.js.map
