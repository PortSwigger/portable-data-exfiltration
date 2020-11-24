import { __extends } from "tslib";
import { PrivateConstructorError } from "../errors";
import PDFObject from "./PDFObject";
import CharCodes from "../syntax/CharCodes";
import { IsIrregular } from "../syntax/Irregular";
import { charFromHexCode, copyStringIntoBuffer, toCharCode, toHexString, } from "../../utils";
var decodeName = function (name) {
    return name.replace(/#([\dABCDEF]{2})/g, function (_, hex) { return charFromHexCode(hex); });
};
var isRegularChar = function (charCode) {
    return charCode >= CharCodes.ExclamationPoint &&
        charCode <= CharCodes.Tilde &&
        !IsIrregular[charCode];
};
var ENFORCER = {};
var pool = new Map();
var PDFName = /** @class */ (function (_super) {
    __extends(PDFName, _super);
    function PDFName(enforcer, name) {
        var _this = this;
        if (enforcer !== ENFORCER)
            throw new PrivateConstructorError('PDFName');
        _this = _super.call(this) || this;
        var encodedName = '/';
        for (var idx = 0, len = name.length; idx < len; idx++) {
            var character = name[idx];
            var code = toCharCode(character);
            encodedName += isRegularChar(code) ? character : "#" + toHexString(code);
        }
        _this.encodedName = encodedName;
        return _this;
    }
    PDFName.prototype.value = function () {
        return this.encodedName;
    };
    PDFName.prototype.clone = function () {
        return this;
    };
    PDFName.prototype.toString = function () {
        return this.encodedName;
    };
    PDFName.prototype.sizeInBytes = function () {
        return this.encodedName.length;
    };
    PDFName.prototype.copyBytesInto = function (buffer, offset) {
        offset += copyStringIntoBuffer(this.encodedName, buffer, offset);
        return this.encodedName.length;
    };
    PDFName.of = function (name) {
        var decodedValue = decodeName(name);
        var instance = pool.get(decodedValue);
        if (!instance) {
            instance = new PDFName(ENFORCER, decodedValue);
            pool.set(decodedValue, instance);
        }
        return instance;
    };
    /* tslint:disable member-ordering */
    PDFName.Length = PDFName.of('Length');
    PDFName.FlateDecode = PDFName.of('FlateDecode');
    PDFName.Resources = PDFName.of('Resources');
    PDFName.Font = PDFName.of('Font');
    PDFName.XObject = PDFName.of('XObject');
    PDFName.Contents = PDFName.of('Contents');
    PDFName.Type = PDFName.of('Type');
    PDFName.Parent = PDFName.of('Parent');
    PDFName.MediaBox = PDFName.of('MediaBox');
    PDFName.Page = PDFName.of('Page');
    PDFName.Annots = PDFName.of('Annots');
    PDFName.TrimBox = PDFName.of('TrimBox');
    PDFName.BleedBox = PDFName.of('BleedBox');
    PDFName.CropBox = PDFName.of('CropBox');
    PDFName.Rotate = PDFName.of('Rotate');
    return PDFName;
}(PDFObject));
export default PDFName;
//# sourceMappingURL=PDFName.js.map