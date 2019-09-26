import { NextFunction, Request as ExpressRequest, RequestHandler as ExpressRequestHandler, Response } from 'express';
import { RequestHandler as ExpressServeStaticCoreRequestHandler, Params, ParamsDictionary, Request as ExpressServeStaticCoreRequest } from 'express-serve-static-core';
export declare type Request<T extends Params = ParamsDictionary> = ExpressRequest | ExpressServeStaticCoreRequest<T>;
export declare type RequestHandler<T extends Params = ParamsDictionary> = ExpressRequestHandler | ExpressServeStaticCoreRequestHandler<T>;
export declare function makeIteratorFromList<T>(list: T[]): IterableIterator<T>;
export declare function assert3ParamsType<T extends Params = ParamsDictionary>(middlewareList: RequestHandler<T>[]): boolean;
export declare function middlewareRunner<T extends Params = ParamsDictionary>(middlewareList: RequestHandler<T>[], req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=index.d.ts.map