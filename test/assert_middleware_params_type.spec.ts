import { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from 'express';
import { assertMiddlewareParamsType } from '../src';

it('should return true if all are valid (3)', () => {
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

    expect(assertMiddlewareParamsType(allM)).toBe(true);
});

it('should return true if all are valid (4)', () => {
    const m1: RequestHandler = (_req: Request, _res: Response, next: NextFunction) => {
        next();
    };

    const m2: ErrorRequestHandler = (_error: any, _req: Request, _res: Response, next: NextFunction) => {
        next();
    };

    const m3: RequestHandler = (_req: Request, _res: Response, next: NextFunction) => {
        next();
    };

    const allM = [m1, m2, m3];

    expect(assertMiddlewareParamsType(allM)).toBe(true);
});

it('should throw error if have others type', () => {
    const m1: RequestHandler = (_req: Request, _res: Response, next: NextFunction) => {
        next();
    };

    const m2: any = (next: NextFunction) => {
        next();
    };

    const m3: RequestHandler = (_req: Request, _res: Response, next: NextFunction) => {
        next();
    };

    const allM = [m1, m2, m3] as any;

    expect(() => assertMiddlewareParamsType(allM)).toThrowError();
});
