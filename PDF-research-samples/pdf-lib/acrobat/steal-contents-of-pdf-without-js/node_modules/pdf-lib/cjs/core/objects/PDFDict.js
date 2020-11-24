"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var PDFObject_1 = tslib_1.__importDefault(require("./PDFObject"));
var CharCodes_1 = tslib_1.__importDefault(require("../syntax/CharCodes"));
var PDFDict = /** @class */ (function (_super) {
    tslib_1.__extends(PDFDict, _super);
    function PDFDict(map, context) {
        var _this = _super.call(this) || this;
        _this.dict = map;
        _this.context = context;
        return _this;
    }
    PDFDict.prototype.entries = function () {
        return Array.from(this.dict.entries());
    };
    PDFDict.prototype.set = function (key, value) {
        this.dict.set(key, value);
    };
    PDFDict.prototype.get = function (key) {
        return this.dict.get(key);
    };
    PDFDict.prototype.has = function (key) {
        return this.dict.has(key);
    };
    PDFDict.prototype.lookupMaybe = function (key, type) {
        return this.context.lookupMaybe(this.get(key), type);
    };
    PDFDict.prototype.lookup = function (key, type) {
        return this.context.lookup(this.get(key), type);
    };
    PDFDict.prototype.delete = function (key) {
        return this.dict.delete(key);
    };
    PDFDict.prototype.clone = function (context) {
        var clone = PDFDict.withContext(context || this.context);
        var entries = this.entries();
        for (var idx = 0, len = entries.length; idx < len; idx++) {
            var _a = entries[idx], key = _a[0], value = _a[1];
            clone.set(key, value);
        }
        return clone;
    };
    PDFDict.prototype.toString = function () {
        var dictString = '<<\n';
        var entries = this.entries();
        for (var idx = 0, len = entries.length; idx < len; idx++) {
            var _a = entries[idx], key = _a[0], value = _a[1];
            dictString += key.toString() + ' ' + value.toString() + '\n';
        }
        dictString += '>>';
        return dictString;
    };
    PDFDict.prototype.sizeInBytes = function () {
        var size = 5;
        var entries = this.entries();
        for (var idx = 0, len = entries.length; idx < len; idx++) {
            var _a = entries[idx], key = _a[0], value = _a[1];
            size += key.sizeInBytes() + value.sizeInBytes() + 2;
        }
        return size;
    };
    PDFDict.prototype.copyBytesInto = function (buffer, offset) {
        var initialOffset = offset;
        buffer[offset++] = CharCodes_1.default.LessThan;
        buffer[offset++] = CharCodes_1.default.LessThan;
        buffer[offset++] = CharCodes_1.default.Newline;
        var entries = this.entries();
        for (var idx = 0, len = entries.length; idx < len; idx++) {
            var _a = entries[idx], key = _a[0], value = _a[1];
            offset += key.copyBytesInto(buffer, offset);
            buffer[offset++] = CharCodes_1.default.Space;
            offset += value.copyBytesInto(buffer, offset);
            buffer[offset++] = CharCodes_1.default.Newline;
        }
        buffer[offset++] = CharCodes_1.default.GreaterThan;
        buffer[offset++] = CharCodes_1.default.GreaterThan;
        return offset - initialOffset;
    };
    PDFDict.withContext = function (context) { return new PDFDict(new Map(), context); };
    PDFDict.fromMapWithContext = function (map, context) {
        return new PDFDict(map, context);
    };
    return PDFDict;
}(PDFObject_1.default));
exports.default = PDFDict;
//# sourceMappingURL=PDFDict.js.map