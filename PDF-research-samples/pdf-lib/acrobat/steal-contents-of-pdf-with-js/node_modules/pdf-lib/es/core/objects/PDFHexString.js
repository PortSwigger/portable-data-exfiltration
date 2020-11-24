import { __extends } from "tslib";
import PDFObject from "./PDFObject";
import CharCodes from "../syntax/CharCodes";
import { copyStringIntoBuffer, toHexStringOfMinLength, utf16Encode, } from "../../utils";
var PDFHexString = /** @class */ (function (_super) {
    __extends(PDFHexString, _super);
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
        buffer[offset++] = CharCodes.LessThan;
        offset += copyStringIntoBuffer(this.value, buffer, offset);
        buffer[offset++] = CharCodes.GreaterThan;
        return this.value.length + 2;
    };
    PDFHexString.of = function (value) { return new PDFHexString(value); };
    PDFHexString.fromText = function (value) {
        var encoded = utf16Encode(value);
        var hex = '';
        for (var idx = 0, len = encoded.length; idx < len; idx++) {
            hex += toHexStringOfMinLength(encoded[idx], 4);
        }
        return new PDFHexString(hex);
    };
    return PDFHexString;
}(PDFObject));
export default PDFHexString;
//# sourceMappingURL=PDFHexString.js.map