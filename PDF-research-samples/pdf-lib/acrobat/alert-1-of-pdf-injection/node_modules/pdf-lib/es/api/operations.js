import { __spreadArrays } from "tslib";
import { setFillingColor, setStrokingColor } from "./colors";
import { asNumber } from "./objects";
import { appendBezierCurve, beginText, closePath, drawObject, endText, fill, fillAndStroke, lineTo, moveTo, nextLine, popGraphicsState, pushGraphicsState, rotateAndSkewTextRadiansAndTranslate, rotateRadians, scale, setFontAndSize, setLineHeight, setLineWidth, showText, skewRadians, stroke, translate, } from "./operators";
import { toRadians } from "./rotations";
import { svgPathToOperators } from "./svgPath";
export var drawText = function (line, options) { return [
    beginText(),
    setFillingColor(options.color),
    setFontAndSize(options.font, options.size),
    rotateAndSkewTextRadiansAndTranslate(toRadians(options.rotate), toRadians(options.xSkew), toRadians(options.ySkew), options.x, options.y),
    showText(line),
    endText(),
]; };
export var drawLinesOfText = function (lines, options) {
    var operators = [
        beginText(),
        setFillingColor(options.color),
        setFontAndSize(options.font, options.size),
        setLineHeight(options.lineHeight),
        rotateAndSkewTextRadiansAndTranslate(toRadians(options.rotate), toRadians(options.xSkew), toRadians(options.ySkew), options.x, options.y),
    ];
    for (var idx = 0, len = lines.length; idx < len; idx++) {
        operators.push(showText(lines[idx]), nextLine());
    }
    operators.push(endText());
    return operators;
};
export var drawImage = function (name, options) { return [
    pushGraphicsState(),
    translate(options.x, options.y),
    rotateRadians(toRadians(options.rotate)),
    scale(options.width, options.height),
    skewRadians(toRadians(options.xSkew), toRadians(options.ySkew)),
    drawObject(name),
    popGraphicsState(),
]; };
export var drawPage = function (name, options) { return [
    pushGraphicsState(),
    translate(options.x, options.y),
    rotateRadians(toRadians(options.rotate)),
    scale(options.xScale, options.yScale),
    skewRadians(toRadians(options.xSkew), toRadians(options.ySkew)),
    drawObject(name),
    popGraphicsState(),
]; };
export var drawLine = function (options) {
    return [
        pushGraphicsState(),
        options.color && setStrokingColor(options.color),
        setLineWidth(options.thickness),
        moveTo(options.start.x, options.start.y),
        lineTo(options.end.x, options.end.y),
        stroke(),
        popGraphicsState(),
    ].filter(Boolean);
};
export var drawRectangle = function (options) {
    return [
        pushGraphicsState(),
        options.color && setFillingColor(options.color),
        options.borderColor && setStrokingColor(options.borderColor),
        setLineWidth(options.borderWidth),
        translate(options.x, options.y),
        rotateRadians(toRadians(options.rotate)),
        skewRadians(toRadians(options.xSkew), toRadians(options.ySkew)),
        moveTo(0, 0),
        lineTo(0, options.height),
        lineTo(options.width, options.height),
        lineTo(options.width, 0),
        closePath(),
        // prettier-ignore
        options.color && options.borderWidth ? fillAndStroke()
            : options.color ? fill()
                : options.borderColor ? stroke()
                    : closePath(),
        popGraphicsState(),
    ].filter(Boolean);
};
var KAPPA = 4.0 * ((Math.sqrt(2) - 1.0) / 3.0);
export var drawEllipsePath = function (config) {
    var x = asNumber(config.x);
    var y = asNumber(config.y);
    var xScale = asNumber(config.xScale);
    var yScale = asNumber(config.yScale);
    x -= xScale;
    y -= yScale;
    var ox = xScale * KAPPA;
    var oy = yScale * KAPPA;
    var xe = x + xScale * 2;
    var ye = y + yScale * 2;
    var xm = x + xScale;
    var ym = y + yScale;
    return [
        pushGraphicsState(),
        moveTo(x, ym),
        appendBezierCurve(x, ym - oy, xm - ox, y, xm, y),
        appendBezierCurve(xm + ox, y, xe, ym - oy, xe, ym),
        appendBezierCurve(xe, ym + oy, xm + ox, ye, xm, ye),
        appendBezierCurve(xm - ox, ye, x, ym + oy, x, ym),
        popGraphicsState(),
    ];
};
export var drawEllipse = function (options) {
    return __spreadArrays([
        pushGraphicsState(),
        options.color && setFillingColor(options.color),
        options.borderColor && setStrokingColor(options.borderColor),
        setLineWidth(options.borderWidth)
    ], drawEllipsePath({
        x: options.x,
        y: options.y,
        xScale: options.xScale,
        yScale: options.yScale,
    }), [
        // prettier-ignore
        options.color && options.borderWidth ? fillAndStroke()
            : options.color ? fill()
                : options.borderColor ? stroke()
                    : closePath(),
        popGraphicsState(),
    ]).filter(Boolean);
};
export var drawSvgPath = function (path, options) {
    return __spreadArrays([
        pushGraphicsState(),
        translate(options.x, options.y),
        // SVG path Y axis is opposite pdf-lib's
        options.scale ? scale(options.scale, -options.scale) : scale(1, -1),
        options.color && setFillingColor(options.color),
        options.borderColor && setStrokingColor(options.borderColor),
        options.borderWidth && setLineWidth(options.borderWidth)
    ], svgPathToOperators(path), [
        // prettier-ignore
        options.color && options.borderWidth ? fillAndStroke()
            : options.color ? fill()
                : options.borderColor ? stroke()
                    : closePath(),
        popGraphicsState(),
    ]).filter(Boolean);
};
//# sourceMappingURL=operations.js.map