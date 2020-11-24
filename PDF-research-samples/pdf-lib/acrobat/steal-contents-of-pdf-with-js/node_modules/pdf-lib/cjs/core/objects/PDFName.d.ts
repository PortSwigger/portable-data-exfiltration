import PDFObject from "./PDFObject";
declare class PDFName extends PDFObject {
    static of: (name: string) => PDFName;
    static readonly Length: PDFName;
    static readonly FlateDecode: PDFName;
    static readonly Resources: PDFName;
    static readonly Font: PDFName;
    static readonly XObject: PDFName;
    static readonly Contents: PDFName;
    static readonly Type: PDFName;
    static readonly Parent: PDFName;
    static readonly MediaBox: PDFName;
    static readonly Page: PDFName;
    static readonly Annots: PDFName;
    static readonly TrimBox: PDFName;
    static readonly BleedBox: PDFName;
    static readonly CropBox: PDFName;
    static readonly Rotate: PDFName;
    private readonly encodedName;
    private constructor();
    value(): string;
    clone(): PDFName;
    toString(): string;
    sizeInBytes(): number;
    copyBytesInto(buffer: Uint8Array, offset: number): number;
}
export default PDFName;
//# sourceMappingURL=PDFName.d.ts.map