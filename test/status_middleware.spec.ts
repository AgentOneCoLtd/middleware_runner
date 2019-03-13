import { middlewareRunner } from '../src';
import { allM } from './status_middleware';

it('should call res.status and res.json at m1', async () => {
    const mockReq = {} as any;
    const mockRes = {
        status: undefined,
        json: jest.fn(),
    } as any;
    mockRes.status = jest.fn(() => mockRes);
    const mockNextFn = jest.fn();
    middlewareRunner(allM, mockReq, mockRes, mockNextFn);

    expect(mockRes.status.mock.calls.length).toBe(1);
    expect(mockRes.status.mock.calls[0][0]).toBe(401);

    expect(mockRes.json.mock.calls.length).toBe(1);
    expect(mockRes.json.mock.calls[0][0]).toEqual({ message: 'Unauthorized' });

    expect(mockNextFn.mock.calls.length).toBe(0);
});
