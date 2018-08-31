"use strict";
/* tslint:disable:no-implicit-dependencies */
Object.defineProperty(exports, "__esModule", { value: true });
exports.m1 = (_req, _res, next) => {
    // console.log('come to m1 1st time');
    next();
    // console.log('come to m1 2nd time');
    next();
    // console.log('come to m1 3nd time');
    next();
};
exports.m2 = (_req, res, next) => {
    // console.log('come to m2');
    try {
        res.json({ message: 'm2' });
    }
    catch (error) {
        next(error);
    }
};
exports.m3 = (_req, _res, _next) => {
    // console.log('come to m3');
};
exports.allM = [exports.m1, exports.m2, exports.m3];
