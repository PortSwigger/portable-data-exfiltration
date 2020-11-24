import { __extends } from "tslib";
import PDFObject from "./PDFObject";
import CharCodes from "../syntax/CharCodes";
import { copyStringIntoBuffer, padStart } from "../../utils";
var PDFString = /** @class */ (function (_super) {
    __extends(PDFString, _super);
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
        buffer[offset++] = CharCodes.LeftParen;
        offset += copyStringIntoBuffer(this.value, buffer, offset);
        buffer[offset++] = CharCodes.RightParen;
        return this.value.length + 2;
    };
    // The PDF spec allows newlines and parens to appear directly within a literal
    // string. These character _may_ be escaped. But they do not _have_ to be. So
    // for simplicity, we will not bother escaping them.
    PDFString.of = function (value) { return new PDFString(value); };
    PDFString.fromDate = function (date) {
        var year = padStart(String(date.getUTCFullYear()), 4, '0');
        var month = padStart(String(date.getUTCMonth() + 1), 2, '0');
        var day = padStart(String(date.getUTCDate()), 2, '0');
        var hours = padStart(String(date.getUTCHours()), 2, '0');
        var mins = padStart(String(date.getUTCMinutes()), 2, '0');
        var secs = padStart(String(date.getUTCSeconds()), 2, '0');
        return new PDFString("D:" + year + month + day + hours + mins + secs + "Z");
    };
    return PDFString;
}(PDFObject));
export default PDFString;
//# sourceMappingURL=PDFString.js.map