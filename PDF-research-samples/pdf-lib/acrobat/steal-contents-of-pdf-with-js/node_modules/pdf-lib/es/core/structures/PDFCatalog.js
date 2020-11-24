import { __extends } from "tslib";
import PDFDict from "../objects/PDFDict";
import PDFName from "../objects/PDFName";
var PDFCatalog = /** @class */ (function (_super) {
    __extends(PDFCatalog, _super);
    function PDFCatalog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFCatalog.prototype.Pages = function () {
        return this.lookup(PDFName.of('Pages'), PDFDict);
    };
    /**
     * Inserts the given ref as a leaf node of this catalog's page tree at the
     * specified index (zero-based). Also increments the `Count` of each node in
     * the page tree hierarchy to accomodate the new page.
     *
     * Returns the ref of the PDFPageTree node into which `leafRef` was inserted.
     */
    PDFCatalog.prototype.insertLeafNode = function (leafRef, index) {
        var pagesRef = this.get(PDFName.of('Pages'));
        var maybeParentRef = this.Pages().insertLeafNode(leafRef, index);
        return maybeParentRef || pagesRef;
    };
    PDFCatalog.prototype.removeLeafNode = function (index) {
        this.Pages().removeLeafNode(index);
    };
    PDFCatalog.withContextAndPages = function (context, pages) {
        var dict = new Map();
        dict.set(PDFName.of('Type'), PDFName.of('Catalog'));
        dict.set(PDFName.of('Pages'), pages);
        return new PDFCatalog(dict, context);
    };
    PDFCatalog.fromMapWithContext = function (map, context) {
        return new PDFCatalog(map, context);
    };
    return PDFCatalog;
}(PDFDict));
export default PDFCatalog;
//# sourceMappingURL=PDFCatalog.js.map