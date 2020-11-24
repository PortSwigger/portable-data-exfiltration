export var toCharCode = function (character) { return character.charCodeAt(0); };
export var toCodePoint = function (character) { return character.codePointAt(0); };
export var toHexStringOfMinLength = function (num, minLength) {
    return padStart(num.toString(16), minLength, '0').toUpperCase();
};
export var toHexString = function (num) { return toHexStringOfMinLength(num, 2); };
export var charFromCode = function (code) { return String.fromCharCode(code); };
export var charFromHexCode = function (hex) { return charFromCode(parseInt(hex, 16)); };
export var padStart = function (value, length, padChar) {
    var padding = '';
    for (var idx = 0, len = length - value.length; idx < len; idx++) {
        padding += padChar;
    }
    return padding + value;
};
export var copyStringIntoBuffer = function (str, buffer, offset) {
    var length = str.length;
    for (var idx = 0; idx < length; idx++) {
        buffer[offset++] = str.charCodeAt(idx);
    }
    return length;
};
export var addRandomSuffix = function (prefix, suffixLength) {
    if (suffixLength === void 0) { suffixLength = 4; }
    return prefix + "-" + Math.floor(Math.random() * Math.pow(10, suffixLength));
};
export var escapeRegExp = function (str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
export var cleanText = function (text) {
    return text.replace(/\t/g, '    ').replace(/[\b\v]/g, '');
};
var buildWordBreakRegex = function (wordBreaks) {
    var escapedRules = ['$'];
    for (var idx = 0, len = wordBreaks.length; idx < len; idx++) {
        var wordBreak = wordBreaks[idx];
        if (wordBreak.includes('\n') || wordBreak.includes('\r')) {
            throw new TypeError('`wordBreak` must not include \\n or \\r');
        }
        escapedRules.push(wordBreak === '' ? '.' : escapeRegExp(wordBreak));
    }
    var breakRules = escapedRules.join('|');
    return new RegExp("(\\n|\\r)|((.*?)(" + breakRules + "))", 'gm');
};
export var breakTextIntoLines = function (text, wordBreaks, maxWidth, computeWidthOfText) {
    var regex = buildWordBreakRegex(wordBreaks);
    var words = cleanText(text).match(regex);
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