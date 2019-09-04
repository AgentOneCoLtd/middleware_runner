import { middlewareRunner } from '../src';
import { allM, m1, m2, m3 } from './async_middleware';

describe('verify mocked middleware behavior', () => {
    it('should call next() after 1 sec. (m1)', (done) => {
        const before = Date.now();

        const mockReq = {
            body: {
                resJsonAtM1: false,
            },
        } as any;
        const mockResJson = jest.fn();
        const mockRes = { json: mockResJson } as any;
        const mockNextFn = (): void => {
            const after = Date.now();

            expect(after - before).toBeGreaterThan(999);

            done();
        };

        m1(mockReq, mockRes, mockNextFn);
    });

    it('should call next() after 1 sec. (m2)', (done) => {
        const before = Date.now();

        const mockReq = {
            body: {
                resJsonAtM2: false,
            },
        } as any;
        const mockResJson = jest.fn();
        const mockRes = { json: mockResJson } as any;
        const mockNextFn = (): void => {
            const after = Date.now();

            expect(after - before).toBeGreaterThan(999);

            done();
        };

        m2(mockReq, mockRes, mockNextFn);
    });

    it('should call next() after 1 sec. (m2)', (done) => {
        const before = Date.now();

        const mockReq = {
            body: {
                resJsonAtM3: false,
            },
        } as any;
        const mockResJson = jest.fn();
        const mockRes = { json: mockResJson } as any;
        const mockNextFn = (): void => {
            const after = Date.now();

            expect(after - before).toBeGreaterThan(999);

            done();
        };

        m3(mockReq, mockRes, mockNextFn);
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
        } as any;
        const mockNextFn = jest.fn();
        const mockRes = {
            json: (val?: any) => {
                expect(val).toEqual({ message: 'm1' });
                expect(mockNextFn.mock.calls.length).toBe(0);
                done();
            },
        } as any;

        middlewareRunner(allM, mockReq, mockRes, mockNextFn);
    });

    it('should call res.json at m2', (done) => {
        const mockReq = {
            body: {
                resJsonAtM1: false,
                resJsonAtM2: true,
                resJsonAtM3: false,
            },
        } as any;
        const mockNextFn = jest.fn();
        const mockRes = {
            json: (val?: any) => {
                expect(val).toEqual({ message: 'm2' });
                expect(mockNextFn.mock.calls.length).toBe(1);
                done();
            },
        } as any;

        middlewareRunner(allM, mockReq, mockRes, mockNextFn);
    });

    it('should call res.json at m3', (done) => {
        const mockReq = {
            body: {
                resJsonAtM1: false,
                resJsonAtM2: false,
                resJsonAtM3: true,
            },
        } as any;
        const mockNextFn = jest.fn();
        const mockRes = {
            json: (val?: any) => {
                expect(val).toEqual({ message: 'm3' });
                expect(mockNextFn.mock.calls.length).toBe(2);
                done();
            },
        } as any;

        middlewareRunner(allM, mockReq, mockRes, mockNextFn);
    });

    it('should not call res.json', (done) => {
        const mockReq = {
            body: {
                resJsonAtM1: false,
                resJsonAtM2: false,
                resJsonAtM3: false,
            },
        } as any;
        const mockRes = {
            json: jest.fn(),
        } as any;
        let callMockNextFnCount = 0;
        const mockNextFn = (error?: any): void => {
            callMockNextFnCount += 1;

            expect(error).toBeUndefined();

            if (callMockNextFnCount < 3) {
                return;
            }

            expect(mockRes.json.mock.calls.length).toBe(0);
            done();
        };

        middlewareRunner(allM, mockReq, mockRes, mockNextFn);
    });
});

describe('next(error)', () => {
    it('should call next(error) at m1', (done) => {
        const mockReq = {
            body: {
                resJsonAtM1: 'true',
            },
        } as any;
        const mockRes = {
            json: jest.fn(),
        } as any;
        const mockNextFn = (error?: any): void => {
            expect(error).toBeInstanceOf(TypeError);
            done();
        };

        middlewareRunner(allM, mockReq, mockRes, mockNextFn);
    });

    it('should call next(error) at m2', (done) => {
        const mockReq = {
            body: {
                resJsonAtM1: false,
                resJsonAtM2: 'true',
            },
        } as any;
        const mockRes = {
            json: jest.fn(),
        } as any;
        let callMockNextFnCount = 0;
        const mockNextFn = (error?: any): void => {
            callMockNextFnCount += 1;

            if (callMockNextFnCount === 1) {
                expect(error).toBeUndefined();
            } else if (callMockNextFnCount === 2) {
                expect(error).toBeInstanceOf(TypeError);
                done();
            } else {
                done.fail('should not be called');
            }
        };

        middlewareRunner(allM, mockReq, mockRes, mockNextFn);
    });

    it('should call next(error) at m3', (done) => {
        const mockReq = {
            body: {
                resJsonAtM1: false,
                resJsonAtM2: false,
                resJsonAtM3: 'true',
            },
        } as any;
        const mockRes = {
            json: jest.fn(),
        } as any;
        let callMockNextFnCount = 0;
        const mockNextFn = (error?: any): void => {
            callMockNextFnCount += 1;

            if (callMockNextFnCount <= 2) {
                expect(error).toBeUndefined();
            } else if (callMockNextFnCount === 3) {
                expect(error).toBeInstanceOf(TypeError);
                done();
            } else {
                done.fail('should not be called');
            }
        };

        middlewareRunner(allM, mockReq, mockRes, mockNextFn);
    });
});
