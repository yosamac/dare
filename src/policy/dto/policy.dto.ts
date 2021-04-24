import { ApiProperty } from '@nestjs/swagger';
import { PolicyIdDTO } from './request/policyId.dto';

export class PolicyDTO extends PolicyIdDTO{
    @ApiProperty()
    amountInsured: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    inceptionDate: string;
    @ApiProperty()
    installmentPayment: true;
}