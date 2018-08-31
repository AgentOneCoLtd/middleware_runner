"use strict";
/* tslint:disable:no-implicit-dependencies */
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
function* makeIteratorFromList(list) {
    for (const item of list) {
        yield item;
    }
}
exports.makeIteratorFromList = makeIteratorFromList;
function assert3ParamsType(middlewareList) {
    const not3ParamsTypeList = middlewareList.filter((m) => m.length !== 3);
    if (not3ParamsTypeList.length !== 0) {
        throw new TypeError(`INVALID_MIDDLEWARE_TYPE: ${util_1.inspect(not3ParamsTypeList)}`);
    }
    return true;
}
exports.assert3ParamsType = assert3ParamsType;
function middlewareRunner(middlewareList, req, res, next) {
    assert3ParamsType(middlewareList);
    const listIterator = makeIteratorFromList(middlewareList);
    const myNextFn = (error) => {
        if (error) {
            next(error);
            return;
        }
        next();
        const { value: nextMiddleware } = listIterator.next();
        if (nextMiddleware) {
            nextMiddleware(req, res, myNextFn);
        }
    };
    const { value: firstMiddleware } = listIterator.next();
    firstMiddleware(req, res, myNextFn);
}
exports.middlewareRunner = middlewareRunner;
