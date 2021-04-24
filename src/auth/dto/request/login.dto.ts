import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

import { JoiValidationPipe } from '../../../common/joi.validation.pipe';

export class LoginDTO {
    @ApiProperty()
    readonly username: string;
    @ApiProperty()
    readonly password: string;
}

export const LoginSchema = Joi.object({
    username: Joi.string().required()
        .label('username').description('Username'),
    password: Joi.string().required()
        .label('password').description('User password')
});

export const LoginPipe = new JoiValidationPipe(LoginSchema);