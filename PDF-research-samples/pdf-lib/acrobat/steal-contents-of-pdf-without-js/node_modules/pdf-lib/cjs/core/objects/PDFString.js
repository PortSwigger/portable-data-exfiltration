"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var PDFObject_1 = tslib_1.__importDefault(require("./PDFObject"));
var CharCodes_1 = tslib_1.__importDefault(require("../syntax/CharCodes"));
var utils_1 = require("../../utils");
var PDFString = /** @class */ (function (_super) {
    tslib_1.__extends(PDFString, _super);
    function PDFString(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    PDFString.prototype.clone = function () {
        return PDFString.of(this.value);
    };
    PDFString.prototype.toString = function () {
        return "(" + this.value + ")";
    };
    PDFString.prototype.sizeInBytes = function () {
        return this.value.length + 2;
    };
    PDFString.prototype.copyBytesInto = function (buffer, offset) {
        buffer[offset++] = CharCodes_1.default.LeftParen;
        offset += utils_1.copyStringIntoBuffer(this.value, buffer, offset);
        buffer[offset++] = CharCodes_1.default.RightParen;
        return this.value.length + 2;
    };
    // The PDF spec allows newlines and parens to appear directly within a literal
    // string. These character _may_ be escaped. But they do not _have_ to be. So
    // for simplicity, we will not bother escaping them.
    PDFString.of = function (value) { return new PDFString(value); };
    PDFString.fromDate = function (date) {
        var year = utils_1.padStart(String(date.getUTCFullYear()), 4, '0');
        var month = utils_1.padStart(String(date.getUTCMonth() + 1), 2, '0');
        var day = utils_1.padStart(String(date.getUTCDate()), 2, '0');
        var hours = utils_1.padStart(String(date.getUTCHours()), 2, '0');
        var mins = utils_1.padStart(String(date.getUTCMinutes()), 2, '0');
        var secs = utils_1.padStart(String(date.getUTCSeconds()), 2, '0');
        return new PDFString("D:" + year + month + day + hours + mins + secs + "Z");
    };
    return PDFString;
}(PDFObject_1.default));
exports.default = PDFString;
//# sourceMappingURL=PDFString.js.map