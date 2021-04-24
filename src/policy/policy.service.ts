import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';

import { QueryParamDTO } from './dto/request/queryParam.dto';
import { PolicyDTO } from './dto/policy.dto';

import { ServiceLogger } from '../logger/logger.service';
import { InsuranceService } from '../apis/insurance';
import { handleError } from '../common/helper';
import { toPolicyListDTO } from './policy.mapper';

const FIRST_ITEM = 0;
const LIMIT = 10;

@Injectable()
export class PolicyService {
    constructor(
        private readonly logger: ServiceLogger,
        private insuranceService: InsuranceService
    ) {
        const instance = this.constructor;
        logger.setContext(instance.name);
    }

    getAllPolicies(queryParam: QueryParamDTO): Promise<PolicyDTO[]> {
        this.logger.info('Getting all policies');

        return this.insuranceService.getAllPolicies()
            .then((policies = []) => {

                return toPolicyListDTO(
                    policies.slice(FIRST_ITEM, queryParam.limit || LIMIT)
                );
            })
            .catch(err => handleError(this.logger, err));
    }
}
