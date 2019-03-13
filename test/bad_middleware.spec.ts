import { middlewareRunner } from '../src';
import { allM } from './bad_middleware';

it('should call res.json 1 time, next 3', () => {
    const mockReq = {} as any;
    const mockRes = {
        json: jest.fn(),
    } as any;
    const mockNextFn = jest.fn();

    middlewareRunner(allM, mockReq, mockRes, mockNextFn);

    expect(mockRes.json.mock.calls.length).toBe(1);
    expect(mockRes.json.mock.calls[0][0]).toEqual({ message: 'm2' });

    expect(mockNextFn.mock.calls.length).toBe(3);
    expect(mockNextFn.mock.calls[0][0]).toBeUndefined();
    expect(mockNextFn.mock.calls[1][0]).toBeUndefined();
    expect(mockNextFn.mock.calls[2][0]).toBeUndefined();
});
