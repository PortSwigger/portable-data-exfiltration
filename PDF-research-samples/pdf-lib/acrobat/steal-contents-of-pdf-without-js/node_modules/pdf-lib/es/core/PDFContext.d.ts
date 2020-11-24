import PDFHeader from "./document/PDFHeader";
import PDFArray from "./objects/PDFArray";
import PDFBool from "./objects/PDFBool";
import PDFDict from "./objects/PDFDict";
import PDFHexString from "./objects/PDFHexString";
import PDFName from "./objects/PDFName";
import PDFNull from "./objects/PDFNull";
import PDFNumber from "./objects/PDFNumber";
import PDFObject from "./objects/PDFObject";
import PDFRawStream from "./objects/PDFRawStream";
import PDFRef from "./objects/PDFRef";
import PDFStream from "./objects/PDFStream";
import PDFString from "./objects/PDFString";
declare type LookupKey = PDFRef | PDFObject | undefined;
interface LiteralObject {
    [name: string]: Literal | PDFObject;
}
interface LiteralArray {
    [index: number]: Literal | PDFObject;
}
declare type Literal = LiteralObject | LiteralArray | string | number | boolean | null | undefined;
declare class PDFContext {
    static create: () => PDFContext;
    largestObjectNumber: number;
    header: PDFHeader;
    trailerInfo: {
        Root?: PDFObject;
        Encrypt?: PDFObject;
        Info?: PDFObject;
        ID?: PDFObject;
    };
    private readonly indirectObjects;
    private pushGraphicsStateContentStreamRef?;
    private popGraphicsStateContentStreamRef?;
    private constructor();
    assign(ref: PDFRef, object: PDFObject): void;
    nextRef(): PDFRef;
    register(object: PDFObject): PDFRef;
    delete(ref: PDFRef): boolean;
    lookupMaybe(ref: LookupKey, type: typeof PDFArray): PDFArray | undefined;
    lookupMaybe(ref: LookupKey, type: typeof PDFBool): PDFBool | undefined;
    lookupMaybe(ref: LookupKey, type: typeof PDFDict): PDFDict | undefined;
    lookupMaybe(ref: LookupKey, type: typeof PDFHexString): PDFHexString | undefined;
    lookupMaybe(ref: LookupKey, type: typeof PDFName): PDFName | undefined;
    lookupMaybe(ref: LookupKey, type: typeof PDFNull): typeof PDFNull | undefined;
    lookupMaybe(ref: LookupKey, type: typeof PDFNumber): PDFNumber | undefined;
    lookupMaybe(ref: LookupKey, type: typeof PDFStream): PDFStream | undefined;
    lookupMaybe(ref: LookupKey, type: typeof PDFRef): PDFRef | undefined;
    lookupMaybe(ref: LookupKey, type: typeof PDFString): PDFString | undefined;
    lookup(ref: LookupKey): PDFObject | undefined;
    lookup(ref: LookupKey, type: typeof PDFArray): PDFArray;
    lookup(ref: LookupKey, type: typeof PDFBool): PDFBool;
    lookup(ref: LookupKey, type: typeof PDFDict): PDFDict;
    lookup(ref: LookupKey, type: typeof PDFHexString): PDFHexString;
    lookup(ref: LookupKey, type: typeof PDFName): PDFName;
    lookup(ref: LookupKey, type: typeof PDFNull): typeof PDFNull;
    lookup(ref: LookupKey, type: typeof PDFNumber): PDFNumber;
    lookup(ref: LookupKey, type: typeof PDFStream): PDFStream;
    lookup(ref: LookupKey, type: typeof PDFRef): PDFRef;
    lookup(ref: LookupKey, type: typeof PDFString): PDFString;
    enumerateIndirectObjects(): Array<[PDFRef, PDFObject]>;
    obj(literal: null | undefined): typeof PDFNull;
    obj(literal: string): PDFName;
    obj(literal: number): PDFNumber;
    obj(literal: boolean): PDFBool;
    obj(literal: LiteralObject): PDFDict;
    obj(literal: LiteralArray): PDFArray;
    stream(contents: string | Uint8Array, dict?: LiteralObject): PDFRawStream;
    flateStream(contents: string | Uint8Array, dict?: LiteralObject): PDFRawStream;
    getPushGraphicsStateContentStream(): PDFRef;
    getPopGraphicsStateContentStream(): PDFRef;
}
export default PDFContext;
//# sourceMappingURL=PDFContext.d.ts.map