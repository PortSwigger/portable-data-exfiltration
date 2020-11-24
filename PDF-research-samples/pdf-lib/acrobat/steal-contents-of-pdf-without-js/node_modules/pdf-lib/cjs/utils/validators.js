"use strict";
/* tslint:disable:ban-types */
Object.defineProperty(exports, "__esModule", { value: true });
exports.backtick = function (val) { return "`" + val + "`"; };
exports.getType = function (val) {
    if (val === null)
        return 'null';
    if (val === undefined)
        return 'undefined';
    if (typeof val === 'string')
        return 'string';
    if (isNaN(val))
        return 'NaN';
    if (typeof val === 'number')
        return 'number';
    if (typeof val === 'boolean')
        return 'boolean';
    if (typeof val === 'symbol')
        return 'symbol';
    if (typeof val === 'bigint')
        return 'bigint';
    if (val.constructor && val.constructor.name)
        return val.constructor.name;
    if (val.name)
        return val.name;
    if (val.constructor)
        return String(val.constructor);
    return String(val);
};
exports.isType = function (value, type) {
    if (type === 'null')
        return value === null;
    if (type === 'undefined')
        return value === undefined;
    if (type === 'string')
        return typeof value === 'string';
    if (type === 'number')
        return typeof value === 'number' && !isNaN(value);
    if (type === 'boolean')
        return typeof value === 'boolean';
    if (type === 'symbol')
        return typeof value === 'symbol';
    if (type === 'bigint')
        return typeof value === 'bigint';
    if (type === Array)
        return value instanceof Array;
    if (type === Uint8Array)
        return value instanceof Uint8Array;
    if (type === ArrayBuffer)
        return value instanceof ArrayBuffer;
    return value instanceof type[0];
};
exports.createTypeErrorMsg = function (value, valueName, types) {
    var allowedTypes = new Array(types.length);
    for (var idx = 0, len = types.length; idx < len; idx++) {
        var type = types[idx];
        if (type === 'null')
            allowedTypes[idx] = exports.backtick('null');
        if (type === 'undefined')
            allowedTypes[idx] = exports.backtick('undefined');
        if (type === 'string')
            allowedTypes[idx] = exports.backtick('string');
        else if (type === 'number')
            allowedTypes[idx] = exports.backtick('number');
        else if (type === 'boolean')
            allowedTypes[idx] = exports.backtick('boolean');
        else if (type === 'symbol')
            allowedTypes[idx] = exports.backtick('symbol');
        else if (type === 'bigint')
            allowedTypes[idx] = exports.backtick('bigint');
        else if (type === Array)
            allowedTypes[idx] = exports.backtick('Array');
        else if (type === Uint8Array)
            allowedTypes[idx] = exports.backtick('Uint8Array');
        else if (type === ArrayBuffer)
            allowedTypes[idx] = exports.backtick('ArrayBuffer');
        else
            allowedTypes[idx] = exports.backtick(type[1]);
    }
    var joinedTypes = allowedTypes.join(' or ');
    // prettier-ignore
    return exports.backtick(valueName) + " must be of type " + joinedTypes + ", but was actually of type " + exports.backtick(exports.getType(value));
};
exports.assertIs = function (value, valueName, types) {
    for (var idx = 0, len = types.length; idx < len; idx++) {
        if (exports.isType(value, types[idx]))
            return;
    }
    throw new TypeError(exports.createTypeErrorMsg(value, valueName, types));
};
exports.assertOrUndefined = function (value, valueName, types) {
    exports.assertIs(value, valueName, types.concat('undefined'));
};
exports.assertEachIs = function (values, valueName, types) {
    for (var idx = 0, len = values.length; idx < len; idx++) {
        exports.assertIs(values[idx], valueName, types);
    }
};
exports.assertRange = function (value, valueName, min, max) {
    exports.assertIs(value, valueName, ['number']);
    exports.assertIs(min, 'min', ['number']);
    exports.assertIs(max, 'max', ['number']);
    max = Math.max(min, max);
    if (value < min || value > max) {
        // prettier-ignore
        throw new Error(exports.backtick(valueName) + " must be at least " + min + " and at most " + max + ", but was actually " + value);
    }
};
exports.assertMultiple = function (value, valueName, multiplier) {
    exports.assertIs(value, valueName, ['number']);
    if (value % multiplier !== 0) {
        // prettier-ignore
        throw new Error(exports.backtick(valueName) + " must be a multiple of " + multiplier + ", but was actually " + value);
    }
};
//# sourceMappingURL=validators.js.map