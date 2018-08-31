/* tslint:disable:no-implicit-dependencies */

import { Request, RequestHandler } from 'express';

export function isBoolean(val: any): val is boolean {
    return typeof val === 'boolean';
}

interface IMyRequest extends Request {
    body: {
        resJsonAtM1: boolean;
        resJsonAtM2: boolean;
        resJsonAtM3: boolean;
    };
}

export const m1: RequestHandler = (req: IMyRequest, res, next) => {
    const { resJsonAtM1 } = req.body;

    if (!isBoolean(resJsonAtM1)) {
        next(new TypeError('resJsonAtM1 must be boolean'));

        return;
    }

    if (resJsonAtM1) {
        res.json({ message: 'm1' });

        return;
    }

    next();
};

export const m2: RequestHandler = (req: IMyRequest, res, next) => {
    const { resJsonAtM2 } = req.body;

    if (!isBoolean(resJsonAtM2)) {
        next(new TypeError('resJsonAtM2 must be boolean'));

        return;
    }

    if (resJsonAtM2) {
        res.json({ message: 'm2' });

        return;
    }

    next();
};

export const m3: RequestHandler = (req: IMyRequest, res, next) => {
    const { resJsonAtM3 } = req.body;

    if (!isBoolean(resJsonAtM3)) {
        next(new TypeError('resJsonAtM3 must be boolean'));

        return;
    }

    if (resJsonAtM3) {
        res.json({ message: 'm3' });

        return;
    }

    next();
};

export const allM: RequestHandler[] = [m1, m2, m3];
