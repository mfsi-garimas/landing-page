/**
 * @jest-environment node
 */
import {GET} from '../api/services/route';
import { mockApi } from '../utils/mockAPi';

describe('/api/services', () => {
  it('should return a list of services on GET request', async () => {
    const { req, res } = mockApi({ method: 'GET' });

    await GET(req, res);

    expect(res._getStatusCode()).toBe(200);
    // expect(res._getJSONData().length).toBe(2);
    // expect(res._getJSONData()[0]).toHaveProperty('title', 'MVP');
  }, 10000);
})