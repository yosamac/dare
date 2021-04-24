import {
    Controller, UseFilters,
    Get, Query, HttpStatus,
    HttpCode, Param
} from '@nestjs/common';
import { ApiResponse, ApiTags, } from '@nestjs/swagger';

import { PolicyService } from './policy.service';
import { PolicyDTO } from './dto/policy.dto';
import { QueryParamDTO , QueryParamPipe } from './dto/request/queryParam.dto';
import { PolicyIdDTO, PolicyIdPipe } from './dto/request/policyId.dto';

import {
    ServiceHttpResponse,
    HttpExceptionFilter,
} from '../common/exception.filter';

@Controller('/policies')
@ApiTags('Policies')
@UseFilters(HttpExceptionFilter)
export class PolicyController {
    constructor(private readonly policyService: PolicyService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The login was successfully created',
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
        @Query(QueryParamPipe) queryParam: QueryParamDTO
    ): Promise<PolicyDTO[]> {
        return this.policyService.getAllPolicies(queryParam);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The login was successfully created',
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
    getPolicy(
        @Param(PolicyIdPipe) param: PolicyIdDTO
    ): Promise<PolicyDTO> {
        return this.policyService.getPolicyById(param.id);
    }
}
