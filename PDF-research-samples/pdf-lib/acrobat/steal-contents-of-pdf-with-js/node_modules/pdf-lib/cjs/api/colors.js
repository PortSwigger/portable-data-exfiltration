"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("./operators");
var utils_1 = require("../utils");
var ColorTypes;
(function (ColorTypes) {
    ColorTypes["Grayscale"] = "Grayscale";
    ColorTypes["RGB"] = "RGB";
    ColorTypes["CMYK"] = "CMYK";
})(ColorTypes = exports.ColorTypes || (exports.ColorTypes = {}));
exports.grayscale = function (gray) {
    utils_1.assertRange(gray, 'gray', 0.0, 1.0);
    return { type: ColorTypes.Grayscale, gray: gray };
};
exports.rgb = function (red, green, blue) {
    utils_1.assertRange(red, 'red', 0, 1);
    utils_1.assertRange(green, 'green', 0, 1);
    utils_1.assertRange(blue, 'blue', 0, 1);
    return { type: ColorTypes.RGB, red: red, green: green, blue: blue };
};
exports.cmyk = function (cyan, magenta, yellow, key) {
    utils_1.assertRange(cyan, 'cyan', 0, 1);
    utils_1.assertRange(magenta, 'magenta', 0, 1);
    utils_1.assertRange(yellow, 'yellow', 0, 1);
    utils_1.assertRange(key, 'key', 0, 1);
    return { type: ColorTypes.CMYK, cyan: cyan, magenta: magenta, yellow: yellow, key: key };
};
var Grayscale = ColorTypes.Grayscale, RGB = ColorTypes.RGB, CMYK = ColorTypes.CMYK;
// prettier-ignore
exports.setFillingColor = function (color) {
    return color.type === Grayscale ? operators_1.setFillingGrayscaleColor(color.gray)
        : color.type === RGB ? operators_1.setFillingRgbColor(color.red, color.green, color.blue)
            : color.type === CMYK ? operators_1.setFillingCmykColor(color.cyan, color.magenta, color.yellow, color.key)
                : utils_1.error("Invalid color: " + JSON.stringify(color));
};
// prettier-ignore
exports.setStrokingColor = function (color) {
    return color.type === Grayscale ? operators_1.setStrokingGrayscaleColor(color.gray)
        : color.type === RGB ? operators_1.setStrokingRgbColor(color.red, color.green, color.blue)
            : color.type === CMYK ? operators_1.setStrokingCmykColor(color.cyan, color.magenta, color.yellow, color.key)
                : utils_1.error("Invalid color: " + JSON.stringify(color));
};
//# sourceMappingURL=colors.js.map