import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

import { JoiValidationPipe } from '../../../common/joi.validation.pipe';

export class PolicyIdDTO {
    @ApiProperty()
    readonly id: string;
}

export const PolicyIdSchema = Joi.object({
    id: Joi.string().required()
        .label('id').description('Policy Id')
});

export const PolicyIdPipe = new JoiValidationPipe(PolicyIdSchema);