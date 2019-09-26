import { isNil } from '@ag1/nil';
import { NextFunction, Request as ExpressRequest, RequestHandler as ExpressRequestHandler, Response } from 'express';
import {
    RequestHandler as ExpressServeStaticCoreRequestHandler,
    Params,
    ParamsDictionary,
    Request as ExpressServeStaticCoreRequest,
} from 'express-serve-static-core';
import { inspect } from 'util';

export type Request<T extends Params = ParamsDictionary> = ExpressRequest | ExpressServeStaticCoreRequest<T>;

export type RequestHandler<T extends Params = ParamsDictionary> =
    | ExpressRequestHandler
    | ExpressServeStaticCoreRequestHandler<T>;

export function* makeIteratorFromList<T>(list: T[]): IterableIterator<T> {
    for (const item of list) {
        yield item;
    }
}

export function assert3ParamsType<T extends Params = ParamsDictionary>(middlewareList: RequestHandler<T>[]): boolean {
    const not3ParamsTypeList = middlewareList.filter((m) => m.length !== 3);

    if (not3ParamsTypeList.length !== 0) {
        throw new TypeError(`INVALID_MIDDLEWARE_TYPE: ${inspect(not3ParamsTypeList)}`);
    }

    return true;
}

export function middlewareRunner<T extends Params = ParamsDictionary>(
    middlewareList: RequestHandler<T>[],
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    assert3ParamsType(middlewareList);

    const iterator = makeIteratorFromList(middlewareList);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const myNextFn = (error: any): void => {
        if (!isNil(error)) {
            next(error);

            return;
        }

        next();

        const { value: nextMiddleware } = iterator.next();
        if (!isNil(nextMiddleware)) {
            nextMiddleware(req, res, myNextFn);
        }
    };

    const { value: firstMiddleware } = iterator.next();
    if (!isNil(firstMiddleware)) {
        firstMiddleware(req, res, myNextFn);
    }
}
