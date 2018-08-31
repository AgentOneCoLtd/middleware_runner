/* tslint:disable:no-implicit-dependencies */

import { RequestHandler } from 'express';

export const m1: RequestHandler = (_req, res, _next) => {
    res.status(401).json({ message: 'Unauthorized' });
};

export const allM: RequestHandler[] = [m1];
