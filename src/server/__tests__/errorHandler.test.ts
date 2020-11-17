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

  it('shoud call send fn with Error object', async (done) => {
    const mockError = boom.badRequest('test error');
    errorHandler(
      mockError as boom.Boom<Error>,
      mockRequest as Request,
      mockResponse as Response
    );
    expect(mockResponse.send).toBeCalledWith({ error: mockError });

    done();
  });

  it('has no statusCode, erro object should contain 500 of statusCode', async (done) => {
    const mockError = boom.badData('test Data', new Error());
    mockError.output.statusCode = undefined;
    errorHandler(
      mockError as boom.Boom<Error>,
      mockRequest as Request,
      mockResponse as Response
    );
    expect(mockResponse.status).toBeCalledWith(500);
    done();
  });
});
