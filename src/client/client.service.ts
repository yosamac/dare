import { HttpStatus, Injectable } from '@nestjs/common';

import { QueryParamDTO } from './dto/request/queryParam.dto';
import { ClientDTO } from './dto/client.dto';
import { PolicyDTO } from '../common/dtos/policy.dto';
import { ServiceLogger } from '../logger/logger.service';
import { InsuranceService } from '../apis/insurance';
import { handleError } from '../common/helper';
import { toClientListDTO, toClientDTO } from './client.mapper';
import { ServiceException } from '../common/service.exception';

const FIRST_ITEM = 0;
const LIMIT = 10;

@Injectable()
export class ClientService {
    constructor(
        private readonly logger: ServiceLogger,
        private insuranceService: InsuranceService
    ) {
        const instance = this.constructor;
        logger.setContext(instance.name);
    }

    getAllClients(queryParam: QueryParamDTO, clientId: string): Promise<ClientDTO[]> {
        this.logger.info('Getting all clients');

        return this.insuranceService.getAllClients(clientId)
            .then(async (clients = []) => {

                if (queryParam.name) {
                    clients = clients.filter(item => item.name == queryParam.name);
                }

                const policies: [] = await this.insuranceService.getAllPolicies(clientId)
                    .catch(err => handleError(this.logger, err));

                const clientsWithPolicies = clients.map(item => ({
                    ...item,
                    policies: this.findPoliciesForEmail(item.email, policies)
                }));

                return toClientListDTO(
                    clientsWithPolicies.slice(FIRST_ITEM, queryParam.limit || LIMIT)
                );
            })
            .catch(err => handleError(this.logger, err));
    }

    getClientById(id: string, clientId: string): Promise<ClientDTO> {
        this.logger.info(`Getting client data for: ${id}`);

        return this.insuranceService.getAllClients(clientId)
            .then(async (clients = []) => {

                const client = clients.find(item => item.id == id);

                if (!client) {
                    throw new ServiceException(
                        HttpStatus.NOT_FOUND,
                        'Client not found'
                    );
                }
                const policies: [] = await this.insuranceService.getAllPolicies(clientId)
                    .catch(err => handleError(this.logger, err));

                client.policies = this.findPoliciesForEmail(client.email, policies);
                return toClientDTO(client);
            })
            .catch(err => handleError(this.logger, err));
    }

    getPoliciesByClientId(id: string, clientId: string): Promise<PolicyDTO[]> {
        this.logger.info(`Getting policies for: ${id}`);
        return this.getClientById(id, clientId).then(res => res.policies);
    }

    private findPoliciesForEmail(email: string, policies: any[]): any[] {
        return policies.map(item => (
            item.email == email
                ? item
                : undefined
        )).filter(Boolean);
    }
}
