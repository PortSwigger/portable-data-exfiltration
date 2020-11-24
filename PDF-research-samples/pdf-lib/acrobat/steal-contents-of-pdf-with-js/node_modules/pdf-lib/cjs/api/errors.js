"use strict";
// tslint:disable: max-classes-per-file
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// TODO: Include link to documentation with example
var EncryptedPDFError = /** @class */ (function (_super) {
    tslib_1.__extends(EncryptedPDFError, _super);
    function EncryptedPDFError() {
        var _this = this;
        var msg = 'Input document to `PDFDocument.load` is encrypted. You can use `PDFDocument.load(..., { ignoreEncryption: true })` if you wish to load the document anyways.';
        _this = _super.call(this, msg) || this;
        return _this;
    }
    return EncryptedPDFError;
}(Error));
exports.EncryptedPDFError = EncryptedPDFError;
// TODO: Include link to documentation with example
var FontkitNotRegisteredError = /** @class */ (function (_super) {
    tslib_1.__extends(FontkitNotRegisteredError, _super);
    function FontkitNotRegisteredError() {
        var _this = this;
        var msg = 'Input to `PDFDocument.embedFont` was a custom font, but no `fontkit` instance was found. You must register a `fontkit` instance with `PDFDocument.registerFontkit(...)` before embedding custom fonts.';
        _this = _super.call(this, msg) || this;
        return _this;
    }
    return FontkitNotRegisteredError;
}(Error));
exports.FontkitNotRegisteredError = FontkitNotRegisteredError;
// TODO: Include link to documentation with example
var ForeignPageError = /** @class */ (function (_super) {
    tslib_1.__extends(ForeignPageError, _super);
    function ForeignPageError() {
        var _this = this;
        var msg = 'A `page` passed to `PDFDocument.addPage` or `PDFDocument.insertPage` was from a different (foreign) PDF document. If you want to copy pages from one PDFDocument to another, you must use `PDFDocument.copyPages(...)` to copy the pages before adding or inserting them.';
        _this = _super.call(this, msg) || this;
        return _this;
    }
    return ForeignPageError;
}(Error));
exports.ForeignPageError = ForeignPageError;
// TODO: Include link to documentation with example
var RemovePageFromEmptyDocumentError = /** @class */ (function (_super) {
    tslib_1.__extends(RemovePageFromEmptyDocumentError, _super);
    function RemovePageFromEmptyDocumentError() {
        var _this = this;
        var msg = 'PDFDocument has no pages so `PDFDocument.removePage` cannot be called';
        _this = _super.call(this, msg) || this;
        return _this;
    }
    return RemovePageFromEmptyDocumentError;
}(Error));
exports.RemovePageFromEmptyDocumentError = RemovePageFromEmptyDocumentError;
//# sourceMappingURL=errors.js.map