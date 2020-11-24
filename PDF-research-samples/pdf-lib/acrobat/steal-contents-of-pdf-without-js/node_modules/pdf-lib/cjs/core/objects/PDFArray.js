"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var PDFObject_1 = tslib_1.__importDefault(require("./PDFObject"));
var CharCodes_1 = tslib_1.__importDefault(require("../syntax/CharCodes"));
var PDFArray = /** @class */ (function (_super) {
    tslib_1.__extends(PDFArray, _super);
    function PDFArray(context) {
        var _this = _super.call(this) || this;
        _this.array = [];
        _this.context = context;
        return _this;
    }
    PDFArray.prototype.size = function () {
        return this.array.length;
    };
    PDFArray.prototype.push = function (object) {
        this.array.push(object);
    };
    PDFArray.prototype.insert = function (index, object) {
        this.array.splice(index, 0, object);
    };
    PDFArray.prototype.remove = function (index) {
        this.array.splice(index, 1);
    };
    PDFArray.prototype.set = function (idx, object) {
        this.array[idx] = object;
    };
    PDFArray.prototype.get = function (index) {
        return this.array[index];
    };
    PDFArray.prototype.lookupMaybe = function (index, type) {
        return this.context.lookupMaybe(this.get(index), type);
    };
    PDFArray.prototype.lookup = function (index, type) {
        return this.context.lookup(this.get(index), type);
    };
    PDFArray.prototype.clone = function (context) {
        var clone = PDFArray.withContext(context || this.context);
        for (var idx = 0, len = this.size(); idx < len; idx++) {
            clone.push(this.array[idx]);
        }
        return clone;
    };
    PDFArray.prototype.toString = function () {
        var arrayString = '[ ';
        for (var idx = 0, len = this.size(); idx < len; idx++) {
            arrayString += this.get(idx).toString();
            arrayString += ' ';
        }
        arrayString += ']';
        return arrayString;
    };
    PDFArray.prototype.sizeInBytes = function () {
        var size = 3;
        for (var idx = 0, len = this.size(); idx < len; idx++) {
            size += this.get(idx).sizeInBytes() + 1;
        }
        return size;
    };
    PDFArray.prototype.copyBytesInto = function (buffer, offset) {
        var initialOffset = offset;
        buffer[offset++] = CharCodes_1.default.LeftSquareBracket;
        buffer[offset++] = CharCodes_1.default.Space;
        for (var idx = 0, len = this.size(); idx < len; idx++) {
            offset += this.get(idx).copyBytesInto(buffer, offset);
            buffer[offset++] = CharCodes_1.default.Space;
        }
        buffer[offset++] = CharCodes_1.default.RightSquareBracket;
        return offset - initialOffset;
    };
    PDFArray.withContext = function (context) { return new PDFArray(context); };
    return PDFArray;
}(PDFObject_1.default));
exports.default = PDFArray;
//# sourceMappingURL=PDFArray.js.map