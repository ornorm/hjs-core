/** @babel */

export class UncaughtExceptionHandler {

    constructor({uncaughtException = null} = {}) {
        if (uncaughtException !== null) {
            this.uncaughtException = uncaughtException;
        }
    }

    uncaughtException(e) {
    }

}

const NANOS_PER_MILLI = 1000000;

export const handleException = (e, eh) => {
    if (eh !== null) {
        eh.uncaughtException(e);
    } else {
        throw e;
    }
};

export const join = ({ millis = 0, nanos = 0, timeout = 0, onComplete, uncaughtExceptionHandler = null } = {}) => {
    if (onComplete === null) {
        throw new ReferenceError('NullPointerException');
    }
    if (timeout <= 0) {
        if (millis < 0) {
            throw new RangeError("IllegalArgumentException timeout value is negative");
        }
        if (nanos < 0 || nanos > 999999) {
            throw new RangeError("IllegalArgumentException nanosecond timeout value out of range");
        }
        if (nanos >= 500000 || (nanos !== 0 && millis === 0)) {
            millis++;
        }
        join({ millis: 0, nanos: 0, timeout: millis, onComplete, uncaughtExceptionHandler });
    } else {
        let base = Date.now();
        let now = 0;
        if (timeout < 0) {
            throw new RangeError("IllegalArgumentException timeout value is negative");
        }
        if (timeout === 0) {
            try {
                onComplete();
            } catch (e) {
                handleException(e, uncaughtExceptionHandler);
            }
        } else {
            let delay = timeout - now;
            if (delay <= 0) {
                try {
                    onComplete();
                } catch (e) {
                    handleException(e, uncaughtExceptionHandler);
                }
            } else {
                let tid = setTimeout(() => {
                    try {
                        now = Date.now() - base;
                        delay = timeout - now;
                        if (delay <= 0) {
                            onComplete();
                        } else {
                            J({ millis, nanos, timeout: delay, onComplete, uncaughtExceptionHandler });
                        }
                    } catch (e) {
                        handleException(e, uncaughtExceptionHandler);
                    } finally {
                        clearTimeout(tid);
                    }
                }, delay);
            }
        }
    }
};

const J = join;

export const sleep = ({ millis = 0, nanos = 0, onComplete, uncaughtExceptionHandler = null } = {}) => {
    if (millis < 0) {
        throw new RangeError('IllegalArgumentException millis < 0: ' + millis);
    }
    if (nanos < 0) {
        throw new RangeError('IllegalArgumentException nanos < 0: ' + nanos);
    }
    if (nanos > 999999) {
        throw new RangeError('IllegalArgumentException nanos > 999999: ' + nanos);
    }
    if (onComplete === null) {
        throw new ReferenceError('NullPointerException');
    }
    if (millis === 0 && nanos === 0) {
        try {
            onComplete();
        } catch (e) {
            handleException(e, uncaughtExceptionHandler);
        }
    } else {
        let start = Date.now();
        let duration = ((millis * NANOS_PER_MILLI) + nanos) / NANOS_PER_MILLI;
        let tid = setTimeout(() => {
            try {
                let now = Date.now();
                let elapsed = now - start;
                if (elapsed >= duration) {
                    onComplete();
                } else {
                    duration -= elapsed;
                    start = now;
                    millis = duration / NANOS_PER_MILLI;
                    nanos = (duration % NANOS_PER_MILLI);
                    S({ millis, nanos, onComplete, uncaughtExceptionHandler });
                }
            } catch (e) {
                handleException(e, uncaughtExceptionHandler);
            } finally {
                clearTimeout(tid);
            }
        }, duration);
    }
};

const S = sleep;

export const wait = ({ millis = 0, nanos = 0, onComplete, uncaughtExceptionHandler = null } = {}) => {
    if (millis < 0) {
        throw new RangeError('IllegalArgumentException millis < 0: ' + millis);
    }
    if (nanos < 0) {
        throw new RangeError('IllegalArgumentException nanos < 0: ' + nanos);
    }
    if (nanos > 999999) {
        throw new RangeError('IllegalArgumentException nanos > 999999: ' + nanos);
    }
    if (onComplete === null) {
        throw new ReferenceError('NullPointerException');
    }
    if (millis === 0 && nanos === 0) {
        try {
            onComplete();
        } catch (e) {
            handleException(e, uncaughtExceptionHandler);
        }
    } else {
        let duration = ((millis * NANOS_PER_MILLI) + nanos) / NANOS_PER_MILLI;
        let tid = setInterval(() => {
            try {
                if (onComplete()) {
                    clearInterval(tid);
                }
            } catch (e) {
                if (tid) {
                    clearInterval(tid);
                }
                handleException(e, uncaughtExceptionHandler);
            }
        }, duration);
    }
};

