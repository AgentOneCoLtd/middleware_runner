"use strict";
/* tslint:disable:no-implicit-dependencies */
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
function isBoolean(val) {
    return typeof val === 'boolean';
}
exports.isBoolean = isBoolean;
exports.m1 = (req, res, next) => {
    const { resJsonAtM1 } = req.body;
    if (!isBoolean(resJsonAtM1)) {
        next(new TypeError('resJsonAtM1 must be boolean'));
        return;
    }
    if (resJsonAtM1) {
        res.json({ message: 'm1' });
        return;
    }
    new rxjs_1.Observable((observer) => {
        setTimeout(() => {
            observer.next('pass m1');
        }, 1000);
    }).subscribe({
        next(_result) {
            next();
        },
        error: next,
    });
};
exports.m2 = (req, res, next) => {
    const { resJsonAtM2 } = req.body;
    if (!isBoolean(resJsonAtM2)) {
        next(new TypeError('resJsonAtM2 must be boolean'));
        return;
    }
    if (resJsonAtM2) {
        res.json({ message: 'm2' });
        return;
    }
    new rxjs_1.Observable((observer) => {
        setTimeout(() => {
            observer.next('pass m2');
        }, 1000);
    }).subscribe({
        next(_result) {
            next();
        },
        error: next,
    });
};
exports.m3 = (req, res, next) => {
    const { resJsonAtM3 } = req.body;
    if (!isBoolean(resJsonAtM3)) {
        next(new TypeError('resJsonAtM3 must be boolean'));
        return;
    }
    if (resJsonAtM3) {
        res.json({ message: 'm3' });
        return;
    }
    new rxjs_1.Observable((observer) => {
        setTimeout(() => {
            observer.next('pass m3');
        }, 1000);
    }).subscribe({
        next(_result) {
            next();
        },
        error: next,
    });
};
exports.allM = [exports.m1, exports.m2, exports.m3];
