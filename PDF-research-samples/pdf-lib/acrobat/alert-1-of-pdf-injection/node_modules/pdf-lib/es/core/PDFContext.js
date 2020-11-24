import { __assign } from "tslib";
import pako from 'pako';
import PDFHeader from "./document/PDFHeader";
import { UnexpectedObjectTypeError } from "./errors";
import PDFArray from "./objects/PDFArray";
import PDFBool from "./objects/PDFBool";
import PDFDict from "./objects/PDFDict";
import PDFName from "./objects/PDFName";
import PDFNull from "./objects/PDFNull";
import PDFNumber from "./objects/PDFNumber";
import PDFObject from "./objects/PDFObject";
import PDFRawStream from "./objects/PDFRawStream";
import PDFRef from "./objects/PDFRef";
import PDFOperator from "./operators/PDFOperator";
import Ops from "./operators/PDFOperatorNames";
import PDFContentStream from "./structures/PDFContentStream";
import { typedArrayFor } from "../utils";
var byAscendingObjectNumber = function (_a, _b) {
    var a = _a[0];
    var b = _b[0];
    return a.objectNumber - b.objectNumber;
};
var PDFContext = /** @class */ (function () {
    function PDFContext() {
        this.largestObjectNumber = 0;
        this.header = PDFHeader.forVersion(1, 7);
        this.trailerInfo = {};
        this.indirectObjects = new Map();
    }
    PDFContext.prototype.assign = function (ref, object) {
        this.indirectObjects.set(ref, object);
        if (ref.objectNumber > this.largestObjectNumber) {
            this.largestObjectNumber = ref.objectNumber;
        }
    };
    PDFContext.prototype.nextRef = function () {
        this.largestObjectNumber += 1;
        return PDFRef.of(this.largestObjectNumber);
    };
    PDFContext.prototype.register = function (object) {
        var ref = this.nextRef();
        this.assign(ref, object);
        return ref;
    };
    PDFContext.prototype.delete = function (ref) {
        return this.indirectObjects.delete(ref);
    };
    PDFContext.prototype.lookupMaybe = function (ref, type) {
        var result = ref instanceof PDFRef ? this.indirectObjects.get(ref) : ref;
        if (result && !(result instanceof type)) {
            throw new UnexpectedObjectTypeError(type, result);
        }
        return result;
    };
    PDFContext.prototype.lookup = function (ref, type) {
        var result = ref instanceof PDFRef ? this.indirectObjects.get(ref) : ref;
        if (type && !(result instanceof type)) {
            throw new UnexpectedObjectTypeError(type, result);
        }
        return result;
    };
    PDFContext.prototype.enumerateIndirectObjects = function () {
        return Array.from(this.indirectObjects.entries()).sort(byAscendingObjectNumber);
    };
    PDFContext.prototype.obj = function (literal) {
        if (literal instanceof PDFObject) {
            return literal;
        }
        else if (literal === null || literal === undefined) {
            return PDFNull;
        }
        else if (typeof literal === 'string') {
            return PDFName.of(literal);
        }
        else if (typeof literal === 'number') {
            return PDFNumber.of(literal);
        }
        else if (typeof literal === 'boolean') {
            return literal ? PDFBool.True : PDFBool.False;
        }
        else if (Array.isArray(literal)) {
            var array = PDFArray.withContext(this);
            for (var idx = 0, len = literal.length; idx < len; idx++) {
                array.push(this.obj(literal[idx]));
            }
            return array;
        }
        else {
            var dict = PDFDict.withContext(this);
            var keys = Object.keys(literal);
            for (var idx = 0, len = keys.length; idx < len; idx++) {
                var key = keys[idx];
                var value = literal[key];
                if (value !== undefined)
                    dict.set(PDFName.of(key), this.obj(value));
            }
            return dict;
        }
    };
    PDFContext.prototype.stream = function (contents, dict) {
        if (dict === void 0) { dict = {}; }
        return PDFRawStream.of(this.obj(dict), typedArrayFor(contents));
    };
    PDFContext.prototype.flateStream = function (contents, dict) {
        if (dict === void 0) { dict = {}; }
        return this.stream(pako.deflate(typedArrayFor(contents)), __assign(__assign({}, dict), { Filter: 'FlateDecode' }));
    };
    /*
     * Reference to PDFContentStream that contains a single PDFOperator: `q`.
     * Used by [[PDFPageLeaf]] instances to ensure that when content streams are
     * added to a modified PDF, they start in the default, unchanged graphics
     * state.
     */
    PDFContext.prototype.getPushGraphicsStateContentStream = function () {
        if (this.pushGraphicsStateContentStreamRef) {
            return this.pushGraphicsStateContentStreamRef;
        }
        var dict = this.obj({});
        var op = PDFOperator.of(Ops.PushGraphicsState);
        var stream = PDFContentStream.of(dict, [op]);
        this.pushGraphicsStateContentStreamRef = this.register(stream);
        return this.pushGraphicsStateContentStreamRef;
    };
    /*
     * Reference to PDFContentStream that contains a single PDFOperator: `Q`.
     * Used by [[PDFPageLeaf]] instances to ensure that when content streams are
     * added to a modified PDF, they start in the default, unchanged graphics
     * state.
     */
    PDFContext.prototype.getPopGraphicsStateContentStream = function () {
        if (this.popGraphicsStateContentStreamRef) {
            return this.popGraphicsStateContentStreamRef;
        }
        var dict = this.obj({});
        var op = PDFOperator.of(Ops.PopGraphicsState);
        var stream = PDFContentStream.of(dict, [op]);
        this.popGraphicsStateContentStreamRef = this.register(stream);
        return this.popGraphicsStateContentStreamRef;
    };
    PDFContext.create = function () { return new PDFContext(); };
    return PDFContext;
}());
export default PDFContext;
//# sourceMappingURL=PDFContext.js.map