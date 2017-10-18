/** @babel */

export const toDegrees = (radian) => {
    return (180 / Math.PI) * radian;
};

export const toRadians = (degree) => {
    return (Math.PI / 180) * degree;
};

export const angle = (x1, y1, x2, y2) => {
    return toDegrees(Math.atan2(x1, y1) - Math.atan2(x2, y2)) % 360;
};

export const IEEEremainder = (x, y) => {
    let regularMod = x % y;
    if (isNaN(regularMod)) {
        return NaN;
    }
    if (regularMod === 0) {
        if (x < 0) {
            return 0;
        }
    }
    let alternativeResult = regularMod - (Math.abs(y) * Math.sign(x));
    if (Math.abs(alternativeResult) === Math.abs(regularMod)) {
        var divisionResult = x / y, roundedResult = Math.round(divisionResult);
        if (Math.abs(roundedResult) > Math.abs(divisionResult)) {
            return alternativeResult;
        }
        return regularMod;
    }
    if (Math.abs(alternativeResult) < Math.abs(regularMod)) {
        return alternativeResult;
    }
    return regularMod;
};

export const normalizeDegrees = (angle) => {
    if (angle > 180.0) {
        if (angle <= (180.0 + 360.0)) {
            angle = angle - 360.0;
        } else {
            angle = IEEEremainder(angle, 360.0);
            if (angle === -180.0) {
                angle = 180.0;
            }
        }
    } else if (angle <= -180.0) {
        if (angle > (-180.0 - 360.0)) {
            angle = angle + 360.0;
        } else {
            angle = IEEEremainder(angle, 360.0);
            if (angle === -180.0) {
                angle = 180.0;
            }
        }
    }
    return angle;
};

export const numberOfLeadingZeros = (i = 0) => {
    if (i === 0) {
        return 64;
    }
    let n = 1, x = i >>> 32;
    if (x === 0) {
        n += 32;
        x = i;
    }
    if (x >>> 16 === 0) {
        n += 16;
        x <<= 16;
    }
    if (x >>> 24 === 0) {
        n += 8;
        x <<= 8;
    }
    if (x >>> 28 === 0) {
        n += 4;
        x <<= 4;
    }
    if (x >>> 30 === 0) {
        n += 2;
        x <<= 2;
    }
    n -= x >>> 31;
    return n;
};

export const randomInt = (min, max) => {
    return Math.round(min + Math.random()*(max-min));
};

const digits = ['0', '1', '2', '3', '4', '5',
    '6', '7', '8', '9', 'a', 'b',
    'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z'];

export const formatUnsignedLong = (val = 0, shift = 0, buf = [], offset = 0, len = 0) => {
    let charPos = len, radix = 1 << shift, mask = radix - 1;
    do {
        buf[offset + --charPos] = digits[val & mask];
        val >>>= shift;
    } while (val !== 0 && charPos > 0);
    return charPos;
};

export const isDigit = (c) => {
    return /[0-9]/.test(c);
};

export const isFloat = (n) => {
    let fParsedVal = parseFloat(n);
    if (isNaN(fParsedVal) || Infinity === fParsedVal || -Infinity === fParsedVal) {
        return false;
    }
    return !!(fParsedVal % 1);
};

export const isInt = (n) => {
    return typeof n === "number" && isFinite(n) && n > -9007199254740992 && n < 9007199254740992 && Math.floor(n) === n;
};

export const toUnsignedString = (n) => {
    let SIZE = 64, shift = 4;
    let mag = SIZE - numberOfLeadingZeros(n);
    let chars = Math.max(((mag + (shift - 1)) / shift), 1);
    let buf = new Array(chars);
    formatUnsignedLong(n, shift, buf, 0, chars);
    return buf.join("");
};

const MULTIPLIER = 0x5DEECE66D;
const ADDEND = 0xB;
const MASK = (1 << 48) - 1;
let SEED_UNIQUIFIER = 8682522807148012;

export class Random {

    constructor(seed = -1) {
        if (seed === -1) {
            seed = ++SEED_UNIQUIFIER + Date.now();
        }
        this.haveNextNextGaussian = false;
        this.nextNextGaussian = 0;
        this.setSeed(seed);
    }

    compareAndSet(n1, n2) {
        if (n1 !== n2) {
            this.seed = n2;
            return true;
        }
        return false;
    }

    getSeed() {
        return this.seed;
    }

    next(bits = 31) {
        let oldseed, nextseed, seed = this.seed;
        do {
            oldseed = seed;
            nextseed = (oldseed * MULTIPLIER + ADDEND) & MASK;
            seed = nextseed;
        } while (!this.compareAndSet(oldseed, nextseed));
        return nextseed >>> (64 - bits);
    }

    nextBoolean() {
        return this.next(1) !== 0;
    }

    nextBytes(bytes) {
        if (bytes === null) {
            throw new ReferenceError("NullPointerException the byte array is null");
        }
        for (let i = 0, len = bytes.length; i < len;) {
            for (let rnd = this.nextInt(), n = Math.min(len - i, 32 / 8); n-- > 0; rnd >>= 8) {
                bytes[i++] = rnd;
            }
        }
    }

    nextDouble() {
        return ((this.next(26) << 27) + this.next(27)) / (1 << 53);
    }

    nextInt(bound = 31) {
        if (bound <= 0) {
            throw new RangeError("ArgumentError n must be positive");
        }
        if ((bound & -bound) === bound) {
            return (bound * this.next(31)) >> 31;
        }
        let bits, val;
        do {
            bits = this.next(31);
            val = bits % bound;
        } while (bits - val + (bound-1) < 0);
        return val;
    }

    nextLong() {
        return (this.next(32) << 32) + this.next(32);
    }

    nextFloat() {
        return this.next(24) / (1 << 24);
    }

    nextGaussian() {
        if (this.haveNextNextGaussian) {
            this.haveNextNextGaussian = false;
            return this.nextNextGaussian;
        } else {
            let v1, v2, s;
            do {
                v1 = 2 * this.nextDouble() - 1; // between -1 and 1
                v2 = 2 * this.nextDouble() - 1; // between -1 and 1
                s = v1 * v1 + v2 * v2;
            } while (s >= 1 || s === 0);
            let multiplier = Math.sqrt(-2 * Math.log(s)/s);
            this.nextNextGaussian = v2 * multiplier;
            this.haveNextNextGaussian = true;
            return v1 * multiplier;
        }
    }

    resetSeed(seedVal) {
        this.seed = seedVal;
    }

    setSeed(seed) {
        seed = (seed ^ MULTIPLIER) & MASK;
        this.seed = seed;
        this.haveNextNextGaussian = false;
    }

    toString() {
        return "[object Random]";
    }
}