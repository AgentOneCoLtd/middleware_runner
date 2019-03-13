import { middlewareRunner } from '../src';
import { allM } from './sync_middleware';

describe('res.json', () => {
    it('should call res.json at m1', () => {
        const mockReq = {
            body: {
                resJsonAtM1: true,
                resJsonAtM2: false,
                resJsonAtM3: false,
            },
        } as any;
        const mockRes = {
            json: jest.fn(),
        } as any;
        const mockNextFn = jest.fn();

        middlewareRunner(allM, mockReq, mockRes, mockNextFn);

        expect(mockRes.json.mock.calls.length).toBe(1);
        expect(mockRes.json.mock.calls[0][0]).toEqual({ message: 'm1' });
        expect(mockNextFn.mock.calls.length).toBe(0);
    });

    it('should call res.json at m2', () => {
        const mockReq = {
            body: {
                resJsonAtM1: false,
                resJsonAtM2: true,
                resJsonAtM3: false,
            },
        } as any;
        const mockRes = {
            json: jest.fn(),
        } as any;
        const mockNextFn = jest.fn();

        middlewareRunner(allM, mockReq, mockRes, mockNextFn);

        expect(mockRes.json.mock.calls.length).toBe(1);
        expect(mockRes.json.mock.calls[0][0]).toEqual({ message: 'm2' });
        expect(mockNextFn.mock.calls.length).toBe(1);
    });

    it('should call res.json at m3', () => {
        const mockReq = {
            body: {
                resJsonAtM1: false,
                resJsonAtM2: false,
                resJsonAtM3: true,
            },
        } as any;
        const mockRes = {
            json: jest.fn(),
        } as any;
        const mockNextFn = jest.fn();

        middlewareRunner(allM, mockReq, mockRes, mockNextFn);

        expect(mockRes.json.mock.calls.length).toBe(1);
        expect(mockRes.json.mock.calls[0][0]).toEqual({ message: 'm3' });
        expect(mockNextFn.mock.calls.length).toBe(2);
    });

    it('should not call res.json', () => {
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
        const mockNextFn = jest.fn();

        middlewareRunner(allM, mockReq, mockRes, mockNextFn);

        expect(mockRes.json.mock.calls.length).toBe(0);
        expect(mockNextFn.mock.calls.length).toBe(3);
    });
});

describe('next(error)', () => {
    it('should call next(error) at m1', () => {
        const mockReq = {
            body: {
                resJsonAtM1: 'true',
            },
        } as any;
        const mockRes = {
            json: jest.fn(),
        } as any;
        const mockNextFn = jest.fn();

        middlewareRunner(allM, mockReq, mockRes, mockNextFn);

        expect(mockRes.json.mock.calls.length).toBe(0);
        expect(mockNextFn.mock.calls.length).toBe(1);
        expect(mockNextFn.mock.calls[0][0]).toBeInstanceOf(TypeError);
    });

    it('should call next(error) at m2', () => {
        const mockReq = {
            body: {
                resJsonAtM1: false,
                resJsonAtM2: 'true',
            },
        } as any;
        const mockRes = {
            json: jest.fn(),
        } as any;
        const mockNextFn = jest.fn();

        middlewareRunner(allM, mockReq, mockRes, mockNextFn);

        expect(mockRes.json.mock.calls.length).toBe(0);
        expect(mockNextFn.mock.calls.length).toBe(2);
        expect(mockNextFn.mock.calls[0][0]).toBeUndefined();
        expect(mockNextFn.mock.calls[1][0]).toBeInstanceOf(TypeError);
    });

    it('should call next(error) at m3', () => {
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
        const mockNextFn = jest.fn();

        middlewareRunner(allM, mockReq, mockRes, mockNextFn);

        expect(mockRes.json.mock.calls.length).toBe(0);
        expect(mockNextFn.mock.calls.length).toBe(3);
        expect(mockNextFn.mock.calls[0][0]).toBeUndefined();
        expect(mockNextFn.mock.calls[1][0]).toBeUndefined();
        expect(mockNextFn.mock.calls[2][0]).toBeInstanceOf(TypeError);
    });
});
