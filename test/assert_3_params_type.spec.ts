/* tslint:disable:no-unsafe-any no-implicit-dependencies */

import { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from 'express';
import { assert3ParamsType } from '../index';

it('should return true if all are valid', () => {
    const m1: RequestHandler = (_req: Request, _res: Response, next: NextFunction) => {
        next();
    };

    const m2: RequestHandler = (_req: Request, _res: Response, next: NextFunction) => {
        next();
    };

    const m3: RequestHandler = (_req: Request, _res: Response, next: NextFunction) => {
        next();
    };

    const allM = [m1, m2, m3];

    expect(assert3ParamsType(allM)).toBe(true);
});

it('should throw error if have others type', () => {
    const m1: RequestHandler = (_req: Request, _res: Response, next: NextFunction) => {
        next();
    };

    const m2: ErrorRequestHandler = (_error: any, _req: Request, _res: Response, next: NextFunction) => {
        next();
    };

    const m3: RequestHandler = (_req: Request, _res: Response, next: NextFunction) => {
        next();
    };

    const allM = [m1, m2, m3] as any;

    expect(() => assert3ParamsType(allM)).toThrowError();
});
