import { Request, Response } from "express";
import { registerCtrl } from "../controllers/auth.controller";
describe('User Register', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let responseObject:any;

    beforeEach(() => {
        mockRequest = {
            body: {
                "name": "Rosa",
                "email": "rosa.meltroso1@example.com",
                "password": "12345"
            }
        };
        mockResponse = {
            statusCode: 0,
            send: jest.fn().mockImplementation(result => {
                responseObject = result;
            })
        }
    });

    test.skip('200 - register user', () => {
        const expectedStatusCode = 200;
        const expectedResponse = {
            xxx: 1
        }

        registerCtrl(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.statusCode).toBe(expectedStatusCode);
        // expect(responseObject).toEqual(expectedResponse);
    })
});