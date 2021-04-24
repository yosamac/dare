import { ApiProperty } from '@nestjs/swagger';
import { IdDTO } from '../../common/dtos/id.dto';
import { PolicyDTO } from '../../common/dtos/policy.dto';

export class ClientDTO extends IdDTO{
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    role: string;
    @ApiProperty()
    policies: PolicyDTO[];
}