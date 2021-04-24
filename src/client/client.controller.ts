import {
    Controller, UseFilters,
    Get, Query, HttpStatus,
    HttpCode, Param
} from '@nestjs/common';
import { ApiResponse, ApiTags, } from '@nestjs/swagger';

import { ClientService } from './client.service';
import { ClientDTO } from './dto/client.dto';
import { QueryParamDTO , QueryParamPipe } from './dto/request/queryParam.dto';
import { IdDTO, IdPipe } from '../common/dtos/id.dto';

import {
    ServiceHttpResponse,
    HttpExceptionFilter,
} from '../common/exception.filter';
import { PolicyDTO } from '../common/dtos/policy.dto';

@Controller('/clients')
@ApiTags('Clients')
@UseFilters(HttpExceptionFilter)
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The  was successfully created',
        type: ClientDTO,
        isArray: true
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
        type: ServiceHttpResponse
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal error',
        type: ServiceHttpResponse
    })
    getPolicies(
        @Query(QueryParamPipe) queryParam: QueryParamDTO
    ): Promise<ClientDTO[]> {
        return this.clientService.getAllClients(queryParam);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The client was successfully returned',
        type: ClientDTO
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
        type: ServiceHttpResponse
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal error',
        type: ServiceHttpResponse
    })
    getPolicy(
        @Param(IdPipe) param: IdDTO
    ): Promise<ClientDTO> {
        return this.clientService.getClientById(param.id);
    }

    @Get('/:id/policies')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The client was successfully returned',
        type: PolicyDTO,
        isArray: true
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
        type: ServiceHttpResponse
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Client not found',
        type: ServiceHttpResponse
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal error',
        type: ServiceHttpResponse
    })
    getPoliciesByClientId(
        @Param(IdPipe) param: IdDTO
    ): Promise<PolicyDTO[]> {
        return this.clientService.getPoliciesByClientId(param.id);
    }
}
