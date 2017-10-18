/** @babel */
const W_SPACE = new RegExp(/^\s$/);

export const append = (str = '', buf = [], offset = 0, length = 0) => {
    length = length || buf.length;
    let tmp = buf.splice(offset, length);
    return str + tmp.join("");
};

export const appendChar = (str = '', buf = [], offset = 0, length = 0) => {
    length = length || buf.length;
    return str + this.charBufferToString(buf.splice(offset, length));
};

export const asCamelifyGetMethod = (name) => {
    if (!name) {
        throw new ReferenceError("NullPointerException original is null");
    }
    return "get" + this.camelify(name);
};

export const asCamelifySetMethod = (name = '') => {
    return "set" + this.camelify(name);
};

export const camelify = (name = '') => {
    if (name.indexOf("_") !== -1) {
        let str = "";
        let parts = name.split("_");
        for (const part of parts) {
            str += this.capitalize(part);
        }
        return str;
    }
    return this.capitalize(name);
};

export const capitalize = (name = '') => {
    let str = name.substring(0, 1).toUpperCase();
    return str + name.substring(1);
};

export const charAt = (str = '', index = 0) => {
    return str.charAt(index);
};

export const charEqualString = (c = 0, str = '') => {
    return String.fromCharCode(c) === str;
};

export const charBufferToString = (buf = [], offset = 0, length = 0) => {
    length = length || buf.length;
    let c = 0;
    let str = "";
    for (let i = offset; i < length; i++) {
        c = buf[i];
        str += String.fromCharCode(c);
    }
    return str;
};

export const charBufferToStringBuffer = (buf = [], offset = 0, length = 0) => {
    length = length || buf.length;
    let c = 0;
    let arr = [];
    for (let i = offset; i < length; i++) {
        c = buf[i];
        arr.push(String.fromCharCode(c));
    }
    return arr;
};

export const concat = (str1 = '', str2 = '') => {
    return str1 + str2;
};

export const contains = (str = '', match = '', from = 0) => {
    return this.indexOf(str, match, from) !== -1;
};

export const decodeUtf8 = (str = '') => {
    str = str.replace(/\r\n/g, "\n");
    let utftext = "", n, c;
    for (n = 0; n < str.length; n++) {
        c = str.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }
    }
    return utftext;
};

