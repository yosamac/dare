import { Injectable, HttpService } from '@nestjs/common';

import { INSURANCE_API_ENDPOINT } from './insurance.constant';
import { OAuthDTO } from '../insurance/dtos/oauth.dto';

@Injectable()
export class InsuranceService {
    constructor(
        private httpService: HttpService
    ) {}

    login(credentials: OAuthDTO): Promise<any>{
        return this.httpService.post(
            `${INSURANCE_API_ENDPOINT}/login`,
            credentials
        ).toPromise().then(res => res.data);
    }
}
