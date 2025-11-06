"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.scrollBar = void 0;

const getSlider = () => ({
    style: {
        fill: {
            type: "palette",
            key: "scrollBarSliderColor"
        }
    }
});

exports.scrollBar = {
    horizontal: {
        height: 10,
        slider: {
            style: {
                fill: {
                    type: "palette",
                    key: "scrollBarSliderColor"
                }
            }
        }
    },
    vertical: {
        width: 10,
        slider: {
            style: {
                fill: {
                    type: "palette",
                    key: "scrollBarSliderColor"
                }
            }
        }
    }
};
//# sourceMappingURL=scroll-bar.js.map
