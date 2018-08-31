"use strict";
/* tslint:disable:no-implicit-dependencies */
Object.defineProperty(exports, "__esModule", { value: true });
exports.m1 = (_req, res, _next) => {
    res.status(401).json({ message: 'Unauthorized' });
};
exports.allM = [exports.m1];