const W = wait;

const x = (d, m, over) => {
    if (d > over) return MAX;
    if (d < -over) return MIN;
    return d * m;
};

const C0 = 1;
const C1 = C0 * 1000;
const C2 = C1 * 1000;
const C3 = C2 * 1000;
const C4 = C3 * 60;
const C5 = C4 * 60;
const C6 = C5 * 24;
const MAX = Number.MAX_VALUE;
const MIN = Number.MIN_VALUE;

export class TimeUnit {

    constructor({
        toNanos = (duration) => {
            return 0;
        },
        toMicros = (duration) => {
            return 0;
        },
        toMillis = (duration) => {
            return 0;
        },
        toSeconds = (duration) => {
            return 0;
        },
        toMinutes = (duration) => {
            return 0;
        },
        toHours = (duration) => {
            return 0;
        },
        toDays = (duration) => {
            return 0;
        },
        convert = (sourceDuration, sourceUnit) => {
            return 0;
        },
        excessNanos = (d, m) => {
            return 0;
        }
    } = {}) {
        this.toNanos = toNanos;
        this.toMicros = toMicros;
        this.toMillis = toMillis;
        this.toSeconds = toSeconds;
        this.toMinutes = toMinutes;
        this.toHours = toHours;
        this.toDays = toDays;
        this.convert = convert;
        this.excessNanos = excessNanos;
    }

    convert(sourceDuration, sourceUnit) {
        return 0;
    }

    excessNanos(d, m) {
        return 0;
    }

    sleep(onComplete, timeout = 0, uncaughtExceptionHandler = null) {
        if (timeout > 0) {
            let millis = this.toMillis(timeout);
            let nanos = this.excessNanos(timeout, millis);
            S({ millis, nanos, onComplete, uncaughtExceptionHandler });
        } else {
            onComplete();
        }
    }

    timedJoin(onComplete, timeout = 0, uncaughtExceptionHandler = null) {
        if (timeout > 0) {
            let millis = this.toMillis(timeout);
            let nanos = this.excessNanos(timeout, millis);
            J({ millis, nanos, onComplete, uncaughtExceptionHandler });
        } else {
            onComplete();
        }
    }

    timedWait(onComplete, timeout = 0, uncaughtExceptionHandler = null) {
        if (timeout > 0) {
            let millis = this.toMillis(timeout);
            let nanos = this.excessNanos(timeout, millis);
            W({ millis, nanos, onComplete, uncaughtExceptionHandler });
        } else {
            onComplete();
        }
    }

    toMillis(duration) {
        return 0;
    }

    toHours(duration) {
        return 0;
    }

    toMicros(duration) {
        return 0;
    }

    toMinutes(duration) {
        return 0;
    }

    toNanos(duration) {
        return 0;
    }

}

export const NANOSECONDS = new TimeUnit({
    toNanos: (d) => {
        return d;
    },
    toMicros: (d) => {
        return d / (C1 / C0);
    },
    toMillis: (d) => {
        return d / (C2 / C0);
    },
    toSeconds: (d) => {
        return d / (C3 / C0);
    },
    toMinutes: (d) => {
        return d / (C4 / C0);
    },
    toHours: (d) => {
        return d / (C5 / C0);
    },
    toDays: (d) => {
        return d / (C6 / C0);
    },
    convert: (d, u) => {
        return u.toNanos(d);
    },
    excessNanos: (d, m) => {
        return (d - (m * C2));
    }
});

