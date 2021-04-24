import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

import { JoiValidationPipe } from '../../../common/joi.validation.pipe';

const LIMIT = 10;
export class QueryParamDTO {
    @ApiProperty({ required: false, type: Number })
    limit: number;
}

export const QueryParamSchema = Joi.object({
    limit: Joi.number().integer().default(LIMIT)
        .label('limit').description('Amount going to show')
});

export const QueryParamPipe = new JoiValidationPipe(QueryParamSchema);