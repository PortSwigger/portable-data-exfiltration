import PDFDict, { DictMap } from "../objects/PDFDict";
import PDFRef from "../objects/PDFRef";
import PDFContext from "../PDFContext";
import PDFPageTree from "./PDFPageTree";
declare class PDFCatalog extends PDFDict {
    static withContextAndPages: (context: PDFContext, pages: PDFRef | PDFPageTree) => PDFCatalog;
    static fromMapWithContext: (map: DictMap, context: PDFContext) => PDFCatalog;
    Pages(): PDFPageTree;
    /**
     * Inserts the given ref as a leaf node of this catalog's page tree at the
     * specified index (zero-based). Also increments the `Count` of each node in
     * the page tree hierarchy to accomodate the new page.
     *
     * Returns the ref of the PDFPageTree node into which `leafRef` was inserted.
     */
    insertLeafNode(leafRef: PDFRef, index: number): PDFRef;
    removeLeafNode(index: number): void;
}
export default PDFCatalog;
//# sourceMappingURL=PDFCatalog.d.ts.map