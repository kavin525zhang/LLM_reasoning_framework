import { isNumber, arrayEqual, pi, abs } from "@visactor/vutils";

const halfPi = pi / 2;

export function createRectPath(path, x, y, width, height, rectCornerRadius, roundCorner = !0, edgeCb) {
    let cornerRadius;
    if (Array.isArray(roundCorner) && (edgeCb = roundCorner, roundCorner = !0), width < 0 && (x += width, 
    width = -width), height < 0 && (y += height, height = -height), isNumber(rectCornerRadius, !0)) cornerRadius = [ rectCornerRadius = abs(rectCornerRadius), rectCornerRadius, rectCornerRadius, rectCornerRadius ]; else if (Array.isArray(rectCornerRadius)) {
        const cornerRadiusArr = rectCornerRadius;
        let cr0, cr1;
        switch (cornerRadiusArr.length) {
          case 0:
            cornerRadius = [ 0, 0, 0, 0 ];
            break;

          case 1:
            cr0 = abs(cornerRadiusArr[0]), cornerRadius = [ cr0, cr0, cr0, cr0 ];
            break;

          case 2:
          case 3:
            cr0 = abs(cornerRadiusArr[0]), cr1 = abs(cornerRadiusArr[1]), cornerRadius = [ cr0, cr1, cr0, cr1 ];
            break;

          default:
            cornerRadius = cornerRadiusArr, cornerRadius[0] = abs(cornerRadius[0]), cornerRadius[1] = abs(cornerRadius[1]), 
            cornerRadius[2] = abs(cornerRadius[2]), cornerRadius[3] = abs(cornerRadius[3]);
        }
    } else cornerRadius = [ 0, 0, 0, 0 ];
    if (width < 0 || cornerRadius[0] + cornerRadius[1] + cornerRadius[2] + cornerRadius[3] < 1e-12) return path.rect(x, y, width, height);
    const [leftTop, rightTop, rightBottom, leftBottom] = [ [ x, y ], [ x + width, y ], [ x + width, y + height ], [ x, y + height ] ], maxCornerRadius = Math.min(width / 2, height / 2), _cornerRadius = [ Math.min(maxCornerRadius, cornerRadius[0]), Math.min(maxCornerRadius, cornerRadius[1]), Math.min(maxCornerRadius, cornerRadius[2]), Math.min(maxCornerRadius, cornerRadius[3]) ], leftTopPoint1 = [ leftTop[0] + _cornerRadius[0], leftTop[1] ], leftTopPoint2 = [ leftTop[0], leftTop[1] + _cornerRadius[0] ], rightTopPoint1 = [ rightTop[0] - _cornerRadius[1], rightTop[1] ], rightTopPoint2 = [ rightTop[0], rightTop[1] + _cornerRadius[1] ], rightBottomPoint1 = [ rightBottom[0] - _cornerRadius[2], rightBottom[1] ], rightBottomPoint2 = [ rightBottom[0], rightBottom[1] - _cornerRadius[2] ], leftBottomPoint1 = [ leftBottom[0] + _cornerRadius[3], leftBottom[1] ], leftBottomPoint2 = [ leftBottom[0], leftBottom[1] - _cornerRadius[3] ];
    if (path.moveTo(leftTopPoint1[0], leftTopPoint1[1]), roundCorner) {
        if (edgeCb && edgeCb[0] ? edgeCb[0](leftTopPoint1[0], leftTopPoint1[1], rightTopPoint1[0], rightTopPoint1[1]) : path.lineTo(rightTopPoint1[0], rightTopPoint1[1]), 
        !arrayEqual(rightTopPoint1, rightTopPoint2)) {
            edgeCb && edgeCb[0] && path.moveTo(rightTopPoint1[0], rightTopPoint1[1]);
            const centerX = rightTopPoint1[0], centerY = rightTopPoint1[1] + _cornerRadius[1];
            path.arc(centerX, centerY, _cornerRadius[1], -halfPi, 0, !1);
        }
        if (edgeCb && edgeCb[1] ? edgeCb[1](rightTopPoint2[0], rightTopPoint2[1], rightBottomPoint2[0], rightBottomPoint2[1]) : path.lineTo(rightBottomPoint2[0], rightBottomPoint2[1]), 
        !arrayEqual(rightBottomPoint1, rightBottomPoint2)) {
            const centerX = rightBottomPoint2[0] - _cornerRadius[2], centerY = rightBottomPoint2[1];
            edgeCb && edgeCb[1] && path.moveTo(rightBottomPoint2[0], rightBottomPoint2[1]), 
            path.arc(centerX, centerY, _cornerRadius[2], 0, halfPi, !1);
        }
        if (edgeCb && edgeCb[2] ? edgeCb[2](rightBottomPoint1[0], rightBottomPoint1[1], leftBottomPoint1[0], leftBottomPoint1[1]) : path.lineTo(leftBottomPoint1[0], leftBottomPoint1[1]), 
        !arrayEqual(leftBottomPoint1, leftBottomPoint2)) {
            const centerX = leftBottomPoint1[0], centerY = leftBottomPoint1[1] - _cornerRadius[3];
            edgeCb && edgeCb[2] && path.moveTo(leftBottomPoint1[0], leftBottomPoint1[1]), path.arc(centerX, centerY, _cornerRadius[3], halfPi, pi, !1);
        }
        if (edgeCb && edgeCb[3] ? edgeCb[3](leftBottomPoint2[0], leftBottomPoint2[1], leftTopPoint2[0], leftTopPoint2[1]) : path.lineTo(leftTopPoint2[0], leftTopPoint2[1]), 
        !arrayEqual(leftTopPoint1, leftTopPoint2)) {
            const centerX = leftTopPoint1[0], centerY = leftTopPoint1[1] + _cornerRadius[0];
            edgeCb && edgeCb[3] && path.moveTo(leftTopPoint2[0], leftTopPoint2[1]), path.arc(centerX, centerY, _cornerRadius[0], pi, pi + halfPi, !1);
        }
    } else edgeCb && edgeCb[0] ? edgeCb[0](leftTopPoint1[0], leftTopPoint1[1], rightTopPoint1[0], rightTopPoint1[1]) : path.lineTo(rightTopPoint1[0], rightTopPoint1[1]), 
    edgeCb && edgeCb[1] ? edgeCb[1](rightTopPoint1[0], rightTopPoint1[1], rightBottomPoint1[0], rightBottomPoint1[1]) : path.lineTo(rightBottomPoint1[0], rightBottomPoint1[1]), 
    edgeCb && edgeCb[2] ? edgeCb[2](rightBottomPoint1[0], rightBottomPoint1[1], leftBottomPoint1[0], leftBottomPoint1[1]) : path.lineTo(leftBottomPoint1[0], leftBottomPoint1[1]), 
    edgeCb && edgeCb[2] ? edgeCb[2](leftBottomPoint1[0], leftBottomPoint1[1], leftTopPoint1[0], leftTopPoint1[1]) : path.lineTo(leftTopPoint1[0], leftTopPoint1[1]);
    return !edgeCb && path.closePath(), path;
}
//# sourceMappingURL=rect.js.map
