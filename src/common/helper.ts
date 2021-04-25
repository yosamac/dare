import { HttpStatus } from '@nestjs/common';
import { hasIn, get, split, flow, cond, stubTrue } from 'lodash/fp';

import { ServiceException } from './service.exception';
import { ServiceLogger } from '../logger/logger.service';

type ExplicitError = {
    status: HttpStatus;
    msg?: string;
    response?: any
};

function handlerHelper(error): void | never {

    if (error instanceof ServiceException) throw error;
    if ('statusCode' in error) {
        throw new ServiceException(
            error.statusCode,
            error.msg || HttpStatus[error.statusCode]
        );
    }

    throw error;
}

export const handleError: (
    logger: ServiceLogger,
    err?: ExplicitError
) => ((err: any) => any) | any =
    (logger, err) => {

        if (err) {
            logger?.debugs(
                'Debugging managed error:',
                JSON.stringify(err, null, 4)
            );

            handlerHelper(err?.response?.data || err);
        }
    };

const hasAuthorizationHeader = hasIn('headers.authorization');
const getAuthorizationHeader = get('headers.authorization');
const splitAuthorizationToken = split(' ');
const isBearerFormat = (auth: string[]): boolean => auth[0] === 'Bearer';

const getToken = cond([
    [isBearerFormat, (auth) => auth[1] ],
    [stubTrue, (auth) => auth[0]]
]);

const getAuthorizationToken = flow(
    getAuthorizationHeader,
    splitAuthorizationToken,
    getToken
);

export const getJwt = cond([
    [hasAuthorizationHeader, getAuthorizationToken],
    [stubTrue, () => undefined]
]);