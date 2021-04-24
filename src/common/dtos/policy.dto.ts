import { ApiProperty } from '@nestjs/swagger';
import { IdDTO } from './id.dto';

export class PolicyDTO extends IdDTO{
    @ApiProperty()
    amountInsured: string;
    @ApiProperty()
    email?: string;
    @ApiProperty()
    inceptionDate: string;
    @ApiProperty()
    installmentPayment?: true;
}