import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import nock from 'nock';

import { MainModule } from '../../src/main.module';
import {
    INSURANCE_API_ENDPOINT
} from '../../src/apis/insurance/insurance.constant';

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        process.env = Object.assign(process.env, {
            LOGGING_LEVEL: 'NONE',
        });

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [ MainModule ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    beforeEach(() => {
        nock.restore();
    });

    describe ('/login', () => {

        it('/ (POST) 200', () => {

            nock(INSURANCE_API_ENDPOINT)
                .get('/login')
                .reply(HttpStatus.OK, {
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6ImRhcmUiLCJpYXQiOjE2MTkyMDI2MTAsImV4cCI6MTYxOTIwMzIxMH0.mtzZPZxeeRlj7-S1ZJN676Ikih4Mx2y-qw93owd7Meo',
                    type: 'Bearer'
                });
            const payload = {
                username: 'dare',
                password: 's3cr3t'
            };
            return request(app.getHttpServer())
                .post('/login').send(payload)
                .expect(HttpStatus.OK);
        });

        it('/ (POST) 400', () => {

            const invalidPayload = {
                username: 'invalidUser',
                password: 12
            };
            return request(app.getHttpServer())
                .post('/login').send(invalidPayload)
                .expect(HttpStatus.BAD_REQUEST);
        });

        it('/ (POST) 401', () => {

            nock(INSURANCE_API_ENDPOINT)
                .get('/login')
                .replyWithError({
                    statusCode: 401,
                    error: 'Unauthorized',
                    message: 'invalid secret or client id'
                });
                const invalidPayload = {
                    username: 'invalidUser',
                    password: 'invalidPassword'
                };
            return request(app.getHttpServer())
                .post('/login').send(invalidPayload)
                .expect(HttpStatus.UNAUTHORIZED);
        });

    });
});
