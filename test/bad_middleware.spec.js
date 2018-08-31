"use strict";
/* tslint:disable:no-unsafe-any */
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const bad_middleware_1 = require("./bad_middleware");
it('should call res.json 1 time, next 3', () => {
    const mockReq = {};
    const mockRes = {
        json: jest.fn(),
    };
    const mockNextFn = jest.fn();
    index_1.middlewareRunner(bad_middleware_1.allM, mockReq, mockRes, mockNextFn);
    expect(mockRes.json.mock.calls.length).toBe(1);
    expect(mockRes.json.mock.calls[0][0]).toEqual({ message: 'm2' });
    expect(mockNextFn.mock.calls.length).toBe(3);
    expect(mockNextFn.mock.calls[0][0]).toBeUndefined();
    expect(mockNextFn.mock.calls[1][0]).toBeUndefined();
    expect(mockNextFn.mock.calls[2][0]).toBeUndefined();
});
