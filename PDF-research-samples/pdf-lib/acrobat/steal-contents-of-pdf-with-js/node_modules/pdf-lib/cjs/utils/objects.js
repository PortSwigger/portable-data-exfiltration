"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var standard_fonts_1 = require("@pdf-lib/standard-fonts");
exports.values = function (obj) { return Object.keys(obj).map(function (k) { return obj[k]; }); };
exports.StandardFontValues = exports.values(standard_fonts_1.FontNames);
exports.isStandardFont = function (input) {
    return exports.StandardFontValues.includes(input);
};
//# sourceMappingURL=objects.js.map