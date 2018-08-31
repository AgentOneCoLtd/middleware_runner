"use strict";
/* tslint:disable:no-unsafe-any */
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const async_middleware_1 = require("./async_middleware");
describe('verify mocked middleware behavior', () => {
    it('should call next() after 1 sec. (m1)', (done) => {
        const before = Date.now();
        const mockReq = {
            body: {
                resJsonAtM1: false,
            },
        };
        const mockResJson = jest.fn();
        const mockRes = { json: mockResJson };
        const mockNextFn = () => {
            const after = Date.now();
            expect(after - before).toBeGreaterThan(999);
            done();
        };
        async_middleware_1.m1(mockReq, mockRes, mockNextFn);
    });
    it('should call next() after 1 sec. (m2)', (done) => {
        const before = Date.now();
        const mockReq = {
            body: {
                resJsonAtM2: false,
            },
        };
        const mockResJson = jest.fn();
        const mockRes = { json: mockResJson };
        const mockNextFn = () => {
            const after = Date.now();
            expect(after - before).toBeGreaterThan(999);
            done();
        };
        async_middleware_1.m2(mockReq, mockRes, mockNextFn);
    });
    it('should call next() after 1 sec. (m2)', (done) => {
        const before = Date.now();
        const mockReq = {
            body: {
                resJsonAtM3: false,
            },
        };
        const mockResJson = jest.fn();
        const mockRes = { json: mockResJson };
        const mockNextFn = () => {
            const after = Date.now();
            expect(after - before).toBeGreaterThan(999);
            done();
        };
        async_middleware_1.m3(mockReq, mockRes, mockNextFn);
    });
});
describe('res.json', () => {
    it('should call res.json at m1', (done) => {
        const mockReq = {
            body: {
                resJsonAtM1: true,
                resJsonAtM2: false,
                resJsonAtM3: false,
            },
        };
        const mockNextFn = jest.fn();
        const mockRes = {
            json: (val) => {
                expect(val).toEqual({ message: 'm1' });
                expect(mockNextFn.mock.calls.length).toBe(0);
                done();
            },
        };
        index_1.middlewareRunner(async_middleware_1.allM, mockReq, mockRes, mockNextFn);
    });
    it('should call res.json at m2', (done) => {
        const mockReq = {
            body: {
                resJsonAtM1: false,
                resJsonAtM2: true,
                resJsonAtM3: false,
            },
        };
        const mockNextFn = jest.fn();
        const mockRes = {
            json: (val) => {
                expect(val).toEqual({ message: 'm2' });
                expect(mockNextFn.mock.calls.length).toBe(1);
                done();
            },
        };
        index_1.middlewareRunner(async_middleware_1.allM, mockReq, mockRes, mockNextFn);
    });
    it('should call res.json at m3', (done) => {
        const mockReq = {
            body: {
                resJsonAtM1: false,
                resJsonAtM2: false,
                resJsonAtM3: true,
            },
        };
        const mockNextFn = jest.fn();
        const mockRes = {
            json: (val) => {
                expect(val).toEqual({ message: 'm3' });
                expect(mockNextFn.mock.calls.length).toBe(2);
                done();
            },
        };
        index_1.middlewareRunner(async_middleware_1.allM, mockReq, mockRes, mockNextFn);
    });
    it('should not call res.json', (done) => {
        const mockReq = {
            body: {
                resJsonAtM1: false,
                resJsonAtM2: false,
                resJsonAtM3: false,
            },
        };
        const mockRes = {
            json: jest.fn(),
        };
        let callMockNextFnCount = 0;
        const mockNextFn = (error) => {
            callMockNextFnCount += 1;
            expect(error).toBeUndefined();
            if (callMockNextFnCount < 3) {
                return;
            }
            expect(mockRes.json.mock.calls.length).toBe(0);
            done();
        };
        index_1.middlewareRunner(async_middleware_1.allM, mockReq, mockRes, mockNextFn);
    });
});
describe('next(error)', () => {
    it('should call next(error) at m1', (done) => {
        const mockReq = {
            body: {
                resJsonAtM1: 'true',
            },
        };
        const mockRes = {
            json: jest.fn(),
        };
        const mockNextFn = (error) => {
            expect(error).toBeInstanceOf(TypeError);
            done();
        };
        index_1.middlewareRunner(async_middleware_1.allM, mockReq, mockRes, mockNextFn);
    });
    it('should call next(error) at m2', (done) => {
        const mockReq = {
            body: {
                resJsonAtM1: false,
                resJsonAtM2: 'true',
            },
        };
        const mockRes = {
            json: jest.fn(),
        };
        let callMockNextFnCount = 0;
        const mockNextFn = (error) => {
            callMockNextFnCount += 1;
            if (callMockNextFnCount === 1) {
                expect(error).toBeUndefined();
            }
            else if (callMockNextFnCount === 2) {
                expect(error).toBeInstanceOf(TypeError);
                done();
            }
            else {
                done.fail('should not be called');
            }
        };
        index_1.middlewareRunner(async_middleware_1.allM, mockReq, mockRes, mockNextFn);
    });
    it('should call next(error) at m3', (done) => {
        const mockReq = {
            body: {
                resJsonAtM1: false,
                resJsonAtM2: false,
                resJsonAtM3: 'true',
            },
        };
        const mockRes = {
            json: jest.fn(),
        };
        let callMockNextFnCount = 0;
        const mockNextFn = (error) => {
            callMockNextFnCount += 1;
            if (callMockNextFnCount <= 2) {
                expect(error).toBeUndefined();
            }
            else if (callMockNextFnCount === 3) {
                expect(error).toBeInstanceOf(TypeError);
                done();
            }
            else {
                done.fail('should not be called');
            }
        };
        index_1.middlewareRunner(async_middleware_1.allM, mockReq, mockRes, mockNextFn);
    });
});
