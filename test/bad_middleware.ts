/* tslint:disable:no-implicit-dependencies */

import { RequestHandler } from 'express';

export const m1: RequestHandler = (_req, _res, next) => {
    // console.log('come to m1 1st time');
    next();
    // console.log('come to m1 2nd time');
    next();
    // console.log('come to m1 3nd time');
    next();
};

export const m2: RequestHandler = (_req, res, next) => {
    // console.log('come to m2');

    try {
        res.json({ message: 'm2' });
    } catch (error) {
        next(error);
    }
};

export const m3: RequestHandler = (_req, _res, _next) => {
    // console.log('come to m3');
};

export const allM: RequestHandler[] = [m1, m2, m3];
