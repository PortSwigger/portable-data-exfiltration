"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var colors_1 = require("./colors");
var objects_1 = require("./objects");
var operators_1 = require("./operators");
var rotations_1 = require("./rotations");
var svgPath_1 = require("./svgPath");
exports.drawText = function (line, options) { return [
    operators_1.beginText(),
    colors_1.setFillingColor(options.color),
    operators_1.setFontAndSize(options.font, options.size),
    operators_1.rotateAndSkewTextRadiansAndTranslate(rotations_1.toRadians(options.rotate), rotations_1.toRadians(options.xSkew), rotations_1.toRadians(options.ySkew), options.x, options.y),
    operators_1.showText(line),
    operators_1.endText(),
]; };
exports.drawLinesOfText = function (lines, options) {
    var operators = [
        operators_1.beginText(),
        colors_1.setFillingColor(options.color),
        operators_1.setFontAndSize(options.font, options.size),
        operators_1.setLineHeight(options.lineHeight),
        operators_1.rotateAndSkewTextRadiansAndTranslate(rotations_1.toRadians(options.rotate), rotations_1.toRadians(options.xSkew), rotations_1.toRadians(options.ySkew), options.x, options.y),
    ];
    for (var idx = 0, len = lines.length; idx < len; idx++) {
        operators.push(operators_1.showText(lines[idx]), operators_1.nextLine());
    }
    operators.push(operators_1.endText());
    return operators;
};
exports.drawImage = function (name, options) { return [
    operators_1.pushGraphicsState(),
    operators_1.translate(options.x, options.y),
    operators_1.rotateRadians(rotations_1.toRadians(options.rotate)),
    operators_1.scale(options.width, options.height),
    operators_1.skewRadians(rotations_1.toRadians(options.xSkew), rotations_1.toRadians(options.ySkew)),
    operators_1.drawObject(name),
    operators_1.popGraphicsState(),
]; };
exports.drawPage = function (name, options) { return [
    operators_1.pushGraphicsState(),
    operators_1.translate(options.x, options.y),
    operators_1.rotateRadians(rotations_1.toRadians(options.rotate)),
    operators_1.scale(options.xScale, options.yScale),
    operators_1.skewRadians(rotations_1.toRadians(options.xSkew), rotations_1.toRadians(options.ySkew)),
    operators_1.drawObject(name),
    operators_1.popGraphicsState(),
]; };
exports.drawLine = function (options) {
    return [
        operators_1.pushGraphicsState(),
        options.color && colors_1.setStrokingColor(options.color),
        operators_1.setLineWidth(options.thickness),
        operators_1.moveTo(options.start.x, options.start.y),
        operators_1.lineTo(options.end.x, options.end.y),
        operators_1.stroke(),
        operators_1.popGraphicsState(),
    ].filter(Boolean);
};
exports.drawRectangle = function (options) {
    return [
        operators_1.pushGraphicsState(),
        options.color && colors_1.setFillingColor(options.color),
        options.borderColor && colors_1.setStrokingColor(options.borderColor),
        operators_1.setLineWidth(options.borderWidth),
        operators_1.translate(options.x, options.y),
        operators_1.rotateRadians(rotations_1.toRadians(options.rotate)),
        operators_1.skewRadians(rotations_1.toRadians(options.xSkew), rotations_1.toRadians(options.ySkew)),
        operators_1.moveTo(0, 0),
        operators_1.lineTo(0, options.height),
        operators_1.lineTo(options.width, options.height),
        operators_1.lineTo(options.width, 0),
        operators_1.closePath(),
        // prettier-ignore
        options.color && options.borderWidth ? operators_1.fillAndStroke()
            : options.color ? operators_1.fill()
                : options.borderColor ? operators_1.stroke()
                    : operators_1.closePath(),
        operators_1.popGraphicsState(),
    ].filter(Boolean);
};
var KAPPA = 4.0 * ((Math.sqrt(2) - 1.0) / 3.0);
exports.drawEllipsePath = function (config) {
    var x = objects_1.asNumber(config.x);
    var y = objects_1.asNumber(config.y);
    var xScale = objects_1.asNumber(config.xScale);
    var yScale = objects_1.asNumber(config.yScale);
    x -= xScale;
    y -= yScale;
    var ox = xScale * KAPPA;
    var oy = yScale * KAPPA;
    var xe = x + xScale * 2;
    var ye = y + yScale * 2;
    var xm = x + xScale;
    var ym = y + yScale;
    return [
        operators_1.pushGraphicsState(),
        operators_1.moveTo(x, ym),
        operators_1.appendBezierCurve(x, ym - oy, xm - ox, y, xm, y),
        operators_1.appendBezierCurve(xm + ox, y, xe, ym - oy, xe, ym),
        operators_1.appendBezierCurve(xe, ym + oy, xm + ox, ye, xm, ye),
        operators_1.appendBezierCurve(xm - ox, ye, x, ym + oy, x, ym),
        operators_1.popGraphicsState(),
    ];
};
exports.drawEllipse = function (options) {
    return tslib_1.__spreadArrays([
        operators_1.pushGraphicsState(),
        options.color && colors_1.setFillingColor(options.color),
        options.borderColor && colors_1.setStrokingColor(options.borderColor),
        operators_1.setLineWidth(options.borderWidth)
    ], exports.drawEllipsePath({
        x: options.x,
        y: options.y,
        xScale: options.xScale,
        yScale: options.yScale,
    }), [
        // prettier-ignore
        options.color && options.borderWidth ? operators_1.fillAndStroke()
            : options.color ? operators_1.fill()
                : options.borderColor ? operators_1.stroke()
                    : operators_1.closePath(),
        operators_1.popGraphicsState(),
    ]).filter(Boolean);
};
exports.drawSvgPath = function (path, options) {
    return tslib_1.__spreadArrays([
        operators_1.pushGraphicsState(),
        operators_1.translate(options.x, options.y),
        // SVG path Y axis is opposite pdf-lib's
        options.scale ? operators_1.scale(options.scale, -options.scale) : operators_1.scale(1, -1),
        options.color && colors_1.setFillingColor(options.color),
        options.borderColor && colors_1.setStrokingColor(options.borderColor),
        options.borderWidth && operators_1.setLineWidth(options.borderWidth)
    ], svgPath_1.svgPathToOperators(path), [
        // prettier-ignore
        options.color && options.borderWidth ? operators_1.fillAndStroke()
            : options.color ? operators_1.fill()
                : options.borderColor ? operators_1.stroke()
                    : operators_1.closePath(),
        operators_1.popGraphicsState(),
    ]).filter(Boolean);
};
//# sourceMappingURL=operations.js.map