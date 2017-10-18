/** @babel */

export const isBufferView = (buffer) => {
    return buffer instanceof Int8Array ||
        buffer instanceof Uint8Array ||
       buffer instanceof Int16Array ||
            buffer instanceof Uint16Array ||
            buffer instanceof Int32Array ||
            buffer instanceof Uint32Array ||
            buffer instanceof Float32Array ||
            buffer instanceof Float64Array;
};

export const isArrayBuffer = (buffer) => {
    return buffer instanceof ArrayBuffer;
};

export const arraycopy = (src, srcPos = 0, dst, dstPos = 0, length = 0) => {
    if ((Array.isArray(src) || isBufferView(src)) &&
        (Array.isArray(dst) || isBufferView(dst))) {
        length = length || src.length;
        let len = length - srcPos;
        for (let i = srcPos, j = dstPos; i < length; i++, j++) {
            dst[j] = src[i];
        }
    }
};

export const binarySearch = (array, size=0, value=null) => {
    if ((Array.isArray(array) || isBufferView(array)) && value) {
        let lo = 0;
        let hi = size - 1;
        let mid = 0;
        let midVal = 0;
        while (lo <= hi) {
            mid = (lo + hi) >>> 1;
            midVal = array[mid];
            if (midVal < value) {
                lo = mid + 1;
            } else if (midVal > value) {
                hi = mid - 1;
            } else {
                return mid;
            }
        }
        return ~lo;
    }
    return -1;
};

export const copyOf = (o, length=0) => {
    if (!o) {
        return null;
    }
    if (Array.isArray(o)) {
        length = length || o.length;
        let newArray = new Array(length);
        for (let i = 0; i<length; i++) {
            newArray[i] = o[i];
        }
        return newArray;
    } else if (isBufferView(o)) {
        length = length || o.length;
        let buffer = o.buffer;
        let newBuffer = new ArrayBuffer(length);
        for (let i=0; i<buffer.length; i++) {
            newBuffer[i] = buffer[i];
        }
        return new o.constructor(newBuffer);
    }
    let copy = {};
    for (let p in o) {
        if (o.hasOwnProperty(p)) {
            copy[p] = o[p];
        }
    }
    return copy;
};

export const fill = (a, val) => {
    if (Array.isArray(a)) {
        for (let i = 0, len = a.length; i < len; i++) {
            a[i] = val;
        }
    }
};

export const generateUUID = () => {
    let d = Date.now();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
};

export const hashCode = (value) => {
    let result = 1;
    if (typeof value == "number") {
        result = 31 * result + value;
    } else if (typeof value == "boolean") {
        result = 31 * result + (value != null ? (value ? 1 : 0) : 0);
    } else if (typeof value == "string") {
        let len = value.length;
        while (len--) {
            result = 31 * result + value.charCodeAt(len);
        }
    } else if (Array.isArray(value)) {
        let lon = value.length;
        let o = null;
        while (lon--) {
            o = value[lon];
            result = 31 * result + (o != null ? 0 : this.hashCode(o));
        }
    } else if (value != null) {
        if (value.constructor == Date) {
            result = 31 * result + value.getTime();
        } else if (value.constructor == RegExp) {
            result = this.hashCode(value.toString());
        } else if (value.hasOwnProperty("hashCode")) {
            result = 31 * result + value.hashCode();
        } else {
            result = this.hashCode(value.toString());
        }
    } else {
        result = 0;
    }
    return result;
};

export const hashCombine = (v, seed) => {
    return seed ^= this.hashCode(v) + 0x9e3779b9 + (seed << 6) + (seed >> 2);
};

export const isAssignableFrom = (superclass, subclass) => {
    return subclass.prototype instanceof superclass ||
        subclass === superclass;
};
