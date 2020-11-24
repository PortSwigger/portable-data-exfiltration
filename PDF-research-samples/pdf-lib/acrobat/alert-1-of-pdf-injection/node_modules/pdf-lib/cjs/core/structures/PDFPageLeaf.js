"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var PDFArray_1 = tslib_1.__importDefault(require("../objects/PDFArray"));
var PDFDict_1 = tslib_1.__importDefault(require("../objects/PDFDict"));
var PDFName_1 = tslib_1.__importDefault(require("../objects/PDFName"));
var PDFNumber_1 = tslib_1.__importDefault(require("../objects/PDFNumber"));
var PDFStream_1 = tslib_1.__importDefault(require("../objects/PDFStream"));
var PDFPageLeaf = /** @class */ (function (_super) {
    tslib_1.__extends(PDFPageLeaf, _super);
    function PDFPageLeaf(map, context, autoNormalizeCTM) {
        if (autoNormalizeCTM === void 0) { autoNormalizeCTM = true; }
        var _this = _super.call(this, map, context) || this;
        _this.normalized = false;
        _this.autoNormalizeCTM = autoNormalizeCTM;
        return _this;
    }
    PDFPageLeaf.prototype.clone = function (context) {
        var clone = PDFPageLeaf.fromMapWithContext(new Map(), context || this.context, this.autoNormalizeCTM);
        var entries = this.entries();
        for (var idx = 0, len = entries.length; idx < len; idx++) {
            var _a = entries[idx], key = _a[0], value = _a[1];
            clone.set(key, value);
        }
        return clone;
    };
    PDFPageLeaf.prototype.Parent = function () {
        return this.lookupMaybe(PDFName_1.default.Parent, PDFDict_1.default);
    };
    PDFPageLeaf.prototype.Contents = function () {
        return this.lookup(PDFName_1.default.of('Contents'));
    };
    PDFPageLeaf.prototype.Annots = function () {
        return this.lookupMaybe(PDFName_1.default.Annots, PDFArray_1.default);
    };
    PDFPageLeaf.prototype.BleedBox = function () {
        return this.lookupMaybe(PDFName_1.default.BleedBox, PDFArray_1.default);
    };
    PDFPageLeaf.prototype.TrimBox = function () {
        return this.lookupMaybe(PDFName_1.default.TrimBox, PDFArray_1.default);
    };
    PDFPageLeaf.prototype.Resources = function () {
        var dictOrRef = this.getInheritableAttribute(PDFName_1.default.Resources);
        return this.context.lookupMaybe(dictOrRef, PDFDict_1.default);
    };
    PDFPageLeaf.prototype.MediaBox = function () {
        var arrayOrRef = this.getInheritableAttribute(PDFName_1.default.MediaBox);
        return this.context.lookup(arrayOrRef, PDFArray_1.default);
    };
    PDFPageLeaf.prototype.CropBox = function () {
        var arrayOrRef = this.getInheritableAttribute(PDFName_1.default.CropBox);
        return this.context.lookupMaybe(arrayOrRef, PDFArray_1.default);
    };
    PDFPageLeaf.prototype.Rotate = function () {
        var numberOrRef = this.getInheritableAttribute(PDFName_1.default.Rotate);
        return this.context.lookupMaybe(numberOrRef, PDFNumber_1.default);
    };
    PDFPageLeaf.prototype.getInheritableAttribute = function (name) {
        var attribute;
        this.ascend(function (node) {
            if (!attribute)
                attribute = node.get(name);
        });
        return attribute;
    };
    PDFPageLeaf.prototype.setParent = function (parentRef) {
        this.set(PDFName_1.default.Parent, parentRef);
    };
    PDFPageLeaf.prototype.addContentStream = function (contentStreamRef) {
        var Contents = this.normalizedEntries().Contents || this.context.obj([]);
        this.set(PDFName_1.default.Contents, Contents);
        Contents.push(contentStreamRef);
    };
    PDFPageLeaf.prototype.wrapContentStreams = function (startStream, endStream) {
        var Contents = this.Contents();
        if (Contents instanceof PDFArray_1.default) {
            Contents.insert(0, startStream);
            Contents.push(endStream);
            return true;
        }
        return false;
    };
    PDFPageLeaf.prototype.setFontDictionary = function (name, fontDictRef) {
        var Font = this.normalizedEntries().Font;
        Font.set(name, fontDictRef);
    };
    PDFPageLeaf.prototype.setXObject = function (name, xObjectRef) {
        var XObject = this.normalizedEntries().XObject;
        XObject.set(name, xObjectRef);
    };
    PDFPageLeaf.prototype.ascend = function (visitor) {
        visitor(this);
        var Parent = this.Parent();
        if (Parent)
            Parent.ascend(visitor);
    };
    PDFPageLeaf.prototype.normalize = function () {
        if (this.normalized)
            return;
        var context = this.context;
        var contentsRef = this.get(PDFName_1.default.Contents);
        var contents = this.context.lookup(contentsRef);
        if (contents instanceof PDFStream_1.default) {
            this.set(PDFName_1.default.Contents, context.obj([contentsRef]));
        }
        if (this.autoNormalizeCTM) {
            this.wrapContentStreams(this.context.getPushGraphicsStateContentStream(), this.context.getPopGraphicsStateContentStream());
        }
        // TODO: Clone `Resources` if it is inherited
        var dictOrRef = this.getInheritableAttribute(PDFName_1.default.Resources);
        var Resources = context.lookupMaybe(dictOrRef, PDFDict_1.default) || context.obj({});
        this.set(PDFName_1.default.Resources, Resources);
        // TODO: Clone `Font` if it is inherited
        var Font = Resources.lookupMaybe(PDFName_1.default.Font, PDFDict_1.default) || context.obj({});
        Resources.set(PDFName_1.default.Font, Font);
        // TODO: Clone `XObject` if it is inherited
        var XObject = Resources.lookupMaybe(PDFName_1.default.XObject, PDFDict_1.default) || context.obj({});
        Resources.set(PDFName_1.default.XObject, XObject);
        this.normalized = true;
    };
    PDFPageLeaf.prototype.normalizedEntries = function () {
        this.normalize();
        var Resources = this.Resources();
        var Contents = this.Contents();
        return {
            Resources: Resources,
            Contents: Contents,
            Font: Resources.lookup(PDFName_1.default.Font, PDFDict_1.default),
            XObject: Resources.lookup(PDFName_1.default.XObject, PDFDict_1.default),
        };
    };
    PDFPageLeaf.InheritableEntries = [
        'Resources',
        'MediaBox',
        'CropBox',
        'Rotate',
    ];
    PDFPageLeaf.withContextAndParent = function (context, parent) {
        var dict = new Map();
        dict.set(PDFName_1.default.Type, PDFName_1.default.Page);
        dict.set(PDFName_1.default.Parent, parent);
        dict.set(PDFName_1.default.Resources, context.obj({}));
        dict.set(PDFName_1.default.MediaBox, context.obj([0, 0, 612, 792]));
        return new PDFPageLeaf(dict, context, false);
    };
    PDFPageLeaf.fromMapWithContext = function (map, context, autoNormalizeCTM) {
        if (autoNormalizeCTM === void 0) { autoNormalizeCTM = true; }
        return new PDFPageLeaf(map, context, autoNormalizeCTM);
    };
    return PDFPageLeaf;
}(PDFDict_1.default));
exports.default = PDFPageLeaf;
//# sourceMappingURL=PDFPageLeaf.js.map