import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { MainModule } from '../../src/main.module';
import { AuthService } from '../../src/auth/auth.service';
import * as Mappers from '../../src/auth/auth.mapper';
import * as Helpers from '../../src/common/helper';
import { ServiceException } from '../../src/common/service.exception';

export const envs = {
    LOGGING_LEVEL: 'NONE',
    NODE_ENV: 'development'
};

describe('AuthService', () => {
    let authService: AuthService;

    beforeAll(async () => {

        process.env = Object.assign(process.env, envs);

        const app: TestingModule = await Test.createTestingModule({
            imports: [MainModule]
        }).compile();

        authService = app.get<AuthService>(AuthService);
    });

    describe('#login', () => {
        const validPayload = {
            username: 'dare',
            password: 's3cr3t'
        };

        it('Should login successful', () => {

            const toOAuthDTOSpy = jest.spyOn(Mappers, 'toOAuthDTO');
            return authService.login(validPayload)
                .then(res => {
                    expect(res.token).toBeDefined();
                    expect(res.expires_in).toBeDefined();
                    expect(res.type).toEqual('Bearer');
                    expect(toOAuthDTOSpy).toBeCalledTimes(1);
                    toOAuthDTOSpy.mockRestore();
                });
        });

        it('Should throw a service exception 401', () => {
            const invalidPayload = {
                username: 'invalidusername',
                password: 'invalidPassword',
            };

            const handleErrorSpy = jest.spyOn(Helpers, 'handleError');

            return authService.login(invalidPayload)
                .catch(err => {
                    expect(err).toBeInstanceOf(ServiceException);
                    expect(err.getStatus()).toBe(HttpStatus.UNAUTHORIZED);
                    expect(handleErrorSpy).toBeCalledTimes(1);
                    handleErrorSpy.mockRestore();
                });
        });
    });
});
