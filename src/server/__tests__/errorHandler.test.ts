import { Request, Response } from 'express';
import boom from '@hapi/boom';
import { errorHandler } from '../middleware/error';

// import request from 'supertest';

describe('errorHandler', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  // const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
      send: jest.fn(),
    };
  });

  it('shoud be called send fn with Error object', async (done) => {
    const mockError = boom.badRequest('test error');
    console.log(mockError);
    errorHandler(
      mockError as boom.Boom<Error>,
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.send).toBeCalledWith({ error: mockError });

    done();
  });
});
