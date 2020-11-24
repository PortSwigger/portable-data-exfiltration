"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var RotationTypes;
(function (RotationTypes) {
    RotationTypes["Degrees"] = "degrees";
    RotationTypes["Radians"] = "radians";
})(RotationTypes = exports.RotationTypes || (exports.RotationTypes = {}));
exports.radians = function (radianAngle) {
    utils_1.assertIs(radianAngle, 'radianAngle', ['number']);
    return { type: RotationTypes.Radians, angle: radianAngle };
};
exports.degrees = function (degreeAngle) {
    utils_1.assertIs(degreeAngle, 'degreeAngle', ['number']);
    return { type: RotationTypes.Degrees, angle: degreeAngle };
};
var Radians = RotationTypes.Radians, Degrees = RotationTypes.Degrees;
exports.degreesToRadians = function (degree) { return (degree * Math.PI) / 180; };
exports.radiansToDegrees = function (radian) { return (radian * 180) / Math.PI; };
// prettier-ignore
exports.toRadians = function (rotation) {
    return rotation.type === Radians ? rotation.angle
        : rotation.type === Degrees ? exports.degreesToRadians(rotation.angle)
            : utils_1.error("Invalid rotation: " + JSON.stringify(rotation));
};
// prettier-ignore
exports.toDegrees = function (rotation) {
    return rotation.type === Radians ? exports.radiansToDegrees(rotation.angle)
        : rotation.type === Degrees ? rotation.angle
            : utils_1.error("Invalid rotation: " + JSON.stringify(rotation));
};
//# sourceMappingURL=rotations.js.map