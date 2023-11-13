import { mock } from 'jest-mock';
import { request } from 'supertest';

const logger = require('../../core/logger');
const mongoose = require('../../core/mongoose');
const app = require('../../core/express');
const TestUtilities = require('../../utils/testUtilities');


logger.level = 'off';

// Mock mongoose.connect()
mock(mongoose).connect.callsFake((uri) => {
    // Return a mock connection object
    return {
        connected: true,
    };
});

// Mock app.listen()
mock(app).listen.callsFake((port) => {
    // Return a mock server object
    return {
        listening: true,
    };
});

// Mock TestUtilities.createUser()
mock(TestUtilities).createUser.callsFake((data) => {
    // Return a mock user object
    return {
        id: '123456',
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        picture: data.picture,
        type: data.type,
    };
});

describe('Users API', () => {
    describe('PUT /v1/users/me', () => {
        it('should return user saved when user update info success', async () => {
            // Mock user data
            const userData = {
                email: 'userMember@gmail.com',
                first_name: 'lupulabs',
                last_name: 'member',
                picture: 'http:localhost',
                type: 'user',
            };

            // Make a request to the API
            const result = await request(app)
                .put('/v1/users/me')
                .set('Authorization', `Bearer ${userData.tokens.access_token}`)
                .set('Accept', 'application/json')
                .send(userData);

            // Assert the response
            expect(result.statusCode).toBe(200);
            expect(result.body).toEqual({
                id: '123456',
                email: userData.email,
                first_name: userData.first_name,
                last_name: userData.last_name,
                picture: userData.picture,
                type: userData.type,
            });
        });
    });
});