import { HttpStatus, Injectable } from '@nestjs/common';

import { QueryParamDTO } from './dto/request/queryParam.dto';
import { PolicyDTO } from '../common/dtos/policy.dto';
import { ServiceLogger } from '../logger/logger.service';
import { InsuranceService } from '../apis/insurance';
import { handleError } from '../common/helper';
import { toPolicyListDTO, toPolicyDTO } from './policy.mapper';
import { ServiceException } from '../common/service.exception';

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

    getPolicyById(id: string): Promise<PolicyDTO> {
        this.logger.info(`Getting policy for: ${id}`);

        return this.insuranceService.getAllPolicies()
            .then((policies = []) => {

                const policy = policies.find(item => item.id == id);

                if (!policy) {
                    throw new ServiceException(
                        HttpStatus.NOT_FOUND,
                        'Policy not found'
                    );
                }
                return toPolicyDTO(policy);
            })
            .catch(err => handleError(this.logger, err));
    }
}
