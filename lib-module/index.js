import { isNil } from '@ag1/nil';
import { inspect } from 'util';
export function* makeIteratorFromList(list) {
    for (const item of list) {
        yield item;
    }
}
export function assertMiddlewareParamsType(middlewareList) {
    const not3ParamsTypeList = middlewareList.filter((m) => m.length < 3 || m.length > 4);
    if (not3ParamsTypeList.length !== 0) {
        throw new TypeError(`INVALID_MIDDLEWARE_TYPE: ${inspect(not3ParamsTypeList)}`);
    }
    return true;
}
export function middlewareRunner(middlewareList, req, res, next) {
    assertMiddlewareParamsType(middlewareList);
    const iterator = makeIteratorFromList(middlewareList);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const myNextFn = (error) => {
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
//# sourceMappingURL=index.js.map