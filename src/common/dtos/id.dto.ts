import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

import { JoiValidationPipe } from '../joi.validation.pipe';

export class IdDTO {
    @ApiProperty()
    id: string;
}

export const IdSchema = Joi.object({
    id: Joi.string().required().label('id')
});

export const IdPipe = new JoiValidationPipe(IdSchema);