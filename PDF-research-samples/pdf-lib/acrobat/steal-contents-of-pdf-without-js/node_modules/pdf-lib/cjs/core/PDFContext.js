"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var pako_1 = tslib_1.__importDefault(require("pako"));
var PDFHeader_1 = tslib_1.__importDefault(require("./document/PDFHeader"));
var errors_1 = require("./errors");
var PDFArray_1 = tslib_1.__importDefault(require("./objects/PDFArray"));
var PDFBool_1 = tslib_1.__importDefault(require("./objects/PDFBool"));
var PDFDict_1 = tslib_1.__importDefault(require("./objects/PDFDict"));
var PDFName_1 = tslib_1.__importDefault(require("./objects/PDFName"));
var PDFNull_1 = tslib_1.__importDefault(require("./objects/PDFNull"));
var PDFNumber_1 = tslib_1.__importDefault(require("./objects/PDFNumber"));
var PDFObject_1 = tslib_1.__importDefault(require("./objects/PDFObject"));
var PDFRawStream_1 = tslib_1.__importDefault(require("./objects/PDFRawStream"));
var PDFRef_1 = tslib_1.__importDefault(require("./objects/PDFRef"));
var PDFOperator_1 = tslib_1.__importDefault(require("./operators/PDFOperator"));
var PDFOperatorNames_1 = tslib_1.__importDefault(require("./operators/PDFOperatorNames"));
var PDFContentStream_1 = tslib_1.__importDefault(require("./structures/PDFContentStream"));
var utils_1 = require("../utils");
var byAscendingObjectNumber = function (_a, _b) {
    var a = _a[0];
    var b = _b[0];
    return a.objectNumber - b.objectNumber;
};
var PDFContext = /** @class */ (function () {
    function PDFContext() {
        this.largestObjectNumber = 0;
        this.header = PDFHeader_1.default.forVersion(1, 7);
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
        return PDFRef_1.default.of(this.largestObjectNumber);
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
        var result = ref instanceof PDFRef_1.default ? this.indirectObjects.get(ref) : ref;
        if (result && !(result instanceof type)) {
            throw new errors_1.UnexpectedObjectTypeError(type, result);
        }
        return result;
    };
    PDFContext.prototype.lookup = function (ref, type) {
        var result = ref instanceof PDFRef_1.default ? this.indirectObjects.get(ref) : ref;
        if (type && !(result instanceof type)) {
            throw new errors_1.UnexpectedObjectTypeError(type, result);
        }
        return result;
    };
    PDFContext.prototype.enumerateIndirectObjects = function () {
        return Array.from(this.indirectObjects.entries()).sort(byAscendingObjectNumber);
    };
    PDFContext.prototype.obj = function (literal) {
        if (literal instanceof PDFObject_1.default) {
            return literal;
        }
        else if (literal === null || literal === undefined) {
            return PDFNull_1.default;
        }
        else if (typeof literal === 'string') {
            return PDFName_1.default.of(literal);
        }
        else if (typeof literal === 'number') {
            return PDFNumber_1.default.of(literal);
        }
        else if (typeof literal === 'boolean') {
            return literal ? PDFBool_1.default.True : PDFBool_1.default.False;
        }
        else if (Array.isArray(literal)) {
            var array = PDFArray_1.default.withContext(this);
            for (var idx = 0, len = literal.length; idx < len; idx++) {
                array.push(this.obj(literal[idx]));
            }
            return array;
        }
        else {
            var dict = PDFDict_1.default.withContext(this);
            var keys = Object.keys(literal);
            for (var idx = 0, len = keys.length; idx < len; idx++) {
                var key = keys[idx];
                var value = literal[key];
                if (value !== undefined)
                    dict.set(PDFName_1.default.of(key), this.obj(value));
            }
            return dict;
        }
    };
    PDFContext.prototype.stream = function (contents, dict) {
        if (dict === void 0) { dict = {}; }
        return PDFRawStream_1.default.of(this.obj(dict), utils_1.typedArrayFor(contents));
    };
    PDFContext.prototype.flateStream = function (contents, dict) {
        if (dict === void 0) { dict = {}; }
        return this.stream(pako_1.default.deflate(utils_1.typedArrayFor(contents)), tslib_1.__assign(tslib_1.__assign({}, dict), { Filter: 'FlateDecode' }));
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
        var op = PDFOperator_1.default.of(PDFOperatorNames_1.default.PushGraphicsState);
        var stream = PDFContentStream_1.default.of(dict, [op]);
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
        var op = PDFOperator_1.default.of(PDFOperatorNames_1.default.PopGraphicsState);
        var stream = PDFContentStream_1.default.of(dict, [op]);
        this.popGraphicsStateContentStreamRef = this.register(stream);
        return this.popGraphicsStateContentStreamRef;
    };
    PDFContext.create = function () { return new PDFContext(); };
    return PDFContext;
}());
exports.default = PDFContext;
//# sourceMappingURL=PDFContext.js.map