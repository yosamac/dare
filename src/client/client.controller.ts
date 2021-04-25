import {
    Controller, UseFilters,
    Get, Query, HttpStatus,
    HttpCode, Param, UseGuards, Req
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { ClientService } from './client.service';
import { ClientDTO } from './dto/client.dto';
import { QueryParamDTO , QueryParamPipe } from './dto/request/queryParam.dto';
import { IdDTO, IdPipe } from '../common/dtos/id.dto';
import { AuthGuard } from '../common/auth.guard';

import {
    ServiceHttpResponse,
    HttpExceptionFilter,
} from '../common/exception.filter';
import { PolicyDTO } from '../common/dtos/policy.dto';

@Controller('/clients')
@ApiTags('Clients')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@UseFilters(HttpExceptionFilter)
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The clients were successfully returned',
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
    getClients(
        @Query(QueryParamPipe) queryParam: QueryParamDTO,
        @Req() req
    ): Promise<ClientDTO[]> {
        return this.clientService.getAllClients(queryParam, req.clientId);
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
    getClient(
        @Param(IdPipe) param: IdDTO,
        @Req() req
    ): Promise<ClientDTO> {
        return this.clientService.getClientById(param.id, req.clientId);
    }

    @Get('/:id/policies')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The policies were successfully returned',
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
        @Param(IdPipe) param: IdDTO,
        @Req() req
    ): Promise<PolicyDTO[]> {
        return this.clientService.getPoliciesByClientId(param.id, req.clientId);
    }
}
