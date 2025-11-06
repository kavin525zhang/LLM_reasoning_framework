import { isNumberClose } from "@visactor/vutils";

function findSiblingLabels(labels, selfIndex) {
    const len = labels.length;
    return {
        prevLabel: selfIndex >= 1 ? labels[selfIndex - 1] : labels[len - 1],
        nextLabel: selfIndex < len - 1 ? labels[selfIndex + 1] : labels[0]
    };
}

function adjustMaxLineWidth(label, maxLineWidth, ellipsis) {
    var _a;
    label.setAttributes({
        maxLineWidth: maxLineWidth,
        ellipsis: null !== (_a = label.attribute.ellipsis) && void 0 !== _a ? _a : ellipsis
    });
}

function adjustMaxHeight(labels, selfIndex, bounds) {
    const siblings = [];
    if (labels.length >= 3) {
        const {prevLabel: prevLabel, nextLabel: nextLabel} = findSiblingLabels(labels, selfIndex);
        siblings.push(prevLabel, nextLabel);
    } else 2 === labels.length && siblings.push(labels[0 === selfIndex ? 1 : 0]);
    const label = labels[selfIndex];
    let heightLimit = Math.min(Math.abs(label.attribute.y - bounds.y1), Math.abs(label.attribute.y - bounds.y2));
    siblings.forEach((sibling => {
        heightLimit = Math.min(heightLimit, Math.abs(sibling.attribute.y - label.attribute.y));
    })), heightLimit > 0 && label.setAttributes({
        whiteSpace: "normal",
        heightLimit: heightLimit
    });
}

export function circleAutoLimit(labels, config) {
    const {ellipsis: ellipsis, inside: inside, bounds: bounds, autoWrap: autoWrap, center: center} = config;
    inside || labels.forEach(((label, index) => {
        const {x: x, y: y} = label.attribute, b = label.AABBBounds;
        if (isNumberClose(x, center.x)) {
            if (y > bounds.y2 || y < bounds.y1) return void adjustMaxLineWidth(label, 0, ellipsis);
            const boxWidth = bounds.x2 - bounds.x1;
            if (labels.length >= 3) {
                const {prevLabel: prevLabel, nextLabel: nextLabel} = findSiblingLabels(labels, index);
                let leftX = prevLabel.attribute.x, rightX = nextLabel.attribute.x;
                leftX > rightX && (leftX = nextLabel.attribute.x, rightX = prevLabel.attribute.x);
                const maxWidth = leftX === rightX ? boxWidth : x >= leftX && x <= rightX ? rightX - leftX : Math.min(Math.abs(leftX - x), Math.abs(rightX - x));
                label.AABBBounds.width() > maxWidth && adjustMaxLineWidth(label, maxWidth, ellipsis);
            } else label.AABBBounds.width() > boxWidth && adjustMaxLineWidth(label, boxWidth, ellipsis);
        } else x > center.x && b.x2 > bounds.x2 ? (adjustMaxLineWidth(label, bounds.x2 - x, ellipsis), 
        autoWrap && adjustMaxHeight(labels, index, bounds)) : x < center.x && b.x1 < bounds.x1 && (adjustMaxLineWidth(label, x - bounds.x1, ellipsis), 
        autoWrap && adjustMaxHeight(labels, index, bounds));
    }));
}
//# sourceMappingURL=circle-auto-limit.js.map
