"use strict";
/* tslint:disable:no-unsafe-any no-implicit-dependencies */
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
it('should return true if all are valid', () => {
    const m1 = (_req, _res, next) => {
        next();
    };
    const m2 = (_req, _res, next) => {
        next();
    };
    const m3 = (_req, _res, next) => {
        next();
    };
    const allM = [m1, m2, m3];
    expect(index_1.assert3ParamsType(allM)).toBe(true);
});
it('should throw error if have others type', () => {
    const m1 = (_req, _res, next) => {
        next();
    };
    const m2 = (_error, _req, _res, next) => {
        next();
    };
    const m3 = (_req, _res, next) => {
        next();
    };
    const allM = [m1, m2, m3];
    expect(() => index_1.assert3ParamsType(allM)).toThrowError();
});
