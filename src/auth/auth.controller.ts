import {
    Controller, UseFilters,
    Post, Body, HttpStatus,
    HttpCode,
} from '@nestjs/common';
import { ApiResponse, ApiTags, } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthResponseDTO } from './dto/auth.dto';

import {
    LoginDTO,
    LoginPipe,
} from './dto/request/login.dto';
import {
    ServiceHttpResponse,
    HttpExceptionFilter,
} from '../common/exception.filter';

@Controller()
@ApiTags('Auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The login was successfully created',
        type: AuthResponseDTO
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Payload doesn\'t meet the schema',
        type: ServiceHttpResponse
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
    login(
        @Body(LoginPipe) payload: LoginDTO
    ): Promise<AuthResponseDTO> {
        return this.authService.login(payload);
    }
}
