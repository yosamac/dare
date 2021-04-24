import { ApiProperty } from '@nestjs/swagger';
import { ClientIdDTO } from './request/ClientId.dto';


export class PolicyDTO {
    @ApiProperty()
    id: string;
    @ApiProperty()
    amountInsured: string;
    @ApiProperty()
    email?: string;
    @ApiProperty()
    inceptionDate: string;
    @ApiProperty()
    installmentPayment?: boolean;
}

export class ClientDTO extends ClientIdDTO{
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    role: string;
    @ApiProperty()
    policies: PolicyDTO[];
}