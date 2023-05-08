const axios = {
  create: () => axios,
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  isAxiosError: jest.fn(),
};

export default axios;
