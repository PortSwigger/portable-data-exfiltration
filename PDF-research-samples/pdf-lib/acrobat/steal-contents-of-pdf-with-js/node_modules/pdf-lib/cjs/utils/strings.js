"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCharCode = function (character) { return character.charCodeAt(0); };
exports.toCodePoint = function (character) { return character.codePointAt(0); };
exports.toHexStringOfMinLength = function (num, minLength) {
    return exports.padStart(num.toString(16), minLength, '0').toUpperCase();
};
exports.toHexString = function (num) { return exports.toHexStringOfMinLength(num, 2); };
exports.charFromCode = function (code) { return String.fromCharCode(code); };
exports.charFromHexCode = function (hex) { return exports.charFromCode(parseInt(hex, 16)); };
exports.padStart = function (value, length, padChar) {
    var padding = '';
    for (var idx = 0, len = length - value.length; idx < len; idx++) {
        padding += padChar;
    }
    return padding + value;
};
exports.copyStringIntoBuffer = function (str, buffer, offset) {
    var length = str.length;
    for (var idx = 0; idx < length; idx++) {
        buffer[offset++] = str.charCodeAt(idx);
    }
    return length;
};
exports.addRandomSuffix = function (prefix, suffixLength) {
    if (suffixLength === void 0) { suffixLength = 4; }
    return prefix + "-" + Math.floor(Math.random() * Math.pow(10, suffixLength));
};
exports.escapeRegExp = function (str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
exports.cleanText = function (text) {
    return text.replace(/\t/g, '    ').replace(/[\b\v]/g, '');
};
var buildWordBreakRegex = function (wordBreaks) {
    var escapedRules = ['$'];
    for (var idx = 0, len = wordBreaks.length; idx < len; idx++) {
        var wordBreak = wordBreaks[idx];
        if (wordBreak.includes('\n') || wordBreak.includes('\r')) {
            throw new TypeError('`wordBreak` must not include \\n or \\r');
        }
        escapedRules.push(wordBreak === '' ? '.' : exports.escapeRegExp(wordBreak));
    }
    var breakRules = escapedRules.join('|');
    return new RegExp("(\\n|\\r)|((.*?)(" + breakRules + "))", 'gm');
};
exports.breakTextIntoLines = function (text, wordBreaks, maxWidth, computeWidthOfText) {
    var regex = buildWordBreakRegex(wordBreaks);
    var words = exports.cleanText(text).match(regex);
    var currLine = '';
    var currWidth = 0;
    var lines = [];
    var pushCurrLine = function () {
        if (currLine !== '')
            lines.push(currLine);
        currLine = '';
        currWidth = 0;
    };
    for (var idx = 0, len = words.length; idx < len; idx++) {
        var word = words[idx];
        if (word === '\n' || word === '\r') {
            pushCurrLine();
        }
        else {
            var width = computeWidthOfText(word);
            if (currWidth + width > maxWidth)
                pushCurrLine();
            currLine += word;
            currWidth += width;
        }
    }
    pushCurrLine();
    return lines;
};
//# sourceMappingURL=strings.js.map