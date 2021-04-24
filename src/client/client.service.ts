import { HttpStatus, Injectable } from '@nestjs/common';

import { QueryParamDTO } from './dto/request/queryParam.dto';
import { ClientDTO, PolicyDTO } from './dto/client.dto';
import { ServiceLogger } from '../logger/logger.service';
import { InsuranceService } from '../apis/insurance';
import { handleError } from '../common/helper';
import { toClientListDTO, toClientDTO } from './client.mapper';
import { ServiceException } from 'src/common/service.exception';

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

    getAllClients(queryParam: QueryParamDTO): Promise<ClientDTO[]> {
        this.logger.info('Getting all clients');

        return this.insuranceService.getAllClients()
            .then((clients = []) => {

                if (queryParam.name) {
                    clients = clients.filter(item => item.name == queryParam.name);
                }

                const promises = clients.map(async item => ({
                    ...item,
                    policies: await this.getPoliciesByEmail(item.email)
                }));

                return Promise.all(promises)
                    .then(clientsWithPolicies => {
                        return toClientListDTO(
                            clientsWithPolicies.slice(FIRST_ITEM, queryParam.limit || LIMIT)
                        );
                    });
            })
            .catch(err => handleError(this.logger, err));
    }

    getClientById(id: string): Promise<ClientDTO> {
        this.logger.info(`Getting client data for: ${id}`);

        return this.insuranceService.getAllClients()
            .then(async (clients = []) => {

                const client = clients.find(item => item.id == id);

                if (!client) {
                    throw new ServiceException(
                        HttpStatus.NOT_FOUND,
                        'Client not found'
                    );
                }
                client.policies = await this.getPoliciesByEmail(client.email);
                return toClientDTO(client);
            })
            .catch(err => handleError(this.logger, err));
    }

    getPoliciesByClientId(id: string): Promise<PolicyDTO[]> {
        return this.getClientById(id).then(res => res.policies);
    }


    private getPoliciesByEmail(email: string): Promise<any> {

        return this.insuranceService.getAllPolicies()
            .then((policies = []) => {
                return policies.map(item => (
                    item.email == email
                        ? item
                        : undefined
                )).filter(Boolean);
            });
    }


}
