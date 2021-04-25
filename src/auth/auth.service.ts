import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';

import { LoginDTO } from './dto/request/login.dto';
import { AuthResponseDTO } from './dto/auth.dto';

import { ServiceLogger } from '../logger/logger.service';
import { InsuranceService } from '../apis/insurance';
import { handleError } from '../common/helper';
import { toOAuthDTO, toAuthResponseDTO } from './auth.mapper';

@Injectable()
export class AuthService {
    constructor(
        private readonly logger: ServiceLogger,
        private insuranceService: InsuranceService
    ) {
        const instance = this.constructor;
        logger.setContext(instance.name);
    }

    login(credentials: LoginDTO): Promise<AuthResponseDTO> {
        this.logger.info(`Authenticating for ${credentials.username}`);

        return this.insuranceService.login(toOAuthDTO(credentials))
            .then(res => {
                const decoded = this.decodeJwt(res.token);
                return toAuthResponseDTO({
                    ...res,
                    expiresIn: decoded.exp
                });
            })
            .catch(err => handleError(this.logger, err));
    }

    decodeJwt(token: string): any {
        return jwt.decode(token);
    }
}
