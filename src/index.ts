import { isNil } from '@ag1/nil';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { inspect } from 'util';

export function* makeIteratorFromList<T>(list: T[]) {
    for (const item of list) {
        yield item;
    }
}

export function assert3ParamsType(middlewareList: RequestHandler[]) {
    const not3ParamsTypeList = middlewareList.filter((m) => m.length !== 3);

    if (not3ParamsTypeList.length !== 0) {
        throw new TypeError(`INVALID_MIDDLEWARE_TYPE: ${inspect(not3ParamsTypeList)}`);
    }

    return true;
}

export function middlewareRunner(middlewareList: RequestHandler[], req: Request, res: Response, next: NextFunction) {
    assert3ParamsType(middlewareList);

    const iterator = makeIteratorFromList(middlewareList);

    // tslint:disable-next-line no-any
    const myNextFn = (error: any) => {
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
