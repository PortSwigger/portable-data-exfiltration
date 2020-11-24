import { assertIs, error } from "../utils";
export var RotationTypes;
(function (RotationTypes) {
    RotationTypes["Degrees"] = "degrees";
    RotationTypes["Radians"] = "radians";
})(RotationTypes || (RotationTypes = {}));
export var radians = function (radianAngle) {
    assertIs(radianAngle, 'radianAngle', ['number']);
    return { type: RotationTypes.Radians, angle: radianAngle };
};
export var degrees = function (degreeAngle) {
    assertIs(degreeAngle, 'degreeAngle', ['number']);
    return { type: RotationTypes.Degrees, angle: degreeAngle };
};
var Radians = RotationTypes.Radians, Degrees = RotationTypes.Degrees;
export var degreesToRadians = function (degree) { return (degree * Math.PI) / 180; };
export var radiansToDegrees = function (radian) { return (radian * 180) / Math.PI; };
// prettier-ignore
export var toRadians = function (rotation) {
    return rotation.type === Radians ? rotation.angle
        : rotation.type === Degrees ? degreesToRadians(rotation.angle)
            : error("Invalid rotation: " + JSON.stringify(rotation));
};
// prettier-ignore
export var toDegrees = function (rotation) {
    return rotation.type === Radians ? radiansToDegrees(rotation.angle)
        : rotation.type === Degrees ? rotation.angle
            : error("Invalid rotation: " + JSON.stringify(rotation));
};
//# sourceMappingURL=rotations.js.map