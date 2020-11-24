import { Color } from "./colors";
import { Rotation } from "./rotations";
import { PDFHexString, PDFName, PDFNumber, PDFOperator } from "../core";
export interface DrawTextOptions {
    color: Color;
    font: string | PDFName;
    size: number | PDFNumber;
    rotate: Rotation;
    xSkew: Rotation;
    ySkew: Rotation;
    x: number | PDFNumber;
    y: number | PDFNumber;
}
export declare const drawText: (line: PDFHexString, options: DrawTextOptions) => PDFOperator[];
export interface DrawLinesOfTextOptions extends DrawTextOptions {
    lineHeight: number | PDFNumber;
}
export declare const drawLinesOfText: (lines: PDFHexString[], options: DrawLinesOfTextOptions) => PDFOperator[];
export declare const drawImage: (name: string | PDFName, options: {
    x: number | PDFNumber;
    y: number | PDFNumber;
    width: number | PDFNumber;
    height: number | PDFNumber;
    rotate: Rotation;
    xSkew: Rotation;
    ySkew: Rotation;
}) => PDFOperator[];
export declare const drawPage: (name: string | PDFName, options: {
    x: number | PDFNumber;
    y: number | PDFNumber;
    xScale: number | PDFNumber;
    yScale: number | PDFNumber;
    rotate: Rotation;
    xSkew: Rotation;
    ySkew: Rotation;
}) => PDFOperator[];
export declare const drawLine: (options: {
    start: {
        x: number | PDFNumber;
        y: number | PDFNumber;
    };
    end: {
        x: number | PDFNumber;
        y: number | PDFNumber;
    };
    thickness: number | PDFNumber;
    color: import("./colors").Grayscale | import("./colors").RGB | import("./colors").CMYK | undefined;
}) => PDFOperator[];
export declare const drawRectangle: (options: {
    x: number | PDFNumber;
    y: number | PDFNumber;
    width: number | PDFNumber;
    height: number | PDFNumber;
    borderWidth: number | PDFNumber;
    color: import("./colors").Grayscale | import("./colors").RGB | import("./colors").CMYK | undefined;
    borderColor: import("./colors").Grayscale | import("./colors").RGB | import("./colors").CMYK | undefined;
    rotate: Rotation;
    xSkew: Rotation;
    ySkew: Rotation;
}) => PDFOperator[];
export declare const drawEllipsePath: (config: {
    x: number | PDFNumber;
    y: number | PDFNumber;
    xScale: number | PDFNumber;
    yScale: number | PDFNumber;
}) => PDFOperator[];
export declare const drawEllipse: (options: {
    x: number | PDFNumber;
    y: number | PDFNumber;
    xScale: number | PDFNumber;
    yScale: number | PDFNumber;
    color: import("./colors").Grayscale | import("./colors").RGB | import("./colors").CMYK | undefined;
    borderColor: import("./colors").Grayscale | import("./colors").RGB | import("./colors").CMYK | undefined;
    borderWidth: number | PDFNumber;
}) => PDFOperator[];
export declare const drawSvgPath: (path: string, options: {
    x: number | PDFNumber;
    y: number | PDFNumber;
    scale: number | PDFNumber | undefined;
    color: import("./colors").Grayscale | import("./colors").RGB | import("./colors").CMYK | undefined;
    borderColor: import("./colors").Grayscale | import("./colors").RGB | import("./colors").CMYK | undefined;
    borderWidth: number | PDFNumber;
}) => PDFOperator[];
//# sourceMappingURL=operations.d.ts.map