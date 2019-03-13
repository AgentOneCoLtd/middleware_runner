import { NextFunction, Request, RequestHandler, Response } from 'express';
export declare function makeIteratorFromList<T>(list: T[]): IterableIterator<T>;
export declare function assert3ParamsType(middlewareList: RequestHandler[]): boolean;
export declare function middlewareRunner(middlewareList: RequestHandler[], req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=index.d.ts.map