export const encodeUtf8 = (str = '') => {
    let string = "", i = 0, c, c2, c3;
    while (i < str.length) {
        c = str.charCodeAt(i);
        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        } else if ((c > 191) && (c < 224)) {
            c2 = str.charCodeAt(i + 1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = str.charCodeAt(i + 1);
            c3 = str.charCodeAt(i + 2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    return string;
};

export const endsWith = (str = '', suffix = '') => {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

export const equalsIgnoreCase = (str = '', anotherString = '') => {
    return str.toLowerCase() === anotherString.toLowerCase();
};

export const escapeRegExp = (str = '') => {
    return str.replace(/[.*+?^${}()|[\]\/\\]/g, "\\$0");
};

export const fixedCharCodeAt = (str = '', idx = 0) => {
    let code = str.charCodeAt(idx);
    let hi, low;
    if (0xD800 <= code && code <= 0xDBFF) {
        hi = code;
        low = str.charCodeAt(idx + 1);
        if (isNaN(low)) {
            throw new RangeError('Invalid char');
        }
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
    }
    if (0xDC00 <= code && code <= 0xDFFF) {
        return false;
    }
    return code;
};

export const fixedFromCharCode = (codePt = 0) => {
    if (codePt > 0xFFFF) {
        codePt -= 0x10000;
        return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF));
    }
    return String.fromCharCode(codePt);
};

export const fromCharCode = (...vargs) => {
    return String.fromCharCode(vargs);
};

export const fromCodePoint = (codepoints = []) => {
    let chars = [], offset, units, c;
    for (const point of codepoints) {
        offset = point - 0x10000;
        units = point > 0xFFFF ? [0xD800 + (offset >> 10), 0xDC00 + (offset & 0x3FF)] : [point];
        for (let i = 0; i < units.length; i++) {
            c = String.fromCharCode(units[i]);
            chars.push(c);
        }
    }
    return chars.join("");
};

export const getChars = (str = '', srcBegin = 0, srcEnd = 0, dst = [], dstBegin = 0) => {
    srcEnd = srcEnd || str.length;
    let index, len = srcEnd - srcBegin;
    for (let i = srcBegin; i < len; i++) {
        index = dstBegin + i;
        dst[index] = str.charCodeAt(i);
    }
};

export const getStrings = (str = '', from = 0, len = 0, buf = [], to = 0) => {
    len = len || str.length;
    let index;
    for (let i = from; i < len; i++) {
        index = to + i;
        buf[index] = str.charAt(i);
    }
};

export const hashCode = (str = '', h = 0) => {
    let len = str.length;
    if (h === 0 && len > 0) {
        let off = 0, val = this.stringToCharBuffer(str);
        for (let i = 0; i < len; i++) {
            h = 31 * h + val[off++];
        }
    }
    return h;
};

export const indexOf = (str = '', ch = '', fromIndex = 0) => {
    if (typeof str === "string") {
        return str.substring(fromIndex, str.length).indexOf(ch);
    }
    if (Array.isArray(str)) {
        return str.slice(fromIndex, str.length).indexOf(ch);
    }
};

export const indexOfChar = (source = [], sourceOffset = 0, sourceCount = 0, target = [], targetOffset = 0, targetCount = 0, fromIndex = 0) => {
    if (fromIndex >= sourceCount) {
        return (targetCount === 0 ? sourceCount : -1);
    }
    if (fromIndex < 0) {
        fromIndex = 0;
    }
    if (targetCount === 0) {
        return fromIndex;
    }
    let first = target[targetOffset], max = sourceOffset + (sourceCount - targetCount), end, j, k;
    for (let i = sourceOffset + fromIndex; i <= max; i++) {
        if (source[i] !== first) {
            while (++i <= max) {
                if (source[i] === first) {
                    break;
                }
            }
        }
        if (i <= max) {
            j = i + 1;
            end = j + targetCount - 1;
            for (k = targetOffset + 1; j < end && source[j] === target[k]; j++, k++) {
                if (j === end) {
                    return i - sourceOffset;
                }
            }
        }
    }
    return -1;
};

export const isDigit = (c = null) => {
    if (c === null) {
        return false;
    }
    if (typeof c === "string") {
        c = c.charCodeAt(0);
    }
    return c >= ZERO && c <= NINE;
};

export const isEmpty = (str = '') => {
    if (str === null) {
        return true;
    }
    if (str === "" || str.length === 0) {
        return true;
    }
    str = str.replace(/^\s+|\s+$/, '');
    return str.length === 0;
};

export const isJsIdentifierPart = (c = 0) => {
    return c === UNDER_SCORE ||
        c === DOLLAR ||
        (c >= A && c <= Z) ||
        (c >= a && c <= z) ||
        (c >= ZERO && c <= NINE) ||
        c > z;
};

export const isLetter = (c = null) => {
    if (c === null) {
        return false;
    }
    if (typeof c === "string") {
        c = c.charCodeAt(0);
    }
    return ((c >= 65) && (c <= 90)) || ((c >= 97) && (c <= 122));
};

export const isLetterOrDigit = (c = null) => {
    if (c === null) {
        return false;
    }
    if (typeof c === "string") {
        c = c.charCodeAt(0);
    }
    return this.isDigit(c) || this.isLetter(c);
};

export const isUnicodeRange = (string) => {
    if (string === null) {
        return false;
    }
    return string.match(/^[A-F\d]{1,4}$/i) !== null;
};

export const isWhitespace = (str) => {
    if (str === null) {
        return false;
    }
    if (!isNaN(str)) {
        return str === WHITE_SPACE;
    }
    return W_SPACE.test(str.charAt(0));
};

export const knownCharCodeAt = (str = '', idx = 0) => {
    str += '';
    let code, end = str.length;
    let surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    while ((surrogatePairs.exec(str)) !== null) {
        let li = surrogatePairs.lastIndex;
        if (li - 2 < idx) {
            idx++;
        } else {
            break;
        }
    }
    if (idx >= end || idx < 0) {
        return -1;
    }
    code = str.charCodeAt(idx);
    let hi, low;
    if (0xD800 <= code && code <= 0xDBFF) {
        hi = code;
        low = str.charCodeAt(idx + 1);
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
    }
    return code;
};

export const lastIndexOf = (str = '', ch = '', fromIndex = 0) => {
    return str.substring(fromIndex, str.length).lastIndexOf(ch);
};

export const quote = (word = '', specials = '') => {
    let len = word.length, cc, sb, lastc, needQuoting = false, c, j;
    for (let i = 0; i < len; i++) {
        c = word.charAt(i);
        if (c === '"' || c === '\\' || c === '\r' || c === '\n') {
            sb = "";
            sb += '"';
            sb += word.substring(0, i);
            lastc = 0;
            for (j = i; j < len; j++) {
                cc = word.charAt(j);
                if ((cc === '"') || (cc === '\\') || (cc === '\r') || (cc === '\n')) {
                    if (cc === '\n' && lastc === '\r') {
                    } else {
                        sb += '\\';
                    }
                }
                sb += cc;
                lastc = cc;
            }
            sb += '"';
            return sb;
        } else if (c.charCodeAt(0) < 40 || c.charCodeAt(0) >= 177 || specials.indexOf(c) >= 0) {
            needQuoting = true;
        }
    }
    if (needQuoting) {
        sb = "";
        sb += '"';
        sb += word;
        sb += '"';
        return sb;
    }
    return word;
};

export const regionMatches = (str = '', ignoreCase = false, toffset = 0, other = '', ooffset = 0, len = 0) => {
    len = len || other.length;
    let sub1 = str.slice(toffset, len), sub2 = other.slice(ooffset, len);
    if (ignoreCase) return sub1.toLowerCase() === sub2.toLowerCase();
    return sub1 === sub2;
};

export const replaceAll = (string = '', src = '', dst = '', ignore = false) => {
    return string.replace(new RegExp(src.replace(/([\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, function (c) {
        return "\\" + c;
    }), "g" + ( ignore ? "i" : "")), dst);
};

export const startsWith = (str = '', prefix = '', toffset = 0) => {
    if (toffset > 0) {
        return str.slice(toffset, str.length).indexOf(prefix) === 0;
    }
    return str.indexOf(prefix) === 0;
};

export const stringToCharBuffer = (str = '', offset = 0, length = 0) => {
    length = length || str.length;
    let chars = [];
    for (let i = offset; i < length; i++) {
        chars[i] = str.charCodeAt(i);
    }
    return chars;
};

export const toBinaries = (input = []) => {
    let output = [];
    for (let i = 0; i < input.length; i++) {
        output[i] = input.charCodeAt(i) & 0xff;
    }
    return output;
};

export const toCharCode = (c = 0) => {
    return c.charCodeAt(0);
};

export const trim = (str = '') => {
    return str.replace(/^\s+|\s+$/g, '');
};

export const trimEnd = (str = '', c = null) => {
    if (c !== null) {
        return str.replace(new RegExp(this.escapeRegExp(c) + "*$"), '');
    }
    return str.replace(/\s+$/, '');
};

export const trimStart = (str = '', c = null) => {
    if (c !== null) {
        return this.replace(new RegExp("^" + this.escapeRegExp(c) + "*"), '');
    }
    return str.replace(/^\s+/, '');
};

export const utf16Encode = (input = '') => {
    let output = [], i = 0, len = input.length, value;
    while (i < len) {
        value = input[i++];
        if ((value & 0xF800) === 0xD800) throw new RangeError("UTF-16(encode): Illegal UTF-16 value");
        if (value > 0xFFFF) {
            value -= 0x10000;
            output.push(String.fromCharCode(((value >>> 10) & 0x3FF) | 0xD800));
            value = 0xDC00 | (value & 0x3FF);
        }
        output.push(String.fromCharCode(value));
    }
    return output.join("");
};

export const EOS = -1;
export const a = "a".charCodeAt(0);
export const b = "b".charCodeAt(0);
export const c = "c".charCodeAt(0);
export const d = "d".charCodeAt(0);
export const e = "e".charCodeAt(0);
export const f = "f".charCodeAt(0);
export const g = "g".charCodeAt(0);
export const h = "h".charCodeAt(0);
export const i = "i".charCodeAt(0);
export const j = "j".charCodeAt(0);
export const k = "k".charCodeAt(0);
export const l = "l".charCodeAt(0);
export const m = "m".charCodeAt(0);
export const n = "n".charCodeAt(0);
export const o = "o".charCodeAt(0);
export const p = "p".charCodeAt(0);
export const q = "q".charCodeAt(0);
export const r = "r".charCodeAt(0);
export const s = "s".charCodeAt(0);
export const t = "t".charCodeAt(0);
export const u = "u".charCodeAt(0);
export const v = "v".charCodeAt(0);
export const w = "w".charCodeAt(0);
export const x = "x".charCodeAt(0);
export const y = "y".charCodeAt(0);
export const z = "z".charCodeAt(0);
export const A = "A".charCodeAt(0);
export const B = "B".charCodeAt(0);
export const C = "C".charCodeAt(0);
export const D = "D".charCodeAt(0);
export const E = "E".charCodeAt(0);
export const F = "F".charCodeAt(0);
export const G = "G".charCodeAt(0);
export const H = "H".charCodeAt(0);
export const I = "I".charCodeAt(0);
export const J = "J".charCodeAt(0);
export const K = "K".charCodeAt(0);
export const L = "L".charCodeAt(0);
export const M = "M".charCodeAt(0);
export const N = "N".charCodeAt(0);
export const O = "O".charCodeAt(0);
export const P = "P".charCodeAt(0);
export const Q = "Q".charCodeAt(0);
export const R = "R".charCodeAt(0);
export const S = "S".charCodeAt(0);
export const T = "T".charCodeAt(0);
export const U = "U".charCodeAt(0);
export const V = "V".charCodeAt(0);
export const W = "W".charCodeAt(0);
export const X = "X".charCodeAt(0);
export const Y = "Y".charCodeAt(0);
export const Z = "Z".charCodeAt(0);
export const ZERO = "0".charCodeAt(0);
export const ONE = "1".charCodeAt(0);
export const TWO = "2".charCodeAt(0);
export const THREE = "3".charCodeAt(0);
export const FOUR = "4".charCodeAt(0);
export const FIVE = "5".charCodeAt(0);
export const SIX = "6".charCodeAt(0);
export const SEVEN = "7".charCodeAt(0);
export const EIGHT = "8".charCodeAt(0);
export const NINE = "9".charCodeAt(0);
export const DOT = ".".charCodeAt(0);
export const BANG = "!".charCodeAt(0);
export const EQUAL = "=".charCodeAt(0);
export const PERCENT = "%".charCodeAt(0);
export const AMPERSAND = "&".charCodeAt(0);
export const ASTERISK = "*".charCodeAt(0);
export const PLUS = "+".charCodeAt(0);
export const DASH = "-".charCodeAt(0);
export const SLASH = "/".charCodeAt(0);
export const BACK_SLASH = "\\".charCodeAt(0);
export const COMMA = ",".charCodeAt(0);
export const COLON = ":".charCodeAt(0);
export const SEMICOLON = ";".charCodeAt(0);
export const LEFT_ANGLE = "<".charCodeAt(0);
export const RIGHT_ANGLE = ">".charCodeAt(0);
export const CARET = "^".charCodeAt(0);
export const BAR = "|".charCodeAt(0);
export const QUESTION_MARK = "?".charCodeAt(0);
export const LEFT_PAREN = "(".charCodeAt(0);
export const RIGHT_PAREN = ")".charCodeAt(0);
export const LEFT_BRACE = "{".charCodeAt(0);
export const RIGHT_BRACE = "}".charCodeAt(0);
export const LEFT_BRACKET = "[".charCodeAt(0);
export const RIGHT_BRACKET = "]".charCodeAt(0);
export const TILDE = "~".charCodeAt(0);
export const AT = "@".charCodeAt(0);
export const SHARP = "#".charCodeAt(0);
export const SINGLE_QUOTE = "'".charCodeAt(0);
export const DOUBLE_QUOTE = "\"".charCodeAt(0);
export const UNDER_SCORE = "_".charCodeAt(0);
export const DOLLAR = "$".charCodeAt(0);
export const SPACE = " ".charCodeAt(0);
export const TAB = "\t".charCodeAt(0);
export const VERTICAL_TAB = "\v".charCodeAt(0);
export const NEWLINE = "\n".charCodeAt(0);
export const CARRIAGE_RETURN = "\r".charCodeAt(0);
export const ALERT = "\a".charCodeAt(0);
export const BACKSPACE = "\b".charCodeAt(0);
export const FORMFEED = "\f".charCodeAt(0);
export const WHITE_SPACE = " ".charCodeAt(0);
export const NULL_TERMINATOR = 0;


export  const HEX_DIGITS = [ZERO, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, A, B, C, D, E, F];


const MIN_CODE_UNIT = 0x0000;
const MAX_CODE_UNIT = 0xFFFF;
const MIN_SURROGATE = 0xD800;
const MAX_SURROGATE = 0xDFFF;
const MIN_HIGH_SURROGATE = 0xD800;
const MAX_HIGH_SURROGATE = 0xDBFF;
const MIN_LOW_SURROGATE = 0xDC00;
const MAX_LOW_SURROGATE = 0xDFFF;

const MIN_CODE_POINT = 0x0000;
const MAX_CODE_POINT = 0x10FFFF;
const MIN_SUPPLEMENTARY_CODE_POINT = 0x10000;

const highSurrogateOffset = MIN_HIGH_SURROGATE - (MIN_SUPPLEMENTARY_CODE_POINT >>> 10);

export const isSurrogate = (cu) => {
    return MIN_SURROGATE <= cu && cu <= MAX_SURROGATE;
};

export const isHighSurrogate = (cu) => {
    return MIN_HIGH_SURROGATE <= cu && cu <= MAX_HIGH_SURROGATE;
};

export const isLowSurrogate = (cu) => {
    return MIN_LOW_SURROGATE <= cu && cu <= MAX_LOW_SURROGATE;
};

export const isSurrogatePair = (highCu, lowCu) => {
    return isHighSurrogate(highCu) && isLowSurrogate(lowCu);
};

export const isSupplementaryCodePoint = (cp) => {
    return MIN_SUPPLEMENTARY_CODE_POINT <= cp &&
        cp <= MAX_CODE_POINT;
};

export const isBmpCodePoint = (cp) => {
    return cp >>> 16 === 0;
};

export const charCount = (codePoint) => {
    return codePoint >= MIN_SUPPLEMENTARY_CODE_POINT ? 2 : 1;
};

export const highSurrogate = (cp) => {
    return (cp >>> 10) + highSurrogateOffset;
};

export const lowSurrogate = (cp) => {
    return (cp & 0x3ff) + MIN_LOW_SURROGATE;
};

export const toChars = (cp) => {
    if (isBmpCodePoint(cp)) {
        return [cp];
    }
    return [ highSurrogate(cp), lowSurrogate(cp) ];
};

export const isISOControl = (cp) => {
    return cp <= 0x9F &&
        (cp >= 0x7F || (cp >>> 5 === 0));
};

//koichik/node-codepoint
export class StringTokenizer {

    constructor({ str, delim=" \t\n\r\f", returnDelims=false }={}) {
        this.currentPosition = 0;
        this.newPosition = -1;
        this.delimsChanged = this.hasSurrogates = false;
        this.str = str;
        this.maxPosition = str.length;
        this.delimiters = delim;
        this.retDelims = returnDelims;
        this.setMaxDelimCodePoint();
    }

    countTokens() {
        let count = 0;
        let currpos = this.currentPosition;
        while (currpos < this.maxPosition) {
            currpos = this.skipDelimiters(currpos);
            if (currpos >= this.maxPosition) {
                break;
            }
            currpos = this.scanToken(currpos);
            count++;
        }
        return count;
    }

    hasMoreElements() {
        return this.hasMoreTokens();
    }

    hasMoreTokens() {
        this.newPosition = this.skipDelimiters(this.currentPosition);
        return (this.newPosition < this.maxPosition);
    }

    isDelimiter(codePoint) {
        for (let i = 0; i < this.delimiterCodePoints.length; i++) {
            if (this.delimiterCodePoints[i] === codePoint) {
                return true;
            }
        }
        return false;
    }

    nextElement() {
        return this.nextToken();
    }

    nextToken(delim=null) {
        if (delim !== null) {
            this.delimiters = delim;
            this.delimsChanged = true;
            this.setMaxDelimCodePoint();
            return this.nextToken();
        }
        this.currentPosition = (this.newPosition >= 0 && !this.delimsChanged) ? this.newPosition : this.skipDelimiters(this.currentPosition);
        this.delimsChanged = false;
        this.newPosition = -1;
        if (this.currentPosition >= this.maxPosition) {
            throw new RangeError("NoSuchElementException");
        }
        let start = this.currentPosition;
        this.currentPosition = this.scanToken(this.currentPosition);
        return this.str.substring(start, this.currentPosition);
    }

    setMaxDelimCodePoint() {
        if (this.delimiters === null) {
            this.maxDelimCodePoint = 0;
            return;
        }
        let i=0;
        let c=0;
        let m = 0;
        let count = 0;
        while (i < this.delimiters.length) {
            c = this.delimiters.charCodeAt(i);
            if (c >= MIN_HIGH_SURROGATE && c <= MAX_LOW_SURROGATE) {
                c = this.delimiters.codePointAt(i);
                this.hasSurrogates = true;
            }
            if (m < c) {
                m = c;
            }
            count++;
            i += charCount(this.delimiters.codePointAt(i));
        }
        this.maxDelimCodePoint = m;
        if (this.hasSurrogates) {
            this.delimiterCodePoints = new Array(count);
            for (let i = 0, j = 0; i < count; i++, j += charCount(c)) {
                c = this.delimiters.codePointAt(j);
                this.delimiterCodePoints[i] = c;
            }
        }
    }

    scanToken(startPos) {
        let position = startPos;
        while (position < this.maxPosition) {
            if (!this.hasSurrogates) {
                let c = this.str.charAt(position);
                if ((c.charCodeAt(0) <= this.maxDelimCodePoint) && (this.delimiters.indexOf(c) >= 0)) {
                    break;
                }
                position++;
            } else {
                let c = this.str.codePointAt(position);
                if ((c <= this.maxDelimCodePoint) && this.isDelimiter(c)) {
                    break;
                }
                position += charCount(c);
            }
        }
        if (this.retDelims && (startPos === position)) {
            if (!this.hasSurrogates) {
                let c = this.str.charAt(position);
                if ((c.charCodeAt(0) <= this.maxDelimCodePoint) && (this.delimiters.indexOf(c) >= 0)) {
                    position++;
                }
            } else {
                let c = this.str.codePointAt(position);
                if ((c <= this.maxDelimCodePoint) && this.isDelimiter(c)) {
                    position += charCount(c);
                }
            }
        }
        return position;
    }

    skipDelimiters(startPos) {
        if (this.delimiters === null) {
            throw new ReferenceError("NullPointerException");
        }
        let position = startPos;
        while (!this.retDelims && position < this.maxPosition) {
            if (!this.hasSurrogates) {
                let c = this.str.charAt(position);
                if ((c.charCodeAt(0) > this.maxDelimCodePoint) || (this.delimiters.indexOf(c) < 0)) {
                    break;
                }
                position++;
            } else {
                let c = this.str.codePointAt(position);
                if ((c > this.maxDelimCodePoint) || !this.isDelimiter(c)) {
                    break;
                }
                position += charCount(c);
            }
        }
        return position;
    }

}