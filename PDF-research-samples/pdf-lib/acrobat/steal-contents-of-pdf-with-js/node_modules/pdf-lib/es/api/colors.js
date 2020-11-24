import { setFillingCmykColor, setFillingGrayscaleColor, setFillingRgbColor, setStrokingCmykColor, setStrokingGrayscaleColor, setStrokingRgbColor, } from "./operators";
import { assertRange, error } from "../utils";
export var ColorTypes;
(function (ColorTypes) {
    ColorTypes["Grayscale"] = "Grayscale";
    ColorTypes["RGB"] = "RGB";
    ColorTypes["CMYK"] = "CMYK";
})(ColorTypes || (ColorTypes = {}));
export var grayscale = function (gray) {
    assertRange(gray, 'gray', 0.0, 1.0);
    return { type: ColorTypes.Grayscale, gray: gray };
};
export var rgb = function (red, green, blue) {
    assertRange(red, 'red', 0, 1);
    assertRange(green, 'green', 0, 1);
    assertRange(blue, 'blue', 0, 1);
    return { type: ColorTypes.RGB, red: red, green: green, blue: blue };
};
export var cmyk = function (cyan, magenta, yellow, key) {
    assertRange(cyan, 'cyan', 0, 1);
    assertRange(magenta, 'magenta', 0, 1);
    assertRange(yellow, 'yellow', 0, 1);
    assertRange(key, 'key', 0, 1);
    return { type: ColorTypes.CMYK, cyan: cyan, magenta: magenta, yellow: yellow, key: key };
};
var Grayscale = ColorTypes.Grayscale, RGB = ColorTypes.RGB, CMYK = ColorTypes.CMYK;
// prettier-ignore
export var setFillingColor = function (color) {
    return color.type === Grayscale ? setFillingGrayscaleColor(color.gray)
        : color.type === RGB ? setFillingRgbColor(color.red, color.green, color.blue)
            : color.type === CMYK ? setFillingCmykColor(color.cyan, color.magenta, color.yellow, color.key)
                : error("Invalid color: " + JSON.stringify(color));
};
// prettier-ignore
export var setStrokingColor = function (color) {
    return color.type === Grayscale ? setStrokingGrayscaleColor(color.gray)
        : color.type === RGB ? setStrokingRgbColor(color.red, color.green, color.blue)
            : color.type === CMYK ? setStrokingCmykColor(color.cyan, color.magenta, color.yellow, color.key)
                : error("Invalid color: " + JSON.stringify(color));
};
//# sourceMappingURL=colors.js.map