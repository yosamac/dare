import { Injectable, HttpService, CACHE_MANAGER, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import * as jwt from 'jsonwebtoken';

import { INSURANCE_API_ENDPOINT } from './insurance.constant';
import { OAuthDTO } from '../insurance/dtos/oauth.dto';

const ONE_SECOND_MS = 1000;

@Injectable()
export class InsuranceService {
    private credentials: OAuthDTO;

    constructor(
        private readonly httpService: HttpService,
        private readonly config: ConfigService,
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache
    ) {
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
        ).toPromise().then(async (res) => {
            const authorization = `${res?.data?.type} ${res?.data?.token}`;
            const decoded = jwt.decode(res?.data?.token);
            const ttl = ONE_SECOND_MS * decoded.exp - decoded.iat;
            await this.cacheManager.del(credentials.client_id);

            await this.cacheManager.set(
                credentials.client_id,
                authorization,
                { ttl }
            );
            return res.data;
        });
    }

    getAllPolicies(): Promise<any> {

        return this.cacheManager.get(this.credentials.client_id)
            .then(async token => {
                let authorization = token;
                if (!token){
                    authorization = await this.getAuthorization();
                }
                return this.httpService.get(
                    `${INSURANCE_API_ENDPOINT}/policies`,
                    { headers: { authorization } }
                ).toPromise().then(res => res.data);
            });
    }

    getAllClients(): Promise<any> {

        return this.cacheManager.get(this.credentials.client_id)
            .then(async token => {
                let authorization = token;
                if (!token){
                    authorization = await this.getAuthorization();
                }
                return this.httpService.get(
                    `${INSURANCE_API_ENDPOINT}/clients`,
                    { headers: { authorization } }
                ).toPromise().then(res => res.data);
            });
    }

    private getAuthorization(): Promise<string> {
        return this.login(this.credentials)
            .then(({ type, token }) => `${type} ${token}`)
            .catch(err => { throw err; });
    }
}
