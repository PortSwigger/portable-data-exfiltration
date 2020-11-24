// tslint:disable: max-classes-per-file
import { __extends } from "tslib";
// TODO: Include link to documentation with example
var EncryptedPDFError = /** @class */ (function (_super) {
    __extends(EncryptedPDFError, _super);
    function EncryptedPDFError() {
        var _this = this;
        var msg = 'Input document to `PDFDocument.load` is encrypted. You can use `PDFDocument.load(..., { ignoreEncryption: true })` if you wish to load the document anyways.';
        _this = _super.call(this, msg) || this;
        return _this;
    }
    return EncryptedPDFError;
}(Error));
export { EncryptedPDFError };
// TODO: Include link to documentation with example
var FontkitNotRegisteredError = /** @class */ (function (_super) {
    __extends(FontkitNotRegisteredError, _super);
    function FontkitNotRegisteredError() {
        var _this = this;
        var msg = 'Input to `PDFDocument.embedFont` was a custom font, but no `fontkit` instance was found. You must register a `fontkit` instance with `PDFDocument.registerFontkit(...)` before embedding custom fonts.';
        _this = _super.call(this, msg) || this;
        return _this;
    }
    return FontkitNotRegisteredError;
}(Error));
export { FontkitNotRegisteredError };
// TODO: Include link to documentation with example
var ForeignPageError = /** @class */ (function (_super) {
    __extends(ForeignPageError, _super);
    function ForeignPageError() {
        var _this = this;
        var msg = 'A `page` passed to `PDFDocument.addPage` or `PDFDocument.insertPage` was from a different (foreign) PDF document. If you want to copy pages from one PDFDocument to another, you must use `PDFDocument.copyPages(...)` to copy the pages before adding or inserting them.';
        _this = _super.call(this, msg) || this;
        return _this;
    }
    return ForeignPageError;
}(Error));
export { ForeignPageError };
// TODO: Include link to documentation with example
var RemovePageFromEmptyDocumentError = /** @class */ (function (_super) {
    __extends(RemovePageFromEmptyDocumentError, _super);
    function RemovePageFromEmptyDocumentError() {
        var _this = this;
        var msg = 'PDFDocument has no pages so `PDFDocument.removePage` cannot be called';
        _this = _super.call(this, msg) || this;
        return _this;
    }
    return RemovePageFromEmptyDocumentError;
}(Error));
export { RemovePageFromEmptyDocumentError };
//# sourceMappingURL=errors.js.map