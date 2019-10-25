"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nil_1 = require("@ag1/nil");
const util_1 = require("util");
function* makeIteratorFromList(list) {
    for (const item of list) {
        yield item;
    }
}
exports.makeIteratorFromList = makeIteratorFromList;
function assertMiddlewareParamsType(middlewareList) {
    const not3ParamsTypeList = middlewareList.filter((m) => m.length < 3 || m.length > 4);
    if (not3ParamsTypeList.length !== 0) {
        throw new TypeError(`INVALID_MIDDLEWARE_TYPE: ${util_1.inspect(not3ParamsTypeList)}`);
    }
    return true;
}
exports.assertMiddlewareParamsType = assertMiddlewareParamsType;
function middlewareRunner(middlewareList, req, res, next) {
    assertMiddlewareParamsType(middlewareList);
    const iterator = makeIteratorFromList(middlewareList);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const myNextFn = (error) => {
        if (!nil_1.isNil(error)) {
            next(error);
            return;
        }
        next();
        const { value: nextMiddleware } = iterator.next();
        if (!nil_1.isNil(nextMiddleware)) {
            nextMiddleware(req, res, myNextFn);
        }
    };
    const { value: firstMiddleware } = iterator.next();
    if (!nil_1.isNil(firstMiddleware)) {
        firstMiddleware(req, res, myNextFn);
    }
}
exports.middlewareRunner = middlewareRunner;
//# sourceMappingURL=index.js.map