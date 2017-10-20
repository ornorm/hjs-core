/** @babel */
export class Class {

    constructor() {

    }

    static extend(def) {
        let S = def["extends"] || Class;
        let superproto = S.prototype;
        let prototype = new S();
        for (let name in def) {
            if (name === "constructor" || name === "extends" || name === "static" || name === "implements" || name === "accessors") {
                continue;
            }
            if (def.hasOwnProperty(name)) {
                prototype[name] = def[name];
            }
        }
        let O = def["static"] || {};
        let C = prototype.constructor = def["constructor"];
        for (let name in O) {
            if (O.hasOwnProperty(name)) {
                C[name] = O[name];
            }
        }
        let gs = null;
        let A = def["accessors"] || {};
        C.prototype = prototype;
        for (let name in A) {
            if (A.hasOwnProperty(name)) {
                gs = A[name];
                Object.defineProperty(C.prototype, name, gs);
            }
        }
        C.superclass = S;
        C.supertype = superproto;
        console.log(C.name + ".superclass=" + superproto.constructor.name);
        C.extend = extend;
        return C;
    }

}


export const getprototypeof = ((typeof Object.getPrototypeOf !== "function") ? ((typeof "test".__proto__ === "object") ? function getPrototypeOf(type) {
    return type ? type.__proto__ : null;
} : function getPrototypeOf(type) {
    return type ? type.constructor.prototype : null;
}) : Object.getPrototypeOf);