export const MICROSECONDS = new TimeUnit({
    toNanos: (d) => {
        return x(d, C1 / C0, MAX / (C1 / C0));
    },
    toMicros: (d) => {
        return d;
    },
    toMillis: (d) => {
        return d / (C2 / C1);
    },
    toSeconds: (d) => {
        return d / (C3 / C1);
    },
    toMinutes: (d) => {
        return d / (C4 / C1);
    },
    toHours: (d) => {
        return d / (C5 / C1);
    },
    toDays: (d) => {
        return d / (C6 / C1);
    },
    convert: (d, u) => {
        return u.toMicros(d);
    },
    excessNanos: (d, m) => {
        return ((d * C1) - (m * C2));
    }
});

export const MILLISECONDS = new TimeUnit({
    toNanos: (d) => {
        return x(d, C2 / C0, MAX / (C2 / C0));
    },
    toMicros: (d) => {
        return x(d, C2 / C1, MAX / (C2 / C1));
    },
    toMillis: (d) => {
        return d;
    },
    toSeconds: (d) => {
        return d / (C3 / C2);
    },
    toMinutes: (d) => {
        return d / (C4 / C2);
    },
    toHours: (d) => {
        return d / (C5 / C2);
    },
    toDays: (d) => {
        return d / (C6 / C2);
    },
    convert: (d, u) => {
        return u.toMillis(d);
    },
    excessNanos: (d, m) => {
        return 0;
    }
});

export const SECONDS = new TimeUnit({
    toNanos: (d) => {
        return x(d, C3 / C0, MAX / (C3 / C0));
    },
    toMicros: (d) => {
        return x(d, C3 / C1, MAX / (C3 / C1));
    },
    toMillis: (d) => {
        return x(d, C3 / C2, MAX / (C3 / C2));
    },
    toSeconds: (d) => {
        return d;
    },
    toMinutes: (d) => {
        return d / (C4 / C3);
    },
    toHours: (d) => {
        return d / (C5 / C3);
    },
    toDays: (d) => {
        return d / (C6 / C3);
    },
    convert: (d, u) => {
        return u.toSeconds(d);
    },
    excessNanos: (d, m) => {
        return 0;
    }
});

export const MINUTES = new TimeUnit({
    toNanos: (d) => {
        return x(d, C4 / C0, MAX / (C4 / C0));
    },
    toMicros: (d) => {
        return x(d, C4 / C1, MAX / (C4 / C1));
    },
    toMillis: (d) => {
        return x(d, C4 / C2, MAX / (C4 / C2));
    },
    toSeconds: (d) => {
        return x(d, C4 / C3, MAX / (C4 / C3));
    },
    toMinutes: (d) => {
        return d;
    },
    toHours: (d) => {
        return d / (C5 / C4);
    },
    toDays: (d) => {
        return d / (C6 / C4);
    },
    convert: (d, u) => {
        return u.toMinutes(d);
    },
    excessNanos: (d, m) => {
        return 0;
    }
});

export const HOURS = new TimeUnit({
    toNanos: (d) => {
        return x(d, C5 / C0, MAX / (C5 / C0));
    },
    toMicros: (d) => {
        return x(d, C5 / C1, MAX / (C5 / C1));
    },
    toMillis: (d) => {
        return x(d, C5 / C2, MAX / (C5 / C2));
    },
    toSeconds: (d) => {
        return x(d, C5 / C3, MAX / (C5 / C3));
    },
    toMinutes: (d) => {
        return x(d, C5 / C4, MAX / (C5 / C4));
    },
    toHours: (d) => {
        return d;
    },
    toDays: (d) => {
        return d / (C6 / C5);
    },
    convert: (d, u) => {
        return u.toHours(d);
    },
    excessNanos: (d, m) => {
        return 0;
    }
});

export const DAYS = new TimeUnit({
    toNanos: (d) => {
        return x(d, C5 / C0, MAX / (C5 / C0));
    },
    toMicros: (d) => {
        return x(d, C5 / C1, MAX / (C5 / C1));
    },
    toMillis: (d) => {
        return x(d, C5 / C2, MAX / (C5 / C2));
    },
    toSeconds: (d) => {
        return x(d, C5 / C3, MAX / (C5 / C3));
    },
    toMinutes: (d) => {
        return x(d, C5 / C4, MAX / (C5 / C4));
    },
    toHours: (d) => {
        return x(d, C6 / C5, MAX / (C6 / C5));
    },
    toDays: (d) => {
        return d;
    },
    convert: (d, u) => {
        return u.toDays(d);
    },
    excessNanos: (d, m) => {
        return 0;
    }
});
