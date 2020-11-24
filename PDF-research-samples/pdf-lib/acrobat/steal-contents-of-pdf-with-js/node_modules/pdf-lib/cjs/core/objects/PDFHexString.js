"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var PDFObject_1 = tslib_1.__importDefault(require("./PDFObject"));
var CharCodes_1 = tslib_1.__importDefault(require("../syntax/CharCodes"));
var utils_1 = require("../../utils");
var PDFHexString = /** @class */ (function (_super) {
    tslib_1.__extends(PDFHexString, _super);
    function PDFHexString(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    PDFHexString.prototype.clone = function () {
        return PDFHexString.of(this.value);
    };
    PDFHexString.prototype.toString = function () {
        return "<" + this.value + ">";
    };
    PDFHexString.prototype.sizeInBytes = function () {
        return this.value.length + 2;
    };
    PDFHexString.prototype.copyBytesInto = function (buffer, offset) {
        buffer[offset++] = CharCodes_1.default.LessThan;
        offset += utils_1.copyStringIntoBuffer(this.value, buffer, offset);
        buffer[offset++] = CharCodes_1.default.GreaterThan;
        return this.value.length + 2;
    };
    PDFHexString.of = function (value) { return new PDFHexString(value); };
    PDFHexString.fromText = function (value) {
        var encoded = utils_1.utf16Encode(value);
        var hex = '';
        for (var idx = 0, len = encoded.length; idx < len; idx++) {
            hex += utils_1.toHexStringOfMinLength(encoded[idx], 4);
        }
        return new PDFHexString(hex);
    };
    return PDFHexString;
}(PDFObject_1.default));
exports.default = PDFHexString;
//# sourceMappingURL=PDFHexString.js.map