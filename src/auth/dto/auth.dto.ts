import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDTO {
    @ApiProperty()
    token: string;
    @ApiProperty()
    type: string;
    @ApiProperty()
    expires_in: number;
}