import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { INSURANCE_API_ENDPOINT } from './insurance.constant';
import { OAuthDTO } from '../insurance/dtos/oauth.dto';
import { ServiceLogger } from 'src/logger/logger.service';

@Injectable()
export class InsuranceService {
    private credentials: OAuthDTO;

    constructor(
        private readonly httpService: HttpService,
        private readonly logger: ServiceLogger,
        private readonly config: ConfigService
    ) {
        logger.setContext(this.constructor.name);
        this.credentials = {
            // eslint-disable-next-line @typescript-eslint/camelcase
            client_id: config.get<string>('apis.insurance.clientId'),
            // eslint-disable-next-line @typescript-eslint/camelcase
            client_secret: config.get<string>('apis.insurance.clientSecret')
        };
    }

    login(credentials: OAuthDTO): Promise<any>{
        return this.httpService.post(
            `${INSURANCE_API_ENDPOINT}/login`,
            credentials
        ).toPromise().then(res => res.data);
    }

    async getAllPolicies(): Promise<any> {

        return this.login(this.credentials)
            .then(({ type, token }) => {
                const authorization = `${type} ${token}`;

                return this.httpService.get(
                    `${INSURANCE_API_ENDPOINT}/policies`,
                    { headers: { authorization } }
                ).toPromise().then(res => res.data);
            });
    }
}
