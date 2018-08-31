"use strict";
/* tslint:disable:no-unsafe-any */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const status_middleware_1 = require("./status_middleware");
it('should call res.status and res.json at m1', () => __awaiter(this, void 0, void 0, function* () {
    const mockReq = {};
    const mockRes = {
        status: undefined,
        json: jest.fn(),
    };
    mockRes.status = jest.fn(() => mockRes);
    const mockNextFn = jest.fn();
    index_1.middlewareRunner(status_middleware_1.allM, mockReq, mockRes, mockNextFn);
    expect(mockRes.status.mock.calls.length).toBe(1);
    expect(mockRes.status.mock.calls[0][0]).toBe(401);
    expect(mockRes.json.mock.calls.length).toBe(1);
    expect(mockRes.json.mock.calls[0][0]).toEqual({ message: 'Unauthorized' });
    expect(mockNextFn.mock.calls.length).toBe(0);
}));
