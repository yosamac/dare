import {
    Controller, UseFilters,
    Get, Query, HttpStatus,
    HttpCode, Param, UseGuards, Req
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { PolicyService } from './policy.service';
import { PolicyDTO } from '../common/dtos/policy.dto';
import { QueryParamDTO , QueryParamPipe } from './dto/request/queryParam.dto';
import { IdDTO, IdPipe } from '../common/dtos/id.dto';
import { AuthGuard } from '../common/auth.guard';

import {
    ServiceHttpResponse,
    HttpExceptionFilter,
} from '../common/exception.filter';

@Controller('/policies')
@ApiTags('Policies')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@UseFilters(HttpExceptionFilter)
export class PolicyController {
    constructor(private readonly policyService: PolicyService) {}

    @Get()
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
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal error',
        type: ServiceHttpResponse
    })
    getPolicies(
        @Query(QueryParamPipe) queryParam: QueryParamDTO,
        @Req() req
    ): Promise<PolicyDTO[]> {
        return this.policyService.getAllPolicies(queryParam, req.clientId);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The policy was successfully returned',
        type: PolicyDTO,
        isArray: true
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized error',
        type: ServiceHttpResponse
    })
    @ApiResponse({
        status: HttpStatus.FORBIDDEN,
        description: 'Forbidden error',
        type: ServiceHttpResponse
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Policy not found',
        type: ServiceHttpResponse
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal error',
        type: ServiceHttpResponse
    })
    getPolicy(
        @Param(IdPipe) param: IdDTO,
        @Req() req
    ): Promise<PolicyDTO> {
        return this.policyService.getPolicyById(param.id, req.clientId);
    }
}
