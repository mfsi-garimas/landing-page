import { createMocks } from 'node-mocks-http';

export const mockApi = ({ method = 'GET', body = {}, query = {}, headers = {} } = {}) => {
  const { req, res } = createMocks({
    method,
    body,
    query,
    headers,
  });

  return { req, res };
};